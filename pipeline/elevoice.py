# ElevenLabs narration: one take of the whole script per voice tag, cut into lines with word timings.
#
#   python3 pipeline/elevoice.py <storydir> text [tag]        print the text to generate for a voice tag (default n)
#   python3 pipeline/elevoice.py <storydir> build n=<src>[,<src>...] [tag=<src>...]
#        <src> = a URL (ElevenLabs content_url / Speko url) or a local audio file. Give both takes when you have
#        two; the take whose words best match the script wins. Writes narration.wav + timeline.json (+ www copy).
#
# Script captions may hold ElevenLabs v4 direction tags like "[whispers]": they are spoken as direction and
# never shown on screen. voices.json: "_say" (screen text -> spoken text), "_gaps" {"line index": extra secs},
# "_tail" (secs after the last line, default 4.0), "_lead" (secs before the first word, default 0.15).
import sys, os, re, json, subprocess, tempfile, difflib, importlib.util
import numpy as np, soundfile as sf
from scipy.signal import resample_poly

SR = 44100
D = os.path.abspath(sys.argv[1]); CMD = sys.argv[2]
spec = importlib.util.spec_from_file_location('script', os.path.join(D, 'script.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
SCRIPT = [(x[0], x[1], x[2] if len(x) > 2 else 'n') for x in m.SCRIPT]
CFG = json.load(open(os.path.join(D, 'voices.json')))
TAGRE = re.compile(r'\[[^\]]*\]\s*')

def screen(s): return re.sub(r'\s+', ' ', TAGRE.sub('', s)).strip()           # what the captions show
def spoken(s, keep_tags=True):                                                  # what the voice reads
    s = s.replace('*', '').replace('"', '')
    for a, b in CFG.get('_say', {}).items(): s = s.replace(a, b)
    return s if keep_tags else re.sub(r'\s+', ' ', TAGRE.sub('', s)).strip()

def batch(tag): return [i for i, x in enumerate(SCRIPT) if x[2] == tag]

def FX(name, a, seed):  # per-line effects ("_fx": {"line index": name}); length is kept so timings stay right
    from scipy.signal import butter, sosfilt
    r = np.random.default_rng(seed); bp = lambda x, lo, hi: sosfilt(butter(2, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
    if name == 'radio':   # walkie-talkie: narrow band, driven, a little hiss and crackle
        w = np.tanh(bp(a, 420, 3200) * 3.2) * .55; n = bp(r.standard_normal(len(a)), 1200, 6000) * .025
        c = (r.random(len(a)) < .0015) * r.standard_normal(len(a)) * .25
        return (w + n + bp(c, 800, 5000)).astype(np.float32)
    if name == 'phone': return (np.tanh(bp(a, 300, 3400) * 2) * .7).astype(np.float32)
    if name == 'whisper': return (a * .8 + bp(r.standard_normal(len(a)), 1500, 7000) * np.convolve(np.abs(a), np.ones(400) / 400, 'same') * 1.2).astype(np.float32)
    return a

if CMD == 'text':
    tag = sys.argv[3] if len(sys.argv) > 3 else 'n'
    txt = '\n\n'.join(spoken(SCRIPT[i][1]) for i in batch(tag))
    print(txt); print(f'\n[{len(txt)} characters, {len(batch(tag))} lines, voice tag {tag}]', file=sys.stderr); sys.exit(0)

# ---------------- build ----------------
NUM = {'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
       'eleven': '11', 'twelve': '12', 'twenty': '20', 'thirty': '30', 'forty': '40', 'fifty': '50', 'hundred': '100', 'thousand': '1000'}
def norm(w):
    w = re.sub(r"[^a-z0-9']", '', w.lower().replace('’', "'")).strip("'")
    return NUM.get(w, w)

def load(src, td, k):
    p = src
    if re.match(r'https?://', src):
        p = os.path.join(td, f'take{k}'); subprocess.run(['curl', '-sS', '-L', '--max-time', '120', '-o', p, src], check=True)
    o = os.path.join(td, f'take{k}.wav')
    subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', p, '-ac', '1', '-ar', str(SR), o], check=True)
    a, _ = sf.read(o, dtype='float32'); return a

_W = None
def words(a):
    global _W
    if _W is None:
        from faster_whisper import WhisperModel
        _W = WhisperModel('small.en', device='cpu', compute_type='int8')
    a16 = resample_poly(a, 160, 441).astype(np.float32)
    segs, _ = _W.transcribe(a16, word_timestamps=True, beam_size=5, condition_on_previous_text=False)
    out = []
    for s in segs:
        for w in s.words:
            for piece in re.findall(r"[A-Za-z0-9'’]+", w.word): out.append((norm(piece), w.start, w.end))
    return out

def rms(a, hop=441):  # 10 ms frames
    n = len(a) // hop; return np.sqrt(np.mean(a[:n * hop].reshape(n, hop) ** 2, axis=1) + 1e-12)

def fit_take(a, lines):
    """align a take to its script lines -> (score, [ (seg0, seg1, onset, offset, [token times]) per line ])"""
    toks = []  # (line k, display token, spoken norm list)
    for k, i in enumerate(lines):
        for tk in re.findall(r"[A-Za-z0-9'’]+", spoken(SCRIPT[i][1], keep_tags=False)): toks.append((k, norm(tk)))
    W = words(a); wn = [w[0] for w in W]
    sm = difflib.SequenceMatcher(a=[t[1] for t in toks], b=wn, autojunk=False)
    tt = [None] * len(toks)
    for blk in sm.get_matching_blocks():
        for j in range(blk.size): tt[blk.a + j] = (W[blk.b + j][1], W[blk.b + j][2])
    score = sum(x is not None for x in tt) / max(1, len(tt))
    # interpolate unmatched tokens between their matched neighbours
    known = [j for j, x in enumerate(tt) if x]
    if not known: return 0, None
    for j in range(len(tt)):
        if tt[j]: continue
        lo = max([k for k in known if k < j], default=None); hi = min([k for k in known if k > j], default=None)
        if lo is None: tt[j] = (max(0, tt[hi][0] - .3 * (hi - j)),) * 2
        elif hi is None: tt[j] = (tt[lo][1] + .3 * (j - lo),) * 2
        else: f = (j - lo) / (hi - lo); x = tt[lo][1] + (tt[hi][0] - tt[lo][1]) * f; tt[j] = (x, x + .05)
    R = rms(a); thr = max(R.max() * .06, 1e-3); dur = len(a) / SR
    approx = []
    for k in range(len(lines)):
        js = [j for j, t in enumerate(toks) if t[0] == k]; approx.append((tt[js[0]][0], tt[js[-1]][1], [tt[j] for j in js]))
    cuts = [max(0, approx[0][0] - .25)]
    for k in range(len(lines) - 1):
        a0, a1 = approx[k][1] - .05, approx[k + 1][0] + .05
        f0, f1 = int(a0 * 100), int(a1 * 100)
        cuts.append((f0 + int(np.argmin(R[f0:f1]))) / 100 if f1 - f0 > 3 else (a0 + a1) / 2)
    e0 = approx[-1][1]; f0, f1 = int((e0 - .05) * 100), min(len(R), int((e0 + .9) * 100))
    after = np.nonzero(R[int((e0 + .25) * 100):f1] > thr)[0] if f1 > int((e0 + .25) * 100) else []
    if len(after):  # more speech follows in this take (e.g. a line re-recorded separately): cut in the quiet gap before it
        g1 = int((e0 + .25) * 100) + after[0]; cuts.append((f0 + int(np.argmin(R[f0:max(f0 + 1, g1)]))) / 100)
    else: cuts.append(min(dur, e0 + .8))
    out = []
    for k in range(len(lines)):
        s0, s1 = cuts[k], cuts[k + 1]; f0, f1 = int(s0 * 100), max(int(s0 * 100) + 1, int(s1 * 100))
        loud = np.nonzero(R[f0:f1] > thr)[0]
        on = s0 + (loud[0] / 100 if len(loud) else 0); off = s0 + ((loud[-1] + 1) / 100 if len(loud) else s1 - s0)
        out.append((s0, s1, on, off, approx[k][2]))
    return score, out

srcs = {}
for arg in sys.argv[3:]:
    tag, v = arg.split('=', 1); srcs[tag] = v.split(',')
segs = {}
with tempfile.TemporaryDirectory() as td:
    for tag, lst in srcs.items():
        lines = batch(tag); best = None
        for k, src in enumerate(lst):
            a = load(src, td, f'{tag}{k}'); sc, fit = fit_take(a, lines)
            print(f'voice {tag} take {k + 1}: {len(a) / SR:.1f}s, words matched {sc:.0%}')
            if fit and (best is None or sc > best[0] + .01): best = (sc, a, fit, k)
        sc, a, fit, k = best
        print(f'voice {tag}: using take {k + 1} ({sc:.0%})' + ('   WARNING: low match, listen to it' if sc < .85 else ''))
        for i, f in zip(lines, fit): segs[i] = (a, f)
missing = [i for i in range(len(SCRIPT)) if i not in segs]
if missing: sys.exit(f'no audio for lines {missing} (voice tags {sorted(set(SCRIPT[i][2] for i in missing))})')

lead = CFG.get('_lead', .15); gaps = CFG.get('_gaps', {})
pieces = [np.zeros(int(lead * SR), np.float32)]; t = lead; out_lines = []
for i, (scene, text, tag) in enumerate(SCRIPT):
    g = float(gaps.get(str(i), 0))
    if g: pieces.append(np.zeros(int(g * SR), np.float32)); t += g
    a, (s0, s1, on, off, tts) = segs[i]
    if i == 0: s0 = max(s0, on - .02)  # cold open: the first word starts right away
    seg = a[int(s0 * SR):int(s1 * SR)].copy(); fl = min(len(seg), int(.006 * SR))
    fxn = CFG.get('_fx', {}).get(str(i))
    if fxn: seg = FX(fxn, seg, i)
    if fl: seg[:fl] *= np.linspace(0, 1, fl); seg[-fl:] *= np.linspace(1, 0, fl)
    st, en = t + (on - s0), t + (off - s0)
    disp = screen(text).split(' '); n = len(tts)
    wl = []
    for j, w in enumerate(disp):  # map screen words onto spoken-token times (1:1 when counts match)
        q = min(n - 1, j if len(disp) == n else int(j * n / len(disp)))
        ws = float(np.clip(t + tts[q][0] - s0, st, en)); we = float(np.clip(t + tts[q][1] - s0, ws, en))
        wl.append(dict(w=w, start=round(ws, 3), end=round(we, 3)))
    out_lines.append(dict(scene=scene, text=screen(text), voice=tag, start=round(st, 3), end=round(en, 3), words=wl))
    pieces.append(seg); t += len(seg) / SR
    print(f'{scene:4s} {st:7.2f} {en:7.2f}  {screen(text)[:60]}')
buf = np.concatenate(pieces); total = round(out_lines[-1]['end'] + CFG.get('_tail', 4.0), 3)
buf = np.concatenate([buf, np.zeros(max(0, int(total * SR) + SR - len(buf)), np.float32)])
buf = buf / (np.max(np.abs(buf)) + 1e-9) * .9
sf.write(os.path.join(D, 'narration.wav'), buf, SR, subtype='PCM_16')
scenes = []
for l in out_lines:
    if scenes and scenes[-1]['id'] == l['scene']: scenes[-1]['end'] = l['end']
    else: scenes.append(dict(id=l['scene'], start=l['start'], end=l['end']))
for x, y in zip(scenes, scenes[1:]): x['end'] = round(y['start'] - .05, 3)
scenes[0]['start'] = 0; scenes[-1]['end'] = total
TLD = dict(total=total, lines=out_lines, scenes=scenes)
for p in ('timeline.json', 'www/timeline.json'):
    if os.path.isdir(os.path.dirname(os.path.join(D, p))): json.dump(TLD, open(os.path.join(D, p), 'w'), indent=1)
print('done', D, 'total', total)
