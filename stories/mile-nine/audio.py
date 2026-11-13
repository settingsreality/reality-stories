# Mile Nine: low night pulse, the beacon's SOS beeps, phone pings, ridge wind, tracking blips, typing chirps, three knocks.
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
notHim, recv, nine, didnt, moving, toward = wi(1, 'not'), wi(2, 'received'), wi(3, 'nine'), wi(5, "didn't"), wi(7, 'moving'), wi(8, 'toward')
twelve, three, porch, zero, us = wi(9, 'twelve'), wi(9, 'three'), wi(10, 'porch'), wi(11, 'zero'), wi(12, 'us')
knocks = [E(11) + .05, E(11) + .5, E(11) + .95]

bpm = 66; beat = 60 / bpm
mus = np.zeros(N)
prog = [(40, 47, 52, 55), (36, 43, 48, 52), (38, 45, 50, 53), (35, 42, 47, 50)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 24), .3, .002, 14) * .2, at, .5)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .7), (T(1), .6), (T(4), .6), (T(7), .9), (T(9), 1.0), (zero - .05, 1.0), (zero + .05, .15), (T(12) - .1, .15), (T(12), .9),
                 (us - .02, 1.0), (us + .02, 0), (us + 1.2, 0), (T(last) - .3, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .36)

# ridge wind under s3, house hum elsewhere
wind = lp(white(N, 9), 500) * (1 + .5 * np.sin(2 * np.pi * .13 * t)) * 1.5
S.add(wind * S.env([(0, .1), (T(1) - .2, .1), (T(1), 1), (E(1), 1), (T(2), .1), (DUR, .1)]), .12)
S.add((np.sin(2 * np.pi * 60 * t) * .3 + lp(white(N, 4), 160) * 1.5) * S.env([(0, 1), (DUR, 1)]), .06)

fx = S.buf()
# cold open: the beacon's SOS beeps (... --- ...) + hit
place(fx, sting() * .55, .05, .3); place(fx, thump(2.5, 70, 28), .05, .35)
x = .25
for d in (.09, .09, .09, .27, .27, .27, .09, .09, .09):
    place(fx, tone(2200, d, .003, 3), x, .16); x += d + .1
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
place(fx, sting(2.0, (220, 233, 330)) * .5, notHim, .28)
# phone pings
def ping(at, g=.3): place(fx, tone(1318, .25, .003, 12), at, g); place(fx, tone(1760, .3, .003, 10), at + .09, g * .8)
ping(recv - .1); ping(wi(2, 'are') - .05, .2); ping(wi(7, 'replied') + .05, .25); ping(T(12) - .1, .3); ping(wi(12, 'dad') - .1, .25)
place(fx, thump(1.6, 110, 40), nine, .35)
for i in (5, 6): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# tracking blips every ~0.7 s through s8
x = T(8) + .2
while x < E(8): place(fx, tone(988, .12, .002, 20), x, .12); x += .7
place(fx, sting() * .45, toward, .25)
for at in (wi(9, 'forty'), twelve, three): place(fx, tone(660, .25, .003, 12), at, .25); place(fx, thump(1.2, 90, 40), at, .25)
# beacon types the message: chirps
x = wi(10, 'leave') - .1
while x < wi(10, 'kiddo') + .3: place(fx, tone(3000, .03, .001, 60), x, .08); x += .11
place(fx, sting(2.5, (220, 233, 330)) * .45, porch, .22)
heartbeat(fx, T(11), E(12) + .2, .62, .4)
place(fx, sting(2.0, (220, 233, 330)) * .5, zero, .3)
for i, k in enumerate(knocks):
    place(fx, thump(.5, 140, 60), k, .9); place(fx, lp(white(int(.08 * SR), 60 + i), 900) * np.hanning(int(.08 * SR)), k, .8)
place(fx, sting() * .8, us - .02, .42); place(fx, thump(3.0, 80, 26), us, .6)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.6, .22, 7), 1.0)
S.finish(bed_gain=.17, duck=.4)
