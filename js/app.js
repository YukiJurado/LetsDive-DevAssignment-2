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
  const soundToggle = q('.sound-toggle');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const span = (x, a, b) => clamp((x - a) / (b - a));
  const pulse = (x, a, b, c, d) => span(x, a, b) * (1 - span(x, c, d));
  const setOpacity = (el, value) => { el.style.opacity = clamp(value).toFixed(3); };

  // Browser audio starts only after the visitor presses the sound button.
  const ambience = new Audio('assets/audio/underwater-ambience.mp3');
  const splash = new Audio('assets/audio/splash-entry.mp3');
  const glide = new Audio('assets/audio/shark-glide.mp3');
  ambience.loop = true;
  ambience.volume = 0;
  splash.volume = 0.65;
  glide.volume = 0.45;
  let soundEnabled = false;
  let lastProgress = 0;
  function playEffect(sound) {
    if (!soundEnabled) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
  function updateSound(progress) {
    const underwater = progress >= .34;
    ambience.volume = .3 * span(progress, .34, .43);
    if (soundEnabled && underwater) {
      if (ambience.paused) ambience.play().catch(() => {});
      if (lastProgress < .34) playEffect(splash);
      if (lastProgress < .68 && progress >= .68) playEffect(glide);
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

  // Exported frames from the video respond immediately in either scroll direction.
  const whaleFrames = Array.from({ length: 120 }, (_, index) =>
    `assets/video/blacktip-to-whales-frames/frame-${String(index + 1).padStart(3, '0')}.jpg`
  );
  whaleAnimation.addEventListener('load', () => whaleStage.classList.add('sequence-ready'));
  if (whaleAnimation.complete && whaleAnimation.naturalWidth) whaleStage.classList.add('sequence-ready');
  const preloadedWhaleFrames = whaleFrames.map((src) => {
    const frame = new Image();
    frame.src = src;
    return frame;
  });
  let shownFrame = 0;
  function showWhaleFrame(progress) {
    const frame = Math.min(119, Math.round(clamp(progress) * 119));
    if (frame === shownFrame) return;
    shownFrame = frame;
    whaleAnimation.src = preloadedWhaleFrames[frame].src;
  }
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
  const renderJourney = (progress) => {
    render(progress / .62);
    renderWhales((progress - .62) / .38);
    setOpacity(whaleStage, span(progress, .60, .62));
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
