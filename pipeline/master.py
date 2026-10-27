# Voice polish: EQ (warmth, less mud, presence, air), de-ess, compression, light saturation, small room.
import numpy as np
from scipy.signal import sosfilt, butter, fftconvolve
def _peak(f, gain_db, q, sr):
    A = 10 ** (gain_db / 40); w = 2 * np.pi * f / sr; al = np.sin(w) / (2 * q)
    b = [1 + al * A, -2 * np.cos(w), 1 - al * A]; a = [1 + al / A, -2 * np.cos(w), 1 - al / A]
    return np.array([[b[0] / a[0], b[1] / a[0], b[2] / a[0], 1, a[1] / a[0], a[2] / a[0]]])
def _shelf(f, gain_db, sr, high=True):
    A = 10 ** (gain_db / 40); w = 2 * np.pi * f / sr; al = np.sin(w) / 2 * np.sqrt(2); c = np.cos(w); s = 2 * np.sqrt(A) * al
    if high:
        b = [A * ((A + 1) + (A - 1) * c + s), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - s)]; a = [(A + 1) - (A - 1) * c + s, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - s]
    else:
        b = [A * ((A + 1) - (A - 1) * c + s), 2 * A * ((A - 1) - (A + 1) * c), A * ((A + 1) - (A - 1) * c - s)]; a = [(A + 1) + (A - 1) * c + s, -2 * ((A - 1) + (A + 1) * c), (A + 1) + (A - 1) * c - s]
    return np.array([[b[0] / a[0], b[1] / a[0], b[2] / a[0], 1, a[1] / a[0], a[2] / a[0]]])
def _env(x, sr, ms):
    n = max(1, int(sr * ms / 1000)); return np.sqrt(np.convolve(x ** 2, np.ones(n) / n, 'same') + 1e-12)
def master(x, sr, deep=False):
    x = np.asarray(x, dtype=np.float64)
    x = sosfilt(butter(2, 75, 'highpass', fs=sr, output='sos'), x)
    x = sosfilt(_peak(160 if deep else 200, 2.5 if deep else 1.5, .8, sr), x)   # warmth
    x = sosfilt(_peak(380, -2.5, 1.0, sr), x)                                    # less mud
    x = sosfilt(_peak(3500, 3.0, .9, sr), x)                                     # presence
    x = sosfilt(_shelf(9000, 2.5, sr, True), x)                                  # air
    # de-ess: duck the 5-9 kHz band when it gets hot
    s = sosfilt(butter(2, [5000, 9000], 'bandpass', fs=sr, output='sos'), x); es = _env(s, sr, 5); ev = _env(x, sr, 20)
    g = np.clip(1 - np.maximum(0, es / (ev + 1e-9) - .35) * 1.2, .45, 1); x = x - s * (1 - g)
    # compression (3:1 above -20 dBFS-ish), then makeup
    x = x / (np.max(np.abs(x)) + 1e-9) * .8; e = _env(x, sr, 12); th = .1
    gain = np.where(e > th, (th + (e - th) / 3) / e, 1.0); gain = np.convolve(gain, np.ones(int(sr * .008)) / int(sr * .008), 'same'); x = x * gain
    x = np.tanh(x / (np.max(np.abs(x)) + 1e-9) * 1.3) / np.tanh(1.3)              # gentle saturation
    # a small room (short, bright-ish early reflections)
    n = int(.35 * sr); r = np.random.default_rng(2); ir = r.standard_normal(n) * np.exp(-np.arange(n) / sr * 14); ir = sosfilt(butter(2, 6000, 'lowpass', fs=sr, output='sos'), ir); ir /= np.sqrt(np.sum(ir ** 2))
    x = x * .9 + fftconvolve(x, ir)[:len(x)] * .07
    return (x / (np.max(np.abs(x)) + 1e-9) * .9).astype(np.float32)
