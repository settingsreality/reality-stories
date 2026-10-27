# How the Universe Ends: a big slow cosmic bed, a pulse that changes per ending, and a sound for each ending.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalnum() or c == "'") == word: return w['start']
    return W(i, .5)
mus = np.zeros(N); beat = 60 / 76
prog = [(45, 52, 57, 60, 64), (41, 48, 53, 57, 60), (43, 50, 55, 59, 62), (40, 47, 52, 55, 59)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.4), 280), at, .8)
    if b % 2 == 0: place(mus, ep(ch[4] + 12, 1.2) * .15, at + beat * .5)
    if b % 8 == 0:
        n = int(beat * 8.3 * SR); tt = np.arange(n) / SR
        place(mus, lp(sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.6) * np.exp(-tt * .2), 1600) * .2, at)
nothing = wi(4, 'nothing')
S.add(mus * S.env([(0, .7), (T(2), .8), (nothing - .2, .8), (nothing + .3, .05), (T(5) - .3, .05), (T(5), 1.0), (E(7), 1.1), (E(7) + .3, .1), (T(8), .9), (T(10), .8), (T(12), 1.0), (DUR, .7)]), .5)
fx = S.buf()
place(fx, sting(3.0, (220, 277, 330, 440)) * .5, .05, .25); place(fx, thump(2.5, 60, 25), .05, .3)
for sc in S.TL['scenes'][1:]: place(fx, bp(white(int(.5 * SR), int(sc['start'] * 10)), 250, 3000) * np.hanning(int(.5 * SR)), sc['start'] - .35, .08)
# freeze: glassy shimmer
for k in range(8):
    place(fx, tone(mtof(84 + (k * 5) % 12), 2.5, .01, 1.5) * .3, T(2) + .3 + k * .45, .15)
# black holes evaporating: a faint fizz
place(fx, bp(white(int(4 * SR), 5), 3000, 9000) * np.linspace(1, 0, int(4 * SR)) * .3, wi(4, 'evaporate') - .2, .12)
# rip: tearing noise building, hits on each stage
n = int((E(7) - T(5)) * SR); tt = np.arange(n) / SR
tear = bp(white(n, 7), 400, 4000) * (tt / tt[-1]) ** 2 * (np.random.default_rng(3).random(n) < .4)
place(fx, tear, T(5), .25)
for w, (i, word) in enumerate([(6, 'galaxies'), (6, 'solar'), (7, 'planets'), (7, 'atoms')]):
    place(fx, thump(1.8, 90, 35), wi(i, word), .3 + w * .06)
place(fx, sting() * .7, wi(7, 'atoms') + .1, .4)
# crunch: everything rushing inward
n = int(6 * SR); tt = np.arange(n) / SR; f = 60 + 900 * (tt / tt[-1]) ** 3
place(fx, np.sin(2 * np.pi * np.cumsum(f) / SR) * (tt / tt[-1]) * .3 + bp(white(n, 9), 200, 2000) * (tt / tt[-1]) ** 2 * .5, wi(8, 'falls') - 3.5, .25)
place(fx, thump(3.0, 80, 26), wi(8, 'falls') + 2.4, .45)
# the date: two soft hits
place(fx, ep(57, 2.5) * .5, wi(10, 'eleven'), .3); place(fx, ep(52, 3.0) * .5, wi(10, 'twenty'), .35)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 2.2, .25, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
