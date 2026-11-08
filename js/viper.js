import {tabsMarkup} from './components.js';
import {localURL} from './routes.js';
import {createSwipe} from './swipe.js';

// Viper-specific battery, warranty and equipment; never reuse Kinet values/images.
const rows=items=>`<table><tbody>${items.map(([label,value])=>`<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('')}</tbody></table>`;
const colors=[['red','Đỏ Tươi','#bb2029'],['grey','Xám','#898c8a'],['white','Trắng Ngọc Trai','#eee'],['black','Đen Bóng','#222']];
const photo=(file,alt)=>`<img src="${localURL('assets/viper/'+file+'.webp')}" alt="${alt}" loading="lazy">`;
export function renderViper(main){
 document.title='Viper — VinFast mô phỏng';
 main.innerHTML=`<section class="detail-intro container viper-intro"><div><p class="eyebrow">Xe máy điện đổi pin</p><h1>VinFast Viper</h1><p class="price">35 triệu đồng</p><a class="button" href="#viper-specifications">Khám phá Viper</a></div><img src="${localURL('assets/viper/hero.webp')}" alt="VinFast Viper" width="1170" height="960"></section>
 <section class="container viper-colors" aria-label="Màu Viper"><div data-viper-colors>${colors.map(([file,name])=>`<div>${photo(file,'Viper màu '+name)}</div>`).join('')}</div><div class="swatches">${colors.map(([,name,hex],i)=>`<button type="button" data-viper-color="${i}" aria-label="${name}" aria-pressed="${!i}" style="--swatch:${hex}"><span></span></button>`).join('')}</div><p data-viper-color-name role="status"></p></section>
 <section class="container detail-summary"><dl class="specs"><div><dt>Tốc độ tối đa</dt><dd>70 km/h</dd></div><div><dt>Quãng đường với 2 pin</dt><dd>~156 km/lần sạc</dd></div><div><dt>Công suất tối đa</dt><dd>3.000 W</dd></div></dl><p class="muted">Tốc độ: người lái 65 kg, chế độ Sport. Quãng đường: thử nghiệm 30 km/h, có pin phụ; thực tế tùy điều kiện sử dụng.</p></section>
 <section class="soft-section"><div class="container"><h2>Bảo hành Viper</h2><div class="detail-warranty"><article><h3>Xe: 6 năm</h3><p>Không giới hạn số km.</p></article><article><h3>Pin: 8 năm</h3><p>Không giới hạn số km.</p></article></div></div></section>
 <section class="container"><h2>Pin tháo lắp</h2><div class="detail-warranty"><article><h3>Hai khay pin</h3><p>Pin LFP 1,5 kWh; tùy chọn thêm một pin cùng dung lượng.</p></article><article><h3>Động cơ</h3><p>BLDC Inhub. Tăng tốc 0–50 km/h trong 15 giây với người lái 65 kg.</p></article></div></section>
 <section class="container"><h2>Trang bị Viper</h2><div class="detail-features viper-equipment"><article>${photo('screen','Màn hình TFT Viper')}<h3>Màn hình TFT</h3></article><article>${photo('storage','Cốp và khay pin Viper')}<h3>Cốp xe</h3></article><article>${photo('suspension','Giảm xóc Viper')}<h3>Giảm chấn thủy lực</h3></article><article>${photo('brake','Phanh Viper')}<h3>Phanh</h3><p>Đĩa trước; cơ phía sau.</p></article></div></section>
 <section class="container" id="viper-specifications"><h2>Thông số Viper</h2>${tabsMarkup('viper-specs',[
  {title:'Kích thước',content:rows([['Dài × rộng × cao','1.907 × 692 × 1.135 mm'],['Yên cao','780 mm'],['Gầm cao','138 mm'],['Cốp khi lắp 2 pin','10 L']])},
  {title:'Pin',content:rows([['Loại pin','LFP'],['Dung lượng mỗi pin','1,5 kWh'],['Pin phụ','Tùy chọn 1,5 kWh'],['Quãng đường với pin phụ','~156 km/lần sạc']])},
  {title:'Kết nối',content:rows([['Chìa khóa','Smart Key'],['Ứng dụng','E-Scooter'],['Tiện ích','Tìm xe, lịch sử hành trình, vùng an toàn'],['Cổng sạc','USB']])}
 ])}<p class="muted">Thông tin tham chiếu ngày 08/11/2026; giá không phải báo giá.</p></section>
 <section class="container detail-links"><a class="button secondary" href="${localURL('pages/scooter-warranty.html')}">Bảo hành xe máy</a><a class="button secondary" href="${localURL('pages/scooter-battery.html')}">Dịch vụ pin</a><a class="button" href="${localURL('pages/test-drive.html?model=viper')}">Đăng ký lái thử mô phỏng</a></section>`;
 const viewport=main.querySelector('[data-viper-colors]'),buttons=[...main.querySelectorAll('[data-viper-color]')];
 const carousel=createSwipe(viewport,[...viewport.children],index=>{buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));main.querySelector('[data-viper-color-name]').textContent=colors[index][1];});
 buttons.forEach((button,i)=>button.addEventListener('click',()=>carousel.go(i)));
}
