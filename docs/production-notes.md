# Production notes for shark video tests

The professor's [Seedance 2.5 announcement](https://thomasmore.instructure.com/courses/52456/discussion_topics/599326) shares examples, not required installations. Keep the source files as references rather than copying their instructions into this project.

- [TOURCUT](https://thomasmore.instructure.com/courses/52456/files/13864349?wrap=1): borrow its explicit camera route, reference-image binding, and clip handoff checks. The property-tour content and pacing do not apply.
- [COOKCUT](https://thomasmore.instructure.com/courses/52456/files/13864351?wrap=1): borrow its per-beat camera direction and transition planning. Its rapid commercial rhythm does not fit the calm opening, though its contrast between quiet and impact may help the megalodon vision.
- [Animation Style Prompts Guide Vol 1](https://thomasmore.instructure.com/courses/52456/files/13864350?wrap=1): borrow the style-prompt structure: medium, texture, colour, lighting, motion, camera, and exclusions. Write a project-specific watercolor style lock from the approved moodboard rather than pasting one of the 33 presets.

## First video test: blacktip to whale sharks

1. Fix the first and last frames before generating movement. The opening frame is the approved bright blacktip reef. The destination is the top-view whale-shark painting, with three spotted backs seen from above. The older underside painting can guide the initial approach.
2. Keep both scenes in the same painted-watercolor world. Preserve brush texture, shark anatomy, light direction, and the underwater viewpoint. Do not introduce a photoreal shark or a separate illustrated backdrop.
3. The blacktip leaves the reef. The camera follows briefly, then tilts and rises toward the surface. Passing water and bubbles hide the handoff. Whale sharks appear below as the camera arcs above them; they glide slowly enough to appreciate their scale.
4. Test one short clip or transition at low cost first. Check slow scrolling, fast scrolling, and reverse scrolling in the website before generating the rest of the story.
5. Record the chosen source frame, destination frame, prompt, model/settings, output file, and what failed or worked. Keep generated video separate from storyboard stills.

The first test is now in `assets/video/blacktip-to-whales-test-v1.mp4`: Seedance 2.5, 12 seconds, 16:9, 720p, start/end image keyframes. The website scrolls through 120 JPEG frames exported from that clip in `assets/video/blacktip-to-whales-frames/`; direct MP4 seeking was unreliable in the in-app browser. The source images are `assets/shark-scrollworld-style-frame-v1.png` and `assets/storyboard/shark-storyboard-whale-sharks-top-v3.png`. Its watercolor water wash covers the handoff, and the final frames show three whale sharks from above. This preview is still a production test, so inspect slow, fast, and reverse scrolling before choosing it as a final shot.

The second test is `assets/video/whales-to-hammerhead-test-v1.mp4`: the same Seedance 2.5 settings, with the top-view whale-shark painting and cobalt hammerhead painting as keyframes. The website scrolls through its 120 JPEG frames in `assets/video/whales-to-hammerhead-frames/`. The whale sharks leave above the camera, water darkens during the descent, and a separate hammerhead approaches. The shot joins the first sequence at the whale-shark view and the deeper storyboard at the hammerhead view.

Separate Magnific sound effects are in `assets/audio/`: `splash-entry.mp3`, `underwater-ambience.mp3`, `shark-glide.mp3`, `megalodon-lunge.mp3`, and `deep-ink-impact.mp3`. The visitor must turn sound on with the top-right button. Ambient sound loops under the water; it nearly disappears while the fossil darkens. The lunge hits with the sudden mouth reveal, followed by the ink impact. No music or dialogue is used.

The hammerhead-to-great-white passage uses the user's 23-second animation after the existing whale-shark-to-hammerhead entrance. The old local belly-eye-body reveal remains underneath as a fallback. The sixgill entrance and seabed passage are now animated in the later sequence described below.

The local preview eases scroll input over about 105 ms and uses watercolor dissolves. The deeper frames drift gently as the viewer scrolls, with a gradually darkening wash, sparse moving particles, and an eerie deep-water ambience that crossfades from the brighter underwater loop. Motion remains reversible, and the reduced-motion view uses stills. The megalodon mouth remains a storyboard painting; the tooth and return are a held frame from the sixgill video.

The blacktip entrance now uses the user-supplied 10-second reef animation, archived as `assets/video/blacktip-reef-user-v1.mp4` and exported to 121 JPEG frames in `assets/video/blacktip-reef-user-frames/`. It starts as the dive splash clears, then the shark swims past and recedes into open water. This replaces the earlier cutout and tail animation. Frame images keep forward and reverse scrolling responsive; the MP4 is a compact source reference.

The original blacktip-to-whales test still provides the upward water and whale-shark reveal, but its first blacktip frames are skipped. At the handoff, the new reef shot looks upward, a brief watercolor light wash obscures the different camera angles, and the older sequence begins where the shark is almost gone. Review this join slowly and in reverse on desktop and mobile before calling the edit final.

The new hammerhead-to-great-white source is archived as `assets/video/hammerhead-to-great-white-user-v1.mp4`, with 277 JPEG frames in `assets/video/hammerhead-to-great-white-user-frames/`. The existing hammerhead entrance runs to its final close-up. The new shot begins from nearly the same pose, lets the hammerhead approach closely, darkens the water, and reveals the great white. Its last frame is close to the approved great-white painting, allowing the following sixgill transition to retain the storyboard bridge. The video's original audio is omitted; the site's opt-in ambient sound continues.

The sixgill entrance uses the user's `after-the-great-white-sha_r0953531 (1).mov`, archived locally as `assets/video/great-white-to-sixgill-user-v1.mp4`. It begins amid a school of fish after the great white and reveals the sixgill in nearly black water. Magnific's Seedance 2.5 extension turns the camera into a top-down view while the sixgill continues swimming above the seabed and passes the fossil. The website exports both shots as one reversible image sequence in `assets/video/great-white-to-sixgill-seabed-frames/`. A dark water veil covers the handoff from the previous great-white shot. The camera then zooms into the held fossil frame, the megalodon mouth rushes forward, and the view reverses out of the same fossil to the quiet seabed and “fin.” The original video audio is omitted so the existing opt-in soundscape stays consistent.

The selected source clip is `assets/video/great-white-to-sixgill-topdown-v4.mp4` (40 seconds, with 481 scroll frames). The full shot now holds long enough for the sixgill to leave the frame. Magnific extracted its final frame as `assets/storyboard/shark-storyboard-megalodon-matched-tooth-v2.jpg`. That exact image is used for the push-in, the reverse zoom after the mouth vision, and the reduced-motion ending, preserving the fossil's curved ivory crown, striations, and dark root. The previous triangular tooth painting remains in the repository as a planning reference.

The scare avoids a gradual preview of the mouth. The fossil zoom ends and briefly holds; an almost black water veil hides the image while the ambience falls quiet. The mouth then fills the viewport in a very short scroll range and rushes closer, with a separate Magnific-generated underwater lunge sound. The ink covers the close and the camera reverses out to the same fossil. This beat is scroll-driven in both directions; sound remains opt-in and the reduced-motion view shows only the calm still image.


## Final pass: intro dive, great white feeding, megalodon ending, captions, and scroll fixes

Everything below was added after the earlier notes. The ending clips use Seedance 2.5 and the feeding restyle uses Magnific's Modify video. Sound was turned off in every generated clip so the site's own opt-in sound stays in control.

### Stills replaced with motion

- **Intro dive.** The first stretch of the page used still paintings that only zoomed (surface, waterline, empty reef) before cutting to the blacktip video. `assets/video/intro-dive-10s-v1.mp4` (Seedance 2.5, 16:9, 720p, 10 s) now runs from `shark-intro-ocean-surface-v1.png` to `shark-intro-empty-reef-v1.png`, exported to 241 frames in `assets/video/intro-dive-frames/`. It plays behind the mask, so the mask, droplets, and "lets dive!" stay as they were. The stills remain underneath as a fallback until the frames load.
- **Return after the vision.** The old zoomed still of the fossil is gone. `assets/video/return-fossil-10s-v1.mp4` starts on the exact fossil frame (`shark-storyboard-megalodon-matched-tooth-v2.jpg`), pulls back and rises, lets a colossal megalodon silhouette glide past in the dark, then fades to black. Frames are in `assets/video/return-fossil-frames/`.

### Megalodon vision (ending look)

- The ending must match the first fossil tooth seen in the sixgill shot: dark, cold, desaturated, and photographic. A painted-watercolor ending was tried and rejected for that reason, and its files were removed.
- `assets/video/megalodon-jumpscare-photo-v4.mp4` (Seedance 2.5, 2:1, 10 s) starts on the same fossil frame. The fossil holds to about 4.8 s, the water goes pitch black from about 5 s to 7.2 s, then fossil-toothed jaws with charcoal skin and muted gums burst out and fill the frame. Frames are in `assets/video/megalodon-jumpscare-frames/` (frame 172 is where the jaws first appear).
- `LUNGE_AT` in `js/app.js` is the scroll point of that frame. The lunge sound, the dark veil, and the clip frames are all keyed to it. If the clip is ever replaced, retime `LUNGE_AT` and the `clipProgress` frame numbers in `renderFinale`.
- The sixgill video's last frame is the first frame of this clip, so the handoff is a plain short crossfade.

### Great white feeding

- The great white feeding among the school of fish is the first seconds of `great-white-to-sixgill-seabed-frames` (frames 1 to about 72). It was nearly invisible: it had very little scroll and a heavy black ink veil covered the handoff.
- It now gets about 60vh of scroll, and the empty dark water after it is crossed quickly (`sixgillFrame` in `renderJourney`). The handoff into it is the bridge clip below, so there is no veil or crossfade at that point any more.
- Style: the original feeding clip was dark and gritty next to the smooth, bright hammerhead and great-white clips. The first 6 seconds of `assets/video/great-white-to-sixgill-user-v1.mp4` were restyled in Magnific Modify video (MiniMax H3, 2K, 6.6 s) with a prompt asking for the smooth stylized cobalt-blue look and neutral gums, keeping all motion. The result replaces seabed frames 1 to 72 at 12 fps, retimed to 6 s. Frames 65 to 72 fade into the original dark water so the shark leaves cleanly. The original frames remain in git history.
- The restyled source is not stored in the repo. Only the blended frames are.

### Shark captions

- Each shark has a magical caption: a shimmering gradient name with a twinkling star and a short line. They fade and blur in as the shark appears and dissolve as it leaves. Windows are in `captionWindows` in `js/app.js` (journey progress, except the megalodon, which uses the ending tail).
- Blacktip Reef Shark, guardian of the sunlit shallows. Whale Shark, gentle giant, freckled like a night sky. Hammerhead, the dreamer who sees the whole sea at once. Great White, hunger of the cold blue, quick as a shadow. Sixgill Shark, a drifter from the twilight deep. Megalodon, the ancient one, still whispering in the dark.

### "fin"

- The title is a large, wide-tracked serif (Cormorant Garamond, with Times and Georgia as fallbacks) that fades in from blur with a drawn line beneath it. Scope letterbox bars slide in during the pull-back and subtle film grain rises. The title sits on pure black, so the return layer stays opaque and the clip's last frame is black.

### Scroll, glitch, and performance fixes

- **Journey length.** The page is 2000vh. Everything before the ending keeps its original pixel pacing (`RATE` in `js/app.js`), and the added scroll plays the return clip and "fin" (`tail`).
- **Scroll-back glitch.** Frame sequences used to swap an `<img>` source on every scroll step, which can flash blank or show a stale frame, especially when scrolling back over frames the browser has dropped from memory. `setupFrameSequence` now paints frames onto a canvas, keeps the nearest loaded frame on screen if one is not ready, and never goes blank. Forward and reverse scrolling were compared at 21 points across all video layers and rendered identically.
- **Reduced motion.** Unchanged: the page shows still views, and the final view still uses `shark-storyboard-megalodon-matched-tooth-v2.jpg`.

### Local preview

- Open `index.html` directly, or use the VS Code Live Server extension. No Python or build step is needed.

## Website entry experience (landing, header, depth gauge, closing section)

The journey used to start cold: the page opened straight onto the mask. A website layer now frames it. It lives in `js/site.js` and the "Website chrome" block at the end of `css/style.css`, and is wired into `index.html`.

- **Entry gate.** A full-screen frosted pane (`.entry-gate`) over the painted surface scene, with the title in the same shimmering italic serif as the shark captions, one line of copy, rising bubbles, a loading bar and two buttons: "Dive in with sound" and "Dive in quietly". Page scroll is locked and the header and journey are `inert` until the visitor chooses. "With sound" clicks the existing sound button, so audio starts from a real user gesture.
- **Loading.** `js/app.js` counts the frames of the two intro sequences (the dive and the blacktip, marked `priority` in `setupFrameSequence`, and created first so they load first) and sends `journey:frames` events. The gate opens its buttons when 80% are ready. A 12 second fallback, or 0.6 seconds with reduced motion, opens it anyway.
- **Header.** A wordmark (scrolls to the top) and chapter links with `data-p` values. `data-p` is journey progress (the same scale as `captionWindows`); `2` means the very end. The active chapter follows the scroll. Below 760px the links are hidden and only the wordmark shows. A soft dark fade behind the header keeps it readable over the bright surface.
- **Depth gauge.** `depthStops` in `js/site.js` maps journey progress to a story depth (0 m, 8 m at the reef, 40 m with the whale sharks, 300 m at the great white, 1,000 m at the fossil, then down to 4,000 m during the pull-back). The marker uses a square-root scale so the shallow part is not squashed.
- **Closing section.** `.site-end` follows the journey on black: "Thank you for diving.", a "Back to the surface" button (instant jump to the top, then the normal glide), and a credit line. The credit line states the tools (HTML, CSS, JavaScript, GSAP ScrollTrigger, Magnific, Codex) and that some clips were supplied by the project creator. Edit it in `index.html` to name people.
- **Hooks between the files.** `js/app.js` exposes `window.sharkJourney = { rate, tailStart, frameStats }` and fires `journey:progress` (`{ progress, tail }`) on every render and `journey:frames` while priority frames load. `js/site.js` only reads them, so the journey code can change without touching the website layer.
- **Page details.** The mask's "lets dive!" is now a `<p>` because the gate owns the single `<h1>`. The tab title is "Let's Dive — a scroll-told shark story", with a meta description, a theme color, and a shark emoji favicon. A Jost font was added for small labels and buttons, next to Cormorant Garamond.

### Duplicate files from iCloud sync

The project folder sits inside the Desktop, which has iCloud Desktop sync turned on. Syncing hundreds of frame files while they were being rewritten made macOS create identical conflict copies named like `frame-001 2.jpg` and `frame-001 3.jpg`. Some of them were committed once by accident and were removed in the commit "Remove stray duplicate frame files". `.gitignore` now ignores any file ending in a space, a digit and an extension, so they cannot be committed again.

### Great white bridge (no more double exposure)

- **Problem.** The great white clip ended on a side view of the shark, and the feeding clip began with a head-on shark inside a school of fish. Crossfading the two put two different sharks on screen at once, a ghostly double exposure that was obvious however short it was.
- **Fix.** `assets/video/great-white-bridge-v1.mp4` (Seedance 2.5, 16:9, 720p, 6 s, sound off) starts on the exact last frame of the hammerhead-to-great-white clip and ends on the first frame of the feeding scene. Prompt summary: one continuous underwater shot in the smooth stylized look; the great white glides forward through dark navy water, then slowly turns toward the camera; the water brightens to cobalt as a swarm of silver fish streams in from all sides; it ends head-on, mouth slightly open, in the middle of the swirling school; a single shark throughout, no cuts.
- **Frames.** Bridge frames 2 to 73 (frame 1 repeats the last frame of the old clip) were exported at 12 fps and 960x540 as frames 278 to 349 of `assets/video/hammerhead-to-great-white-user-frames/`, so that sequence now has 349 frames. The ends were checked against their neighbours and match.
- **Timing (`renderJourney` in `js/app.js`).** Frames 1 to 277 still run over journey progress .55 to .81. The bridge (frames 278 to 349) runs over .81 to .84. The feeding scene then starts at .84, so its seabed frames 0 to 70 run over .840 to .874, the empty dark water over .874 to .887, and the rest over .887 to .938 (about 20% faster than before to make room). The two stages swap with a very short fade (.836 to .846) between almost identical frames. The glide sound that used to play at .82 now plays at .84. The Great White caption window is .745 to .890 and the Sixgill caption is .893 to .938.
- **If a clip changes.** Keep the ends matching their neighbours (last frame of the great white clip, first frame of the feeding scene) and retime the numbers above.
