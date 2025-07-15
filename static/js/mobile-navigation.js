/**
 * Mobile Navigation Handler
 * Responsive menu and viewport optimizations
 */

class MobileNavigation {
    constructor() {
        this.mobileBreakpoint = 768;
        this.isMenuOpen = false;
        this.init();
    }
    
    init() {
        this.createMobileMenu();
        this.handleResize();
        this.setupEventListeners();
        
        // Initial check
        this.checkViewport();
    }
    
    createMobileMenu() {
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.id = 'mobileMenuToggle';
        hamburger.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        // Create mobile menu overlay
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        mobileMenuOverlay.id = 'mobileMenuOverlay';
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobileMenu';
        
        // Clone navigation items
        const navItems = document.querySelectorAll('.nav-item');
        const mobileNavItems = document.createElement('div');
        mobileNavItems.className = 'mobile-nav-items';
        
        navItems.forEach(item => {
            const mobileItem = item.cloneNode(true);
            mobileItem.classList.add('mobile-nav-item');
            mobileItem.addEventListener('click', (e) => {
                e.preventDefault();
                const section = mobileItem.getAttribute('data-section');
                this.closeMenu();
                // Trigger content switch
                if (window.contentSwitcher) {
                    window.contentSwitcher.switchContent(section, mobileItem);
                }
            });
            mobileNavItems.appendChild(mobileItem);
        });
        
        // Add admin button to mobile menu
        const adminSection = document.querySelector('.admin-section');
        if (adminSection) {
            const mobileAdminBtn = adminSection.cloneNode(true);
            mobileAdminBtn.classList.add('mobile-admin-section');
            mobileNavItems.appendChild(mobileAdminBtn);
        }
        
        mobileMenu.appendChild(mobileNavItems);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => this.closeMenu());
        mobileMenu.appendChild(closeBtn);
        
        // Append to navigation
        const navigation = document.querySelector('.main-navigation');
        navigation.appendChild(hamburger);
        document.body.appendChild(mobileMenuOverlay);
        document.body.appendChild(mobileMenu);
    }
    
    setupEventListeners() {
        // Hamburger click
        const hamburger = document.getElementById('mobileMenuToggle');
        hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Overlay click
        const overlay = document.getElementById('mobileMenuOverlay');
        overlay.addEventListener('click', () => this.closeMenu());
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.isMenuOpen = true;
        document.getElementById('mobileMenu').classList.add('active');
        document.getElementById('mobileMenuOverlay').classList.add('active');
        document.getElementById('mobileMenuToggle').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('mobileMenuOverlay').classList.remove('active');
        document.getElementById('mobileMenuToggle').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleResize() {
        // Debounce resize event
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.checkViewport();
        }, 250);
    }
    
    checkViewport() {
        const width = window.innerWidth;
        const isMobile = width <= this.mobileBreakpoint;
        
        // Show/hide elements based on viewport
        const hamburger = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const adminSection = document.querySelector('.admin-section');
        
        if (isMobile) {
            hamburger.style.display = 'flex';
            navMenu.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
            if (adminSection) adminSection.style.display = 'flex';
            this.closeMenu();
        }
        
        // Update viewport height for mobile browsers
        this.updateViewportHeight();
    }
    
    updateViewportHeight() {
        // Fix for mobile browser viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

// Mobile navigation styles
const mobileNavStyles = `
<style>
/* Mobile Menu Toggle */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    margin-left: auto;
}

.hamburger-line {
    width: 100%;
    height: 3px;
    background: var(--accent-cyan);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Mobile Menu */
.mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: min(85vw, 320px);
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background: linear-gradient(135deg, #0a0f1c 0%, #141b2d 100%);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    transition: right 0.3s ease;
    z-index: 999;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.mobile-menu.active {
    right: 0;
}

/* Mobile Menu Close Button */
.mobile-menu-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-primary);
    font-size: 1.2rem;
}

.mobile-menu-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
}

/* Mobile Navigation Items */
.mobile-nav-items {
    padding: 80px 20px 20px;
    flex: 1;
}

.mobile-nav-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    margin-bottom: 5px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    width: 100%;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
    background: rgba(0, 188, 212, 0.1);
    color: var(--accent-cyan);
    transform: translateX(5px);
}

.mobile-nav-item i {
    font-size: 1.2rem;
    width: 25px;
    text-align: center;
}

.mobile-nav-item span {
    display: inline-block !important;
}

/* Mobile Admin Section */
.mobile-admin-section {
    margin-top: 20px;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-admin-section .admin-login-btn {
    width: 100%;
    justify-content: center;
}

/* Responsive Navigation Adjustments */
@media (max-width: 768px) {
    .nav-container {
        grid-template-columns: auto 1fr;
    }
    
    .brand-section {
        gap: 10px;
    }
    
    .brand-icon {
        width: 35px;
        height: 35px;
    }
    
    .brand-name {
        font-size: 1.1rem;
    }
    
    .dynamic-content {
        padding: 15px;
    }
    
    .service-modules-grid {
        gap: 12px;
    }
    
    .command-actions {
        position: sticky;
        bottom: 0;
        background: linear-gradient(to top, var(--primary-dark) 60%, transparent);
        padding: 20px 0 10px;
        margin: -20px -15px -15px;
    }
}

@media (max-width: 480px) {
    .mobile-menu {
        width: 100vw;
    }
    
    .hero-title {
        margin-bottom: 20px;
    }
    
    .hero-description {
        margin-bottom: 30px;
    }
}

/* Landscape mobile adjustment */
@media (max-height: 500px) and (orientation: landscape) {
    .main-navigation {
        height: 50px;
    }
    
    .main-content {
        top: 50px;
        height: calc(100vh - 50px);
    }
    
    .mobile-nav-item {
        padding: 10px 20px;
    }
}
</style>
`;

// Inject mobile styles
document.head.insertAdjacentHTML('beforeend', mobileNavStyles);

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = new MobileNavigation();
    
    // Make content switcher globally accessible
    if (window.ContentSwitcher) {
        window.contentSwitcher = new window.ContentSwitcher();
    }
});