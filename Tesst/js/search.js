// Search Dropdown Functionality
class SearchDropdown {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchDropdown = null;
        this.init();
    }

    init() {
        if (!this.searchInput) return;

        // Tạo dropdown container
        this.createDropdown();

        // Bind events
        this.bindEvents();
    }

    createDropdown() {
        // Tạo dropdown element
        this.searchDropdown = document.createElement('div');
        this.searchDropdown.className = 'search-dropdown';
        this.searchDropdown.id = 'searchDropdown';
        
        // Tìm search-box container và thêm dropdown vào sau nó
        const searchBox = this.searchInput.closest('.search-box');
        if (searchBox) {
            searchBox.style.position = 'relative';
            searchBox.appendChild(this.searchDropdown);
        } else {
            // Fallback: thêm vào header-actions
            const headerActions = this.searchInput.closest('.header-actions');
            if (headerActions) {
                headerActions.style.position = 'relative';
                headerActions.appendChild(this.searchDropdown);
            }
        }
    }

    bindEvents() {
        // Input event
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                this.performSearch(query);
            } else {
                this.hideDropdown();
            }
        });

        // Focus event
        this.searchInput.addEventListener('focus', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                this.performSearch(query);
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideDropdown();
            }
        });

        // Enter key to go to products page
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    performSearch(query) {
        // Tìm kiếm sản phẩm
        let results = [];
        
        // Thử dùng hàm searchProducts từ products.js nếu có
        if (typeof searchProducts === 'function') {
            results = searchProducts(query);
        } else if (typeof getAllProducts === 'function') {
            // Fallback: tự tìm kiếm
            const allProducts = getAllProducts();
            const lowercaseQuery = query.toLowerCase();
            results = allProducts.filter(product =>
                product.name.toLowerCase().includes(lowercaseQuery) ||
                (product.description && product.description.toLowerCase().includes(lowercaseQuery)) ||
                (product.brand && product.brand.toLowerCase().includes(lowercaseQuery))
            );
        } else if (typeof products !== 'undefined' && Array.isArray(products)) {
            // Fallback: dùng mảng products trực tiếp
            const lowercaseQuery = query.toLowerCase();
            results = products.filter(product =>
                product.name.toLowerCase().includes(lowercaseQuery) ||
                (product.description && product.description.toLowerCase().includes(lowercaseQuery)) ||
                (product.brand && product.brand.toLowerCase().includes(lowercaseQuery))
            );
        }

        // Giới hạn kết quả (tối đa 5 sản phẩm)
        results = results.slice(0, 5);

        // Hiển thị kết quả
        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (!this.searchDropdown) return;

        if (results.length === 0) {
            this.searchDropdown.innerHTML = `
                <div class="search-dropdown-item no-results">
                    <p>Không tìm thấy sản phẩm nào cho "${query}"</p>
                </div>
            `;
        } else {
            this.searchDropdown.innerHTML = results.map(product => `
                <a href="chitietsp.html?id=${product.id}" class="search-dropdown-item">
                    <img src="${product.image}" alt="${product.name}" class="search-item-image">
                    <div class="search-item-info">
                        <div class="search-item-name">${this.highlightMatch(product.name, query)}</div>
                        <div class="search-item-price">${this.formatPrice(product.price)} ${product.unit ? '/' + product.unit : ''}</div>
                    </div>
                </a>
            `).join('');
        }

        this.showDropdown();
    }

    highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    }

    showDropdown() {
        if (this.searchDropdown) {
            this.searchDropdown.classList.add('show');
        }
    }

    hideDropdown() {
        if (this.searchDropdown) {
            this.searchDropdown.classList.remove('show');
        }
    }
}

// Initialize search dropdown when DOM is loaded
let searchDropdown;
document.addEventListener('DOMContentLoaded', function() {
    searchDropdown = new SearchDropdown();
});

