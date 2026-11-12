import {
  serviceContent,
  documentCatalogs,
  policyContent,
  contractDocuments,
  newsItems,
  locations,
} from '../data/destination-content.js';
import { destinations } from '../data/destinations.js';
import { localURL } from './routes.js';
import { accordionMarkup, tabsMarkup } from './components.js';
import { specTableMarkup } from './product-markup.js';
import {
  pageHeading,
  sourceMarkup,
  officialLink,
  filterCards,
  escapeHTML,
} from './destination-shared.js';

const link = (id, label) =>
  `<a href="${localURL('pages/' + id + '.html')}">${label}</a>`;
const searchForm = (label, categories = []) =>
  `<form class="filters" data-search-form role="search"><label>${label}<input type="search" maxlength="100" placeholder="Nhập từ khóa" /></label>${categories.length ? `<label>Loại nội dung<select><option value="">Tất cả</option>${categories.map((category) => `<option>${category}</option>`).join('')}</select></label>` : ''}<button class="button secondary" type="reset">Xóa bộ lọc</button></form><p role="status" data-result-count></p>`;

export function renderService(main, page) {
  const content = serviceContent[page.id];
  main.innerHTML =
    pageHeading(page, content.intro) +
    `<div class="container support-layout"><nav aria-label="Mục lục">${content.sections.map(([title], index) => `<a href="#service-${index}">${title}</a>`).join('')}${link(content.docs, 'Tài liệu xe')}</nav><article>
    ${content.sections.map(([title, text], index) => `<section id="service-${index}"><h2>${title}</h2><p>${text}</p></section>`).join('')}
    ${content.milestones ? `<section><h2>Một số mốc trong lịch nguồn</h2>${specTableMarkup(content.milestones)}<p>Chọn mốc đến trước; mở lịch chính thức để xem đầy đủ hạng mục cho từng kỳ.</p></section>` : ''}
    <section><h2>Chuẩn bị sử dụng dịch vụ</h2>${accordionMarkup(page.id + '-prepare', 'Tra cứu đúng hồ sơ', `<p>Chọn mẫu xe và loại tài liệu trước khi trao đổi với đơn vị dịch vụ.</p>${link(content.docs, 'Mở danh mục tài liệu')}`)}${accordionMarkup(page.id + '-simulation', 'Đặt lịch trong bản mô phỏng', `<p>Chức năng đặt lịch chỉ kiểm tra lựa chọn, không gửi yêu cầu tới VinFast.</p>${link('service-booking', 'Thử đặt lịch mô phỏng')}`)}<div class="detail-links">${link('locations', 'Tra cứu xưởng dịch vụ')}${link(content.docs, 'Tra cứu tài liệu')}</div></section></article></div>${sourceMarkup(page)}`;
}

export function renderDocuments(main, page) {
  const items = documentCatalogs[page.id];
  main.innerHTML =
    pageHeading(
      page,
      'Tìm theo mẫu xe và mở tài liệu PDF từ nguồn chính thức',
    ) +
    `<section class="container"><aside class="info"><h2>Chọn đúng tài liệu và phiên bản</h2><p>Danh mục chọn lọc đã kiểm tra liên kết ngày 12/11/2026. Sổ bảo hành không thay thế hướng dẫn sử dụng; hãy đối chiếu đời xe và phiên bản ghi trong PDF.</p><p>Danh mục này không bao gồm mọi phiên bản. ${officialLink(page.source, 'Mở tra cứu đầy đủ của VinFast')}.</p>${page.id !== 'scooter-documents' ? '<p>Cổng hướng dẫn ô tô/EBus được nguồn liên kết chưa trả nội dung khi kiểm tra; bên dưới vẫn có các sổ bảo hành PDF truy cập được.</p>' : ''}</aside>
    ${searchForm('Tìm tên mẫu xe', [...new Set(items.map((item) => item.category))])}<div class="destination-grid" data-results></div></section>${sourceMarkup(page)}`;
  filterCards(
    main,
    (item) =>
      `<article class="destination-card"><p class="eyebrow">${item.category} · PDF</p><h2>${item.model}</h2><p>Kiểm tra tên và mã phiên bản bên trong tài liệu trước khi sử dụng.</p>${officialLink(item.url, 'Mở ' + item.title)}</article>`,
    items,
  );
}

