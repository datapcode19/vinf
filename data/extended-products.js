import { destinations } from './destinations.js';
import { carGroups, scooterGroups } from './home-products.js';

// Product-specific facts checked against each destination's official source,
// 2026-11-12. Do not replace these with generic menu specifications.
const car = (summary, dimensions, power, battery, equipment, extra = {}) => ({
  summary,
  dimensions,
  performance: power,
  battery,
  equipment,
  ...extra,
});
const scooter = (
  summary,
  speed,
  power,
  range,
  battery,
  dimensions,
  seat,
  storage,
  features,
  extra = {},
) => ({
  summary,
  dimensions: [
    ['Dài × rộng × cao', dimensions + ' mm'],
    ['Chiều cao yên', seat + ' mm'],
  ],
  performance: [
    ['Tốc độ tối đa', speed + ' km/h'],
    ['Công suất tối đa', power + ' W'],
    ['Quãng đường thử nghiệm', range],
  ],
  battery: [['Cấu hình năng lượng', battery]],
  equipment: [
    ['Dung tích cốp', storage],
    ['Trang bị', features],
  ],
  ...extra,
});

const facts = {
  'minio-green': car(
    'Xe điện đô thị bốn chỗ, thân xe hai cửa và bộ mâm 13 inch.',
    [
      ['Kích thước (mm)', '3.090 × 1.496 × 1.663,2'],
      ['Chiều dài cơ sở', '2.065 mm'],
      ['Số chỗ', '4'],
    ],
    [
      ['Công suất', '30 kW'],
      ['Mô-men xoắn', '65 Nm'],
    ],
    [
      ['Pin khả dụng', '18,3 kWh'],
      ['Quãng đường NEDC', '210 km'],
      ['Sạc AC / DC', '3,3 kW / khoảng 24 kW'],
      ['Sạc 10–70%', '34 phút'],
    ],
    [
      ['An toàn', 'ABS; 1 túi khí'],
      ['Hiển thị', 'Màn hình người lái 7 inch'],
    ],
    {
      note: 'Thông số của trang sản phẩm hiện tại. Tài liệu Minio năm 2025 có cấu hình pin và quãng đường khác; không trộn các phiên bản.',
      gallery: ['exterior.webp', 'interior.webp'],
    },
  ),
  'herio-green': car(
    'Ô tô điện năm chỗ với mâm thép 16 inch, phù hợp nhu cầu vận chuyển hành khách.',
    [
      ['Kích thước (mm)', '3.967 × 1.723 × 1.579'],
      ['Chiều dài cơ sở', '2.514 mm'],
      ['Số chỗ', '5'],
    ],
    [
      ['Công suất', '100 kW'],
      ['Mô-men xoắn', '135 Nm'],
    ],
    [
      ['Pin khả dụng', '37,23 kWh'],
      ['Quãng đường NEDC', '326 km'],
      ['Sạc AC / DC', '6,6 kW / khoảng 50 kW'],
      ['Sạc 10–70%', '33 phút'],
    ],
    [
      ['An toàn', '2 túi khí'],
      ['Tiện nghi', 'Màn hình 8 inch; điều hòa chỉnh cơ một vùng; lọc PM2.5'],
    ],
    { gallery: ['exterior.webp', 'interior.webp'] },
  ),
  'nerio-green': car(
    'Xe điện dẫn động cầu trước với ba chế độ Eco, Comfort và Sport.',
    [
      ['Kích thước (mm)', '4.300 × 1.768 × 1.615'],
      ['Chiều dài cơ sở', '2.611 mm'],
      ['Khoảng sáng gầm', '165 mm'],
    ],
    [
      ['Công suất', '110 kW'],
      ['Mô-men xoắn', '242 Nm'],
    ],
    [
      ['Pin khả dụng', '41,9 kWh'],
      ['Quãng đường NEDC', '318,6 km'],
      ['Sạc DC', '60 kW'],
      ['Sạc 10–70%', '27 phút'],
    ],
    [
      ['Ngoại thất', 'Mâm 18 inch; đèn LED; cốp điện'],
      ['Nội thất', 'Màn hình 10 inch; 6 loa; điều hòa tự động một vùng'],
    ],
    {
      note: 'Brochure chính thức dùng tên phân khúc C-SUV. Danh mục trang chủ giữ snapshot trước đó; thông số tại đây theo brochure Nerio.',
      gallery: ['presentation.webp'],
      documents: [
        {
          title: 'Brochure Nerio Green',
          url: 'https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwe405bfd4/Document/250416_Brochure_Nerio_Green_VN.pdf',
        },
      ],
    },
  ),
  'limo-green': car(
    'Ô tô điện bảy chỗ với chiều dài cơ sở 2.840 mm, dành cho nhu cầu di chuyển nhiều hành khách.',
    [
      ['Kích thước (mm)', '4.740 × 1.872 × 1.729'],
      ['Chiều dài cơ sở', '2.840 mm'],
      ['Số chỗ', '7'],
    ],
    [
      ['Công suất', '150 kW'],
      ['Mô-men xoắn', '280 Nm'],
    ],
    [
      ['Pin khả dụng', '60,13 kWh'],
      ['Quãng đường NEDC', '450 km'],
      ['Sạc AC / DC', '6,9 kW / 80 kW'],
    ],
    [
      ['An toàn', '4 túi khí'],
      ['Ngoại thất', 'Mâm 18 inch; gương chỉnh điện'],
      ['Nội thất', 'Màn hình 10,1 inch; điều hòa tự động một vùng'],
    ],
    { gallery: ['exterior.webp', 'interior.webp'] },
  ),
  'ec-van': car(
    'Xe tải van điện hai chỗ, khoang hàng có thể tích 2.600 lít.',
    [
      ['Kích thước (mm)', '3.767 × 1.680 × 1.790'],
      ['Chiều dài cơ sở', '2.520 mm'],
      ['Khoang hàng', '2.600 lít'],
    ],
    [
      ['Công suất', '30 kW'],
      ['Mô-men xoắn', '110 Nm'],
    ],
    [
      ['Pin khả dụng', '18,23 kWh'],
      ['Quãng đường NEDC', '175 km'],
      ['Sạc DC', '24,2 kW'],
      ['Sạc 10–70%', '42 phút'],
    ],
    [['Hỗ trợ an toàn', 'ABS, EBD, ESS và TCS']],
    { gallery: ['exterior.webp', 'detail.webp'] },
  ),
  ebus: car(
    'Trang giới thiệu cấu hình EBus dài 6,2 m, bao gồm ứng dụng đưa đón học sinh.',
    [
      ['Kích thước (mm)', '6.200 × 2.200 × 2.900'],
      ['Khoảng sáng gầm', '180 mm'],
    ],
    [
      ['Công suất', '140 kW'],
      ['Mô-men xoắn', '420 Nm'],
      ['Tốc độ tối đa', '90 km/h'],
    ],
    [
      ['Pin LFP', '179,5 kWh'],
      ['Quãng đường công bố', 'Tới 340 km'],
      ['Sạc DC', '120 kW'],
      ['Sạc 20–80%', '70 phút'],
    ],
    [
      ['An toàn', 'ABS, BA, EBD'],
      [
        'Tùy chọn',
        'Camera giám sát; màn hình; lọc không khí; hệ thống điểm danh',
      ],
    ],
    {
      image: 'assets/extended/ebus/gallery-1.webp',
      gallery: ['gallery-2.webp', 'gallery-3.webp'],
      note: 'Thông số riêng của mẫu 6,2 m trên trang sản phẩm. Không áp dụng nhãn 45 chỗ trong menu cho cấu hình này. Cấu hình trường học công bố sức chứa tối đa 30 người.',
    },
  ),
  fadil: car(
    'Hatchback động cơ xăng trong danh mục lịch sử VinFast. Trang lưu trữ giới thiệu các trang bị theo phiên bản.',
    [
      ['Kích thước (mm)', '3.676 × 1.632 × 1.530'],
      ['Chiều dài cơ sở', '2.385 mm'],
    ],
    [
      ['Động cơ', 'Xăng 1,4 L'],
      ['Công suất / mô-men xoắn', '98 HP / 128 Nm'],
      ['Hộp số / dẫn động', 'CVT / cầu trước'],
    ],
    [],
    [
      ['Bình nhiên liệu', '32 lít'],
      [
        'Trang bị theo phiên bản',
        'Màn hình 7 inch; 6 loa; ABS/EBD/ESC/TCS/HSA/ROM',
      ],
    ],
    {
      image: 'assets/extended/fadil/hero.jpg',
      colors: [
        ['Đỏ', '#a5222e', 'red.png'],
        ['Xám', '#747b83', 'grey.png'],
      ],
    },
  ),
  'lux-a': car(
    'Sedan động cơ xăng Lux A2.0, được lưu lại như một phần lịch sử sản phẩm VinFast.',
    [
      ['Kích thước (mm)', '4.973 × 1.900 × 1.500'],
      ['Chiều dài cơ sở', '2.968 mm'],
    ],
    [
      ['Động cơ', 'Xăng tăng áp 2,0 L'],
      ['Cấu hình công suất', '174 HP / 300 Nm hoặc 228 HP / 350 Nm'],
      ['Hộp số / dẫn động', 'Tự động 8 cấp / cầu sau'],
    ],
    [],
    [
      ['Tiện nghi được giới thiệu', 'Màn hình 10,4 inch; điều hòa hai vùng'],
      ['Phiên bản', 'Công suất và trang bị khác nhau theo phiên bản'],
    ],
    {
      image: 'assets/extended/lux-a/hero.png',
      colors: [
        ['Đỏ', '#9f2935', 'red.png'],
        ['Xám', '#707781', 'grey.png'],
      ],
    },
  ),
  'lux-sa': car(
    'SUV động cơ xăng Lux SA2.0 trong danh mục lưu trữ; có cấu hình dẫn động cầu sau hoặc bốn bánh.',
    [
      ['Kích thước (mm)', '4.940 × 1.960 × 1.773'],
      ['Chiều dài cơ sở', '2.933 mm'],
      ['Khoảng sáng gầm', '195 mm'],
    ],
    [
      ['Động cơ', 'Xăng 2,0 L'],
      ['Công suất / mô-men xoắn', '228 HP / 350 Nm'],
      ['Hộp số', 'Tự động 8 cấp'],
    ],
    [],
    [
      ['Bình nhiên liệu', '85 lít'],
      [
        'Tiện nghi theo phiên bản',
        'Màn hình 10,4 inch; điều hòa hai vùng; hệ thống âm thanh cao cấp 13 loa',
      ],
    ],
    {
      image: 'assets/extended/lux-sa/hero.png',
      colors: [
        ['Đỏ', '#a42731', 'red.png'],
        ['Xám', '#72777d', 'grey.png'],
      ],
    },
  ),
  president: car(
    'SUV President từng được giới thiệu với số lượng giới hạn 500 chiếc. Đây là hồ sơ lịch sử, không phải chào bán xe mới.',
    [
      ['Kích thước (mm)', '5.146 × 1.987 × 1.760'],
      ['Chiều dài cơ sở', '3.133 mm'],
    ],
    [
      ['Động cơ', 'V8 6,2 L'],
      ['Công suất / mô-men xoắn', '420 HP / 624 Nm'],
      ['Hộp số / dẫn động', 'Tự động 8 cấp / AWD'],
      ['Tăng tốc 0–100 km/h', '6,8 giây'],
    ],
    [],
    [
      ['Nội thất', 'Da Nappa; ốp gỗ; massage và sưởi ghế sau'],
      ['Giải trí', 'Màn hình 12,3 inch; 13 loa'],
    ],
    {
      image: 'assets/extended/president/hero.jpg',
      colors: [
        ['Đỏ', '#a32934', 'red.png'],
        ['Trắng', '#eeeae2', 'white.png'],
      ],
    },
  ),
  'vero-x': scooter(
    'Vero X có màn hình TFT, Smart Key và khoang chứa đồ thay đổi theo cấu hình pin.',
    70,
    2250,
    '134 km + 128 km khi có pin phụ',
    'LFP 2,4 kWh + pin phụ tùy chọn 2,4 kWh',
    '1858 × 690 × 1100',
    770,
    '35 lít; 16 lít khi lắp pin phụ',
    'Phanh đĩa trước, tang trống sau; sạc 0–100% khoảng 6 giờ 30 phút',
  ),
  kyo: scooter(
    'Kyo kết hợp màn hình TFT có Bluetooth với hỗ trợ khởi hành ngang dốc.',
    70,
    3000,
    'Khoảng 160 km với pin phụ',
    'LFP 1,5 kWh + pin phụ tùy chọn 1,5 kWh',
    '1999 × 694 × 1130',
    785,
    '21 lít',
    'Smart Key; tính năng vị trí/lịch sử hành trình qua E-Scooter',
  ),
  'feliz-ii': scooter(
    'Feliz II sử dụng động cơ BLDC Inhub và có cổng sạc USB.',
    70,
    3000,
    'Khoảng 156 km với pin phụ',
    'LFP 1,5 kWh + pin phụ tùy chọn 1,5 kWh',
    '1920 × 694 × 1140',
    780,
    '10 lít với hai pin',
    'Xác thực pin; tính năng tìm xe/định vị E-Scooter',
  ),
  'feliz-2025': scooter(
    'Feliz phiên bản 2025 với màn hình LED màu và cấu hình pin phụ tùy chọn.',
    70,
    2800,
    'Khoảng 262 km với pin phụ',
    'LFP 2,4 kWh + pin phụ tùy chọn 2,4 kWh',
    '1920 × 694 × 1140',
    780,
    '34 lít',
    'Tính năng ứng dụng tìm xe và định vị là tùy chọn',
  ),
  'feliz-2027': scooter(
    'Feliz 2027 bổ sung hỗ trợ lùi và khởi hành ngang dốc.',
    70,
    2800,
    'Khoảng 262 km với pin phụ',
    'LFP 2,4 kWh + pin phụ tùy chọn 2,4 kWh',
    '1920 × 694 × 1140',
    780,
    '34 lít; 15 lít với pin phụ',
    'Đèn LED Projector; màn hình LED màu; ứng dụng tùy chọn',
  ),
  'evo-grand-limited': scooter(
    'Evo Grand Limited có Smart Key, hỗ trợ lùi và hỗ trợ đỗ trên dốc.',
    70,
    2250,
    'Khoảng 262 km với hai pin (thử nghiệm tiêu chuẩn)',
    'LFP 2,4 kWh + pin phụ tùy chọn 2,4 kWh',
    '1856 × 675 × 1133',
    770,
    '35 lít; 16 lít với pin phụ',
    'Tải trọng 130 kg; màu xanh ngọc và trắng sữa',
  ),
  'evo-grand-ii': scooter(
    'Evo Grand II trang bị hộc trước với cổng USB Type-A và Type-C.',
    70,
    2250,
    '262 km với pin phụ',
    'LFP 2,4 kWh + pin phụ tùy chọn 2,4 kWh',
    '1856 × 675 × 1133',
    770,
    '35 lít; 16 lít với pin phụ',
    'Khóa cơ; màn hình LED; ứng dụng tùy chọn',
  ),
  evo: scooter(
    'Evo sử dụng động cơ Inhub, có hộc trước và giảm xóc thủy lực.',
    70,
    2450,
    'Khoảng 165 km với pin phụ',
    'LFP 1,5 kWh + pin phụ tùy chọn 1,5 kWh',
    '1856 × 683 × 1133',
    770,
    '12 lít với hai pin',
    'Tính năng kết nối E-Scooter',
  ),
  amio: scooter(
    'Amio có pin bố trí dưới sàn và màn hình LED màu.',
    30,
    800,
    'Khoảng 65 km',
    'LFP 1,024 kWh',
    '1850 × 675 × 1130',
    750,
    '12 lít',
    'Phanh cơ; tính năng ứng dụng tùy chọn',
  ),
  'amio-s': scooter(
    'Amio S có yên cao 750 mm, khóa cơ và pin dưới sàn.',
    25,
    800,
    'Khoảng 65 km',
    'LFP 1,024 kWh; sạc đầy khoảng 6 giờ',
    '1715 × 690 × 1050',
    750,
    '12 lít',
    'Màn hình LED màu; công suất danh định 240 W',
  ),
  'amio-s2': scooter(
    'Amio S2 sử dụng màn hình LED màu và bộ pin đặt dưới sàn.',
    25,
    800,
    'Khoảng 65 km',
    'LFP 1,024 kWh',
    '1715 × 690 × 1050',
    750,
    '12 lít',
    'Phanh cơ; tính năng ứng dụng tùy chọn',
  ),
  flazz: scooter(
    'Flazz có đèn LED Projector và hỗ trợ lắp thêm pin.',
    39,
    1100,
    '135 km với pin phụ',
    'LFP 1,2 kWh + pin phụ tùy chọn 1,2 kWh',
    '1745 × 700 × 1050',
    760,
    '14 lít; 8 lít với pin phụ',
    'Ứng dụng kết nối là tùy chọn',
  ),
  'flazz-max': scooter(
    'Flazz Max có thân xe nhỏ gọn và đèn LED Projector.',
    49,
    1500,
    '87 km',
    'LFP 1,5 kWh',
    '1568 × 662 × 1007',
    750,
    '4 lít',
    'Ứng dụng kết nối là tùy chọn',
  ),
  zgoo: scooter(
    'ZGoo có hai chế độ vận hành, pin dưới sàn và màn hình LED màu.',
    39,
    1100,
    '70 km',
    'LFP 1,2 kWh',
    '1720 × 700 × 1050',
    760,
    '14 lít',
    'Đèn LED Projector; ứng dụng tùy chọn',
  ),
  'evo-lite': scooter(
    'Evo Lite có hai khay pin trong khoang chứa đồ và hệ thống đèn LED.',
    49,
    2300,
    'Khoảng 165 km với pin phụ',
    'LFP 1,5 kWh + pin phụ tùy chọn 1,5 kWh',
    '1850 × 675 × 1130',
    770,
    '12 lít với hai pin',
    'Đèn pha Projector; ứng dụng tùy chọn',
  ),
  'evo-grand-lite': scooter(
    'Evo Grand Lite có pin chính dưới sàn và lựa chọn pin phụ dung lượng lớn hơn.',
    48,
    1900,
    '198 km với pin phụ',
    'LFP 1,2 kWh + pin phụ tùy chọn 2,4 kWh',
    '1856 × 683 × 1133',
    770,
    '35 lít; 16 lít với pin phụ',
    'Đèn LED; phanh cơ',
  ),
  'evo-lite-neo': scooter(
    'Evo Lite Neo dùng bộ năm ắc quy nối tiếp, khác với các mẫu dùng pin LFP.',
    49,
    1600,
    'Khoảng 78 km ở tốc độ thử 30 km/h',
    '5 ắc quy 12 V / 21 Ah; tổng 1,26 kWh; sạc 220 W khoảng 10 giờ',
    '1806 × 678 × 1132',
    770,
    'Theo cấu hình xe',
    'Khối lượng gồm ắc quy 105 kg; phanh đĩa trước/cơ sau; màn hình HMI 4.5',
    {
      dimensions: [
        ['Kích thước (mm)', '1.806 × 678 × 1.132'],
        ['Khối lượng gồm ắc quy', '105 kg'],
      ],
    },
  ),
  drgnfly: car(
    'Xe đạp điện VF DrgnFly với khung nhôm, lốp rộng và cảm biến mô-men xoắn.',
    [
      ['Chiều dài', '173 cm'],
      ['Chiều dài cơ sở', '114,3 cm'],
      ['Chiều cao yên', '79,5 cm'],
    ],
    [
      ['Động cơ', '250 W, giới hạn bằng phần mềm'],
      ['Phạm vi hỗ trợ đạp', 'Tới 110 km'],
      ['Chạy hoàn toàn bằng ga', 'Tới 75 km'],
    ],
    [
      ['Pin tháo rời', 'Lithium-ion 47,2 V / 13,6 Ah / 640 Wh'],
      ['Bộ sạc', '160 W; hơn 5 giờ để sạc đầy'],
    ],
    [['Thiết kế', 'Khung nhôm; lốp rộng; cảm biến mô-men xoắn']],
    {
      note: 'Nguồn shop và trang chính có thông tin bảo hành không thống nhất. Không áp dụng mặc định bảo hành xe máy điện cho DrgnFly; cần xác nhận theo hồ sơ xe.',
      documents: [
        {
          title: 'Thông số và chính sách DrgnFly tại shop',
          url: 'https://shop.vinfastauto.com/vn_vi/xe-dap-dien-drgnfly.html',
        },
      ],
    },
  ),
};

const snapshot = [...carGroups, ...scooterGroups].flatMap(
  (group) => group.items,
);
export const extendedProducts = destinations
  .filter((page) => facts[page.id])
  .map((page) => {
    const home = snapshot.find((product) => product.id === page.productId);
    return {
      ...page,
      ...facts[page.id],
      image: facts[page.id].image || home?.image,
      snapshotPrice: home ? home.price * 1000000 : null,
    };
  });
