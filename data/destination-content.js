// Concise paraphrases of public official pages, checked 2026-11-12.
// No policy here is a replacement contract or a promise of service eligibility.
export const serviceContent = {
  'scooter-maintenance': {
    intro: 'Bảo dưỡng theo lịch riêng của từng mẫu xe và cấu hình pin.',
    sections: [
      [
        'Lịch bảo dưỡng',
        'Sử dụng lịch trong tài liệu đúng mẫu xe; không lấy chu kỳ của ô tô hoặc EBus áp dụng cho xe máy điện. Khi sử dụng thường xuyên, hãy trao đổi điều kiện vận hành với xưởng.',
      ],
      [
        'Nội dung kiểm tra',
        'Nguồn chính thức liệt kê hệ thống điện, quá trình nạp/xả pin, bộ điều khiển, tay ga, công tắc, phanh, giảm xóc, lốp và vệ sinh xe.',
      ],
      [
        'Chuẩn bị trước khi đến xưởng',
        'Gợi ý chuẩn bị: ghi lại biểu hiện bất thường, lịch bảo dưỡng gần nhất và cấu hình pin. Không tự tháo bộ pin hoặc sửa mạch điện để thực hiện bài mô phỏng.',
      ],
    ],
    docs: 'scooter-documents',
  },
  'scooter-repair': {
    intro:
      'Tìm hiểu dịch vụ sửa chữa và chuẩn bị thông tin cho đơn vị ủy quyền.',
    sections: [
      [
        'Dịch vụ được giới thiệu',
        'Trang VinFast giới thiệu kỹ thuật viên được đào tạo, phụ tùng chính hãng và lịch sử dịch vụ trong mạng lưới.',
      ],
      [
        'Thời gian và hỗ trợ',
        'Cam kết thời gian sửa chữa có điều kiện áp dụng. Pin cho mượn phụ thuộc khả năng cung cấp; không mặc định mọi sửa chữa đều được hỗ trợ tài chính.',
      ],
      [
        'Thông tin cần trao đổi',
        'Gợi ý: mô tả lỗi, thời điểm phát sinh, trạng thái báo lỗi trên màn hình và việc đã thực hiện. Đơn vị sửa chữa xác định phạm vi công việc và chi phí trước khi tiến hành.',
      ],
    ],
    docs: 'scooter-documents',
  },
  'ebus-warranty': {
    intro:
      'Thông tin bảo hành EBus theo điều kiện và loại linh kiện trong chính sách công bố.',
    sections: [
      [
        'Thời hạn công bố',
        'Xe: 5 năm, không giới hạn km từ ngày kích hoạt. Pin cao áp theo xe: 8 năm, không giới hạn km.',
      ],
      [
        'Các giới hạn riêng',
        'Ắc quy 12 V và phụ tùng thay thế chính hãng (trừ pin cao áp): 1 năm hoặc 60.000 km, tùy mốc đến trước. Pin cao áp mua riêng: 4 năm, không giới hạn km.',
      ],
      [
        'Phạm vi áp dụng',
        'Điều kiện sử dụng, bảo dưỡng và các loại trừ được quy định trong sổ bảo hành. Việc kiểm tra, sửa chữa bảo hành thực hiện qua mạng lưới được ủy quyền.',
      ],
    ],
    docs: 'ebus-documents',
  },
  'ebus-maintenance': {
    intro: 'Lịch EBus được công bố theo cả quãng đường và thời gian.',
    sections: [
      [
        'Chu kỳ',
        'Bảng nguồn dùng các mốc 5.000 km hoặc 1 tháng, tùy mốc đến trước, đến 120.000 km / 24 tháng. Luôn xác nhận đúng phiên bản EBus.',
      ],
      [
        'Ký hiệu và công việc',
        'I: kiểm tra; R: thay thế; F: bổ sung; C: vệ sinh. Bảng có kiểm tra má phanh ở mốc 5.000 km và vệ sinh lọc khí nén hằng tháng; từng hạng mục có lịch riêng.',
      ],
      [
        'Quản lý hồ sơ',
        'Gợi ý cho đơn vị vận hành: ghi số km, ngày kiểm tra, biểu hiện bất thường và công việc đã được xác nhận. Trang này không phát hành lệnh bảo dưỡng thực tế.',
      ],
    ],
    docs: 'ebus-documents',
    milestones: [
      ['5.000 km', '1 tháng'],
      ['10.000 km', '2 tháng'],
      ['60.000 km', '12 tháng'],
      ['120.000 km', '24 tháng'],
    ],
  },
  'ebus-repair': {
    intro: 'Liên hệ đơn vị dịch vụ EBus và tra cứu hồ sơ đúng cấu hình xe.',
    sections: [
      [
        'Đầu mối hỗ trợ',
        'Nguồn sửa chữa EBus công bố kênh hỗ trợ và liên kết sổ bảo hành EB6, EB8, EB10 cùng mục tra cứu tài liệu. Nguồn không công bố bảng giá hoặc cam kết thời gian sửa chữa chung.',
      ],
      [
        'Chuẩn bị yêu cầu',
        'Gợi ý cho đơn vị vận hành: ghi tên mẫu xe, thông tin nhận dạng trong hồ sơ nội bộ, quãng đường và mô tả lỗi để cung cấp trực tiếp cho xưởng. Bản mô phỏng không thu thập các thông tin này.',
      ],
      [
        'Kiểm tra tài liệu',
        'Mở sổ bảo hành tương ứng trước khi xác định quy trình tiếp nhận. Không dùng thông số EBus 6 m cho xe 8 m hoặc 10 m.',
      ],
    ],
    docs: 'ebus-documents',
  },
  'ebus-rescue': {
    intro: 'Hỗ trợ cứu hộ EBus qua kênh dịch vụ chính thức.',
    sections: [
      [
        'Phạm vi hỗ trợ',
        'Nguồn giới thiệu cứu hộ 24/7 tại thị trường được hỗ trợ. Trong thời hạn bảo hành, vận chuyển tới cơ sở ủy quyền gần nhất phụ thuộc phạm vi và loại trừ của chính sách.',
      ],
      [
        'Liên hệ',
        'Hotline được công bố: 1900 23 23 89. Đây là thông tin liên hệ chính thức; trang mô phỏng không điều phối cứu hộ hoặc xác nhận thời gian đến.',
      ],
      [
        'Trước khi liên hệ',
        'Chuẩn bị vị trí hiện tại và mô tả tình trạng để trao đổi trực tiếp với nhân viên hỗ trợ. Tuân thủ hướng dẫn của đơn vị cứu hộ và tài liệu an toàn dành cho đúng xe.',
      ],
    ],
    docs: 'ebus-documents',
  },
};

