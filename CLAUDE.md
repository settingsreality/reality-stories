# Reality Stories: daily autopilot

This repo makes short scary/interesting story videos and schedules them to TikTok + Instagram Reels through Metricool.
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
   - `bash pipeline/setup.sh` (Kokoro voice models, Python packages; Chromium/Playwright and ffmpeg are already in the cloud session).
2. **Read the calendar.**
   - Call Metricool `getScheduledPosts` (brandId `7672487`, timezone `America/New_York`) from now to 14 days out.
   - Slots are **10:00** and **18:00** New York time, every day.
   - List the empty slots. Skip reserved ones in `ops/schedule.md`.
3. **Decide how many stories to make.**
   - If every slot for the next 7 days is filled, make **1** story.
   - Otherwise make **2** (never more than 2 per run).
4. **Make each story** (see "Making a story" below).
   - Push the video and cover.
   - Schedule it into the **earliest empty slot** that fits:
     - Scarier stories go at 18:00.
     - Lighter or curious ones can go at 10:00.
     - If only one kind of slot is free in the next 3 days, use it.
5. **Update and push.**
   - Update `ops/schedule.md` (slot, slug, Metricool id) and `ops/ideas.md` (move the idea to Done).
   - Commit everything except videos/models (`git add --sparse ...` for the new video).
   - Push to main. Run `git pull --rebase -q` first, because another session may have pushed.
   - End commit messages with the attribution lines your session gives you.
   - Push the video and cover as soon as each story is rendered (before scheduling it), then push the ops files at the end.
6. **Finish with a short summary**: what was made, when each post goes out, and anything that went wrong. If a step failed, say so plainly. Never pretend a post was scheduled.

## What makes a story hook (the owner's direction)

