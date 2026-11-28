# Shaking in 8: low pulse + drone, phone alert alarm, ground-deep footsteps, ringing glasses, a text buzz, heartbeat.
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
def alarm(d=2.0):  # phone emergency alert: two harsh alternating tones
    m = int(d * SR); tt = np.arange(m) / SR
    f = np.where((tt * 4).astype(int) % 2 == 0, 853, 960)
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .5 + np.sin(2 * np.pi * np.cumsum(f) / SR) * .5
    return lp(x, 3500) * np.minimum(1, tt / .02) * np.minimum(1, (d - tt) / .05)
def rumble(d=1.6, seed=1):  # a deep footstep from under the ground
    m = int(d * SR); tt = np.arange(m) / SR
    return (lp(white(m, seed), 90, 4) * 6 + np.sin(2 * np.pi * 34 * tt) * .8) * np.minimum(1, tt / .03) * np.exp(-tt * 2.4)
def ring(d=2.0, f=2350, seed=1):  # wine glass ringing
    m = int(d * SR); tt = np.arange(m) / SR
    return sum(np.sin(2 * np.pi * f * k * tt + seed) / k ** 2 for k in (1, 2.7)) * np.exp(-tt * 1.6) * (.6 + .4 * np.sin(2 * np.pi * 9 * tt))
def buzz(d=.5):
    m = int(d * SR); tt = np.arange(m) / SR
    return lp(np.sign(np.sin(2 * np.pi * 180 * tt)), 600) * ((tt % .25) < .16) * .6
# drone + pulse
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.5 * t) * .3 + lp(white(N), 100) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.4), (T(1), .6), (T(7), .9), (T(9), 1.4), (T(10), .5), (T(13), 1.6), (T(last), 1.0), (E(last) + .4, .3), (DUR, .5)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (44, 47, 51, 56)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 900) * S.env([(0, .6), (T(1), 1.0), (T(9), 1.2), (T(10), .3), (T(12), 1.0), (T(last), .9), (DUR, .5)]), .02)
pulse = S.buf(); bpm = 70; at = T(1)
while at < E(last):
    if not (T(10) - .1 < at < T(12)):  # silence while everything goes still
        place(pulse, thump(.3, 60, 40), at, .25)
    bpm = min(100, bpm + .5); at += 60 / bpm
S.add(pulse, 1.0)
fx = S.buf()
place(fx, alarm(min(2.6, E(0) - .1)), .05, .16); place(fx, sting() * .5, .05, .25)
place(fx, rumble(1.8, 2), wi(0, 'backyard'), .7)
place(fx, alarm(2.4), wi(7, 'first') - .1, .14)
for k, w in enumerate([('another', 0), ('another', 1), ('minute', 0), ('line', 0), ('walking', 0)]):
    a = wi(8, *w); place(fx, rumble(1.4, 10 + k), a, .35 + k * .08); place(fx, alarm(.5) * .5, a - .05, .1)
place(fx, rumble(1.6, 30), T(9) + .2, .7)
for k in range(3): place(fx, ring(2.2, 2350 + k * 310, k), wi(9, 'glasses') + k * .15, .08)
place(fx, rumble(2.0, 31), wi(9, 'closer') - .05, 1.0); place(fx, thump(1.6, 70, 26), wi(9, 'closer'), .4)
place(fx, buzz(.6), wi(10, 'grandpa') - .3, .3); place(fx, buzz(.6), wi(10, 'grandpa') + .4, .3)
place(fx, sting() * .5, wi(11, 'phones') - .05, .25)
hb = S.buf(); at = T(12); bpm = 92
while at < E(last):
    place(hb, thump(.25, 55, 40), at, .4); place(hb, thump(.2, 50, 40), at + .26, .26); bpm = min(120, bpm + 1.5); at += 60 / bpm
S.add(hb, 1.0)
place(fx, alarm(1.4), T(13) - .05, .12); place(fx, thump(2.0, 60, 24), wi(13, 'kitchen'), .5)
place(fx, rumble(1.6, 40), wi(13, 'footsteps'), .8); place(fx, sting() * .7, wi(13, 'stopped') - .05, .35)
place(fx, sting() * .7, T(last) - .1, .35); place(fx, thump(3.0, 70, 26), T(last), .5)
S.add(reverb(fx, 2.0, .2, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
