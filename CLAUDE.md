# Reality Stories: daily autopilot

This repo makes short scary/interesting story videos and schedules them to TikTok + Instagram Reels + YouTube Shorts through Metricool.
YouTube is the channel **Universe Settings** (@Universe.Settings; "reality" names were refused by YouTube), connected to the same Metricool brand since Oct 28.
The owner (GitHub `settingsreality`) chose **fully automatic** posting, **2 posts a day**. Nobody reviews before posting, so quality checks below are not optional.

## The daily run, step by step

1. **Get the repo** (fresh session each day):
   - `add_repo` owner `settingsreality`, repo `reality-stories`, access `push`.
   - Clone without the big videos:
     ```
     git clone -q --depth 1 --filter=blob:none --no-checkout https://github.com/settingsreality/reality-stories.git ~/rs
     cd ~/rs && git sparse-checkout set --no-cone '/*' '!/videos/' && git checkout -q main
     git config user.name settingsreality && git config user.email eastonjt4191@gmail.com
     ```
   - `register_repo_root` with that path.
   - `bash pipeline/setup.sh` (Python packages incl. faster-whisper + its small.en model, Kokoro fallback models; Chromium/Playwright and ffmpeg are already in the cloud session).
2. **Check the voice.** Every new video is narrated by **voice 4** (ElevenLabs "Warm, Grounded Storyteller", voice_id `MFZUKuGQUsGJPQjTS4wC`, model `eleven_v4`). The owner loves it ("makes it 100x better"). You need either the ElevenLabs connector (`creative_generate_speech`) or the Speko connector (`audio_synthesize`). **If neither is available in this session, make no story**: end the run and say in the summary that the task needs the ElevenLabs/Speko connectors. Never fall back to Kokoro for new posts.
3. **Read the calendar.**
   - Call Metricool `getScheduledPosts` (brandId `7672487`, timezone `America/New_York`) from now to 14 days out.
   - Slots are **10:00** and **18:00** New York time, every day. (Through Nov 5 the old backlog also uses 12:00; never put new stories at 12:00.)
   - List the empty slots. Skip reserved ones in `ops/schedule.md`.
   - A slot counts as filled when it has a **TikTok/Instagram** post that isn't a draft (`"draft":true` posts never publish). YouTube-only posts don't fill slots (through Nov 4 YouTube also has a 15:00 catch-up post each day; ignore those).
4. **Decide how many stories to make.**
   - If every slot for the next 7 days is filled, make **1** story.
   - Otherwise make **2** (never more than 2 per run).
5. **Make each story** (see "Making a story" below).
   - Push the video and cover.
   - Schedule it into the **earliest empty slot** that fits:
     - **The day's strongest video goes at 18:00** (the audience's most active time); scarier stories and choice endings go there.
     - Never more than 2 new videos a day: each good video needs room to keep getting pushed (the owner agreed, Oct 27).
     - Lighter or curious ones can go at 10:00.
     - If only one kind of slot is free in the next 3 days, use it.
   - Then schedule the **same video on YouTube at the same slot**, as a separate YouTube-only post (template under "Scheduling with Metricool"). Separate posts keep a YouTube failure from touching TikTok/Instagram.
6. **Update and push.**
   - Update `ops/schedule.md` (slot, slug, Metricool id in the main table; the YouTube id in the YouTube table) and `ops/ideas.md` (move the idea to Done).
   - Commit everything except videos/models (`git add --sparse ...` for the new video).
   - Push to main. Run `git pull --rebase -q` first, because another session may have pushed.
   - End commit messages with the attribution lines your session gives you.
   - Push the video and cover as soon as each story is rendered (before scheduling it), then push the ops files at the end.
7. **Finish with a short summary**: what was made, when each post goes out, and anything that went wrong. If a step failed, say so plainly. Never pretend a post was scheduled.

## What makes a story hook (the owner's direction)

The owner sent 4 popular videos as the model (rules lists, timers/HUD counters, expressive cartoon characters, bold 1–3 word captions, a dilemma and a choice ending). `stories/night-groomer` is the reference for the current style ("v2"): copy its patterns.

