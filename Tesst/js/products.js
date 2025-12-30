// Dữ liệu sản phẩm vật liệu xây dựng VLXD Giá Tốt
window.products = [
    // Sàn vinyl
    {
        id: 1,
        name: "SÀN VINYL CUỘN KHÁNG KHUẨN IVC IPERFORM CALAIS T34",
        category: "san-vinyl",
        price: 684000,
        originalPrice: 760000,
        image: "images/sp1.jpg",
        description: "Sàn vinyl cuộn kháng khuẩn cao cấp, phù hợp cho bệnh viện, phòng sạch.",
        inStock: true,
        unit: "m²",
        brand: "IVC",
        discount: 10
    },
    {
        id: 2,
        name: "SÀN VINYL CUỘN CÁCH ÂM KHÁNG KHUẨN IVC OPTIMISE OMBRA T72",
        category: "san-vinyl",
        price: 702000,
        originalPrice: 780000,
        image: "images/sp2.jpg",
        description: "Sàn vinyl cuộn cách âm kháng khuẩn, thiết kế hiện đại.",
        inStock: true,
        unit: "m²",
        brand: "IVC",
        discount: 10
    },
    {
        id: 3,
        name: "SÀN VINYL CUỘN CÁCH ÂM IVC COMFYTEX CAMARGUE 520",
        category: "san-vinyl",
        price: 351000,
        originalPrice: 390000,
        image: "images/sp3.jpg",
        description: "Sàn vinyl cuộn cách âm, phù hợp cho văn phòng, nhà ở.",
        inStock: true,
        unit: "m²",
        brand: "IVC",
        discount: 10
    },
    {
        id: 4,
        name: "SÀN VINYL CUỘN CÁCH ÂM IVC COMFYTEX CAMARGUE 522",
        category: "san-vinyl",
        price: 351000,
        originalPrice: 390000,
        image: "images/sp4.jpg",
        description: "Sàn vinyl cuộn cách âm, thiết kế đẹp mắt.",
        inStock: true,
        unit: "m²",
        brand: "IVC",
        discount: 10
    },

    // Gạch ốp lát
    {
        id: 5,
        name: "Gạch ốp tường Caesar 60x60",
        category: "gach",
        price: 450000,
        image: "images/gach1.jpg",
        description: "Gạch ốp tường Caesar cao cấp, thiết kế sang trọng.",
        inStock: true,
        unit: "m²",
        brand: "Caesar",
        discount: 25
    },
    {
        id: 6,
        name: "Gạch lát nền Viglacera 80x80",
        category: "gach",
        price: 380000,
        image: "images/gach2.jpg",
        description: "Gạch lát nền Viglacera, độ bền cao, dễ vệ sinh.",
        inStock: true,
        unit: "m²",
        brand: "Viglacera",
        discount: 25
    },
    {
        id: 7,
        name: "Gạch trang trí Eurotile",
        category: "gach",
        price: 280000,
        image: "images/gach3.jpg",
        description: "Gạch trang trí Eurotile, tạo điểm nhấn cho không gian.",
        inStock: true,
        unit: "m²",
        brand: "Eurotile"
    },
    {
        id: 8,
        name: "Gạch ốp tường Đồng Tâm",
        category: "gach",
        price: 320000,
        image: "images/gach4.jpg",
        description: "Gạch ốp tường Đồng Tâm, chất lượng tốt, giá hợp lý.",
        inStock: true,
        unit: "m²",
        brand: "Đồng Tâm"
    },

    // Gương
    {
        id: 9,
        name: "Gương dây treo 60x80",
        category: "guong",
        price: 450000,
        image: "images/guong1.jpg",
        description: "Gương dây treo cao cấp, thiết kế sang trọng cho phòng tắm.",
        inStock: true,
        unit: "cái"
    },
    {
        id: 10,
        name: "Gương gắn tường 80x120",
        category: "guong",
        price: 380000,
        image: "images/guong2.jpg",
        description: "Gương gắn tường lớn, phù hợp cho phòng khách, phòng ngủ.",
        inStock: true,
        unit: "cái"
    },
    {
        id: 11,
        name: "Gương khung viền nhôm",
        category: "guong",
        price: 520000,
        image: "images/guong3.jpg",
        description: "Gương khung viền nhôm cao cấp, thiết kế hiện đại.",
        inStock: true,
        unit: "cái"
    },
    {
        id: 12,
        name: "Gương LED 60x60",
        category: "guong",
        price: 680000,
        image: "images/guong4.jpg",
        description: "Gương LED tích hợp đèn, tiện lợi cho phòng tắm.",
        inStock: true,
        unit: "cái"
    },

    // Vật liệu mặt dựng
    {
        id: 13,
        name: "Tấm ốp kẽm nhựa Zinc Composite",
        category: "vat-lieu-mat-dung",
        price: 280000,
        image: "images/md1.jpg",
        description: "Tấm ốp kẽm nhựa Zinc Composite, chống ăn mòn, bền đẹp.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 14,
        name: "Tấm ốp lam nhựa ngoài trời",
        category: "vat-lieu-mat-dung",
        price: 320000,
        image: "images/md2.jpg",
        description: "Tấm ốp lam nhựa ngoài trời, chịu được thời tiết khắc nghiệt.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 15,
        name: "Tấm ốp nhôm nhựa Alu composite",
        category: "vat-lieu-mat-dung",
        price: 450000,
        image: "images/md3.jpg",
        description: "Tấm ốp nhôm nhựa Alu composite cao cấp, thiết kế sang trọng.",
        inStock: true,
        unit: "m²"
    },

    // Vật liệu ốp trần
    {
        id: 16,
        name: "Tấm ốp alu lam sóng",
        category: "vat-lieu-op-tran",
        price: 380000,
        image: "images/op1.jpg",
        description: "Tấm ốp alu lam sóng, thiết kế đẹp mắt cho trần nhà.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 17,
        name: "Tấm ốp lam sóng nhựa",
        category: "vat-lieu-op-tran",
        price: 280000,
        image: "images/op2.jpg",
        description: "Tấm ốp lam sóng nhựa, giá hợp lý, dễ thi công.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 18,
        name: "Thanh lam nhựa",
        category: "vat-lieu-op-tran",
        price: 150000,
        image: "images/op3.jpg",
        description: "Thanh lam nhựa, thiết kế đơn giản, dễ lắp đặt.",
        inStock: true,
        unit: "m"
    },

    // Nội thất
    {
        id: 19,
        name: "Sofa 3 chỗ ngồi",
        category: "noi-that",
        price: 8500000,
        image: "images/sofa1.jpg",
        description: "Sofa 3 chỗ ngồi cao cấp, thiết kế hiện đại, êm ái.",
        inStock: true,
        unit: "bộ"
    },
    {
        id: 20,
        name: "Giường ngủ gỗ tự nhiên",
        category: "noi-that",
        price: 12000000,
        image: "images/giuong1.jpg",
        description: "Giường ngủ gỗ tự nhiên, thiết kế sang trọng, bền đẹp.",
        inStock: true,
        unit: "bộ"
    },
    {
        id: 21,
        name: "Nệm cao su thiên nhiên",
        category: "noi-that",
        price: 3500000,
        originalPrice: 4500000,
        image: "images/nem1.jpg",
        description: "Nệm cao su thiên nhiên, êm ái, tốt cho sức khỏe.",
        inStock: true,
        unit: "cái",
        discount: 25
    },

    // Rèm cửa
    {
        id: 22,
        name: "Rèm vải Roman",
        category: "rem-cua",
        price: 450000,
        image: "images/rem1.jpg",
        description: "Rèm vải Roman cao cấp, thiết kế sang trọng.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 23,
        name: "Rèm cuốn văn phòng",
        category: "rem-cua",
        price: 320000,
        image: "images/rem2.jpg",
        description: "Rèm cuốn văn phòng, chống nắng, tiết kiệm năng lượng.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 24,
        name: "Rèm sáo nhôm",
        category: "rem-cua",
        price: 280000,
        image: "images/rem3.jpg",
        description: "Rèm sáo nhôm, điều chỉnh ánh sáng linh hoạt.",
        inStock: true,
        unit: "m²"
    },

    // Sàn gỗ
    {
        id: 25,
        name: "Sàn gỗ công nghiệp",
        category: "san-go",
        price: 450000,
        image: "images/san1.jpg",
        description: "Sàn gỗ công nghiệp, bền đẹp, dễ bảo trì.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 26,
        name: "Sàn gỗ kỹ thuật",
        category: "san-go",
        price: 380000,
        image: "images/san2.jpg",
        description: "Sàn gỗ kỹ thuật, chống ẩm, chống mối mọt.",
        inStock: true,
        unit: "m²"
    },
    {
        id: 27,
        name: "Sàn gỗ tự nhiên",
        category: "san-go",
        price: 680000,
        image: "images/san3.jpg",
        description: "Sàn gỗ tự nhiên cao cấp, vân gỗ đẹp tự nhiên.",
        inStock: true,
        unit: "m²"
    },

    // Thiết bị gia dụng
    {
        id: 28,
        name: "Bếp điện từ Bosch",
        category: "thiet-bi-gia-dung",
        price: 8500000,
        image: "images/bep1.jpg",
        description: "Bếp điện từ Bosch cao cấp, tiết kiệm điện, an toàn.",
        inStock: true,
        unit: "cái",
        brand: "Bosch"
    },
    {
        id: 29,
        name: "Tủ lạnh Samsung 300L",
        category: "thiet-bi-gia-dung",
        price: 12000000,
        image: "images/tulanh.jpg",
        description: "Tủ lạnh Samsung 300L, tiết kiệm điện, thiết kế hiện đại.",
        inStock: true,
        unit: "cái",
        brand: "Samsung"
    },
    {
        id: 30,
        name: "Máy giặt LG 8kg",
        category: "thiet-bi-gia-dung",
        price: 6500000,
        image: "images/lg.jpg",
        description: "Máy giặt LG 8kg, tiết kiệm nước, vận hành êm ái.",
        inStock: true,
        unit: "cái",
        brand: "LG"
    },

    // Thiết bị vệ sinh
    {
        id: 31,
        name: "Bàn cầu Toto",
        category: "thiet-bi-ve-sinh",
        price: 2800000,
        image: "images/bc.jpg",
        description: "Bàn cầu Toto cao cấp, tiết kiệm nước, dễ vệ sinh.",
        inStock: true,
        unit: "cái",
        brand: "Toto"
    },
    {
        id: 32,
        name: "Chậu rửa Inax",
        category: "thiet-bi-ve-sinh",
        price: 1200000,
        image: "images/cr.jpg",
        description: "Chậu rửa Inax, thiết kế sang trọng, dễ vệ sinh.",
        inStock: true,
        unit: "cái",
        brand: "Inax"
    },
    {
        id: 33,
        name: "Vòi sen Hafele",
        category: "thiet-bi-ve-sinh",
        price: 850000,
        image: "images/vs.jpg",
        description: "Vòi sen Hafele cao cấp, thiết kế hiện đại, bền đẹp.",
        inStock: true,
        unit: "bộ",
        brand: "Hafele"
    },
    {
        id: 34,
        name: "Bồn tắm Viva",
        category: "thiet-bi-ve-sinh",
        price: 4500000,
        image: "images/bt.jpg",
        description: "Bồn tắm Viva cao cấp, thiết kế sang trọng, tiện nghi.",
        inStock: true,
        unit: "cái",
        brand: "Viva"
    }
];

