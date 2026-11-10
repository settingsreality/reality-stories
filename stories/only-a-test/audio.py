# Only a Test: slow low pulse, Westminster chimes from the tower (a public-domain tune), a wail, surf that pulls away, footsteps on sand, hits on the turns.
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
def bell(m, d=2.2):
    n = int(d * SR); tt = np.arange(n) / SR; f = mtof(m)
    return (np.sin(2*np.pi*f*tt) + .5*np.sin(2*np.pi*2.76*f*tt)*np.exp(-tt*3) + .3*np.sin(2*np.pi*5.4*f*tt)*np.exp(-tt*6)) * np.exp(-tt*1.6)
# Westminster quarters (E4 G#4 F#4 B3 / E4 F#4 G#4 E4 ...): first changes
WQ = [[64, 68, 66, 59], [64, 66, 68, 64], [68, 64, 66, 59], [59, 66, 68, 64]]
def chimes(buf, at, gap=.55, g=.2, sets=2, detune=0):
    x = at
    for s in range(sets):
        for m in WQ[s % 4]: place(buf, bell(m + detune), x, g); x += gap
        x += gap
    return x
def wail(d):
    n = int(d * SR); tt = np.arange(n) / SR; f = 420 + 240 * (.5 - .5*np.cos(2*np.pi*tt/4.0))
    ph = np.cumsum(f) / SR * 2 * np.pi; return (np.sin(ph) + .3*np.sin(2*ph)) * np.minimum(1, tt/.5) * np.minimum(1, (d-tt)/.5)
bpm = 56; beat = 60 / bpm
mus = np.zeros(N)
prog = [(40, 47, 52, 55), (36, 43, 48, 52), (38, 45, 50, 54), (35, 42, 47, 50)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.7) * 1.2, 280), at, .9)
    if b % 8 == 0:
        n = int(beat * 8.2 * SR); tt = np.arange(n) / SR
        pad = sum(np.sin(2*np.pi*mtof(m)*tt + m) for m in ch[1:]) * np.minimum(1, tt/1.5) * np.exp(-tt*.22)
        place(mus, lp(pad, 1400) * .22, at)
addr, us = wi(10, 'my'), wi(11, 'us')
S.add(mus * S.env([(0, .6), (T(1), .5), (T(4), .6), (T(5), .9), (T(9), 1.0), (addr - .05, 1.1), (addr + .05, 0), (addr + .9, 0), (T(11), 1.0), (T(12), .9), (DUR, .6)]), .5)
gone = wi(5, 'gone')
surf = lp(white(N, 3), 700) * (.6 + .4 * np.sin(2*np.pi*.11*t))
S.add(surf * S.env([(0, .25), (T(1), 1), (gone - 1, 1), (gone + 2, .15), (T(12), .15), (T(12) + 4, 1), (DUR, 1.3)]), .06)
fx = S.buf()
place(fx, sting() * .45, .05, .3); place(fx, thump(2.5, 70, 28), .05, .3)
chimes(fx, .2, .5, .12, 1)
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.4*SR), int(a*10)), 300, 3000) * np.hanning(int(.4*SR)), a - .3, .08)
chimes(fx, wi(1, 'westminster'), .45, .16, 1)
place(fx, wail(3.2), wi(2, 'wailing'), .1)
for w in ('one', 'two', 'three'): place(fx, scratch(int(wi(3, w)) % 9, 1.0), wi(3, w) + .05, .12)
chimes(fx, wi(4, 'chimes') - .3, .95, .2, 1, -1)
place(fx, sting(3.0, (220, 233, 311)) * .5, gone, .32); place(fx, thump(2.2, 70, 26), gone, .4)
x = T(6)
while x < E(8):
    place(fx, lp(white(int(.12*SR), int(x*50)), 900) * np.exp(-np.arange(int(.12*SR))/SR*25), x, .12); x += .38
place(fx, sting(2.0, (233, 247)) * .4, wi(7, 'she'), .3)
for w in ('twelve', 'forty', 'two'): place(fx, thump(1.6, 110, 40), wi(8, w), .4)
place(fx, sting(2.5, (220, 233, 330)) * .6, wi(10, 'test'), .3); chimes(fx, wi(10, 'test') - .2, .35, .1, 1, 1)
place(fx, sting() * .7, addr, .4); place(fx, thump(3.0, 80, 26), addr, .6)
place(fx, thump(2.5, 70, 24), us, .45)
chimes(fx, T(12), .9, .14, 3, -2)
heartbeat(fx, T(11), DUR - .2, .62, .45)
S.add(reverb(fx, 2.4, .26, 7), 1.0)
S.finish(bed_gain=.15, duck=.4)
