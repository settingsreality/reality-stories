# Rizz x2: an original flirty phonk beat (ElevenLabs Music) under everything, with meme-style hits timed to the words:
# bass booms, sparkle dings, crowd "ooooh", record scratch (the beat stops), angel choir on the jawline, pigeons, car horns.
import sys, os, subprocess
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'pipeline'))
from sound import *
D = os.path.dirname(os.path.abspath(__file__))
S = Story(D)
t, T, E, W, N, DUR = S.t, S.T, S.E, S.W, S.N, S.DUR
last = len(S.LN) - 1
def wi(i, word):
    for w in S.LN[i].get('words', []):
        if ''.join(c for c in w['w'].lower() if c.isalpha() or c in "'-") == word: return w['start']
    return W(i, .5)
def load(name, rate=1.0):
    raw = subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', os.path.join(D, 'sfx', name + '.mp3'), '-ac', '1', '-ar', str(int(SR / rate)), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).astype(np.float64); return x / (np.max(np.abs(x)) + 1e-9)

# ---------- the beat: full from frame 1, stops dead on the record scratch and before "it came back", drops back in on the boom ----------
beat = load('beat'); sc1, sc2 = wi(5, "didn't"), wi(9, 'came'); wk = wi(9, 'week')
# start right on the drop; the track pauses while the music is "stopped" (record scratch, and the beat before "it came back")
OFF = 10.651; mus = np.zeros(N); pos = int(OFF * SR)
for a, b in ((0, sc1 + .05), (T(6), wk), (sc2, DUR + .5)):
    i0, i1 = int(a * SR), min(N, int(b * SR)); n = max(0, min(i1 - i0, len(beat) - pos)); mus[i0:i0 + n] = beat[pos:pos + n]; pos += n
genv = S.env([(0, 1.0), (T(1) - .2, 1.0), (T(1), .75), (T(3), .9), (sc1 - .02, 1.0), (sc1 + .05, 0), (T(6) - .01, 0), (T(6), 1.0),
              (wk - .02, .9), (wk, 0), (sc2 - .01, 0), (sc2 + .01, 1.15), (T(11), 1.05), (T(11) + .2, .55), (T(12), .55), (wi(12, 'keep'), 1.0),
              (T(13), 1.0), (T(last), .8), (E(last) + 1.5, .8), (DUR - 1.0, .5), (DUR, 0)])
S.add(mus * genv, .62)

fx = S.buf()
boom, spark, ooh, scratch_, choir, pig, horns, ding = (load(n) for n in ('boom', 'sparkle', 'ooh', 'scratch', 'choir', 'pigeons', 'horns', 'ding'))
low_ding = load('ding', .75)  # pitched down for the second notification
place(fx, boom, .02, 1.0)                                  # cold open
place(fx, spark, wi(0, 'closer') - .1, .55)
place(fx, ding, wi(1, 'notification') - .05, .6)
place(fx, spark, wi(1, 'times') - .05, .5)                   # toggle on
place(fx, spark, wi(2, 'heart') - .1, .6)                    # latte heart
place(fx, ding, wi(3, 'crush') - .05, .45)                   # message
place(fx, ooh, wi(3, 'paragraph') + .05, .9)                 # "ooooh"
place(fx, pig, wi(4, 'pigeon') - .1, .55); place(fx, pig, wi(4, 'got') - .05, .45)
place(fx, spark, wi(5, 'a') - .1, .5)                        # the A+
place(fx, scratch_, sc1 - .08, 1.0)                          # record scratch: the beat stops
place(fx, boom, T(6) - .02, .7)                              # beat back in: day twenty
place(fx, choir, wi(6, 'jawline') - .15, .95); place(fx, spark, wi(6, 'jawline'), .6)
place(fx, horns, wi(7, 'whole') - .05, .6)
place(fx, boom, sc2 - .02, 1.1); place(fx, spark, wi(9, 'back'), .5)   # it came back
place(fx, ooh, wi(10, 'earth') + .05, .8)
place(fx, low_ding, wi(11, 'notification') - .05, .7)
place(fx, spark, wi(12, 'one'), .5); place(fx, boom, wi(12, 'doubles') - .02, .8)
place(fx, choir, wi(13, 'twice') - .1, .9); place(fx, spark, wi(13, 'twice') + .1, .5)
place(fx, spark, wi(14, 'keep') - .05, .45); place(fx, spark, wi(14, 'share') - .05, .45)
S.add(reverb(fx, 1.2, .12, 5), 1.15)

S.finish(bed_gain=.3, duck=.45)
