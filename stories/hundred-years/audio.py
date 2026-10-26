import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def pluck(m, d=1.6):
    n = int(d * SR); tt = np.arange(n) / SR; f = mtof(m)
    return (np.sin(2 * np.pi * f * tt) + .5 * np.sin(4 * np.pi * f * tt) + .2 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 3.2) * np.minimum(1, tt * 400)
def bell(f=220, d=4.0):
    n = int(d * SR); tt = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * r * tt) * a * np.exp(-tt * dk) for r, a, dk in ((1, 1, .9), (2.4, .5, 1.6), (3.9, .3, 2.4), (5.2, .15, 3))) * np.minimum(1, tt * 300)
def inhale(d=3.0):
    n = int(d * SR); tt = np.arange(n) / SR; e = np.sin(np.pi * tt / tt[-1]) ** 1.5
    return bp(white(n), 300, 2500) * e * (.6 + .4 * tt / tt[-1])
def tick():
    n = int(.03 * SR); tt = np.arange(n) / SR
    return bp(white(n), 1500, 6000) * np.exp(-tt * 200)
def clunk(g=1):
    n = int(.25 * SR); tt = np.arange(n) / SR
    return (lp(white(n), 700) * np.exp(-tt * 30) + np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 25) * .6 + bp(white(n), 2000, 6000) * np.exp(-tt * 80) * .4) * g
def chirp(seed):
    r = np.random.default_rng(seed); n = int(.18 * SR); tt = np.arange(n) / SR; f0 = r.uniform(3000, 4500)
    return np.sin(2 * np.pi * np.cumsum(f0 + 1200 * np.sin(2 * np.pi * 12 * tt)) / SR) * np.sin(np.pi * tt / tt[-1])

night = S.env([(0, 0), (T(4) - .3, 0), (T(4), 1), (T(13) - .3, 1), (T(13), 0), (DUR, 0)])
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.2), (T(1), .3), (T(4), .5), (T(6), 1.0), (T(8), 1.2), (T(10), 1.4), (T(12), 2.0), (E(12) + .3, .5), (T(13), .6), (E(13), 1.2), (E(13) + .5, 0), (E(13) + 1.2, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 1200) * S.env([(0, .6), (T(4), .8), (T(6), .5), (E(12), .3), (T(13), .7), (E(13) + .4, 0), (E(13) + 1.2, .9), (DUR, .5)]), .022)
wind = bp(white(N), 150, 800) * (.6 + .4 * np.sin(2 * np.pi * t / 7.3))
S.add(wind * S.env([(0, .6), (T(1), 0), (T(4), .4), (T(13), .4), (T(13) + .5, .3), (DUR, .3)]), .05)
fx = S.buf()
# the legend: plucked notes in an old Japanese scale
scale = [62, 63, 67, 69, 70, 74, 75]
r = np.random.default_rng(4)
for k, a in enumerate(np.arange(T(1), E(3), .62)):
    place(fx, pluck(scale[int(r.integers(len(scale)))] - (12 if k % 4 == 0 else 0)), a, .18)
for a in np.arange(W(2, 0), W(2, .4), .33): place(fx, lp(white(int(.1 * SR)), 300) * np.exp(-np.arange(int(.1 * SR)) / SR * 40), a, .25)
place(fx, sting(2.5) * .4, W(3, .75), .25)
# the clock ticks in the kitchen; at midnight it strikes
for a in np.arange(T(4), T(6) - .8, 1.0): place(fx, tick(), a, .12)
for k in range(4): place(fx, bell(196, 3.5), T(6) - 1.6 + k * .9, .14)
place(fx, inhale(3.2), W(6, .15), .35)
for k in range(9): place(fx, creak(1.4, 60 + 12 * (k % 4), 40 + k, .3), T(7) + k * .55, .22)
place(fx, clunk(1.2), W(8, .2), .5)
for a in (W(8, .62), W(8, .78), W(8, .94)): place(fx, clunk(.6), a, .4)
place(fx, creak(4.0, 45, 77, .25), T(9) + .3, .3)
heartbeat(fx, T(10), E(10) + .3, .55, .5)
place(fx, lp(white(int(.4 * SR)), 1200) * np.hanning(int(.4 * SR)), W(11, .15), .4)
place(fx, creak(3.0, 38, 88, .35), T(12) - .4, .45); place(fx, thump(3.0, 70, 26), T(12) - .05, .4)
place(fx, sting() * .6, .05, .3); place(fx, sting() * .7, W(13, .7), .38); place(fx, thump(3.0, 80, 28), W(13, .72), .45)
for k in range(10): place(fx, chirp(k), T(13) + .4 + k * .55 + (k % 3) * .17, .06)
place(fx, ep(40, 3.0) * .6, E(13) + 1.0, .3)
S.add(reverb(fx, 2.2, .25, 7), 1.0)
S.finish()
