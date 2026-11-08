const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const easing = 'cubic-bezier(.22, 1, .36, 1)';

export function enter(element, distance = 24) {
 if (!element || reducedMotion.matches) return;
 element.getAnimations().forEach(animation => animation.cancel());
 element.animate([{opacity:0, transform:`translateY(${distance}px)`},{opacity:1, transform:'translateY(0)'}], {duration:620, easing});
}

// Move the vehicle and its information as one scene after the image decodes.
const replacements = new WeakMap();
export function replaceShowcase(root, update, direction = 1) {
 replacements.get(root)?.();
 if (reducedMotion.matches) { update(); return; }
 const scene = root.querySelector('.showcase-scene');
 const image = scene.querySelector('[data-model-image]');
 const previous = scene.cloneNode(true);
 previous.querySelectorAll('*').forEach(element=>{
  [...element.attributes].filter(a=>a.name.startsWith('data-') || a.name==='id' || a.name==='role').forEach(a=>element.removeAttribute(a.name));
 });
 previous.inert = true;
 previous.setAttribute('aria-hidden','true');
 Object.assign(previous.style,{position:'absolute',inset:'0',width:'100%',pointerEvents:'none'});
 scene.parentElement.append(previous);
 let cancelled = false;
 const animations = [];
 const cleanup = () => { cancelled = true; previous.remove(); animations.forEach(a=>a.cancel()); scene.style.visibility=''; };
 replacements.set(root, cleanup);
 scene.style.visibility='hidden';
 update();
 image.decode().catch(()=>{}).then(()=>{
  if (cancelled) return;
  scene.style.visibility='';
  const options = {duration:820,easing:'cubic-bezier(.65, 0, .35, 1)',fill:'both'};
  animations.push(previous.animate([{transform:'translateX(0)'},{transform:`translateX(${-direction*100}%)`}],options));
  animations.push(scene.animate([{transform:`translateX(${direction*100}%)`},{transform:'translateX(0)'}],options));
  animations[1].finished.then(()=>{cleanup(); if(replacements.get(root)===cleanup) replacements.delete(root);}).catch(()=>{});
 });
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
