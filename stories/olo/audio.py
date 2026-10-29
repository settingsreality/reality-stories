# Olo: a bright, curious synth pulse under everything, glassy shimmer for the colour, zaps for the laser.
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

# ---------- music pulse: bass on the beat, arpeggio sparkle, pad every 8 beats ----------
mus = np.zeros(N); beat = 60 / 84
prog = [(45, 52, 57, 61, 64), (42, 49, 54, 57, 61), (38, 45, 50, 54, 57), (40, 47, 52, 56, 59)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.3), 300), at, .8)
    place(mus, ep(ch[1 + (b % 4)] + 12, .5) * .12, at + beat * .5)
    if b % 8 == 0:
        n = int(beat * 8.3 * SR); tt = np.arange(n) / SR
        place(mus, lp(sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.4) * np.exp(-tt * .2), 1800) * .2, at)
S.add(mus * S.env([(0, .8), (T(1), .8), (T(9), 1.0), (T(10), .9), (wi(10, 'vanished') - .1, .9), (wi(10, 'vanished') + .2, .1), (T(11), .8), (T(last), 1.0), (DUR, .7)]), .5)

fx = S.buf()
# cold open: a bright glassy chord + low hit
place(fx, sum(tone(mtof(m), 3.0, .01, 1.2) for m in (73, 78, 81, 85)) * .25, .05, .35); place(fx, thump(2.5, 70, 30), .05, .3)
# whoosh on every scene cut
for sc in S.TL['scenes'][1:]: place(fx, bp(white(int(.5 * SR), int(sc['start'] * 10)), 250, 3000) * np.hanning(int(.5 * SR)), sc['start'] - .35, .08)
def zap(d=.35, f0=2400, f1=600, seed=1):
    n = int(d * SR); tt = np.arange(n) / SR; f = np.linspace(f0, f1, n)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .6 + bp(white(n, seed), 2000, 8000) * .2) * np.exp(-tt * 9)
# rules card ticks + the laser into the eye
for k, w in enumerate(['bite', 'still', 'laser']): place(fx, tone(mtof(84 + k * 2), .4, .005, 8) * .5, wi(1, w), .2)
place(fx, zap(.6, 3200, 500, 2), wi(1, 'eye') - .2, .3)
# the three cones pop
for k, w in enumerate(['short', 'medium', 'long']): place(fx, tone(mtof(76 + k * 4), .6, .005, 5) * .5, wi(2, w), .22)
# stamps
place(fx, thump(1.2, 120, 50), wi(4, 'also') - .2, .25); place(fx, thump(1.6, 90, 40), wi(5, 'never') - .2, .3)
place(fx, sum(tone(mtof(m), 2.5, .02, 1.0) for m in (69, 76, 81)) * .25, wi(5, 'alone') - .1, .25)
# Oz reveal
place(fx, sting(2.5, (311, 392, 466, 622)) * .4, wi(6, 'oz') - .1, .3)
# mapping scan hum, then laser pulses on the M cones
n = int((E(7) - T(7)) * SR); tt = np.arange(n) / SR
place(fx, np.sin(2 * np.pi * (300 + 200 * tt / tt[-1]) * tt) * .25 * np.minimum(1, tt) * np.minimum(1, (tt[-1] - tt) * 2), T(7), .15)
f = wi(8, 'fires'); k = 0; at = f
while at < E(8):
    place(fx, zap(.12, 3000, 1500, k), at, .08); k += 1; at += .14 if at < wi(8, 'thousand') else .07
# olo vs nature: shimmer, then "pale" drop
for k in range(8): place(fx, tone(mtof(86 + (k * 5) % 12), 2.0, .01, 1.5) * .3, T(9) + .2 + k * .35, .12)
place(fx, thump(1.4, 100, 45), wi(9, 'pale') - .1, .25)
# jitter test: crackle, then the colour vanishes
n = int((wi(10, 'vanished') - T(10)) * SR)
place(fx, bp(white(n, 4), 1500, 7000) * (np.random.default_rng(5).random(n) < .02) * 2, T(10), .15)
place(fx, sting() * .5, wi(10, 'vanished') - .05, .3)
# 0 1 0 ticks
for w, nn in [('zero', 0), ('one', 0), ('zero', 1)]: place(fx, tone(mtof(72 if w == 'zero' else 79), .5, .005, 6) * .5, wi(11, w, nn), .2)
place(fx, sum(tone(mtof(m), 3.0, .01, 1.0) for m in (73, 78, 81, 85)) * .25, wi(11, 'short') + .4, .3)
# the question: a laser charge
place(fx, zap(1.2, 400, 2800, 9)[::-1] * .6, wi(12, 'laser') - .6, .25)
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 2.0, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
