/* Scroll progress controls the dive and shark reveal. HTML supplies the layers; CSS draws them. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const q = (selector) => document.querySelector(selector);
  const journey = q('.journey');
  const surface = q('.surface');
  const waterline = q('.waterline');
  const reef = q('.reef');
  const blacktipStage = q('.blacktip-stage');
  const blacktipAnimation = q('.blacktip-animation');
  const mask = q('.mask-group');
  const title = q('.title');
  const drops = [...document.querySelectorAll('.drop')];
  const sparkle = q('.sparkle-field');
  const wash = q('.wash');
  const spray = q('.spray');
  const entrySplash = q('.entry-splash');
  const bubbles = q('.bubbles');
  const vignette = q('.vignette');
  const cue = q('.cue');
  const whaleStage = q('.whale-stage');
  const whaleBlacktip = q('.whale-blacktip');
  const whaleWhales = q('.whale-whales');
  const whaleWater = q('.whale-water');
  const whaleVeil = q('.whale-veil');
  const whaleLight = q('.whale-light');
  const whaleBubbles = q('.whale-bubbles');
  const whaleAnimation = q('.whale-animation');
  const firstHandoffWash = q('.first-handoff-wash');
  const whaleHammerStage = q('.whale-hammer-stage');
  const hammerAnimation = q('.hammer-animation');
  const hammerGreatWhiteStage = q('.hammer-greatwhite-stage');
  const hammerGreatWhiteAnimation = q('.hammer-greatwhite-animation');
  const sixgillVideoStage = q('.sixgill-video-stage');
  const sixgillAnimation = q('.sixgill-animation');
  const sixgillEntryVeil = q('.sixgill-entry-veil');
  const deepStage = q('.deep-stage');
  const greatWhiteBelly = q('.great-white-belly');
  const greatWhiteEye = q('.great-white-eye');
  const greatWhite = q('.great-white-frame');
  const sixgill = q('.sixgill-frame');
  const tooth = q('.tooth-frame');
  const mouth = q('.mouth-frame');
  const calmReturn = q('.return-frame');
  const finalTitle = q('.final-title');
  const deepCurrent = q('.deep-current');
  const depthWash = q('.depth-wash');
  const deepParticles = q('.deep-particles');
  const deepInk = q('.deep-ink');
  const soundToggle = q('.sound-toggle');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  // Eased fades make watercolor frames dissolve without visible linear seams.
  const span = (x, a, b) => {
    const t = clamp((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const pulse = (x, a, b, c, d) => span(x, a, b) * (1 - span(x, c, d));
  const setOpacity = (el, value) => { el.style.opacity = clamp(value).toFixed(3); };

  // Browser audio starts only after the visitor presses the sound button.
  const ambience = new Audio('assets/audio/underwater-ambience.mp3');
  const deepAmbience = new Audio('assets/audio/deep-pressure.mp3');
  const splash = new Audio('assets/audio/splash-entry.mp3');
  const glide = new Audio('assets/audio/shark-glide.mp3');
  const inkImpact = new Audio('assets/audio/deep-ink-impact.mp3');
  ambience.loop = true;
  deepAmbience.loop = true;
  ambience.volume = 0;
  deepAmbience.volume = 0;
  splash.volume = 0.65;
  glide.volume = 0.45;
  inkImpact.volume = 0.72;
  let soundEnabled = false;
  let lastProgress = 0;
  function playEffect(sound) {
    if (!soundEnabled) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
  function updateSound(progress) {
    const underwater = progress >= .16;
    const depth = span(progress, .69, .82);
    const silence = 1 - .92 * pulse(progress, .936, .952, .977, .991);
    ambience.volume = .3 * span(progress, .16, .25) * (1 - .75 * depth) * silence;
    deepAmbience.volume = .22 * depth * silence;
    if (soundEnabled && underwater) {
      if (ambience.paused) ambience.play().catch(() => {});
      if (deepAmbience.paused) deepAmbience.play().catch(() => {});
      if (lastProgress < .16 && progress >= .16) playEffect(splash);
      if (lastProgress < .24 && progress >= .24) playEffect(glide);
      if (lastProgress < .51 && progress >= .51) playEffect(glide);
      if (lastProgress < .75 && progress >= .75) playEffect(glide);
      if (lastProgress < .82 && progress >= .82) playEffect(glide);
      if (lastProgress < .961 && progress >= .961) playEffect(inkImpact);
    } else {
      ambience.pause();
      deepAmbience.pause();
    }
    lastProgress = progress;
  }
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.setAttribute('aria-pressed', String(soundEnabled));
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Turn sound off' : 'Turn sound on');
    soundToggle.title = soundEnabled ? 'Turn sound off' : 'Turn sound on';
    updateSound(lastProgress);
  });

  // Each video is exported as images so scrolling can move its frames both ways.
  function setupFrameSequence(image, stage, folder, count) {
    const frames = Array.from({ length: count }, (_, index) => {
      const frame = new Image();
      frame.src = `${folder}/frame-${String(index + 1).padStart(3, '0')}.jpg`;
      return frame;
    });
    image.addEventListener('load', () => stage.classList.add('sequence-ready'));
    if (image.complete && image.naturalWidth) stage.classList.add('sequence-ready');
    let shownFrame = 0;
    return (progress) => {
      const nextFrame = Math.min(count - 1, Math.round(clamp(progress) * (count - 1)));
      if (nextFrame === shownFrame) return;
      shownFrame = nextFrame;
      image.src = frames[nextFrame].src;
    };
  }
  const showWhaleFrame = setupFrameSequence(whaleAnimation, whaleStage, 'assets/video/blacktip-to-whales-frames', 120);
  const showBlacktipFrame = setupFrameSequence(blacktipAnimation, blacktipStage, 'assets/video/blacktip-reef-user-frames', 121);
  const showHammerFrame = setupFrameSequence(hammerAnimation, whaleHammerStage, 'assets/video/whales-to-hammerhead-frames', 120);
  const showHammerGreatWhiteFrame = setupFrameSequence(hammerGreatWhiteAnimation, hammerGreatWhiteStage, 'assets/video/hammerhead-to-great-white-user-frames', 277);
  const showSixgillFrame = setupFrameSequence(sixgillAnimation, sixgillVideoStage, 'assets/video/great-white-to-sixgill-seabed-frames', 408);
  function render(progress) {
    const p = clamp(progress);
    const approach = span(p, .04, .57);
    const through = span(p, .40, .75);
    const reefIn = span(p, .60, .82);
    setOpacity(surface, 1 - span(p, .43, .67));
    surface.style.transform = `scale(${(1.06 + .08 * span(p, 0, .53)).toFixed(3)}) translateY(${(2.5 * span(p, .05, .53)).toFixed(2)}%)`;
    setOpacity(waterline, pulse(p, .40, .58, .68, .81));
    waterline.style.transform = `scale(${(1.08 - .08 * through).toFixed(3)}) translateY(${(-4 * through).toFixed(2)}%)`;
    setOpacity(reef, reefIn);
    reef.style.transform = `scale(${(1.06 - .06 * span(p, .60, .91)).toFixed(3)})`;
    mask.style.transform = `translate(-50%, -50%) translateY(${(6 - 6 * approach).toFixed(2)}vh) rotate(${(-5 + 5 * approach).toFixed(2)}deg) scale(${(.58 + 2.83 * approach).toFixed(3)})`;
    setOpacity(mask, 1 - span(p, .53, .71));
    setOpacity(title, 1 - span(p, .18, .37));
    drops.forEach((drop, index) => {
      drop.style.transform = `translate(${(index % 2 ? 5 : -4) * approach}px, ${(index + 1) * 34 * approach}px) scale(${(1 - .26 * approach).toFixed(3)})`;
      setOpacity(drop, (1 - span(p, .29, .48)) * (.7 + .08 * index));
    });
    setOpacity(sparkle, .76 * (1 - span(p, .32, .62)));
    sparkle.style.transform = `translate(${(-4 * span(p, .05, .49)).toFixed(2)}%, ${(3 * span(p, .05, .49)).toFixed(2)}%) scale(${(1 + .23 * span(p, .03, .48)).toFixed(3)})`;
    setOpacity(wash, pulse(p, .43, .55, .77, .91) * .85);
    setOpacity(spray, pulse(p, .47, .59, .68, .82));
    spray.style.transform = `translateY(${(-80 * span(p, .49, .77)).toFixed(1)}px)`;
    setOpacity(entrySplash, pulse(p, .46, .58, .64, .78) * .96);
    entrySplash.style.transform = `translateY(${(-13 * span(p, .46, .78)).toFixed(2)}%) scale(${(1.06 + .26 * span(p, .46, .78)).toFixed(3)})`;
    setOpacity(bubbles, pulse(p, .52, .67, .88, 1));
    bubbles.style.transform = `translateY(${(-120 * span(p, .53, .94)).toFixed(1)}px)`;
    setOpacity(vignette, pulse(p, .38, .55, .68, .88) * .36);
    setOpacity(cue, 1 - span(p, .11, .27));
  }
  function renderWhales(progress) {
    const p = clamp(progress);
    // The new reef shot owns the blacktip; join this older clip after its shark has left.
    showWhaleFrame(.42 + .58 * p);
    const lookUp = span(p, .06, .56);
    const reveal = span(p, .48, .74);
    setOpacity(whaleBlacktip, 1 - reveal);
    whaleBlacktip.style.transform = `scale(${(1 + .5 * lookUp).toFixed(3)}) translate(${(-11 * lookUp).toFixed(2)}%, ${(16 * lookUp).toFixed(2)}%)`;
    setOpacity(whaleWhales, reveal);
    whaleWhales.style.transform = `scale(${(1.2 - .2 * span(p, .48, 1)).toFixed(3)}) translateY(${(8 - 8 * span(p, .48, 1)).toFixed(2)}%)`;
    setOpacity(whaleWater, pulse(p, .17, .36, .66, .88) * .8);
    setOpacity(whaleVeil, pulse(p, .25, .43, .59, .78));
    whaleVeil.style.transform = `translateY(${(-16 * span(p, .25, .78)).toFixed(2)}%) scale(${(1.07 + .2 * span(p, .25, .78)).toFixed(3)})`;
    setOpacity(whaleLight, pulse(p, .27, .42, .59, .79) * .95);
    setOpacity(whaleBubbles, pulse(p, .18, .39, .76, 1) * .75);
    whaleBubbles.style.transform = `translateY(${(-18 * span(p, .15, .86)).toFixed(2)}%)`;
  }
  function renderDeep(progress) {
    const p = clamp(progress);
    const drift = Math.sin(p * Math.PI * 8) * .65;
    setOpacity(greatWhiteBelly, pulse(p, .26, .32, .37, .42));
    setOpacity(greatWhiteEye, pulse(p, .35, .41, .45, .50));
    setOpacity(greatWhite, span(p, .46, .53) * (1 - span(p, .625, .69)));
    setOpacity(sixgill, span(p, .635, .70) * (1 - span(p, .73, .79)));
    greatWhiteBelly.style.transform = `translateX(${(20 - 18 * span(p, .26, .40)).toFixed(2)}%) scale(1.28)`;
    greatWhiteEye.style.transform = `translateX(${(8 - 8 * span(p, .34, .47)).toFixed(2)}%) scale(1.20)`;
    greatWhite.style.transform = `translateY(${(1.5 * span(p, .625, .69)).toFixed(2)}%) scale(${(1 + .03 * span(p, .625, .69)).toFixed(3)})`;
    sixgill.style.transform = `translate(${(7 - 12 * span(p, .60, .79)).toFixed(2)}%, ${(4 * span(p, .60, .79) + drift).toFixed(2)}%) scale(${(.96 + .25 * span(p, .60, .79)).toFixed(3)})`;
    deepCurrent.style.transform = `translateY(${(-12 * p).toFixed(2)}%)`;
    setOpacity(depthWash, .18 * span(p, .17, .35) + .35 * span(p, .55, .78));
    setOpacity(deepCurrent, .36 * (1 - span(p, .83, .92)) + .12 * span(p, .97, 1));
    setOpacity(deepParticles, .35 * span(p, .15, .3) * (1 - span(p, .84, .9)) + .13 * span(p, .96, 1));
  }
  function renderFinale(p) {
    // Hold on the fossil, push into it, then reverse the camera move after the vision.
    const zoomIn = span(p, .918, .959);
    const zoomOut = span(p, .982, .998);
    setOpacity(tooth, span(p, .909, .925) * (1 - span(p, .96, .967)));
    tooth.style.transform = `scale(${(1.05 + 1.65 * zoomIn).toFixed(3)})`;
    setOpacity(mouth, span(p, .958, .963) * (1 - span(p, .973, .979)));
    mouth.style.transform = `scale(${(.74 + 1.7 * span(p, .96, .976)).toFixed(3)})`;
    setOpacity(deepInk, .9 * pulse(p, .972, .978, .982, .99));
    deepInk.style.transform = `scale(${(1.08 + .3 * span(p, .972, .988)).toFixed(3)})`;
    setOpacity(calmReturn, span(p, .982, .991));
    calmReturn.style.transform = `scale(${(2.7 - 1.7 * zoomOut).toFixed(3)})`;
    setOpacity(finalTitle, span(p, .992, .999));
    finalTitle.setAttribute('aria-hidden', String(p < .992));
    finalTitle.style.transform = `translate(-50%, ${(16 * (1 - span(p, .992, .999))).toFixed(1)}px)`;
  }
  const renderJourney = (progress) => {
    render(progress / .29);
    showBlacktipFrame((progress - .205) / .115);
    renderWhales((progress - .33) / .12);
    showHammerFrame((progress - .45) / .10);
    showHammerGreatWhiteFrame((progress - .55) / .26);
    showSixgillFrame((progress - .81) / .105);
    renderDeep((progress - .55) / .45);
    renderFinale(progress);
    // Look upward as the blacktip leaves, then let the watercolor light cover the handoff.
    setOpacity(blacktipStage, span(progress, .195, .213) * (1 - span(progress, .339, .350)));
    blacktipStage.style.transform = `scale(${(1 + .12 * span(progress, .310, .349)).toFixed(3)}) translateY(${(9 * span(progress, .310, .349)).toFixed(2)}%)`;
    setOpacity(whaleStage, span(progress, .337, .351) * (1 - span(progress, .475, .49)));
    setOpacity(whaleHammerStage, span(progress, .445, .475) * (1 - span(progress, .585, .60)));
    setOpacity(deepStage, span(progress, .545, .585));
    // Keep the existing hammerhead arrival, then follow the user's clip into the great white.
    setOpacity(hammerGreatWhiteStage, span(progress, .547, .557) * (1 - span(progress, .806, .828)));
    setOpacity(sixgillVideoStage, span(progress, .815, .829) * (1 - span(progress, .909, .925)));
    sixgillVideoStage.style.transform = `scale(${(1 + .18 * span(progress, .906, .925)).toFixed(3)})`;
    const entryInk = .94 * pulse(progress, .807, .817, .826, .842);
    const seabedSilt = .66 * pulse(progress, .906, .913, .919, .929);
    setOpacity(sixgillEntryVeil, Math.max(entryInk, seabedSilt));
    setOpacity(firstHandoffWash, pulse(progress, .320, .329, .343, .355));
    firstHandoffWash.style.transform = `translateY(${(8 * span(progress, .320, .355)).toFixed(2)}%) scale(${(1.02 + .08 * span(progress, .320, .355)).toFixed(3)})`;
    updateSound(progress);
  };
  // A short time-based glide removes wheel/touchpad jitter while keeping reverse scroll exact.
  let targetProgress = 0;
  let displayedProgress = 0;
  let animationFrame = 0;
  let previousTime = 0;
  function tick(time) {
    const elapsed = Math.min(64, time - (previousTime || time));
    previousTime = time;
    displayedProgress += (targetProgress - displayedProgress) * (1 - Math.exp(-elapsed / 105));
    if (Math.abs(targetProgress - displayedProgress) < .0001) displayedProgress = targetProgress;
    renderJourney(displayedProgress);
    if (displayedProgress !== targetProgress) {
      animationFrame = requestAnimationFrame(tick);
    } else {
      animationFrame = 0;
      previousTime = 0;
    }
  }
  function setScrollProgress(progress) {
    targetProgress = clamp(progress);
    if (!animationFrame) animationFrame = requestAnimationFrame(tick);
  }
  renderJourney(0);
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: journey,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress),
      onRefresh: (self) => setScrollProgress(self.progress)
    });
    addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  } else {
    const update = () => {
      const distance = Math.max(1, journey.offsetHeight - innerHeight);
      setScrollProgress(-journey.getBoundingClientRect().top / distance);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();
