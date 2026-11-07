export function initTabs(root = document) {
 root.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const activate = tab => {
   tabs.forEach(item => { const active=item===tab; item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active; });
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
  function show(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==current);dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));slider.querySelector('[data-slide-status]').textContent=`${current+1} / ${slides.length}`;}
  slider.querySelector('[data-prev]').addEventListener('click',()=>show(current-1));slider.querySelector('[data-next]').addEventListener('click',()=>show(current+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));show(0);
 });
}
export function tabsMarkup(id,items) {
 return `<div data-tabs><div role="tablist" aria-label="${id}">${items.map((item,i)=>`<button type="button" role="tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${item.title}</button>`).join('')}</div>${items.map((item,i)=>`<div role="tabpanel" tabindex="0" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" ${i?'hidden':''}>${item.content}</div>`).join('')}</div>`;
}
export function accordionMarkup(id,title,content){return `<div class="accordion"><h3><button type="button" data-accordion aria-expanded="false" aria-controls="${id}" id="${id}-label">${title}<span aria-hidden="true">＋</span></button></h3><div id="${id}" role="region" aria-labelledby="${id}-label" hidden>${content}</div></div>`;}
