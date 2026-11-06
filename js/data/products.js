/**
 * SPORTZONE - Realistic Sports Products Dataset
 * 24 comprehensive products across 6 core categories
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus 40",
    category: "Shoes",
    brand: "Nike",
    price: 3490000,
    oldPrice: 3990000,
    discount: 13,
    rating: 4.9,
    reviewCount: 238,
    colors: [
      { name: "Đen Cam", hex: "#111827" },
      { name: "Trắng Xanh", hex: "#f8fafc" },
      { name: "Xám Bạc", hex: "#94a3b8" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 18,
    badge: "Best Seller",
    sport: "Running",
    level: "Intermediate",
    description: "Đôi giày chạy bộ huyền thoại với công nghệ đệm kép Zoom Air mang lại độ nảy tối đa và sự êm ái trên từng bước chạy, phù hợp từ cự ly 5km đến marathon.",
    features: [
      "Đệm kép Nike React kết hợp Zoom Air ở gót và mũi chân",
      "Lớp lưới mesh kỹ thuật số siêu thoáng khí",
      "Đế ngoài cao su Waffle tăng độ bám trên mọi bề mặt đường chạy",
      "Dây đai giữa bàn chân ôm sát và cố định bàn chân tối ưu"
    ],
    specs: {
      material: "Mesh thoáng khí + Đế cao su Carbon",
      origin: "Vietnam / Indonesia",
      sport: "Chạy bộ đường phố & Máy chạy",
      warranty: "12 tháng chính hãng"
    },
    image: "assets/images/products/shoes/running/nike-air-zoom-pegasus-40-01.jpg",
    images: [
      "assets/images/products/shoes/running/nike-air-zoom-pegasus-40-01.jpg",
      "assets/images/products/shoes/running/nike-air-zoom-pegasus-40-02.jpg",
      "assets/images/products/shoes/running/nike-air-zoom-pegasus-40-03.jpg",
      "assets/images/products/shoes/running/nike-air-zoom-pegasus-40-04.jpg"
    ]
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light 23",
    category: "Shoes",
    brand: "Adidas",
    price: 4200000,
    oldPrice: 5200000,
    discount: 19,
    rating: 4.8,
    reviewCount: 185,
    colors: [
      { name: "Trắng", hex: "#ffffff" },
      { name: "Đen Core", hex: "#0f172a" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 9,
    badge: "Flash Sale",
    sport: "Running",
    level: "Pro",
    description: "Nhẹ hơn 30% so với thế hệ Boost trước, mang lại khả năng hoàn trả năng lượng tối thượng cho những runner đam mê tốc độ.",
    features: [
      "Hạt Boost thế hệ mới siêu nhẹ",
      "Thân giày vải dệt PRIMEKNIT+ ôm chân như một lớp da thứ hai",
      "Hệ thống Linear Energy Push tăng độ bật vọt",
      "Đế Continental™ bám đường vượt trội cả trời mưa"
    ],
    specs: {
      material: "Primeknit dệt kim + Đế Continental",
      origin: "Vietnam",
      sport: "Running & Marathon",
      warranty: "12 tháng"
    },
    image: "assets/images/products/shoes/running/adidas-ultraboost-light-23-01.jpg",
    images: [
      "assets/images/products/shoes/running/adidas-ultraboost-light-23-01.jpg",
      "assets/images/products/shoes/running/adidas-ultraboost-light-23-02.jpg",
      "assets/images/products/shoes/running/adidas-ultraboost-light-23-03.jpg",
      "assets/images/products/shoes/running/adidas-ultraboost-light-23-04.jpg"
    ]
  },
  {
    id: 3,
    name: "Puma Future Ultimate FG/AG",
    category: "Football",
    brand: "Puma",
    price: 3890000,
    oldPrice: 4500000,
    discount: 14,
    rating: 4.7,
    reviewCount: 94,
    colors: [
      { name: "Xanh Neon", hex: "#22c55e" },
      { name: "Cam Rực", hex: "#ff4d00" }
    ],
    sizes: ["39", "40", "41", "42", "43"],
    stock: 14,
    badge: "Hot",
    sport: "Football",
    level: "Pro",
    description: "Giày đá bóng sân cỏ tự nhiên/nhân tạo với dải băng nén FUZIONFIT360 thích ứng khóa chặt chân mà vẫn tạo cảm giác bóng thanh thoát.",
    features: [
      "Cổ thun FUZIONFIT360 co giãn tối đa",
      "Vân 3D nổi tăng ma sát xoáy bóng",
      "Đế kép Dynamic Motion System siêu linh hoạt bứt tốc",
      "Trọng lượng siêu nhẹ chỉ 210g"
    ],
    specs: {
      material: "Da tổng hợp Microfiber + Đế TPU cao cấp",
      origin: "Cambodia",
      sport: "Bóng đá sân cỏ nhân tạo & tự nhiên",
      warranty: "6 tháng keo chỉ"
    },
    image: "assets/images/products/equipment/football/puma-future-ultimate-fg-ag-01.jpg",
    images: [
      "assets/images/products/equipment/football/puma-future-ultimate-fg-ag-01.jpg",
      "assets/images/products/equipment/football/puma-future-ultimate-fg-ag-02.jpg",
      "assets/images/products/equipment/football/puma-future-ultimate-fg-ag-03.jpg",
      "assets/images/products/equipment/football/puma-future-ultimate-fg-ag-04.jpg"
    ]
  },
  {
    id: 4,
    name: "Air Jordan 37 Low Basketball",
    category: "Basketball",
    brand: "Jordan",
    price: 4590000,
    oldPrice: 5190000,
    discount: 12,
    rating: 4.9,
    reviewCount: 312,
    colors: [
      { name: "Đỏ Đen Chicago", hex: "#b91c1c" },
      { name: "Trắng Băng", hex: "#f1f5f9" }
    ],
    sizes: ["41", "42", "43", "44", "45"],
    stock: 7,
    badge: "Best Seller",
    sport: "Basketball",
    level: "Pro",
    description: "Vũ khí trên sân bóng rổ với công nghệ đệm Formula 23 ở gót và đệm Zoom kép ở bàn chân trước cho những pha bật nhảy ném rổ hủy diệt.",
    features: [
      "Chất liệu Leno-weave nhẹ và chịu lực va đập cực tốt",
      "Bộ đệm Formula 23 cao cấp chống sốc khi tiếp đất",
      "Tấm sợi carbon giữa đế chống xoắn cổ chân",
      "Gai xương cá đa hướng bám sân gỗ cực dính"
    ],
    specs: {
      material: "Leno-weave + Formula 23 Foam + Carbon plate",
      origin: "Vietnam",
      sport: "Bóng rổ Indoor & Outdoor",
      warranty: "12 tháng"
    },
    image: "assets/images/products/equipment/basketball/air-jordan-37-low-basketball-01.jpg",
    images: [
      "assets/images/products/equipment/basketball/air-jordan-37-low-basketball-01.jpg",
      "assets/images/products/equipment/basketball/air-jordan-37-low-basketball-02.jpg",
      "assets/images/products/equipment/basketball/air-jordan-37-low-basketball-03.jpg",
      "assets/images/products/equipment/basketball/air-jordan-37-low-basketball-04.jpg"
    ]
  },
  {
    id: 5,
    name: "Áo Thun Thể Thao Dri-FIT Pro",
    category: "Clothing",
    brand: "Nike",
    price: 650000,
    oldPrice: 850000,
    discount: 24,
    rating: 4.8,
    reviewCount: 410,
    colors: [
      { name: "Đen", hex: "#111827" },
      { name: "Xám Titan", hex: "#475569" },
      { name: "Đỏ Sport", hex: "#dc2626" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    badge: "Flash Sale",
    sport: "Gym",
    level: "Beginner",
    description: "Chất vải thun lạnh dệt vi sợi Dri-FIT thấm hút mồ hôi siêu tốc, giữ cơ thể luôn khô thoáng và mát lạnh trong suốt buổi tập cường độ cao.",
    features: [
      "Công nghệ Dri-FIT khuếch tán mồ hôi nhanh",
      "Độ co giãn 4 chiều vận động không giới hạn",
      "Đường may phẳng Flatlock không gây cọ xát rát da",
      "Chống tia UV UPF 40+ khi tập ngoài trời"
    ],
    specs: {
      material: "88% Polyester, 12% Spandex",
      origin: "Vietnam",
      sport: "Gym, Running, Bóng đá, Đạp xe",
      warranty: "Đổi mới trong 30 ngày nếu lỗi chỉ"
    },
    image: "assets/images/products/clothing/shirts/o-thun-th-thao-dri-fit-pro-01.jpg",
    images: [
      "assets/images/products/clothing/shirts/o-thun-th-thao-dri-fit-pro-01.jpg",
      "assets/images/products/clothing/shirts/o-thun-th-thao-dri-fit-pro-02.jpg",
      "assets/images/products/clothing/shirts/o-thun-th-thao-dri-fit-pro-03.jpg",
      "assets/images/products/clothing/shirts/o-thun-th-thao-dri-fit-pro-04.jpg"
    ]
  },
  {
    id: 6,
    name: "Quần Short Tập Luyện 2 Lớp Combat",
    category: "Clothing",
    brand: "Under Armour",
    price: 590000,
    oldPrice: 750000,
    discount: 21,
    rating: 4.7,
    reviewCount: 167,
    colors: [
      { name: "Đen Cam", hex: "#0f172a" },
      { name: "Rằn Ri Xám", hex: "#334155" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 28,
    badge: "Hot",
    sport: "Gym",
    level: "Intermediate",
    description: "Thiết kế quần thể thao 2 lớp thông minh: lớp lót bó cơ nén giảm mỏi đùi kèm túi để điện thoại chắc chắn, lớp ngoài xẻ tà tối ưu squat.",
    features: [
      "Lớp lót Compression hỗ trợ lưu thông máu",
      "Túi phụ chống rung lắc đựng smartphone 6.7 inch",
      "Dây rút ẩn bên trong lưng thun co giãn chắc chắn",
      "Xẻ gấu tà tự do thực hiện động tác squat sâu"
    ],
    specs: {
      material: "Lớp ngoài Poly woven, Lớp trong Lycra nén",
      origin: "Vietnam",
      sport: "Gym thể hình, Cardio, Chạy bộ",
      warranty: "30 ngày"
    },
    image: "assets/images/products/clothing/pants/qu-n-short-t-p-luy-n-2-l-p-combat-01.jpg",
    images: [
      "assets/images/products/clothing/pants/qu-n-short-t-p-luy-n-2-l-p-combat-01.jpg",
      "assets/images/products/clothing/pants/qu-n-short-t-p-luy-n-2-l-p-combat-02.jpg",
      "assets/images/products/clothing/pants/qu-n-short-t-p-luy-n-2-l-p-combat-03.jpg",
      "assets/images/products/clothing/pants/qu-n-short-t-p-luy-n-2-l-p-combat-04.jpg"
    ]
  },
  {
    id: 7,
    name: "Bóng Đá Thi Đấu FIFA Pro Match Ball",
    category: "Football",
    brand: "Adidas",
    price: 1850000,
    oldPrice: 2200000,
    discount: 16,
    rating: 4.9,
    reviewCount: 88,
    colors: [
      { name: "Trắng Đa Sắc", hex: "#f8fafc" }
    ],
    sizes: ["Size 5"],
    stock: 22,
    badge: "Best Seller",
    sport: "Football",
    level: "Pro",
    description: "Bóng thi đấu chính thức đạt tiêu chuẩn FIFA Quality Pro, bề mặt ép nhiệt không đường chỉ cho đường bay quỹ đạo chính xác và chống thấm nước 100%.",
    features: [
      "Công nghệ ép nhiệt liên kết nhiệt Thermal Bonding",
      "Bề mặt kết cấu hạt nổi khí động học ổn định đường bay",
      "Ruột bóng cao su Butyl cao cấp giữ hơi suốt 3 tháng",
      "Chứng nhận FIFA Quality Pro thi đấu chuyên nghiệp"
    ],
    specs: {
      material: "100% Polyurethane kết cấu nhiệt",
      origin: "Pakistan",
      sport: "Bóng đá sân cỏ 11 người & 7 người",
      warranty: "1 đổi 1 trong 3 tháng nếu xì van"
    },
    image: "assets/images/products/equipment/football/b-ng-thi-u-fifa-pro-match-ball-01.jpg",
    images: [
      "assets/images/products/equipment/football/b-ng-thi-u-fifa-pro-match-ball-01.jpg",
      "assets/images/products/equipment/football/b-ng-thi-u-fifa-pro-match-ball-02.jpg",
      "assets/images/products/equipment/football/b-ng-thi-u-fifa-pro-match-ball-03.jpg",
      "assets/images/products/equipment/football/b-ng-thi-u-fifa-pro-match-ball-04.jpg"
    ]
  },
  {
    id: 8,
    name: "Bóng Rổ Wilson Evolution Indoor",
    category: "Basketball",
    brand: "Wilson",
    price: 1450000,
    oldPrice: 1750000,
    discount: 17,
    rating: 5.0,
    reviewCount: 340,
    colors: [
      { name: "Cam Truyền Thống", hex: "#ea580c" }
    ],
    sizes: ["Size 7 (Nam)"],
    stock: 19,
    badge: "Best Seller",
    sport: "Basketball",
    level: "Pro",
    description: "Quả bóng rổ số 1 tại các trường đại học và giải đấu NCAA Mỹ. Da composite Microfiber mềm mại cho độ bám tay tuyệt đỉnh ngay cả khi đổ mồ hôi.",
    features: [
      "Lớp vỏ da Microfiber độc quyền của Wilson cực êm",
      "Rãnh composite lõm sâu tăng độ cảm nhận ngón tay",
      "Lõi đệm Cushion Core Technology cho độ nảy chuẩn xác",
      "Bóng chuyên dụng cho sân trong nhà gỗ/thảm cao cấp"
    ],
    specs: {
      material: "Evo Microfiber Composite",
      origin: "USA / Thailand",
      sport: "Bóng rổ tiêu chuẩn thi đấu",
      warranty: "6 tháng van & tròn bóng"
    },
    image: "assets/images/products/equipment/basketball/b-ng-r-wilson-evolution-indoor-01.jpg",
    images: [
      "assets/images/products/equipment/basketball/b-ng-r-wilson-evolution-indoor-01.jpg",
      "assets/images/products/equipment/basketball/b-ng-r-wilson-evolution-indoor-02.jpg",
      "assets/images/products/equipment/basketball/b-ng-r-wilson-evolution-indoor-03.jpg",
      "assets/images/products/equipment/basketball/b-ng-r-wilson-evolution-indoor-04.jpg"
    ]
  },
  {
    id: 9,
    name: "Balo Thể Thao Chống Nước Pro Tour",
    category: "Accessories",
    brand: "Nike",
    price: 890000,
    oldPrice: 1190000,
    discount: 25,
    rating: 4.8,
    reviewCount: 142,
    colors: [
      { name: "Đen Nhám", hex: "#0f172a" },
      { name: "Xanh Navy", hex: "#1e3a8a" }
    ],
    sizes: ["30 Lít"],
    stock: 31,
    badge: "Hot",
    sport: "Gym",
    level: "Beginner",
    description: "Balo thể thao đa năng có ngăn riêng đựng giày thông gió khử mùi, ngăn chống sốc laptop 15.6 inch và vải trượt nước cao cấp.",
    features: [
      "Ngăn đáy đựng giày thể thao có lỗ thoát khí",
      "Chất liệu Polyester 900D chống rách và kháng nước",
      "Quai đeo công thái học đệm mút tổ ong giảm tải cột sống",
      "Ngăn giữ nhiệt 2 bên hông cho bình nước lạnh"
    ],
    specs: {
      material: "Polyester 900D trượt nước PU",
      origin: "Vietnam",
      sport: "Gym, Du lịch, Đi học, Đi làm",
      warranty: "24 tháng khóa kéo & đường may"
    },
    image: "assets/images/products/accessories/balo-th-thao-ch-ng-n-c-pro-tour-01.jpg",
    images: [
      "assets/images/products/accessories/balo-th-thao-ch-ng-n-c-pro-tour-01.jpg",
      "assets/images/products/accessories/balo-th-thao-ch-ng-n-c-pro-tour-02.jpg",
      "assets/images/products/accessories/balo-th-thao-ch-ng-n-c-pro-tour-03.jpg",
      "assets/images/products/accessories/balo-th-thao-ch-ng-n-c-pro-tour-04.jpg"
    ]
  },
  {
    id: 10,
    name: "Vợt Tennis Wilson Pro Staff v14",
    category: "Accessories",
    brand: "Wilson",
    price: 5290000,
    oldPrice: 5990000,
    discount: 11,
    rating: 4.9,
    reviewCount: 76,
    colors: [
      { name: "Đen Đồng", hex: "#292524" }
    ],
    sizes: ["Grip 2 (4 1/4)", "Grip 3 (4 3/8)"],
    stock: 8,
    badge: "New",
    sport: "Tennis",
    level: "Pro",
    description: "Cây vợt kinh điển gắn liền với tên tuổi Roger Federer, cải tiến cấu trúc sợi carbon Braid 45 mang lại khả năng kiểm soát bóng chuẩn xác từng milimet.",
    features: [
      "Cấu trúc bện sợi carbon kép Braid 45 độ",
      "Công nghệ Paradigm Bending tối ưu độ uốn khung vợt",
      "Cảm giác tiếp xúc bóng chân thực và đầm tay",
      "Trọng lượng 315g (chưa cước) cân bằng đầu vợt"
    ],
    specs: {
      material: "Graphite / Kevlar Carbon bện",
      origin: "USA / China",
      sport: "Tennis chuyên nghiệp",
      warranty: "12 tháng thân vợt"
    },
    image: "assets/images/products/accessories/v-t-tennis-wilson-pro-staff-v14-01.jpg",
    images: [
      "assets/images/products/accessories/v-t-tennis-wilson-pro-staff-v14-01.jpg",
      "assets/images/products/accessories/v-t-tennis-wilson-pro-staff-v14-02.jpg",
      "assets/images/products/accessories/v-t-tennis-wilson-pro-staff-v14-03.jpg",
      "assets/images/products/accessories/v-t-tennis-wilson-pro-staff-v14-04.jpg"
    ]
  },
  {
    id: 11,
    name: "Áo Khoác Gió Thể Thao Chống Nước Windrunner",
    category: "Clothing",
    brand: "Nike",
    price: 1390000,
    oldPrice: 1790000,
    discount: 22,
    rating: 4.8,
    reviewCount: 198,
    colors: [
      { name: "Đen Phối Trắng", hex: "#0f172a" },
      { name: "Xanh Olive", hex: "#3f6212" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 20,
    badge: "Flash Sale",
    sport: "Running",
    level: "Beginner",
    description: "Áo khoác chạy bộ gió kinh điển với họa tiết chữ V chevron 26 độ, lớp lót lưới thông hơi sau lưng giúp không bị bí nhiệt khi chạy dưới mưa phùn.",
    features: [
      "Chất vải Taffeta dệt chống gió và trượt nước",
      "Lớp lót lưới lưng thoát hơi nóng nhanh chóng",
      "Mũ trùm đầu có dây kéo rút tùy chỉnh",
      "Túi hai bên khóa kéo an toàn để chìa khóa & thẻ"
    ],
    specs: {
      material: "100% Polyester tái chế thân thiện môi trường",
      origin: "Vietnam",
      sport: "Chạy bộ ngoài trời, Đi phượt, Thường ngày",
      warranty: "6 tháng"
    },
    image: "assets/images/products/clothing/shirts/o-kho-c-gi-th-thao-ch-ng-n-c-windrunner-01.jpg",
    images: [
      "assets/images/products/clothing/shirts/o-kho-c-gi-th-thao-ch-ng-n-c-windrunner-01.jpg",
      "assets/images/products/clothing/shirts/o-kho-c-gi-th-thao-ch-ng-n-c-windrunner-02.jpg",
      "assets/images/products/clothing/shirts/o-kho-c-gi-th-thao-ch-ng-n-c-windrunner-03.jpg",
      "assets/images/products/clothing/shirts/o-kho-c-gi-th-thao-ch-ng-n-c-windrunner-04.jpg"
    ]
  },
  {
    id: 12,
    name: "Bộ Dây Kháng Lực Đa Năng 5 Mức Lực",
    category: "Gym",
    brand: "Under Armour",
    price: 390000,
    oldPrice: 550000,
    discount: 29,
    rating: 4.9,
    reviewCount: 520,
    colors: [
      { name: "Bộ 5 Màu", hex: "#e11d48" }
    ],
    sizes: ["Set 5 Dây"],
    stock: 65,
    badge: "Best Seller",
    sport: "Gym",
    level: "Beginner",
    description: "Bộ dụng cụ tập gym tại nhà toàn diện từ 10 lbs đến 50 lbs (tối đa 150 lbs khi kết hợp), kèm quai đeo chân, neo cửa và túi đựng du lịch tiện lợi.",
    features: [
      "100% mủ cao su tự nhiên thiên nhiên Malaysia độ bền cực cao",
      "Móc khóa kim loại chịu lực xoay 360 độ",
      "Tập luyện toàn thân: Ngực, Lưng, Tay, Chân, Mông",
      "Dễ dàng mang theo khi đi công tác, du lịch"
    ],
    specs: {
      material: "Natural Latex 100% không mùi độc hại",
      origin: "Malaysia",
      sport: "Gym tại nhà, Calisthenics, Phục hồi cơ",
      warranty: "12 tháng đổi mới nếu đứt"
    },
    image: "assets/images/products/equipment/gym/b-d-y-kh-ng-l-c-a-n-ng-5-m-c-l-c-01.jpg",
    images: [
      "assets/images/products/equipment/gym/b-d-y-kh-ng-l-c-a-n-ng-5-m-c-l-c-01.jpg",
      "assets/images/products/equipment/gym/b-d-y-kh-ng-l-c-a-n-ng-5-m-c-l-c-02.jpg",
      "assets/images/products/equipment/gym/b-d-y-kh-ng-l-c-a-n-ng-5-m-c-l-c-03.jpg",
      "assets/images/products/equipment/gym/b-d-y-kh-ng-l-c-a-n-ng-5-m-c-l-c-04.jpg"
    ]
  },
  {
    id: 13,
    name: "Găng Tay Thủ Môn Predator Pro Fingersave",
    category: "Football",
    brand: "Adidas",
    price: 2190000,
    oldPrice: 2600000,
    discount: 15,
    rating: 4.8,
    reviewCount: 65,
    colors: [
      { name: "Đen Cam Cháy", hex: "#ea580c" }
    ],
    sizes: ["Size 8", "Size 9", "Size 10"],
    stock: 11,
    badge: "Hot",
    sport: "Football",
    level: "Pro",
    description: "Găng tay thủ môn cao cấp với gai cao su Demonskin kiểm soát đấm bóng chính xác và nẹp ngón tay Fingersave chống lật ngón an toàn tuyệt đối.",
    features: [
      "Mặt mút cao su URG 2.0 siêu dính cả trong mưa",
      "Hệ thống nẹp xương Fingersave có thể tháo rời linh hoạt",
      "Thân găng dệt kim ôm sát cổ tay không cần băng quấn",
      "Gai cao su silicone tăng lực đấm bóng giải nguy"
    ],
    specs: {
      material: "Mút URG 2.0 Latex + Vải dệt Primeknit",
      origin: "Germany / Ukraine",
      sport: "Bóng đá - Vị trí Thủ môn",
      warranty: "3 tháng"
    },
    image: "assets/images/products/equipment/football/g-ng-tay-th-m-n-predator-pro-fingersave-01.jpg",
    images: [
      "assets/images/products/equipment/football/g-ng-tay-th-m-n-predator-pro-fingersave-01.jpg",
      "assets/images/products/equipment/football/g-ng-tay-th-m-n-predator-pro-fingersave-02.jpg",
      "assets/images/products/equipment/football/g-ng-tay-th-m-n-predator-pro-fingersave-03.jpg",
      "assets/images/products/equipment/football/g-ng-tay-th-m-n-predator-pro-fingersave-04.jpg"
    ]
  },
  {
    id: 14,
    name: "Bình Nước Giữ Nhiệt Thể Thao Hydrate 1000ml",
    category: "Accessories",
    brand: "Under Armour",
    price: 450000,
    oldPrice: 590000,
    discount: 23,
    rating: 4.9,
    reviewCount: 380,
    colors: [
      { name: "Đen Nhám", hex: "#111827" },
      { name: "Cam Sport", hex: "#ff4d00" },
      { name: "Xanh Băng", hex: "#0284c7" }
    ],
    sizes: ["1000ml"],
    stock: 50,
    badge: "Best Seller",
    sport: "Gym",
    level: "Beginner",
    description: "Bình nước thể thao inox 304 hai lớp chân không giữ lạnh 24 giờ và giữ ấm 12 giờ. Nắp bật uống nhanh một chạm có khóa an toàn chống tràn.",
    features: [
      "Thép không gỉ thực phẩm SUS 304 an toàn 100% không BPA",
      "Giữ đá lạnh nguyên vẹn lên đến 24 tiếng",
      "Nắp bật khóa lẫy chống rò rỉ kể cả khi dốc ngược",
      "Quai xách silicon êm ái tiện mang theo phòng gym"
    ],
    specs: {
      material: "Inox 304 kép hút chân không + Nắp PP",
      origin: "Vietnam",
      sport: "Mọi hoạt động thể thao & dã ngoại",
      warranty: "12 tháng giữ nhiệt"
    },
    image: "assets/images/products/accessories/b-nh-n-c-gi-nhi-t-th-thao-hydrate-1000ml-01.jpg",
    images: [
      "assets/images/products/accessories/b-nh-n-c-gi-nhi-t-th-thao-hydrate-1000ml-01.jpg",
      "assets/images/products/accessories/b-nh-n-c-gi-nhi-t-th-thao-hydrate-1000ml-02.jpg",
      "assets/images/products/accessories/b-nh-n-c-gi-nhi-t-th-thao-hydrate-1000ml-03.jpg",
      "assets/images/products/accessories/b-nh-n-c-gi-nhi-t-th-thao-hydrate-1000ml-04.jpg"
    ]
  },
  {
    id: 15,
    name: "Con Lăn Tập Cơ Bụng 4 Bánh Kèm Thảm",
    category: "Gym",
    brand: "Puma",
    price: 320000,
    oldPrice: 450000,
    discount: 28,
    rating: 4.7,
    reviewCount: 220,
    colors: [
      { name: "Đỏ Đen", hex: "#b91c1c" }
    ],
    sizes: ["Tiêu Chuẩn"],
    stock: 40,
    badge: "Flash Sale",
    sport: "Gym",
    level: "Intermediate",
    description: "Con lăn bụng cấu trúc 4 bánh tam giác vững chãi, tích hợp lò xo trợ lực hồi vị tự động giúp bảo vệ lưng dưới và tối đa hóa kích hoạt cơ múi bụng 6 múi.",
    features: [
      "Hệ thống 4 bánh xe tam giác không lo chông chênh ngã đổ",
      "Lò xo thép carbon hồi vị hỗ trợ kéo về nhẹ nhàng",
      "Tay cầm mút xốp EVA êm tay, thấm hút mồ hôi",
      "Tặng kèm thảm đệm đầu gối cao cấp"
    ],
    specs: {
      material: "Khung thép chịu lực 200kg + Nhựa ABS + Cao su TPR",
      origin: "Taiwan",
      sport: "Gym tập bụng tại nhà",
      warranty: "12 tháng"
    },
    image: "assets/images/products/equipment/gym/con-l-n-t-p-c-b-ng-4-b-nh-k-m-th-m-01.jpg",
    images: [
      "assets/images/products/equipment/gym/con-l-n-t-p-c-b-ng-4-b-nh-k-m-th-m-01.jpg",
      "assets/images/products/equipment/gym/con-l-n-t-p-c-b-ng-4-b-nh-k-m-th-m-02.jpg",
      "assets/images/products/equipment/gym/con-l-n-t-p-c-b-ng-4-b-nh-k-m-th-m-03.jpg",
      "assets/images/products/equipment/gym/con-l-n-t-p-c-b-ng-4-b-nh-k-m-th-m-04.jpg"
    ]
  },
  {
    id: 16,
    name: "Giày Chạy Bộ Nam Adizero Adios Pro 3",
    category: "Shoes",
    brand: "Adidas",
    price: 5490000,
    oldPrice: 6200000,
    discount: 11,
    rating: 5.0,
    reviewCount: 95,
    colors: [
      { name: "Cam Xanh Marathon", hex: "#f97316" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 6,
    badge: "New",
    sport: "Running",
    level: "Pro",
    description: "Đôi siêu giày đua phá kỷ lục thế giới marathon với thanh carbon ENERGYRODS 2.0 và 2 lớp bọt Lightstrike Pro siêu nảy.",
    features: [
      "Thanh carbon EnergyRods 2.0 đồng nhất lực đẩy bàn chân",
      "Bọt đệm Lightstrike Pro đàn hồi cao cấp nhất của Adidas",
      "Thân giày sợi dệt siêu nhẹ chỉ 218g",
      "Đế ngoài Continental mỏng dính tối ưu từng gram trọng lượng"
    ],
    specs: {
      material: "Dệt sợi Celermesh + Carbon EnergyRods",
      origin: "Vietnam",
      sport: "Chạy đua Marathon chuyên nghiệp",
      warranty: "12 tháng"
    },
    image: "assets/images/products/shoes/running/gi-y-ch-y-b-nam-adizero-adios-pro-3-01.jpg",
    images: [
      "assets/images/products/shoes/running/gi-y-ch-y-b-nam-adizero-adios-pro-3-01.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-nam-adizero-adios-pro-3-02.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-nam-adizero-adios-pro-3-03.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-nam-adizero-adios-pro-3-04.jpg"
    ]
  },
  {
    id: 17,
    name: "Túi Trống Thể Thao Đựng Đồ Gym Duffle 45L",
    category: "Accessories",
    brand: "Under Armour",
    price: 720000,
    oldPrice: 890000,
    discount: 19,
    rating: 4.8,
    reviewCount: 160,
    colors: [
      { name: "Xám Than", hex: "#334155" },
      { name: "Đen Cam", hex: "#0f172a" }
    ],
    sizes: ["45 Lít"],
    stock: 25,
    badge: "Hot",
    sport: "Gym",
    level: "Beginner",
    description: "Túi duffle thể thao chống nước công nghệ UA Storm, dung tích 45L rộng rãi chứa đủ đồ tập, giày, bình nước, đai lưng và đồ tắm.",
    features: [
      "Xử lý chống nước UA Storm trượt nước như lá sen",
      "Đáy và vách bên phủ lớp chống mài mòn gia cường",
      "Quai đeo vai HeatGear có thể tháo rời và điều chỉnh",
      "Ngăn thông gió đựng quần áo bẩn hoặc giày thể thao"
    ],
    specs: {
      material: "100% Polyester kháng nước cao",
      origin: "Vietnam",
      sport: "Gym, Thể thao cuối tuần, Du lịch ngắn ngày",
      warranty: "12 tháng"
    },
    image: "assets/images/products/accessories/t-i-tr-ng-th-thao-ng-gym-duffle-45l-01.jpg",
    images: [
      "assets/images/products/accessories/t-i-tr-ng-th-thao-ng-gym-duffle-45l-01.jpg",
      "assets/images/products/accessories/t-i-tr-ng-th-thao-ng-gym-duffle-45l-02.jpg",
      "assets/images/products/accessories/t-i-tr-ng-th-thao-ng-gym-duffle-45l-03.jpg",
      "assets/images/products/accessories/t-i-tr-ng-th-thao-ng-gym-duffle-45l-04.jpg"
    ]
  },
  {
    id: 18,
    name: "Quần Bó Cơ Nam Compression Pro Tights",
    category: "Clothing",
    brand: "Nike",
    price: 790000,
    oldPrice: 990000,
    discount: 20,
    rating: 4.9,
    reviewCount: 275,
    colors: [
      { name: "Đen Nhám", hex: "#0f172a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    badge: "Best Seller",
    sport: "Running",
    level: "Intermediate",
    description: "Quần bó nén cơ dài hỗ trợ giảm rung chấn cơ đùi và bắp chân, tăng cường tuần hoàn máu, hỗ trợ phục hồi và chống trầy xước.",
    features: [
      "Lực nén cơ học Gradient Compression tiêu chuẩn",
      "Công nghệ thấm hút mồ hôi và kháng khuẩn",
      "Lưng thun dệt kim mềm mại không hằn da",
      "Chi tiết phản quang an toàn khi chạy đêm"
    ],
    specs: {
      material: "83% Polyester, 17% Spandex co giãn 4 chiều",
      origin: "Vietnam",
      sport: "Chạy bộ, Bóng đá, Gym, Đạp xe",
      warranty: "30 ngày"
    },
    image: "assets/images/products/clothing/pants/qu-n-b-c-nam-compression-pro-tights-01.jpg",
    images: [
      "assets/images/products/clothing/pants/qu-n-b-c-nam-compression-pro-tights-01.jpg",
      "assets/images/products/clothing/pants/qu-n-b-c-nam-compression-pro-tights-02.jpg",
      "assets/images/products/clothing/pants/qu-n-b-c-nam-compression-pro-tights-03.jpg",
      "assets/images/products/clothing/pants/qu-n-b-c-nam-compression-pro-tights-04.jpg"
    ]
  },
  {
    id: 19,
    name: "Đai Lưng Cứng Hỗ Trợ Nâng Tạ Deadlift & Squat",
    category: "Gym",
    brand: "Under Armour",
    price: 680000,
    oldPrice: 850000,
    discount: 20,
    rating: 4.9,
    reviewCount: 190,
    colors: [
      { name: "Đen Viền Đỏ", hex: "#111827" }
    ],
    sizes: ["M (Vòng eo 75-85cm)", "L (Vòng eo 85-95cm)", "XL (Vòng eo >95cm)"],
    stock: 22,
    badge: "Hot",
    sport: "Gym",
    level: "Pro",
    description: "Đai lưng tập gym bản rộng 15cm cố định áp lực ổ bụng, bảo vệ cột sống thắt lưng an toàn tuyệt đối khi nâng tạ nặng như Squat, Deadlift, Overhead Press.",
    features: [
      "Lõi mút nén EVA đầm chắc không gãy gập",
      "Khóa lăn trượt kim loại kèm nhám gai dính siêu tải",
      "Đệm lót lưng thoáng khí chống trơn tuột khi ra mồ hôi",
      "Thiết kế ôm theo đường cong cơ thể tự nhiên"
    ],
    specs: {
      material: "Nylon 1000D + Thép không gỉ + EVA",
      origin: "Pakistan",
      sport: "Gym, Powerlifting, Thể hình",
      warranty: "12 tháng bung chỉ hoặc rách đai"
    },
    image: "assets/images/products/equipment/gym/ai-l-ng-c-ng-h-tr-n-ng-t-deadlift-squat-01.jpg",
    images: [
      "assets/images/products/equipment/gym/ai-l-ng-c-ng-h-tr-n-ng-t-deadlift-squat-01.jpg",
      "assets/images/products/equipment/gym/ai-l-ng-c-ng-h-tr-n-ng-t-deadlift-squat-02.jpg",
      "assets/images/products/equipment/gym/ai-l-ng-c-ng-h-tr-n-ng-t-deadlift-squat-03.jpg",
      "assets/images/products/equipment/gym/ai-l-ng-c-ng-h-tr-n-ng-t-deadlift-squat-04.jpg"
    ]
  },
  {
    id: 20,
    name: "Giày Bóng Rổ Giannis Immortality 3",
    category: "Basketball",
    brand: "Nike",
    price: 2290000,
    oldPrice: 2690000,
    discount: 15,
    rating: 4.8,
    reviewCount: 145,
    colors: [
      { name: "Xanh Mint Trắng", hex: "#a7f3d0" },
      { name: "Đen Cam", hex: "#1e293b" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 15,
    badge: "Flash Sale",
    sport: "Basketball",
    level: "Intermediate",
    description: "Được thiết kế cho lối chơi tốc độ và biến hóa như ngôi sao Giannis Antetokounmpo. Đế ngoài uốn cong theo gót chân mang lại chuyển động mượt mà từ gót sang mũi.",
    features: [
      "Bộ đệm xốp mềm hơn thế hệ trước cho cảm giác sân tốt",
      "Dây đai giữa bàn chân khóa chặt khi đổi hướng gắt",
      "Đế ngoài xẻ rãnh tăng tính linh hoạt khi Eurostep",
      "Thân giày lưới mesh nhẹ và cực thoáng"
    ],
    specs: {
      material: "Engineered Mesh + Foam Phylon + Cao su XDR",
      origin: "Vietnam",
      sport: "Bóng rổ sân ngoài trời và trong nhà",
      warranty: "6 tháng"
    },
    image: "assets/images/products/equipment/basketball/gi-y-b-ng-r-giannis-immortality-3-01.jpg",
    images: [
      "assets/images/products/equipment/basketball/gi-y-b-ng-r-giannis-immortality-3-01.jpg",
      "assets/images/products/equipment/basketball/gi-y-b-ng-r-giannis-immortality-3-02.jpg",
      "assets/images/products/equipment/basketball/gi-y-b-ng-r-giannis-immortality-3-03.jpg",
      "assets/images/products/equipment/basketball/gi-y-b-ng-r-giannis-immortality-3-04.jpg"
    ]
  },
  {
    id: 21,
    name: "Bộ Quần Áo Bóng Đá Thi Đấu Pro Match Kit",
    category: "Football",
    brand: "Puma",
    price: 490000,
    oldPrice: 650000,
    discount: 25,
    rating: 4.7,
    reviewCount: 310,
    colors: [
      { name: "Đỏ Trắng", hex: "#dc2626" },
      { name: "Xanh Hoàng Gia", hex: "#2563eb" },
      { name: "Vàng Đen", hex: "#eab308" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    badge: "Hot",
    sport: "Football",
    level: "Beginner",
    description: "Bộ quần áo đá banh vải mè kim cương thoát nhiệt nhanh, chống dính rít mồ hôi khi vận động 90 phút dưới thời tiết nắng nóng.",
    features: [
      "Vải mè lục giác siêu nhẹ, thoát hơi tức thì",
      "Cổ áo chữ V co giãn thoải mái khi tranh chấp",
      "In chuyển nhiệt sắc nét không bong tróc khi giặt máy",
      "Quần có dây rút co giãn và lót đáy chuyển động linh hoạt"
    ],
    specs: {
      material: "100% Polyester mè cao cấp",
      origin: "Vietnam",
      sport: "Bóng đá sân 5, 7, 11",
      warranty: "Bảo hành in ấn 12 tháng"
    },
    image: "assets/images/products/equipment/football/b-qu-n-o-b-ng-thi-u-pro-match-kit-01.jpg",
    images: [
      "assets/images/products/equipment/football/b-qu-n-o-b-ng-thi-u-pro-match-kit-01.jpg",
      "assets/images/products/equipment/football/b-qu-n-o-b-ng-thi-u-pro-match-kit-02.jpg",
      "assets/images/products/equipment/football/b-qu-n-o-b-ng-thi-u-pro-match-kit-03.jpg",
      "assets/images/products/equipment/football/b-qu-n-o-b-ng-thi-u-pro-match-kit-04.jpg"
    ]
  },
  {
    id: 22,
    name: "Bóng Tennis Wilson US Open (Hộp 4 Quả)",
    category: "Accessories",
    brand: "Wilson",
    price: 240000,
    oldPrice: 290000,
    discount: 17,
    rating: 4.9,
    reviewCount: 410,
    colors: [
      { name: "Vàng Tennis", hex: "#facc15" }
    ],
    sizes: ["Hộp 4 quả"],
    stock: 80,
    badge: "Best Seller",
    sport: "Tennis",
    level: "Intermediate",
    description: "Bóng nỉ thi đấu chính thức của giải Grand Slam US Open suốt hơn 40 năm. Lớp nỉ Tex/Tech I độc quyền cho độ bền cao và độ nảy ổn định trên mọi mặt sân cứng.",
    features: [
      "Lớp nỉ cao cấp phủ dày giảm bớt độ sờn khi ma sát sân cứng",
      "Lõi cao su thiên nhiên duy trì áp suất bên trong cực lâu",
      "Được Liên đoàn Quần vợt Quốc tế ITF chứng nhận",
      "Lon nén áp suất bằng kim loại giữ bóng mới 100%"
    ],
    specs: {
      material: "Nỉ len Tex/Tech I + Lõi cao su tự nhiên",
      origin: "Thailand",
      sport: "Tennis sân cứng & đất nện",
      warranty: "Chính hãng đóng lon chân không"
    },
    image: "assets/images/products/accessories/b-ng-tennis-wilson-us-open-h-p-4-qu-01.jpg",
    images: [
      "assets/images/products/accessories/b-ng-tennis-wilson-us-open-h-p-4-qu-01.jpg",
      "assets/images/products/accessories/b-ng-tennis-wilson-us-open-h-p-4-qu-02.jpg",
      "assets/images/products/accessories/b-ng-tennis-wilson-us-open-h-p-4-qu-03.jpg",
      "assets/images/products/accessories/b-ng-tennis-wilson-us-open-h-p-4-qu-04.jpg"
    ]
  },
  {
    id: 23,
    name: "Giày Chạy Bộ Nữ Ultraboost 1.0 DNA",
    category: "Shoes",
    brand: "Adidas",
    price: 3690000,
    oldPrice: 4200000,
    discount: 12,
    rating: 4.9,
    reviewCount: 160,
    colors: [
      { name: "Trắng Hồng", hex: "#fbcfe8" },
      { name: "Đen Tinh Tế", hex: "#1e293b" }
    ],
    sizes: ["36", "37", "38", "39", "40"],
    stock: 14,
    badge: "New",
    sport: "Running",
    level: "Intermediate",
    description: "Đôi giày thể thao vừa đáp ứng hoàn hảo cho việc chạy bộ tập luyện vừa thời thượng để phối đồ dạo phố với phần upper PRIMEKNIT và đế Boost trứ danh.",
    features: [
      "Thân giày adidas PRIMEKNIT ôm sát vừa vặn",
      "Đế giữa Boost hoàn trả năng lượng tối đa",
      "Khung gót đúc FITCOUNTER bảo vệ gân Achilles",
      "Đế ngoài Stretchweb bằng cao su Continental™ bám chắc"
    ],
    specs: {
      material: "Primeknit dệt + Boost Foam",
      origin: "Vietnam",
      sport: "Chạy bộ hàng ngày, Đi bộ & Lifestyle",
      warranty: "12 tháng"
    },
    image: "assets/images/products/shoes/running/gi-y-ch-y-b-n-ultraboost-1-0-dna-01.jpg",
    images: [
      "assets/images/products/shoes/running/gi-y-ch-y-b-n-ultraboost-1-0-dna-01.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-n-ultraboost-1-0-dna-02.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-n-ultraboost-1-0-dna-03.jpg",
      "assets/images/products/shoes/running/gi-y-ch-y-b-n-ultraboost-1-0-dna-04.jpg"
    ]
  },
  {
    id: 24,
    name: "Thảm Tập Yoga & Gym Chống Trượt Định Tuyến TPE 8mm",
    category: "Gym",
    brand: "Under Armour",
    price: 380000,
    oldPrice: 490000,
    discount: 22,
    rating: 4.8,
    reviewCount: 330,
    colors: [
      { name: "Xanh Ngọc", hex: "#0d9488" },
      { name: "Tím Pastel", hex: "#9333ea" }
    ],
    sizes: ["183 x 61 x 0.8 cm"],
    stock: 45,
    badge: "Best Seller",
    sport: "Gym",
    level: "Beginner",
    description: "Thảm tập cao su TPE đúc nguyên khối dày 8mm đàn hồi cao bảo vệ xương khớp, mặt thảm in laser đường định tuyến chuẩn xác hỗ trợ động tác.",
    features: [
      "Vật liệu TPE thân thiện môi trường, không mùi hôi cao su",
      "Độ dày 8mm giảm chấn tối đa cho khuỷu tay và đầu gối",
      "Vân lượn sóng 2 mặt bám sàn gạch và gỗ không bị xê dịch",
      "Tặng kèm dây đeo quai xách và túi lưới tiện lợi"
    ],
    specs: {
      material: "TPE đàn hồi cao cấp (Thermo Plastic Elastomer)",
      origin: "Vietnam",
      sport: "Yoga, Pilates, Plank, Gym tại nhà",
      warranty: "6 tháng"
    },
    image: "assets/images/products/equipment/gym/th-m-t-p-yoga-gym-ch-ng-tr-t-nh-tuy-n-tpe-8mm-01.jpg",
    images: [
      "assets/images/products/equipment/gym/th-m-t-p-yoga-gym-ch-ng-tr-t-nh-tuy-n-tpe-8mm-01.jpg",
      "assets/images/products/equipment/gym/th-m-t-p-yoga-gym-ch-ng-tr-t-nh-tuy-n-tpe-8mm-02.jpg",
      "assets/images/products/equipment/gym/th-m-t-p-yoga-gym-ch-ng-tr-t-nh-tuy-n-tpe-8mm-03.jpg",
      "assets/images/products/equipment/gym/th-m-t-p-yoga-gym-ch-ng-tr-t-nh-tuy-n-tpe-8mm-04.jpg"
    ]
  }
];

// Helper functions for data access
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  const numericId = parseInt(id, 10);
  return PRODUCTS_DATA.find(p => p.id === numericId) || null;
}

function getFeaturedProducts(limit = 8) {
  return PRODUCTS_DATA.slice(0, limit);
}

function getFlashSaleProducts(limit = 4) {
  return PRODUCTS_DATA.filter(p => p.badge === "Flash Sale" || p.discount >= 18).slice(0, limit);
}

function getRelatedProducts(category, currentId, limit = 4) {
  return PRODUCTS_DATA.filter(p => p.category === category && p.id !== parseInt(currentId, 10)).slice(0, limit);
}
