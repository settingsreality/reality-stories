# Lady Midday: a dark pulse under everything, the heat (cicada buzz + hot wind), van engine, GPS chimes, the phone, hits on the turns.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalpha() or c == "'") == word: return w['start']
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
heat = wi(13, 'heatstroke')

# ---------- music: dark pulse at 70 bpm (D minor) ----------
bpm = 70; beat = 60 / bpm
mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (37, 49, 52, 57)]  # Dm Bb C A
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 24), .3, .002, 14) * .22, at, .5)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .55), (T(1), .75), (T(3), .6), (T(7), .85), (T(8), 1.0), (T(10), 1.05), (T(11), .8), (T(13), .95), (heat - .3, 1.15), (heat - .02, 1.15), (heat + .02, 0), (heat + 1.3, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .4)

# ---------- the heat: cicada buzz pulsing + hot wind; van engine ----------
cic = bp(white(N, 3), 4200, 6500) * (.5 + .5 * np.sin(2 * np.pi * 38 * t) ** 2) * (.6 + .4 * np.sin(2 * np.pi * .23 * t))
out = ['s3', 's4', 's11', 's12']
cic_env = S.env([(0, 1), (SCN['s3'][0] - .1, 1), (SCN['s3'][0], .1), (SCN['s5'][0], 1), (SCN['s7'][0], .6), (SCN['s8'][0], 1.3), (SCN['s10'][0], .5), (SCN['s11'][0], .2), (SCN['s13'][0], 1.4), (DUR, 1.4)])
S.add(cic * cic_env, .035, .2)
wind = bp(white(N, 6), 200, 1400) * (.6 + .4 * np.sin(2 * np.pi * .11 * t) * np.sin(2 * np.pi * .05 * t + 1))
S.add(wind * S.env([(0, .7), (SCN['s3'][0], .1), (SCN['s5'][0], .8), (SCN['s6'][0], 1.6), (SCN['s7'][0], .6), (DUR, .7)]), .05, -.3)
eng = (np.sin(2 * np.pi * 42 * t + 2 * np.sin(2 * np.pi * 1.7 * t)) * .5 + lp(white(N, 4), 110) * 3) * (1 + .1 * np.sin(2 * np.pi * 6 * t))
eng_env = S.env([(0, .6), (SCN['s2'][0], 1), (SCN['s3'][0], 0), (SCN['s6'][0], 1), (wi(9, 'stopped') - .5, 1), (wi(9, 'stopped') + .3, .2), (DUR, .2)])
S.add(eng * eng_env, .12)

fx = S.buf()
place(fx, sting() * .6, .05, .3); place(fx, thump(2.5, 70, 28), .05, .3)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
for i in (3, 4, 5): place(fx, scratch(i, 1.0), T(i) + .05, .12)
def chime(at, g=.18):
    place(fx, tone(1318, .35, .003, 9), at, g); place(fx, tone(1760, .45, .003, 8), at + .12, g)
chime(wi(0, 'question') - .1, .14)
# the dust devil whoosh
n = int(2.6 * SR); tt = np.arange(n) / SR
place(fx, bp(white(n, 9), 300, 3000) * np.sin(np.pi * tt / tt[-1]) * (1 + .5 * np.sin(2 * np.pi * 5 * tt)), T(7), .35)
# white screen: a high tone and the question chime
place(fx, tone(2600, 1.4, .01, 1.5) * .3, wi(7, 'turned'), .2)
chime(wi(8, 'why') - .15)
# the van stops: brake squeal + thump
n = int(.8 * SR); tt = np.arange(n) / SR
place(fx, np.sin(2 * np.pi * (2400 - 600 * tt) * tt) * np.exp(-tt * 3) * .3, wi(9, 'stopped') - .4, .2)
place(fx, thump(1.5, 80, 30), wi(9, 'stopped'), .35)
place(fx, sting(2.5, (220, 233, 330)) * .5, wi(9, 'right'), .18)
# every answer: a chime and a rustle of wheat, closer each time
for k in range(5):
    at = T(10) + (wi(10, 'and') - T(10)) * k / 5 + .05
    chime(at, .1)
    place(fx, bp(white(int(.5 * SR), 40 + k), 1500, 7000) * np.hanning(int(.5 * SR)), at + .2, .06 + .04 * k)
# the phone: two buzzes
for k in range(2):
    at = wi(11, 'phone') + k * .45; m = int(.3 * SR); tt = np.arange(m) / SR
    place(fx, np.sign(np.sin(2 * np.pi * 160 * tt)) * np.hanning(m) * .3, at, .25)
heartbeat(fx, T(12) - .2, heat - .4, .62, .45)
place(fx, sting() * .8, heat - .02, .42); place(fx, thump(3.0, 80, 26), heat, .6)
place(fx, ep(38, 4.0) * .8, T(last), .3)
chime(T(last) + .1, .12)
S.add(reverb(fx, 1.8, .2, 7), 1.0)

S.finish(bed_gain=.16, duck=.4)
