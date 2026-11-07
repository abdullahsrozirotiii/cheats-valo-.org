import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';

const emblaByWrap = new WeakMap<HTMLElement, EmblaCarouselType>();

function getCarouselRoot(wrap: HTMLElement): HTMLElement | null {
  return wrap.querySelector<HTMLElement>('[data-sw-carousel]');
}

function getControl(root: HTMLElement, kind: 'previous' | 'next'): HTMLButtonElement | null {
  const attr = kind === 'previous' ? 'data-sw-carousel-previous' : 'data-sw-carousel-next';
  return root.querySelector<HTMLButtonElement>(`[${attr}]`);
}

function syncArrowVisibility(root: HTMLElement, embla: EmblaCarouselType) {
  const prev = getControl(root, 'previous');
  const next = getControl(root, 'next');
  const canPrev = embla.canScrollPrev();
  const canNext = embla.canScrollNext();

  for (const [button, visible] of [
    [prev, canPrev],
    [next, canNext],
  ] as const) {
    if (!button) continue;
    button.classList.toggle('is-visible', visible);
    button.toggleAttribute('hidden', !visible);
    button.removeAttribute('disabled');
    button.setAttribute('aria-disabled', String(!visible));
  }
}

function bindProductsCarousel(wrap: HTMLElement) {
  const carouselRoot = getCarouselRoot(wrap);
  const viewport = carouselRoot?.querySelector<HTMLElement>('[data-sw-carousel-viewport]');
  if (!carouselRoot || !viewport) return;

  emblaByWrap.get(wrap)?.destroy();

  const embla = EmblaCarousel(viewport, {
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    dragFree: false,
  });
  emblaByWrap.set(wrap, embla);

  const prev = getControl(carouselRoot, 'previous');
  const next = getControl(carouselRoot, 'next');

  const sync = () => syncArrowVisibility(carouselRoot, embla);

  prev?.addEventListener('click', (event) => {
    event.preventDefault();
    if (embla.canScrollPrev()) embla.scrollPrev();
  });
  next?.addEventListener('click', (event) => {
    event.preventDefault();
    if (embla.canScrollNext()) embla.scrollNext();
  });

  embla.on('select', sync);
  embla.on('reInit', sync);

  const reInit = () => {
    embla.reInit();
    sync();
  };

  requestAnimationFrame(reInit);
  window.addEventListener('resize', reInit, { passive: true });
  window.addEventListener('load', reInit, { once: true });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => reInit());
    ro.observe(viewport);
  }

  sync();
}

export function initProductsCarousels(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-products-carousel]').forEach((wrap) => {
    if (wrap.dataset.productsCarouselBound === 'true') return;
    wrap.dataset.productsCarouselBound = 'true';
    bindProductsCarousel(wrap);
  });
}

export function setupProductsCarousel() {
  const boot = () => initProductsCarousels();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  document.addEventListener('astro:page-load', boot);
  document.addEventListener('astro:after-swap', boot);
}
