# Updated Terms: eerie music-box pulse + low drone, phone buzzes and UI taps, water swell, deep hits as the Moon comes closer.
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
def tap(f=1400):
    m = int(.06 * SR); tt = np.arange(m) / SR; return np.sin(2 * np.pi * f * tt) * np.exp(-tt * 70)
def buzz(d=.5):
    m = int(d * SR); tt = np.arange(m) / SR; return np.sign(np.sin(2 * np.pi * 150 * tt)) * .3 * (np.sin(2 * np.pi * 9 * tt) > 0) * np.exp(-tt * 1.5)
def chime():
    m = int(.9 * SR); tt = np.arange(m) / SR; return (np.sin(2 * np.pi * 1318 * tt) + .6 * np.sin(2 * np.pi * 1760 * tt)) * np.exp(-tt * 5)
# music: E minor music-box arpeggio over a low drone, 72 bpm
bpm = 72; beat = 60 / bpm; mus = np.zeros(N)
prog = [(40, 64, 67, 71), (36, 64, 67, 72), (43, 62, 67, 71), (35, 63, 66, 71)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, tone(mtof(ch[1 + b % 3] + 12), .5, .003, 6) * .14, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        dr = (np.sin(2 * np.pi * mtof(ch[0]) * tt) + .5 * np.sin(2 * np.pi * mtof(ch[0] + 7) * tt)) * np.minimum(1, tt / 1.5) * np.minimum(1, (m / SR - tt) / .6)
        place(mus, lp(dr, 400) * .35, at)
env = S.env([(0, .6), (T(1), .55), (T(5), .65), (T(8), .75), (T(10), .85), (T(12), .7), (T(last), .5), (DUR, .6)])
S.add(mus * env, .5)
fx = S.buf()
place(fx, sting(3.0) * .4, .05, .25); place(fx, thump(2.0, 70, 30), wi(0, 'decline'), .35)
for sc in sorted(set(l['scene'] for l in S.LN)):
    a = min(l['start'] for l in S.LN if l['scene'] == sc)
    if a > 1: place(fx, bp(white(int(.4 * SR), int(a * 10)), 300, 3000) * np.hanning(int(.4 * SR)), a - .28, .06)
place(fx, chime(), wi(1, 'popup'), .3)
ev = wi(2, 'everyone')
for i in range(9): place(fx, tap(1300 + i * 40), ev + i * .18, .25)
for w, n in (('one', 0), ('four', 0)): place(fx, tap(900), wi(3, w, n), .3)
place(fx, thump(1.4, 80, 40), wi(4, 'nine'), .35)
place(fx, tap(700), wi(5, 'decline'), .4); place(fx, thump(1.6, 70, 30), wi(5, 'one'), .35)
place(fx, thump(2.0, 60, 26), wi(6, 'mine', 1), .45)
us = wi(7, 'up', 1); place(fx, lp(white(int(4 * SR), 9), 700) * np.hanning(int(4 * SR)) * .8, us - 1.2, .5)
place(fx, buzz(.6), wi(8, 'buzzed'), .3); place(fx, tap(800), wi(8, 'remind'), .35); place(fx, thump(2.2, 55, 24), wi(8, 'bigger'), .5)
for w in ('two', 'fifty', 'whole'): place(fx, thump(1.8, 60, 24), wi(9, w), .45)
place(fx, sting(3.0) * .4, wi(10, 'opened'), .25)
for k in range(10): place(fx, step(k, heavy=False, wet=False), wi(10, 'walked') + k * .45, .25)
place(fx, thump(2.6, 50, 22), wi(11, 'become'), .55)
place(fx, sting(3.0) * .45, wi(12, 'come'), .25); place(fx, thump(2.2, 70, 30), T(last), .3)
S.add(reverb(fx, 1.6, .25, 7), 1.0)
S.finish(bed_gain=.27, duck=.4)
