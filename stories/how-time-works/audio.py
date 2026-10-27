# How Time Works: calm, curious bed (slow pads + soft piano), whooshes on scene changes, ticks on the light clock.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
mus = np.zeros(N)
prog = [(48, 55, 60, 64), (45, 52, 57, 60), (41, 48, 53, 57), (43, 50, 55, 59)]  # C Am F G
bar = 6.0
for b in range(int(DUR / bar) + 1):
    at = b * bar; ch = prog[b % 4]; n = int(bar * 1.3 * SR); tt = np.arange(n) / SR
    pad = sum(np.sin(2 * np.pi * mtof(m) * tt + m) for m in ch) * np.minimum(1, tt / 1.8) * np.minimum(1, (tt[-1] - tt) / 1.5)
    place(mus, lp(pad, 1400) * .16, at)
    place(mus, lp(ep(ch[0] - 12, 4.0), 400) * .5, at)
    for k, m in enumerate((ch[3] + 12, ch[2] + 12, ch[1] + 12)):
        place(mus, ep(m, 2.5) * .12, at + 1.5 + k * 1.5)
S.add(mus, .5)
fx = S.buf()
sc = S.TL['scenes']
for s in sc[1:]:
    place(fx, bp(white(int(.5 * SR), int(s['start'] * 10)), 300, 3000) * np.hanning(int(.5 * SR)), s['start'] - .35, .06)
# light-clock ticks while the clocks run
def tick(f=2400): n = int(.04 * SR); tt = np.arange(n) / SR; return np.sin(2 * np.pi * f * tt) * np.exp(-tt * 90)
for x in np.arange(T(9), E(10), 1.2): place(fx, tick(), x + .6, .12)
for x in np.arange(T(11), E(12), 2.0): place(fx, tick(1800), x + 1.0, .1)
for x in np.arange(T(11), E(12), 1.2): place(fx, tick(2600), x + .6, .06)
# chapter swells
for i in (4, 9, 15, 20, 23, 28, 37, 43):
    place(fx, sum(tone(mtof(m), 3.0, .4, 1.2) for m in (72, 76, 79)) * .25, T(i) - 1.1, .25)
place(fx, ep(36, 6.0), T(len(S.LN) - 1) + 2.5, .3)
S.add(reverb(fx, 2.5, .3, 5), 1.0)
S.finish(bed_gain=.3, duck=.45)
