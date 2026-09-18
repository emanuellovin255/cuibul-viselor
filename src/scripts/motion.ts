import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

declare global {
  interface Window {
    __motionReady?: boolean;
    __lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger, SplitText);
window.__motionReady = true;

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

/* ——— Smooth scroll ——— */
let lenis: Lenis | undefined;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}

$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -90 });
    else target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ——— Header + CTA mobil ——— */
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = window.scrollY;
function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 40);
  header?.classList.toggle('is-hidden', y > lastY && y > 480 && !root.classList.contains('menu-open'));
  root.classList.toggle('cta-visible', y > 520);
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ——— Animații ——— */
const introShown = !!document.querySelector('.intro-curtain') && !root.classList.contains('no-intro');
const heroDelay = introShown ? 1.55 : 0.25;

if (reduce) {
  gsap.set('[data-reveal], [data-reveal-img], [data-split]', {
    opacity: 1,
    y: 0,
    clipPath: 'none',
    visibility: 'visible',
  });
} else {
  // Titluri: linie cu linie, din spatele unei măști
  $$('[data-split]').forEach((el) => {
    const isHero = el.dataset.split === 'hero';
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.35,
          ease: 'expo.out',
          stagger: 0.1,
          delay: isHero ? heroDelay : Number(el.dataset.delay ?? 0),
          scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 90%', once: true },
        });
      },
    });
  });

  // Blocuri care apar de jos
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.09,
        delay: (_i: number, target: HTMLElement) =>
          Number(target.dataset.delay ?? 0) + (target.closest('[data-hero]') ? heroDelay + 0.35 : 0),
      }),
  });

  // Imagini dezvăluite cu mască
  $$('[data-reveal-img]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      delay: Number(el.dataset.delay ?? 0),
    });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.3, duration: 1.9, ease: 'expo.out' }, 0);
  });

  // Parallax
  $$('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 12);
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Text care se „aprinde” cuvânt cu cuvânt la scroll
  $$('[data-scrub-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    gsap.set(split.words, { opacity: 0.16 });
    gsap.to(split.words, {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
    });
  });

  // Conținutul hero-ului se estompează la scroll
  $$('[data-hero-fade]').forEach((el) => {
    gsap.to(el, {
      yPercent: 18,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Scroll orizontal (desktop)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    $$('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      const viewport = section.querySelector<HTMLElement>('[data-hscroll-viewport]');
      const bar = section.querySelector<HTMLElement>('[data-hscroll-bar]');
      if (!track || !viewport) return;
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });
  });
}

/* ——— Contoare ——— */
$$('[data-count]').forEach((el) => {
  const end = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const format = (n: number) => n.toFixed(decimals).replace('.', ',');
  if (reduce) {
    el.textContent = format(end);
    return;
  }
  const state = { v: 0 };
  el.textContent = format(0);
  gsap.to(state, {
    v: end,
    duration: 2.2,
    ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    onUpdate: () => {
      el.textContent = format(state.v);
    },
  });
});

/* ——— Bare de scor ——— */
$$('[data-bar]').forEach((el) => {
  if (reduce) return;
  gsap.from(el, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1.8,
    ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 94%', once: true },
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
