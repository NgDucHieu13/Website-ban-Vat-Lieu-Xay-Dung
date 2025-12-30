// Cart Management System
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateCartCount();
    }

    // Load cart from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('construction_materials_cart');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('construction_materials_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Product not found:', productId);
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                unit: product.unit,
                quantity: quantity
            });
        }

        this.saveToStorage();
        this.updateCartCount();
        this.showAddToCartMessage(product.name);
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartCount();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartCount();
            }
        }
    }

    // Get cart items
    getItems() {
        return this.items;
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get items count
    getItemsCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
    }

    // Update cart count display
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = this.getItemsCount();
        }
    }

    // Show add to cart message
    showAddToCartMessage(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Đã thêm "${productName}" vào giỏ hàng</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#cart-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Render cart items
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCartElement = document.getElementById('emptyCart');
        const cartSummaryElement = document.getElementById('cartSummary');
        
        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            if (emptyCartElement) emptyCartElement.classList.remove('hidden');
            if (cartSummaryElement) cartSummaryElement.classList.add('hidden');
            cartItemsContainer.innerHTML = '';
            return;
        }

        if (emptyCartElement) emptyCartElement.classList.add('hidden');
        if (cartSummaryElement) cartSummaryElement.classList.remove('hidden');

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">${item.price.toLocaleString('vi-VN')} VNĐ/${item.unit}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${item.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    // Update cart summary
    updateCartSummary() {
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');
        
        const total = this.getTotal();
        
        if (subtotalElement) {
            subtotalElement.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
        }
        
        if (totalElement) {
            totalElement.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
        }
    }

    // Submit order
    submitOrder(orderData) {
        // Validate order data
        if (!orderData.customerName || !orderData.customerPhone || !orderData.deliveryAddress) {
            throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
        }

        if (this.items.length === 0) {
            throw new Error('Giỏ hàng trống');
        }

        // Create order object
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            customer: orderData,
            items: [...this.items],
            total: this.getTotal(),
            status: 'pending'
        };

        // Save order to localStorage (in real app, this would be sent to server)
        try {
            const orders = JSON.parse(localStorage.getItem('construction_materials_orders') || '[]');
            orders.push(order);
            localStorage.setItem('construction_materials_orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving order:', error);
            throw new Error('Có lỗi xảy ra khi lưu đơn hàng');
        }

        // Clear cart after successful order
        this.clear();
        
        return order;
    }
}

// Global cart instance
const cart = new Cart();

// Global functions for HTML onclick events
function addToCart(productId) {
    cart.addItem(productId);
}

function removeFromCart(productId) {
    cart.removeItem(productId);
}

function updateCartCount() {
    cart.updateCartCount();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    cart.updateCartCount();
    
    // Render cart items if on cart page
    if (document.getElementById('cartItems')) {
        cart.renderCartItems();
        
        // Handle order form submission
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(orderForm);
                const orderData = {
                    customerName: formData.get('customerName'),
                    customerPhone: formData.get('customerPhone'),
                    customerEmail: formData.get('customerEmail'),
                    deliveryAddress: formData.get('deliveryAddress'),
                    orderNote: formData.get('orderNote')
                };
                
                try {
                    const order = cart.submitOrder(orderData);
                    
                    // Show success message
                    alert(`Đặt hàng thành công! Mã đơn hàng: ${order.id}\nChúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`);
                    
                    // Redirect to home page
                    window.location.href = 'index.html';
                    
                } catch (error) {
                    alert(error.message);
                }
            });
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}


