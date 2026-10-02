/* Scroll progress controls the dive and shark reveal. HTML supplies the layers; CSS draws them. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const q = (selector) => document.querySelector(selector);
  const journey = q('.journey');
  const surface = q('.surface');
  const waterline = q('.waterline');
  const reef = q('.reef');
  const shark = q('.shark');
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
  const whaleHammerStage = q('.whale-hammer-stage');
  const hammerAnimation = q('.hammer-animation');
  const deepStage = q('.deep-stage');
  const hammerhead = q('.hammerhead-frame');
  const greatWhite = q('.great-white-frame');
  const sixgill = q('.sixgill-frame');
  const tooth = q('.tooth-frame');
  const mouth = q('.mouth-frame');
  const suspense = q('.suspense-frame');
  const calmReturn = q('.return-frame');
  const deepCurrent = q('.deep-current');
  const deepInk = q('.deep-ink');
  const soundToggle = q('.sound-toggle');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const span = (x, a, b) => clamp((x - a) / (b - a));
  const pulse = (x, a, b, c, d) => span(x, a, b) * (1 - span(x, c, d));
  const setOpacity = (el, value) => { el.style.opacity = clamp(value).toFixed(3); };

  // Browser audio starts only after the visitor presses the sound button.
  const ambience = new Audio('assets/audio/underwater-ambience.mp3');
  const splash = new Audio('assets/audio/splash-entry.mp3');
  const glide = new Audio('assets/audio/shark-glide.mp3');
  const inkImpact = new Audio('assets/audio/deep-ink-impact.mp3');
  ambience.loop = true;
  ambience.volume = 0;
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
    const underwater = progress >= .34;
    ambience.volume = .3 * span(progress, .34, .43) * (1 - .9 * pulse(progress, .84, .87, .93, .97));
    if (soundEnabled && underwater) {
      if (ambience.paused) ambience.play().catch(() => {});
      if (lastProgress < .34) playEffect(splash);
      if (lastProgress < .32 && progress >= .32) playEffect(glide);
      if (lastProgress < .51 && progress >= .51) playEffect(glide);
      if (lastProgress < .62 && progress >= .62) playEffect(glide);
      if (lastProgress < .87 && progress >= .87) playEffect(inkImpact);
    } else if (!ambience.paused) {
      ambience.pause();
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
    const sharkIn = span(p, .84, .98);
    setOpacity(surface, 1 - span(p, .43, .67));
    surface.style.transform = `scale(${(1.06 + .08 * span(p, 0, .53)).toFixed(3)}) translateY(${(2.5 * span(p, .05, .53)).toFixed(2)}%)`;
    setOpacity(waterline, pulse(p, .40, .58, .68, .81));
    waterline.style.transform = `scale(${(1.08 - .08 * through).toFixed(3)}) translateY(${(-4 * through).toFixed(2)}%)`;
    setOpacity(reef, reefIn * (1 - span(p, .87, 1)));
    reef.style.transform = `scale(${(1.06 - .06 * span(p, .60, .91)).toFixed(3)})`;
    setOpacity(shark, sharkIn);
    shark.style.transform = `scale(${(1.05 - .05 * sharkIn).toFixed(3)})`;
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
    setOpacity(hammerhead, 1 - span(p, .14, .21));
    setOpacity(greatWhite, span(p, .14, .21) * (1 - span(p, .31, .38)));
    setOpacity(sixgill, span(p, .31, .38) * (1 - span(p, .49, .55)));
    setOpacity(tooth, span(p, .49, .55) * (1 - span(p, .705, .72)));
    setOpacity(mouth, span(p, .70, .715) * (1 - span(p, .78, .80)));
    setOpacity(suspense, span(p, .76, .80) * (1 - span(p, .86, .92)));
    setOpacity(calmReturn, span(p, .86, .92));
    hammerhead.style.transform = `translate(${(-6 * span(p, 0, .2)).toFixed(2)}%, ${(7 * span(p, 0, .2)).toFixed(2)}%) scale(${(1 + .11 * span(p, 0, .2)).toFixed(3)})`;
    greatWhite.style.transform = `translate(${(7 - 12 * span(p, .15, .37)).toFixed(2)}%, ${(6 * span(p, .15, .37)).toFixed(2)}%) scale(${(1.1 + .12 * span(p, .15, .37)).toFixed(3)})`;
    sixgill.style.transform = `translate(${(6 - 11 * span(p, .32, .54)).toFixed(2)}%, ${(4 * span(p, .32, .54)).toFixed(2)}%) scale(${(.94 + .27 * span(p, .32, .54)).toFixed(3)})`;
    tooth.style.transform = `translateY(${(8 - 8 * span(p, .5, .69)).toFixed(2)}%) scale(${(1.2 - .13 * span(p, .5, .69)).toFixed(3)})`;
    mouth.style.transform = `scale(${(.65 + 1.42 * span(p, .70, .78)).toFixed(3)})`;
    suspense.style.transform = `scale(${(1.08 - .07 * span(p, .77, .91)).toFixed(3)})`;
    calmReturn.style.transform = `scale(${(1.15 - .15 * span(p, .86, 1)).toFixed(3)})`;
    deepCurrent.style.transform = `translateY(${(-12 * p).toFixed(2)}%)`;
    setOpacity(deepCurrent, .32 * (1 - span(p, .68, .79)) + .12 * span(p, .91, 1));
    setOpacity(deepInk, pulse(p, .75, .79, .84, .92) * .86);
    deepInk.style.transform = `scale(${(1.1 + .5 * span(p, .75, .88)).toFixed(3)})`;
  }
  const renderJourney = (progress) => {
    render(progress / .29);
    renderWhales((progress - .29) / .16);
    showHammerFrame((progress - .45) / .10);
    renderDeep((progress - .55) / .45);
    setOpacity(whaleStage, span(progress, .28, .29) * (1 - span(progress, .45, .46)));
    setOpacity(whaleHammerStage, span(progress, .45, .46) * (1 - span(progress, .54, .55)));
    setOpacity(deepStage, span(progress, .54, .55));
    updateSound(progress);
  };
  renderJourney(0);
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: journey,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => renderJourney(self.progress),
      onRefresh: (self) => renderJourney(self.progress)
    });
    addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  } else {
    const update = () => {
      const distance = Math.max(1, journey.offsetHeight - innerHeight);
      renderJourney(-journey.getBoundingClientRect().top / distance);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();
