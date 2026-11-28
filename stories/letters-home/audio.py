# Letters Home: storm sea + low sea-shanty-minor pulse, creaking timbers, radar pings, a teleprinter, radio crackle, paper.
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
def ping(f=1400, d=1.2):
    m = int(d * SR); tt = np.arange(m) / SR; return np.sin(2 * np.pi * f * tt) * np.exp(-tt * 5)
def printer(d, seed=1):
    m = int(d * SR); tt = np.arange(m) / SR; r = np.random.RandomState(seed)
    clicks = (r.rand(m) > .9985).astype(float); return hp(np.convolve(clicks, np.hanning(200), 'same') * 4 + bp(white(m, seed), 300, 900) * .15 * (np.sin(2 * np.pi * 11 * tt) > 0), 200)
def crackle(d, seed):
    m = int(d * SR); return hp(white(m, seed), 2000) * (np.random.RandomState(seed).rand(m) > .996) * 3
def rustle(d, seed):
    m = int(d * SR); tt = np.arange(m) / SR; return bp(white(m, seed), 1500, 7000) * (np.abs(np.sin(2 * np.pi * 3 * tt)) ** 3) * np.minimum(1, tt / .1)
seaN = lp(white(N, 3), 500) * (.6 + .4 * np.sin(2 * np.pi * .11 * t)) * 2.5 + bp(white(N, 4), 300, 2000) * (.3 + .3 * np.sin(2 * np.pi * .07 * t + 1))
S.add(seaN * S.env([(0, 1.2), (T(1), .9), (T(4), .6), (T(8), 1.1), (T(11), .7), (T(13), .5), (T(last), .9), (DUR, .6)]), .06)
drone = (np.sin(2 * np.pi * 36.7 * t) * .6 + np.sin(2 * np.pi * 55 * t) * .3) * (.8 + .2 * np.sin(2 * np.pi * .05 * t))
S.add(drone * S.env([(0, 1.3), (T(1), .6), (T(8), 1.0), (T(11), 1.3), (T(14), 1.6), (T(last), 1.0), (DUR, .4)]), .18)
# slow minor pulse (D minor), 66 bpm
bpm = 66; beat = 60 / bpm; prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]
mus = np.zeros(N)
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0], beat * 1.5) * 1.0, 300), at, .8)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        place(mus, lp(sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25), 1400) * .2, at)
S.add(mus * S.env([(0, .5), (T(1), .8), (T(4), .6), (T(8), .9), (T(11), 1.0), (T(14), 1.1), (E(last), .8), (DUR, .5)]), .33)
fx = S.buf()
place(fx, sting() * .5, .05, .25); place(fx, creak(2.5, 180, 1), .3, .25)
for k in range(4): place(fx, ping(1400, 1.0), .2 + k * 2.2, .08)
place(fx, thump(1.6, 60, 26), wi(0, 'mail'), .35)
place(fx, creak(3.0, 160, 5), wi(2, 'swore'), .3); place(fx, thump(2.0, 50, 24), wi(2, 'doomsday'), .5); place(fx, sting() * .4, wi(2, 'doomsday'), .2)
place(fx, rustle(1.2, 7), wi(3, 'letters') - .3, .2)
for i in (5, 6, 7): place(fx, bp(white(int(.3 * SR), i), 1500, 6000) * np.hanning(int(.3 * SR)), T(i) - .05, .08)
for k in range(3): place(fx, ping(1400, 1.0), T(8) + k * 1.8, .1)
place(fx, ping(900, 1.6), wi(8, 'no') - .05, .2); place(fx, thump(1.4, 70, 30), wi(8, 'no'), .35)
place(fx, printer(E(9) - wi(9, 'printed') + .3, 9), wi(9, 'printed'), .25)
place(fx, crackle(E(10) - wi(10, 'but') + .4, 10), wi(10, 'but'), .3); place(fx, sting() * .6, wi(10, 'in') - .05, .3)
place(fx, thump(1.6, 60, 26), wi(10, 'yes'), .45)
place(fx, rustle(2.5, 11), T(11) + .3, .25); place(fx, thump(1.8, 60, 24), wi(11, 'hundreds'), .4)
place(fx, rustle(.8, 12), wi(12, 'read'), .2); place(fx, sting() * .7, wi(12, 'to') - .05, .35); place(fx, thump(2.2, 55, 22), wi(12, 'me'), .5)
place(fx, thump(1.4, 90, 40), wi(13, 'tomorrow') - .02, .45)
place(fx, creak(3.0, 150, 14), T(14), .35); place(fx, thump(2.4, 55, 22), wi(14, 'signs'), .45)
for k in range(3): place(fx, ping(1400, 1.0), T(15) + k * 1.6, .1)
place(fx, sting() * .7, T(last) - .1, .3); place(fx, thump(3.0, 70, 26), wi(15, 'burn'), .5)
S.add(reverb(fx, 2.2, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
