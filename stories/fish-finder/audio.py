# Fish Finder: wind on the shanty, ice groans, flasher ticks, the line zings, three knocks under the floor.
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
def beep(f, d=.08, g=1.0):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / .005) * np.minimum(1, (d - tt) / .02) * g
def knock(seed):
    m = int(.35 * SR); tt = np.arange(m) / SR
    return (bp(white(m, seed), 80, 700) * np.exp(-tt * 28) * 1.4 + np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 14))
def groan(d, f0, seed):  # ice settling: a low bending moan
    m = int(d * SR); tt = np.arange(m) / SR
    f = f0 * (1 + .6 * tt / d); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.sin(np.pi * tt / d) ** 2 * (.6 + .4 * bp(white(m, seed), 20, 60) * 4)
def zing(d=.6):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * (900 + 1400 * tt / d) * tt) * np.exp(-tt * 5) * .5 + bp(white(m, 3), 2000, 6000) * np.exp(-tt * 9) * .3
# ---------- music: slow minor pulse (D minor), 60 bpm ----------
bpm = 60; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.6) * 1.2, 240), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[1 + (b // 2) % 3] + 24), .5, .004, 5) * .14, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 900) * .2, at)
env = S.env([(0, .55), (T(1), .6), (T(4), .7), (T(8), .9), (T(10), 1.0), (T(12), .8), (T(13), .3), (T(14), .9), (T(last), .6), (DUR, .7)])
S.add(mus * env, .5)
# wind on the walls
S.add(lp(bp(white(N, 11), 150, 900), 600) * (.6 + .4 * np.sin(2 * np.pi * .07 * t)), .05)
fx = S.buf()
place(fx, sting() * .6, wi(0, 'upside') - .03, .3); place(fx, groan(2.5, 55, 1), .2, .3)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .07)
place(fx, groan(3.0, 45, 2), T(2), .28)
for k in range(8): place(fx, beep(1800, .03), T(3) + .3 + k * 1.0, .06)          # flasher ticks
place(fx, sting() * .4, wi(4, 'three') - .03, .2)
for i in (5, 6, 7): place(fx, thump(1.2, 90, 30), T(i), .22)
for w in ('thirty', 'twenty', 'ten'): place(fx, beep(1200 if w != 'ten' else 900, .12), wi(8, w), .2)
place(fx, thump(1.8, 60, 28), wi(8, 'ten') + .05, .35)
place(fx, sting() * .6, wi(9, 'bigger') - .03, .28)
place(fx, groan(2.0, 60, 3), T(10), .25); place(fx, thump(2.2, 70, 28), wi(10, 'sole') - .02, .42); place(fx, sting() * .6, wi(10, 'sole') - .03, .3)
place(fx, step(5, heavy=True, wet=False), wi(11, 'stepped'), .3); place(fx, step(6, heavy=True, wet=False), wi(11, 'stepped', 1), .3)
place(fx, zing(), wi(12, 'tight') - .05, .4); place(fx, bp(white(int(.3 * SR), 8), 3000, 8000) * np.hanning(int(.3 * SR)), wi(12, 'knife'), .15)
for k, w in enumerate(('three', 'slow', 'knocks')): place(fx, knock(30 + k), wi(13, w), .6)
place(fx, sting() * .5, wi(13, 'grandpa') - .03, .24)
place(fx, sting() * .7, wi(14, 'hook') - .03, .32); place(fx, thump(2.6, 70, 26), wi(14, 'hook'), .45)
place(fx, zing(.4), wi(15, 'pulls'), .3)
for k in range(3): place(fx, knock(40 + k), T(last) + k * .9, .6)
heartbeat(fx, T(last) + 2.8, DUR - .5, .6, .35)
S.add(reverb(fx, 1.4, .22, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
