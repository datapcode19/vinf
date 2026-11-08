const motion = matchMedia('(prefers-reduced-motion: reduce)');
const wrap = (index, length) => (index % length + length) % length;

/** A looping carousel shared by banners, galleries and complete product scenes. */
export function createSwipe(viewport, slides, onChange = () => {}) {
 let current = 0, drag = null, animation = null, frame = 0, suppressClick = false;
 let width = 0, wheelSum = 0, wheelTime = 0, wheelLocked = false, wheelTimer, request = 0, needsMeasure = false;
 viewport.classList.add('swipe-viewport');
 slides.forEach(slide => {
  slide.classList.add('swipe-slide');
  slide.querySelectorAll('img').forEach(img => { img.draggable=false; img.loading='eager'; });
 });
 const position = (slide, x) => { slide.style.transform=`translate3d(${x}px,0,0)`; };
 const ready = slide => [...slide.querySelectorAll('img')].every(img=>img.complete && img.naturalWidth>0);
 function rest() {
  slides.forEach((slide,i)=>{
   slide.style.transition='none'; slide.style.willChange='';
   slide.hidden=i!==current; slide.inert=i!==current;
   slide.setAttribute('aria-hidden',String(i!==current));
   position(slide,0);
  });
  viewport.dataset.swipeIndex=String(current);
 }
 function finish() {
  if (!animation) return;
  clearTimeout(animation.timer);
  animation=null;
  rest();
  if(needsMeasure && !drag) {needsMeasure=false;measure();}
 }
 function measure() {
  const nextWidth=viewport.clientWidth;
  if(!nextWidth) return;
  // Font/image readiness must never cancel a finger already dragging the scene.
  // A genuine width change (rotation/resize) still resets obsolete coordinates.
  if(nextWidth===width && (drag || animation)) {needsMeasure=true;return;}
  finish(); drag=null; viewport.classList.remove('is-dragging');
  width=nextWidth;
  // Measure every scene in the same grid cell, so changing text never jumps the layout.
  slides.forEach(slide=>{slide.hidden=false;});
  viewport.style.height=Math.ceil(Math.max(...slides.map(s=>s.getBoundingClientRect().height)))+'px';
  rest();
 }
 function paint(offset, target) {
  if(!ready(slides[target])) {rest();return;}
  const direction=offset<0?1:-1;
  slides.forEach((slide,i)=>{
   slide.hidden=i!==current && i!==target;
   slide.inert=i!==current;
   slide.setAttribute('aria-hidden',String(i!==current));
  });
  position(slides[current],offset);
  if(target!==current) position(slides[target],offset+direction*width);
 }
 function settle(target, direction, offset=0) {
  if(slides.length<2 || !width) return;
  const from=current;
  const neighbour=wrap(from+direction,slides.length);
  const incoming=target===from?neighbour:target;
  if(!ready(slides[incoming])) {
   rest();
   if(target!==from) {
    const pending=++request;
    Promise.all([...slides[incoming].querySelectorAll('img')].map(img=>img.decode())).then(()=>{
     if(pending===request && !drag) go(target);
    }).catch(()=>{});
   }
   return;
  }
  paint(offset || -direction*.01,incoming);
  // Flush the start position before enabling the settling transition.
  void viewport.offsetWidth;
  const duration=motion.matches?0:250;
  [slides[from],slides[incoming]].forEach(slide=>{
   slide.style.willChange='transform';
   slide.style.transition=`transform ${duration}ms cubic-bezier(.22,.75,.25,1)`;
  });
  position(slides[from],target===from?0:-direction*width);
  position(slides[incoming],target===from?direction*width:0);
  current=target;
  slides.forEach((s,i)=>{s.inert=i!==current;s.setAttribute('aria-hidden',String(i!==current));});
  viewport.dataset.swipeIndex=String(current);
  if(from!==current) onChange(current);
  animation={timer:setTimeout(finish,duration+35)};
  if(!duration) finish();
 }
 function go(index) {
  request++;
  finish();
  if(drag) {drag=null;viewport.classList.remove('is-dragging');rest();}
  const target=wrap(index,slides.length);
  if(target===current) return;
  settle(target,index<current?-1:1);
 }
 viewport.addEventListener('dragstart',event=>event.preventDefault());
 viewport.addEventListener('pointerdown',event=>{
  if(!event.isPrimary || event.button!==0 || slides.length<2 || event.target.closest('input,select,textarea,[data-no-swipe]')) return;
  request++;finish(); suppressClick=false;
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,lastTime:event.timeStamp,velocity:0,offset:0,axis:null};
 });
 viewport.addEventListener('pointermove',event=>{
  if(!drag || drag.id!==event.pointerId) return;
  if(event.pointerType==='mouse' && event.buttons!==1) {release(event,true);return;}
  const dx=event.clientX-drag.x, dy=event.clientY-drag.y;
  if(!drag.axis) {
   if(Math.max(Math.abs(dx),Math.abs(dy))<8) return;
   if(Math.abs(dy)>Math.abs(dx)*1.2) {drag=null;return;}
   // Wait through ambiguous diagonal movement instead of rejecting it forever.
   if(Math.abs(dx)<Math.abs(dy)*1.2) return;
   drag.axis='x';viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');
  }
  event.preventDefault();suppressClick=true;
  const elapsed=event.timeStamp-drag.lastTime;
  if(elapsed>0) drag.velocity=(event.clientX-drag.lastX)/elapsed;
  drag.lastX=event.clientX;drag.lastTime=event.timeStamp;
  drag.offset=Math.max(-width,Math.min(width,dx));
  cancelAnimationFrame(frame);
  frame=requestAnimationFrame(()=>{if(drag) paint(drag.offset,wrap(current+(drag.offset<0?1:-1),slides.length));});
 });
 function release(event,cancelled=false) {
  if(!drag || event.pointerId!==drag.id) return;
  const state=drag;drag=null;cancelAnimationFrame(frame);
  viewport.classList.remove('is-dragging');
  if(viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  if(!state.axis) {if(needsMeasure){needsMeasure=false;measure();}return;}
  const direction=state.offset<0?1:-1;
  const fast=event.timeStamp-state.lastTime<100 && Math.abs(state.velocity)>.5 && Math.abs(state.offset)>24;
  const commit=!cancelled && (Math.abs(state.offset)>Math.min(100,width*.22) || fast);
  settle(commit?wrap(current+direction,slides.length):current,direction,state.offset);
 }
 window.addEventListener('pointerup',event=>release(event));
 viewport.addEventListener('pointercancel',event=>release(event,true));
 viewport.addEventListener('lostpointercapture',event=>{
  // Touch starts with implicit capture on the image/link. Transferring that
  // capture to the viewport must not be mistaken for cancelling the gesture.
  if(event.target===viewport && !viewport.hasPointerCapture(event.pointerId)) release(event,true);
 });
 viewport.addEventListener('click',event=>{if(suppressClick && event.detail!==0){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);
 // Only consume explicitly horizontal wheel input; vertical scrolling remains native.
 viewport.addEventListener('wheel',event=>{
  if(event.ctrlKey || Math.abs(event.deltaX)<=Math.abs(event.deltaY)*1.3 || Math.abs(event.deltaX)<2) return;
  event.preventDefault();
  clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>{wheelLocked=false;wheelSum=0;},180);
  if(wheelLocked || drag) return;
  if(event.timeStamp-wheelTime>180) wheelSum=0;
  wheelTime=event.timeStamp;wheelSum+=event.deltaX*(event.deltaMode===1?16:1);
  if(Math.abs(wheelSum)>55){go(current+(wheelSum>0?1:-1));wheelSum=0;wheelLocked=true;}
 },{passive:false});
 const resize=new ResizeObserver(()=>{if(viewport.clientWidth!==width) measure();});
 resize.observe(viewport);
 slides.forEach(s=>s.querySelectorAll('img').forEach(img=>img.addEventListener('load',()=>{if(!drag&&!animation) measure();},{once:true})));
 motion.addEventListener('change',()=>{finish();rest();});
 document.fonts.ready.then(measure);
 measure();onChange(current);
 return {go,next:()=>go(current+1),prev:()=>go(current-1),get index(){return current;}};
}

/** Native touch/trackpad scrolling, plus mouse dragging for overflowing tab rows. */
export function initHorizontalScroll(root=document) {
 root.querySelectorAll('[role="tablist"], .model-picker').forEach(row=>{
  if(row.dataset.dragScroll) return;
  row.dataset.dragScroll='true';
  let start=null, moved=false;
  row.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||row.scrollWidth<=row.clientWidth)return;start={x:e.clientX,y:e.clientY,left:row.scrollLeft,id:e.pointerId};moved=false;});
  row.addEventListener('pointermove',e=>{if(!start)return;const dx=e.clientX-start.x;if(!moved&&Math.abs(e.clientY-start.y)>Math.abs(dx)){start=null;return;}if(Math.abs(dx)>6){moved=true;row.setPointerCapture(e.pointerId);row.classList.add('is-dragging');row.scrollLeft=start.left-dx;e.preventDefault();}});
  const end=()=>{start=null;row.classList.remove('is-dragging');};
  row.addEventListener('pointerup',end);row.addEventListener('pointercancel',end);row.addEventListener('lostpointercapture',e=>{if(e.target===row&&!row.hasPointerCapture(e.pointerId))end();});
  row.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
  row.addEventListener('dragstart',e=>e.preventDefault());
 });
}
