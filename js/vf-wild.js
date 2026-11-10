import { localURL } from './routes.js';
import { tabsMarkup } from './components.js';
import { imageGalleryMarkup, specTableMarkup } from './product-markup.js';

export function renderWild(main) {
  const asset = (file) => localURL(`assets/vf-wild/${file}.webp`);
  const photo = (file, alt) =>
    /* HTML */ `<img src="${asset(file)}" alt="${alt}" loading="lazy" />`;
  document.title = 'VF Wild — VinFast mô phỏng';
  main.innerHTML = /* HTML */ `
    <section class="verified-car-hero wild-hero">
      <img
        src="${asset('hero')}"
        alt="VF Wild trong cảnh quan núi"
        fetchpriority="high"
      />
      <div>
        <h1>VF Wild</h1>
        <p>Bán tải điện REEV</p>
        <p class="price">Từ 860.000.000 VNĐ</p>
        <a class="button" href="#wild-design">Khám phá VF Wild</a>
      </div>
    </section>
    <section class="container wild-design" id="wild-design">
      <h2>Thiết kế Fluid Dynamism</h2>
      ${photo('top', 'VF Wild nhìn từ trên xuống')}
      <p>Đường nét nối liền cabin và thùng xe.</p>
      <dl class="specs">
        <div>
          <dt>Công suất</dt>
          <dd>160 kW</dd>
        </div>
        <div>
          <dt>Mô-men xoắn</dt>
          <dd>280 Nm</dd>
        </div>
        <div>
          <dt>Tải trọng thùng xe</dt>
          <dd>750 kg</dd>
        </div>
      </dl>
    </section>
    <section class="container">
      <h2>Ngoại thất và khả năng chuyên chở</h2>
      ${imageGalleryMarkup(
        'Ngoại thất VF Wild',
        [
          ['canyon', 'VF Wild trên địa hình đá'],
          ['dust', 'VF Wild trên cát'],
          ['wheel', 'Mâm xe 18 inch'],
          ['wheel-parts', 'Cấu tạo mâm và lốp'],
        ].map(([file, alt]) => ({ image: asset(file), alt })),
        'car-exterior-gallery',
      )}
      <div class="detail-features">
        <article>
          <h3>Mâm 18 inch</h3>
          <p>Lốp 255/70 R18 và ốp khí động học.</p>
        </article>
        <article>
          <h3>Thùng xe</h3>
          <p>1.574 × 1.512 × 509 mm.</p>
        </article>
        <article>
          <h3>Bệ bước bên thùng</h3>
          <p>Hỗ trợ tiếp cận khoang chở đồ.</p>
        </article>
      </div>
    </section>
    <section class="container wild-energy">
      <h2>Hệ thống mở rộng phạm vi REEV</h2>
      ${photo('reev', 'Minh họa hệ thống REEV của VF Wild')}
      <dl class="specs">
        <div>
          <dt>Pin LFP</dt>
          <dd>46,4 kWh</dd>
        </div>
        <div>
          <dt>Thuần điện</dt>
          <dd>Trên 250 km</dd>
        </div>
        <div>
          <dt>Kết hợp xăng và điện</dt>
          <dd>Tới 1.000 km</dd>
        </div>
      </dl>
      <p>
        Mô-tơ điện dẫn động bánh xe; hệ thống REEV bổ sung năng lượng cho hành
        trình dài.
      </p>
    </section>
    <section class="container verified-interior">
      <h2>Không gian nội thất VF Wild</h2>
      ${photo('interior', 'Khoang lái VF Wild')}
      <div class="detail-intro">
        ${photo('seats', 'Ghế da phối nỉ VF Wild')}
        <div>
          <h3>Ghế da phối nỉ</h3>
          <p>Khoang xe 5 chỗ với màn hình cảm ứng 10 inch.</p>
        </div>
      </div>
    </section>
    <section class="container verified-specifications">
      <h2>Thông số VF Wild</h2>
      ${tabsMarkup('wild-specs', [
        {
          title: 'Kích thước',
          content: specTableMarkup([
            ['Dài × Rộng × Cao', '5.376 × 2.069 × 1.873 mm'],
            ['Chiều dài cơ sở', '3.258 mm'],
            ['Thùng xe', '1.574 × 1.512 × 509 mm'],
            ['Tải trọng thùng', '750 kg'],
          ]),
        },
        {
          title: 'Vận hành',
          content: specTableMarkup([
            ['Công suất', '160 kW'],
            ['Mô-men xoắn', '280 Nm'],
            ['Pin LFP', '46,4 kWh'],
            ['Quãng đường kết hợp', 'Tới 1.000 km (NEDC)'],
          ]),
        },
      ])}
      <p class="muted">
        Ảnh tiền thương mại và thông số có thể thay đổi theo nguồn. Quãng đường
        thực tế phụ thuộc điều kiện vận hành. Các mục an toàn chưa đủ dữ liệu để
        tái tạo đầy đủ.
      </p>
      <a
        class="button"
        href="${localURL('pages/test-drive.html?model=vf-wild')}"
        >Lái thử VF Wild — mô phỏng</a
      >
    </section>
  `;
}
