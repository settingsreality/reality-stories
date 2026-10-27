# Low Tide: slow dark pulse, the sea, wind, ladder creaks, an underwater hum for the light, hits on the turns.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word, n=0):
    c = 0
    for w in S.LN[i].get('words', []):
        if ''.join(ch for ch in w['w'].lower() if ch.isalpha() or ch == "'") == word:
            if c == n: return w['start']
            c += 1
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
# music: 66 bpm pulse in D minor, swelling to the end, dropping out on "nothing" and before the last line
beat = 60 / 66; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]  # Dm Bb C A
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.5) * 1.2, 260), at, .9)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        place(mus, lp(sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25), 1400) * .22, at)
nothing = wi(6, 'nothing')
S.add(mus * S.env([(0, .5), (T(1), .8), (T(3), .7), (T(5), .9), (nothing - .1, 1.0), (nothing, .1), (T(7) + .5, .6), (T(8), .4), (T(10), 1.0), (E(10), 1.1), (E(10) + .3, 0), (T(last) - .1, 0), (T(last), .7), (DUR, .6)]), .5)
# the sea: slow surf; quieter at dawn
surf = lp(white(N, 3), 700) * (0.55 + 0.45 * np.sin(2 * np.pi * t / 7.5) ** 2)
S.add(surf * S.env([(0, .9), (SCN['s5'][0], .4), (SCN['s6'][0], .5), (SCN['s7'][0], .8), (SCN['s9'][0], .3), (DUR, .3)]), .2)
wind = bp(white(N, 6), 300, 1600) * (.6 + .4 * np.sin(2 * np.pi * .11 * t))
S.add(wind * S.env([(0, .7), (SCN['s6'][0], .4), (SCN['s7'][0], .3), (DUR, .3)]), .05, .3)
fx = S.buf()
place(fx, sting() * .6, .05, .3); place(fx, thump(2.5, 70, 28), .05, .32)
for i in range(6): place(fx, bp(white(int(.03 * SR), i), 2000, 7000) * np.hanning(int(.03 * SR)), .6 + i * .55, .05)   # drips
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .08)
# the light: a cold underwater hum while it moves
n = int((E(5) + 1 - wi(3, 'light')) * SR); tt = np.arange(n) / SR
hum = (np.sin(2 * np.pi * 55 * tt) + .5 * np.sin(2 * np.pi * 82.5 * tt + 1) + .3 * np.sin(2 * np.pi * 165 * tt)) * (.6 + .4 * np.sin(2 * np.pi * .4 * tt))
place(fx, lp(hum, 400) * np.minimum(1, tt / 2) * np.minimum(1, (tt[-1] - tt) / 1.0), wi(3, 'light'), .14)
place(fx, sting(2.5, (220, 233, 330)) * .5, wi(4, 'turned'), .18)
# ladder creaks on "one rung" and "the next"
place(fx, creak(1.0, 70, 1, .4), wi(6, 'one') - .1, .5); place(fx, creak(1.0, 64, 2, .4), wi(6, 'next') - .1, .55)
heartbeat(fx, T(7), E(7) + .6, .55, .45)
# dawn: gulls far off
for k in range(3):
    m = int(.5 * SR); tt = np.arange(m) / SR; f = 1500 + 600 * np.sin(np.pi * tt / tt[-1])
    place(fx, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / tt[-1]) * .2, T(8) + .4 + k * 1.3, .2)
# he backs away; the reveal
for k in range(4): place(fx, step(k, True, False, True), wi(10, 'backed') + k * .32, .35)
place(fx, sting() * .8, T(11) + .25, .4); place(fx, thump(3.0, 80, 26), T(11) + .3, .5)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