// Danh mục sản phẩm
const categories = [
    { id: "gach", name: "Gạch ốp lát", icon: "🧱" },
    { id: "guong", name: "Gương", icon: "🪞" },
    { id: "vat-lieu-mat-dung", name: "Vật liệu mặt dựng", icon: "🏢" },
    { id: "vat-lieu-op-tran", name: "Vật liệu ốp trần", icon: "🏠" },
    { id: "vat-lieu-op-tuong", name: "Vật liệu ốp tường", icon: "🧱" },
    { id: "noi-that", name: "Nội thất", icon: "🛋️" },
    { id: "rem-cua", name: "Rèm Cửa", icon: "🪟" },
    { id: "san-go", name: "Sàn gỗ", icon: "🪵" },
    { id: "san-vinyl", name: "Sàn vinyl", icon: "🏠" },
    { id: "thiet-bi-gia-dung", name: "Thiết bị gia dụng", icon: "🔌" },
    { id: "thiet-bi-ve-sinh", name: "Thiết bị vệ sinh", icon: "🚿" }
];



// Hàm lấy tất cả sản phẩm
window.getAllProducts = function getAllProducts() {
    return products;
}

// Hàm lấy sản phẩm theo ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Hàm lấy sản phẩm theo danh mục
function getProductsByCategory(categoryId) {
    return products.filter(product => product.category === categoryId);
}



// Hàm tìm kiếm sản phẩm
function searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        (product.brand && product.brand.toLowerCase().includes(lowercaseQuery))
    );
}

// Hàm lọc sản phẩm theo giá
function filterProductsByPrice(minPrice, maxPrice) {
    return products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
}

// Hàm lọc sản phẩm theo thương hiệu
function filterProductsByBrand(brand) {
    return products.filter(product => 
        product.brand && product.brand.toLowerCase().includes(brand.toLowerCase())
    );
}

// Hàm lấy tất cả danh mục
function getAllCategories() {
    return categories;
}

// Hàm lấy sản phẩm nổi bật (có giảm giá)
function getFeaturedProducts() {
    return products.filter(product => product.discount).slice(0, 6);
}

// Hàm lấy sản phẩm bán chạy (giá thấp nhất)
function getBestSellingProducts() {
    return [...products].sort((a, b) => a.price - b.price).slice(0, 6);
}

// Hàm lấy sản phẩm mới nhất
function getNewProducts() {
    return products.slice(0, 6);
}