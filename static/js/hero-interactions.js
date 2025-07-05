/**
 * Hero Section Interactive Elements
 * Handles user interactions, data flow animations, and responsive behaviors
 */

class HeroInteractions {
    constructor() {
        this.isInitialized = false;
        this.dataFlowAnimations = [];
        this.networkConnections = [];
        this.systemAlerts = [];
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupDataFlow();
        this.setupNetworkConnections();
        this.setupSystemMonitoring();
        this.setupResponsiveAnimations();
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
        
        this.isInitialized = true;
    }

    setupDataFlow() {
        // Create animated data packets flowing between server units
        const serverUnits = document.querySelectorAll('.server-unit');
        
        serverUnits.forEach((unit, index) => {
            this.createDataPackets(unit, index);
            this.setupUnitInteractions(unit);
        });
    }

    createDataPackets(unit, index) {
        const packetContainer = document.createElement('div');
        packetContainer.className = 'data-packet-container';
        packetContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        `;
        
        unit.style.position = 'relative';
        unit.appendChild(packetContainer);

        // Create flowing data packets
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                this.createSinglePacket(packetContainer);
            }
        }, 800 + (index * 200)); // Staggered timing
    }

    createSinglePacket(container) {
        const packet = document.createElement('div');
        packet.className = 'data-packet';
        packet.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-neon, #00ffff);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--primary-neon, #00ffff);
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            z-index: 4;
        `;
        
        container.appendChild(packet);

        // Animate packet flow
        packet.animate([
            { left: '10%', opacity: 0 },
            { left: '20%', opacity: 1 },
            { left: '80%', opacity: 1 },
            { left: '90%', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-in-out'
        }).onfinish = () => {
            packet.remove();
        };
    }

    setupUnitInteractions(unit) {
        let hoverTimeout;
        
        unit.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            this.activateUnit(unit);
        });
        
