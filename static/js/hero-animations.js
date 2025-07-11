/**
 * GlobalTech Enterprise Command Interface
 * Modern Interactive Effects & Animations
 * Performance-Optimized for All Devices
 */

class GlobalTechCommandInterface {
    constructor() {
        this.isInitialized = false;
        this.counters = new Map();
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeSystem());
        } else {
            this.initializeSystem();
        }
    }
    
    initializeSystem() {
        if (this.isInitialized) return;
        
        console.log('🚀 Initializing GlobalTech Command Interface...');
        
        // Initialize all subsystems
        this.initMouseTracking();
        this.initTypingAnimations();
        this.initCounterAnimations();
        this.initModuleInteractions();
        this.initButtonEffects();
        this.initNavigationSystem();
        this.initParallaxEffects();
        this.initResponsiveHandlers();
        this.initAccessibilityFeatures();
        
        this.isInitialized = true;
        console.log('✅ GlobalTech Command Interface Online - All Systems Operational');
    }
    
    /**
     * Mouse Tracking for Interactive Effects
     */
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            this.updateModuleHighlights(e);
        });
    }
    
    updateModuleHighlights(e) {
        const modules = document.querySelectorAll('.service-module');
        
        modules.forEach(module => {
            const rect = module.getBoundingClientRect();
            const moduleX = rect.left + rect.width / 2;
            const moduleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - moduleX, 2) + 
                Math.pow(e.clientY - moduleY, 2)
            );
            
            const maxDistance = 200;
            const intensity = Math.max(0, 1 - distance / maxDistance);
            
            if (intensity > 0) {
                module.style.setProperty('--glow-intensity', intensity);
                const glowElement = module.querySelector('.module-glow');
                if (glowElement) {
                    glowElement.style.opacity = intensity * 0.5;
                }
            }
        });
    }
    
    /**
     * Advanced Typing Animation for Hero Titles
     */
    initTypingAnimations() {
        const typingElements = document.querySelectorAll('[data-text]');
        
        typingElements.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            if (text) {
                element.textContent = '';
                this.typeText(element, text, index * 800);
            }
        });
    }
    
    typeText(element, text, delay) {
        setTimeout(() => {
            let charIndex = 0;
            const typingSpeed = 60;
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);
            
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    const char = document.createTextNode(text.charAt(charIndex));
                    element.insertBefore(char, cursor);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        cursor.remove();
                    }, 600);
                }
            }, typingSpeed);
        }, delay);
    }
    
    /**
     * Animated Counters with Easing
     */
    initCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.counters.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.counters.set(entry.target, true);
                }
            });
        }, { threshold: 0.3 });
        
        counterElements.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Add completion effect
                element.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    /**
     * Enhanced Module Interactions
     */
    initModuleInteractions() {
        const modules = document.querySelectorAll('.service-module');
        
        modules.forEach(module => {
            // Mouse enter effect
            module.addEventListener('mouseenter', (e) => {
                this.activateModuleEffects(module);
                this.createGlowParticles(module);
            });
            
            // Mouse leave effect
            module.addEventListener('mouseleave', (e) => {
                this.deactivateModuleEffects(module);
            });
            
            // Click effect
            module.addEventListener('click', (e) => {
                this.createRippleEffect(e);
                this.handleModuleClick(module);
            });
            
            // Touch support
            module.addEventListener('touchstart', (e) => {
                this.activateModuleEffects(module);
            }, { passive: true });
            
            module.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    this.deactivateModuleEffects(module);
                }, 300);
            }, { passive: true });
        });
    }
    
    activateModuleEffects(module) {
        // Enhance icon rotation
        const iconBg = module.querySelector('.icon-background');
        if (iconBg) {
            iconBg.style.animation = 'iconRotate 1.5s linear infinite';
        }
        
        // Pulse status indicator
        const statusIcon = module.querySelector('.status-icon');
        if (statusIcon) {
            statusIcon.style.animation = 'statusPulse 0.4s ease-in-out infinite';
        }
        
        // Add active class
        module.classList.add('active');
    }
    
    deactivateModuleEffects(module) {
        const iconBg = module.querySelector('.icon-background');
        if (iconBg) {
            iconBg.style.animation = '';
        }
        
        const statusIcon = module.querySelector('.status-icon');
        if (statusIcon) {
            statusIcon.style.animation = 'statusPulse 2s ease-in-out infinite';
        }
        
        module.classList.remove('active');
    }
    
    createGlowParticles(module) {
        const rect = module.getBoundingClientRect();
        const particleCount = 3;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'glow-particle';
                
                const startX = Math.random() * rect.width;
                const startY = rect.height;
                
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: radial-gradient(circle, rgba(0, 188, 212, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    left: ${startX}px;
                    top: ${startY}px;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                module.appendChild(particle);
                
                // Animate particle
                const animation = particle.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(${(Math.random() - 0.5) * 60}px, -${30 + Math.random() * 30}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 800 + Math.random() * 400,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => particle.remove();
            }, i * 50);
        }
    }
    
    createRippleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 188, 212, 0.3) 0%, transparent 70%);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    handleModuleClick(module) {
        const service = module.getAttribute('data-service');
        console.log(`🎯 Service module activated: ${service}`);
        
        // Add click feedback
        module.style.transform = 'scale(0.99)';
        setTimeout(() => {
            module.style.transform = '';
        }, 100);
        
        // Show notification
        this.showNotification(`${service.replace('-', ' ').toUpperCase()} module selected`, 'info');
    }
    
    /**
     * Button Effects and Interactions
     */
    initButtonEffects() {
        const actionButtons = document.querySelectorAll('.primary-action-btn, .secondary-action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.animateButtonHover(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.resetButtonHover(button);
            });
            
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
                this.handleButtonClick(button);
            });
        });
    }
    
    animateButtonHover(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.animation = 'glowSweep 0.6s ease-out';
        }
        
        const icon = button.querySelector('.btn-icon');
        if (icon) {
            icon.style.animation = 'iconBounce 0.4s ease-out';
        }
    }
    
    resetButtonHover(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.animation = '';
        }
        
        const icon = button.querySelector('.btn-icon');
        if (icon) {
            icon.style.animation = '';
        }
    }
    
    handleButtonClick(button) {
        const buttonId = button.id;
        console.log(`🔘 Action button clicked: ${buttonId}`);
        
        // Show loading state
        this.showPageTransition();
        
        // Simulate action
        setTimeout(() => {
            this.hidePageTransition();
            this.showNotification('Action completed successfully!', 'success');
        }, 1200);
    }
    
    /**
     * Navigation System
     */
    initNavigationSystem() {
        const navItems = document.querySelectorAll('.nav-item');
        const adminButton = document.getElementById('adminLoginBtn');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(item);
            });
        });
        
        if (adminButton) {
            adminButton.addEventListener('click', () => {
                this.handleAdminLogin();
            });
        }
    }
    
    handleNavigation(item) {
        // Update active state
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const section = item.getAttribute('data-section');
        console.log(`🧭 Navigating to: ${section}`);
        
        // Add scan effect
        this.createScanEffect(item);
    }
    
    createScanEffect(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const scan = document.createElement('div');
        scan.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 188, 212, 0.3), 
                transparent
            );
            animation: scanSweep 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.appendChild(scan);
        setTimeout(() => scan.remove(), 600);
    }
    
    handleAdminLogin() {
        console.log('🔐 Admin authentication requested');
        
        const adminBtn = document.getElementById('adminLoginBtn');
        adminBtn.style.animation = 'securityPulse 0.8s ease-in-out';
        
        setTimeout(() => {
            adminBtn.style.animation = '';
            this.showAuthenticationDialog();
                            }, 800);
    }
    
    showAuthenticationDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'auth-dialog';
        dialog.innerHTML = `
            <div class="auth-content">
                <div class="auth-icon">
                    <i class="fas fa-fingerprint"></i>
                </div>
                <h3 class="auth-title">Biometric Authentication</h3>
                <p class="auth-description">Place your finger on the scanner to continue</p>
                <div class="auth-scanner">
                    <div class="scanner-line"></div>
                </div>
                <button class="auth-cancel" onclick="this.closest('.auth-dialog').remove()">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (dialog.parentElement) {
                dialog.style.animation = 'fadeOut 0.4s ease-out';
                setTimeout(() => dialog.remove(), 400);
            }
        }, 4000);
    }
    
    /**
     * Parallax Effects for Background Orbs
     */
    initParallaxEffects() {
        const orbs = document.querySelectorAll('.gradient-orb');
        
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 10;
                const translateX = x * speed;
                const translateY = y * speed;
                
                orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
    }
    
    /**
     * Page Transition Effects
     */
    showPageTransition() {
        const overlay = document.getElementById('pageTransition');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    hidePageTransition() {
        const overlay = document.getElementById('pageTransition');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    /**
     * Notification System
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 5);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 200);
        }, 2500);
    }
    
    /**
     * Responsive Behavior Management
     */
    initResponsiveHandlers() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 200);
        });
        
        this.handleResize();
    }
    
    handleResize() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        
        if (isMobile) {
            this.optimizeForMobile();
        } else if (isTablet) {
            this.optimizeForTablet();
        } else {
            this.optimizeForDesktop();
        }
        
        console.log(`📱 Viewport: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`);
    }
    
    optimizeForMobile() {
        // Reduce particle effects
        document.documentElement.style.setProperty('--particle-count', '2');
        
        // Simplify animations
        const modules = document.querySelectorAll('.service-module');
        modules.forEach(module => {
            module.style.willChange = 'auto';
        });
    }
    
    optimizeForTablet() {
        document.documentElement.style.setProperty('--particle-count', '3');
    }
    
    optimizeForDesktop() {
        document.documentElement.style.setProperty('--particle-count', '4');
        
        const modules = document.querySelectorAll('.service-module');
        modules.forEach(module => {
            module.style.willChange = 'transform';
        });
    }
    
    /**
     * Accessibility Features
     */
    initAccessibilityFeatures() {
        // Add keyboard navigation
        const modules = document.querySelectorAll('.service-module');
        modules.forEach((module, index) => {
            module.setAttribute('tabindex', '0');
            module.setAttribute('role', 'button');
            module.setAttribute('aria-label', module.querySelector('.module-title').textContent);
            
            module.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleModuleClick(module);
                }
            });
        });
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }
    
    disableAnimations() {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        console.log('🎯 Animations disabled for accessibility');
    }
    
    /**
     * Cleanup and Destruction
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousemove', this.updateModuleHighlights);
        
        console.log('🔌 GlobalTech Command Interface Offline');
    }
}

// Additional CSS animations and styles
const additionalStyles = `
<style>
/* Typing cursor */
.typing-cursor {
    color: var(--accent-cyan);
    animation: cursorBlink 1s ease-in-out infinite;
    font-weight: 300;
}