const cms = 'https://static-cms-prod.vinfastauto.com/';
const manual = cms + 'statics/owner-manual/e-scooter/';
const documents = (rows, base, category) =>
  rows.map(([model, file]) => ({
    model,
    title: `${category} ${model}`,
    category,
    url: base + file,
  }));
export const documentCatalogs = {
  'car-documents': documents(
    [
      ['VF 3', '250618_vf3_vn_vi_1.5_svc69000164aa.pdf'],
      ['VF 5', '250618_vf5_vn_vn_2.2_svc73000155aa.pdf'],
      ['VF 6', '250618_vf6_vn_vi_1.5_svc70001295aa.pdf'],
      ['VF 7', '260613_vf7_vn_vn_1.6_260810.pdf'],
      ['VF 9', 'brochure/260309_VF9_VN_VI_2.0.pdf'],
      ['Nerio Green', '250618_nerio-green_vn_vi_1.1_svc20000368aa.pdf'],
      ['Herio Green', '250618_herio_vn_vn_1.2_svc73000217aa.pdf'],
      ['Limo Green', '250312_wb_limogreen_vn_vi_250618.pdf'],
      ['EC Van', '260115_ecvan-wb_vn_vi_v2.pdf'],
      ['VF MPV 7', '260325_wb_mpv7_vn_vi_1.0.pdf'],
      ['Fadil', 'So%20bao%20Hanh%20-%20Fadil%20(FINAL)_1644573657.pdf'],
      ['Lux A2.0', 'So%20bao%20Hanh%20-%20LUX%20A%20(FINAL)_1644573676.pdf'],
      ['Lux SA2.0', 'So%20bao%20Hanh%20-%20LUX%20SA%20(FINAL)_1644573699.pdf'],
      ['President', 'So%20bao%20Hanh%20-%20PRESIDENT%20(FINAL)_1644573719.pdf'],
    ],
    cms,
    'Sổ bảo hành',
  ),
  'scooter-documents': documents(
    [
      [
        'Feliz 2025',
        'ESPCNE6BOL003-02-FELIZ_2025_ESPC_BOL_OWNER_MANUAL_VIE.pdf',
      ],
      ['Vero X', 'ESPCNE7BOL002-01-VERO_X_ESPC_BOL_OWNER_MANUAL_VIE.pdf'],
      [
        'Evo Lite Neo',
        'ESPCMDABOL002-01-EVO_LITE_NEO_ESPC_BOL_OWNER_MANUAL.pdf',
      ],
      [
        'Evo Grand Lite',
        'ESPCNE2BOL002-02-EVO_GRAND_LITE_ESPC_BOL_OWNER_MANUAL.pdf',
      ],
      ['ZGoo', 'ESPCNECBOL001-05-DG1_ZGOO_ESPC_BOL_OWNER_MANUAL.pdf'],
      ['Flazz', 'ESPCNEDBOL001-05-DG2_FLAZZ_ESPC_BOL_OWNER_MANUAL_VIE.pdf'],
      ['Evo', 'ESPCNE9BOL001-07-VINFAST_EVO_VN_ESPC_BOL_OWNER_MANUAL_VIE.pdf'],
      ['Feliz II', 'ESPCNEFBOL002-02-FELIZ_MAX_VN_ESPC_BOL_OWNER_MANUAL.pdf'],
    ],
    manual,
    'Hướng dẫn sử dụng',
  ),
  'ebus-documents': documents(
    [
      ['EB6', '250909_wb_ebus6m_vi_v1-svc43000000aa.pdf'],
      ['EB8', '251015_wb_ebus8m_vi_svc42000001ab-wip.pdf'],
      ['EB10', '251015_wb_ebus10_vi_svc40000017aa-wip.pdf'],
    ],
    cms,
    'Sổ bảo hành',
  ),
};

