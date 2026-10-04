# Shark ScrollWorld

A mostly wordless, scroll-driven watercolor journey from a sunlit reef into the deep ocean. Visitors put on a diving mask, meet sharks as the water grows darker, and discover a megalodon fossil that sparks a brief ancient vision.

This repository contains a reversible scroll journey through the complete planned story: the diving-mask intro, a blacktip swimming across the reef, animated transitions to whale sharks and a hammerhead, then the great white, sixgill, megalodon fossil, ancient vision, and quiet return. Open `index.html` in a browser and scroll down or back up to preview it. The user's hammerhead-to-great-white and great-white-to-sixgill videos carry the middle of the journey; a Seedance continuation follows the sixgill from above as it swims past the fossil tooth. [`docs/storyboard.md`](docs/storyboard.md) records the intended shots.

The three files to read are `index.html` (scene layers and links), `css/style.css` (their appearance), and `js/app.js` (scroll timing, animation frames, and optional sound). The HTML loads the CSS in `<head>` and loads the JavaScript after the scene markup. Image and media files live in `assets/`. For a local preview, open `index.html` directly or use the VS Code Live Server extension (no Python or build step is needed).

The preview uses GSAP ScrollTrigger when its CDN scripts are available and falls back to native scroll progress when offline. A short scroll glide and eased watercolor dissolves smooth both directions. It respects reduced-motion preferences by showing three still views. The animation clips use JPEG frames painted onto a canvas that follows scroll position in either direction, so scrolling back does not flash or glitch; their source MP4s are kept in `assets/video/` for reference. The top-right sound button starts or stops separate splash, underwater ambience, deep-water ambience, shark-glide, megalodon lunge, and ink impact effects. Sound begins only after the visitor presses it.

## Story order

Diving mask and dive → blacktip reef shark → whale sharks → hammerheads → great white (including its feeding among the fish) → top-view sixgill → fossil tooth → megalodon mouth → the fossil pulls back as a giant shape passes → fin.

The opening is hand-painted watercolor; the deep-water shots and the ending are dark and cinematic. Each shark gets a short magical caption as it appears. The opening mask carries “lets dive!” and the ending says “fin” in a cinematic title with scope bars and film grain; there is no narration. The megalodon is an ancient vision, not a living shark in the present-day ocean. The fossil in the vision is the exact frame held at the end of the sixgill shot. It lingers in near silence before the water goes black and the mouth lunges forward in a short scroll interval; afterwards the camera pulls back from the same fossil while a colossal silhouette glides past and the screen fades to black.

## Current status

- The full story is navigable and fully animated: an intro dive from the surface into the reef, the user-supplied blacktip reef animation, two 12-second transition tests, the user-supplied hammerhead-to-great-white and great-white-to-sixgill animations (the great white feeding was restyled to match the hammerhead and great white), a Seedance seabed continuation, a photographic megalodon jumpscare and pull-back that start on the sixgill shot's fossil frame, shark captions, and five sound effects. Water darkens, particles thin, and the ambience quiets around the ancient vision.
- The video and deeper scenes are production tests. Review pacing and transitions during slow, fast, and reverse scrolling before producing frame-matched animation for the deeper sharks.
- Prompt-production references and continuity rules are recorded in [`docs/production-notes.md`](docs/production-notes.md).
- A live site URL will be added here after deployment.

Visual prompts and intro decisions are recorded in [`docs/intro-art-prompts.md`](docs/intro-art-prompts.md). The illustrations were created with Codex's built-in image generation tool. The first two video tests and sound effects were generated with Magnific; the blacktip reef and hammerhead-to-great-white animations were supplied by the user.

## Change log

- **Latest:** intro dive video replaces the zooming stills; the great white feeding is visible again with its own scroll time and a restyled, smoother look; the megalodon ending is rebuilt in the same dark photographic look as the sixgill shot's fossil tooth; each shark has a magical caption; "fin" is a cinematic title card; video frames are drawn on a canvas so scrolling back cannot glitch. Details and file names are in [`docs/production-notes.md`](docs/production-notes.md).
