// Simple Hero Background Effects
class HeroBackgroundEffects {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Server Rack Interactions
class ServerRackInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupLEDAnimations();
        this.setupHoverEffects();
        this.setupButtonEffects();
    }

    setupLEDAnimations() {
        const leds = document.querySelectorAll('.led.blink');
        leds.forEach((led, index) => {
            setInterval(() => {
                led.style.opacity = led.style.opacity === '0.3' ? '1' : '0.3';
            }, 1000 + (index * 200));
        });
    }

    setupHoverEffects() {
        const serverUnits = document.querySelectorAll('.server-unit');
        serverUnits.forEach(unit => {
            unit.addEventListener('mouseenter', () => {
                this.createDataFlow(unit);
            });
        });
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay for better performance
    setTimeout(() => {
        new HeroBackgroundEffects();
        new ServerRackInteractions();
    }, 100);
});