import json, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.io import wavfile

TL = json.load(open('/home/claude/story22/www/timeline.json'))
SR = 48000; DUR = TL['total']; N = int(SR * DUR) + SR
t = np.arange(N) / SR
rng = np.random.default_rng(15)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'highpass', fs=SR, output='sos'), x)
def env(pts): ts, vs = zip(*pts); return np.interp(t, ts, vs)
def white(n): return rng.standard_normal(n)
def place(buf, sig, at, g=1.0):
    i = int(at * SR)
    if i >= len(buf) or i < 0: return
    n = min(len(sig), len(buf) - i); buf[i:i + n] += sig[:n] * g
def reverb(x, secs=3.0, wet=.3, seed=1, damp=2.2):
    r = np.random.default_rng(seed); n = int(secs * SR)
    ir = lp(r.standard_normal(n) * np.exp(-np.arange(n) / SR * damp), 5000); ir /= np.sqrt(np.sum(ir ** 2))
    return x * (1 - wet) + fftconvolve(x, ir)[:len(x)] * wet
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
L = np.zeros(N); R = np.zeros(N)
def add(sig, g=1.0, pan=0.0):
    global L, R
    n = min(len(sig), N); L[:n] += sig[:n] * g * np.sqrt((1 - pan) / 2) * 1.414; R[:n] += sig[:n] * g * np.sqrt((1 + pan) / 2) * 1.414
def thump(d=2.5, f1=70, f2=28):
    n = int(d * SR); tt = np.arange(n) / SR; f = f2 + (f1 - f2) * np.exp(-tt * 5)
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.6) * 1.8)
def step(seed, heavy=False, wet=True, wood=False):
    r = np.random.default_rng(seed); n = int(.35 * SR); tt = np.arange(n) / SR
    s = lp(r.standard_normal(n), 500 if heavy else 900) * np.exp(-tt * (14 if heavy else 24))
    if wet: s += bp(r.standard_normal(n), 1500, 6000) * np.exp(-tt * 30) * .5
    if heavy: s += np.sin(2 * np.pi * 55 * tt) * np.exp(-tt * 12) * .8
    if wood: s += bp(np.sign(np.sin(2 * np.pi * np.cumsum(180 + 40 * tt) / SR)) * (r.random(n) < .25), 200, 1500) * np.exp(-tt * 6) * .5
    return s
def creak(d, f0, seed, dens=.3):
    n = int(d * SR); tt = np.arange(n) / SR
    return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f0 + .4 * f0 * np.sin(2 * np.pi * 1.3 * tt)) / SR)) * (np.random.default_rng(seed).random(n) < dens), 200, 2500) * np.sin(np.pi * tt / tt[-1])
def ep(m, d):
    n = int(d * SR); tt = np.arange(n) / SR; f = mtof(m)
    return (np.sin(2 * np.pi * f * tt) + .35 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt * 1.6) * np.minimum(1, tt * 300)


LN = TL['lines']; Ts = lambda i: LN[i]['start']; Es = lambda i: LN[i]['end']
W = lambda i, f: Ts(i) + (Es(i) - Ts(i)) * f
def tone(f, d, a=.01, dec=3.0):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / a) * np.exp(-tt * dec)
def crunch(seed, g=1.0):
    r = np.random.default_rng(seed); n = int(.32 * SR); tt = np.arange(n) / SR
    return (bp(r.standard_normal(n), 1200, 7000) * (r.random(n) < .35) * np.exp(-tt * 12) + lp(r.standard_normal(n), 300) * np.exp(-tt * 20) * .5) * g
# ---------- beds ----------
def tone(f, d, a=.01, dec=3.0):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / a) * np.exp(-tt * dec)
def scratch(seed, d=1.6):
    r = np.random.default_rng(seed); n = int(d * SR); tt = np.arange(n) / SR; out = np.zeros(n)
    for k in range(int(d * 5)):
        a = int(r.uniform(0, d - .3) * SR); m = int(r.uniform(.12, .28) * SR); u = np.arange(m) / SR
        s = bp(r.standard_normal(m), 2500, 9000) * (r.random(m) < .5) * np.sin(np.pi * u / u[-1])
        out[a:a + m] += s[:max(0, min(m, n - a))]
    return out
wind = bp(white(N), 150, 900) * (.6 + .4 * np.sin(2 * np.pi * t / 8.1) * np.sin(2 * np.pi * t / 13.3 + 1))
add(wind, .05)
cr = np.zeros(N); r = np.random.default_rng(31)
for a in np.arange(0, DUR, .9):
    for k in range(3): place(cr, tone(4300 + r.uniform(-80, 80), .03, .002, 40), a + k * .06, .5)
