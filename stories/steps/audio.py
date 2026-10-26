import json, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.io import wavfile

TL = json.load(open('/home/claude/story21/www/timeline.json'))
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
def step(seed, soft=True):
    r = np.random.default_rng(seed); n = int(.3 * SR); tt = np.arange(n) / SR
    return lp(r.standard_normal(n), 600 if soft else 1200) * np.exp(-tt * 22) + np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 20) * .4
room = lp(white(N), 200) * 1.4 + np.sin(2 * np.pi * 60 * t) * .1
add(room, .05)
clock = np.zeros(N)
for a in np.arange(0, DUR, 1.0): place(clock, hp(white(int(.025 * SR)), 3000) * np.exp(-np.arange(int(.025 * SR)) / SR * 200), a, .8 if int(a) % 2 else .5)
add(clock, .03, -.3)
hiss = bp(white(N), 2500, 9000)
add(hiss * env([(0, 0), (W(0, .55) - .05, 0), (W(0, .55), 1), (Es(0), 1), (Ts(1), 0), (W(1, .55), 0), (W(1, .58), 1), (Es(1), 1), (Ts(2), 0), (Ts(3) - .1, 0), (Ts(3), 1), (Es(5), 1), (Ts(6), 0), (DUR, 0)]), .02)
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
add(drone * env([(0, .9), (Ts(1), .5), (Ts(3), .8), (Ts(4), 1.3), (Ts(6), .8), (Ts(7), 1.2), (Ts(9), 1.6), (Ts(10), 1.0), (Ts(11), 1.3), (Ts(13), 1.8), (Es(14), 2.0), (Es(14) + .4, 0), (Es(14) + 1, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (43, 50, 55, 58)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
add(lp(pad, 1200) * env([(0, .8), (Ts(1), 1.0), (Ts(3), .6), (Ts(6), .8), (Ts(10), .6), (Ts(12), 1.0), (Es(14) + .4, 0), (Es(14) + 1.2, .9), (DUR, .5)]), .022)
# slow breathing of the sleeper on camera
for a in np.arange(W(0, .55), Es(5), 3.6):
    n = int(2.6 * SR); tt = np.arange(n) / SR; place(Lb := np.zeros(1), np.zeros(1), 0) if False else None
    place_b = bp(white(n), 200, 1500) * np.sin(np.pi * tt / tt[-1]) ** 2
    i = int(a * SR); m = min(n, N - i); L[i:i + m] += place_b[:m] * .03; R[i:i + m] += place_b[:m] * .03
fx = np.zeros(N)
# the counter racing up; the ring closing
for k in range(18): place(fx, tone(900 + k * 40, .05, .002, 40), k * .085 + .05, .12)
place(fx, tone(1318, .6, .003, 6) + tone(1760, .6, .003, 6), 1.7, .2)
# the phone vanishes: a hard cut thud; comes back: a soft tick
place(fx, thump(2.0, 70, 30), W(4, .55), .5); place(fx, hp(white(int(.03 * SR)), 2000) * np.exp(-np.arange(int(.03 * SR)) / SR * 150), W(5, .25), .4)
# the map drawing: steps, faster and faster
x = W(7, .15); j = 0
while x < Es(8):
    place(fx, step(100 + j), x, .25); x += max(.18, .5 - (x - W(7, .15)) * .03); j += 1
for j, a in enumerate(np.arange(Ts(9), Es(9), .5)): place(fx, step(300 + j), a, .25)
# the carpet
n = int(2.5 * SR); tt = np.arange(n) / SR; place(fx, bp(white(n), 300, 2500) * (tt / tt[-1]) ** 2, Ts(10) + .2, .12)
place(fx, ep(50, 3.0) * .5, W(11, .25), .25)
hb = np.zeros(N); n = int(.18 * SR); tt = np.arange(n) / SR; th_ = np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 18)
for a in np.arange(Ts(12), Es(14) + .3, .55): place(hb, th_, a); place(hb, th_, a + .16, .6)
add(hb, .45)
for j, a in enumerate(np.arange(Ts(13), Es(14) + .5, .6)): place(fx, step(500 + j), a, .3)
n = int(3.5 * SR); tt = np.arange(n) / SR
sting = (sum(np.sin(2 * np.pi * f * tt) for f in (233, 247, 311, 466, 494)) * .2 + bp(white(n), 800, 8000) * .6) * np.exp(-tt * 1.4) * np.minimum(1, tt * 60)
place(fx, sting * .7, Ts(14) - .05, .42); place(fx, thump(3.0, 80, 28), Ts(14), .55)
place(fx, ep(40, 3.0) * .6, Es(14) + 1.0, .3)
add(reverb(fx, 2.0, .2, 7), 1.0)

# ---------- narration ----------
sr_n, vo = wavfile.read('/home/claude/story21/narration.wav')
vo = vo.astype(np.float32) / 32768; vo = resample_poly(vo, SR, sr_n); vo = hp(vo, 70); vo = reverb(vo, 1.2, .08, 3, 6)
voice = np.zeros(N); voice[:min(len(vo), N)] = vo[:N]
venv = np.convolve(np.abs(voice) > .02, np.ones(int(.25 * SR)) / (.25 * SR), 'same')
duck = 1 - .35 * np.clip(venv * 3, 0, 1)
bed = np.stack([L * duck, R * duck], 1); bed = np.tanh(bed * 1.2) / 1.2
mix = bed * .55 + np.stack([voice, voice], 1)
mix = mix[:int(DUR * SR)]; mix /= np.max(np.abs(mix)) + 1e-9; mix *= .9
wavfile.write('/home/claude/story21/story21-audio.wav', SR, (mix * 32767).astype(np.int16))
print('ok', DUR)
