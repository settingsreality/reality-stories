# Shared sound helpers for story audio. A story's audio.py does:
#   import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'pipeline'))
#   from sound import *
#   S = Story(os.path.dirname(os.path.abspath(__file__)))   # loads www/timeline.json, sets the clock
#   ... build beds/effects with S.add(...), place(), env(), etc ...
#   S.finish()   # ducks the bed under the narration and writes audio.wav next to script.py
import json, os
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.io import wavfile

SR = 48000
_rng = np.random.default_rng(15)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'highpass', fs=SR, output='sos'), x)
def white(n, seed=None): return (np.random.default_rng(seed) if seed is not None else _rng).standard_normal(n)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
def place(buf, sig, at, g=1.0):
    """add sig into buf starting at time `at` (seconds); clipped to the buffer, never changes its length"""
    i = int(at * SR)
    if i >= len(buf) or i < 0: return
    n = min(len(sig), len(buf) - i); buf[i:i + n] += sig[:n] * g
def reverb(x, secs=3.0, wet=.3, seed=1, damp=2.2):
    r = np.random.default_rng(seed); n = int(secs * SR)
    ir = lp(r.standard_normal(n) * np.exp(-np.arange(n) / SR * damp), 5000); ir /= np.sqrt(np.sum(ir ** 2))
    return x * (1 - wet) + fftconvolve(x, ir)[:len(x)] * wet
def tone(f, d, a=.01, dec=3.0):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, tt / a) * np.exp(-tt * dec)
def ep(m, d):  # soft electric-piano note (midi m)
    n = int(d * SR); tt = np.arange(n) / SR; f = mtof(m)
    return (np.sin(2 * np.pi * f * tt) + .35 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt * 1.6) * np.minimum(1, tt * 300)
def thump(d=2.5, f1=70, f2=28):  # big low hit for the reveal
    n = int(d * SR); tt = np.arange(n) / SR; f = f2 + (f1 - f2) * np.exp(-tt * 5)
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.6) * 1.8)
def step(seed, heavy=False, wet=True, wood=False):
    r = np.random.default_rng(seed); n = int(.35 * SR); tt = np.arange(n) / SR
    s = lp(r.standard_normal(n), 500 if heavy else 900) * np.exp(-tt * (14 if heavy else 24))
    if wet: s += bp(r.standard_normal(n), 1500, 6000) * np.exp(-tt * 30) * .5
    if heavy: s += np.sin(2 * np.pi * 55 * tt) * np.exp(-tt * 12) * .8
    if wood: s += bp(np.sign(np.sin(2 * np.pi * np.cumsum(180 + 40 * tt) / SR)) * (r.random(n) < .25), 200, 1500) * np.exp(-tt * 6) * .5
    return s
def creak(d, f0, seed, dens=.3):
    n = int(d * SR); tt = np.arange(n) / SR
    return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f0 + .4 * f0 * np.sin(2 * np.pi * 1.3 * tt)) / SR)) * (np.random.default_rng(seed).random(n) < dens), 200, 2500) * np.sin(np.pi * tt / tt[-1])
def scratch(seed, d=1.6):
    r = np.random.default_rng(seed); n = int(d * SR); out = np.zeros(n)
    for k in range(int(d * 5)):
        a = int(r.uniform(0, d - .3) * SR); m = int(r.uniform(.12, .28) * SR); u = np.arange(m) / SR
        s = bp(r.standard_normal(m), 2500, 9000) * (r.random(m) < .5) * np.sin(np.pi * u / u[-1])
        out[a:a + m] += s[:max(0, min(m, n - a))]
    return out
def sting(d=3.5, freqs=(233, 247, 311, 466, 494)):  # dissonant hit for scares
    n = int(d * SR); tt = np.arange(n) / SR
    return (sum(np.sin(2 * np.pi * f * tt) for f in freqs) * .2 + bp(white(n), 800, 8000) * .6) * np.exp(-tt * 1.4) * np.minimum(1, tt * 60)
def heartbeat(buf, t0, t1, every=.6, g=1.0):
    n = int(.18 * SR); tt = np.arange(n) / SR; th = np.sin(2 * np.pi * 50 * tt) * np.exp(-tt * 18)
    for a in np.arange(t0, t1, every): place(buf, th, a, g); place(buf, th, a + .16, .6 * g)

class Story:
    def __init__(self, d):
        self.d = d
        self.TL = json.load(open(os.path.join(d, 'www', 'timeline.json')))
        self.DUR = self.TL['total']; self.N = int(SR * self.DUR) + SR
        self.t = np.arange(self.N) / SR
        self.L = np.zeros(self.N); self.R = np.zeros(self.N)
        self.LN = self.TL['lines']
    def T(self, i): return self.LN[i]['start']
    def E(self, i): return self.LN[i]['end']
    def W(self, i, f): return self.T(i) + (self.E(i) - self.T(i)) * f
    def env(self, pts):
        ts, vs = zip(*pts); return np.interp(self.t, ts, vs)
    def buf(self): return np.zeros(self.N)
    def add(self, sig, g=1.0, pan=0.0):
        n = min(len(sig), self.N)
        self.L[:n] += sig[:n] * g * np.sqrt((1 - pan) / 2) * 1.414; self.R[:n] += sig[:n] * g * np.sqrt((1 + pan) / 2) * 1.414
    def finish(self, bed_gain=.55, duck=.35):
        sr_n, vo = wavfile.read(os.path.join(self.d, 'narration.wav'))
        vo = vo.astype(np.float32) / 32768; vo = resample_poly(vo, SR, sr_n); vo = hp(vo, 70); vo = reverb(vo, 1.2, .08, 3, 6)
        voice = np.zeros(self.N); voice[:min(len(vo), self.N)] = vo[:self.N]
        venv = np.convolve(np.abs(voice) > .02, np.ones(int(.25 * SR)) / (.25 * SR), 'same')
        dk = 1 - duck * np.clip(venv * 3, 0, 1)
        bed = np.stack([self.L * dk, self.R * dk], 1); bed = np.tanh(bed * 1.2) / 1.2
        mix = bed * bed_gain + np.stack([voice, voice], 1)
        mix = mix[:int(self.DUR * SR)]; mix /= np.max(np.abs(mix)) + 1e-9; mix *= .9
        out = os.path.join(self.d, 'audio.wav')
        wavfile.write(out, SR, (mix * 32767).astype(np.int16)); print('audio ok', round(self.DUR, 2), out)
