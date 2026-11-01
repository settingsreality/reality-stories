# Winter-Over: dark pulse, polar wind, station hum, badge beeps, radio static, heartbeat, hits on the turns.
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
SCN = {}
for l in S.LN: SCN.setdefault(l['scene'], [l['start'], l['end']]); SCN[l['scene']][1] = l['end']
f41 = wi(0, 'fortyone'); outside = wi(9, 'outside'); clicked = wi(10, 'clicked'); notme = wi(12, "that's"); mine = wi(14, 'mine')

def beep(f, d=.12, g=1.0):
    m = int(d * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / .005) * np.minimum(1, (d - tt) / .02) * g

# ---------- music pulse (A minor), 62 bpm ----------
bpm = 62; beat = 60 / bpm; mus = np.zeros(N)
prog = [(33, 45, 48, 52), (29, 41, 45, 48), (31, 43, 47, 50), (28, 40, 44, 47)]
for b in range(int(DUR / beat) + 1):
    at = b * beat; ch = prog[(b // 8) % 4]
    place(mus, lp(ep(ch[0] - 12, beat * 1.6) * 1.2, 300), at, .9)
    if b % 2 == 1: place(mus, tone(mtof(ch[0] + 36), .25, .002, 16) * .15, at, .5)
    if b % 8 == 0:
        m = int(beat * 8.2 * SR); tt = np.arange(m) / SR
        pad = sum(np.sin(2 * np.pi * mtof(q) * tt + q) for q in ch[1:]) * np.minimum(1, tt / 1.5) * np.exp(-tt * .25)
        place(mus, lp(pad, 1400) * .22, at)
mus_env = S.env([(0, .55), (T(1), .8), (T(5), .6), (T(8), .75), (outside - .05, .85), (T(10), .4), (T(11), .7), (notme - .05, .8), (notme + .05, .15),
                 (T(13), .6), (mine - .3, .9), (mine - .02, .9), (mine + .02, 0), (E(14) + .3, 0), (T(last) - .2, .7), (E(last) + 1, .9), (DUR, .6)])
S.add(mus * mus_env, .5)

# ---------- polar wind (louder outside), station hum (inside) ----------
wind = bp(white(N, 6), 200, 1600) * (.6 + .4 * np.sin(2 * np.pi * .09 * t) * np.sin(2 * np.pi * .043 * t + 1))
howl = np.sin(2 * np.pi * (380 + 60 * np.sin(2 * np.pi * .13 * t)) * t) * (.5 + .5 * np.sin(2 * np.pi * .07 * t))
out_env = S.env([(0, .25), (SCN['s2'][0], 1.0), (SCN['s4'][0] - .1, 1.0), (SCN['s4'][0], .2), (T(11) - .1, .2), (T(11), 1.2), (E(11) + .2, 1.2), (SCN['s10'][0], .25),
                 (SCN['s13'][0] - .1, .25), (SCN['s13'][0], 1.1), (DUR, 1.1)])
S.add(wind * out_env, .06, -.3); S.add(howl * out_env, .012, .3)
hum = (np.sin(2 * np.pi * 60 * t) * .6 + np.sin(2 * np.pi * 120 * t) * .3 + bp(white(N, 9), 80, 300) * .5)
S.add(hum * (1.2 - out_env), .03)

fx = S.buf()
# cold open: the red badge alarm + hit on 'forty-one'
for k in range(6): place(fx, beep(1320, .1), .1 + k * .7, .12)
place(fx, sting() * .45, f41 - .03, .3); place(fx, thump(2.5, 70, 28), f41, .45)
for k in range(3): place(fx, beep(880, .14) + beep(660, .14), f41 + .4 + k * .5, .14)
# whoosh on scene cuts
for sc, (a, b) in SCN.items():
    if a > 1: place(fx, bp(white(int(.45 * SR), int(a * 10)), 200, 2500) * np.hanning(int(.45 * SR)), a - .3, .10)
# s2: the plane droning away
pl = bp(white(int(6 * SR), 3), 90, 400) * np.linspace(1, 0, int(6 * SR)) ** 1.5 + np.sin(2 * np.pi * 95 * np.arange(int(6 * SR)) / SR) * .3 * np.linspace(1, 0, int(6 * SR))
place(fx, pl, T(1) - .3, .25)
# s3: the -100 hit
place(fx, thump(1.6, 60, 30), wi(2, 'minus') - .05, .3)
# s4: badge taps, one beep each
x = wi(3, 'taps')
for k in range(4): place(fx, beep(1760, .07), x + k * .35, .12)
for i in (5, 6, 7): place(fx, scratch(i, 1.0), T(i) + .05, .12)
# s7: footsteps down the hall + count ticks
x = wi(8, 'walked') - .1
for k in range(7): place(fx, step(k + 40), x + k * .24, .25)
place(fx, beep(990, .1), wi(8, 'forty') - .02, .2)
# s8: log rows ticking in, then the outside row alarm
for j in range(4): place(fx, beep(2200, .03), T(9) + .1 + j * .12, .08)
place(fx, sting() * .5, outside - .03, .28); place(fx, thump(2.0, 70, 30), outside, .35)
# radio: clicks + static under Jo's line
for at in (clicked - .1, T(11) - .25, E(11) + .05):
    m = int(.35 * SR); c = bp(white(m, int(at * 7)), 1200, 6000) * (np.random.default_rng(int(at)).random(m) < .25) * np.hanning(m)
    place(fx, c, at, .35)
st = bp(white(int((E(11) - T(11) + .4) * SR), 77), 1500, 5000)
place(fx, st, T(11) - .2, .03)
# s10: door opens behind me, then the hit on "That's not me"
place(fx, creak(1.0, 90, 5), wi(12, 'walked') - .1, .25)
place(fx, sting() * .6, notme - .03, .32); place(fx, thump(2.4, 75, 28), notme, .45)
# heartbeat through the dilemma
heartbeat(fx, T(13) - .2, E(13) + .4, .6, .4)
# s12: refresh blip, then the big hit on 'mine'
place(fx, beep(1760, .08) + beep(2640, .08), wi(14, 'refreshed'), .18)
place(fx, sting() * .75, mine - .02, .38); place(fx, thump(3.0, 80, 26), mine, .55)
# end: the alarm beeps again, slow, under the question
x = T(last) - .3
while x < DUR - .5:
    place(fx, beep(1320, .1), x, .08); x += 1.4
place(fx, ep(33, 4.0) * .8, T(last), .3)
S.add(reverb(fx, 1.8, .22, 7), 1.0)
S.finish(bed_gain=.2, duck=.4)
