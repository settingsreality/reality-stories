# Sound for this story. Build a quiet bed under the narration, then a few effects timed to lines.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
S = Story(os.path.dirname(os.path.abspath(__file__)))
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1

# ---------- bed: low drone + slow pad, shaped by env() to rise toward the twist ----------
drone = (np.sin(2 * np.pi * 41 * t) * .6 + np.sin(2 * np.pi * 61.7 * t) * .3 + lp(white(N), 110) * 2.0) * (.8 + .2 * np.sin(2 * np.pi * .06 * t))
S.add(drone * S.env([(0, 1.2), (T(1), .5), (T(last - 1), 1.3), (T(last), 2.0), (E(last) + .4, 0), (E(last) + 1, .4), (DUR, .3)]), .2)
pad = sum(np.sin(2 * np.pi * mtof(m) * t + m * .7) for m in (45, 52, 57, 60)) * (.7 + .3 * np.sin(2 * np.pi * .08 * t))
S.add(lp(pad, 1200) * S.env([(0, .6), (T(1), 1.1), (T(last), .5), (E(last) + .4, 0), (E(last) + 1.2, .9), (DUR, .5)]), .022)

# ---------- effects: a sting on the cold open and on the twist ----------
fx = S.buf()
place(fx, sting() * .6, .05, .3)
place(fx, sting() * .7, T(last) - .1, .42); place(fx, thump(3.0, 80, 28), T(last), .55)
place(fx, ep(40, 3.0) * .6, E(last) + 1.0, .3)
S.add(reverb(fx, 2.0, .22, 7), 1.0)

S.finish()
