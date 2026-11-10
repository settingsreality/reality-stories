# The Fetch: slow uneasy pulse, phone UI sounds (unlock chime, buzz, error), shower, typing, taps on glass, hits on the turns.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalnum() or c in "':") == word: return w['start']
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
def chime(up=True):
    a = tone(1318 if up else 988, .18, .003, 14); b = tone(1760 if up else 740, .3, .003, 9)
    out = np.zeros(int(.5 * SR)); place(out, a, 0); place(out, b, .09); return out
def buzz(d=.35):
    n = int(d * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * 150 * tt) * (np.sin(2 * np.pi * 20 * tt) > 0) * np.hanning(n)
def err():
    out = np.zeros(int(.45 * SR)); place(out, tone(330, .12, .002, 20), 0); place(out, tone(330, .12, .002, 20), .15); return out
def tap(seed):
    n = int(.08 * SR); return bp(white(n, seed), 1500, 5000) * np.exp(-np.arange(n) / SR * 70)
bpm = 58; beat = 60 / bpm
mus = np.zeros(N)
prog = [(40, 47, 52, 55), (36, 43, 48, 51), (38, 45, 50, 53), (35, 42, 47, 50)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.7) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, ep(ch[3] + 12, beat * .9) * .18, at)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .22)
        place(mus, lp(pad, 1400) * .22, at)
fig, lock, tonight = wi(7, 'something'), wi(8, 'locked'), wi(11, 'tonight')
S.add(mus * S.env([(0, .6), (T(1), .7), (T(3), .6), (T(6), .9), (fig, 1.0), (T(10), .7), (T(11), 1.0), (tonight - .05, 1.1), (tonight + .05, 0), (tonight + .8, 0), (T(12), .9), (DUR, .6)]), .5)
room = lp(white(N, 3), 300); S.add(room, .02)
fx = S.buf()
place(fx, sting() * .5, .05, .3); place(fx, thump(2.5, 70, 28), .05, .3); place(fx, chime(), .1, .25)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 300, 3000) * np.hanning(int(.4 * SR)), a - .3, .08)
for w in ('one', 'two'): place(fx, scratch(int(wi(2, w)) % 9, 1.0), wi(2, w) + .05, .12)
place(fx, sting(2.5, (311, 330, 466)) * .5, wi(1, 'fetch'), .3)
place(fx, buzz(), wi(3, 'two'), .3); place(fx, err(), wi(3, 'two') + .1, .2)
sh = lp(white(int(3.5 * SR), 8), 4000) * np.hanning(int(3.5 * SR)); place(fx, sh, wi(3, 'shower') - .4, .06)
place(fx, tone(2000, .05, .001, 40) + white(int(.05 * SR), 4)[:int(.05 * SR)] * .3, wi(4, 'snapped'), .3)
place(fx, thump(1.8, 90, 40), wi(4, 'me'), .35)
for k in range(3): place(fx, buzz(.3), wi(5, 'gran') + k * .5, .15)
place(fx, sting(2.0, (220, 233)) * .4, wi(5, 'never'), .3)
place(fx, chime(), wi(6, 'unlocked'), .3)
x = wi(6, 'typing')
while x < wi(6, "don't") + .9:
    place(fx, tap(int(x * 100)) * .6, x, .25); x += .11 + .05 * ((x * 7.3) % 1)
place(fx, sting() * .65, fig, .35); place(fx, thump(2.5, 80, 26), fig, .5)
for w in (wi(8, 'face'), wi(8, 'again'), W(8, .72)): place(fx, err(), w, .3); place(fx, buzz(.25), w, .2)
place(fx, thump(2.2, 60, 22), lock, .55); place(fx, chime(False), lock, .3)
for w in ('phone', 'door', 'bank'): place(fx, chime(), wi(9, w), .16)
place(fx, buzz(), wi(10, 'texts'), .25)
place(fx, sting(2.5, (220, 233, 330)) * .7, tonight, .4); place(fx, thump(3.0, 80, 26), tonight, .6)
x = T(12)
while x < DUR - .5:
    for j in range(3): place(fx, tap(int(x * 10) + j) * 1.6, x + j * .22, .35)
    x += 1.6
heartbeat(fx, T(11), DUR - .2, .62, .45)
S.add(reverb(fx, 1.8, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
