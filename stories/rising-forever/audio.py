# The Sound That Rises Forever: a REAL Shepard-Risset glissando (same numbers as www/art.js) under everything, then real tritone pairs.
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
P, NL, F0 = 10, 9, 30.0
def bell(u): return np.sin(np.pi * u) ** 2
# ---------- the glissando: each layer climbs one octave every P seconds ----------
sh = np.zeros(N)
for k in range(NL):
    u = ((k + (t + 6) / P) / NL) % 1          # +6 matches the picture's clock
    f = F0 * 2 ** (u * NL)
    sh += np.sin(2 * np.pi * np.cumsum(f) / SR) * bell(u)
sh /= np.max(np.abs(sh))
stop = E(14) + .1
env = S.env([(0, .72), (.25, .42), (E(0), .42), (E(0) + .25, .72), (T(1) - .2, .72), (T(1), .34), (E(8), .34), (E(8) + .2, .72), (T(9) - .2, .72), (T(9), .34),
             (T(14), .34), (stop, 0), (DUR, 0)])
S.add(sh * env, .62)
# ---------- soft low pulse, stops with the tone ----------
mus = np.zeros(N); beat = 60 / 74
for b in range(int(stop / beat)):
    place(mus, lp(ep(33 if b % 8 < 6 else 31, beat * 1.2), 300), b * beat, .8)
S.add(mus * S.env([(0, .6), (stop - 1, .6), (stop, 0), (DUR, 0)]), .4)
# ---------- the tritone pairs: discrete Shepard tones C then F#, identical envelope ----------
def stone(pc, d=.65):
    n = int(d * SR); tt = np.arange(n) / SR; x = np.zeros(n)
    for o in range(NL):
        f = 32.703 * 2 ** (o + pc / 12); u = np.log2(f / F0) / NL
        if 0 < u < 1: x += np.sin(2 * np.pi * f * tt) * bell(u)
    return x * np.minimum(1, tt / .02) * np.minimum(1, (d - tt) / .12)
fx = S.buf()
a, b = E(15) + .3, E(16) + .5
for s in (a, a + 2.0, b, b + 2.1):
    place(fx, stone(0), s, .2); place(fx, stone(6), s + .75, .2)
# ---------- cuts and small hits ----------
place(fx, thump(1.6, 70, 30), .03, .22)
for sc, (x, y) in SCN.items():
    if x > 1: place(fx, bp(white(int(.45 * SR), int(x * 10)), 200, 2500) * np.hanning(int(.45 * SR)), x - .3, .07)
place(fx, thump(.9, 110, 50), wi(0, 'never'), .2)
place(fx, tone(880, .3, .002, 10) * .5, wi(2, '1964') - .05, .15)
for i in range(8): place(fx, tone(420 * 2 ** (i / 4), .1, .002, 22), wi(3, 'stack') - .2 + i * .12, .1)
for i in (5, 6, 7):
    place(fx, tone(1046, .2, .002, 14), (wi(5, 'rule') if i == 5 else T(i)) + .05, .16)
place(fx, thump(.8, 120, 60), wi(9, 'ladder'), .18)
place(fx, thump(1.0, 90, 40), wi(10, 'erased'), .2)
for w in ('endless', 'batpod', 'dunkirk'): place(fx, thump(.6, 140, 70), wi(11, w) - .1, .13); place(fx, tone(990, .25, .002, 10), wi(11, w) - .1, .05)
place(fx, tone(660, .4, .002, 6) * .6, wi(12, 'half') - .05, .15)
place(fx, tone(1320, .4, .002, 8), wi(13, 'guess') - .05, .12)
place(fx, tone(784, .3, .002, 8), wi(14, 'rise'), .12); place(fx, tone(392, .3, .002, 8), wi(14, 'fall'), .14)
S.add(reverb(fx, 1.2, .12, 7), 1.0)
S.finish(bed_gain=.22, duck=.3)
