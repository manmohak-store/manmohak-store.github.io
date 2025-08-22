// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const header = document.getElementById('header');

// Menu Toggle Functionality
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
    
    // Close search if open
    if (searchBar.classList.contains('active')) {
        searchBar.classList.remove('active');
    }
});

// Search Toggle Functionality
searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('active');
    
    // Close menu if open
    if (mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Focus on search input when opened
    if (searchBar.classList.contains('active')) {
        setTimeout(() => {
            const searchInput = searchBar.querySelector('.search-input');
            searchInput.focus();
        }, 300);
    }
});

// Close menu and search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && !e.target.closest('.main-menu') && !e.target.closest('.search-bar')) {
        mainMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        searchBar.classList.remove('active');
    }
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    
    if (email) {
        // Simulate form submission
        newsletterInput.value = '';
        
        // Show success message
        const button = newsletterForm.querySelector('.newsletter-button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
});

// Product quick view functionality
document.querySelectorAll('.product-quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Simple alert for demo - in real app would open modal
        alert(`Quick view: ${productTitle}\n\nThis would open a product details modal in a real implementation.`);
    });
});

// Category button functionality
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryCard = button.closest('.category-card');
        const categoryTitle = categoryCard.querySelector('.category-title').textContent;
        
        // Simple alert for demo - in real app would navigate to category page
        alert(`Navigate to ${categoryTitle} category\n\nThis would redirect to the category page in a real implementation.`);
    });
});

// Hero button functionality
document.querySelector('.hero-button').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Smooth scroll to categories section
    const categoriesSection = document.querySelector('.categories');
    categoriesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Cart functionality (basic)
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`Shopping Cart\n\nItems: ${cartItems}\n\nThis would open the shopping cart in a real implementation.`);
});

// Simulate adding items to cart when clicking product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking quick view button
        if (!e.target.closest('.product-quick-view')) {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Add animation to cart icon
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.category-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial cart count
    cartCount.textContent = cartItems;
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close menu/search with Escape key
    if (e.key === 'Escape') {
        mainMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        searchBar.classList.remove('active');
    }
    
    // Open search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            setTimeout(() => {
                document.querySelector('.search-input').focus();
            }, 300);
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll handling can go here
}, 10));

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}