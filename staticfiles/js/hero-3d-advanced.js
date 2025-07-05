/**
 * Advanced 3D Server Room Experience
 * Performance optimized for all devices
 */

class ServerRoom3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.serverModels = [];
        this.particles = [];
        this.isLowPerformance = this.detectPerformanceLevel();
        
        this.init();
        this.setupEventListeners();
        this.startRealTimeClock();
        this.initCounterAnimations();
    }

    detectPerformanceLevel() {
        // Detect device performance level
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return true; // No WebGL, assume low performance
        
        const renderer = gl.getParameter(gl.RENDERER);
        const vendor = gl.getParameter(gl.VENDOR);
        
        // Check for mobile or low-end devices
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEndGPU = /Intel|PowerVR|Adreno 3|Mali-4/i.test(renderer);
        
        return isMobile || isLowEndGPU;
    }

    init() {
        const canvas = document.getElementById('serverRoom3D');
        if (!canvas) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 100);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: !this.isLowPerformance,
            alpha: true,
            powerPreference: this.isLowPerformance ? "low-power" : "high-performance"
        });
        
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isLowPerformance ? 1 : 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = !this.isLowPerformance;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.createScene();
        this.animate();
        this.handleResize();
    }

    createScene() {
        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3);
        this.scene.add(ambientLight);

        // Key light with cyan color
        const keyLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        keyLight.position.set(10, 10, 5);
        if (!this.isLowPerformance) {
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.width = 1024;
            keyLight.shadow.mapSize.height = 1024;
        }
        this.scene.add(keyLight);

        // Fill light with orange accent
        const fillLight = new THREE.DirectionalLight(0xff6b35, 0.4);
        fillLight.position.set(-10, 5, -5);
        this.scene.add(fillLight);

        // Create server room environment
        this.createServerRacks();
        this.createFloor();
        this.createParticleSystem();
        this.createHolographicElements();
    }

    createServerRacks() {
        // Server rack geometries
        const rackGeometry = new THREE.BoxGeometry(2, 8, 1);
        const serverGeometry = new THREE.BoxGeometry(1.8, 0.3, 0.8);

        // Materials
        const rackMaterial = new THREE.MeshLambertMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.8
        });

        const serverMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333,
            emissive: 0x001133
        });

        // Create left rack
        const leftRack = new THREE.Mesh(rackGeometry, rackMaterial);
        leftRack.position.set(-8, 0, 0);
        this.scene.add(leftRack);

        // Create right rack
        const rightRack = new THREE.Mesh(rackGeometry, rackMaterial);
        rightRack.position.set(8, 0, 0);
        this.scene.add(rightRack);

        // Add servers to racks
        for (let i = 0; i < 20; i++) {
            // Left rack servers
            const leftServer = new THREE.Mesh(serverGeometry, serverMaterial.clone());
            leftServer.position.set(-8, -3.5 + (i * 0.4), 0.1);
            leftServer.material.emissive.setHex(Math.random() > 0.7 ? 0x003300 : 0x001133);
            this.scene.add(leftServer);
            this.serverModels.push(leftServer);

            // Right rack servers
            const rightServer = new THREE.Mesh(serverGeometry, serverMaterial.clone());
            rightServer.position.set(8, -3.5 + (i * 0.4), 0.1);
            rightServer.material.emissive.setHex(Math.random() > 0.7 ? 0x003300 : 0x001133);
            this.scene.add(rightServer);
            this.serverModels.push(rightServer);
        }

        // Add LED indicators
        this.createLEDIndicators();
    }

    createLEDIndicators() {
        const ledGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        
        this.serverModels.forEach((server, index) => {
            const ledCount = 3;
            for (let i = 0; i < ledCount; i++) {
                const ledMaterial = new THREE.MeshBasicMaterial({
                    color: this.getLEDColor(),
                    emissive: this.getLEDColor(),
                    emissiveIntensity: 0.5
                });

                const led = new THREE.Mesh(ledGeometry, ledMaterial);
                led.position.copy(server.position);
                led.position.x += server.position.x > 0 ? -0.8 : 0.8;
                led.position.y += 0.05;
                led.position.z += 0.5 + (i * 0.1);
                
                this.scene.add(led);
                
                // Animate LED blinking
                if (Math.random() > 0.8) {
                    this.animateLED(led, ledMaterial);
                }
            }
        });
    }

    getLEDColor() {
        const colors = [0x00ff00, 0xff6600, 0x00ffff, 0xff0000];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateLED(led, material) {
        const originalIntensity = material.emissiveIntensity;
        const blinkSpeed = 0.5 + Math.random() * 2;
        
        const blink = () => {
            material.emissiveIntensity = originalIntensity * (0.1 + 0.9 * Math.random());
            setTimeout(blink, 100 + Math.random() * 2000);
        };
        
        blink();
    }

    createFloor() {
        const floorGeometry = new THREE.PlaneGeometry(50, 50);
        const floorMaterial = new THREE.MeshLambertMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0.8
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -4;
        if (!this.isLowPerformance) {
            floor.receiveShadow = true;
        }
        this.scene.add(floor);

        // Add grid pattern
        const gridHelper = new THREE.GridHelper(50, 50, 0x00ffff, 0x333333);
        gridHelper.position.y = -3.99;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.scene.add(gridHelper);
    }

    createParticleSystem() {
        if (this.isLowPerformance) return; // Skip particles on low-performance devices

        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position
            positions[i3] = (Math.random() - 0.5) * 30;
            positions[i3 + 1] = Math.random() * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 30;
            
            // Color (cyan theme)
            colors[i3] = 0;     // R
            colors[i3 + 1] = 1; // G
            colors[i3 + 2] = 1; // B
            
            // Velocity
            velocities.push({
                x: (Math.random() - 0.5) * 0.01,
                y: Math.random() * 0.005,
                z: (Math.random() - 0.5) * 0.01
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particles, particleMaterial);
        this.particles.userData.velocities = velocities;
        this.scene.add(this.particles);
    }

    createHolographicElements() {
        // Create holographic data streams
        const streamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 10, 8);
        const streamMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            emissive: 0x00ffff,
            emissiveIntensity: 0.2
        });

        for (let i = 0; i < 5; i++) {
            const stream = new THREE.Mesh(streamGeometry, streamMaterial.clone());
            stream.position.set(
                (Math.random() - 0.5) * 20,
                Math.random() * 5,
                (Math.random() - 0.5) * 20
            );
            stream.rotation.z = Math.random() * Math.PI;
            
            this.scene.add(stream);
            
            // Animate streams
            this.animateStream(stream);
        }
    }

    animateStream(stream) {
        const originalOpacity = stream.material.opacity;
        const pulseSpeed = 1000 + Math.random() * 2000;
        
        const pulse = () => {
            stream.material.opacity = originalOpacity * (0.1 + 0.9 * Math.random());
            setTimeout(pulse, pulseSpeed);
        };
        
        pulse();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate camera slowly
        const time = Date.now() * 0.0001;
        this.camera.position.x = Math.cos(time) * 15;
        this.camera.position.z = Math.sin(time) * 15;
        this.camera.lookAt(0, 0, 0);

        // Animate particles
        if (this.particles && !this.isLowPerformance) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.userData.velocities;

            for (let i = 0; i < velocities.length; i++) {
                const i3 = i * 3;
                
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;

                // Boundary check
                if (positions[i3 + 1] > 10) {
                    positions[i3 + 1] = 0;
                    positions[i3] = (Math.random() - 0.5) * 30;
                    positions[i3 + 2] = (Math.random() - 0.5) * 30;
                }
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Animate server emissions
        this.serverModels.forEach((server, index) => {
            if (server.material) {
                const intensity = 0.1 + Math.sin(time * 2 + index) * 0.05;
                server.material.emissiveIntensity = intensity;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            const canvas = document.getElementById('serverRoom3D');
            if (!canvas) return;

            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    }

    setupEventListeners() {
        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            } else {
                this.animate();
            }
        });

        // Add interactive hover effects
        this.setupInteractiveEffects();
    }

    setupInteractiveEffects() {
        // Server unit hover effects
        const serverUnits = document.querySelectorAll('.server-unit');
        serverUnits.forEach(unit => {
            unit.addEventListener('mouseenter', () => {
                this.highlightServerUnit(unit);
            });
            
            unit.addEventListener('mouseleave', () => {
                this.resetServerUnit(unit);
            });
        });

        // Nav item interactions
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleNavClick(e, item);
            });
        });
    }

    highlightServerUnit(unit) {
        const leds = unit.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.boxShadow = '0 0 15px currentColor';
            led.style.transform = 'scale(1.2)';
        });

        const ports = unit.querySelectorAll('.port.active');
        ports.forEach(port => {
            port.style.boxShadow = '0 0 10px var(--success-green)';
        });
    }

    resetServerUnit(unit) {
        const leds = unit.querySelectorAll('.led');
        leds.forEach(led => {
            led.style.boxShadow = '0 0 8px currentColor';
            led.style.transform = 'scale(1)';
        });

        const ports = unit.querySelectorAll('.port.active');
        ports.forEach(port => {
            port.style.boxShadow = '0 0 4px var(--success-green)';
        });
    }

    handleNavClick(e, item) {
        e.preventDefault();
        
        // Add click effect
        item.style.transform = 'translateY(-5px) scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateY(-3px)';
        }, 150);

        // Scroll to services section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    startRealTimeClock() {
        const clockElement = document.getElementById('systemTime');
        if (!clockElement) return;

        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            clockElement.textContent = `SYS: ${timeString}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.count);
            let current = 0;
            const increment = target / 60; // 60 frames for 1 second at 60fps
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16); // ~60fps
        };

        // Start counters with delay
        counters.forEach((counter, index) => {
            setTimeout(() => {
                animateCounter(counter);
            }, 1500 + (index * 200));
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Clean up geometries and materials
        this.scene?.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Global Functions
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading screen to finish
    setTimeout(() => {
        window.serverRoom3D = new ServerRoom3D();
    }, 500);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.serverRoom3D) {
        window.serverRoom3D.destroy();
    }
});