- **First second = the creepiest moment** (cold open), told in first person ("I"). Then explain how it started.
- The first frame is already the strongest image: no slow fade-in.
- Length: **60–90 seconds**, about 12–16 narration lines.
- Escalate every few seconds and end on a **twist line**.
- The end card asks a question to drive comments ("Would you open the door?").
- Mix three kinds of premise (the owner likes all three, and said "be creative, it can be completely fake"):
  - **Real thing turns sinister:** one real, checkable device, place or phenomenon. Examples: Person Detected (doorbell AI boxes), Mimic (the mimic octopus), Steps (step counters), Witch Window, Green Light (traffic-light road sensors + garage-door safety beam), Now Boarding (flight trackers).
  - **Obviously fictional high concept:** a big, fun "what if" that is clearly made up. Examples: Restart Required (a loading bar across the sky; "Restart required: Now / Tonight"), Lost & Found (a box of things you haven't lost yet).
  - **Myth or legend retold** in a modern first-person setting. Example: 100 Years Old (tsukumogami: things get a soul at 100; your house turns 100 the week it's for sale). Keep the legend's facts right and treat the culture respectfully.
- **Never done before.** Before writing, web-search the core idea ("<idea> creepypasta", "<idea> horror story", "<idea> short film"). If someone has clearly done it, skip it and add it to the skip list in `ops/ideas.md`.
- For real-world or myth premises, check the facts with a quick search. Numbers in narration must be right.
- **About one run in four, make a physics/information explainer instead of a story** (the owner asked for these too). Example: `stories/one-way-trip` (time dilation + warp drives): 2D motion graphics, a narrator explaining step by step, real numbers checked with a search, under 3:00 so it fits Instagram Reels, cover kicker "REAL PHYSICS". Explainer ideas are in `ops/ideas.md`.
- Endings that ask the viewer to choose or answer ("Now, or tonight?", "Would you open it?", "How old is your house?") drive comments; use them often.
- No real tragedies with real victims, no real named private people, nothing gory. Keep it TikTok-safe: dread and twists, not violence.
- Vary settings: don't post two stories about the same kind of device or place in the same week.

## Making a story

```
pipeline/new_story.sh <slug> "<Title line 1>" "<italic line 2 or ''>" "<TOP-LEFT META>" "<end line>" "<end question with <i>…</i>>"
# write stories/<slug>/script.py (lines + scene tags), adjust voices.json
pipeline/make.sh <slug> voice      # Kokoro narration -> timeline.json (also copied to www/)
# write www/art.js (places/things) and www/scenes.js (one function per scene tag)
pipeline/make.sh <slug> stills "0.3,5,12,20,30,40,50,60,70,80" 5   # -> stories/<slug>/grid.jpg
# LOOK at grid.jpg with Read. Fix anything wrong, re-run stills.
# edit audio.py (bed + effects timed to lines)
pipeline/make.sh <slug> audio
pipeline/make.sh <slug> video      # ~15–25 min for 90 s; writes videos/<slug>.mp4
node pipeline/cover.js stories/<slug>/www <t> covers/<slug>-cover.jpg '<one-line hook, key word in <i>…</i>>'
```

- **script.py**: `SCRIPT = [(scene_tag, caption, voice_tag), ...]`.
  - `*word*` shows as orange italic emphasis on screen and is spoken normally.
  - Scene tags must exactly match function names in `scenes.js` and keys in `SCENES`/`FADES`.
  - Lines with the same tag in a row share one scene.
- **voices.json**:
  - `n` is the narrator. The owner picked **`af_bella` (speed 0.95) and `am_onyx` (speed 0.9)**: alternate them story to story (check the last story's voices.json). Don't use `af_heart` for new stories.
  - `_say` maps on-screen text to spoken text (e.g. `"1961": "nineteen sixty-one"`).
  - `_gaps` adds extra seconds of silence *before* a line index (e.g. `{"12": 0.8}`) for dramatic pauses.
  - `_tail` is the seconds after the last line (default 4.4) for the end card.
  - Other voices for characters: `af_nicole` (whisper), `am_michael` (calm official), `bm_george` (old man), `am_onyx` with `"fx":"found"` and speed ~0.62 (a deep inhuman voice, used for the house in 100 Years Old).
  - Effects: `fx` = `radio`, `space`, `calm`, `close`, `girl`, `found`, `mic` (see `pipeline/refit.py`).
- **Look**:
  - Vertical 1080×1920 page: title on top, a 16:9 picture band in the middle (1920×1080 world coordinates), karaoke captions underneath.
  - Dark palette, the main character is the orange-haired figure `YOU(...)`.
  - Helpers live in `pipeline/engine.js`: `wl`, `fillRR`, `circ`, `ell`, `line`, `poly`, `glow`, `text`, `person`, `YOU`, `PAL`, `rng`, `hash`, `lerp`, `ss`, `seg`, `clamp`.
  - The stories in `stories/` are complete, posted-quality examples. The newest (green-light, now-boarding, hundred-years, restart-required, lost-and-found) use the current pipeline, `sound.py` and `make.sh`; copy their patterns:
    - app/phone UI and maps (`now-boarding/www/art.js`), giant sky UI and cursor (`restart-required`), top-down object layouts (`lost-and-found`), painted-scroll yokai and a talking wall (`hundred-years`), road/garage and windshield views (`green-light`)
    - camera overlays and night-vision pixel processing (`person-detected/www/cam.js`, `steps/www/bed.js`)
    - creature poses (`mimic/www/octo.js`)
    - rotated windows and old photos (`witch-window/www/farm.js`)
  - Their `audio.py` files use old absolute paths; new stories use `pipeline/sound.py` via the template.
- **Quality checks before the full render** (every one, every time):
  - The stills grid: nothing cut off, no text overlapping, the creature/twist visible, every scene different and readable at phone size.
  - Night scenes not pure black; the cold-open frame (t≈0.3) is striking.
  - The timeline total is 60–95 s.
  - After the render, `ffprobe` the mp4: 1080×1920, h264+aac, the expected duration.
  - Grab 5 frames with ffmpeg and look at them.
- Only one render at a time (2 CPU cores). Run long renders in the background (`run_in_background`, they can take 25 min) and keep working meanwhile. Use `ffmpeg -nostdin` and `< /dev/null` in loops.

## Scheduling with Metricool

`createScheduledPost` with `blogId` `7672487`, `date` like `2026-11-08T18:00:00-05:00` (EST from Nov 1, EDT −04:00 from March), and `info`:

```json
{"autoPublish":true,"draft":false,"descendants":[],"firstCommentText":"","hasNotReadNotes":false,
 "media":["https://raw.githubusercontent.com/settingsreality/reality-stories/main/videos/<slug>.mp4"],
 "videoThumbnailUrl":"https://raw.githubusercontent.com/settingsreality/reality-stories/main/covers/<slug>-cover.jpg",
 "mediaAltText":[],"providers":[{"network":"tiktok"},{"network":"instagram"}],
 "publicationDate":{"dateTime":"2026-11-08T18:00:00","timezone":"America/New_York"},
 "shortener":false,"smartLinkData":{"ids":[]},
 "text":"<caption: 1–2 hook sentences + a question> #scarystories #horrortok #<topic> #<topic> #fyp",
 "instagramData":{"type":"REEL","showReelOnFeed":true,"isAiGenerated":true},
 "tiktokData":{"privacyOption":"PUBLIC_TO_EVERYONE","title":"<Title>","isAigc":true,"disableComment":false,"disableDuet":false,"disableStitch":false,"autoAddMusic":false}}
```

- Push the video and cover to GitHub **before** scheduling; Metricool copies the files when the post is created.
- The response shows `static.metricool.com` media URLs. If it errors, wait a minute (the raw URL can lag after a push) and retry once.
- Keep the AI labels on (`isAiGenerated`, `isAigc`): the owner wants them.
- Never schedule the same slug twice. Check `ops/schedule.md` and `getScheduledPosts`.
- Don't touch posts already scheduled unless one is clearly broken.

## Rules

- Series parts go on **consecutive days in the same slot**, in order.
- Never post the poll stories automatically (2.7 Seconds, The Third Man). The owner posts those by hand with a TikTok poll.
- `Glitch 01` is already on Instagram (TikTok only).
- The owner already posted elsewhere: "the atmosphere disappears", "falling into a black hole", "something changed my reality settings" (= Glitch 01 on IG). Don't remake those.
- There is an extra 12:00 slot during Oct 27 to Nov 2 for a one-off batch; ignore it and keep using 10:00/18:00.
- Don't make 3D physics sims on autopilot (Three.js renders take 45+ min). Stories only.
- Keep `ops/ideas.md` honest: Done list, skip list (already done by others), and the idea bank.
