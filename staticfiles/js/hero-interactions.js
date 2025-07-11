// Simple Hero Interactions
class HeroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupButtonEffects();
        this.setupResponsiveHandling();
    }

    setupHoverEffects() {
        // Server rack hover effects
        const serverRacks = document.querySelectorAll('.server-rack');
        serverRacks.forEach(rack => {
            rack.addEventListener('mouseenter', () => {
                this.enhanceRack(rack);
            });
            
            rack.addEventListener('mouseleave', () => {
                this.resetRack(rack);
            });
        });

        // Server unit hover effects
        const serverUnits = document.querySelectorAll('.server-unit');
        serverUnits.forEach(unit => {
            unit.addEventListener('mouseenter', () => {
                this.createDataFlow(unit);
            });
        });
    }

    enhanceRack(rack) {
        rack.style.transform = 'scale(1.02)';
        rack.style.borderColor = '#00ffff';
        rack.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
    }

    resetRack(rack) {
        rack.style.transform = '';
        rack.style.borderColor = '';
        rack.style.boxShadow = '';
    }

    createDataFlow(unit) {
        const dataParticle = document.createElement('div');
        dataParticle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            box-shadow: 0 0 8px #00ffff;
            left: 0%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            pointer-events: none;
        `;

        unit.style.position = 'relative';
        unit.appendChild(dataParticle);

        // Animate particle
        let position = 0;
        const animateParticle = () => {
            position += 2;
            dataParticle.style.left = position + '%';
            
            if (position < 100) {
                requestAnimationFrame(animateParticle);
            } else {
                dataParticle.remove();
            }
        };
        
        animateParticle();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });
    }

    createRippleEffect(button, event) {
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
            background: rgba(0, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Add ripple animation CSS if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupResponsiveHandling() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Adjust effects based on screen size
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            this.reduceMobileEffects();
        } else {
            this.restoreDesktopEffects();
        }
    }

    reduceMobileEffects() {
        const style = document.createElement('style');
        style.id = 'mobile-optimizations';
        style.textContent = `
            .server-rack:hover {
                transform: scale(1.01) !important;
            }
            .btn-primary:hover, .btn-secondary:hover {
                transform: translateY(-1px) !important;
            }
        `;
        
        if (!document.querySelector('#mobile-optimizations')) {
            document.head.appendChild(style);
        }
    }

    restoreDesktopEffects() {
        const mobileStyle = document.querySelector('#mobile-optimizations');
        if (mobileStyle) {
            mobileStyle.remove();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new HeroInteractions();
    }, 100);
});