- **First second = the scariest moment** (cold open), told in first person ("I"). Then explain how it started.
- The first frame is already the strongest image: no fade-in.
- Length: **60–90 seconds**, about 13–16 narration lines. Escalate every few seconds; cut to a new picture every 3–6 seconds.
- Use structure that keeps people watching: **rules** (a card that fills in as they're read), **counters** in the HUD (time, battery, cable, distance) that go red when things go wrong, a **dilemma** where two rules or two voices contradict.
- End on a **twist line**, then a **choice question** with 2 options on the end card ("Unhook / Hold on"). Choice endings drive comments: use them almost always.
- Mix three kinds of premise (the owner likes all three, and said "be creative, it can be completely fake"):
  - **Real thing turns sinister:** one real, checkable device, place or phenomenon. Examples: Night Groomer (winch-cat cables on steep runs), Person Detected (doorbell AI boxes), Mimic (the mimic octopus), Steps (step counters), Witch Window, Green Light (traffic-light road sensors + garage-door safety beam), Now Boarding (flight trackers).
  - **Obviously fictional high concept:** a big, fun "what if" that is clearly made up. Examples: Restart Required (a loading bar across the sky; "Restart required: Now / Tonight"), Lost & Found (a box of things you haven't lost yet).
  - **Myth or legend retold** in a modern first-person setting. Example: 100 Years Old (tsukumogami). Keep the legend's facts right and treat the culture respectfully.
- **Never done before.** Before writing, web-search the core idea ("<idea> creepypasta", "<idea> horror story", "<idea> short film"). If someone has clearly done it, skip it and add it to the skip list in `ops/ideas.md`. Don't copy the plots of the owner's 4 example videos (zombie supermarket, Sundown cabin rules + lights on/off, The Copy, Tank 9 aquarium).
- For real-world or myth premises, check the facts with a quick search. Numbers in narration must be right.
- **About one run in four, make a physics/information explainer instead of a story**: vertical v2 page, but drawn like `stories/how-time-works` (the owner loves that look: clean diagrams on a dark grid, the toon characters, bars and clocks, big yellow numbers), narrator explaining step by step, real numbers checked with a search, 60–150 s (under 3:00 for Instagram Reels), cover kicker "REAL PHYSICS", end on a question. Explainer ideas are in `ops/ideas.md`.
- No real tragedies with real victims, no real named private people, nothing gory. Keep it TikTok-safe: dread and twists, not violence.
- Vary settings: don't post two stories about the same kind of device or place in the same week.

## Making a story (v2)

```
pipeline/new_story2.sh <slug> "<Title>" "Follow &amp; comment below" "<Option A>|<small text A>" "<Option B>|<small text B>"
# write stories/<slug>/script.py (lines + scene tags); voices.json is already voice 4
python3 pipeline/elevoice.py stories/<slug> text          # prints the narration text (~1,000 characters)
#   -> generate it ONCE with ElevenLabs creative_generate_speech(prompt=<that text>, model_id eleven_v4, voice_id MFZUKuGQUsGJPQjTS4wC, generations_count 1)
#      poll creative_get_flow_run_status until all_completed; take the content_url
#   -> or with Speko audio_synthesize {text, intent:{language:'en',optimizeFor:'accuracy'}, voice:'MFZUKuGQUsGJPQjTS4wC',
#      constraints:{allowedProviders:{tts:['elevenlabs:eleven_v4']}}} and use its url (valid 15 min) or decode audio_base64 from the saved tool-result file
python3 pipeline/elevoice.py stories/<slug> build "n=<url>"   # (or "n=<url1>,<url2>" to pick the better of 2 takes) cuts lines, word timings -> timeline.json (+ www/)
# write www/art.js (places/things) and www/scenes.js (one function per scene tag)
pipeline/make.sh <slug> stills "0.3,4,9,14,19,24,30,36,42,48,54,60,66,72" 5   # -> stories/<slug>/grid.jpg (full frames)
# LOOK at grid.jpg with Read. Fix anything wrong, re-run stills.
# write audio.py (music pulse under everything + effects timed to words; see night-groomer/audio.py)
pipeline/make.sh <slug> audio
pipeline/make.sh <slug> video      # ~6–10 min for 80 s; writes videos/<slug>.mp4
node pipeline/v2/cover.js stories/<slug>/www <t> covers/<slug>-cover.jpg '<short hook, key words in <i>…</i>>' '<TITLE>'
```

- **Voice budget (the owner: "use either voice, get the most use out of them as you can"):** both services give the exact same voice 4, so spend them to make as many videos as possible.
  - **ElevenLabs first** (the owner's plan; credits reset monthly, so unused ones are wasted). Generate with **`generations_count: 1`** (one take = half the credits; the owner asked for maximum use). Before generating, call it once with `estimate_only: true`: if that shows a blocking error (out of credits), use Speko instead. Never call generation twice for the same text (each call charges).
  - **Speko when ElevenLabs is out or fails**, and for long videos (over ~2,000 characters): `audio_synthesize` as below, about 8¢ per 1,000 characters. Check `credits_balance_get` first; if it's under $1, say so in the summary.
  - If a take reads badly (`elevoice.py build` under 90% words matched), don't regenerate the whole story: fix only the bad line by giving it its own voice tag and generating just that line (see stories/universe-ends: the last line was re-done for about 120 credits).
- **Music and sound effects (optional, for funny/trend videos like stories/rizz-x2):** ElevenLabs can make original ones: `creative_generate_in_flow` node_type `sfx`, model `eleven_text_to_sound_v2` (one short sound per prompt, about 17 credits each) and node_type `music`, model `eleven_music_v2_5` (set `duration_seconds` and `instrumental: true` with `creative_update_node` first; about 15 credits per second). Put the files in `stories/<slug>/sfx/` and load them in audio.py (see rizz-x2/audio.py). **Never bake copyrighted songs or audio ripped from TikTok into a video**: auto-posted files get muted on TikTok (taking the narration with it) and claimed on YouTube.
- **script.py**: `SCRIPT = [(scene_tag, caption, 'n'), ...]`.
  - `*word*` shows in yellow on screen and is spoken normally.
  - `[whispers]`, `[urgent]`, `[quietly]` etc. at the start of a line are ElevenLabs v4 direction: spoken as tone, never shown. Use sparingly (cold open, a radio voice, the final question).
  - Scene tags must exactly match function names in `scenes.js` and keys in `SCENES`.
  - **One voice per story** (the owner's rule). A radio/phone voice is the same narrator with `"_fx": {"<line index>": "radio"}` in voices.json.
- **voices.json**: `_say` (screen text -> spoken text), `_gaps` (extra seconds before a line index), `_fx`, `_tail` (seconds after the last line, default 4.0).
- **Look (v2)**: full 1080×1920 canvas (draw in 1080×1920 world coordinates with `vl(cam,depth,fn)`), bold uppercase captions in 1–3 word chunks timed to the real words, HUD chips top-left from `hud(t)` (`{chips:[{k,v,hot}], tag, tagRed}`), a punch-in on every scene cut, an end card with the two options during the last line.
  - Explainers can also load `pipeline/v2/science.js` (copy it into www/ and add a script tag after engine2.js): `earth(x,y,r,{spin})` with real-looking continents, clouds and a night side, and `blackHole(x,y,R,t)` drawn the Interstellar way (shadow, photon ring, disk in front along the bottom and bent over the top). Don't draw Earth as a blue circle with random blobs, or a black hole as a planet with a ring.
  - Helpers: `pipeline/engine.js` (shapes) + `pipeline/v2/engine2.js`: `toon()` (big-head cartoon person with expressions: brow `flat|worried|scared|angry`, mouth `flat|o|open|frown|smile|grit`, hats, name tag, `blank` for a faceless figure), `snow()`, `beam()`, `label()`, `waveform()`, `vgrad()`, `shakeAt()`.
  - Word-exact cues: `wi(i,'word')` = when that word of line i is spoken (see night-groomer/scenes.js). Put reveals, hits and cuts on words, not on guesses.
  - `CAPY = {scene: fraction}` moves captions when a scene's art needs the middle (default .6).
  - The main character wears the orange beanie (`me()` in night-groomer/art.js style). Dark palette, but never pure black: the subject is always lit.
- **Quality checks before the full render** (every one, every time):
  - The stills grid: nothing cut off, captions never covering faces/key text, HUD readable, the creature/twist visible, every scene different and readable at phone size.
  - The cold-open frame (t≈0.3) is striking.
  - `elevoice.py build` reports words matched ≥ 90% (lower = listen-level problem: use the other take).
  - Voice clearly louder than the music: speech ~7–10 dB above the gaps (measure like night-groomer did; `S.finish(bed_gain=.2, duck=.4)` is a good start).
  - After the render, `ffprobe` the mp4: 1080×1920, h264+aac, the expected duration. Grab 5 frames with ffmpeg and look at them.
- Only one render at a time (2 CPU cores). Run long renders in the background (`run_in_background`) and keep working meanwhile. Use `ffmpeg -nostdin` and `< /dev/null` in loops.
- The older stories in `stories/` (v1: title + 16:9 band, Kokoro voices, `new_story.sh`, `refit.py`) are kept for reference; don't make new v1 stories.

## Scheduling with Metricool

`createScheduledPost` with `blogId` `7672487`, `date` like `2026-11-08T18:00:00-05:00` (EST from Nov 1, EDT −04:00 from March), and `info`:

```json
{"autoPublish":true,"draft":false,"descendants":[],"firstCommentText":"","hasNotReadNotes":false,
 "media":["https://raw.githubusercontent.com/settingsreality/reality-stories/main/videos/<slug>.mp4"],
 "videoThumbnailUrl":"https://raw.githubusercontent.com/settingsreality/reality-stories/main/covers/<slug>-cover.jpg",
 "mediaAltText":[],"providers":[{"network":"tiktok"},{"network":"instagram"}],
 "publicationDate":{"dateTime":"2026-11-08T18:00:00","timezone":"America/New_York"},
 "shortener":false,"smartLinkData":{"ids":[]},
 "text":"<caption: 1–2 hook sentences + the choice question> #scarystories #horrortok #<topic> #<topic> #fyp",
 "instagramData":{"type":"REEL","showReelOnFeed":true,"isAiGenerated":true},
 "tiktokData":{"privacyOption":"PUBLIC_TO_EVERYONE","title":"<Title>","isAigc":true,"disableComment":false,"disableDuet":false,"disableStitch":false,"autoAddMusic":false}}
```

**YouTube Shorts post** (a second, YouTube-only post at the same `date`):

```json
{"autoPublish":true,"draft":false,"descendants":[],"firstCommentText":"","hasNotReadNotes":false,
 "media":["https://raw.githubusercontent.com/settingsreality/reality-stories/main/videos/<slug>.mp4"],
 "mediaAltText":[],"providers":[{"network":"youtube"}],
 "publicationDate":{"dateTime":"2026-11-08T18:00:00","timezone":"America/New_York"},
 "shortener":false,"smartLinkData":{"ids":[]},
 "text":"<same caption, with #fyp replaced by #shorts>",
 "youtubeData":{"title":"<hook-style title, max 100 characters, e.g. 'A skier in my headlights, on a mountain that closed 6 hours ago'>",
  "type":"short","privacy":"public","tags":["<the caption's hashtags without #, minus fyp>"],
  "category":"ENTERTAINMENT","madeForKids":false,"isAiGeneratedContent":true}}
```

- YouTube: category `ENTERTAINMENT` for stories, `SCIENCE_TECHNOLOGY` for explainers. No `videoThumbnailUrl` (the channel isn't verified; Metricool can reject the whole post for it). **Every YouTube post must be a Short (the owner)**, and YouTube only treats videos of **3:00 or shorter** as Shorts. Keep new videos under 3:00; if one is longer, make a sped-up copy for YouTube (`ffmpeg -filter_complex "[0:v]setpts=PTS/<k>,fps=30[v];[0:a]atempo=<k>[a]"` with k = duration/178) saved as `videos/<slug>-short.mp4`, as done for nobody-awake-pt1/pt2.
- Push the video and cover to GitHub **before** scheduling; Metricool copies the files when the post is created.
- The response shows `static.metricool.com` media URLs. If it errors, wait a minute (the raw URL can lag after a push) and retry once.
- Keep the AI labels on (`isAiGenerated`, `isAigc`, `isAiGeneratedContent`): the owner wants them.
- Never schedule the same slug twice on the same network. Check `ops/schedule.md` (both tables) and `getScheduledPosts`.
- Don't touch posts already scheduled unless one is clearly broken.

## Rules

- Series parts go on **consecutive days in the same slot**, in order.
- `rizz-x2` is on hold (see `ops/schedule.md`): never schedule or un-draft it on autopilot.
- Never post the poll stories automatically (2.7 Seconds, The Third Man). The owner posts those by hand with a TikTok poll.
- `Glitch 01` is already on Instagram (TikTok and YouTube only).
- Every existing video is already scheduled on YouTube (Oct 29 to Nov 18, see `ops/schedule.md`). Don't add them again.
- The owner already posted elsewhere: "the atmosphere disappears", "falling into a black hole", "something changed my reality settings" (= Glitch 01 on IG). Don't remake those.
- Through Nov 5 the old backlog posts 3 a day (10:00, 12:00, 18:00), as the owner asked. That 12:00 slot is only for the backlog: new stories use 10:00/18:00.
- Don't make 3D physics sims on autopilot (Three.js renders take 45+ min). Stories only.
- `stories/how-time-works` is a long widescreen explainer made for the owner personally (pipeline/wide). Don't post it.
- Keep `ops/ideas.md` honest: Done list, skip list (already done by others), and the idea bank.
