# Sailing Stones: desert-night drone + slow heartbeat pulse, wind, stone scrapes on every move, radio crackle for Dot.
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
def scrape(d=.9, seed=1):
    m = int(d * SR); tt = np.arange(m) / SR
    g = bp(white(m, seed), 120, 900) * (np.minimum(1, tt / .08)) * np.exp(-tt * 1.2 / d)
    return g * (.6 + .4 * np.abs(np.sin(2 * np.pi * 7 * tt)))
def crackle(d, seed):
    m = int(d * SR); return hp(white(m, seed), 2000) * (np.random.RandomState(seed).rand(m) > .996) * 3
drone = (np.sin(2 * np.pi * 43 * t) * .6 + np.sin(2 * np.pi * 64.5 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .05 * t))
S.add(drone * S.env([(0, 1.3), (T(1), .6), (T(7), .9), (T(10), 1.4), (T(15), 1.8), (T(last), 1.0), (E(last) + .4, .2), (DUR, .5)]), .2)
wind = bp(white(N, 9), 200, 1400) * (.6 + .4 * np.sin(2 * np.pi * .07 * t + 1))
S.add(wind * S.env([(0, .8), (T(2), 1.2), (T(3), .5), (T(8), .8), (DUR, .8)]), .05)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 48, 52, 57)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 900) * S.env([(0, .5), (T(1), 1.0), (T(10), 1.2), (T(15), .4), (T(last), .9), (DUR, .5)]), .02)
# heartbeat pulse that speeds up from the tracker on
hb = S.buf(); at = T(7); bpm = 58
while at < E(last):
    place(hb, thump(.25, 55, 40), at, .35); place(hb, thump(.2, 50, 40), at + .28, .22)
    bpm = min(96, bpm + 1.2); at += 60 / bpm
S.add(hb, 1.0)
fx = S.buf()
place(fx, sting() * .6, .05, .3)
place(fx, scrape(1.0, 3), wi(0, 'moved') - .05, .55); place(fx, thump(1.2, 70, 30), wi(0, 'moved'), .35)
for k in range(5): place(fx, scrape(.5, 10 + k) * .5, T(1) + .8 + k * .45, .25)
place(fx, scrape(1.6, 20) * .7, wi(2, 'meters') - .4, .3)
for i in (4, 5, 6): place(fx, bp(white(int(.3 * SR), i), 1500, 6000) * np.hanning(int(.3 * SR)), T(i) - .05, .08)  # pen strokes
place(fx, thump(1.6, 80, 30), wi(7, '163'), .45); place(fx, sting() * .5, wi(7, '163') - .05, .2)
place(fx, scrape(1.0, 31) * .6, wi(8, 'empty'), .3)
place(fx, scrape(2.5, 40) * .6, wi(9, 'turned'), .35)
place(fx, scrape(1.4, 50), wi(10, 'scraped') - .1, .7); place(fx, thump(2.0, 60, 24), wi(10, 'bumper'), .5)
for i in (11, 14):
    place(fx, crackle(E(i) - T(i) + .4, i), T(i) - .2, .25)
    place(fx, bp(white(int(.15 * SR), i), 1500, 5000), T(i) - .25, .2)
place(fx, scrape(1.2, 60) * .8, wi(12, 'groove') - .05, .5)
place(fx, sting() * .7, wi(13, 'dozed') - .05, .3); place(fx, thump(2.6, 55, 22), wi(13, 'dozed'), .45)
place(fx, thump(2.0, 60, 26), wi(14, '164'), .45)
place(fx, scrape(3.0, 70) * .5, wi(15, 'making') - .3, .45)
place(fx, sting() * .7, T(last) - .1, .4); place(fx, thump(3.0, 70, 26), T(last), .5)
S.add(reverb(fx, 2.0, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
