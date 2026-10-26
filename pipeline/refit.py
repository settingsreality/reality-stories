# Re-voice a story with Kokoro, fitting every line into the slot the animation already uses.
# usage: python3 refit.py <storydir> [--fresh]   (--fresh: write a new timeline instead of fitting the old one)
import sys, os, json, re, subprocess, tempfile, importlib.util
import numpy as np, soundfile as sf
from scipy.signal import resample, butter, sosfilt
from kokoro_onnx import Kokoro
D = sys.argv[1]; FRESH = '--fresh' in sys.argv
SR = 24000
MD = os.environ.get('KOKORO_DIR', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'models'))
K = Kokoro(os.path.join(MD, 'kokoro-v1.0.onnx'), os.path.join(MD, 'voices-v1.0.bin'))
spec = importlib.util.spec_from_file_location('script', os.path.join(D, 'script.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
SCRIPT = [(x[0], x[1], x[2] if len(x) > 2 else 'n') for x in m.SCRIPT]
CFG = json.load(open(os.path.join(D, 'voices.json')))  # voice tag -> {voice, speed, fx}

def spoken(s):
    s = s.replace('*', '').replace('"', '')
    for a, b in CFG.get('_say', {}).items(): s = s.replace(a, b)
    return s

def synth(text, voice, speed):
    a, sr = K.create(text, voice=voice, speed=float(speed), lang='en-gb' if voice.startswith('b') else 'en-us')
    a = np.asarray(a, dtype=np.float32)
    idx = np.nonzero(np.abs(a) > 0.008)[0]
    return a[max(0, idx[0] - 240):idx[-1] + 600] if len(idx) else a

def stretch(a, ratio):
    # time-stretch by ratio (new_len/old_len) with ffmpeg atempo, pitch kept
    if abs(ratio - 1) < .01: return a
    with tempfile.TemporaryDirectory() as td:
        i, o = f'{td}/i.wav', f'{td}/o.wav'; sf.write(i, a, SR)
        tempo = 1 / ratio; chain = []
        while tempo > 2: chain.append('atempo=2'); tempo /= 2
        while tempo < .5: chain.append('atempo=.5'); tempo /= .5
        chain.append(f'atempo={tempo:.5f}')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', i, '-af', ','.join(chain), o], check=True)
        b, _ = sf.read(o); return b.astype(np.float32)

def bpf(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def FX(name, a, seed):
    r = np.random.default_rng(seed)
    if name == 'found':  # slower, lower, breath doubled
        low = resample(a, int(len(a) * 1.12)); return low * .85 + bpf(r.standard_normal(len(low)), 800, 5000) * np.abs(low) * 1.4
    if name == 'girl':
        a = resample(a, int(len(a) * .93)); a = sosfilt(butter(2, 220, 'highpass', fs=SR, output='sos'), a)
        e = np.convolve(np.abs(a), np.ones(240) / 240, 'same'); return a * .85 + bpf(r.standard_normal(len(a)), 1500, 7000) * e * 1.2
    if name == 'radio':
        n = len(a); tt = np.arange(n) / SR; idx = np.cumsum(1 + .02 * np.sin(2 * np.pi * 4.3 * tt) + .01 * np.sin(2 * np.pi * 9.1 * tt + 1))
        w = np.interp(idx[idx < n - 1], np.arange(n), a); w = np.tanh(bpf(w, 380, 3200) * 3) * .6
        pad = int(.2 * SR); out = np.zeros(len(w) + 2 * pad); out[pad:pad + len(w)] = w
        return out + bpf(r.standard_normal(len(out)), 900, 5000) * .04
    if name == 'space':  # mission control: clean narrow band, light hiss
        w = np.tanh(bpf(a, 300, 3400) * 2.2) * .7; return w + bpf(r.standard_normal(len(w)), 1500, 6000) * .02
    if name == 'calm':  # lower, slower, close and dry
        low = resample(a, int(len(a) * 1.1)); return np.tanh(bpf(low, 120, 4200) * 1.6) * .8
    if name == 'close':
        a = resample(a, int(len(a) * 1.04)); e = np.convolve(np.abs(a), np.ones(240) / 240, 'same')
        return a * .75 + bpf(r.standard_normal(len(a)), 1200, 7000) * e * 2.0
    if name == 'mic':
        return bpf(a, 150, 6500) * 1.1
    return a

def make_line(i, scene, text, tag):
    c = CFG[tag]; sp = c.get('speed', .92)
    if text.startswith('One...'):
        ws = [synth(w, c['voice'], .9) for w in ('One.', 'Two.', 'Three.')]
        a = np.zeros(int(1.95 * SR) + len(ws[2]), dtype=np.float32)
        for k, w in enumerate(ws): a[int(k * .95 * SR):int(k * .95 * SR) + len(w)] += w
        return a, True
    a = synth(spoken(text), c['voice'], sp)
    if c.get('mix'):  # a second voice underneath (her voice and yours at once)
        a = FX(c.get('fx'), a, i)
        b = FX(c['mix_fx'], synth(spoken(text), CFG[c['mix']]['voice'], c.get('mix_speed', .8)), i + 99)
        n = max(len(a), len(b)); o = np.zeros(n, dtype=np.float32); o[:len(a)] += a * .8; o[:len(b)] += b[:n] * .75
        return o, True
    return a, False

lines = []; pieces = []
if not FRESH:
    old = json.load(open(os.path.join(D, 'timeline.json'))); total = old['total']
    for i, ((scene, text, tag), L) in enumerate(zip(SCRIPT, old['lines'])):
        slot = L['end'] - L['start']; nxt = old['lines'][i + 1]['start'] if i + 1 < len(old['lines']) else total
        room = min(slot + .25, nxt - L['start'] - .08)
        a, fixed = make_line(i, scene, text, tag)
        fxn = CFG[tag].get('fx') or (CFG.get('_quote_fx') if tag == 'n' and text.startswith('"') else None)
        if not fixed:
            d = len(a) / SR
            # one re-synthesis at a corrected speed, then a gentle stretch to land inside the slot
            if (d > room or d < slot * .9) and not CFG[tag].get('mix'):
                sp = np.clip(CFG[tag].get('speed', .92) * d / slot, .72, 1.35); a = synth(spoken(text), CFG[tag]['voice'], sp); d = len(a) / SR
            target = min(max(d, slot * .97), room) if d > slot * .97 else slot * .97
            if fxn in ('found', 'calm', 'girl', 'close'): target = target / {'found': 1.12, 'calm': 1.1, 'girl': .93, 'close': 1.04}[fxn]
            a = stretch(a, np.clip(target / d, .82, 1.2))
        if fxn and not fixed: a = FX(fxn, a, i)
        lines.append(dict(L)); pieces.append((L['start'], a))
        print(f"{scene:4s} {tag:3s} slot {slot:5.2f}  got {len(a) / SR:5.2f}  {text[:44]}")
else:
    t = .7; prev = None
    for i, (scene, text, tag) in enumerate(SCRIPT):
        gap = 0 if prev is None else (.5 if scene == prev else .95)
        if tag != 'n' and SCRIPT[i - 1][2] == 'n': gap = max(gap, .8)
        if tag == 'n' and i and SCRIPT[i - 1][2] != 'n': gap = max(gap, .8)
        gap += CFG.get('_gaps', {}).get(str(i), 0)
        t += gap
        a, fixed = make_line(i, scene, text, tag)
        fxn = CFG[tag].get('fx') or (CFG.get('_quote_fx') if tag == 'n' and text.startswith('"') else None)
        if fxn and not fixed: a = FX(fxn, a, i)
        d = len(a) / SR; lines.append(dict(scene=scene, text=text, voice=tag, start=round(t, 3), end=round(t + d, 3))); pieces.append((t, a)); t += d; prev = scene
        print(f"{scene:4s} {tag:3s} {t - d:7.2f} {t:7.2f}  {text[:50]}")
    total = round(t + CFG.get('_tail', 4.4), 3)
buf = np.zeros(int(total * SR) + SR, dtype=np.float32)
for st, a in pieces:
    i = int(st * SR); buf[i:i + len(a)] += a[:len(buf) - i]
buf = buf / (np.max(np.abs(buf)) + 1e-9) * .9
sf.write(os.path.join(D, 'narration.wav'), buf, SR, subtype='PCM_16')
if FRESH:
    scenes = []
    for l in lines:
        if scenes and scenes[-1]['id'] == l['scene']: scenes[-1]['end'] = l['end']
        else: scenes.append(dict(id=l['scene'], start=l['start'], end=l['end']))
    for a, b in zip(scenes, scenes[1:]): a['end'] = round(b['start'] - .05, 3)
    scenes[0]['start'] = 0; scenes[-1]['end'] = total
    json.dump(dict(total=total, lines=lines, scenes=scenes), open(os.path.join(D, 'timeline.json'), 'w'), indent=1)
print('done', D, 'total', total)
