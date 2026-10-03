/* Scroll progress controls the dive and shark reveal. HTML supplies the layers; CSS draws them. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const q = (selector) => document.querySelector(selector);
  const journey = q('.journey');
  const surface = q('.surface');
  const waterline = q('.waterline');
  const reef = q('.reef');
  const blacktipSprite = q('.blacktip-sprite');
  const blacktipTail = q('.blacktip-tail');
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
  const deepStage = q('.deep-stage');
  const greatWhiteBelly = q('.great-white-belly');
  const greatWhiteEye = q('.great-white-eye');
  const greatWhite = q('.great-white-frame');
  const sixgill = q('.sixgill-frame');
  const tooth = q('.tooth-frame');
  const mouth = q('.mouth-frame');
  const suspense = q('.suspense-frame');
  const calmReturn = q('.return-frame');
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
    const silence = 1 - .92 * pulse(progress, .925, .94, .965, .99);
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
      if (lastProgress < .93 && progress >= .93) playEffect(inkImpact);
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
  const showHammerFrame = setupFrameSequence(hammerAnimation, whaleHammerStage, 'assets/video/whales-to-hammerhead-frames', 120);
  function render(progress) {
    const p = clamp(progress);
    const approach = span(p, .04, .57);
    const through = span(p, .40, .75);
    const reefIn = span(p, .60, .82);
    const swimIn = span(p, .69, .955);
    const swimBeat = Math.sin(swimIn * Math.PI * 6);
    setOpacity(surface, 1 - span(p, .43, .67));
    surface.style.transform = `scale(${(1.06 + .08 * span(p, 0, .53)).toFixed(3)}) translateY(${(2.5 * span(p, .05, .53)).toFixed(2)}%)`;
    setOpacity(waterline, pulse(p, .40, .58, .68, .81));
    waterline.style.transform = `scale(${(1.08 - .08 * through).toFixed(3)}) translateY(${(-4 * through).toFixed(2)}%)`;
    setOpacity(reef, reefIn);
    reef.style.transform = `scale(${(1.06 - .06 * span(p, .60, .91)).toFixed(3)})`;
    setOpacity(blacktipSprite, span(p, .76, .85));
    blacktipSprite.style.transform = `translate(-50%, -50%) translate3d(${(76 - 76 * swimIn).toFixed(2)}vw, ${(2.5 - 2.5 * swimIn + .55 * swimBeat).toFixed(2)}vh, 0) rotate(${(.3 * swimBeat).toFixed(2)}deg) scale(${(.83 + .17 * swimIn).toFixed(3)})`;
    blacktipTail.style.transform = `rotate(${(5.5 * swimBeat).toFixed(2)}deg) scaleX(${(1 - .04 * Math.abs(swimBeat)).toFixed(3)})`;
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
    showWhaleFrame(p);
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
    setOpacity(greatWhite, span(p, .46, .53) * (1 - span(p, .59, .66)));
    setOpacity(sixgill, span(p, .60, .67) * (1 - span(p, .73, .79)));
    setOpacity(tooth, span(p, .74, .80) * (1 - span(p, .83, .86)));
    setOpacity(mouth, span(p, .843, .865) * (1 - span(p, .89, .91)));
    setOpacity(suspense, span(p, .90, .94) * (1 - span(p, .955, .985)));
    setOpacity(calmReturn, span(p, .96, .995));
    greatWhiteBelly.style.transform = `translateX(${(20 - 18 * span(p, .26, .40)).toFixed(2)}%) scale(1.28)`;
    greatWhiteEye.style.transform = `translateX(${(8 - 8 * span(p, .34, .47)).toFixed(2)}%) scale(1.20)`;
    greatWhite.style.transform = `translate(${(8 - 14 * span(p, .46, .66)).toFixed(2)}%, ${(5 * span(p, .46, .66) + drift).toFixed(2)}%) scale(${(1.12 + .12 * span(p, .46, .66)).toFixed(3)})`;
    sixgill.style.transform = `translate(${(7 - 12 * span(p, .60, .79)).toFixed(2)}%, ${(4 * span(p, .60, .79) + drift).toFixed(2)}%) scale(${(.96 + .25 * span(p, .60, .79)).toFixed(3)})`;
    tooth.style.transform = `translateY(${(7 - 7 * span(p, .74, .86)).toFixed(2)}%) scale(${(1.17 - .11 * span(p, .74, .86)).toFixed(3)})`;
    mouth.style.transform = `scale(${(.72 + 1.38 * span(p, .843, .91)).toFixed(3)})`;
    suspense.style.transform = `scale(${(1.08 - .07 * span(p, .87, .97)).toFixed(3)})`;
    calmReturn.style.transform = `scale(${(1.15 - .15 * span(p, .94, 1)).toFixed(3)})`;
    deepCurrent.style.transform = `translateY(${(-12 * p).toFixed(2)}%)`;
    setOpacity(depthWash, .18 * span(p, .17, .35) + .35 * span(p, .55, .78));
    setOpacity(deepCurrent, .36 * (1 - span(p, .83, .92)) + .12 * span(p, .97, 1));
    setOpacity(deepParticles, .35 * span(p, .15, .3) * (1 - span(p, .84, .9)) + .13 * span(p, .96, 1));
    setOpacity(deepInk, pulse(p, .885, .915, .945, .985) * .92);
    deepInk.style.transform = `scale(${(1.1 + .5 * span(p, .87, .97)).toFixed(3)})`;
  }
  const renderJourney = (progress) => {
    render(progress / .29);
    renderWhales((progress - .29) / .16);
    showHammerFrame((progress - .45) / .10);
    renderDeep((progress - .55) / .45);
    // Keep the outgoing view beneath the incoming one until the dissolve is complete.
    setOpacity(whaleStage, span(progress, .275, .31) * (1 - span(progress, .475, .49)));
    setOpacity(whaleHammerStage, span(progress, .445, .475) * (1 - span(progress, .585, .60)));
    setOpacity(deepStage, span(progress, .545, .585));
    setOpacity(firstHandoffWash, pulse(progress, .278, .292, .297, .315) * .82);
    firstHandoffWash.style.transform = `translateY(${(-5 * span(progress, .278, .315)).toFixed(2)}%)`;
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