add(cr * env([(0, .5), (Ts(7) - .2, .5), (Ts(7), 1.2), (Es(10), 1.2), (Ts(11), .3), (DUR, .3)]), .03, -.3)
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
add(drone * env([(0, 1.2), (Ts(1), .5), (Ts(4), .9), (Ts(5), 1.3), (Ts(7), .5), (Ts(8), .9), (Ts(10), 1.2), (Ts(11), .8), (Ts(12), 1.6), (Ts(13), 2.0), (Es(13) + .4, 0), (Es(13) + 1, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
add(lp(pad, 1200) * env([(0, .6), (Ts(1), 1.1), (Ts(3), .8), (Ts(5), .4), (Ts(7), .9), (Ts(9), 1.1), (Ts(11), .5), (Es(13) + .4, 0), (Es(13) + 1.2, .9), (DUR, .5)]), .022)
fx = np.zeros(N)
place(fx, scratch(1, 3.0), .2, .35)
for k in range(3): place(fx, scratch(10 + k, 1.4), Ts(4) + .6 + k * 1.2, .3)
for k in range(4): place(fx, scratch(20 + k, 1.2), Ts(6) + k * 1.4, .35)
for k, a in enumerate((Ts(3) + 1, Ts(5) - .5, Ts(11) + .5)): place(fx, creak(1.2, 75 + 10 * k, 30 + k, .3), a, .2)
# the photo: an old shutter click and a low bell
place(fx, hp(white(int(.06 * SR)), 1500) * np.exp(-np.arange(int(.06 * SR)) / SR * 80), Ts(8) - .1, .3); place(fx, ep(45, 3.5) * .5, Ts(8) + .2, .25)
# the window sliding open: a long wooden squeal
n = int(2.6 * SR); tt = np.arange(n) / SR
squeal = bp(np.sign(np.sin(2 * np.pi * np.cumsum(280 + 120 * tt + 40 * np.sin(2 * np.pi * 3 * tt)) / SR)) * (np.random.default_rng(4).random(n) < .4), 300, 3000) * np.sin(np.pi * tt / tt[-1])
place(fx, squeal, W(12, .15), .35)
n = int(4.0 * SR); tt = np.arange(n) / SR; place(fx, bp(white(n), 200, 1500) * (tt / tt[-1]) ** 2, W(12, .5), .2)
hb = np.zeros(N); n = int(.18 * SR); tt = np.arange(n) / SR; th_ = np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 18)
for a in np.arange(Ts(5), Es(6), .62): place(hb, th_, a); place(hb, th_, a + .16, .6)
for a in np.arange(Ts(12), Es(13) + .3, .5): place(hb, th_, a); place(hb, th_, a + .15, .6)
add(hb, .45)
n = int(3.5 * SR); tt = np.arange(n) / SR
sting = (sum(np.sin(2 * np.pi * f * tt) for f in (233, 247, 311, 466, 494)) * .2 + bp(white(n), 800, 8000) * .6) * np.exp(-tt * 1.4) * np.minimum(1, tt * 60)
place(fx, sting * .6, .05, .3); place(fx, sting * .6, W(5, .4), .35); place(fx, sting * .7, Ts(13) - .1, .42); place(fx, thump(3.0, 80, 28), Ts(13), .55)
place(fx, ep(40, 3.0) * .6, Es(13) + 1.0, .3)
add(reverb(fx, 2.0, .22, 7), 1.0)

# ---------- narration ----------
sr_n, vo = wavfile.read('/home/claude/story22/narration.wav')
vo = vo.astype(np.float32) / 32768; vo = resample_poly(vo, SR, sr_n); vo = hp(vo, 70); vo = reverb(vo, 1.2, .08, 3, 6)
voice = np.zeros(N); voice[:min(len(vo), N)] = vo[:N]
venv = np.convolve(np.abs(voice) > .02, np.ones(int(.25 * SR)) / (.25 * SR), 'same')
duck = 1 - .35 * np.clip(venv * 3, 0, 1)
bed = np.stack([L * duck, R * duck], 1); bed = np.tanh(bed * 1.2) / 1.2
mix = bed * .55 + np.stack([voice, voice], 1)
mix = mix[:int(DUR * SR)]; mix /= np.max(np.abs(mix)) + 1e-9; mix *= .9
wavfile.write('/home/claude/story22/story22-audio.wav', SR, (mix * 32767).astype(np.int16))
print('ok', DUR)
