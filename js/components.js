import {enter} from './motion.js';

export function initTabs(root = document) {
 root.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const activate = tab => {
   if (tab.getAttribute('aria-selected') === 'true') return;
   tabs.forEach(item => { const active=item===tab; item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active; });
   enter(document.getElementById(tab.getAttribute('aria-controls')));
  };
  tabs.forEach((tab,i)=>{
   tab.addEventListener('click',()=>activate(tab));
   tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}});
  });
 });
}
export function initAccordions(root = document) {
 root.querySelectorAll('[data-accordion]').forEach(button=>button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));document.getElementById(button.getAttribute('aria-controls')).hidden=open;
 }));
}
export function initSlider(root = document) {
 root.querySelectorAll('[data-slider]').forEach(slider=>{
  const slides=[...slider.querySelectorAll('[data-slide]')], dots=[...slider.querySelectorAll('[data-slide-to]')];let current=0;
  let finish = () => {};
  function show(index){
   const next=(index+slides.length)%slides.length, direction=index<current?-1:1;
   finish();
   const previous=slides[current], incoming=slides[next], changed=next!==current;
   current=next;
   slides.forEach((slide,i)=>{slide.hidden=i!==current;slide.inert=i!==current;slide.setAttribute('aria-hidden',String(i!==current));});
   dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));
   slider.querySelector('[data-slide-status]').textContent=`${current+1} / ${slides.length}`;
   if(!changed || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   previous.hidden=false;
   const options={duration:780,easing:'cubic-bezier(.22, 1, .36, 1)'};
   const outgoing=previous.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-direction*5}%)`}],options);
   const arriving=incoming.animate([{opacity:0,transform:`translateX(${direction*7}%)`},{opacity:1,transform:'translateX(0)'}],options);
   enter(incoming.querySelector('.hero-copy'),28);
   finish=()=>{previous.hidden=true;outgoing.cancel();arriving.cancel();finish=()=>{};};
   arriving.finished.then(()=>finish()).catch(()=>{});
  }
  slider.querySelector('[data-prev]').addEventListener('click',()=>show(current-1));slider.querySelector('[data-next]').addEventListener('click',()=>show(current+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));show(0);
 });
}
export function tabsMarkup(id,items) {
 return `<div data-tabs><div role="tablist" aria-label="${id}">${items.map((item,i)=>`<button type="button" role="tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${item.title}</button>`).join('')}</div>${items.map((item,i)=>`<div role="tabpanel" tabindex="0" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" ${i?'hidden':''}>${item.content}</div>`).join('')}</div>`;
}
export function accordionMarkup(id,title,content){return `<div class="accordion"><h3><button type="button" data-accordion aria-expanded="false" aria-controls="${id}" id="${id}-label">${title}<span aria-hidden="true">＋</span></button></h3><div id="${id}" role="region" aria-labelledby="${id}-label" hidden>${content}</div></div>`;}
