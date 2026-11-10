// Chỉ dùng khi phát triển: tạo các file HTML đầu vào nhỏ, không phải bước build bắt buộc.
const fs = require('node:fs');
const entries = [
  ['index.html', 'home', 'Trang chủ'],
  ['pages/catalog.html', 'catalog', 'Danh mục xe'],
  ['pages/product.html', 'product', 'Chi tiết xe'],
  ['pages/warranty.html', 'warranty', 'Chính sách bảo hành'],
  ['pages/battery.html', 'battery', 'Pin và trạm sạc'],
  ['pages/compare.html', 'compare', 'So sánh xe'],
  ['pages/test-drive.html', 'test-drive', 'Lái thử mô phỏng'],
  ['404.html', '404', 'Không tìm thấy trang'],
];
for (const [file, page, title] of entries) {
  const prefix = file.startsWith('pages/') ? '../' : './';
  fs.writeFileSync(
    file,
    /* HTML */ `<!doctype html>
      <html lang="vi">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Đồ án HTML5, CSS3 và JavaScript thuần. Bản mô phỏng học tập, không phải website chính thức VinFast."
          />
          <title>${title} — VinFast mô phỏng</title>
          <link rel="icon" href="data:," />
          <link rel="stylesheet" href="${prefix}css/styles.css" />
          <script type="module" src="${prefix}js/app.js"></script>
        </head>
        <body data-page="${page}">
          <a class="skip-link" href="#main">Bỏ qua điều hướng</a>
          <header id="site-header"></header>
          <main id="main" tabindex="-1"></main>
          <footer id="site-footer"></footer>
          <noscript
            >Bản mô phỏng cần JavaScript để hiển thị menu và các tương tác. Vui
            lòng bật JavaScript.</noscript
          >
        </body>
      </html> `,
  );
}
console.log('Created ' + entries.length + ' static HTML entrypoints');
