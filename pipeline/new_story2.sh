#!/bin/bash
# New-style (v2) story: full-screen vertical scenes, bold word-timed captions, HUD chips, choice end card.
# usage: pipeline/new_story2.sh <slug> "<Title>" "<end card heading>" "<option A>|<small text A>" "<option B>|<small text B>" ["<option C>|<small C>"]
# makes stories/<slug>/: script.py, voices.json (voice 4 via ElevenLabs), audio.py, www/{index.html,art.js,scenes.js,engine*.js,fonts}
set -e
R=$(cd "$(dirname "$0")/.." && pwd); P=$R/pipeline; V=$P/v2; slug=$1; D=$R/stories/$slug
[ -e "$D" ] && { echo "exists: $D"; exit 1; }
mkdir -p "$D/www"; cp -r $V/fonts $P/engine.js $V/engine2.js "$D/www/"; cp $P/render.js "$D/"; cp $V/grid.py "$D/"
shift; title="$1"; head="$2"; shift 2
python3 - "$V/index.template.html" "$D/www/index.html" "$title" "$head" "$@" <<'PY'
import sys, html
src, out, title, head, *opts = sys.argv[1:]
s = open(src).read()
o = ''.join(f'<div class="o"><div class="a">{html.escape(a)}</div><div class="b">{html.escape(b)}</div></div>' for a, _, b in (x.partition('|') for x in opts))
for k, v in {'{{TITLE}}': title, '{{TITLE_UP}}': title.upper(), '{{END_HEAD}}': head, '{{END_OPTS}}': o}.items(): s = s.replace(k, v)
open(out, 'w').write(s)
PY
for f in scenes art; do python3 -c "import sys;t=sys.argv[1];open(sys.argv[3],'w').write(open(sys.argv[2]).read().replace('{{TITLE}}',t).replace('{{TITLE_UP}}',t.upper()))" "$title" $V/$f.template.js "$D/www/$f.js"; done
cp $P/audio.template.py "$D/audio.py"
cat > "$D/script.py" <<PY
# $title. (scene, caption, voice). First person. *word* = yellow on screen. [whispers] etc. = ElevenLabs direction, never shown.
SCRIPT = [
 ('s1', "Cold open: the scariest moment, in one or two sentences. *Hook.*", 'n'),
 ('s2', "Next line.", 'n'),
]
PY
cat > "$D/voices.json" <<'J'
{"n": {"voice": "eleven:MFZUKuGQUsGJPQjTS4wC", "name": "Warm, Grounded Storyteller (voice 4)", "kokoro_fallback": "am_onyx", "speed": 0.95},
 "_say": {}, "_gaps": {}, "_fx": {}, "_tail": 4.0}
J
echo "made $D"
