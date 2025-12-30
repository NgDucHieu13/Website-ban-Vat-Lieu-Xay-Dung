// Main JavaScript functionality
class MainApp {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeComponents();
        this.setupAnimations();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on nav links
            nav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler for header
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    initializeComponents() {
        // Initialize lazy loading for images
        this.initLazyLoading();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize form validations
        this.initFormValidations();
    }

    toggleMobileMenu() {
        const nav = document.getElementById('nav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (nav && mobileMenuToggle) {
            this.isMenuOpen = !this.isMenuOpen;
            
            if (this.isMenuOpen) {
                nav.classList.add('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        }
    }

    closeMobileMenu() {
        if (this.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(el => animationObserver.observe(el));
        } else {
            // Fallback: animate all elements immediately
            animatedElements.forEach(el => el.classList.add('animated'));
        }
    }

    initFormValidations() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Trường này là bắt buộc');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.isValidEmail(field.value)) {
                this.showFieldError(field, 'Email không hợp lệ');
                isValid = false;
            }
        });

        // Phone validation
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !this.isValidPhone(field.value)) {
                this.showFieldError(field, 'Số điện thoại không hợp lệ');
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    setupAnimations() {
        // Add CSS for animations
        if (!document.querySelector('#main-animations-styles')) {
            const style = document.createElement('style');
            style.id = 'main-animations-styles';
            style.textContent = `
                .header.scrolled {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                }
                
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease;
                }
                
                .animate-on-scroll.animated {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .field-error {
                    color: #e74c3c;
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                }
                
                .form-input.error {
                    border-color: #e74c3c;
                }
                
                .loading {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .fade-in {
                    animation: fadeIn 0.5s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .slide-up {
                    animation: slideUp 0.5s ease;
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            info: '#3498db',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="loading"></div>';
        }
    }

    hideLoading(element, originalContent) {
        if (element) {
            element.innerHTML = originalContent;
        }
    }
}

// Initialize app when DOM is loaded
let mainApp;

document.addEventListener('DOMContentLoaded', function() {
    mainApp = new MainApp();
});

// Global utility functions
function showNotification(message, type = 'info') {
    if (mainApp) {
        mainApp.showNotification(message, type);
    }
}

function showLoading(element) {
    if (mainApp) {
        mainApp.showLoading(element);
    }
}

function hideLoading(element, originalContent) {
    if (mainApp) {
        mainApp.hideLoading(element, originalContent);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainApp;
}