export const policyContent = {
  privacy: {
    version: 'Chính sách nguồn có hiệu lực từ 29/04/2025.',
    summary:
      'Chính sách mô tả dữ liệu cơ bản, nhạy cảm, nguồn thu thập, mục đích xử lý, lưu giữ, bảo vệ và quyền của chủ thể dữ liệu. Yêu cầu thực hiện quyền có thể cần xác minh danh tính.',
    points: [
      'Đọc phạm vi xử lý và bên tiếp nhận dữ liệu trong văn bản gốc trước khi cung cấp thông tin.',
      'Việc rút lại đồng ý hoặc yêu cầu xóa có thể ảnh hưởng đến khả năng tiếp tục một số dịch vụ theo chính sách nguồn.',
    ],
  },
  shipping: {
    summary:
      'Nguồn nêu việc giao nhận qua showroom đại lý được ủy quyền; không áp dụng giao trực tiếp cho giao dịch trên website đó.',
    points: [
      'Gợi ý kiểm tra: địa điểm, thời gian và chứng từ bàn giao trong thỏa thuận thực tế.',
      'Mô phỏng chọn xe không tạo đơn vận chuyển hoặc lịch nhận xe.',
    ],
  },
  returns: {
    summary:
      'Chính sách nguồn không cung cấp đổi trả; bảo hành và triệu hồi là các cơ chế riêng, với triệu hồi có thể bao gồm xe hết bảo hành.',
    points: [
      'Đối chiếu đúng sản phẩm và hợp đồng khi cần hỗ trợ.',
      'Trang mô phỏng không tiếp nhận hoặc phê duyệt yêu cầu đổi trả.',
    ],
  },
  disclaimer: {
    summary:
      'Văn bản nguồn đề cập vận hành kỹ thuật, tổn thất trong giao dịch và liên kết tới bên thứ ba.',
    points: [
      'Nội dung trên website học tập không phải báo giá hay cam kết của VinFast.',
      'Các liên kết nguồn mở trang chính thức trong tab mới; hãy kiểm tra địa chỉ trước khi giao dịch.',
    ],
  },
  'deposit-terms': {
    summary:
      'Điều khoản nguồn đề cập chấp nhận đơn, thanh toán, xác nhận, hiệu lực, thay đổi, chấm dứt và tranh chấp của thỏa thuận đặt cọc.',
    points: [
      'Không suy luận tiền đặt cọc luôn được hoàn lại; đọc điều kiện của thỏa thuận cụ thể.',
      'Bản mô phỏng không thu tiền, không ký hợp đồng và không giữ chỗ mua xe.',
    ],
  },
  complaints: {
    summary:
      'Nguồn nêu xác nhận tiếp nhận trong một ngày làm việc, sau đó phân loại, chuyển xử lý và xác nhận kết quả. Thời hạn giải quyết tùy vụ việc.',
    points: [
      'Gửi yêu cầu thật qua kênh chăm sóc khách hàng trong văn bản nguồn.',
      'Gợi ý chuẩn bị: nội dung phản ánh, mốc thời gian và chứng từ liên quan. Không nhập chúng vào bản mô phỏng.',
    ],
  },
};

