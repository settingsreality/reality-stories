# Musical Road: dark pulse, desert wind, truck engine, the road's tire-hum notes, the walker's slow song (a note per step), hits on turns.
import sys, os, math
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def lerp(a, b, k): return a + (b - a) * min(1, max(0, k))
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalpha() or c == "'") == word: return w['start']
    return W(i, .5)
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
died = wi(9, 'died'); knew = wi(15, 'knew'); hum = wi(15, 'hum')
ST0 = T(10) + .25; STL = wi(15, 'note'); n = max(4, int((STL - ST0) // .72)); steps = [ST0 + k * (STL - ST0) / n for k in range(n + 1)]

def groove(f, d, g=1.0):  # a tire on grooves: a buzzy pulse train at pitch f, soft attack
    m = int(d * SR); tt = np.arange(m) / SR
    x = np.sign(np.sin(2 * np.pi * f * tt)) * .5 + np.sin(2 * np.pi * f * tt) * .6 + np.sin(4 * np.pi * f * tt) * .2
    env = np.minimum(1, tt / .04) * np.exp(-tt * 1.6) * np.minimum(1, (tt[-1] - tt) / .08)
    return lp(x, 1800) * env * g

# ---------- music pulse (D minor), 66 bpm ----------
bpm = 66; beat = 60 / bpm; mus = np.zeros(N)
prog = [(38, 50, 53, 57), (34, 46, 50, 53), (36, 48, 52, 55), (33, 45, 49, 52)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 24), .3, .002, 14) * .2, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt + q) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1500) * .22, at)
mus_env = S.env([(0, .5), (T(1), .8), (T(5), .65), (T(8), .7), (died - .05, .8), (died + .05, .1), (T(10), .1), (T(11), .5), (T(12), .7),
                 (STL - .3, .9), (STL - .02, .9), (STL + .02, 0), (hum + 1.0, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

# ---------- truck engine idle/drive, dies at 'died' ----------
eng = (np.sin(2 * np.pi * 38 * t + 2 * np.sin(2 * np.pi * 1.7 * t)) * .5 + lp(white(N, 4), 110) * 3 + bp(white(N, 5), 140, 500) * .4)
road = bp(white(N, 8), 300, 2500) * .5
eng_env = S.env([(0, 0), (SCN['s7'][0] - .1, 0), (SCN['s7'][0], 1.3), (died, 1.4), (died + .3, .6), (died + .8, 0), (DUR, 0)])
S.add(eng * eng_env, .17); S.add(road * eng_env, .05)
wind = bp(white(N, 6), 250, 1500) * (.6 + .4 * np.sin(2 * np.pi * .11 * t) * np.sin(2 * np.pi * .05 * t + 1))
S.add(wind * S.env([(0, .7), (SCN['s2'][0], .2), (SCN['s4'][0], 1.0), (SCN['s5'][0], .1), (SCN['s7'][0], .5), (T(10), 1.0), (DUR, .9)]), .045, -.3)

fx = S.buf()
SONG = [57, 60, 64, 62, 60, 59, 57, 52, 55, 57, 60, 59, 57, 53, 52, 57, 60, 64, 62, 60, 59, 57]
# cold open: two slow groove notes and a hit
place(fx, sting() * .45, .05, .25); place(fx, thump(2.5, 70, 28), .05, .3)
place(fx, groove(mtof(SONG[0] - 12), 1.4), .1, .5); place(fx, groove(mtof(SONG[1] - 12), 1.4), wi(0, 'nobody') - .1, .5)
# whoosh on scene cuts
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
# s2/s3: the road demo: quick groove notes rising (a tire running over them)
x = T(1) + .6; k = 0
while x < E(1):
    place(fx, groove(mtof(45 + (k * 2) % 14), .25), x, .22); k += 1; x += .3
k = 0; x = wi(2, 'william') - .1
for m in [55, 55, 55, 55, 55, 55, 60, 62, 63.6, 55, 55, 55, 60, 63.6, 62.4, 58]:  # galloping, deliberately off
    if x > E(2) + .3: break
    place(fx, groove(mtof(m - 12), .22), x, .25); x += .19
for i in (5, 6, 7): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# s7: driving at 55, the unknown slow song from the grooves
x = wi(8, 'played'); k = 0
while x < died - .2:
    place(fx, groove(mtof(SONG[k % len(SONG)] - 12), 1.0), x, .32); k += 1; x += .62
# engine dies: clunk + hit
place(fx, thump(1.6, 60, 25), died, .5); place(fx, creak(.8, 70, 3), died + .1, .2)
# the walker: one note per step, slow song, getting louder as it comes closer
for j, at in enumerate(steps):
    g = lerp(.12, .7, (j / max(1, len(steps) - 1)) ** 1.4)
    place(fx, groove(mtof(SONG[j % len(SONG)] - 12), 1.1), at, g)
# radio clicks
for at in (wi(13, 'clicked') - .1, T(14) - .25, E(14) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
# heartbeat during the dilemma
heartbeat(fx, T(12) - .2, E(12) + .4, .62, .4)
# the last note outside the door: loud, then the hit on 'knew'
place(fx, sting() * .7, knew - .02, .38); place(fx, thump(3.0, 80, 26), knew, .55)
# the hum: the song again, soft, my own melody (hummed-like, sine)
x = hum + .2
for m in SONG[:6]:
    place(fx, tone(mtof(m), .7, .05, 2.2) * .5, x, .18); x += .55
# end: the walker keeps stepping around the truck
x = T(last) - .3; j = 0
while x < DUR - 1:
    place(fx, groove(mtof(SONG[j % len(SONG)] - 12), 1.0), x, .35); j += 1; x += .9
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
