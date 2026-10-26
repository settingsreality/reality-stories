import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def tickui(f=2600, g=1.0):
    n = int(.05 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt) * np.exp(-tt * 90) * g
def pop():
    return tone(880, .5, .004, 8) * .6 + tone(1320, .5, .004, 9) * .4
def ding():
    return tone(1568, 1.2, .003, 4) + tone(2349, 1.2, .003, 5) * .5
def whoosh(d=2.5, lo=80, hi=1200):
    n = int(d * SR); tt = np.arange(n) / SR; e = np.sin(np.pi * tt / tt[-1]) ** 2
    return bp(white(n), lo, hi) * e
def murmur(d, seed=3):
    n = int(d * SR); r = np.random.default_rng(seed); out = np.zeros(n)
    for k in range(18):
        f = r.uniform(300, 900); ph = r.uniform(0, 6); am = (np.sin(2 * np.pi * r.uniform(2, 5) * np.arange(n) / SR + ph) > .3)
        out += bp(r.standard_normal(n), f, f * 1.6) * lp(am.astype(float), 20)
    return out / 6
def glide(d, f0, f1):
    n = int(d * SR); tt = np.arange(n) / SR; f = f0 * (f1 / f0) ** (tt / tt[-1])
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / tt[-1])

drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.2), (T(1), .5), (T(5), .8), (T(7), 1.0), (W(7, .5), .3), (T(8), 1.0), (T(11), 1.4), (T(12), 1.6), (T(13), 1.2), (E(13) + .4, 0), (E(13) + 1.2, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 1200) * S.env([(0, .6), (T(1), 1.0), (T(5), .7), (T(7), .3), (T(8), .9), (E(13) + .4, 0), (E(13) + 1.2, .9), (DUR, .5)]), .022)
hum = lp(white(N), 250) * S.env([(0, .8), (T(4) - .2, .8), (T(4), 0), (T(5), .8), (T(7), .8), (W(7, .5), 0), (T(9), .6), (T(11), 0), (T(12), .5), (T(13), 0), (DUR, 0)])
S.add(hum, .06)
fx = S.buf()
# the bar: a high shimmer when it appears, a tick at 99, then dead stop
n = int(3 * SR); tt = np.arange(n) / SR
place(fx, sum(np.sin(2 * np.pi * f * tt) for f in (2093, 2637, 3136)) * np.exp(-tt * 1.2) * np.minimum(1, tt * 10) * .3, W(1, .25), .25)
place(fx, tickui(), W(0, .65), .4); place(fx, tickui(), W(7, .35), .4)
for k in range(6): place(fx, tickui(2200 + k * 60, .5), T(4) + .3 + k * .7, .2)
# a jet through the bar
place(fx, whoosh(4.5, 200, 3000) * 1.2 + whoosh(4.5, 40, 300), T(3) + .2, .35)
# phone taps on the memes
for k in range(4): place(fx, tickui(1200, .6), W(4, .3) + k * .5, .25)
# stars sliding: glassy glides
for k in range(5): place(fx, glide(1.8, 900 + k * 140, 500 + k * 90), W(5, .15) + k * .3, .07)
# birds: a flutter, then nothing
for k in range(14): place(fx, bp(white(int(.05 * SR)), 800, 3000) * np.hanning(int(.05 * SR)), T(6) + .2 + k * .06, .15)
# the box: a system alert
place(fx, pop(), W(8, .06), .4)
# the crowd looks up
S.add(murmur(N / SR)[:N] * S.env([(0, 0), (T(9) - .2, 0), (T(9) + .5, 1), (E(9), 1), (T(10), .3), (T(11), 0), (DUR, 0)]), .25)
# the cursor appears and glides
place(fx, whoosh(3.0, 40, 500) * 1.5, W(10, .15), .45)
place(fx, whoosh(6.0, 30, 400), T(11) + .3, .35)
place(fx, whoosh(2.0, 40, 600), W(12, .25), .3); place(fx, whoosh(2.0, 40, 600), W(12, .6), .35)
heartbeat(fx, T(12), E(13), .6, .5)
place(fx, ding(), W(13, .35), .35)
place(fx, sting() * .6, .05, .3); place(fx, sting() * .6, W(8, .1), .22); place(fx, sting() * .7, W(13, .38), .35); place(fx, thump(3.0, 80, 28), W(13, .4), .45)
place(fx, ep(40, 3.0) * .6, E(13) + 1.0, .3)
S.add(reverb(fx, 2.0, .22, 7), 1.0)
S.finish()
