# 90 Meters: wind on the nacelle, tower creaks, lift motor whine, the drop, metal knocks on the hatch, radio crackle.
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
def clank(seed, f=180):  # knuckle on a steel hatch
    m = int(.5 * SR); tt = np.arange(m) / SR
    ring = sum(np.sin(2 * np.pi * f * k * tt) * np.exp(-tt * (9 + k * 4)) / k for k in (1, 2.76, 5.4))
    return bp(white(m, seed), 100, 2500) * np.exp(-tt * 40) * 1.2 + ring * .7
def motor(d, f0, f1):
    m = int(d * SR); tt = np.arange(m) / SR; f = f0 + (f1 - f0) * tt / d
    ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) + .4 * np.sin(2 * ph) + .2 * np.sin(3.01 * ph)) * np.minimum(1, tt / .3) * np.minimum(1, (d - tt) / .3) * .5
def crackle(d, seed):
    m = int(d * SR); x = bp(white(m, seed), 1500, 5000); g = (np.random.RandomState(seed).rand(m) > .995).astype(float)
    return x * .3 + lp(g, 3000) * 6
# ---------- music: slow minor pulse (E minor), 62 bpm ----------
bpm = 62; beat = 60 / bpm; mus = np.zeros(N)
prog = [(40, 52, 55, 59), (36, 48, 52, 55), (38, 50, 53, 57), (35, 47, 50, 54)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.6) * 1.2, 240), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[1 + (b // 2) % 3] + 24), .5, .004, 5) * .14, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 900) * .2, at)
env = S.env([(0, .55), (T(1), .6), (T(3), .7), (T(8), .9), (T(11), 1.0), (T(13), .8), (T(14), .4), (T(15), .9), (DUR, .7)])
S.add(mus * env, .5)
# wind howling past the nacelle
S.add(lp(bp(white(N, 11), 200, 1200), 800) * (.55 + .45 * np.sin(2 * np.pi * .05 * t) * np.sin(2 * np.pi * .13 * t + 1)), .055)
fx = S.buf()
place(fx, motor(7.0, 70, 95), 0, .12); place(fx, sting() * .6, wi(0, 'bottom') - .03, .3)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .07)
place(fx, creak(2.5, 70, 1), T(1) + 1, .2); place(fx, creak(2.0, 60, 2), T(2) + 2, .2)
place(fx, sting() * .4, wi(3, 'three') - .03, .2)
for i in (4, 5, 6): place(fx, thump(1.2, 90, 30), T(i), .22)
for k in range(12): place(fx, step(20 + k, heavy=False, wet=False) * .6, wi(7, 'climbed') + .3 + k * .45, .16)
place(fx, motor(1.2, 140, 60), wi(8, 'dropped') - .1, .2); place(fx, thump(2.4, 60, 26), wi(8, 'dropped') + 1.0, .5); place(fx, clank(5, 120), wi(8, 'dropped') + 1.0, .3)
place(fx, sting() * .5, wi(8, 'empty') - .03, .25)
place(fx, motor(E(9) - T(9) + 1.2, 60, 110), T(9), .2)
for w in ('ten', 'forty', 'seventy'): place(fx, beep(1200 if w != 'seventy' else 900, .12), wi(9, w), .2)
place(fx, crackle(1.0, 3), wi(10, 'crackled') - .1, .25); place(fx, crackle(4.0, 4), T(10) + 1.4, .06)
place(fx, sting() * .6, wi(10, "i'm", 1) - .03, .28)
place(fx, clank(7, 140), wi(11, 'stopped'), .25)
kn = [wi(11, 'two'), wi(11, 'two') + .32, wi(11, 'one')]
for k, a in enumerate(kn): place(fx, clank(30 + k), a, .6)
place(fx, lp(bp(white(int(3 * SR), 9), 300, 2000), 900) * np.hanning(int(3 * SR)), wi(12, 'freezing') - 1, .12)
place(fx, sting() * .6, wi(12, 'let') - .03, .24)
place(fx, creak(1.5, 90, 5), wi(13, 'tight') - .1, .3); place(fx, sting() * .7, wi(13, 'dark') - .03, .34); place(fx, thump(2.6, 70, 26), wi(13, 'dark'), .45)
place(fx, sting() * .7, wi(14, 'climb') - .03, .32); place(fx, thump(2.6, 70, 26), wi(14, 'climb'), .4)
for k in range(3): place(fx, clank(40 + k), T(last) + k * .75, .6)
place(fx, crackle(1.2, 8), T(last) + 2.6, .2)
heartbeat(fx, T(last) + 2.8, DUR - .5, .6, .35)
S.add(reverb(fx, 1.4, .22, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
