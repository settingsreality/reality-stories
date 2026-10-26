import json, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.io import wavfile

TL = json.load(open('/home/claude/story19/www/timeline.json'))
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
def chime(): return tone(1318, .5, .003, 7) + np.concatenate([np.zeros(int(.12 * SR)), tone(1760, .5, .003, 7)])[:int(.5 * SR)]
def buzz():
    n = int(.45 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * 170 * tt) * ((tt % .22) < .16) * .8
night = env([(0, 1), (Ts(10) - .2, 1), (Ts(10), 0), (DUR, 0)])
morning = 1 - night
cr = np.zeros(N); r = np.random.default_rng(31)
for a in np.arange(0, DUR, .8):
    for k in range(3): place(cr, tone(4400 + r.uniform(-90, 90), .03, .002, 40), a + k * .06, .5)
hiss = bp(white(N), 2500, 9000)
add(cr * night * .4 + hiss * night * .25 + lp(white(N), 200) * 1.2, .05)
birds = np.zeros(N)
for a in r.uniform(Ts(10), DUR, 26):
    n = int(.18 * SR); tt = np.arange(n) / SR; f = r.uniform(2500, 4200)
    place(birds, np.sin(2 * np.pi * (f + 900 * np.sin(2 * np.pi * 14 * tt)) * tt) * np.sin(np.pi * tt / tt[-1]), a, r.uniform(.2, .6))
add(birds * morning, .05, .3)
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
add(drone * env([(0, .8), (Ts(2), .5), (Ts(3), .9), (Ts(4), 1.1), (Ts(6), 1.4), (Ts(7), 1.6), (Ts(8), .6), (Ts(9), 1.0), (Ts(10), .3), (Ts(11), 1.6), (Ts(12), 1.8), (Es(13) + .4, 0), (Es(13) + 1, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (44, 51, 56, 59)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
add(lp(pad, 1200) * env([(0, .9), (Ts(2), 1.0), (Ts(4), .6), (Ts(8), .8), (Ts(10), .5), (Ts(12), 1.0), (Es(13) + .4, 0), (Es(13) + 1.2, .9), (DUR, .5)]), .022)
fx = np.zeros(N)
# alerts
place(fx, chime(), .3, .3)
for a in (W(4, .3), W(4, .55)): place(fx, chime(), a, .25)
place(fx, chime() * 1.2, Ts(5) - .1, .35); place(fx, thump(2.0, 70, 30), Ts(5) - .05, .45)
place(fx, buzz(), Ts(10) + (Es(10) - Ts(10)) * .85, .35); place(fx, buzz(), Ts(11) - .2, .35)
place(fx, tone(880, .4, .003, 6) + tone(830, .4, .003, 6), Ts(11) - .1, .2)
# the box getting a name; the new face saved
place(fx, tone(1046, 1.2, .005, 3), Ts(7) + .3, .15)
place(fx, tone(660, 1.5, .005, 2.5) + tone(698, 1.5, .005, 2.5), W(9, .25), .15)
# scrubbing through the clip: little ticks
for a in np.arange(Ts(6), W(6, .9), .18): place(fx, hp(white(int(.02 * SR)), 3000) * np.exp(-np.arange(int(.02 * SR)) / SR * 200), a, .12)
# porch: a creak when it walks to the door; a handle tried
place(fx, creak(1.2, 80, 4, .3), W(3, .6), .25)
n = int(.6 * SR); tt = np.arange(n) / SR; place(fx, bp(white(n), 600, 3000) * (np.sin(2 * np.pi * 9 * tt) > .3) * np.exp(-tt * 3), E(3) if False else W(3, .95), .3)
hb = np.zeros(N); n = int(.18 * SR); tt = np.arange(n) / SR; th_ = np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 18)
for a in np.arange(Ts(6), Ts(8), .6): place(hb, th_, a); place(hb, th_, a + .16, .6)
for a in np.arange(Ts(11), Es(13) + .3, .55): place(hb, th_, a); place(hb, th_, a + .16, .6)
add(hb, .45)
n = int(3.5 * SR); tt = np.arange(n) / SR
sting = (sum(np.sin(2 * np.pi * f * tt) for f in (233, 247, 311, 466, 494)) * .2 + bp(white(n), 800, 8000) * .6) * np.exp(-tt * 1.4) * np.minimum(1, tt * 60)
place(fx, sting * .6, .05, .3)
place(fx, sting * .7, W(12, .5), .4); place(fx, thump(3.0, 80, 28), W(12, .52), .55)
place(fx, ep(40, 3.0) * .6, Es(13) + 1.0, .3)
add(reverb(fx, 1.8, .2, 7), 1.0)

# ---------- narration ----------
sr_n, vo = wavfile.read('/home/claude/story19/narration.wav')
vo = vo.astype(np.float32) / 32768; vo = resample_poly(vo, SR, sr_n); vo = hp(vo, 70); vo = reverb(vo, 1.2, .08, 3, 6)
voice = np.zeros(N); voice[:min(len(vo), N)] = vo[:N]
venv = np.convolve(np.abs(voice) > .02, np.ones(int(.25 * SR)) / (.25 * SR), 'same')
duck = 1 - .35 * np.clip(venv * 3, 0, 1)
bed = np.stack([L * duck, R * duck], 1); bed = np.tanh(bed * 1.2) / 1.2
mix = bed * .55 + np.stack([voice, voice], 1)
mix = mix[:int(DUR * SR)]; mix /= np.max(np.abs(mix)) + 1e-9; mix *= .9
wavfile.write('/home/claude/story19/story19-audio.wav', SR, (mix * 32767).astype(np.int16))
print('ok', DUR)