export const contractDocuments = [
  {
    title: 'Mẫu hợp đồng mua bán xe điện',
    category: 'Hợp đồng',
    date: '2025-09-26',
    description: 'Mẫu công bố; không phải hợp đồng đã ký của người xem.',
    url: cms + 'vf_pc01.81_mau-hd-mua-ban-xe-dien-vf_26.09.2025_0.pdf',
  },
  {
    title: 'Cam kết chuyển đổi xanh',
    category: 'Chính sách',
    date: '2026-09-19',
    description:
      'Văn bản theo phiên bản công bố ngày 19/09/2026; kiểm tra điều kiện trong PDF.',
    url: cms + '19092026_cam-ket-chuyen-doi-xanh-tu-19.09.2026.pdf',
  },
];

const official = 'https://vinfastauto.com/vn_vi/';
export const newsItems = [
  {
    category: 'company-news',
    date: '2026-11-10',
    title: 'VinFast tại Vietbuild Hà Nội 2026',
    description:
      'Thông tin về hoạt động trưng bày và trải nghiệm xe điện tại triển lãm.',
    slug: 'vinfast-tai-trien-lam-quoc-te-vietbuild-ha-noi-2026-len-doi-xe-dien-chon-xe-chon-vinfast',
  },
  {
    category: 'company-news',
    date: '2026-10-06',
    title: 'VinFast công bố hợp tác xe buýt điện tại Mỹ',
    description:
      'Thông báo hợp tác với NexMove; kế hoạch bàn giao lô xe đầu tiên vào quý I/2028, chưa phải sự kiện đã bàn giao.',
    slug: 'vinfast-dua-xe-buyt-dien-vao-thi-truong-my-mo-rong-he-sinh-thai-giao-thong-xanh',
  },
  {
    category: 'car-news',
    date: '2026-05-20',
    title: 'Ra mắt VF 8 thế hệ mới',
    description:
      'Thông báo giới thiệu thế hệ VF 8 mới và các nâng cấp trải nghiệm.',
    slug: 'vinfast-ra-mat-vf-8-the-he-moi-nang-cap-trai-nghiem-toan-dien-cho-nguoi-dung',
  },
  {
    category: 'car-news',
    date: '2026-05-23',
    title: 'VF MPV 7 xuất xưởng tại Subang',
    description:
      'Thông tin về sản xuất VF MPV 7 tại nhà máy Subang, Indonesia.',
    slug: 'vinfast-chinh-thuc-xuat-xuong-vf-mpv-7-tai-nha-may-subang-day-nhanh-chien-luoc-noi-dia-hoa-o-indonesia',
  },
  {
    category: 'scooter-news',
    date: '2026-10-28',
    title: 'Chuỗi sự kiện Thu xăng đổi điện tại Vincom',
    description:
      'Thông báo chương trình dự kiến từ 31/10 đến 29/11/2026 tại 34 trung tâm thương mại; xem nguồn để biết điều kiện.',
    slug: 'don-cho-chuoi-su-kien-thu-xang-doi-dien-tai-34-tttm-vincom-tren-toan-quoc',
  },
  {
    category: 'scooter-news',
    date: '2026-10-19',
    title: 'Cập nhật bảo dưỡng định kỳ xe máy điện',
    description:
      'Khuyến nghị bảo dưỡng theo từng mẫu xe, cần đối chiếu với cấu hình đang sử dụng.',
    slug: 'cap-nhat-mot-so-noi-dung-bao-duong-dinh-ky-xe-may-dien-vinfast',
  },
].map((item) => ({ ...item, url: official + item.slug }));

