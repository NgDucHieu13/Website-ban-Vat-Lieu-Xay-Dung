// Chi tiết sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showNotFound();
        return;
    }

    // Lấy sản phẩm theo ID
    const product = findProductById(parseInt(productId));

    if (!product) {
        showNotFound();
        return;
    }

    // Hiển thị thông tin sản phẩm
    displayProduct(product);
});

function findProductById(id) {
    // Tìm sản phẩm từ products.js
    if (typeof getAllProducts === 'function') {
        const allProducts = getAllProducts();
        return allProducts.find(p => p.id === id);
    }
    // Fallback: tìm trong mảng products từ products.js
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        return products.find(p => p.id === id);
    }
    return null;
}

function displayProduct(product) {
    // Ẩn loading, hiện content
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('productDetailContent').classList.remove('hidden');

    // Hiển thị hình ảnh
    const mainImage = document.getElementById('productMainImage');
    if (mainImage) {
        mainImage.src = product.image || 'images/placeholder.jpg';
        mainImage.alt = product.name;
    }

    // Hiển thị tên
    const productName = document.getElementById('productName');
    if (productName) {
        productName.textContent = product.name;
    }

    // Breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }

    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory && product.category) {
        breadcrumbCategory.textContent = getCategoryName(product.category);
    }

    // Thương hiệu
    const productBrand = document.getElementById('productBrand');
    if (productBrand) {
        if (product.brand) {
            productBrand.textContent = product.brand;
            productBrand.classList.remove('hidden');
        } else {
            productBrand.classList.add('hidden');
        }
    }

    // Danh mục
    const productCategory = document.getElementById('productCategory');
    if (productCategory && product.category) {
        productCategory.textContent = getCategoryName(product.category);
    }

    // Giá
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }

    // Đơn vị
    const productUnit = document.getElementById('productUnit');
    const productUnitSpec = document.getElementById('productUnitSpec');
    if (productUnit && product.unit) {
        productUnit.textContent = '/' + product.unit;
    }
    if (productUnitSpec && product.unit) {
        productUnitSpec.textContent = product.unit;
    }

    // Giá gốc và giảm giá
    const originalPriceWrapper = document.getElementById('originalPriceWrapper');
    const originalPrice = document.getElementById('originalPrice');
    const discountBadge = document.getElementById('discountBadge');
    
    if (product.originalPrice && product.originalPrice > product.price) {
        if (originalPriceWrapper) originalPriceWrapper.classList.remove('hidden');
        if (originalPrice) originalPrice.textContent = formatPrice(product.originalPrice);
        if (discountBadge && product.discount) {
            discountBadge.textContent = '-' + product.discount + '%';
        }
    } else {
        if (originalPriceWrapper) originalPriceWrapper.classList.add('hidden');
    }

    // Mô tả
    const productDescription = document.getElementById('productDescription');
    if (productDescription) {
        productDescription.textContent = product.description || 'Không có mô tả chi tiết.';
    }

    // Trạng thái
    const productStock = document.getElementById('productStock');
    if (productStock) {
        if (product.inStock) {
            productStock.textContent = 'Còn hàng';
            productStock.className = 'spec-value in-stock';
        } else {
            productStock.textContent = 'Hết hàng';
            productStock.className = 'spec-value out-of-stock';
        }
    }

    // Xử lý số lượng
    const quantityInput = document.getElementById('productQuantity');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', function() {
            if (quantityInput && parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', function() {
            if (quantityInput) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    }

    // Nút thêm vào giỏ hàng
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            addToCart(product, quantity);
        });
    }
}

function getCategoryName(categoryId) {
    const categoryMap = {
        "gach": "Gạch ốp lát",
        "guong": "Gương",
        "vat-lieu-mat-dung": "Vật liệu mặt dựng",
        "vat-lieu-op-tran": "Vật liệu ốp trần",
        "vat-lieu-op-tuong": "Vật liệu ốp tường",
        "noi-that": "Nội thất",
        "rem-cua": "Rèm Cửa",
        "san-go": "Sàn gỗ",
        "san-vinyl": "Sàn vinyl",
        "thiet-bi-gia-dung": "Thiết bị gia dụng",
        "thiet-bi-ve-sinh": "Thiết bị vệ sinh"
    };
    return categoryMap[categoryId] || categoryId;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function addToCart(product, quantity) {
    // Sử dụng cart instance từ cart.js nếu có
    if (typeof cart !== 'undefined' && cart && typeof cart.addItem === 'function') {
        cart.addItem(product.id, quantity);
    } else {
        // Fallback: lưu vào localStorage
        let cartItems = JSON.parse(localStorage.getItem('construction_materials_cart')) || [];
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                unit: product.unit || '',
                quantity: quantity
            });
        }
        
        localStorage.setItem('construction_materials_cart', JSON.stringify(cartItems));
        
        // Cập nhật số lượng giỏ hàng
        updateCartCount();
        
        // Thông báo
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        try {
            const cartItems = JSON.parse(localStorage.getItem('construction_materials_cart')) || [];
            const total = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
            cartCount.textContent = total;
        } catch (e) {
            cartCount.textContent = '0';
        }
    }
}

function showNotFound() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('productNotFound').classList.remove('hidden');
}

// Cập nhật số lượng giỏ hàng khi load trang
setTimeout(updateCartCount, 100);

