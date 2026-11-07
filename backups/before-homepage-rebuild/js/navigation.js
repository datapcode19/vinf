import {homeMenuMarkup,homeFooterMarkup} from './home-chrome.js';
import {products} from '../data/products.js';
export const prefix = location.pathname.includes('/pages/') ? '../' : './';
export const pageURL = (page,query='') => `${prefix}pages/${page}.html${query}`;
const link=(label,url)=>`<a href="${url}">${label}</a>`;
export function mountNavigation(){
 const isHome=document.body.dataset.page==='home';
 const productLinks=group=>products.filter(p=>p.group===group&&p.detail).map(p=>link(p.name,pageURL('product','?id='+p.id))).join('');
 const sub=(title,content)=>`<details><summary>${title}</summary><div class="sub-links">${content}</div></details>`;
 const menus=[
  ['Ô tô',sub('Xe cá nhân',link('Tất cả xe cá nhân',pageURL('catalog','?group=personal'))+productLinks('personal'))+sub('Xe dịch vụ',link('Danh mục xe dịch vụ',pageURL('catalog','?group=service')))],
  ['Xe máy điện',['Cao cấp','Trung cấp','Phổ thông'].map(segment=>sub(segment,link('Xem '+segment.toLowerCase(),pageURL('catalog','?group=scooter&segment='+encodeURIComponent(segment)))+(segment==='Cao cấp'?productLinks('scooter'):''))).join('')],
  ['Dịch vụ hậu mãi',sub('Ô tô điện',link('Chính sách bảo hành',pageURL('warranty')))],
  ['Pin và trạm sạc',link('Pin ô tô điện',pageURL('battery'))],
  ['Công cụ học tập',link('Tìm kiếm sản phẩm',pageURL('catalog'))+link('So sánh xe — mô phỏng',pageURL('compare'))+link('Lái thử — mô phỏng',pageURL('test-drive'))]
 ];
 document.querySelector('#site-header').innerHTML=`<div class="notice">ĐỒ ÁN HỌC TẬP · Không phải website chính thức · Không thực hiện giao dịch</div><div class="header-inner"><a class="brand" href="${prefix}index.html" aria-label="VinFast mô phỏng - Trang chủ">VINFAST</a><button type="button" class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu ☰</button><nav id="main-nav" aria-label="Điều hướng chính">${isHome?homeMenuMarkup():menus.map(([title,content],i)=>`<div class="nav-item"><button type="button" class="nav-trigger" aria-expanded="false" aria-controls="menu-${i}">${title} <span aria-hidden="true">⌄</span></button><div class="mega-menu" id="menu-${i}" hidden>${content}</div></div>`).join('')}</nav><a class="button header-cta" href="${isHome?'https://shop.vinfastauto.com/vn_vi/dang-ky-lai-thu.html':pageURL('test-drive')}" ${isHome?'target="_blank" rel="noopener noreferrer" title="Trang chính thức, mở tab mới"':''}>Đăng ký lái thử</a></div>`;
 document.querySelector('#site-footer').innerHTML=`<div class="footer-grid"><div><a class="brand" href="${prefix}index.html">VINFAST</a><p>Bản mô phỏng frontend phục vụ học tập.</p><p>HTML5 · CSS3 · JavaScript thuần</p></div><div><h2>Khám phá</h2>${link('Ô tô',pageURL('catalog','?group=personal'))}${link('Xe máy điện',pageURL('catalog','?group=scooter'))}</div><div><h2>Hỗ trợ</h2>${link('Bảo hành ô tô',pageURL('warranty'))}${link('Pin và trạm sạc',pageURL('battery'))}</div><div><h2>Về bản mô phỏng</h2><p>Dữ liệu tham chiếu ngày 07/11/2026. Không phải báo giá hay tư vấn chính sách.</p><a href="https://vinfastauto.com/vn_vi" target="_blank" rel="noopener noreferrer">Website chính thức ↗</a></div></div><p class="footer-note">Không liên kết với dịch vụ đặt cọc, thanh toán hoặc tài khoản thật.</p>`;
 if(isHome)document.querySelector('#site-footer').innerHTML=homeFooterMarkup();
 const header=document.querySelector('#site-header'), nav=header.querySelector('nav'),toggle=header.querySelector('.menu-toggle'),triggers=[...header.querySelectorAll('.nav-trigger')];
 function closeMenus(){triggers.forEach(t=>{t.setAttribute('aria-expanded','false');document.getElementById(t.getAttribute('aria-controls')).hidden=true;});}
 function closeMobile(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');closeMenus();}
 triggers.forEach(t=>t.addEventListener('click',()=>{const open=t.getAttribute('aria-expanded')==='true';closeMenus();t.setAttribute('aria-expanded',String(!open));document.getElementById(t.getAttribute('aria-controls')).hidden=open;}));
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';closeMobile();if(!open){toggle.setAttribute('aria-expanded','true');nav.classList.add('is-open');}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))closeMobile();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=triggers.find(t=>t.getAttribute('aria-expanded')==='true');if(active){closeMenus();active.focus();}else if(toggle.getAttribute('aria-expanded')==='true'){closeMobile();toggle.focus();}}});
 header.addEventListener('focusout',()=>setTimeout(()=>{if(!header.contains(document.activeElement))closeMobile();},0));
 matchMedia('(min-width: 1051px)').addEventListener('change',closeMobile);
 nav.querySelectorAll('a').forEach(a=>{if(a.href===location.href)a.setAttribute('aria-current','page');});
}
