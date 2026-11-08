const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const easing = 'cubic-bezier(.22, 1, .36, 1)';

export function enter(element, distance = 24) {
 if (!element || reducedMotion.matches) return;
 element.getAnimations().forEach(animation => animation.cancel());
 element.animate([{opacity:0, transform:`translateY(${distance}px)`},{opacity:1, transform:'translateY(0)'}], {duration:620, easing});
}

export function initScrollMotion(root) {
 if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
 const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if (!entry.isIntersecting) return;
  enter(entry.target,32);
  observer.unobserve(entry.target);
 }),{threshold:.12});
 root.querySelectorAll('.section-intro, .after-sales-grid article, .green-campaign, .ecosystem-content, .ecosystem-image, .buy-tools-grid, .accessory-list, .estore').forEach(element=>observer.observe(element));
}
