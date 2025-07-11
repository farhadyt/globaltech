/**
 * GlobalTech Main JavaScript
 * Handles navigation, interactions, and global functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initPerformanceOptimizations();
});

/**
 * Navigation System
 */
function initNavigation() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sideNav = document.getElementById('sideNav');
    const sideNavOverlay = document.getElementById('sideNavOverlay');
    const closeSideNav = document.getElementById('closeSideNav');

    // Hamburger menu click
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleSideNav);
    }

    // Close button click
    if (closeSideNav) {
        closeSideNav.addEventListener('click', closeSideNavigation);
    }

    // Overlay click
    if (sideNavOverlay) {
        sideNavOverlay.addEventListener('click', closeSideNavigation);
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSideNavigation();
        }
    });

    function toggleSideNav() {
        if (sideNav && sideNavOverlay) {
            sideNav.classList.toggle('active');
            sideNavOverlay.classList.toggle('active');
            document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
        }
    }

    function closeSideNavigation() {
        if (sideNav && sideNavOverlay) {
            sideNav.classList.remove('active');
            sideNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeSideNavigation(); // Close mobile menu if open
            }
        });
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const navbar = document.querySelector('.futuristic-navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (navbar) {
            // Add/remove scrolled class based on scroll position
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.server-room-hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Animation System
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        [data-animate].animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .futuristic-navbar.scrolled {
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(15px);
            box-shadow: 0 2px 20px rgba(0, 255, 255, 0.1);
        }
        
        .futuristic-navbar {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Performance Optimizations
 */
function initPerformanceOptimizations() {
    // Detect device capabilities
    const isLowEnd = detectLowEndDevice();
    
    if (isLowEnd) {
        // Reduce animations for low-end devices
        document.body.classList.add('low-performance');
        
        // Add CSS for reduced animations
        const style = document.createElement('style');
        style.textContent = `
            .low-performance * {
                animation-duration: 0.2s !important;
                transition-duration: 0.2s !important;
            }
            
            .low-performance .particles-container {
                display: none;
            }
            
            .low-performance .environmental-effects {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
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

    // Preload critical resources
    preloadCriticalResources();
}

function detectLowEndDevice() {
    // Check various performance indicators
    const factors = {
        memory: navigator.deviceMemory && navigator.deviceMemory < 4,
        cores: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
        mobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        slowConnection: navigator.connection && 
                       (navigator.connection.effectiveType === 'slow-2g' || 
                        navigator.connection.effectiveType === '2g')
    };

    // Return true if multiple factors indicate low-end device
    const lowEndFactors = Object.values(factors).filter(Boolean).length;
    return lowEndFactors >= 2;
}

function preloadCriticalResources() {
    // Preload hero background images
    const criticalImages = [
        // Add any critical image URLs here
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Utility Functions
 */

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Global scroll to section function
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openContact() {
    window.location.href = '/contact/';
}

// Add global functions to window for HTML onclick handlers
window.scrollToServices = scrollToServices;
window.openContact = openContact;

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.warn('JavaScript error:', e.error);
    // You can add error reporting here
});

/**
 * Page Visibility API for performance
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Add styles for page visibility optimization
const visibilityStyle = document.createElement('style');
visibilityStyle.textContent = `
    .page-hidden * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(visibilityStyle);