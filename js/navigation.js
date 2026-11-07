import {homeMenuMarkup,homeFooterMarkup} from './home-chrome.js';
export const prefix = location.pathname.includes('/pages/') ? '../' : './';
export const pageURL = (page,query='') => `${prefix}pages/${page}.html${query}`;
const link=(label,url)=>`<a href="${url}">${label}</a>`;
export function mountNavigation(){
 document.body.classList.add('shared-chrome');
 document.querySelector('#site-header').innerHTML=`<div class="header-inner"><a class="brand" href="${prefix}index.html" aria-label="VinFast mô phỏng - Trang chủ"><img src="${prefix}assets/shared/VinFast-logo.webp" alt="VinFast" width="125" height="40"></a><button type="button" class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu ☰</button><nav id="main-nav" aria-label="Điều hướng chính">${homeMenuMarkup()}</nav><button type="button" class="account-trigger">Tài khoản</button><a class="button header-cta" href="${pageURL('test-drive')}">Đăng ký lái thử</a></div><dialog id="account-notice" aria-labelledby="account-notice-title"><h2 id="account-notice-title">Tài khoản VinFast</h2><p>Bản mô phỏng không tạo tài khoản, không yêu cầu mật khẩu và không gửi thông tin cá nhân.</p><button type="button" data-close-account>Đóng</button></dialog>`;
 document.querySelector('#site-footer').innerHTML=homeFooterMarkup();
 const dialog=document.querySelector('#account-notice');document.querySelector('.account-trigger').addEventListener('click',()=>dialog.showModal());dialog.querySelector('[data-close-account]').addEventListener('click',()=>dialog.close());
 const isHome=true;
 const header=document.querySelector('#site-header'), nav=header.querySelector('nav'),toggle=header.querySelector('.menu-toggle'),triggers=[...header.querySelectorAll('.nav-trigger')];
 function closeMenus(){triggers.forEach(t=>{t.setAttribute('aria-expanded','false');document.getElementById(t.getAttribute('aria-controls')).hidden=true;});}
 function closeMobile(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');closeMenus();}
 triggers.forEach(t=>t.addEventListener('click',e=>{const open=t.getAttribute('aria-expanded')==='true';const pointerOpened=isHome&&e.detail>0&&matchMedia('(hover: hover) and (min-width: 1051px)').matches;closeMenus();t.setAttribute('aria-expanded',String(pointerOpened||!open));document.getElementById(t.getAttribute('aria-controls')).hidden=pointerOpened?false:open;}));
 if(isHome){const finePointer=matchMedia('(hover: hover) and (min-width: 1051px)');triggers.forEach(t=>t.closest('.nav-item').addEventListener('mouseenter',()=>{if(!finePointer.matches)return;closeMenus();t.setAttribute('aria-expanded','true');document.getElementById(t.getAttribute('aria-controls')).hidden=false;}));header.addEventListener('mouseleave',()=>{if(finePointer.matches)closeMenus();});}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';closeMobile();if(!open){toggle.setAttribute('aria-expanded','true');nav.classList.add('is-open');}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))closeMobile();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=triggers.find(t=>t.getAttribute('aria-expanded')==='true');if(active){closeMenus();active.focus();}else if(toggle.getAttribute('aria-expanded')==='true'){closeMobile();toggle.focus();}}});
 header.addEventListener('focusout',()=>setTimeout(()=>{if(!header.contains(document.activeElement))closeMobile();},0));
 matchMedia('(min-width: 1051px)').addEventListener('change',closeMobile);
 nav.querySelectorAll('a').forEach(a=>{if(a.href===location.href)a.setAttribute('aria-current','page');});
}
