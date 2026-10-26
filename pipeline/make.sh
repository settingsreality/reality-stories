#!/bin/bash
# usage: pipeline/make.sh <slug>      voice -> audio -> full render -> videos/<slug>.mp4
#        pipeline/make.sh <slug> voice   only re-voice (refit --fresh) and copy the timeline into www/
#        pipeline/make.sh <slug> audio   only rebuild audio.wav
#        pipeline/make.sh <slug> stills "1,10,20,30" [cols]   preview frames -> stories/<slug>/grid.jpg
#        pipeline/make.sh <slug> video   render + mux only (voice and audio already done)
set -e
R=$(cd "$(dirname "$0")/.." && pwd); slug=$1; D=$R/stories/$slug; step=${2:-all}
cd "$D"
voice(){ python3 $R/pipeline/refit.py "$D" --fresh && cp timeline.json www/timeline.json; }
audio(){ python3 audio.py; }
video(){ T=$(python3 -c "import json;print(json.load(open('www/timeline.json'))['total'])")
  node render.js video 0 $T video.mp4 > render.log 2>&1 < /dev/null
  ffmpeg -nostdin -y -v error -i video.mp4 -i audio.wav -map 0:v -map 1:a -c:v libx264 -preset veryfast -crf 21 -maxrate 6M -bufsize 12M -pix_fmt yuv420p \
    -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 -c:a aac -b:a 192k -shortest -movflags +faststart "$R/videos/$slug.tmp.mp4"
  mv "$R/videos/$slug.tmp.mp4" "$R/videos/$slug.mp4"; rm -f video.mp4; echo "VIDEO DONE $R/videos/$slug.mp4"; }
case $step in
  voice) voice;; audio) audio;; video) video;;
  stills) rm -rf st; node render.js stills "$3" st > /dev/null 2>&1 < /dev/null; python3 grid.py st grid.jpg ${4:-4}; echo "grid: $D/grid.jpg";;
  all) voice; audio; video;;
esac
