# Shark ScrollWorld

A wordless, scroll-driven watercolor journey from a sunlit reef into the deep ocean. Visitors put on a diving mask, meet sharks as the water grows darker, and discover a megalodon fossil that sparks a brief ancient vision.

This repository contains the first interactive vertical slice: a reversible diving-mask intro that crosses the waterline and reveals a blacktip reef shark. Open `index.html` in a browser and scroll down or back up to preview it. The remaining shark encounters are currently storyboard frames in [`docs/storyboard.md`](docs/storyboard.md).

The preview uses GSAP ScrollTrigger when its CDN scripts are available and falls back to native scroll progress when offline. It respects reduced-motion preferences by showing the opening and blacktip as two still views.

## Story order

Diving mask → blacktip reef shark → whale sharks → hammerheads → great white → sixgill → megalodon fossil and vision → suspense → quiet return.

The sharks and ocean share one hand-painted watercolor style. The opening mask carries the words “lets dive!”; the underwater story has no on-screen narration. The megalodon is an ancient vision, not a living shark in the present-day ocean.

## Current status

- Interactive intro and selected visual storyboard frames are in this repository.
- The scroll-controlled shark animation and exact frame-matched media transitions are the next production step.
- A live site URL will be added here after deployment.

Visual prompts and intro decisions are recorded in [`docs/intro-art-prompts.md`](docs/intro-art-prompts.md). The illustrations were created with Codex's built-in image generation tool.
