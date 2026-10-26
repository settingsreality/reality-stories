import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def mbox(m, d=2.2, det=0):
    n = int(d * SR); tt = np.arange(n) / SR; f = mtof(m) * (1 + det)
    return (np.sin(2 * np.pi * f * tt) + .4 * np.sin(2 * np.pi * 3.01 * f * tt) * np.exp(-tt * 6)) * np.exp(-tt * 2.6) * np.minimum(1, tt * 800)
def jingle(seed, d=.6):
    r = np.random.default_rng(seed); n = int(d * SR); out = np.zeros(n)
    for k in range(10):
        a = int(r.uniform(0, d * .7) * SR); m = int(.15 * SR); tt = np.arange(m) / SR
        s = sum(np.sin(2 * np.pi * f * tt) for f in r.uniform(3000, 7000, 3)) * np.exp(-tt * 30) * .3
        out[a:a + m] += s[:max(0, min(m, n - a))]
    return out
def rustle(d=1.2, seed=2):
    n = int(d * SR); r = np.random.default_rng(seed)
    return bp(r.standard_normal(n), 500, 5000) * lp(np.abs(r.standard_normal(n)), 8) * 3 * np.sin(np.pi * np.arange(n) / n)
def crack():
    n = int(.6 * SR); tt = np.arange(n) / SR; r = np.random.default_rng(5)
    return bp(r.standard_normal(n), 2000, 9000) * (r.random(n) < .08) * np.exp(-tt * 6) * 2 + lp(r.standard_normal(n), 400) * np.exp(-tt * 40)
def pen(d):
    n = int(d * SR); r = np.random.default_rng(9); tt = np.arange(n) / SR
    return bp(r.standard_normal(n), 2500, 8000) * (.5 + .5 * np.sin(2 * np.pi * 7 * tt) ** 2) * .5
def stamp():
    n = int(.3 * SR); tt = np.arange(n) / SR
    return lp(white(n), 500) * np.exp(-tt * 30) + np.sin(2 * np.pi * 90 * tt) * np.exp(-tt * 20) * .6

drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.1), (T(1), .4), (T(4), .8), (T(6), .7), (T(9), 1.2), (T(11), 1.5), (T(12), 2.0), (E(12) + .4, 0), (E(12) + 1.2, .4), (DUR, .3)]), .2)
# a slow, slightly out-of-tune music box
tune = [72, 76, 79, 76, 74, 72, 71, 67, 69, 71, 72, 74, 76, 74, 72, 71]
mb = S.buf()
for k, a in enumerate(np.arange(.3, DUR - 2, .9)):
    place(mb, mbox(tune[k % len(tune)], det=.004 * np.sin(k)), a, 1)
S.add(mb * S.env([(0, .8), (T(1), .5), (T(4), .4), (T(9), .25), (T(11), .5), (T(12), 0), (E(12) + .2, 0), (E(12) + 1.2, .5), (DUR, .5)]), .045, .2)
fx = S.buf()
place(fx, rustle(1.4, 2), T(1) + .2, .4); place(fx, rustle(1.0, 3), T(2) - .3, .3)
place(fx, jingle(1), W(2, .05), .45); place(fx, jingle(2), W(2, .4), .45)
for a in (W(3, .15), W(3, .3), W(3, .5)): place(fx, rustle(.4, int(a * 10)), a, .25)
place(fx, stamp(), W(4, .42), .5); place(fx, crack(), W(4, .45), .45)
place(fx, jingle(7, .8), W(6, .5), .55)
n = int(4 * SR); tt = np.arange(n) / SR; place(fx, lp(white(n), 300) * (np.sin(2 * np.pi * .25 * tt) ** 2), W(6, .8), .25)
for k in range(3): place(fx, stamp(), W(7, .2) + k * 1.9, .35)
n = int(2 * SR); tt = np.arange(n) / SR; place(fx, sum(np.sin(2 * np.pi * f * tt) for f in (1568, 2093)) * np.exp(-tt * 2) * np.minimum(1, tt * 20) * .3, W(8, .45), .3)
place(fx, rustle(1.6, 6), T(9) + .1, .35)
place(fx, pen(E(12) - T(12) + .2), T(12) - .2, .25)
heartbeat(fx, T(9), E(12), .62, .45)
place(fx, sting() * .6, .05, .3); place(fx, sting() * .5, W(10, .5), .25); place(fx, sting() * .7, E(12) - .1, .35); place(fx, thump(3.0, 80, 28), E(12), .45)
place(fx, ep(40, 3.0) * .6, E(12) + 1.0, .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)
S.finish()
