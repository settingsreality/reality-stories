# Weather Balloon: music pulse under everything, prairie wind, CRT hum, the launch, the pop, the pressure heartbeat, the radio, my pulse.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def lerp(a, b, k): return a + (b - a) * min(1, max(0, k))
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalpha() or c in "'-") == word: return w['start']
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
keep = wi(13, 'keeping')

# ---------- music: dark pulse at 72 bpm (D minor) ----------
bpm = 72; beat = 60 / bpm
mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]  # Dm Bb C A
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 24), .3, .002, 14) * .22, at, .5)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .55), (T(1), .8), (T(3), .6), (T(7), .8), (T(8), 1.0), (wi(9, 'heartbeat') - .05, 1.0), (wi(9, 'heartbeat') + .05, .1), (T(10), .7),
                 (T(12), .9), (keep - .3, 1.15), (keep - .02, 1.15), (keep + .02, 0), (keep + 1.2, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

# ---------- room: prairie wind outside (louder at the launch), CRT hum inside ----------
wind = bp(white(N, 6), 250, 1600) * (.6 + .4 * np.sin(2 * np.pi * .11 * t) * np.sin(2 * np.pi * .05 * t + 1))
S.add(wind * S.env([(0, .3), (SCN['s2'][0] - .1, .3), (SCN['s2'][0], 1.0), (SCN['s3'][0], .4), (SCN['s4'][0], .25), (DUR, .3)]), .06, -.3)
hum = (np.sin(2 * np.pi * 60 * t) * .5 + np.sin(2 * np.pi * 120 * t) * .3 + bp(white(N, 8), 14000, 16000) * .2)
S.add(hum * S.env([(0, 1), (SCN['s2'][0], 0), (SCN['s4'][0], .5), (SCN['s6'][0], 1), (DUR, 1)]), .025)

fx = S.buf()
place(fx, sting() * .6, .05, .32); place(fx, thump(2.5, 70, 28), .05, .35)
place(fx, sting(2.0, (466, 494, 698)) * .5, wi(0, 'ninety-eight'), .18)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
# the launch: a whoosh of rubber and wind
place(fx, bp(white(int(1.2 * SR), 3), 150, 900) * np.hanning(int(1.2 * SR)), wi(1, 'launch'), .25)
# the pop (far away, high up)
p = bp(white(int(.25 * SR), 9), 600, 7000) * np.exp(-np.arange(int(.25 * SR)) / SR * 30)
place(fx, p, wi(2, 'pops'), .8); place(fx, thump(1.2, 120, 60), wi(2, 'pops'), .3)
for i in (4, 5, 6): place(fx, scratch(i, 1.0), T(i) + .05, .12)
place(fx, sting(2.5, (220, 233, 330)) * .5, wi(7, 'stopped'), .16)
# the balloon's heartbeat (from "pressure" on, 72 bpm), louder at "heartbeat"
heartbeat(fx, wi(8, 'pulsing'), T(10), 60 / 72, .3)
place(fx, thump(2.0, 80, 30), wi(9, 'heartbeat'), .45)
heartbeat(fx, T(10), T(13), 60 / 72, .14)
# radio
for at in (wi(10, 'crackled') - .1, T(11) - .25, E(11) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
place(fx, tone(1400, .12, .002, 30), T(11) - .3, .15)
# my pulse speeding up, the screen keeping time with it
x = T(13) - .2; k = 0
while x < DUR - 1.5:
    per = 60 / lerp(88, 112, (x - T(13)) / max(.1, E(13) - T(13)))
    heartbeat(fx, x, x + .01, per, .55 if x > keep - .3 else .4); x += per
place(fx, sting() * .8, keep - .02, .42); place(fx, thump(3.0, 80, 26), keep, .55)
# end: latex creaking, stretched
for k in range(5): place(fx, creak(1.2, 140 + k * 9, k), T(last) - .4 + k * .7, .10)
place(fx, ep(26, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)

S.finish(bed_gain=.16, duck=.4)