export const locations = [
  {
    title: 'VinFast Nguyễn Văn Linh',
    category: 'Showroom / xưởng dịch vụ',
    address: 'Số 1 Nguyễn Văn Linh, Gia Thụy, Long Biên, Hà Nội',
    description:
      'Bài công bố khai trương 10/02/2022 giới thiệu showroom, xưởng và trạm sạc ô tô/xe máy.',
    date: '2022-02-10',
    url: official + 'showroom-vinfast-nguyen-van-linh',
  },
  {
    title: 'Trạm sạc tại Showroom Phạm Văn Đồng',
    category: 'Trạm sạc',
    address: '166 Phạm Văn Đồng, Xuân Đỉnh, Hà Nội',
    description: 'Địa điểm trong danh sách trạm sạc Hà Nội công bố năm 2022.',
    date: '2022',
    url: official + 'tram-sac-vinfast-ha-noi',
  },
  {
    title: 'Trạm sạc Vincom Center Metropolis',
    category: 'Trạm sạc',
    address: 'Cột M6, hầm B3, 29 Liễu Giai, Hà Nội',
    description:
      'Vị trí theo danh sách nguồn năm 2022; không có trạng thái cổng sạc trực tiếp.',
    date: '2022',
    url: official + 'tram-sac-vinfast-ha-noi',
  },
  {
    title: 'NPP 3S VinFast Phú Thành',
    category: 'Đại lý xe máy điện',
    address: '175 Quốc lộ 1A, đường Lê Hoàn, Quang Trung, Phủ Lý, Hà Nam',
    description: 'Đại lý được liệt kê trong bài công bố 07/07/2023.',
    date: '2023-07-07',
    url: official + 'dai-ly-xe-may-dien-vinfast-vung-dong-bang-song-hong',
  },
  {
    title: 'NPP 3S VinFast Thịnh Cường',
    category: 'Đại lý xe máy điện',
    address: 'Số 1/B1 lô 26BC, Lê Hồng Phong, Hải Phòng',
    description:
      'Đại lý trong danh sách năm 2023; địa chỉ giữ cách gọi ở thời điểm nguồn.',
    date: '2023-07-07',
    url: official + 'dai-ly-xe-may-dien-vinfast-vung-dong-bang-song-hong',
  },
  {
    title: 'VinFast Hòa Diệp',
    category: 'Đại lý xe máy điện',
    address: '239 Lạch Tray, Ngô Quyền, Hải Phòng',
    description: 'Đại lý trong danh sách năm 2023; cần xác nhận trước khi đến.',
    date: '2023-07-07',
    url: official + 'dai-ly-xe-may-dien-vinfast-vung-dong-bang-song-hong',
  },
];
