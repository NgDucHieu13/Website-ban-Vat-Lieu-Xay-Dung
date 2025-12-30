// Product Filter and Search System
class ProductFilter {
    constructor() {
        this.currentProducts = getAllProducts();
        this.currentCategory = 'all';
        this.currentSearchQuery = '';
         this.currentBrand = 'all'; 
        this.currentPriceRange = { min: 0, max: Infinity };
    
        this.initializeElements();
        this.bindEvents();
        this.loadCategoryFromURL();
        this.loadBrandFromURL();
        this.renderProducts();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.minPriceInput = document.getElementById('minPrice');
        this.maxPriceInput = document.getElementById('maxPrice');
        this.applyPriceFilterBtn = document.getElementById('applyPriceFilter');
        this.productsGrid = document.getElementById('productsGrid');
        this.productsCount = document.getElementById('productsCount');
        this.noProductsMessage = document.getElementById('noProductsMessage');
    }

    bindEvents() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.currentSearchQuery = e.target.value;
                this.filterProducts();
            });
        }

        // Category filter
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn')) {
                    this.setActiveCategory(e.target);
                    this.currentCategory = e.target.dataset.category;
                    this.filterProducts();
                }
            });
        }

        // Price filter
        if (this.applyPriceFilterBtn) {
            this.applyPriceFilterBtn.addEventListener('click', () => {
                this.applyPriceFilter();
            });
        }


        // Enter key on price inputs
        if (this.minPriceInput) {
            this.minPriceInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.applyPriceFilter();
            });
        }
        if (this.maxPriceInput) {
            this.maxPriceInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.applyPriceFilter();
            });
        }
    }

    loadCategoryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
            this.currentCategory = category;
            this.setActiveCategoryByCategory(category);
        }
    }

    loadBrandFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const brand = urlParams.get('brand');

        if (brand) {
            // Brand từ URL đã được normalize (ví dụ: "dong-tam", "ivc")
            this.currentBrand = brand;
        }
    }


    setActiveCategory(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
    }

    setActiveCategoryByCategory(category) {
        const button = document.querySelector(`[data-category="${category}"]`);
        if (button) {
            this.setActiveCategory(button);
        }
    }


    applyPriceFilter() {
        const minPrice = parseFloat(this.minPriceInput.value) || 0;
        const maxPrice = parseFloat(this.maxPriceInput.value) || Infinity;
        
        this.currentPriceRange = { min: minPrice, max: maxPrice };
        this.filterProducts();
    }

    filterProducts() {
        let filteredProducts = [...this.currentProducts];

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.currentCategory
            );
        }

        // Filter by search query
        if (this.currentSearchQuery.trim()) {
            const query = this.currentSearchQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        filteredProducts = filteredProducts.filter(product =>
            product.price >= this.currentPriceRange.min &&
            product.price <= this.currentPriceRange.max
        )

        // Filter by brand (case-insensitive, normalized)
        if (this.currentBrand !== 'all') {
             const targetBrand = this.normalizeBrand(this.currentBrand);
             filteredProducts = filteredProducts.filter(product =>
                 product.brand && this.normalizeBrand(product.brand) === targetBrand
            );
        }


        this.renderFilteredProducts(filteredProducts);
    }

    renderFilteredProducts(products) {
        if (!this.productsGrid) return;

        // Update products count
        if (this.productsCount) {
            this.productsCount.textContent = `Hiển thị ${products.length} sản phẩm`;
        }

        // Show/hide no products message
        if (this.noProductsMessage) {
            if (products.length === 0) {
                this.noProductsMessage.classList.remove('hidden');
                this.productsGrid.innerHTML = '';
            } else {
                this.noProductsMessage.classList.add('hidden');
                this.productsGrid.innerHTML = products.map(product => this.createProductCard(product)).join('');
            }
        } else {
            this.productsGrid.innerHTML = products.map(product => this.createProductCard(product)).join('');
        }
    }

    createProductCard(product) {
        const discountBadge = product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : '';
        const originalPrice = product.originalPrice ? `<span class="original-price">${product.originalPrice.toLocaleString('vi-VN')} VNĐ</span>` : '';
        const brandInfo = product.brand ? `<div class="product-brand">Thương hiệu: ${product.brand}</div>` : '';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${discountBadge}
                <a href="chitietsp.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                        ${brandInfo}
                    <div class="product-price">
                            ${originalPrice}
                            <span class="current-price">${product.price.toLocaleString('vi-VN')} VNĐ</span>
                        <span class="product-unit">/${product.unit}</span>
                        </div>
                    </div>
                </a>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id}); return false;">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
            </div>
        `;
    }

    renderProducts() {
        this.loadCategories();
        this.filterProducts(); 
    }

    loadCategories() {
        if (!this.categoryFilter) return;

        const categories = getAllCategories();
        const categoriesHTML = categories.map(category => `
            <button class="category-btn" data-category="${category.id}">
                ${category.icon} ${category.name}
            </button>
        `).join('');

        this.categoryFilter.innerHTML = `
            <button class="category-btn active" data-category="all">Tất cả</button>
            ${categoriesHTML}
        `;

        // Set active category
        this.setActiveCategoryByCategory(this.currentCategory);
    }


    normalizeBrand(brand) {
        if (!brand) return '';
        // Chuyển thành lowercase và loại bỏ khoảng trắng, dấu
        return brand.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
            .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd');
    }





    // Public methods for external use
    setCategory(category) {
        this.currentCategory = category;
        this.setActiveCategoryByCategory(category);
        this.filterProducts();
    }

    setBrand(brand) {
        this.currentBrand = brand;
        this.filterProducts();
    }


  
    setSearchQuery(query) {
        this.currentSearchQuery = query;
        if (this.searchInput) {
            this.searchInput.value = query;
        }
        this.filterProducts();
    }

    setPriceRange(min, max) {
        this.currentPriceRange = { min, max };
        if (this.minPriceInput) this.minPriceInput.value = min || '';
        if (this.maxPriceInput) this.maxPriceInput.value = max === Infinity ? '' : max;
        this.filterProducts();
    }

    clearFilters() {
        this.currentCategory = 'all';
        this.currentBrand = 'all';
        this.currentSearchQuery = '';
        this.currentPriceRange = { min: 0, max: Infinity };
        
        if (this.searchInput) this.searchInput.value = '';
        if (this.minPriceInput) this.minPriceInput.value = '';
        if (this.maxPriceInput) this.maxPriceInput.value = '';
        
        this.setActiveCategoryByCategory('all');
        this.filterProducts();
    }
}

// Initialize filter when DOM is loaded
let productFilter;

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on products page
    if (document.getElementById('productsGrid')) {
        productFilter = new ProductFilter();
    }
});

// Utility functions for external use
function filterByCategory(category) {
    if (productFilter) {
        productFilter.setCategory(category);
    }
}
function filterProductsByBrand(brand) {
    if (productFilter) {
        productFilter.setBrand(brand);
    }
}



function searchProducts(query) {
    if (productFilter) {
        productFilter.setSearchQuery(query);
    }
}

function filterByPrice(min, max) {
    if (productFilter) {
        productFilter.setPriceRange(min, max);
    }
}

function clearAllFilters() {
    if (productFilter) {
        productFilter.clearFilters();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductFilter;
}


