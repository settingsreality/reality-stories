# 0.4 Miles: marsh night (frogs, crickets, water), a thin drone, phone pings, the wisps' glassy tones, sloshing, last-percent heartbeat.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word, n=0):
    c = 0
    for w in S.LN[i].get('words', []):
        if ''.join(ch for ch in w['w'].lower() if ch.isalnum() or ch == "'") == word:
            if c == n: return w['start']
            c += 1
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
def beep(f, d=.12, g=1.0):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / .005) * np.minimum(1, (d - tt) / .02) * g
def ping(at, g=.2):
    place(fx, beep(1320, .08), at, g); place(fx, beep(1760, .14), at + .1, g)
def bell(f, d=2.2):
    m = int(d * SR); tt = np.arange(m) / SR
    return (np.sin(2 * np.pi * f * tt) + .5 * np.sin(2 * np.pi * f * 2.01 * tt) + .25 * np.sin(2 * np.pi * f * 3.02 * tt)) * np.exp(-tt * 2.4) * np.minimum(1, tt / .01)
def slosh(seed, d=.7):
    m = int(d * SR); return bp(white(m, seed), 250, 1800) * np.hanning(m)
# ---------- sparse minor pulse, 60 bpm ----------
bpm = 60; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 51, 55), (33, 45, 48, 52)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.5) * 1.2, 240), at, .8)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q + 12) * tt + q) for q in ch[1:]) * np.minimum(1, tt / 2) * np.exp(-tt * .2)
        place(mus, lp(pad, 1000) * .2, at)
env = S.env([(0, .6), (T(1), .45), (T(3), .4), (T(6), .6), (T(7), .75), (T(9), .85), (T(12), .9), (T(13), .5), (T(14), .9), (T(last), .55), (DUR, .7)])
S.add(mus * env, .5)
# ---------- marsh bed: wind, crickets, frogs ----------
wind = bp(white(N, 3), 120, 700) * (.6 + .4 * np.sin(2 * np.pi * .07 * t))
S.add(wind, .03)
cr = np.sin(2 * np.pi * 4200 * t) * (np.sin(2 * np.pi * 22 * t) > .2) * (np.sin(2 * np.pi * .9 * t) > 0)
S.add(cr * S.env([(0, .6), (T(7), 1), (T(12), .1), (T(13), 0), (T(14), .5), (DUR, .7)]), .006)
fx = S.buf()
r = np.random.default_rng(5)
for at in np.arange(1, T(12), 2.3): place(fx, ep(40 + int(r.integers(0, 6)), .22) * .8, at + r.random(), .05)
place(fx, sting() * .55, wi(0, 'for') - .03, .26); place(fx, thump(1.8, 70, 28), wi(0, 'hours') , .3)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .07)
ping(wi(1, 'added') - .1, .2)
for i in (3, 4, 5): place(fx, thump(1.2, 90, 30), T(i), .2)
place(fx, sting() * .5, wi(5, 'off') - .03, .24)
place(fx, bell(660), wi(6, 'little'), .1)
place(fx, thump(1.8, 60, 28), wi(7, 'ended') - .02, .3); place(fx, bell(587), wi(7, 'bob'), .13)
for k in range(5): place(fx, slosh(k, .3), wi(8, 'walked') + k * .35, .05)
place(fx, thump(2.2, 70, 28), wi(8, 'stopped', 1) - .02, .4); place(fx, sting() * .45, wi(8, 'stopped', 1) - .03, .22)
place(fx, bell(698), wi(9, 'second'), .12); place(fx, bell(784), wi(9, 'third'), .12); ping(wi(9, 'my'), .2)
for w in ('2019', '2011'): ping(wi(10, w), .16)
place(fx, sting() * .55, wi(10, 'existed') - .03, .28)
for w in (0, 1): place(fx, beep(880, .12), wi(11, 'three') + w * .3, .18)
for k in range(4): place(fx, slosh(10 + k), wi(11, 'water') + k * .5, .12)
place(fx, bell(523), T(12), .15); place(fx, thump(2.4, 70, 26), wi(12, 'nobody') - .02, .45); place(fx, sting() * .7, wi(12, 'nobody') - .03, .3)
place(fx, sting() * .75, wi(13, 'is') - .03, .3); place(fx, thump(2.6, 70, 26), wi(13, 'trail', 1), .45)
ad = wi(14, 'adds')
for k in range(7): place(fx, thump(.8, 110, 34), T(14) + k * (ad - T(14)) / 7, .16)
ping(wi(15, 'refreshed'), .22); place(fx, sting() * .8, wi(15, 'me') - .03, .34); place(fx, thump(2.8, 70, 26), wi(15, 'me'), .5)
heartbeat(fx, T(last) - .1, DUR - .5, .6, .32)
for k in range(5): place(fx, bell(440 + k * 37, 3.0), T(last) + k * .8, .07)
S.add(reverb(fx, 1.6, .25, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
