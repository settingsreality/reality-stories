# Four Kilos: dark pulse, museum air-handler hum, soft 4 kg footsteps, tile alarm tones, radio, hits on the turns.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def lerp(a, b, k): return a + (b - a) * min(1, max(0, k))
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalpha() or c == "'") == word: return w['start']
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
nine, sev, dol = wi(9, 'nine'), wi(10, 'seventy'), wi(14, 'dolores')

bpm = 66; beat = 60 / bpm
mus = np.zeros(N)
prog = [(40, 47, 52, 55), (36, 43, 48, 52), (38, 45, 50, 53), (35, 42, 47, 51)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 12), .3, .002, 14) * .25, at, .5)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .6), (T(1), .75), (T(4), .6), (T(7), .85), (T(9), 1.0), (nine - .05, 1.0), (nine + .05, .3), (T(10), .9), (T(11), 1.15), (T(13), .85),
                 (dol - .3, 1.1), (dol - .02, 1.1), (dol + .02, 0), (dol + 1.2, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

hum = (np.sin(2 * np.pi * 58 * t) * .4 + lp(white(N, 4), 180) * 2) * (1 + .1 * np.sin(2 * np.pi * .3 * t))
S.add(hum * S.env([(0, 1), (DUR, 1.2)]), .10)

fx = S.buf()
place(fx, sting() * .6, .05, .32); place(fx, thump(2.5, 70, 28), .05, .35)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
for i in (4, 5, 6): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# the mat clicks on "one step"
place(fx, thump(1.2, 180, 60), wi(2, 'one'), .35)
# soft, light footsteps across the map
k = 0; x = T(7) + .4
while x < E(7):
    place(fx, lp(bp(white(int(.07 * SR), k), 120, 900) * np.hanning(int(.07 * SR)), 900), x, .4); place(fx, tone(1320, .08, .002, 40) * .3, x, .12); k += 1; x += .78
# the lit tile hum, then the jump
n = int(5 * SR); tt = np.arange(n) / SR
place(fx, (np.sin(2 * np.pi * 220 * tt) + np.sin(2 * np.pi * 226 * tt)) * np.minimum(1, tt / .5) * np.minimum(1, (5 - tt) / .4) * .4, wi(8, 'lit') - .1, .14)
place(fx, sting(2.5, (220, 233, 330)) * .6, nine, .34); place(fx, thump(2.2, 90, 30), nine, .5)
place(fx, sting() * .55, sev, .3); place(fx, tone(880, .25, .003, 12), sev, .2)
# weight draining: falling ticks
x = T(11); k = 0
while x < E(11) + .2:
    place(fx, tone(lerp(1400, 300, (x - T(11)) / 3.6), .05, .002, 30), x, .22); k += 1; x += .18
heartbeat(fx, T(11), E(13) + .3, .62, .45)
for at in (T(12) - .25, E(12) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
place(fx, sting() * .8, dol - .02, .42); place(fx, thump(3.0, 80, 26), dol, .6)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
