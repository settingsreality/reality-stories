import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
LN = S.LN
def sc(name):  # start/end of a scene
    for s in S.TL['scenes']:
        if s['id'] == name: return s['start'], s['end']
def blip(f, g=1.0, d=.18):
    n = int(d * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * tt) + .3 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt * 28) * np.minimum(1, tt * 2000) * g
def whoosh(d=2.0, lo=200, hi=4000):
    n = int(d * SR); tt = np.arange(n) / SR; e = np.sin(np.pi * tt / tt[-1]) ** 2
    return bp(white(n), lo, hi) * e
def swell(d, f0, f1, g=1.0):
    n = int(d * SR); tt = np.arange(n) / SR; f = f0 * (f1 / f0) ** (tt / tt[-1])
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / tt[-1]) * g
# ---------- music: slow chords (Am F C G), a soft arpeggio while explaining ----------
chords = [(57, 60, 64), (53, 57, 60), (48, 55, 60), (55, 59, 62)]
bar = 4.0
pad = np.zeros(N); arp = np.zeros(N)
for k, a in enumerate(np.arange(0, DUR, bar)):
    ch = chords[k % 4]; n = int((bar + 1.5) * SR); tt = np.arange(n) / SR
    env = np.minimum(1, tt / 1.2) * np.minimum(1, (tt[-1] - tt) / 1.5)
    s = sum(np.sin(2 * np.pi * mtof(m) * tt * (1 + d)) for m in ch for d in (-.002, .002)) + .5 * np.sin(2 * np.pi * mtof(ch[0] - 12) * tt)
    place(pad, lp(s, 1400) * env, a)
    for j in range(8):
        m = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12][j % 4]; place(arp, ep(m, .9), a + j * bar / 8, .5)
music = S.env([(0, .9), (T(1), 1.0), (T(2), .7), (T(9), .7), (T(10), 1.0), (T(18), 1.1), (E(18), .5), (T(19), .7), (T(22), 1.2), (T(23), .6), (T(25), 1.0), (E(26), 1.3), (E(26) + 1, 1.3), (DUR, 0)])
arpOn = S.env([(0, 0), (T(2) - .5, 0), (T(2), .8), (T(9), .8), (T(10), 1), (T(18), .6), (T(18) + .5, 0), (T(19), 0), (T(19) + .5, .7), (T(25), .5), (T(26), 0), (DUR, 0)])
S.add(pad * music, .05); S.add(arp * arpOn * music, .03, .25)
sub = np.sin(2 * np.pi * 41 * t) * .6 + lp(white(N), 90) * 1.5
S.add(sub * S.env([(0, 1), (T(2), .3), (T(18), 1), (T(19), .3), (T(25), .8), (E(26), 1.2), (E(26) + 1, 0), (DUR, 0)]), .12)
fx = S.buf(); L = S.buf(); R = S.buf()
# ruins: wind and birds
a0, a1e = sc('a1'); d40, d4e = sc('d4')
for (s0, s1) in ((a0, a1e), (d40, d4e)):
    n = int((s1 - s0) * SR); wnd = bp(white(n), 200, 900) * (.6 + .4 * np.sin(2 * np.pi * np.arange(n) / SR / 5)); place(fx, wnd, s0, .06)
# the light clock ticks, synced to the bounces
b20, b2e = sc('b2')
for x in np.arange(0, DUR, .6):
    if b20 + .2 < x < b2e: place(fx, blip(1760, .5), x, .25)
b30, b3e = sc('b3'); t0 = T(5)
for x in np.arange(t0, T(6) - .2, .8): place(fx, blip(1760, .5), x, .22)
b40, b4e = sc('b4')
for x in np.arange(0, DUR, .5):
    if b40 + .2 < x < b4e: place(L, blip(1975, .5), x, .25)
for x in np.arange(0, DUR, 1.3):
    if b40 + .2 < x < b4e: place(R, blip(1318, .5), x, .25)
# heartbeat: Earth fast vs ship slow
for x in np.arange(T(8), b4e, .8): place(L, thump(.3, 70, 40) * .5, x, .25)
for x in np.arange(T(8), b4e, 2.2): place(R, thump(.3, 70, 40) * .5, x, .25)
# speed sign: light streaks
for k in range(4): place(fx, whoosh(1.2, 800, 6000), T(6) + k * 1.4, .12)
# GPS: satellite pings
for x in np.arange(T(9) + .5, E(9), 1.4): place(fx, blip(2400, .4, .3), x, .15)
# slider ticks and rising engine
for a in (W(10, .45), W(11, .08), W(11, .4)): place(fx, blip(880, .6), a, .3); place(fx, whoosh(2.0, 100, 3000), a - .3, .2)
place(fx, swell(6.0, 60, 240, 1.0), W(11, .3), .1)
# the trip: engine hum; years ticking past
d10, d1e = sc('d1'); n = int((d1e - d10) * SR); place(fx, lp(white(n), 160) * 2, d10, .1)
for x in np.arange(T(14), E(14), .12): place(fx, blip(3000, .25, .05), x, .12)
# Andromeda: a deep swell
place(fx, swell(7.0, 40, 80, 1.0), T(16), .25)
# warp: a bending sweep, then the walkway hum
place(fx, swell(4.0, 400, 60, 1.0) + whoosh(4.0, 60, 800), T(20) + .1, .2)
# same time: both clocks tick together
e30 = sc('e3')[0]
for x in np.arange(e30 + .3, T(22) - .2, 1.0): place(fx, blip(1568, .6), x, .3)
# negative energy: a falling tone; causality: a reversed whoosh
place(fx, swell(2.5, 600, 90, 1.0), W(23, .15), .15)
rw = whoosh(2.0, 300, 5000)[::-1] * np.linspace(0, 1, int(2.0 * SR)); place(fx, rw, W(24, .25), .25)
# departure: big swell and last chord ringing
place(fx, swell(9.0, 50, 140, 1.0), T(25), .2); place(fx, whoosh(6.0, 80, 2500), T(26), .2)
place(fx, sting() * .4, .05, .2); place(fx, ep(45, 4.0) * .6, E(26) + 1.0, .35)
S.add(reverb(fx, 2.0, .2, 7), 1.0); S.add(reverb(L, 1.5, .15, 3), 1.0, -.6); S.add(reverb(R, 1.5, .15, 4), 1.0, .6)
S.finish(bed_gain=.6, duck=.4)
