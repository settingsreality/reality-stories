# 8 Minutes, 20 Seconds: slow warm pad + ticking clock under the countdown, a low drop when the sky goes black, pops on numbers.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word, n=0):
    c = 0
    for w in S.LN[i].get('words', []):
        if ''.join(ch for ch in w['w'].lower() if ch.isalnum() or ch in "'.") .strip('.') == word:
            if c == n: return w['start']
            c += 1
    return W(i, .5)
def pop(f=880, d=.18):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt * (1 + .5 * np.exp(-tt * 30))) * np.exp(-tt * 18)
def tick(seed):
    m = int(.05 * SR); return hp(white(m, seed), 2500) * np.exp(-np.arange(m) / SR * 120)
# music: D minor -> Bb -> F -> C pad + soft pulse, 80 bpm
bpm = 80; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 50, 53, 58), (41, 53, 57, 60), (36, 52, 55, 60)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    if b % 2 == 0: place(mus, lp(ep(ch[0], beat * 1.8) * 1.1, 260), at, .8)
    place(mus, tone(mtof(ch[1 + b % 3] + 12), .3, .004, 7) * .1, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.2) * np.exp(-tt * .2)
        place(mus, lp(pad, 1000) * .2, at)
b7 = wi(7, 'black')
env = S.env([(0, .55), (T(2), .7), (b7 - .1, .8), (b7 + .05, .15), (T(8), .45), (T(10), .6), (T(12), .7), (T(last), .5), (DUR, .6)])
S.add(mus * env, .5)
fx = S.buf()
place(fx, sting(3.0) * .4, .05, .25)
for k in range(int(E(0) / .5)): place(fx, tick(k), .3 + k * .5, .25)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 300, 3000) * np.hanning(int(.4 * SR)), a - .28, .07)
place(fx, pop(660), wi(0, '8'), .3); place(fx, pop(990), wi(1, '150'), .3)
for k in range(int((E(4) - T(3)) / .5)): place(fx, tick(100 + k), T(3) + k * .5, .15)
place(fx, thump(1.4, 90, 40), wi(4, 'speed'), .35)
place(fx, thump(2.4, 70, 30), wi(5, 'collided'), .45); place(fx, pop(880), wi(6, '1.7'), .35)
place(fx, thump(3.0, 60, 22), b7, .6); place(fx, pop(1200), wi(7, '30'), .3)
place(fx, pop(660), wi(8, 'hour'), .3); place(fx, pop(880), wi(9, 'two'), .3)
place(fx, pop(500), wi(10, 'freezing'), .3)
place(fx, sting(3.0) * .4, wi(12, 'old') - .05, .2); place(fx, thump(2.2, 70, 30), T(last), .3)
S.add(reverb(fx, 1.2, .2, 7), 1.0)
S.finish(bed_gain=.23, duck=.4)
