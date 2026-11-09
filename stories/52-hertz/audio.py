# 52 Hertz: slow dark pulse, sea and hull, whale calls (52 Hz + audible harmonics), hits on the turns.
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
def call(dur, f=52.0, seed=1):
    n = int(dur * SR); tt = np.arange(n) / SR
    env = np.sin(np.pi * tt / dur) ** 1.5
    wob = 1 + .012 * np.sin(2 * np.pi * .9 * tt + seed)
    return (np.sin(2 * np.pi * f * wob * tt) + .55 * np.sin(2 * np.pi * 2 * f * wob * tt) + .3 * np.sin(2 * np.pi * 4 * f * wob * tt)) * env
second, dark, three, nine, forty, ours, told = wi(5, 'second'), wi(6, 'dark'), wi(6, 'three'), wi(6, 'nine'), wi(6, 'forty'), T(10), wi(11, 'told')
bpm = 62; beat = 60 / bpm
mus = np.zeros(N)
prog = [(38, 45, 50, 53), (34, 41, 46, 50), (36, 43, 48, 51), (33, 40, 45, 48)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.7) * 1.2, 280), at, .9)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .22)
        place(mus, lp(pad, 1400) * .22, at)
S.add(mus * S.env([(0, .6), (T(1), .7), (T(4), .6), (T(6), .9), (T(9), 1.0), (ours - .05, 1.1), (ours + .05, 0), (ours + .9, 0), (T(11), 1.1), (T(13), .8), (DUR, .6)]), .5)
sea = lp(white(N, 3), 500) * (1 + .4 * np.sin(2 * np.pi * .13 * t)) ; S.add(sea * S.env([(0, 1), (dark - .1, 1), (dark + .2, .7), (DUR, 1)]), .05)
eng = (np.sin(2 * np.pi * 60 * t) * .5 + lp(white(N, 6), 200) * 1.8); S.add(eng * S.env([(0, .9), (dark - .05, .9), (dark + .05, 0), (DUR, 0)]), .05)
fx = S.buf()
place(fx, sting() * .55, .05, .32); place(fx, thump(2.5, 70, 28), .05, .35)
for k in range(3): place(fx, call(2.2, 52 - k, k), .4 + k * 2.1, .16)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .1)
for w in ('one', 'two', 'three'): place(fx, scratch(int(wi(3, w)) % 9, 1.0), wi(3, w) + .05, .12)
place(fx, call(3.4), wi(1, '52'), .22)
place(fx, call(3.5), wi(4, 'there'), .25)
place(fx, sting() * .7, second, .36); place(fx, thump(2.2, 90, 30), second, .45); place(fx, call(3.6, 51.2, 3), second, .28)
place(fx, thump(2.5, 60, 20), dark, .55)
for at in (three, nine, forty): place(fx, thump(1.8, 110, 40), at, .42); place(fx, call(1.6, 52, int(at)), at, .25)
x = T(7); k = 0
while x < E(8):
    place(fx, tone(1600, .06, .002, 30), x, .09); x += 1.1; k += 1
place(fx, sting(2.5, (220, 233, 330)) * .7, ours, .4); place(fx, thump(3.0, 80, 26), ours, .6)
for k in range(5): place(fx, call(2.0, 52 - k * .4, k), told + k * .4, .22)
heartbeat(fx, T(12), E(13), .62, .5)
S.add(reverb(fx, 2.2, .24, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
