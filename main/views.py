from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    """
    ULTIMATE IT Infrastructure Loading Interface
    GlobalTech Datacenter Access Protocol
    """
    return HttpResponse("""
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GlobalTech // DATACENTER ACCESS PROTOCOL</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto+Mono:wght@300;400&display=swap');

            :root {
                /* Viewport əsaslı ölçülər - ekran ölçüsünə görə avtomatik dəyişir */
                --nexus-size: min(35vw, 35vh, 250px);
                --font-scale: clamp(0.8rem, 2.5vw, 1.5rem);
                --brand-font-scale: clamp(1.5rem, 5vw, 5rem);
                --boot-font-scale: clamp(0.6rem, 1.5vw, 1rem);
                --spacing-scale: clamp(10px, 2vw, 30px);
                
                /* Rənglər */
                --primary-glow: #00ddff;
                --secondary-glow: #00ff88;
                --background-dark: #02040a;
                --background-light: #0d1018;
                --text-color: #e0f7ff;
            }

            /* --- Reset --- */
            * { margin: 0; padding: 0; box-sizing: border-box; }

            body {
                background: linear-gradient(135deg, var(--background-dark), var(--background-light));
                color: var(--text-color);
                font-family: 'Roboto Mono', monospace;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                animation: bodyFadeIn 1s forwards;
            }

            /* --- Mərkəzi konteyner --- */
            .loading-container {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                perspective: 1000px;
                padding: var(--spacing-scale);
            }

            /* --- Arxa fon partikllər --- */
            .background-particles {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                z-index: 0;
            }
            .particle {
                position: absolute;
                width: min(0.3vw, 3px); 
                height: min(0.3vw, 3px);
                background-color: var(--primary-glow);
                border-radius: 50%;
                box-shadow: 0 0 8px var(--primary-glow), 0 0 12px var(--secondary-glow);
                animation: particle-flow 10s linear infinite;
                opacity: 0;
            }

            /* --- Brend söz + kürə üçün wrapper --- */
            .brand-wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0;
                z-index: 10;
                pointer-events: none;
                width: 100%;
            }

            .brand-text {
                font-family: 'Orbitron', sans-serif;
                font-weight: 900;
                letter-spacing: clamp(0.1em, 1vw, 0.35em);
                font-size: var(--brand-font-scale);
                color: #fff;
                text-shadow: 0 0 15px #fff, 0 0 30px var(--primary-glow);
                opacity: 0;
                white-space: nowrap;
                position: absolute;
            }
            /* ---- Yeni fade-in effekti ---- */
            .brand-text.visible { animation: textFadeIn 1.2s forwards ease-out; }

            .brand-gl  { right: calc(46% + var(--nexus-size) / 2 + var(--spacing-scale)); }
            .brand-baltech { left: calc(47% + var(--nexus-size) / 2 + var(--spacing-scale)); }

            /* --- Təhlükəsizlik giriş halqası wrapper --- */
            .access-ring-wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 5;
            }
            /* ---- Kürənin kiçilmə animasiyası ---- */
            .access-ring-wrapper.shrink { animation: sphereShrink 1.2s forwards ease-in-out; }

            /* --- Holoqrafik kürə --- */
            .hologram-nexus {
                width: var(--nexus-size);
                height: var(--nexus-size);
                position: relative;
                transform-style: preserve-3d;
                animation: hologram-rotate 25s infinite linear;
                opacity: 0;
                transform: scale(0.5);
                animation: nexus-appear 2s 1s forwards;
            }
            .hologram-ring {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                border-radius: 50%;
                border: max(0.2vw, 2px) solid;
                transform-style: preserve-3d;
            }
            .hologram-ring:nth-child(1) {
                border-color: rgba(0, 221, 255, 0.5);
                transform: rotateY(70deg) rotateX(20deg);
                animation: ring-rotate 8s infinite linear reverse;
            }
            .hologram-ring:nth-child(2) {
                border-color: rgba(0, 255, 136, 0.5);
                transform: rotateY(-70deg) rotateX(45deg);
                animation: ring-rotate 12s infinite linear;
            }
            .hologram-ring:nth-child(3) {
                border-color: rgba(224, 247, 255, 0.4);
                transform: rotateX(90deg);
                animation: ring-rotate 10s infinite linear;
            }
            .hologram-core {
                width: calc(var(--nexus-size) * 0.2);
                height: calc(var(--nexus-size) * 0.2);
                background: var(--primary-glow);
                border-radius: 50%;
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 30px var(--primary-glow), 0 0 50px white;
                animation: core-pulse 2s infinite ease-in-out;
            }

            /* --- Təhlükəsizlik giriş halqası --- */
            .access-ring-container {
                position: relative;
                width: calc(var(--nexus-size) + var(--spacing-scale) * 2);
                height: calc(var(--nexus-size) + var(--spacing-scale) * 2);
                border: max(0.1vw, 1px) solid rgba(0, 221, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .access-progress {
                width: 100%; height: 100%;
                position: absolute;
                border-radius: 50%;
                clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0);
                opacity: 0;
                transition: opacity 1s;
            }
            .access-progress.active { opacity: 1; }
            .progress-ring {
                width: 100%; height: 100%;
                border-radius: 50%;
                border: max(0.4vw, 4px) solid transparent;
                border-top-color: var(--secondary-glow);
                border-right-color: var(--secondary-glow);
                animation: access-spin 1.5s linear infinite;
                box-shadow: 0 0 3px var(--secondary-glow);
            }

            /* --- Boot mətnləri --- */
            .boot-sequence {
                position: absolute;
                bottom: max(5vh, 40px);
                width: min(90%, 600px);
                max-height: 30vh;
                overflow-y: auto;
                font-size: var(--boot-font-scale);
                text-align: left;
                font-family: 'Orbitron', sans-serif;
                letter-spacing: clamp(0.05em, 0.5vw, 0.2em);
                text-shadow: 0 0 8px var(--primary-glow);
            }
            .boot-line {
                opacity: 0;
                animation: line-appear 0.3s forwards;
                margin: clamp(4px, 1vh, 8px) 0;
                padding-left: clamp(15px, 2vw, 20px);
                position: relative;
            }
            .boot-line::before {
                content: '►';
                position: absolute;
                left: 0;
                color: var(--primary-glow);
            }
            .boot-line .status-ok { color: var(--secondary-glow); font-weight: 500; }
            .boot-line .status-granted { color: white; font-weight: 700; }

            /* --- Animasiyalar --- */
            @keyframes bodyFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes particle-flow {
                from { transform: translateY(-10%) translateX(var(--x-start)); opacity: 0; }
                50%  { opacity: 1; }
                to   { transform: translateY(110%) translateX(var(--x-end)); opacity: 0; }
            }
            @keyframes nexus-appear { to { opacity: 1; transform: scale(1); } }
            @keyframes hologram-rotate { from { transform: rotate3d(0,1,0,0deg); } to { transform: rotate3d(0,1,0,360deg); } }
            @keyframes ring-rotate { from { transform: rotate3d(1,.5,.2,0deg); } to { transform: rotate3d(1,.5,.2,360deg); } }
            @keyframes core-pulse {
                0%,100% { transform: translate(-50%,-50%) scale(1); box-shadow: 0 0 30px var(--primary-glow), 0 0 50px white; }
                50%     { transform: translate(-50%,-50%) scale(1.1); box-shadow: 0 0 40px var(--secondary-glow), 0 0 60px white; }
            }
            @keyframes access-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes line-appear { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
            
            /* ---- Yeni animasiyalar ---- */
            @keyframes textFadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes sphereShrink {
                from { transform: translate(-50%, -50%) scale(1); }
                to   { transform: translate(-50%, -50%) scale(0.38); } /* 0.38 ≈ “O” boyu */
            }

            /* --- Xüsusi kiçik ekranlar üçün düzəlişlər --- */
            @media (max-width: 480px) and (max-height: 600px) {
                .boot-sequence { bottom: max(2vh, 20px); font-size: clamp(0.5rem, 2vw, 0.8rem); }
            }
            /* --- Landscape rejimi üçün --- */
            @media (orientation: landscape) and (max-height: 500px) {
                :root {
                    --nexus-size: min(25vh, 25vw, 200px);
                    --brand-font-scale: clamp(1rem, 4vh, 3rem);
                    --boot-font-scale: clamp(0.5rem, 1.2vh, 0.8rem);
                }
                .boot-sequence { max-height: 25vh; }
            }
        </style>
    </head>
    <body>
        <!-- Arxa fon partiklləri -->
        <div class="background-particles" id="particles-container"></div>

        <div class="loading-container">
            <!-- Kürə wrapper -->
            <div class="access-ring-wrapper" id="access-ring-wrapper">
                <!-- Giriş halqası + kürə -->
                <div class="access-ring-container">
                    <div class="access-progress" id="access-progress">
                        <div class="progress-ring"></div>
                    </div>
                    <div class="hologram-nexus" id="hologram-nexus">
                        <div class="hologram-core"></div>
                        <div class="hologram-ring"></div>
                        <div class="hologram-ring"></div>
                        <div class="hologram-ring"></div>
                    </div>
                </div>
            </div>

            <!-- Brend wrapper - sözlər -->
            <div class="brand-wrapper" id="brand-wrapper">
                <div class="brand-text brand-gl" id="brand-gl">GL</div>
                <div class="brand-text brand-baltech" id="brand-baltech">BALTECH</div>
            </div>

            <!-- Boot mətnləri -->
            <div class="boot-sequence" id="boot-sequence"></div>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', () => {
                /* --- Arxa fon partiklləri --- */
                const particlesContainer = document.getElementById('particles-container');
                const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
                for (let i = 0; i < particleCount; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.top = `${Math.random() * 100}%`;
                    p.style.setProperty('--x-start', `${Math.random() * 100}vw`);
                    p.style.setProperty('--x-end', `${Math.random() * 100}vw`);
                    p.style.animationDelay = `${Math.random() * 10}s`;
                    p.style.animationDuration = `${5 + Math.random() * 5}s`;
                    particlesContainer.appendChild(p);
                }

                /* --- Boot ardıcıllığı --- */
                const bootSequenceEl = document.getElementById('boot-sequence');
                const accessProgressEl = document.getElementById('access-progress');
                const brandGl  = document.getElementById('brand-gl');
                const brandBaltech = document.getElementById('brand-baltech');
                const ringWrapper  = document.getElementById('access-ring-wrapper');

                const sequence = [
                    { text: 'DATACENTER_CORE.initialize() <span class="status-ok">[ACTIVE]</span>', delay: 800 },
                    { text: 'SECURITY_PROTOCOLS.authenticate() <span class="status-ok">[VERIFIED]</span>', delay: 1200 },
                    { text: 'FIREWALL_MATRIX.scanThreats() <span class="status-ok">[CLEAN]</span>', delay: 1000 },
                    { text: 'CLOUD_INFRASTRUCTURE.connect() <span class="status-ok">[STABLE]</span>', delay: 900 },
                    { text: 'NEURAL_NETWORK.loadBalance() <span class="status-ok">[OPTIMIZED]</span>', delay: 700 },
                    { text: 'ACCESS_CONTROL.grantPermission() <span class="status-granted">[GRANTED]</span>', delay: 600 }
                ];

                let totalDelay = 0;
                sequence.forEach(item => {
                    totalDelay += item.delay;
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.className = 'boot-line';
                        line.innerHTML = item.text;
                        bootSequenceEl.appendChild(line);
                    }, totalDelay);
                });

                /* --- Giriş halqasını aktiv et --- */
                setTimeout(() => accessProgressEl.classList.add('active'), 2000);

                /* --- Boot bitdikdən sonra animasiya --- */
                setTimeout(() => {
                    bootSequenceEl.style.transition = 'opacity 1s';
                    bootSequenceEl.style.opacity = '0';

                    /* Kürəni kiçilt və mətni fade-in et */
                    ringWrapper.classList.add('shrink');
                    setTimeout(() => {
                        brandGl.classList.add('visible');
                        setTimeout(() => brandBaltech.classList.add('visible'), 300);
                    }, 200);
                }, totalDelay + 1000);

                /* --- Növbəti səhifəyə yönləndirmə --- */
                setTimeout(() => {
                    document.body.style.transition = 'opacity 1s ease-out';
                    document.body.style.opacity = '0';
                    setTimeout(() => window.location.href = '/main/', 1000);
                }, totalDelay + 5000);
            });
        </script>
    </body>
    </html>
    """)
