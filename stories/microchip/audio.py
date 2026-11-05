# Microchip: fridge-hum clinic room tone, soft low pulse, scanner beeps, door scratches, a purr that stops dead.
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
def scan(at, g=.3):
    place(fx, beep(2300, .09), at, g); place(fx, beep(2300, .09), at + .14, g)
def purr(a, b):
    m = int((b - a) * SR); tt = np.arange(m) / SR
    x = bp(white(m, 4), 60, 420) * (.55 + .45 * np.sign(np.sin(2 * np.pi * 26 * tt))) * (.6 + .4 * np.sin(2 * np.pi * .35 * tt))
    return x * np.minimum(1, tt / .4) * np.minimum(1, (b - a - tt) / .02)
# ---------- slow music box-ish pulse (C minor), 64 bpm ----------
bpm = 64; beat = 60 / bpm; mus = np.zeros(N)
prog = [(36, 48, 51, 55), (32, 44, 48, 51), (34, 46, 50, 53), (31, 43, 47, 50)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.6) * 1.2, 260), at, .9)
    if b % 2 == 0: place(mus, tone(mtof(ch[1 + (b // 2) % 3] + 24), .5, .004, 5) * .16, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 900) * .2, at)
env = S.env([(0, .55), (T(1), .6), (T(4), .75), (T(5), .9), (T(6), .6), (T(9), .5), (T(10), .75), (T(12), .9), (T(14), .35), (T(15), .85), (T(last), .6), (DUR, .7)])
S.add(mus * env, .5)
S.add(np.sin(2 * np.pi * 60 * t) * .5 + np.sin(2 * np.pi * 120 * t) * .3 + bp(white(N, 9), 90, 400) * .5, .02)
fx = S.buf()
place(fx, sting() * .6, wi(0, 'beeped') - .03, .3); scan(wi(0, 'beeped'), .32)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .08)
a = wi(1, 'every')
for k in range(6): place(fx, scratch(k, .5), a + k * .9, .2)
place(fx, purr(T(2), T(3)), T(2), .12)
b = wi(3, 'beep'); scan(b, .3)
for k in range(15): place(fx, beep(1500, .025), wi(3, 'fifteen') + k * .06, .1)
tr = wi(3, 'turned'); place(fx, creak(.8, 140, 3), tr, .12)
for w in ('name', 'address'): place(fx, beep(1100, .05), wi(4, w), .12)
place(fx, thump(2.2, 70, 28), wi(4, '1974') - .02, .42); place(fx, sting() * .55, wi(4, '1974') - .03, .28)
place(fx, sting() * .4, wi(5, 'three') - .03, .22)
for i in (6, 7, 8): place(fx, thump(1.2, 90, 30), T(i), .22)
place(fx, sting() * .6, wi(8, 'owner') - .03, .28)
place(fx, thump(1.6, 70, 28), wi(9, 'between') - .02, .3)
place(fx, sting() * .55, wi(10, 'hard') - .03, .26); place(fx, thump(1.8, 60, 28), wi(10, 'rice') - .02, .32)
place(fx, thump(2.4, 70, 26), wi(11, 'yes') - .02, .42)
scan(wi(12, 'beep'), .36); place(fx, sting() * .55, wi(12, 'beep') + .2, .26)
for k in range(15): place(fx, beep(1500, .025), wi(12, 'different') + k * .05, .1)
place(fx, thump(2.0, 60, 28), wi(13, 'lost') - .02, .4); place(fx, sting() * .7, wi(13, '1974') - .03, .3)
sc0 = wi(14, 'stopped'); place(fx, purr(T(13), sc0 + .25), T(13), .12)   # the purr stops dead on the word
place(fx, thump(2.6, 70, 26), wi(14, 'screen') - .02, .5); place(fx, sting() * .7, wi(14, 'screen') - .03, .32)
place(fx, sting() * .8, wi(15, 'pet') - .03, .34); place(fx, thump(2.8, 70, 26), wi(15, 'pet'), .5)
for k in range(9): place(fx, scratch(20 + k, .5), T(last) + k * .75, .24)
heartbeat(fx, T(last) - .1, DUR - .5, .6, .35)
S.add(reverb(fx, 1.2, .2, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