@keyframes cursorBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* Icon animations */
@keyframes iconRotate {
    0% { transform: rotate(45deg); }
    100% { transform: rotate(225deg); }
}

@keyframes iconBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}

/* Ripple effect */
@keyframes rippleExpand {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}

/* Scan effect */
@keyframes scanSweep {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes glowSweep {
    0% { left: -100%; }
    100% { left: 100%; }
}

/* Security pulse */
@keyframes securityPulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7);
    }
    50% {
        box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
    }
}

/* Authentication dialog */
.auth-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    animation: fadeIn 0.3s ease-out;
}

.auth-content {
    background: linear-gradient(145deg, 
        rgba(30, 40, 65, 0.95) 0%, 
        rgba(20, 27, 45, 0.98) 100%
    );
    border: 1px solid rgba(0, 188, 212, 0.3);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    max-width: 350px;
    width: 90%;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
}

.auth-icon {
    font-size: 3rem;
    color: var(--accent-cyan);
    margin-bottom: 1rem;
    animation: fingerPulse 2s ease-in-out infinite;
}

@keyframes fingerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.auth-title {
    color: var(--text-primary);
    font-family: var(--font-tech);
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
}

.auth-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.auth-scanner {
    width: 180px;
    height: 70px;
    background: rgba(0, 188, 212, 0.05);
    border: 2px solid rgba(0, 188, 212, 0.3);
    border-radius: 10px;
    margin: 0 auto 1.5rem;
    position: relative;
    overflow: hidden;
}

