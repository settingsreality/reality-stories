# Night Groomer: music pulse under everything, the cat's diesel, wind, the winch, the radio, hits on the turns.
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
same = wi(14, 'same')

# ---------- music: a dark pulse at 72 bpm (A minor), always there, swelling toward the end ----------
bpm = 72; beat = 60 / bpm
mus = np.zeros(N)
prog = [(45, 52, 57, 60), (41, 48, 53, 57), (38, 45, 50, 53), (40, 47, 52, 56)]  # Am F Dm E
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)            # bass pulse on every beat
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 12), .3, .002, 14) * .25, at, .5)   # off-beat tick
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .55), (T(1), .8), (T(3), .65), (T(6), .8), (T(9), 1.0), (wi(9, 'by') - .05, 1.0), (wi(9, 'by') + .05, .15), (T(10), 1.1), (T(11), .7),
                 (T(13), .9), (same - .3, 1.15), (same - .02, 1.15), (same + .02, 0), (same + 1.4, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

# ---------- the cat: diesel rumble (in the cab), strained when the winch takes over ----------
eng = (np.sin(2 * np.pi * 31 * t + 2 * np.sin(2 * np.pi * 2.1 * t)) * .5 + lp(white(N, 4), 90) * 3 + bp(white(N, 5), 120, 400) * .4) * (1 + .15 * np.sin(2 * np.pi * 7.5 * t))
eng_env = S.env([(0, 1), (SCN['s2'][0] - .1, 1), (SCN['s2'][0], .25), (SCN['s3'][0], .1), (SCN['s5'][0], .25), (SCN['s6'][0], 1), (SCN['s7'][0], 1.4),
                 (SCN['s8'][0], 1.7), (SCN['s9'][0], 1.0), (SCN['s10'][0], .7), (SCN['s11'][0], 1.1), (DUR, 1.1)])
S.add(eng * eng_env, .16)
wind = bp(white(N, 6), 300, 1800) * (.6 + .4 * np.sin(2 * np.pi * .13 * t) * np.sin(2 * np.pi * .07 * t + 1))
S.add(wind * S.env([(0, .6), (SCN['s2'][0], 1.0), (SCN['s3'][0], .15), (SCN['s5'][0], .8), (SCN['s6'][0], .6), (DUR, .8)]), .05, -.3)

fx = S.buf()
# cold open hit
place(fx, sting() * .6, .05, .32); place(fx, thump(2.5, 70, 28), .05, .35)
# a soft whoosh on every scene cut
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
# pen strokes as each rule appears
for i in (3, 4, 5): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# the first one
place(fx, sting(2.5, (220, 233, 330)) * .5, wi(7, 'first'), .16)
# the winch: ratchet clicks speeding up + a rising motor whine
a0, a1 = T(9), SCN['s8'][1] + .6
k = 0; x = a0
while x < a1:
    place(fx, bp(white(int(.03 * SR), k), 1500, 6000) * np.hanning(int(.03 * SR)), x, .22); k += 1; x += lerp(.22, .06, (x - a0) / (a1 - a0))
n = int((a1 - a0) * SR); tt = np.arange(n) / SR; f = 180 + 520 * (tt / tt[-1]) ** 1.5
whine = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .3 + np.sin(2 * np.pi * np.cumsum(f * 2) / SR) * .3
place(fx, lp(whine, 2500) * np.minimum(1, tt / .4) * np.minimum(1, (tt[-1] - tt) / .3), a0, .07)
place(fx, thump(2.0, 90, 30), T(9), .4)
# the crowd: a low choir-ish cluster when we see all of them
n = int(4.5 * SR); tt = np.arange(n) / SR
place(fx, lp(sum(np.sin(2 * np.pi * f0 * tt + f0) for f0 in (110, 116.5, 164.8, 174.6)) * np.minimum(1, tt / 1.2) * np.exp(-tt * .5), 900) * .3, wi(10, 'all') - .2, .25)
# radio: crackle when it wakes, squelch around Walt's voice
for at in (wi(11, 'crackled') - .1, T(12) - .25, E(12) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
place(fx, tone(1400, .12, .002, 30), T(12) - .3, .15)
# heartbeat while deciding
heartbeat(fx, T(13) - .2, same - .4, .62, .45)
# same as mine
place(fx, sting() * .8, same - .02, .42); place(fx, thump(3.0, 80, 26), same, .6)
# end: the cable creaks, a last low note under the question
for k in range(5): place(fx, creak(1.2, 90 + k * 7, k), T(last) - .4 + k * .7, .12)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)

S.finish(bed_gain=.2, duck=.4)
