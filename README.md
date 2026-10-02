# Shark ScrollWorld

A wordless, scroll-driven watercolor journey from a sunlit reef into the deep ocean. Visitors put on a diving mask, meet sharks as the water grows darker, and discover a megalodon fossil that sparks a brief ancient vision.

This repository contains the first interactive vertical slice: a reversible diving-mask intro that crosses the waterline and reveals a blacktip reef shark, followed by a scroll-controlled video transition to whale sharks. Open `index.html` in a browser and scroll down or back up to preview it. The remaining shark encounters are currently storyboard frames in [`docs/storyboard.md`](docs/storyboard.md).

The three files to read are `index.html` (scene layers and links), `css/style.css` (their appearance), and `js/app.js` (scroll timing, animation frames, and optional sound). The HTML loads the CSS in `<head>` and loads the JavaScript after the scene markup. Image and media files live in `assets/`. For a local preview, run `python3 -m http.server 8765` here and open `http://localhost:8765/`.

The preview uses GSAP ScrollTrigger when its CDN scripts are available and falls back to native scroll progress when offline. It respects reduced-motion preferences by showing three still views. The first animation's JPEG frames follow scroll position in either direction; its source MP4 is kept in `assets/video/` for reference. The top-right sound button starts or stops separate splash, underwater ambience, and shark-glide effects. Sound begins only after the visitor presses it.

## Story order

Diving mask → blacktip reef shark → whale sharks → hammerheads → great white → sixgill → megalodon fossil and vision → suspense → quiet return.

The sharks and ocean share one hand-painted watercolor style. The opening mask carries the words “lets dive!”; the underwater story has no on-screen narration. The megalodon is an ancient vision, not a living shark in the present-day ocean.

## Current status

- Interactive intro, a first 12-second frame-matched blacktip-to-whale-shark video test, three sound effects, and selected visual storyboard frames are in this repository.
- The video is an early production test. Review its handoff during slow, fast, and reverse scrolling before producing later shark scenes.
- Prompt-production references and continuity rules are recorded in [`docs/production-notes.md`](docs/production-notes.md).
- A live site URL will be added here after deployment.

Visual prompts and intro decisions are recorded in [`docs/intro-art-prompts.md`](docs/intro-art-prompts.md). The illustrations were created with Codex's built-in image generation tool. The first video and sound effects were generated with Magnific.
