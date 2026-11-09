# The Mirror Question: warm curious pulse, soft whooshes, chimes on the reveals.
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
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
bpm = 84; beat = 60 / bpm
mus = np.zeros(N)
prog = [(45, 52, 57, 60), (41, 48, 53, 57), (43, 50, 55, 59), (40, 47, 52, 55)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.5) * 1.1, 320), at, .8)
    place(mus, tone(mtof(ch[1 + b % 3] + 12), .35, .004, 9) * .3, at, .28)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.2) * np.exp(-tt * .2)
        place(mus, lp(pad, 1600) * .2, at)
S.add(mus * S.env([(0, .7), (T(2), .8), (T(10), 1.0), (T(last), .7), (DUR, .6)]), .5)
fx = S.buf()
def chime(at, k=1): place(fx, tone(1046.5, .35, .002, 7) * .35 + tone(1568, .35, .002, 9) * .2, at, k)
def whoosh(at, g=.1):
    n = int(.5 * SR); place(fx, bp(white(n, int(at * 10)), 300, 3500) * np.hanning(n), at - .3, g)
for sc, (a, b) in SCN.items():
    if a > 1: whoosh(a, .12)
place(fx, thump(2.2, 80, 34), .05, .3); chime(wi(0, 'never'), .35)
chime(wi(2, 'same'), .32); chime(wi(3, 'front'), .35); chime(wi(4, 'lefthand') if False else W(4, .55), .3)
place(fx, sting(1.5) * .3, wi(6, 'you'), .22); chime(wi(6, 'you'), .3)
chime(wi(8, 'normal'), .35); chime(wi(9, 'upside'), .3); chime(wi(10, 'real'), .4)
S.add(reverb(fx, 1.6, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