export function renderLocations(main, page) {
  main.innerHTML =
    pageHeading(
      page,
      'Tra cứu danh mục địa điểm chọn lọc từ bài công bố chính thức',
    ) +
    `<section class="container"><aside class="info"><h2>Danh mục lịch sử, không phải bản đồ trực tiếp</h2><p>Các địa chỉ bên dưới được công bố năm 2022–2023, giữ tên đơn vị hành chính tại thời điểm nguồn. Chưa xác nhận hoạt động, giờ mở cửa hoặc tình trạng cổng sạc hiện tại.</p><p>${officialLink(page.source, 'Mở hệ thống tra cứu hiện tại của VinFast')} để xác nhận trước khi đi. Không tự động truy cập vị trí của bạn.</p></aside>
    ${searchForm('Tìm tên hoặc địa chỉ', [...new Set(locations.map((item) => item.category))])}<div class="destination-grid" data-results></div></section>${sourceMarkup(page)}`;
  filterCards(
    main,
    (item) =>
      `<article class="destination-card"><p class="eyebrow">${item.category}</p><h2>${item.title}</h2><p>${item.address}</p><p>${item.description}</p><p>Thời điểm nguồn: ${item.date}</p><div class="destination-inline">${officialLink(item.url, 'Bài công bố địa điểm')}${officialLink('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.title + ' ' + item.address), 'Tìm địa chỉ trên bản đồ')}</div></article>`,
    locations,
  );
}

export function renderPolicy(main, page) {
  const content = policyContent[page.id];
  main.innerHTML =
    pageHeading(
      page,
      'Bản hướng dẫn đọc nguồn · Không thay thế văn bản pháp lý hoặc hợp đồng',
    ) +
    `<section class="container narrow">
    <h2>Nội dung chính từ nguồn</h2><p>${content.summary}</p>${content.version ? `<p class="muted">${content.version}</p>` : ''}
    <h2>Lưu ý khi sử dụng</h2><ul>${content.points.map((point) => `<li>${point}</li>`).join('')}</ul>
    <h2>Trong website mô phỏng này</h2><p>Công cụ tính toán và chọn xe chạy trong trình duyệt. Không tạo tài khoản, không gửi hồ sơ mua xe, không xử lý thanh toán. Tệp tải về do bạn chủ động lưu trên thiết bị.</p>
    ${accordionMarkup(page.id + '-original', 'Đọc văn bản đầy đủ ở đâu?', `<p>Bản gốc có điều kiện, phạm vi và ngoại lệ không được chép lại đầy đủ tại đây.</p>${officialLink(page.source, 'Đọc văn bản chính thức đúng mục')}`)}
    <div class="detail-links">${link('contracts', 'Hợp đồng và chính sách')}${link('complaints', 'Hướng dẫn kênh phản ánh')}${link('privacy', 'Thông tin dữ liệu cá nhân')}</div>
    </section>${sourceMarkup(page)}`;
}

export function renderContracts(main, page) {
  main.innerHTML =
    pageHeading(page, 'Tìm tài liệu mẫu và mở chính sách tại nguồn') +
    `<section class="container"><p>Các tài liệu có ngày và phạm vi riêng. Không dùng mẫu hợp đồng dưới đây như một thỏa thuận đã ký hoặc xác nhận ưu đãi hiện hành.</p>${searchForm('Tìm tên tài liệu hoặc năm', ['Hợp đồng', 'Chính sách'])}<div class="destination-grid" data-results></div>
    <h2>Các chủ đề chính sách</h2><ul>${destinations
      .filter((item) => item.kind === 'policy' && item.id !== 'contracts')
      .map((item) => `<li>${link(item.id, item.title)}</li>`)
      .join(
        '',
      )}</ul><p>${officialLink(page.source, 'Tra cứu toàn bộ hợp đồng và chính sách tại VinFast')}</p></section>${sourceMarkup(page)}`;
  filterCards(
    main,
    (item) =>
      `<article class="destination-card"><p class="eyebrow">${item.category} · ${item.date}</p><h2>${item.title}</h2><p>${item.description}</p>${officialLink(item.url, 'Mở PDF chính thức')}</article>`,
    contractDocuments,
  );
}

export function renderNews(main, page) {
  const items = newsItems
    .filter((item) => item.category === page.id)
    .sort((a, b) => b.date.localeCompare(a.date));
  main.innerHTML =
    pageHeading(
      page,
      'Tuyển chọn tin từ nguồn VinFast · Snapshot ngày 12/11/2026',
    ) +
    `<section class="container destination-news"><nav class="destination-inline" aria-label="Chuyên mục tin">${destinations
      .filter((item) => item.kind === 'news')
      .map(
        (item) =>
          `<a ${item.id === page.id ? 'aria-current="page"' : ''} href="${localURL('pages/' + item.id + '.html')}">${item.title}</a>`,
      )
      .join(
        '',
      )}</nav><p>Ngày trên mỗi bài là ngày công bố. Danh mục không tự cập nhật; xem nguồn để biết thông tin mới hơn.</p>${searchForm('Tìm tin theo chủ đề hoặc ngày')}<div class="destination-grid" data-results></div></section>${sourceMarkup(page)}`;
  filterCards(
    main,
    (item) =>
      `<article class="destination-card"><time datetime="${item.date}">${item.date.split('-').reverse().join('/')}</time><h2>${item.title}</h2><p>${item.description}</p>${officialLink(item.url, 'Đọc bài chính thức')}</article>`,
    items,
  );
}

