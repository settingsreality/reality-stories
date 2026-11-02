# Second Moon: cold high drone, slow pulse, wind on the hill, dome motor, phone buzz, hits on the turns, a rising tone out of the eyepiece.
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
turned = wi(0, 'turned'); jam = wi(10, 'jammed'); hit = wi(10, 'hit'); ring = T(11) - .6; moved = wi(13, 'moved'); light = wi(13, 'light'); twist = wi(14, 'the', 1); me_w = wi(14, 'me')
def beep(f, d=.12, g=1.0):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / .005) * np.minimum(1, (d - tt) / .02) * g
# ---------- music pulse (D minor), 60 bpm ----------
bpm = 60; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 40), .3, .002, 14) * .14, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt + q) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
env = S.env([(0, .55), (T(1), .75), (T(5), .6), (T(8), .75), (T(10), .85), (T(11), .45), (T(13), .7), (twist - .4, .95), (twist - .02, .95), (twist + .02, 0), (E(14) + .3, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * env, .5)
# ---------- night wind (outside), room hum (inside) ----------
wind = bp(white(N, 6), 180, 1100) * (.6 + .4 * np.sin(2 * np.pi * .09 * t) * np.sin(2 * np.pi * .043 * t + 1))
S.add(wind, .035, -.2)
hum = (np.sin(2 * np.pi * 55 * t) * .6 + bp(white(N, 9), 80, 260) * .5)
S.add(hum, .02)
# the moon's whine: a thin high tone that gets closer through the film
whine = np.sin(2 * np.pi * (1320 + 6 * np.sin(2 * np.pi * .3 * t)) * t) + .6 * np.sin(2 * np.pi * 1984 * t)
wenv = S.env([(0, .5), (T(1), 0), (T(8) - .1, 0), (E(8), .5), (T(9), .2), (T(10), .6), (moved, .7), (light, 1.3), (twist - .02, 1.5), (twist + .02, 0), (E(14) + .3, 0), (T(last), .5), (DUR, .5)])
S.add(whine * wenv, .008)
fx = S.buf()
# cold open: hit on 'turned' + a low swell
place(fx, sting() * .55, turned - .03, .32); place(fx, thump(2.6, 70, 28), turned, .45)
# whoosh on scene cuts
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
place(fx, thump(1.5, 60, 30), wi(1, 'fiftyseven') - .05, .28)
place(fx, thump(1.5, 60, 30), wi(3, 'dark') - .05, .3)
for i in (5, 6, 7): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# s7: a low hit per distance, each louder
for k, w in enumerate(('three', 'two', 'ninety')):
    place(fx, thump(2.0 + k * .3, 70, 28), wi(8, w) - .03, .25 + k * .1)
place(fx, sting() * .4, wi(8, 'ninety') - .03, .22)
# s8: rows tick in, logs dropping out one by one
for j in range(5): place(fx, beep(2200, .03), T(9) + .2 + j * .22, .08)
n = wi(9, 'one'); q = wi(9, 'went')
for j in range(5): place(fx, beep(440, .16), n + (q + .3 - n) * j / 4, .14)
# s9: the turn, the dome motor, the jam
place(fx, thump(2.0, 70, 30), T(10) + .55, .3)
ml = max(.3, jam - hit); mm = int(ml * SR); tt = np.arange(mm) / SR
place(fx, bp(np.sign(np.sin(2 * np.pi * 62 * tt)) * .5 + white(mm, 4) * .3, 80, 900) * np.minimum(1, tt / .1), hit + .05, .22)
place(fx, beep(1200, .06), hit, .2)
place(fx, sting() * .6, jam - .03, .3); place(fx, thump(2.6, 80, 26), jam, .5); place(fx, creak(.9, 70, 3), jam + .05, .3)
# phone buzz
for k in range(2):
    m = int(.4 * SR); tt = np.arange(m) / SR
    place(fx, bp(np.sign(np.sin(2 * np.pi * 150 * tt)), 100, 500) * np.hanning(m), ring + k * .3 - .3, .12)
place(fx, sting() * .5, wi(11, 'comes') - .05, .22)
heartbeat(fx, T(12) - .1, E(12) + .5, .6, .4)
# telescope motor, then the light rush
m = int(2.4 * SR); tt = np.arange(m) / SR
place(fx, bp(np.sin(2 * np.pi * (140 + 90 * tt) * tt) + white(m, 5) * .2, 90, 1600) * np.hanning(m), moved, .2)
m = int(2.2 * SR); place(fx, bp(white(m, 8), 500, 6000) * np.linspace(0, 1, m) ** 2, light - 1.4, .25)
place(fx, sting() * .55, light - .03, .28)
place(fx, sting() * .8, twist - .02, .4); place(fx, thump(3.0, 80, 26), twist, .55); place(fx, thump(2.4, 70, 28), me_w, .35)
place(fx, ep(38, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
