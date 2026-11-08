import {resolveRoute,localURL} from './routes.js';
import {homeMenus,footerGroups} from '../data/home-menu.js';
import {carGroups,scooterGroups} from '../data/home-products.js';
import {tabsMarkup} from './components.js';
export function referenceLink(item){
 const url=resolveRoute(item.url),external=new URL(url,location.href).origin!==location.origin;
 return `<a href="${url}" ${external?'target="_blank" rel="noopener noreferrer" title="Mở trang chính thức; trang này chưa được dựng cục bộ"':''}>${item.name}${external?' <span class="external-marker" aria-label="trang chính thức, tab mới">↗</span>':''}</a>`;
}
// Khung sidebar + danh sách sản phẩm dựa trên DOM/header shop chính thức.
// Chưa đối chiếu được với trang chủ production.
function megaContent(menu,index){
 const groups=menu.groups.filter(g=>g.name!=='Công cụ hỗ trợ khách hàng');
 const tools=menu.groups.find(g=>g.name==='Công cụ hỗ trợ khách hàng');
 const knownProducts=[...carGroups,...scooterGroups].flatMap(g=>g.items);
 const content=tabsMarkup('mega-'+index,groups.map(group=>({title:group.name,content:`<div class="mega-product-grid">${group.items.map(item=>{
  const name=item.name==='Feliz 2025'?'Feliz':item.name==='ZGoo'?'Zgoo':item.name;
  const p=knownProducts.find(p=>p.name===name);
  const url=resolveRoute(item.url),external=new URL(url,location.href).origin!==location.origin;
  return `<a class="mega-product-card ${p?'':'mega-text-card'}" href="${url}" ${external?'target="_blank" rel="noopener noreferrer" title="Trang chính thức, tab mới"':''}>${p?`<img src="${localURL(p.image)}" alt="" width="340" height="180" loading="lazy">`:''}<strong>${item.name}${external?' ↗':''}</strong>${p?`<span>${p.stats[0][1]}</span>`:''}</a>`;
 }).join('')}</div>`})));
 return `<div class="mega-body ${tools?'has-tools':''}">${content}${tools?`<aside class="mega-tools"><h3>Công cụ hỗ trợ khách hàng</h3>${tools.items.map(referenceLink).join('')}</aside>`:''}</div>`;
}
export function homeMenuMarkup(){return homeMenus.map((menu,i)=>menu.url?`<div class="nav-item nav-direct">${referenceLink(menu)}</div>`:`<div class="nav-item"><button type="button" class="nav-trigger" aria-expanded="false" aria-controls="menu-${i}">${menu.name} <span class="nav-chevron" aria-hidden="true">⌄</span></button><div class="mega-menu" id="menu-${i}" hidden>${megaContent(menu,i)}</div></div>`).join('');}
export function homeFooterMarkup(){return `<div class="footer-grid"><div><a href="${localURL('index.html')}" aria-label="VinFast — trang chủ mô phỏng"><img class="footer-source-logo" src="${localURL('assets/home/logo-footer-v2.webp')}" alt="VinFast" width="160"></a><p><strong>Công ty Cổ phần VinFast Việt Nam</strong></p><p>MST/MSDN: 0202357718<br>Cấp lần đầu ngày 19/06/2026.</p><p>Khu Kinh tế Đình Vũ - Cát Hải, Đảo Cát Hải, Đặc khu Cát Hải, Thành phố Hải Phòng, Việt Nam.</p><p>Người đại diện: Thái Thị Thanh Hải<br>Chủ tịch Hội đồng quản trị.</p></div>${footerGroups.map(group=>`<div><h2>${group.name}</h2>${group.items.map(referenceLink).join('')}</div>`).join('')}</div><div class="footer-contact-row"><div><h2>Dịch vụ khách hàng</h2><p>1900 23 23 89 - Nhánh 1</p></div><div><h2>Speak-up hotline</h2>${referenceLink({name:'vinfast.ethicspoint.com',url:'https://vinfast.ethicspoint.com/'})}</div><div><h2>Hệ sinh thái</h2>${[{name:'Vinhomes',url:'https://vinhomes.vn'},{name:'Vinmec',url:'https://vinmec.com'},{name:'Vinpearl',url:'https://vinpearl.com'}].map(referenceLink).join('')}</div></div><p class="footer-note">Bản mô phỏng học tập — không phải dịch vụ chính thức. Không nhận đặt cọc, không thanh toán và không gửi dữ liệu cá nhân.</p>`;}
