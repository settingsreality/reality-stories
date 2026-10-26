import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def blip(f=1320, g=1.0):
    return (tone(f, .12, .003, 30) + tone(f * 1.5, .12, .003, 40) * .4) * g
def buzz(d=.45):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.tanh(np.sin(2 * np.pi * 160 * tt) * 3) * bp(white(n), 100, 400) * .4 * (np.sin(2 * np.pi * 18 * tt) > 0) + np.sin(2 * np.pi * 160 * tt) * .3 * np.minimum(1, (tt[-1] - tt) * 20)
def ring():
    n = int(1.6 * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 440 * tt) + np.sin(2 * np.pi * 480 * tt)) * .3 * np.minimum(1, tt * 50) * np.minimum(1, (tt[-1] - tt) * 50)
def chime(notes=(659.3, 523.3), gap=.55):
    out = np.zeros(int((gap * len(notes) + 2.5) * SR))
    for k, f in enumerate(notes):
        n = int(2.5 * SR); tt = np.arange(n) / SR
        s = (np.sin(2 * np.pi * f * tt) + .3 * np.sin(2 * np.pi * 2 * f * tt) + .1 * np.sin(2 * np.pi * 3 * f * tt)) * np.exp(-tt * 1.3) * np.minimum(1, tt * 200)
        i = int(k * gap * SR); out[i:i + n] += s
    return out
def jet(d, seed=3):
    n = int(d * SR); tt = np.arange(n) / SR; r = np.random.default_rng(seed)
    whine = sum(np.sin(2 * np.pi * f * tt * (1 + .004 * np.sin(2 * np.pi * .3 * tt))) * a for f, a in ((2900, .2), (3600, .12), (5100, .06)))
    return lp(r.standard_normal(n), 500) * 1.6 + bp(r.standard_normal(n), 800, 3000) * .5 + whine * .3

quiet = S.env([(0, 1), (W(10, .45), 1), (W(10, .6), .08), (E(10) + .6, .08), (T(11), .6), (DUR, 1)])
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * quiet * S.env([(0, 1.2), (T(1), .45), (T(3), .7), (T(5), 1.0), (T(7), .6), (T(9), 1.1), (T(11), 1.3), (T(13), 1.8), (E(13) + .4, 0), (E(13) + 1.2, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 1200) * quiet * S.env([(0, .5), (T(1), 1.0), (T(5), .8), (T(9), .5), (E(13) + .4, 0), (E(13) + 1.2, .9), (DUR, .5)]), .022)
room = lp(white(N), 400) * S.env([(0, .6), (DUR, .6)]) * quiet
S.add(room, .03)
fx = S.buf()
# the jet: touchdown roar on the map, then a low rumble that never quite arrives
place(fx, jet(9, 3) * np.concatenate([np.linspace(0, 1, int(1.5 * SR)), np.ones(int(2 * SR)), np.linspace(1, .2, int(5.5 * SR))]), T(3) - .4, .22)
rum = lp(white(N), 90) * S.env([(0, 0), (T(9), 0), (E(9), .8), (W(10, .5), .8), (W(10, .6), 0), (T(11), .4), (T(13), 1.2), (E(13) + .4, 0), (DUR, 0)])
S.add(rum, .5)
# app sounds: status changes
for a in (T(3) + .2, W(4, .1), W(12, .3)): place(fx, blip(), a, .2)
# the airline call, then dad's text
for k in range(2): place(fx, ring(), T(7) - .2 + k * 2.2, .12)
place(fx, buzz(), T(8) + .1, .5); place(fx, buzz(), T(8) + .7, .5)
# the boarding chime
place(fx, chime(), W(13, .55), .35)
place(fx, sting() * .6, .05, .3); place(fx, sting() * .6, W(13, .55), .28); place(fx, thump(3.0, 80, 28), W(13, .55), .45)
place(fx, ep(40, 3.0) * .6, E(13) + 1.0, .3)
heartbeat(fx, T(11), E(13), .65, .45)
S.add(reverb(fx, 1.6, .18, 7), 1.0)
S.finish()
