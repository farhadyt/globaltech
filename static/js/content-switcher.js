/**
 * GlobalTech Content Switcher
 * Handles navigation and dynamic content loading
 */

class ContentSwitcher {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.contentLoader = document.getElementById('contentLoader');
        this.dynamicContent = document.getElementById('dynamicContent');
        this.contentContainer = document.getElementById('contentContainer');
        
        this.init();
    }
    
    init() {
        // Initialize navigation clicks
        this.setupNavigation();
        
        // Setup action button clicks
        this.setupActionButtons();
        
        // Initialize with home content
        this.showSection('home');
    }
    
    setupNavigation() {
        // Main navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.switchContent(section, item);
            });
        });
        
        // Admin button
        const adminBtn = document.getElementById('adminLoginBtn');
        if (adminBtn) {
            adminBtn.addEventListener('click', () => {
                this.showAdminLogin();
            });
        }
    }
    
    setupActionButtons() {
        // All buttons with data-section attribute
        const actionButtons = document.querySelectorAll('[data-section]');
        actionButtons.forEach(button => {
            if (!button.classList.contains('nav-item')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = button.getAttribute('data-section');
                    this.switchContent(section);
                });
            }
        });
    }
    
    switchContent(section, navItem = null) {
        if (section === this.currentSection || this.isLoading) return;
        
        this.isLoading = true;
        
        // Update navigation active state
        if (navItem) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');
        } else {
            // Find and activate nav item
            const targetNav = document.querySelector(`.nav-item[data-section="${section}"]`);
            if (targetNav) {
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                targetNav.classList.add('active');
            }
        }
        
        // Show loader
        this.showLoader();
        
        // Simulate content loading
        setTimeout(() => {
            this.loadContent(section);
        }, 600);
    }
    
    showLoader() {
        this.contentLoader.classList.add('active');
    }
    
    hideLoader() {
        this.contentLoader.classList.remove('active');
    }
    
loadContent(section) {
    // Hide current content
    const currentContent = document.querySelector('.content-section.active');
    if (currentContent) {
        currentContent.classList.remove('active');
    }
    
    // Check if content exists
    let sectionContent = document.getElementById(`${section}-content`);
    
    if (!sectionContent) {
        // Create new content section
        sectionContent = this.createContentSection(section);
        this.dynamicContent.appendChild(sectionContent);
    }
    
    // Show new content
    setTimeout(() => {
        sectionContent.classList.add('active');
        this.hideLoader();
        this.currentSection = section;
        this.isLoading = false;
        
        // Re-initialize animations for new content
        if (window.AnimationSystem) {
            const animSystem = new AnimationSystem();
            animSystem.initCounterAnimations();
            animSystem.initModuleAnimations();
        }
    }, 300);
}
    
    createContentSection(section) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content-section';
        contentDiv.id = `${section}-content`;
        
        // Generate content based on section
        switch(section) {
            case 'services':
                contentDiv.innerHTML = this.getServicesContent();
                break;
            case 'infrastructure':
                contentDiv.innerHTML = this.getInfrastructureContent();
                break;
            case 'security':
                contentDiv.innerHTML = this.getSecurityContent();
                break;
            case 'about':
                contentDiv.innerHTML = this.getAboutContent();
                break;
            case 'contact':
                contentDiv.innerHTML = this.getContactContent();
                break;
            default:
                contentDiv.innerHTML = '<h2>Content coming soon...</h2>';
        }
        
        return contentDiv;
    }
    
