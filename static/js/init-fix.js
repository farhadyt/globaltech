/**
 * Initialization fixes and adjustments
 * Ensures all components work together properly
 */

// Fix for content switcher visibility
window.ContentSwitcher = ContentSwitcher;

// Initialize everything in correct order
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all scripts are loaded
    setTimeout(() => {
        // Initialize content switcher globally
        if (!window.contentSwitcher && window.ContentSwitcher) {
            window.contentSwitcher = new ContentSwitcher();
        }
        
        // Fix viewport height on mobile
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        
        // Ensure home content is visible initially
        const homeContent = document.getElementById('home-content');
        if (homeContent && !homeContent.classList.contains('active')) {
            homeContent.classList.add('active');
        }
        
        // Fix for mobile menu admin button
        const mobileAdminBtn = document.querySelector('.mobile-admin-section .admin-login-btn');
        if (mobileAdminBtn) {
            mobileAdminBtn.addEventListener('click', () => {
                if (window.contentSwitcher) {
                    window.contentSwitcher.showAdminLogin();
                }
                // Close mobile menu
                const mobileNav = document.querySelector('.mobile-menu');
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (mobileNav) mobileNav.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            });
        }
        
        console.log('✅ GlobalTech Interface initialized successfully!');
    }, 100);
});

// Additional responsive fixes
const responsiveFixes = `
<style>
/* Fix for full viewport height */
.main-content {
    height: calc(100vh - clamp(50px, 8vh, 80px));
    height: calc((var(--vh, 1vh) * 100) - clamp(50px, 8vh, 80px));
}

/* Ensure content doesn't overflow on mobile */
.dynamic-content {
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

/* Fix for iOS safe areas */
@supports (padding: max(0px)) {
    .main-navigation {
        padding-left: max(var(--space-md), env(safe-area-inset-left));
        padding-right: max(var(--space-md), env(safe-area-inset-right));
    }
    
    .mobile-menu {
        padding-bottom: max(20px, env(safe-area-inset-bottom));
    }
}

/* Ensure buttons are clickable on mobile */
.primary-action-btn,
.secondary-action-btn,
.service-action-btn {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}

/* Fix for service modules on very small screens */
@media (max-width: 360px) {
    .service-module {
        min-height: 180px;
    }
    
    .module-stats {
        flex-direction: column;
        gap: 5px;
    }
    
    .stat-separator {
        display: none;
    }
}

/* Landscape phone fix */
@media (max-height: 450px) and (orientation: landscape) {
    .interface-header {
        margin-bottom: 10px;
    }
    
    .hero-title {
        font-size: 1.5rem;
    }
    
    .service-modules-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    
    .service-module {
        height: 150px;
        padding: 10px;
    }
    
    .module-icon-wrapper {
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
    }
    
    .module-stats {
        display: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', responsiveFixes);