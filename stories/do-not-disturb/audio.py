# Do Not Disturb: hotel lobby hum, a desk phone, paper flapping in the wind, the sky knocks, a card slides under the door.
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
def ringer(d):
    m = int(d * SR); tt = np.arange(m) / SR; gate = (np.floor(tt * 25) % 2) * (tt % 2 < 1.2)
    return (np.sin(2 * np.pi * 1300 * tt) + .6 * np.sin(2 * np.pi * 1700 * tt)) * gate * .3
def bigknock(seed):  # a knock on the sky: deep, wide, with a door-like rattle
    m = int(1.2 * SR); tt = np.arange(m) / SR
    return lp(white(m, seed), 400) * np.exp(-tt * 9) * 2.5 + np.sin(2 * np.pi * 42 * tt) * np.exp(-tt * 4) * 1.4
def flap(d, seed):
    m = int(d * SR); tt = np.arange(m) / SR
    return bp(white(m, seed), 300, 3000) * (np.abs(np.sin(2 * np.pi * 3.2 * tt)) ** 6) * np.hanning(m)
def chime(f, d=1.5):
    m = int(d * SR); tt = np.arange(m) / SR
    return sum(np.sin(2 * np.pi * f * k * tt) * np.exp(-tt * (3 + k)) / k for k in (1, 2.4, 3.9))
# ---------- music: a slightly wrong hotel-lobby waltz in A minor, 84 bpm, 3/4 ----------
bpm = 84; beat = 60 / bpm; mus = np.zeros(N)
prog = [(45, 57, 60, 64), (41, 53, 57, 60), (43, 55, 59, 62), (40, 52, 56, 59)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 6) % 4]
    if b % 3 == 0: place(mus, lp(ep(ch[0], beat * 1.5) * 1.1, 260), at, .8)
    else: place(mus, tone(mtof(ch[1 + b % 3] + 12), .35, .004, 7) * .12, at, .5)
    if b % 6 == 0:
        m = int(beat * 6.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt * (1 + .002 * np.sin(2 * np.pi * .3 * tt))) for q in ch[1:]) * np.minimum(1, tt / 1.2) * np.exp(-tt * .3)
        place(mus, lp(pad, 900) * .18, at)
env = S.env([(0, .55), (T(1), .65), (T(5), .7), (T(10), .9), (T(12), 1.0), (T(13), .5), (T(14), .7), (T(15), .9), (DUR, .7)])
S.add(mus * env, .5)
S.add(lp(white(N, 21), 250) * .5, .03)  # room tone
fx = S.buf()
for k, a in enumerate((wi(0, 'knocked'), wi(0, 'knocked') + .35, wi(0, 'knocked') + .7)): place(fx, bigknock(10 + k), a, .5)
place(fx, sting() * .5, wi(0, 'please') - .03, .25)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.4 * SR)), a - .28, .07)
place(fx, ringer(2.4), T(2) + .2, .2)
place(fx, flap(3.0, 4), T(3), .25); place(fx, sting() * .4, wi(3, 'disturb') - .03, .2)
place(fx, chime(660), wi(4, 'doorknob'), .2)
for i in (6, 7, 8): place(fx, thump(1.2, 90, 30), T(i), .22)
place(fx, lp(bp(white(int(5 * SR), 6), 200, 1500), 900) * np.hanning(int(5 * SR)), T(10) - .3, .2); place(fx, flap(2.5, 7), wi(10, 'turned') - .8, .4)
place(fx, sting() * .6, T(11) - .03, .28); place(fx, thump(3.0, 50, 22), wi(11, 'dim'), .4)
ks = [wi(12, 'three'), wi(12, 'knocks'), wi(12, 'so')]
for k, a in enumerate(ks):
    place(fx, bigknock(30 + k), a, .7)
    place(fx, chime(1800 + 200 * k, .8) * .5, a + .05, .12)
place(fx, sting() * .7, wi(12, 'housekeeping') - .03, .3)
place(fx, thump(2.6, 60, 24), wi(13, 'town'), .45); place(fx, sting() * .6, wi(13, 'town') - .03, .3)
place(fx, bp(white(int(.8 * SR), 9), 1500, 6000) * np.hanning(int(.8 * SR)), wi(14, 'slid') - .1, .2)
place(fx, sting() * .5, wi(14, 'door') - .03, .22)
for k in range(3): place(fx, bigknock(40 + k), T(last) + 1.2 + k * .7, .6)
heartbeat(fx, T(last) + 3.5, DUR - .5, .6, .3)
S.add(reverb(fx, 1.8, .25, 7), 1.0)
S.finish(bed_gain=.3, duck=.4)
