import {accessories} from '../data/accessories.js';
import {localURL} from './routes.js';
import {tabsMarkup} from './components.js';
const money=value=>value===null?'Chưa xác minh giá':new Intl.NumberFormat('vi-VN').format(value)+' VNĐ';
const url=item=>localURL('pages/accessory.html?id='+item.id);
const picture=item=>`<img src="${localURL('assets/accessories/'+item.image)}" alt="${item.name}" width="600" height="600" loading="lazy">`;
const cards=items=>`<div class="accessories-grid">${items.map(item=>`<article><a href="${url(item)}">${picture(item)}<p class="eyebrow">${item.category}</p><h2>${item.name}</h2></a><p>${money(item.price)}</p><a class="text-link" href="${url(item)}">Xem chi tiết</a></article>`).join('')}</div>`;
export function renderAccessories(main){
 document.title='Phụ kiện xe — VinFast mô phỏng';
 main.innerHTML=`<section class="page-heading"><div class="container"><h1>Phụ kiện xe</h1><p>Phụ kiện và thiết bị đã có tài liệu tham chiếu trong đồ án.</p></div></section><section class="container">${tabsMarkup('accessories',[{title:'Tất cả',content:cards(accessories)},...['Bảo vệ xe','Thiết bị sạc','Phong cách sống'].map(category=>({title:category,content:cards(accessories.filter(item=>item.category===category))}))])}<p class="muted">Giá tham chiếu ngày 08/11/2026. Danh mục chưa bao phủ toàn bộ cửa hàng gốc. Không bán hàng hoặc thanh toán.</p></section>`;
}
export function renderAccessory(main){
 const item=accessories.find(item=>item.id===new URLSearchParams(location.search).get('id'));
 if(!item){main.innerHTML=`<section class="container"><h1>Không tìm thấy phụ kiện</h1><a class="button" href="${localURL('pages/accessories.html')}">Danh mục phụ kiện</a></section>`;return;}
 document.title=item.name+' — VinFast mô phỏng';
 main.innerHTML=`<nav class="breadcrumb container" aria-label="Đường dẫn"><a href="${localURL('index.html')}">Trang chủ</a> / <a href="${localURL('pages/accessories.html')}">Phụ kiện</a> / ${item.name}</nav><section class="container accessory-detail"><div class="accessory-image">${picture(item)}</div><div class="accessory-description"><h1>${item.name}</h1><p class="price">${money(item.price)}</p><details id="accessory-description" open><summary>Xem thông tin sản phẩm</summary><h2>Mô tả sản phẩm</h2><p>${item.description}</p><h2>Thông tin chi tiết</h2><dl>${item.specs.map(([name,value])=>`<div><dt>${name}</dt><dd>${value}</dd></div>`).join('')}</dl><p class="muted">${item.note}</p></details></div><aside class="accessory-order"><h2>Đặt sản phẩm</h2><div class="order-preview">${picture(item)}<p>Đây là bản mô phỏng học tập.</p></div><p class="order-total"><span>Tổng tiền tham chiếu</span><strong>${money(item.price)}</strong></p><button type="button" data-demo-order>Mua ngay — mô phỏng</button><p class="muted">Không phải báo giá. Không thanh toán hoặc tạo đơn hàng.</p></aside></section><section class="container"><h2>Phụ kiện khác</h2>${cards(accessories.filter(other=>other!==item))}</section><dialog id="accessory-demo"><h2>Mua hàng mô phỏng</h2><p>Không tạo đơn hàng, không thanh toán, không yêu cầu thông tin cá nhân.</p><button type="button" data-close-order>Đóng</button></dialog>`;
 const compact=matchMedia('(max-width: 768px)'),description=main.querySelector('#accessory-description');description.open=!compact.matches;compact.addEventListener('change',event=>description.open=!event.matches);
 const dialog=main.querySelector('dialog');main.querySelector('[data-demo-order]').addEventListener('click',()=>dialog.showModal());main.querySelector('[data-close-order]').addEventListener('click',()=>dialog.close());
}
