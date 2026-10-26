import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def seg_n(a, b): return int(a * SR), int(b * SR)
def engine(d, f0=26, seed=1, rough=.12, f1=None):
    n = int(d * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    wob = lp(r.standard_normal(n), 3) * 40
    f = (f0 if f1 is None else f0 + (f1 - f0) * (tt / tt[-1]) ** 1.5) * (1 + rough * np.tanh(wob))
    ph = np.cumsum(f) / SR
    s = sum(np.sin(2 * np.pi * k * ph + k) / k ** .9 for k in range(1, 8))
    s += lp(r.standard_normal(n), 300) * (1 + np.sin(2 * np.pi * ph)) * .8
    return lp(np.tanh(s * .7), 500)
def click(g=1.0):
    n = int(.04 * SR); tt = np.arange(n) / SR
    return (bp(white(n), 800, 4000) * np.exp(-tt * 120) + np.sin(2 * np.pi * 900 * tt) * np.exp(-tt * 90) * .5) * g
def door(d, seed=2):
    n = int(d * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    hum = sum(np.sin(2 * np.pi * 118 * k * tt) / k for k in (1, 2, 3)) * .4 + bp(r.standard_normal(n), 300, 900) * .6
    rattle = bp(r.standard_normal(n), 2000, 6000) * (r.random(n) < .02) * 3
    return (hum + rattle) * np.minimum(1, tt * 6) * np.minimum(1, (tt[-1] - tt) * 8)

# ---------- bed ----------
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.3), (T(1), .5), (T(3), .7), (T(5), 1.1), (T(7), .9), (T(10), .6), (T(12), .2), (W(12, .5), .1), (T(13), 1.6), (E(13), 2.0), (E(13) + .5, 0), (E(13) + 1.2, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 1200) * S.env([(0, .5), (T(1), 1.0), (T(5), .6), (T(10), .8), (T(12), 0), (E(13) + .5, 0), (E(13) + 1.2, .9), (DUR, .5)]), .022)
# night air at the intersection
air = lp(white(N), 600) * S.env([(0, 0), (T(3) - .3, 0), (T(3), 1), (E(6), 1), (T(7), .4), (T(10), 0), (DUR, 0)])
S.add(air, .05)

fx = S.buf(); L = S.buf(); R = S.buf()
# my engine idling: under the cold open, at the light, in the garage until I turn it off
mine = engine(N / SR, 25, 1)[:N]
S.add(mine * S.env([(0, .7), (T(1) - .3, .7), (T(1), 0), (T(3) - .3, 0), (T(3), .6), (T(7), .6), (W(12, .25), .6), (W(12, .25) + .15, 0), (DUR, 0)]), .25)
# the other engine: under the cold open, beside my window, behind me, and in the empty bay
other = engine(N / SR, 23, 7, .18)[:N]
S.add(other * S.env([(0, .6), (T(1) - .3, .6), (T(1), 0), (T(6) - .1, 0), (W(6, .3), 1.2), (E(6) + .6, 1.0), (T(7), .4), (T(9), .0), (W(9, .5), .5), (E(9), .5), (T(10), 0), (T(13) - .2, 0), (W(13, .3), 1.4), (E(13) + .5, 1.6), (E(13) + 1, 0), (DUR, 0)]), .28, .45)
# relay clicks when the lights change
for a in (W(3, .62), W(5, .3), W(7, .15)): place(fx, click(), a, .5)
# floor it: rev and road
place(fx, engine(3.5, 28, 3, .05, 90), W(7, .55), .45)
n = int(9 * SR); tt = np.arange(n) / SR; road = lp(white(n), 900) * np.minimum(1, tt / 1.5) * np.minimum(1, (tt[-1] - tt) / 1.5)
place(fx, road, W(7, .7), .25)
for k in range(5): place(fx, bp(white(int(.8 * SR)), 300, 3000) * np.hanning(int(.8 * SR)), T(8) + .4 + k * 1.0, .18)
# the garage door: down, stop, back up
place(fx, door(T(11) + .5 - W(10, .25), 2), W(10, .25), .3)
place(fx, click(1.5), T(11) + .5, .6)
place(fx, door(2.6, 5), T(11) + .9, .3)
place(fx, door(2.4, 6), W(0, .15), .3); place(fx, click(1.5), W(0, .12), .5)
# beeps of the broken beam
for k in range(6): place(fx, tone(2400, .08, .002, 30), T(11) + .45 + k * .25, .15)
# stings
place(fx, sting() * .6, .05, .3); place(fx, sting() * .5, W(6, .3), .25)
place(fx, sting() * .7, W(13, .3), .4); place(fx, thump(3.0, 80, 28), W(13, .32), .5)
place(fx, ep(40, 3.0) * .6, E(13) + 1.0, .3)
heartbeat(fx, T(12), E(13), .7, .5)
S.add(reverb(fx, 1.8, .2, 7), 1.0)
S.finish()
