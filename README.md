# Shark ScrollWorld

A mostly wordless, scroll-driven watercolor journey from a sunlit reef into the deep ocean. Visitors put on a diving mask, meet sharks as the water grows darker, and discover a megalodon fossil that sparks a brief ancient vision.

This repository contains a reversible scroll journey through the complete planned story: the diving-mask intro, a blacktip swimming across the reef, animated transitions to whale sharks and a hammerhead, then the great white, sixgill, megalodon fossil, ancient vision, and quiet return. Open `index.html` in a browser and scroll down or back up to preview it. The user's hammerhead-to-great-white and great-white-to-sixgill videos carry the middle of the journey; a Seedance continuation follows the sixgill from above as it swims past the fossil tooth. [`docs/storyboard.md`](docs/storyboard.md) records the intended shots.

The four files to read are `index.html` (scene layers and page chrome), `css/style.css` (their appearance), `js/app.js` (scroll timing, animation frames, and optional sound), and `js/site.js` (the entry gate, chapter links, depth gauge, and back-to-surface button). The HTML loads the CSS in `<head>` and loads the JavaScript after the scene markup. Image and media files live in `assets/`. For a local preview, open `index.html` directly or use the VS Code Live Server extension (no Python or build step is needed).

The preview uses GSAP ScrollTrigger when its CDN scripts are available and falls back to native scroll progress when offline. A short scroll glide and eased watercolor dissolves smooth both directions. It respects reduced-motion preferences by showing three still views. The animation clips use JPEG frames painted onto a canvas that follows scroll position in either direction, so scrolling back does not flash or glitch; their source MP4s are kept in `assets/video/` for reference. The top-right sound button starts or stops separate splash, underwater ambience, deep-water ambience, shark-glide, megalodon lunge, and ink impact effects. Sound begins only after the visitor presses it.

## Website feel

The page opens on an entry gate instead of dropping straight into the scene: a frosted pane over the painted surface with the title âLet’s Diveâ, a short line (âSix sharks. One breath.â), rising bubbles, a loading bar (âFilling your tank…â) and two choices, âDive in with soundâ or âDive in quietlyâ. The choice also answers the sound opt-in, so the visitor never has to find the speaker button. Once inside, a header carries the wordmark and chapter links (Surface, Reef, Open water, The deep, The ancient, Fin) that jump to that point of the journey and highlight the current chapter, and a depth gauge down the right edge shows a live âstory depthâ (0 m at the surface to 4,000 m at the end; these depths are for the story, not measurements). After âfinâ, a closing section says thank you, has a âBack to the surfaceâ button, and credits the tools. The gate never traps a visitor: it opens anyway after 12 seconds, or right away when reduced motion is on.

## Story order

Diving mask and dive â blacktip reef shark â whale sharks â hammerheads â great white (including its feeding among the fish) â top-view sixgill â fossil tooth â megalodon mouth â the fossil pulls back as a giant shape passes â fin.

The opening is hand-painted watercolor; the deep-water shots and the ending are dark and cinematic. Each shark gets a short magical caption as it appears. The opening mask carries âlets dive!â and the ending says âfinâ in a cinematic title with scope bars and film grain; there is no narration. The megalodon is an ancient vision, not a living shark in the present-day ocean. The fossil in the vision is the exact frame held at the end of the sixgill shot. It lingers in near silence before the water goes black and the mouth lunges forward in a short scroll interval; afterwards the camera pulls back from the same fossil while a colossal silhouette glides past and the screen fades to black.

## Current status

- The full story is navigable and fully animated: an intro dive from the surface into the reef, the user-supplied blacktip reef animation, two 12-second transition tests, the user-supplied hammerhead-to-great-white and great-white-to-sixgill animations (the great white feeding was restyled to match the hammerhead and great white), a Seedance seabed continuation, a photographic megalodon jumpscare and pull-back that start on the sixgill shot's fossil frame, shark captions, and five sound effects. Water darkens, particles thin, and the ambience quiets around the ancient vision.
- The video and deeper scenes are production tests. Review pacing and transitions during slow, fast, and reverse scrolling before producing frame-matched animation for the deeper sharks.
- Prompt-production references and continuity rules are recorded in [`docs/production-notes.md`](docs/production-notes.md).
- A live site URL will be added here after deployment.

Visual prompts and intro decisions are recorded in [`docs/intro-art-prompts.md`](docs/intro-art-prompts.md). The illustrations were created with Codex's built-in image generation tool. The first two video tests and sound effects were generated with Magnific; the blacktip reef and hammerhead-to-great-white animations were supplied by the user.

## Change log

- **Latest:** an entry gate, header with chapter links, live depth gauge, closing section with credits and a back-to-surface button (new `js/site.js`); intro dive video replaces the zooming stills; the great white feeding is visible again with its own scroll time and a restyled, smoother look; the megalodon ending is rebuilt in the same dark photographic look as the sixgill shot's fossil tooth; each shark has a magical caption; "fin" is a cinematic title card; video frames are drawn on a canvas so scrolling back cannot glitch. Details and file names are in [`docs/production-notes.md`](docs/production-notes.md).

## Working in this folder

If the project lives in a folder that iCloud Desktop sync watches, macOS can create duplicate conflict copies of the many frame files (for example `frame-001 2.jpg`). They are identical copies and are not used by the page. `.gitignore` keeps them out of commits, and they are safe to delete. Keeping the project outside the Desktop and Documents folders avoids them completely.
