# The 42-Minute Fall: airy synth pulse, a falling whoosh that peaks at the centre, pops on the numbers.
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
def pop(f=880, d=.18):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt * (1 + .5 * np.exp(-tt * 30))) * np.exp(-tt * 18)
def whoosh(d, seed, up=True):
    m = int(d * SR); tt = np.arange(m) / SR; e = np.sin(np.pi * tt / d) ** 2
    return bp(white(m, seed), 300, 3000) * e
# ---------- music: bright-ish minor/major pulse (A minor -> F -> C -> G), 90 bpm ----------
bpm = 90; beat = 60 / bpm; mus = np.zeros(N)
prog = [(45, 57, 60, 64), (41, 53, 57, 60), (48, 55, 60, 64), (43, 55, 59, 62)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    if b % 2 == 0: place(mus, lp(ep(ch[0], beat * 1.8) * 1.1, 300), at, .8)
    place(mus, tone(mtof(ch[1 + b % 3] + 12), .3, .004, 7) * .12, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.2) * np.exp(-tt * .2)
        place(mus, lp(pad, 1100) * .18, at)
env = S.env([(0, .5), (T(1), .65), (T(6), .8), (T(9), .7), (T(11), .8), (T(last), .5), (DUR, .7)])
S.add(mus * env, .5)
fx = S.buf()
place(fx, whoosh(5.0, 1), .1, .35); place(fx, pop(660), wi(0, '42'), .35)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 300, 3000) * np.hanning(int(.4 * SR)), a - .28, .07)
place(fx, pop(990), wi(1, '300'), .3)
for k in range(5): place(fx, pop(500 + k * 120, .1), wi(3, 'ten') + k * .5, .2)
place(fx, whoosh(4.0, 2), T(4), .2); place(fx, pop(440), wi(5, 'nothing'), .35)
place(fx, whoosh(2.0, 3), wi(6, 'eight') - .6, .5); place(fx, pop(1200), wi(6, 'eight'), .3)
place(fx, thump(1.4, 90, 40), wi(7, 'exactly'), .4)
place(fx, pop(660), wi(8, '84'), .3); place(fx, pop(660), wi(9, '42'), .3); place(fx, pop(880), wi(9, '42') + .12, .25)
place(fx, pop(990), wi(12, '38'), .35)
place(fx, sting(3.0) * .4, wi(13, 'hot') - .05, .2); place(fx, thump(2.2, 70, 30), wi(13, 'jump'), .35)
S.add(reverb(fx, 1.2, .2, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
