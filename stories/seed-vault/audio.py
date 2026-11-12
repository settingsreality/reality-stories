# The Backup: cold dark pulse, arctic wind outside / vault ventilation inside, door clunks, temp ticks, frost footsteps, radio, hits on the turns.
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
inside, ten, two, boots, nxt, seal = wi(0, 'inside'), wi(7, 'ten'), wi(7, 'two'), wi(11, 'boots'), wi(12, 'next'), wi(13, 'seal')

bpm = 64; beat = 60 / bpm
mus = np.zeros(N)
prog = [(38, 45, 50, 53), (34, 41, 46, 50), (36, 43, 48, 51), (33, 40, 45, 49)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 24), .3, .002, 14) * .2, at, .5)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .6), (T(1), .7), (T(4), .6), (T(7), .9), (T(8), 1.0), (boots - .05, 1.0), (boots + .05, .2), (boots + .8, .9), (nxt - .3, 1.1), (nxt - .02, 1.1), (nxt + .02, 0), (nxt + 1.0, 0),
                 (T(13), .9), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

# wind (outside) over s2/s3, ventilation hum inside
wind = lp(white(N, 9), 500) * (1 + .5 * np.sin(2 * np.pi * .13 * t)) * 1.5
S.add(wind * S.env([(0, .2), (T(1) - .2, .2), (T(1), 1), (E(2), 1), (T(3), .25), (T(11), .25), (T(12), 1), (E(12), 1), (T(13), .3), (DUR, .3)]), .10)
hum = (np.sin(2 * np.pi * 50 * t) * .4 + lp(white(N, 4), 160) * 2)
S.add(hum * S.env([(0, 1), (DUR, 1.2)]), .09)

fx = S.buf()
place(fx, sting() * .6, .05, .32); place(fx, thump(2.5, 70, 28), .05, .35)
# heavy door clunk on "inside"
place(fx, thump(1.8, 110, 40), inside, .5); place(fx, creak(1.2, 90, 3, .4), inside + .1, .25)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
for i in (4, 5, 6): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# temperature ticks
for at in (wi(7, 'minus'), ten, two): place(fx, tone(1046, .25, .003, 12), at, .25); place(fx, tone(1568, .2, .003, 14), at + .08, .15)
place(fx, sting(2.0, (220, 233, 330)) * .5, two, .28)
# frost-crunch footsteps in the tunnel
x = T(8); k = 0
while x < E(8):
    place(fx, hp(bp(white(int(.12 * SR), k + 40), 1500, 7000) * np.hanning(int(.12 * SR)), 900), x, .22); k += 1; x += .62
place(fx, sting() * .55, wi(8, 'bare'), .3)
# crate: cold hiss
n = int(5 * SR); place(fx, bp(white(n, 77), 2000, 9000) * np.hanning(n) * .6, T(9), .10)
place(fx, thump(2.0, 90, 30), wi(9, 'backup'), .4)
# radio crackles
for at in (T(10) - .25, E(10) + .05, T(12) - .25, E(12) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
heartbeat(fx, T(11), E(12) + .2, .62, .45)
place(fx, sting(2.5, (220, 233, 330)) * .6, boots, .36); place(fx, thump(2.2, 90, 30), boots, .5)
place(fx, sting() * .8, nxt - .02, .42); place(fx, thump(3.0, 80, 26), nxt, .6)
# seal: alarm beeps + rumble of the door
for j in range(6): place(fx, tone(880, .18, .003, 10), seal + j * .5, .18)
n = int(4 * SR); tt = np.arange(n) / SR; place(fx, lp(white(n, 5), 120) * np.minimum(1, tt) * np.minimum(1, (4 - tt)) * 3, seal, .35)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
