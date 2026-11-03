# Dead Pixel: mains hum and a thin screen whine, slow electronic pulse, digital glitch ticks, a low hit for every doubling, wrench clang, the sky creaking.
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
def clang(f=620):
    m = int(1.1 * SR); tt = np.arange(m) / SR
    return sum(np.sin(2 * np.pi * f * r * tt) * a * np.exp(-tt * d) for r, a, d in ((1, 1, 6), (2.76, .6, 9), (5.4, .35, 14), (8.9, .2, 20)))
def glitch(seed, d=.25):
    m = int(d * SR); r = np.random.default_rng(seed); blk = r.integers(200, 1400, 40).cumsum(); x = np.zeros(m); p = 0
    for b in blk:
        if p >= m: break
        x[p:min(b, m)] = r.choice([0, 1, -1, 0]) * r.random(); p = b
    return bp(x, 500, 7000)
th = wi(0, 'threw'); fp = wi(9, 'pressed'); ty = wi(10, 'flying'); read = wi(12, 'i'); lift = wi(14, 'lifted'); tool = wi(14, 'tool'); out = wi(15, 'out')
# ---------- electronic pulse (E minor), 66 bpm ----------
bpm = 66; beat = 60 / bpm; mus = np.zeros(N)
prog = [(40, 52, 55, 59), (36, 48, 52, 55), (38, 50, 53, 57), (35, 47, 50, 54)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.5) * 1.2, 280), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 43), .25, .002, 18) * .13, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sign(np.sin(2 * np.pi * mtof(q) * tt + q)) * .5 + np.sin(2 * np.pi * mtof(q) * tt) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1100) * .16, at)
env = S.env([(0, .55), (T(1), .7), (T(3), .55), (T(6), .7), (T(8), .85), (T(9), .5), (T(10), .75), (T(13), .35), (T(14), .9), (out - .1, 1), (T(last), .6), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * env, .5)
# ---------- mains hum + the screen whine that climbs with the size ----------
S.add(np.sin(2 * np.pi * 60 * t) * .6 + np.sin(2 * np.pi * 120 * t) * .3 + bp(white(N, 9), 80, 300) * .4, .025)
whine = np.sin(2 * np.pi * (2200 + 900 * t / DUR) * t) + .5 * np.sin(2 * np.pi * 3300 * t)
S.add(whine * S.env([(0, .6), (T(1), .15), (T(8), .15), (E(8), 1.0), (T(13), .3), (T(14), 1.0), (DUR, 1.2)]), .005)
fx = S.buf()
place(fx, sting() * .55, wi(0, 'black') - .03, .25)
place(fx, glitch(1, .4), T(0), .12)
place(fx, clang(), th + .85, .22); place(fx, thump(2.4, 70, 28), th + .85, .4)
for sc, (a, b) in SCN.items():
    if a > 1:
        place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .09)
        place(fx, glitch(int(a), .14), a - .05, .1)
place(fx, thump(1.5, 60, 30), wi(1, 'hair') - .05, .25)
place(fx, sting() * .4, wi(2, 'never') - .05, .2)
for i in (3, 4, 5): place(fx, scratch(i, 1.0), T(i) + .05, .12)
for w in ('laptop', 'tv'): place(fx, beep(1600, .05), wi(6, w), .16)
place(fx, sting() * .4, wi(6, 'every') - .03, .22)
place(fx, thump(2.0, 80, 26), wi(7, 'off') - .02, .4)  # power cut
place(fx, sting() * .5, wi(7, 'floating') - .03, .25)
# a low hit per doubling, accelerating
a = wi(8, 'doubled'); b = wi(8, 'door')
for k in range(1, 16):
    place(fx, thump(1.2 + k * .1, 70, 28), a + (b - a) * k / 15, .08 + k * .018)
place(fx, sting() * .6, b - .03, .28)
place(fx, glitch(5, .5), fp + .1, .18); place(fx, thump(2.0, 60, 28), wi(9, "wasn't") - .02, .32)
place(fx, bp(white(int(.5 * SR), 3), 300, 2400) * np.hanning(int(.5 * SR)), wi(10, 'threw'), .14)
tn = wi(10, 'ten')
for k in range(int(ty - tn) * 2 + 1): place(fx, beep(1000, .03), tn + k * .4, .1)
place(fx, clang(540), ty + .6, .28); place(fx, sting() * .6, ty + .05, .3); place(fx, thump(2.6, 80, 26), ty + .6, .45)
place(fx, clang(1300) * .5, wi(11, 'out') + .3, .12)
place(fx, beep(1400, .08), wi(11, 'one') - .05, .2); place(fx, beep(1800, .1), wi(11, 'one') + .07, .2)
place(fx, scratch(8, 1.0), wi(12, 'broken', 0) - .35, .16); place(fx, scratch(9, 1.0), wi(12, 'broken', 1) - .35, .16)
place(fx, thump(2.2, 70, 28), read - .02, .4); place(fx, sting() * .4, read - .02, .2)
for w, n in (('you', 0), ('you', 1), ('you', 2)): place(fx, beep(1500, .06), wi(13, w, n) - .05, .18)
place(fx, sting() * .75, wi(13, 'you', 2) - .03, .32)
place(fx, creak(2.6, 55, 3), lift - .1, .5); place(fx, thump(3.0, 50, 22), lift, .45)
place(fx, creak(1.6, 90, 5), tool - .3, .4); place(fx, sting() * .55, wi(14, 'glass') - .03, .25)
for k in range(10): place(fx, glitch(30 + k, .1), T(15) + k * .55, .09)
place(fx, sting() * .8, out - .02, .35); place(fx, thump(3.0, 80, 26), out, .5)
heartbeat(fx, T(last) - .1, DUR - 1, .6, .35)
place(fx, ep(40, 4.0) * .8, T(last), .25)
S.add(reverb(fx, 1.6, .2, 7), 1.0)
S.finish(bed_gain=.16, duck=.4)