export function renderEnergy(main, page) {
  main.innerHTML =
    pageHeading(page, 'Giải pháp lưu trữ năng lượng bằng pin lithium-ion') +
    `<section class="container"><h2>Vai trò của hệ thống BESS</h2><p>VF Energy giới thiệu lưu trữ điện phục vụ ổn định lưới, khai thác năng lượng tái tạo, tối ưu sử dụng điện và cấp điện dự phòng.</p>${tabsMarkup(
      'energy-types',
      [
        {
          title: 'Dân dụng',
          content:
            '<h3>Lưu trữ cho nhu cầu dân dụng</h3><p>Nhóm giải pháp phục vụ nhu cầu lưu trữ tại điểm sử dụng. Cấu hình cần được đánh giá theo tải và hệ thống điện thực tế.</p>',
        },
        {
          title: 'Dạng tủ',
          content:
            '<h3>Hệ thống dạng tủ</h3><p>Nguồn giới thiệu nhóm sản phẩm dạng tủ. Không dùng thông số pin ô tô để suy ra dung lượng hoặc công suất hệ thống.</p>',
        },
        {
          title: 'Container 20FT',
          content:
            '<h3>Lưu trữ dạng container</h3><p>Nhóm hệ thống container 20FT trong danh mục nguồn; thông số dự án, vị trí và điều kiện vận hành cần được nhà cung cấp xác nhận.</p>',
        },
      ],
    )}</section><section class="container"><h2>Chuẩn bị trao đổi cấu hình</h2><p>Gợi ý: xác định phụ tải, thời gian cần dự phòng, nguồn năng lượng kết nối và điều kiện lắp đặt. Đây không phải hướng dẫn thi công hoặc thiết kế điện.</p>${accordionMarkup('energy-details', 'Xem thông số và tư vấn chính thức', `<p>Không có bảng giá hay cấu hình được đặt mua trong bản mô phỏng.</p>${officialLink(page.source, 'Mở VF Energy')}`)}</section>${sourceMarkup(page)}`;
}

export function renderEstore(main, page) {
  main.innerHTML =
    pageHeading(page, 'Tìm hiểu các nhóm dịch vụ phần mềm trên xe') +
    `<section class="container detail-intro"><div><h2>Kết nối cùng chiếc xe</h2><p>Nguồn giới thiệu VF Connect Basic miễn phí và các nhóm Smart Connect Upper, Pro, Premium, Prime trả phí. Tính khả dụng phụ thuộc mẫu xe, phần mềm và gói dịch vụ.</p></div><img class="support-photo" src="${localURL('assets/home/hinh-anh-trai-nghiem-smart-connect-desktop-0210.webp')}" alt="Giới thiệu dịch vụ Smart Connect VinFast" /></section><section class="container"><h2>Nhóm tính năng</h2>${tabsMarkup(
      'estore-features',
      [
        {
          title: 'Smart Control',
          content:
            '<h3>Theo dõi và điều khiển</h3><p>Ứng dụng kết nối hỗ trợ theo dõi trạng thái và những thao tác từ xa được xe hỗ trợ.</p>',
        },
        {
          title: 'Smart Entertainment',
          content:
            '<h3>Nội dung giải trí</h3><p>Các ứng dụng và nội dung trên màn hình xe phụ thuộc dịch vụ đã đăng ký.</p>',
        },
        {
          title: 'Smart Assistant',
          content:
            '<h3>Tương tác bằng giọng nói</h3><p>Trợ lý ViVi hỗ trợ các câu lệnh tương thích với phần mềm trên xe.</p>',
        },
        {
          title: 'Smart Drive',
          content:
            '<h3>Thông tin hành trình</h3><p>Nhóm dịch vụ bản đồ và hỗ trợ hành trình; xem phạm vi trong từng gói.</p>',
        },
      ],
    )}</section><section class="container"><h2>Kiểm tra trước khi đăng ký</h2><p>Đối chiếu mẫu xe, phiên bản phần mềm, thời hạn và bảng tính năng ở nguồn. Bản mô phỏng không kích hoạt gói, đăng nhập tài khoản hay thu phí.</p>${officialLink(page.source, 'Xem bảng gói dịch vụ tại VF eStore')}</section>${sourceMarkup(page)}`;
}