getServicesContent() {
    return `
        <div class="services-interface">
            <div class="interface-header">
                <div class="system-status-indicator">
                    <div class="status-dot online"></div>
                    <span class="status-text">ALL SERVICES ACTIVE</span>
                </div>
                
                <h1 class="hero-title">
                    <span class="title-primary">PROFESSIONAL IT</span>
                    <span class="title-secondary">SERVICES PORTFOLIO</span>
                </h1>
                
                <p class="hero-description">
                    Comprehensive IT solutions designed for modern enterprises. 
                    <span class="highlight">End-to-end services</span> from 
                    <span class="highlight">consulting to implementation</span>.
                </p>
            </div>
            
            <div class="service-modules-grid">
                <div class="service-module" data-service="it-audit">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-clipboard-check module-icon"></i>
                        </div>
                        <h3 class="module-title">IT Audit & Compliance</h3>
                        <p class="module-description">Comprehensive assessment of IT systems and regulatory compliance</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="500">0</span>
                                <span class="stat-label">Audits</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="100">0</span>
                                <span class="stat-label">% Compliance</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Certified</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
                
                <div class="service-module" data-service="network-solutions">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-network-wired module-icon"></i>
                        </div>
                        <h3 class="module-title">Network Infrastructure</h3>
                        <p class="module-description">Enterprise LAN/WAN design and SD-WAN solutions</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="1000">0</span>
                                <span class="stat-label">Nodes</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="10">0</span>
                                <span class="stat-label">Gbps Speed</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Connected</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
                
                <div class="service-module" data-service="cloud-services">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-cloud module-icon"></i>
                        </div>
                        <h3 class="module-title">Cloud Solutions</h3>
                        <p class="module-description">Hybrid cloud architecture and migration services</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="50">0</span>
                                <span class="stat-label">PB Storage</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="99">0</span>
                                <span class="stat-label">% Availability</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Scalable</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
                
                <div class="service-module" data-service="software-dev">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-code module-icon"></i>
                        </div>
                        <h3 class="module-title">Software Development</h3>
                        <p class="module-description">Custom applications, PLC programming & DevOps</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="200">0</span>
                                <span class="stat-label">Projects</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="15">0</span>
                                <span class="stat-label">Languages</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Developing</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
                
                <div class="service-module" data-service="it-consulting">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-chart-line module-icon"></i>
                        </div>
                        <h3 class="module-title">IT Consulting</h3>
                        <p class="module-description">Strategic planning and digital transformation</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="300">0</span>
                                <span class="stat-label">Clients</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="95">0</span>
                                <span class="stat-label">% Success</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Advisory</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
                
                <div class="service-module" data-service="managed-services">
                    <div class="module-glass-effect"></div>
                    <div class="module-content">
                        <div class="module-icon-wrapper">
                            <div class="icon-background"></div>
                            <i class="fas fa-cogs module-icon"></i>
                        </div>
                        <h3 class="module-title">Managed Services</h3>
                        <p class="module-description">24/7 monitoring, maintenance and support</p>
                        <div class="module-stats">
                            <div class="stat-item">
                                <span class="stat-value" data-count="24">0</span>
                                <span class="stat-label">Hr Support</span>
                            </div>
                            <div class="stat-separator"></div>
                            <div class="stat-item">
                                <span class="stat-value" data-count="5">0</span>
                                <span class="stat-label">Min Response</span>
                            </div>
                        </div>
                        <div class="module-status">
                            <span class="status-icon active"></span>
                            <span class="status-text">Monitoring</span>
                        </div>
                    </div>
                    <div class="module-glow"></div>
                </div>
            </div>
            
            <div class="command-actions">
                <button class="primary-action-btn" data-section="contact">
                    <div class="btn-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <div class="btn-content">
                        <span class="btn-main">Request Service</span>
                        <span class="btn-sub">Get quote</span>
                    </div>
                    <div class="btn-glow"></div>
                </button>
                
                <button class="secondary-action-btn" data-section="infrastructure">
                    <div class="btn-icon">
                        <i class="fas fa-server"></i>
                    </div>
                    <div class="btn-content">
                        <span class="btn-main">View Infrastructure</span>
                        <span class="btn-sub">Our capabilities</span>
                    </div>
                    <div class="btn-glow"></div>
                </button>
            </div>
        </div>
    `;
}
    
    generateServiceCards() {
        const services = [
            {
                icon: 'fa-clipboard-check',
                title: 'IT Audit & Compliance',
                description: 'Comprehensive assessment of IT systems and regulatory compliance',
                features: ['Internal Controls', 'Risk Assessment', 'Compliance Verification']
            },
            {
                icon: 'fa-network-wired',
                title: 'Network Infrastructure',
                description: 'Enterprise-grade networking solutions for seamless connectivity',
                features: ['LAN/WAN Design', 'SD-WAN', 'Wireless Solutions']
            },
            {
                icon: 'fa-server',
                title: 'Data Center Solutions',
                description: 'Scalable server and storage infrastructure for your business',
                features: ['Virtualization', 'Hybrid Cloud', 'Storage Systems']
            },
            {
                icon: 'fa-shield-alt',
                title: 'Cybersecurity',
                description: 'Multi-layered security approach to protect your digital assets',
                features: ['SOC Services', 'Penetration Testing', 'SIEM Solutions']
            },
            {
                icon: 'fa-code',
                title: 'Software Development',
                description: 'Custom software solutions tailored to your business needs',
                features: ['Custom Applications', 'PLC Programming', 'DevOps']
            },
            {
                icon: 'fa-brain',
                title: 'Innovation Lab',
                description: 'Cutting-edge technologies for future-ready businesses',
                features: ['AI/ML Solutions', 'IoT Integration', 'Blockchain']
            }
        ];
        
        return services.map(service => `
            <div class="service-card">
                <div class="card-header">
                    <div class="service-icon-box">
                        <i class="fas ${service.icon}"></i>
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                </div>
                <p class="service-description">${service.description}</p>
                <div class="service-features">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="service-action-btn">
                    <span>Explore Service</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `).join('');
    }
    
    getInfrastructureContent() {
        return `
            <div class="infrastructure-interface">
                <div class="interface-header">
                    <div class="section-indicator">
                        <i class="fas fa-server"></i>
                        <span>INFRASTRUCTURE HUB</span>
                    </div>
                    <h1 class="section-title">
                        <span class="title-primary">DATA CENTER</span>
                        <span class="title-secondary">INFRASTRUCTURE</span>
                    </h1>
                </div>
                <p>Infrastructure content will be added here...</p>
            </div>
        `;
    }
    
    getSecurityContent() {
        return `
            <div class="security-interface">
                <div class="interface-header">
                    <div class="section-indicator">
                        <i class="fas fa-shield-alt"></i>
                        <span>SECURITY CENTER</span>
                    </div>
                    <h1 class="section-title">
                        <span class="title-primary">CYBER DEFENSE</span>
                        <span class="title-secondary">COMMAND CENTER</span>
                    </h1>
                </div>
                <p>Security content will be added here...</p>
            </div>
        `;
    }
    
    getAboutContent() {
        return `
            <div class="about-interface">
                <div class="interface-header">
                    <div class="section-indicator">
                        <i class="fas fa-info-circle"></i>
                        <span>ABOUT GLOBALTECH</span>
                    </div>
                    <h1 class="section-title">
                        <span class="title-primary">OUR MISSION</span>
                        <span class="title-secondary">YOUR SUCCESS</span>
                    </h1>
                </div>
                <p>About content will be added here...</p>
            </div>
        `;
    }
    
    getContactContent() {
        return `
            <div class="contact-interface">
                <div class="interface-header">
                    <div class="section-indicator">
                        <i class="fas fa-envelope"></i>
                        <span>CONTACT CENTER</span>
                    </div>
                    <h1 class="section-title">
                        <span class="title-primary">GET IN TOUCH</span>
                        <span class="title-secondary">24/7 SUPPORT</span>
                    </h1>
                </div>
                <p>Contact content will be added here...</p>
            </div>
        `;
    }
    
    showAdminLogin() {
        console.log('Admin login functionality will be implemented');
    }
    
    showSection(section) {
        const sectionContent = document.getElementById(`${section}-content`);
        if (sectionContent) {
            sectionContent.classList.add('active');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContentSwitcher();
});