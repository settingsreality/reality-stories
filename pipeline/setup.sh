#!/bin/bash
# One-time setup for a fresh cloud session (safe to re-run). Needs: python3, node, ffmpeg, playwright (preinstalled in Claude's cloud sessions).
set -e
R=$(cd "$(dirname "$0")/.." && pwd)
pip install -q --break-system-packages kokoro-onnx soundfile scipy numpy pillow faster-whisper 2>&1 | tail -1 || true
mkdir -p $R/models
U=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s $R/models/kokoro-v1.0.onnx ] || curl -sSL -o $R/models/kokoro-v1.0.onnx $U/kokoro-v1.0.onnx
[ -s $R/models/voices-v1.0.bin ] || curl -sSL -o $R/models/voices-v1.0.bin $U/voices-v1.0.bin
which ffmpeg >/dev/null || (apt-get install -y -qq ffmpeg >/dev/null 2>&1 || pip install -q --break-system-packages imageio-ffmpeg)
node -e "require('playwright')" 2>/dev/null || echo "WARNING: playwright missing for node; try: npm i -g playwright@1 (then no browser install needed if chromium is preinstalled)"
python3 -c "import kokoro_onnx,soundfile,scipy,PIL;print('python ok')"
# word timings for ElevenLabs narration (pipeline/elevoice.py): fetch the small.en model once
python3 -c "from faster_whisper import WhisperModel;WhisperModel('small.en',device='cpu',compute_type='int8');print('whisper ok')" 2>&1 | grep -v Warning || echo 'WARNING: whisper model download failed (huggingface.co must be reachable)'
ls -la $R/models