        unit.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                this.deactivateUnit(unit);
            }, 300);
        });
        
        unit.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectUnit(unit);
        });
    }

    activateUnit(unit) {
        unit.classList.add('unit-active');
        
        // Increase LED activity
        const leds = unit.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.animationDuration = '0.5s';
            led.style.boxShadow = '0 0 15px currentColor';
        });
        
        // Boost port activity
        const ports = unit.querySelectorAll('.port.active');
        ports.forEach(port => {
            port.style.animationDuration = '0.8s';
            port.style.boxShadow = '0 0 12px var(--success-green)';
        });
        
        // Create temporary connections
        this.createNetworkConnection(unit);
        
        // Show detailed info tooltip
        this.showUnitTooltip(unit);
    }

    deactivateUnit(unit) {
        unit.classList.remove('unit-active');
        
        // Reset LED activity
        const leds = unit.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.animationDuration = '1.5s';
            led.style.boxShadow = '0 0 8px currentColor';
        });
        
        // Reset port activity
        const ports = unit.querySelectorAll('.port.active');
        ports.forEach(port => {
            port.style.animationDuration = '2s';
            port.style.boxShadow = '0 0 4px var(--success-green)';
        });
        
        this.hideUnitTooltip(unit);
    }

    selectUnit(unit) {
        // Remove previous selection
        document.querySelectorAll('.server-unit').forEach(u => {
            u.classList.remove('unit-selected');
        });
        
        unit.classList.add('unit-selected');
        
        // Create selection effect
        const selectionRing = document.createElement('div');
        selectionRing.className = 'selection-ring';
        selectionRing.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border: 2px solid var(--primary-neon, #00ffff);
            border-radius: 8px;
            pointer-events: none;
            animation: selectionPulse 2s ease-in-out infinite;
            z-index: 2;
        `;
        
        unit.style.position = 'relative';
        unit.appendChild(selectionRing);
        
        // Add selection pulse animation
        const style = document.createElement('style');
        if (!document.querySelector('#selection-animations')) {
            style.id = 'selection-animations';
            style.textContent = `
                @keyframes selectionPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.02); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show service details
        this.showServiceDetails(unit);
        
        // Auto-deselect after 5 seconds
        setTimeout(() => {
            unit.classList.remove('unit-selected');
            selectionRing.remove();
        }, 5000);
    }

    showUnitTooltip(unit) {
        const service = unit.dataset.service;
        const serviceData = this.getServiceData(service);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'unit-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: var(--primary-neon, #00ffff);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            white-space: nowrap;
            border: 1px solid var(--primary-neon, #00ffff);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 10;
            opacity: 0;
            pointer-events: none;
        `;
        
        tooltip.textContent = serviceData.tooltip || 'System Active';
        unit.appendChild(tooltip);
        
        // Animate tooltip appearance
        tooltip.animate([
            { opacity: 0, transform: 'translateX(-50%) translateY(-10px)' },
            { opacity: 1, transform: 'translateX(-50%) translateY(0)' }
        ], {
            duration: 200,
            fill: 'forwards'
        });
    }

    hideUnitTooltip(unit) {
        const tooltip = unit.querySelector('.unit-tooltip');
        if (tooltip) {
            tooltip.animate([
                { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
                { opacity: 0, transform: 'translateX(-50%) translateY(-10px)' }
            ], {
                duration: 200,
                fill: 'forwards'
            }).onfinish = () => {
                tooltip.remove();
            };
        }
    }

    createNetworkConnection(fromUnit) {
        const serverUnits = document.querySelectorAll('.server-unit');
        const randomUnit = serverUnits[Math.floor(Math.random() * serverUnits.length)];
        
        if (randomUnit === fromUnit) return;
        
        const connection = this.drawConnectionLine(fromUnit, randomUnit);
        this.networkConnections.push(connection);
        
        // Remove connection after animation
        setTimeout(() => {
            connection.remove();
            const index = this.networkConnections.indexOf(connection);
            if (index > -1) {
                this.networkConnections.splice(index, 1);
            }
        }, 2000);
    }

    drawConnectionLine(from, to) {
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        const container = document.querySelector('.server-racks-container');
        const containerRect = container.getBoundingClientRect();
        
        const line = document.createElement('div');
        line.className = 'network-connection';
        
        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
        const x2 = toRect.left + toRect.width / 2 - containerRect.left;
        const y2 = toRect.top + toRect.height / 2 - containerRect.top;
        
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.cssText = `
            position: absolute;
            left: ${x1}px;
            top: ${y1}px;
            width: ${length}px;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                var(--primary-neon, #00ffff) 30%, 
                var(--primary-neon, #00ffff) 70%, 
                transparent 100%);
            transform-origin: left center;
            transform: rotate(${angle}deg);
            opacity: 0;
            z-index: 5;
            pointer-events: none;
        `;
        
        container.appendChild(line);
        
        // Animate connection
        line.animate([
            { opacity: 0, transform: `rotate(${angle}deg) scaleX(0)` },
            { opacity: 1, transform: `rotate(${angle}deg) scaleX(1)` },
            { opacity: 0, transform: `rotate(${angle}deg) scaleX(1)` }
        ], {
            duration: 2000,
            easing: 'ease-in-out'
        });
        
        return line;
    }

    setupNetworkConnections() {
        // Auto-create random network connections
        setInterval(() => {
            if (this.networkConnections.length < 3) {
                const units = document.querySelectorAll('.server-unit');
                const randomUnit = units[Math.floor(Math.random() * units.length)];
                this.createNetworkConnection(randomUnit);
            }
        }, 3000);
    }

    setupSystemMonitoring() {
        // Create system alerts and notifications
        this.createSystemStatusDisplay();
        this.startSystemMonitoring();
    }

    createSystemStatusDisplay() {
        const statusDisplay = document.createElement('div');
        statusDisplay.id = 'system-status-display';
        statusDisplay.className = 'system-status';
        statusDisplay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid var(--primary-neon, #00ffff);
            border-radius: 8px;
            padding: 15px;
            font-family: 'Consolas', monospace;
            font-size: 0.8rem;
            color: var(--primary-neon, #00ffff);
            max-width: 300px;
            z-index: 1000;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(statusDisplay);
    }

    startSystemMonitoring() {
        const statusDisplay = document.getElementById('system-status-display');
        let alertQueue = [];
        
        // Generate system events
        setInterval(() => {
            const events = [
                '🟢 Network optimization complete',
                '🔵 Security scan initiated',
                '🟡 Data backup in progress',
                '🟢 Server performance: Optimal',
                '🔵 Connection established',
                '🟡 System update available',
                '🟢 All systems operational'
            ];
            
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            this.showSystemAlert(randomEvent);
        }, 5000 + Math.random() * 10000);
    }

    showSystemAlert(message) {
        const statusDisplay = document.getElementById('system-status-display');
        
        statusDisplay.innerHTML = `
            <div class="status-header">
                <span>SYSTEM STATUS</span>
                <span>${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="status-message">${message}</div>
        `;
        
        // Show notification
        statusDisplay.style.opacity = '1';
        statusDisplay.style.transform = 'translateX(0)';
        
        // Hide after 4 seconds
        setTimeout(() => {
            statusDisplay.style.opacity = '0';
            statusDisplay.style.transform = 'translateX(100%)';
        }, 4000);
    }

    setupResponsiveAnimations() {
        // Handle responsive breakpoint changes
        let currentBreakpoint = this.getCurrentBreakpoint();
        
        window.addEventListener('resize', () => {
            const newBreakpoint = this.getCurrentBreakpoint();
            if (newBreakpoint !== currentBreakpoint) {
                currentBreakpoint = newBreakpoint;
                this.adjustAnimationsForBreakpoint(newBreakpoint);
            }
        });
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 480) return 'mobile';
        if (width < 768) return 'tablet';
        if (width < 1200) return 'desktop';
        return 'large';
    }

    adjustAnimationsForBreakpoint(breakpoint) {
        const body = document.body;
        
        // Remove existing breakpoint classes
        body.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout', 'large-layout');
        
        // Add current breakpoint class
        body.classList.add(`${breakpoint}-layout`);
        
        // Adjust animation performance based on screen size
        if (breakpoint === 'mobile') {
            this.reduceAnimations();
        } else {
            this.enhanceAnimations();
        }
    }

    reduceAnimations() {
        // Reduce animation complexity for mobile devices
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Disable particle systems
        const particles = document.querySelector('.particles-container');
        if (particles) {
            particles.style.display = 'none';
        }
    }

    enhanceAnimations() {
        // Restore full animations for larger screens
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Re-enable particle systems
        const particles = document.querySelector('.particles-container');
        if (particles) {
            particles.style.display = 'block';
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Keyboard navigation for accessibility
            switch(e.code) {
                case 'Space':
                    if (e.target === document.body) {
                        e.preventDefault();
                        this.scrollToNextSection();
                    }
                    break;
                case 'Escape':
                    this.clearAllSelections();
                    break;
                case 'KeyS':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        scrollToServices();
                    }
                    break;
                case 'KeyC':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        openContact();
                    }
                    break;
            }
        });
    }

    setupAccessibility() {
        // Add ARIA labels and roles
        const serverUnits = document.querySelectorAll('.server-unit');
        serverUnits.forEach((unit, index) => {
            unit.setAttribute('role', 'button');
            unit.setAttribute('tabindex', '0');
            unit.setAttribute('aria-label', `Server unit ${index + 1}: ${unit.querySelector('.unit-label')?.textContent}`);
            
            // Add keyboard support
            unit.addEventListener('keydown', (e) => {
                if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    this.selectUnit(unit);
                }
            });
        });
        
        // Add screen reader announcements
        this.setupScreenReaderSupport();
    }

    setupScreenReaderSupport() {
        const announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }

    announceToScreenReader(message) {
        const announcer = document.getElementById('sr-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    }

    scrollToNextSection() {
        const currentSection = document.querySelector('.server-room-hero');
        const nextSection = document.querySelector('#services');
        
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    clearAllSelections() {
        document.querySelectorAll('.server-unit').forEach(unit => {
            unit.classList.remove('unit-selected');
            const ring = unit.querySelector('.selection-ring');
            if (ring) ring.remove();
        });
    }

    showServiceDetails(unit) {
        const service = unit.dataset.service;
        const serviceData = this.getServiceData(service);
        
        // Show service details in console
        console.log(`Selected Service: ${serviceData.name}`, serviceData);
        
        // Announce to screen reader
        this.announceToScreenReader(`Selected ${serviceData.name} service`);
    }

    getServiceData(serviceKey) {
        const services = {
            'network': {
                name: 'Network Solutions',
                tooltip: 'Enterprise & Wireless Networks',
                status: 'Online'
            },
            'security': {
                name: 'Security Systems',
                tooltip: 'Advanced Protection Systems',
                status: 'Protected'
            },
            'cyber_security': {
                name: 'Cyber Security',
                tooltip: 'SOC & Threat Intelligence',
                status: 'Monitoring'
            },
            'data_centre': {
                name: 'Data Centre',
                tooltip: 'Storage & Virtualization',
                status: 'Processing'
            },
            'software_development': {
                name: 'Software Development',
                tooltip: 'Custom Software Solutions',
                status: 'Developing'
            },
            'it_consultancy': {
                name: 'IT Consultancy',
                tooltip: 'Strategic IT Guidance',
                status: 'Available'
            },
            'it_audit': {
                name: 'IT Audit',
                tooltip: 'System Assessment & Compliance',
                status: 'Active'
            }
        };
        
        return services[serviceKey] || { name: 'Unknown Service', tooltip: 'Service Information', status: 'Unknown' };
    }

    destroy() {
        // Cleanup event listeners and animations
        this.dataFlowAnimations.forEach(animation => {
            if (animation.cancel) animation.cancel();
        });
        
        this.networkConnections.forEach(connection => {
            connection.remove();
        });
        
        const statusDisplay = document.getElementById('system-status-display');
        if (statusDisplay) statusDisplay.remove();
        
        const announcer = document.getElementById('sr-announcer');
        if (announcer) announcer.remove();
    }
}

// Initialize interactions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the main 3D scene to initialize
    setTimeout(() => {
        window.heroInteractions = new HeroInteractions();
    }, 1000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.heroInteractions) {
        window.heroInteractions.destroy();
    }
});