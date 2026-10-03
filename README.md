# Shark ScrollWorld

A wordless, scroll-driven watercolor journey from a sunlit reef into the deep ocean. Visitors put on a diving mask, meet sharks as the water grows darker, and discover a megalodon fossil that sparks a brief ancient vision.

This repository contains a reversible scroll journey through the complete planned story: the diving-mask intro, a blacktip swimming across the reef, animated transitions to whale sharks and a hammerhead, then the great white, sixgill, megalodon fossil, ancient vision, suspense, and quiet return. Open `index.html` in a browser and scroll down or back up to preview it. The user's hammerhead-to-great-white video now carries the middle of the journey; the scenes after the great white use eased, drifting storyboard keyframes. [`docs/storyboard.md`](docs/storyboard.md) records the intended shots.

The three files to read are `index.html` (scene layers and links), `css/style.css` (their appearance), and `js/app.js` (scroll timing, animation frames, and optional sound). The HTML loads the CSS in `<head>` and loads the JavaScript after the scene markup. Image and media files live in `assets/`. For a local preview, run `python3 -m http.server 8765` here and open `http://localhost:8765/`.

The preview uses GSAP ScrollTrigger when its CDN scripts are available and falls back to native scroll progress when offline. A short scroll glide and eased watercolor dissolves smooth both directions. It respects reduced-motion preferences by showing three still views. The animation clips use JPEG frames that follow scroll position in either direction; their source MP4s are kept in `assets/video/` for reference. The top-right sound button starts or stops separate splash, underwater ambience, deep-water ambience, shark-glide, and megalodon impact effects. Sound begins only after the visitor presses it.

## Story order

Diving mask → blacktip reef shark → whale sharks → hammerheads → great white → sixgill → megalodon fossil and vision → suspense → quiet return.

The sharks and ocean share one hand-painted watercolor style. The opening mask carries the words “lets dive!”; the underwater story has no on-screen narration. The megalodon is an ancient vision, not a living shark in the present-day ocean.

## Current status

- The full story is navigable, with the user-supplied blacktip reef animation, two 12-second transition tests, the user-supplied hammerhead-to-great-white animation, five sound effects, and moving storyboard keyframes for the remaining scenes. Water darkens, particles thin, and the ambience quiets around the ancient vision.
- The video and deeper scenes are production tests. Review pacing and transitions during slow, fast, and reverse scrolling before producing frame-matched animation for the deeper sharks.
- Prompt-production references and continuity rules are recorded in [`docs/production-notes.md`](docs/production-notes.md).
- A live site URL will be added here after deployment.

Visual prompts and intro decisions are recorded in [`docs/intro-art-prompts.md`](docs/intro-art-prompts.md). The illustrations were created with Codex's built-in image generation tool. The first two video tests and sound effects were generated with Magnific; the blacktip reef and hammerhead-to-great-white animations were supplied by the user.
