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

Separate Magnific sound effects are in `assets/audio/`: `splash-entry.mp3`, `underwater-ambience.mp3`, `shark-glide.mp3`, and `deep-ink-impact.mp3`. The visitor must turn sound on with the top-right button. Ambient sound loops under the water; splash, glides, and the megalodon vision impact play at their scene boundaries. No music or dialogue is used.

The hammerhead-to-great-white passage now uses the user's 23-second animation after the existing whale-shark-to-hammerhead entrance. The old local belly-eye-body reveal remains underneath as a fallback and a brief bridge to the sixgill scene. The sixgill and seabed scenes remain moving, crossfading keyframes. Produce the great-white-to-sixgill and deep-seabed shots as matching animations after reviewing the full scroll journey.

The local preview now eases scroll input over about 105 ms and uses smooth watercolor dissolves. The deeper frames drift gently as the viewer scrolls, with a gradually darkening wash, sparse moving particles, and an eerie deep-water ambience that crossfades from the brighter underwater loop. Motion remains reversible, and the reduced-motion view uses stills. The sixgill, tooth, and ancient vision are still storyboard paintings; generated frame-matched video remains future production work.

The blacktip entrance now uses the user-supplied 10-second reef animation, archived as `assets/video/blacktip-reef-user-v1.mp4` and exported to 121 JPEG frames in `assets/video/blacktip-reef-user-frames/`. It starts as the dive splash clears, then the shark swims past and recedes into open water. This replaces the earlier cutout and tail animation. Frame images keep forward and reverse scrolling responsive; the MP4 is a compact source reference.

The original blacktip-to-whales test still provides the upward water and whale-shark reveal, but its first blacktip frames are skipped. At the handoff, the new reef shot looks upward, a brief watercolor light wash obscures the different camera angles, and the older sequence begins where the shark is almost gone. Review this join slowly and in reverse on desktop and mobile before calling the edit final.

The new hammerhead-to-great-white source is archived as `assets/video/hammerhead-to-great-white-user-v1.mp4`, with 277 JPEG frames in `assets/video/hammerhead-to-great-white-user-frames/`. The existing hammerhead entrance runs to its final close-up. The new shot begins from nearly the same pose, lets the hammerhead approach closely, darkens the water, and reveals the great white. Its last frame is close to the approved great-white painting, allowing the following sixgill transition to retain the storyboard bridge. The video's original audio is omitted; the site's opt-in ambient sound continues.
