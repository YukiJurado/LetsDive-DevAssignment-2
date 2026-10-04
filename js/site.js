/* Website chrome around the scroll journey: the entry gate, chapter links, depth gauge and "back to the surface".
   js/app.js drives the scenes and tells this file about loading progress and scroll progress through two events. */
(() => {
  const q = (selector) => document.querySelector(selector);
  const gate = q('.entry-gate');
  const actions = q('.gate-actions');
  const loader = q('.gate-loader');
  const loaderBar = q('.gate-loader-bar i');
  const loaderText = q('.gate-loader-text');
  const journey = q('.journey');
  const navButtons = [...document.querySelectorAll('.site-header [data-p]')];
  const chapterButtons = [...document.querySelectorAll('.site-nav button')];
  const gaugeMarker = q('.gauge-marker');
  const gaugeValue = q('.gauge-value b');
  const soundToggle = q('.sound-toggle');
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const lerp = (x, a, b, from, to) => from + (to - from) * clamp((x - a) / (b - a));
  const inert = [q('.site-header'), journey];

  // Gate: the page stays still until the visitor chooses to dive in.
  let opened = false;
  let ready = false;
  document.documentElement.style.overflow = 'hidden';
  inert.forEach((element) => { element.inert = true; });
  function showActions() {
    if (ready) return;
    ready = true;
    loaderBar.style.setProperty('--load', '1');
    loaderText.textContent = 'Ready';
    setTimeout(() => {
      loader.hidden = true;
      actions.hidden = false;
      actions.querySelector('[data-sound="on"]').focus({ preventScroll: true });
    }, 450);
  }
  function showLoading({ loaded, total }) {
    const done = total ? loaded / total : 1;
    loaderBar.style.setProperty('--load', String(Math.max(.04, Math.min(1, done / .8))));
    loaderText.textContent = done >= .8 ? 'Ready' : `Filling your tank… ${Math.round(Math.min(100, done / .8 * 100))}%`;
    if (done >= .8) showActions();
  }
  window.addEventListener('journey:frames', (event) => showLoading(event.detail));
  if (window.sharkJourney) showLoading(window.sharkJourney.frameStats);
  // Never trap a visitor: open anyway if loading is slow or the animated journey is switched off (reduced motion).
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(showActions, reduced || !window.sharkJourney ? 600 : 12000);
  function dive(withSound) {
    if (opened) return;
    opened = true;
    if (withSound && soundToggle && soundToggle.getAttribute('aria-pressed') !== 'true') soundToggle.click();
    gate.classList.add('is-leaving');
    document.body.classList.remove('gate-open');
    document.documentElement.style.overflow = '';
    inert.forEach((element) => { element.inert = false; });
    setTimeout(() => gate.remove(), 1400);
  }
  actions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sound]');
    if (button) dive(button.dataset.sound === 'on');
  });

  // Chapter links and the wordmark scroll to a point in the journey (p is journey progress; 2 means the end).
  function scrollToProgress(p) {
    const rate = window.sharkJourney ? window.sharkJourney.rate : 1900 / 1700;
    const max = journey.offsetHeight - innerHeight;
    const target = journey.offsetTop + Math.min(1, p / rate) * max;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
  navButtons.forEach((button) => button.addEventListener('click', () => scrollToProgress(Number(button.dataset.p))));
  q('.end-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'auto' }));

  // Depth gauge and the active chapter follow the journey. Depths are story depths, not measurements.
  const depthStops = [[0, 0], [.12, 0], [.2, 8], [.33, 14], [.45, 40], [.55, 120], [.75, 300], [.83, 500], [.94, 1000]];
  function depthAt(p, tail) {
    if (tail > 0) return lerp(tail, 0, 1, 1000, 4000);
    for (let i = 1; i < depthStops.length; i += 1) {
      if (p <= depthStops[i][0]) return lerp(p, depthStops[i - 1][0], depthStops[i][0], depthStops[i - 1][1], depthStops[i][1]);
    }
    return 1000;
  }
  const chapterStarts = [0, .205, .38, .70, .935];
  let shownDepth = -1;
  let shownChapter = -1;
  window.addEventListener('journey:progress', (event) => {
    const { progress, tail } = event.detail;
    const raw = depthAt(progress, tail);
    const step = raw > 100 ? 5 : 1;
    const depth = Math.round(raw / step) * step;
    if (depth !== shownDepth) {
      shownDepth = depth;
      gaugeValue.textContent = depth.toLocaleString('en-US');
      gaugeMarker.style.setProperty('--depth', Math.sqrt(depth / 4000).toFixed(4));
    }
    let chapter = 0;
    chapterStarts.forEach((start, index) => { if (progress >= start) chapter = index; });
    if (tail > .15) chapter = chapterButtons.length - 1;
    if (chapter !== shownChapter) {
      shownChapter = chapter;
      chapterButtons.forEach((button, index) => button.classList.toggle('is-active', index === chapter));
    }
  });
})();
