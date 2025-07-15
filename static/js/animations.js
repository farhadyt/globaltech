/**
 * GlobalTech Animation System
 * Handles all animations and interactive effects
 */

class AnimationSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize animations when page loads
        this.initCounterAnimations();
        this.initModuleAnimations();
        this.initBackgroundEffects();
        this.initHoverEffects();
        
        // Handle viewport changes
        this.handleViewportChange();
        window.addEventListener('resize', () => this.handleViewportChange());
    }
    
    // Counter animations for statistics
    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2500;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            counter.textContent = '0';
            
            const updateCounter = () => {
                step++;
                current = Math.min(Math.floor(increment * step), target);
                
                counter.textContent = current.toString().padStart(target.toString().length, ' ');
                
                if (current < target) {
                    setTimeout(() => requestAnimationFrame(updateCounter), duration / steps);
                } else {
                    counter.textContent = target;
                    counter.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    counter.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                    }, 300);
                }
            };
            
            setTimeout(() => {
                updateCounter();
            }, 300);
        });
    }
    
    // Module entrance animations
    initModuleAnimations() {
        const modules = document.querySelectorAll('.service-module');
        
        // Make sure modules are visible
        modules.forEach((module, index) => {
            // Remove any animation classes first
            module.style.animation = 'none';
            
            // Set initial state
            module.style.opacity = '0';
            module.style.transform = 'translateY(30px)';
            
            // Animate after delay
            setTimeout(() => {
                module.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                module.style.opacity = '1';
                module.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    // Background orb animations
    initBackgroundEffects() {
        const orbs = document.querySelectorAll('.gradient-orb');
        
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 5;
                const translateX = x * speed;
                const translateY = y * speed;
                
                orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
    }
    
    // Interactive hover effects
    initHoverEffects() {
        const modules = document.querySelectorAll('.service-module');
        
        modules.forEach(module => {
            module.addEventListener('mouseenter', (e) => {
                this.createGlowParticles(e.target);
            });
            
            module.addEventListener('mouseleave', (e) => {
                this.removeGlowParticles(e.target);
            });
        });
        
        const buttons = document.querySelectorAll('.primary-action-btn, .secondary-action-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    icon.style.animation = 'iconRotate 0.6s ease';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    icon.style.animation = '';
                }
            });
            
            button.addEventListener('click', (e) => {
                this.createRipple(e);
            });
        });
    }
    
    createGlowParticles(element) {
        if (element.dataset.particlesActive === 'true') return;
        element.dataset.particlesActive = 'true';
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'glow-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, rgba(0, 188, 212, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                    left: ${Math.random() * 100}%;
                    bottom: 0;
                    opacity: 0;
                `;
                
                element.appendChild(particle);
                
                particle.animate([
                    { 
                        transform: 'translateY(0) scale(1)',
                        opacity: 1
                    },
                    { 
                        transform: `translateY(-${30 + Math.random() * 20}px) translateX(${(Math.random() - 0.5) * 40}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 800 + Math.random() * 400,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }, i * 100);
        }
    }
    
    removeGlowParticles(element) {
        element.dataset.particlesActive = 'false';
        const particles = element.querySelectorAll('.glow-particle');
        particles.forEach(particle => particle.remove());
    }
    
    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            z-index: 10;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
    
    handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            document.documentElement.style.setProperty('--particle-count', '20');
        } else {
            document.documentElement.style.setProperty('--particle-count', '50');
        }
    }
}

// Additional animation styles
const animationStyles = `
<style>
@keyframes iconRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Remove animation from modules to prevent conflicts */
.service-module {
    animation: none !important;
}

/* Counter specific styles */
[data-count] {
    display: inline-block;
    transform-origin: center;
}

/* Performance optimization */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
    
    .gradient-orb {
        animation: none !important;
    }
}

/* High performance mode for low-end devices */
@media (max-width: 768px) {
    .gradient-orb {
        animation-duration: 30s !important;
    }
    
    .service-module {
        transition-duration: 0.3s !important;
    }
}
</style>
`;

// Inject animation styles
document.head.insertAdjacentHTML('beforeend', animationStyles);

// Initialize animation system
document.addEventListener('DOMContentLoaded', () => {
    new AnimationSystem();
});

// Make AnimationSystem globally available
window.AnimationSystem = AnimationSystem;

// Utility function for external use
window.GlobalTechAnimations = {
    animateCounter: (element, target) => {
        const duration = 1500;
        const increment = target / (duration / 16);
        let current = 0;
        
        const update = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };
        
        update();
    }
};