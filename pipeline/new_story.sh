#!/bin/bash
# usage: pipeline/new_story.sh <slug> "<Title first line>" "<title italic second line or ''>" "<META LEFT>" "<end line>" "<end question, may use <i>>"
# makes stories/<slug>/ ready to edit: script.py, voices.json, audio.py, www/{index.html,art.js,scenes.js,engine.js,fonts}
set -e
R=$(cd "$(dirname "$0")/.." && pwd); P=$R/pipeline; slug=$1; D=$R/stories/$slug
[ -e "$D" ] && { echo "exists: $D"; exit 1; }
mkdir -p "$D/www"; cp -r $P/fonts $P/engine.js "$D/www/"; cp $P/render.js $P/grid.py "$D/"
title="$2"; [ -n "$3" ] && th="$2<br><i>$3</i>" && title="$2 $3" || th="$2"
python3 - "$P/index.template.html" "$D/www/index.html" "$title" "$th" "$4" "$5" "$6" <<'PY'
import sys
s=open(sys.argv[1]).read()
for k,v in zip(['{{TITLE}}','{{TITLE_HTML}}','{{META_LEFT}}','{{END_LINE}}','{{END_QUESTION}}'],sys.argv[3:]): s=s.replace(k,v)
open(sys.argv[2],'w').write(s)
PY
sed "s/{{TITLE}}/$title/" $P/scenes.template.js > "$D/www/scenes.js"
sed "s/{{TITLE}}/$title/" $P/art.template.js > "$D/www/art.js"
cp $P/audio.template.py "$D/audio.py"
cat > "$D/script.py" <<PY
# $title. (scene, caption, voice) first person. *word* = orange italic emphasis on screen.
SCRIPT = [
 ('s1', "Cold open: the creepiest moment, in one or two sentences. *Hook.*", 'n'),
 ('s2', "Next line.", 'n'),
]
PY
echo '{"n": {"voice": "af_heart", "speed": 0.95}, "_say": {}, "_gaps": {}}' > "$D/voices.json"
echo "made $D"
