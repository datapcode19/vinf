const fs = require('node:fs');
const names = [
  'Trang chủ',
  'VF 3',
  'VF 6',
  'Kinet',
  'Bảo hành',
  'Pin',
  'Danh mục',
  'So sánh',
  'Lái thử mô phỏng',
  'Trang chưa triển khai',
  '404',
  'Cứu hộ',
];
const widths = [1920, 1440, 1366, 1024, 768, 390, 375];
fs.writeFileSync(
  'tests/phase-one/index.html',
  /* HTML */ `<!doctype html>
    <html lang="vi">
      <meta charset="utf-8" /><meta
        name="viewport"
        content="width=device-width"
      /><title>Ảnh kiểm tra giai đoạn 1</title
      ><style>
        body {
          font: 16px/1.6 Arial;
          max-width: 1200px;
          margin: auto;
          padding: 24px;
          color: #222;
        }
        a {
          color: #135fc8;
        }
        nav {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        section {
          padding: 24px 0;
          border-bottom: 1px solid #ddd;
        }
        .pair {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 20px;
        }
        img {
          width: 100%;
          height: auto;
          border: 1px solid #ddd;
        }
        summary {
          cursor: pointer;
          padding: 12px;
        }
        @media (max-width: 600px) {
          .pair {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <h1>Kiểm tra giai đoạn 1</h1>
      <p>
        Ảnh bản dựng cục bộ dưới /vinf/. Chưa đối chiếu với screenshot
        production; không phải bằng chứng clone hoàn thành.
      </p>
      <nav>
        <a href="results.json">Kết quả kiểm thử</a
        ><a href="../../URL_COVERAGE.md">Độ bao phủ URL</a>
      </nav>
      ${names
        .map(
          (name, i) =>
            /* HTML */ `<section>
              <h2>${name}</h2>
              <nav>
                ${widths
                  .filter((w) =>
                    fs.existsSync('tests/phase-one/' + w + '-' + i + '.png'),
                  )
                  .map((w) => /* HTML */ `<a href="${w}-${i}.png">${w}px</a>`)
                  .join('')}
              </nav>
              <details>
                <summary>Xem desktop / mobile</summary>
                <div class="pair">
                  <a href="1440-${i}.png"
                    ><img
                      loading="lazy"
                      src="1440-${i}.png"
                      alt="${name} 1440px" /></a
                  ><a href="390-${i}.png"
                    ><img loading="lazy" src="390-${i}.png" alt="${name} 390px"
                  /></a>
                </div>
              </details>
            </section>`,
        )
        .join('')}
    </html>`,
);
