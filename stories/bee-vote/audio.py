# The Bee Vote: light curious pulse, swarm buzz, waggle buzzes, the head-butt beep, quorum warm-up, takeoff roar.
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
hb = wi(8, 'headbutts'); beepw = wi(8, 'beep'); fif = wi(9, 'fifteen'); n95 = wi(10, 'ninetyfive'); tog = wi(11, 'together')

def buzz(f, d, seed=1, g=1.0):
    m = int(d * SR); tt = np.arange(m) / SR; r = np.random.default_rng(seed)
    fm = f * (1 + .03 * np.sin(2 * np.pi * (5 + r.random() * 3) * tt))
    x = np.sign(np.sin(2 * np.pi * np.cumsum(fm) / SR)) * .4 + np.sin(2 * np.pi * np.cumsum(fm) / SR) * .6
    return bp(x, 150, 2500) * np.minimum(1, tt / .03) * np.minimum(1, (d - tt) / .05) * g

# ---------- light pulse (D dorian-ish, plucky), 92 bpm ----------
bpm = 92; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (36, 48, 52, 55), (41, 53, 57, 60), (43, 55, 59, 62)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.2) * 1.1, 320), at, .8)
    place(mus, tone(mtof(ch[1 + (b % 3)] + 12), .22, .003, 12) * .22, at + (beat / 2 if b % 2 else 0), .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt + q) for q in ch[1:]) * np.minimum(1, tt / 1.2) * np.exp(-tt * .3)
        place(mus, lp(pad, 1600) * .18, at)
mus_env = S.env([(0, .5), (T(1), .8), (hb - .1, .8), (hb, .3), (beepw + .5, .8), (n95 - .3, .9), (tog, 1.0), (T(12), .6), (T(13), .7), (T(last) - .2, .6), (E(last) + 1, .8), (DUR, .6)])
S.add(mus * mus_env, .5)

# ---------- swarm buzz bed: loud on the branch, swells at quorum/takeoff ----------
bed = sum(bp(np.sign(np.sin(2 * np.pi * (f + 3 * np.sin(2 * np.pi * .3 * t + f)) * t)), 120, 1800) for f in (218, 231, 244, 262)) / 4
bed_env = S.env([(0, 1.0), (SCN['c2'][0], .25), (T(2), .8), (SCN['c3'][0], .6), (SCN['c4'][0], .1), (T(10), .5), (n95, 1.2), (tog, 1.6), (tog + 2.5, .5), (T(12), .1), (T(last), .3), (DUR, .3)])
S.add(bed * bed_env, .05)

fx = S.buf()
place(fx, thump(1.8, 70, 30), .05, .25)
# whoosh on scene cuts
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .09)
# ballot pop
place(fx, tone(880, .3, .002, 10) * .5 + tone(1320, .3, .002, 12) * .3, wi(0, 'holding') - .1, .25)
# the queen leaving: a rising buzz
place(fx, buzz(240, 2.0, 3) * np.linspace(.3, 1, int(2.0 * SR)), wi(1, 'queen') - .3, .25)
# rule ticks
for i in (4, 5, 6): place(fx, tone(1046, .2, .002, 14), T(i) + .08, .2)
# waggle buzzes during the rules and the laps (short bursts)
x = T(4)
while x < E(7):
    place(fx, buzz(260, .35, int(x * 9)), x, .07); x += .9
# counting up the laps: ticks
for k in range(18): place(fx, tone(1568, .05, .001, 40), wi(7, 'hundred') - .3 + k * .07, .06)
# head-butt: bonk + the beep
place(fx, thump(.5, 160, 90), hb, .5)
place(fx, tone(1300, .14, .002, 4) * .9, beepw - .02, .4)
# quorum count ticks up to 15
x = wi(9, 'strong') - .3; d = (fif + .1 - x) / 12
for k in range(12): place(fx, tone(880 + k * 40, .06, .001, 30), x + k * d, .08)
place(fx, tone(1760, .4, .002, 6) * .6, fif - .02, .3)
# warm-up: rising buzz into takeoff
m = int((tog - T(10) + .5) * SR); tt = np.arange(m) / SR
rise = bp(np.sign(np.sin(2 * np.pi * np.cumsum(180 + 120 * tt / tt[-1]) / SR)), 150, 2500) * (tt / tt[-1]) ** 1.5
place(fx, rise, T(10), .12)
place(fx, thump(2.2, 70, 30), tog - .05, .35)
# 16 hours hit
place(fx, tone(784, .6, .003, 4) * .4 + tone(1175, .6, .003, 4) * .3, wi(11, 'sixteen') - .05, .3)
place(fx, thump(1.2, 90, 40), wi(12, 'vote') - .1, .25)
# excite / inhibit
place(fx, tone(660, .3, .002, 8) + tone(990, .3, .002, 8) * .6, wi(13, 'dances') - .05, .2)
place(fx, thump(.5, 150, 80), wi(13, 'headbutts') - .05, .35)
place(fx, ep(38, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.4, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
