import {tabsMarkup} from './components.js';
import {localURL} from './routes.js';

// Facts checked against /vn_vi/dat-coc-xe-dien-vf5 on 2026-11-08.
// Uses the existing permitted VF 5 cutout, not an invented campaign/gallery.
const rows=items=>`<table><tbody>${items.map(([label,value])=>`<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('')}</tbody></table>`;
const photo=(file,alt)=>`<img src="${localURL('assets/vf5/'+file+'.webp')}" alt="${alt}" loading="lazy">`;
const gallery=()=>`<div class="detail-gallery" data-slider aria-label="Hình ảnh VF 5">${[['rear-seat','Hàng ghế sau VF 5'],['cargo','Khoang hành lý VF 5'],['exterior','Ngoại thất VF 5 màu đỏ']].map(([file,alt],i)=>`<div data-slide ${i?'hidden':''}>${photo(file,alt)}</div>`).join('')}<div class="slider-controls"><button data-prev aria-label="Ảnh trước">←</button>${[0,1,2].map(i=>`<button data-slide-to="${i}" aria-label="Ảnh ${i+1}" aria-pressed="${!i}">${i+1}</button>`).join('')}<button data-next aria-label="Ảnh tiếp theo">→</button><span data-slide-status role="status"></span></div></div>`;
export function renderVF5(main){
 document.title='VF 5 — VinFast mô phỏng';
 main.innerHTML=`<section class="vf5-source-hero"><img src="${localURL('assets/vf5/hero.webp')}" alt="VF 5 và gia đình cắm trại bên hồ" width="5760" height="2400" fetchpriority="high"><div><h1>VF 5</h1><p class="price">Từ 496 triệu đồng</p><a class="button" href="#vf5-specifications">Thông số kỹ thuật</a></div></section>
 <section class="container detail-summary"><h2>Vận hành</h2><dl class="specs"><div><dt>Quãng đường NEDC</dt><dd>326 km</dd></div><div><dt>Mô-men xoắn</dt><dd>135 Nm</dd></div><div><dt>Bảo hành xe</dt><dd>7 năm / 160.000 km</dd></div></dl><p class="muted">Bảo hành theo mốc đến trước. Quãng đường thực tế phụ thuộc điều kiện sử dụng.</p></section>
 <section class="container vf5-color-preview"><h2>VF 5 Infinity Blanc</h2>${photo('white','VF 5 màu Infinity Blanc')}</section>
 <section class="container"><h2>Hình ảnh VF 5</h2>${gallery()}</section>
 <section class="soft-section"><div class="container"><h2>Ngoại thất VF 5</h2><div class="detail-features"><article>${photo('front','Phần đầu VF 5')}<h3>Đầu xe</h3><p>Nhận diện chữ V mạ crôm.</p></article><article>${photo('rear','Phần đuôi VF 5')}<h3>Đuôi xe</h3><p>Dải chữ V phản quang.</p></article><article>${photo('wheel','La-zăng VF 5')}<h3>Bánh xe</h3><p>La-zăng nhôm 17 inch.</p></article></div></div></section>
 <section class="container"><h2>Khoang hành khách</h2>${photo('interior','Khoang lái, vô-lăng và màn hình VF 5')}<div class="detail-features"><article><h3>5 chỗ</h3><p>Chiều dài cơ sở 2.514 mm.</p></article><article><h3>6 túi khí</h3><p>Trang bị an toàn.</p></article><article><h3>Màn hình 8 inch</h3><p>Giải trí cảm ứng.</p></article></div></section>
 <section class="container" id="vf5-specifications"><h2>Thông số VF 5</h2>${tabsMarkup('vf5-specs',[
  {title:'Kích thước',content:rows([['Dài × rộng × cao','3.967 × 1.723 × 1.579 mm'],['Chiều dài cơ sở','2.514 mm'],['Số chỗ','5'],['Mô-men xoắn','135 Nm']])},
  {title:'Pin & Sạc',content:rows([['Pin khả dụng','37,23 kWh'],['NEDC','326 km'],['Sạc 10–70%','33 phút'],['Sạc AC tối đa','6,6 kW'],['Sạc DC tối đa','~50 kW']])},
  {title:'Trang bị',content:rows([['Điều hòa','Chỉnh cơ, 1 vùng'],['Lọc cabin','PM 2.5'],['Túi khí','6'],['Màn hình cảm ứng','8 inch']])}
 ])}<p class="muted">Số liệu tham chiếu ngày 08/11/2026. Giá không phải báo giá. Trang nguồn ghi đơn vị công suất “100 kW/hp”; chưa chuẩn hóa đơn vị này.</p></section>
 <section class="container detail-links"><h2>Dịch vụ đồng hành</h2><a class="button secondary" href="${localURL('pages/warranty.html')}">Bảo hành</a><a class="button secondary" href="${localURL('pages/battery.html')}">Pin và trạm sạc</a><a class="button" href="${localURL('pages/test-drive.html?model=vf5')}">Đăng ký lái thử mô phỏng</a></section>`;
}
