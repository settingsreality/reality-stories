import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def engine(d, f0=22, seed=1, rough=.1):
    n = int(d * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    f = f0 * (1 + rough * np.tanh(lp(r.standard_normal(n), 3) * 40)); ph = np.cumsum(f) / SR
    s = sum(np.sin(2 * np.pi * k * ph + k) / k ** .9 for k in range(1, 8)) + lp(r.standard_normal(n), 300) * (1 + np.sin(2 * np.pi * ph)) * .8
    return lp(np.tanh(s * .7), 500)
def hoof(seed):
    n = int(.12 * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    return (lp(r.standard_normal(n), 900) * np.exp(-tt * 40) + np.sin(2 * np.pi * 120 * tt) * np.exp(-tt * 30) * .5)
def splash(d=2.0, seed=4):
    n = int(d * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    return bp(r.standard_normal(n), 300, 6000) * np.exp(-tt * 2.5) * np.minimum(1, tt * 30) + lp(r.standard_normal(n), 200) * np.exp(-tt * 6) * 2
def squelch(seed):
    n = int(.5 * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    f = 300 + 500 * tt / tt[-1]
    return bp(r.standard_normal(n), 200, 1500) * np.exp(-tt * 6) * (1 + np.sin(2 * np.pi * np.cumsum(f) / SR)) * .6
def clunk(g=1):
    n = int(.25 * SR); tt = np.arange(n) / SR
    return (lp(white(n), 700) * np.exp(-tt * 30) + np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 25) * .6) * g
water = lp(white(N), 500) * (.5 + .5 * np.sin(2 * np.pi * t / 3.1) ** 2)
lochOn = S.env([(0, 1), (T(1) - .2, 1), (T(1), 0), (T(5) - .2, 0), (T(5), 1), (T(9) - .2, 1), (T(9), .3), (T(10), .2), (T(11), 0), (T(12), .3), (W(13, .75), .3), (W(13, .8), 1), (DUR, 1)])
S.add(water * lochOn, .12, .3)
S.add(bp(white(N), 150, 700) * (.6 + .4 * np.sin(2 * np.pi * t / 6.7)) * lochOn, .04)
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.2), (T(1), .4), (T(5), .6), (T(8), 1.0), (T(9), 1.3), (T(12), 1.5), (T(13), 1.9), (E(13) + .6, 0), (E(13) + 1.4, .4), (DUR, .3)]), .2)
# the legend: a Highland drone (A and E) with a slow lament
leg = S.env([(0, 0), (T(1) - .3, 0), (T(1) + .5, 1), (E(4), 1), (T(5), 0), (T(11) - .3, 0), (T(11) + .3, .8), (E(11), .8), (T(12), 0), (DUR, 0)])
pipe = (np.sin(2 * np.pi * 110 * t) + .5 * np.sin(2 * np.pi * 165 * t) + .3 * np.sin(2 * np.pi * 220 * t)) * (1 + .05 * np.sin(2 * np.pi * 5 * t))
S.add(lp(pipe, 900) * leg, .035)
lam = S.buf()
for k, (m, d) in enumerate([(69, 1.2), (72, .6), (74, 1.2), (76, 1.8), (74, .6), (72, 1.2), (69, 2.4)] * 3):
    pass
a = T(1) + .4
for m, d in [(69, 1.2), (72, .6), (74, 1.2), (76, 1.8), (74, .6), (72, 1.2), (69, 2.4), (67, 1.2), (69, 2.4)]:
    n = int(d * SR); tt = np.arange(n) / SR; place(lam, np.sin(2 * np.pi * mtof(m) * tt) * np.minimum(1, tt * 20) * np.minimum(1, (tt[-1] - tt) * 10), a); a += d
S.add(lam * leg, .03, -.2)
eng = engine(N / SR, 22, 1)[:N] * S.env([(0, .7), (T(1) - .2, .7), (T(1), 0), (T(7) - .2, 0), (T(7), .7), (T(11) - .2, .7), (T(11), 0), (T(12), .5), (W(13, .4), .7), (W(13, .5), 1.2), (E(13) + 1.2, 1.2), (DUR, 0)])
S.add(eng, .22)
fx = S.buf()
for k, a in enumerate(np.arange(W(3, .3), E(3) + .3, .16)): place(fx, hoof(k), a, .35 if k % 4 < 2 else .2)
place(fx, splash(2.5, 4), W(3, .75), .5); place(fx, splash(3.0, 5) * .5, T(4) + .2, .2)
place(fx, squelch(1), W(8, .8), .5); place(fx, squelch(2), W(9, .55), .5); place(fx, squelch(3), W(9, .8), .45)
n = int(1.4 * SR); tt = np.arange(n) / SR; place(fx, creak(1.4, 90, 6, .25), T(10) + .1, .35)
radio = bp(lp(white(N), 800) * (.6 + .4 * np.sin(2 * np.pi * t * 1.3)), 300, 3000) * S.env([(0, 0), (W(10, .55), 0), (W(10, .7), 1), (E(10) + .4, 1), (T(11), 0), (W(13, .1), 0), (W(13, .2), .6), (W(13, .75), .6), (W(13, .8), 0), (DUR, 0)])
S.add(radio, .15, -.2)
place(fx, clunk(.6), W(12, .3), .5)
place(fx, clunk(1.4), W(13, .3), .6)
crunch = bp(white(int(4 * SR)), 1500, 7000) * (np.random.default_rng(3).random(int(4 * SR)) < .25) * .5
place(fx, crunch, W(13, .78), .25)
heartbeat(fx, T(9), E(13), .6, .45)
place(fx, sting() * .6, .05, .3); place(fx, sting() * .5, W(9, .3), .25); place(fx, sting() * .7, W(13, .3), .38); place(fx, thump(3.0, 80, 28), W(13, .32), .45)
place(fx, ep(40, 3.0) * .6, E(13) + 1.4, .3)
S.add(reverb(fx, 2.0, .22, 7), 1.0)
S.finish()