.scanner-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
        transparent, 
        var(--accent-cyan), 
        transparent
    );
    animation: scanLine 2s linear infinite;
}

@keyframes scanLine {
    0% { top: 0; }
    100% { top: 100%; }
}

.auth-cancel {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
    padding: 0.6rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-medium);
    font-size: 0.9rem;
}

.auth-cancel:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

/* Notifications */
.notification {
    position: fixed;
    top: 80px;
    right: -350px;
    background: linear-gradient(145deg, 
        rgba(30, 40, 65, 0.95) 0%, 
        rgba(20, 27, 45, 0.98) 100%
    );
    border: 1px solid rgba(0, 188, 212, 0.3);
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-primary);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    transition: right 0.3s ease-out;
    z-index: 1002;
    max-width: 280px;
    font-size: 0.9rem;
}

.notification.show {
    right: 15px;
}

.notification i {
    font-size: 1rem;
}

.notification-info i { color: var(--accent-cyan); }
.notification-success i { color: var(--accent-green); }
.notification-warning i { color: var(--accent-orange); }
.notification-error i { color: #f44336; }

/* Fade animations */
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
}

/* Module active state */
.service-module.active {
    transform: translateY(-3px) scale(1.01);
}

/* Performance optimizations */
.service-module,
.gradient-orb {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize the GlobalTech Command Interface
const globalTechInterface = new GlobalTechCommandInterface();

// Expose interface for external control
window.GlobalTechInterface = globalTechInterface;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    globalTechInterface.destroy();
});

// Utility functions
window.GlobalTechUtils = {
    // Smooth scroll to section
    scrollToSection: (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
    
    // Show custom notification
    showNotification: (message, type = 'info') => {
        globalTechInterface.showNotification(message, type);
    },
    
    // Toggle debug mode
    toggleDebug: () => {
        document.body.classList.toggle('debug-mode');
        console.log('🐛 Debug mode:', document.body.classList.contains('debug-mode'));
    },
    
    // Get system status
    getSystemStatus: () => {
        const modules = document.querySelectorAll('.service-module');
        const status = Array.from(modules).map(module => ({
            service: module.getAttribute('data-service'),
            active: module.classList.contains('active')
        }));
        console.table(status);
        return status;
    }
};

// Debug styles
const debugStyles = `
<style>
.debug-mode .service-module {
    outline: 2px dashed #ff9800 !important;
}

.debug-mode .module-glow {
    background: radial-gradient(circle, rgba(255, 152, 0, 0.3) 0%, transparent 70%) !important;
    opacity: 1 !important;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', debugStyles);

console.log('🎮 GlobalTech Interface initialized successfully!');
console.log('💡 Tips: Use window.GlobalTechUtils for utility functions');
console.log('🔧 Debug: window.GlobalTechUtils.toggleDebug()');
console.log('📊 Status: window.GlobalTechUtils.getSystemStatus()');