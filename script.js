document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const particlesContainer = document.getElementById('particles');

    // 0. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // 1. Create Background Particles
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 3 + 1 + 'px';
            particle.style.width = size;
            particle.style.height = size;

            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.setProperty('--d', Math.random() * 10 + 5 + 's');
            particle.style.animationDelay = Math.random() * 5 + 's';

            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // 2. Interactive Background Glow (Multi-color)
    const bgGlow = document.createElement('div');
    bgGlow.className = 'bg-glow';
    document.body.appendChild(bgGlow);

    const colors = ['rgba(99, 102, 241, 0.15)', 'rgba(244, 63, 94, 0.15)', 'rgba(16, 185, 129, 0.15)'];
    let currentColor = 0;

    document.addEventListener('mousemove', (e) => {
        bgGlow.animate({
            left: `${e.clientX - 300}px`,
            top: `${e.clientY - 300}px`,
            background: `radial-gradient(circle, ${colors[currentColor]} 0%, transparent 70%)`
        }, { duration: 2000, fill: "forwards" });

        // Cycle colors slowly
        if (Math.random() > 0.98) currentColor = (currentColor + 1) % colors.length;
    });

    // 2.1 Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0) scale(1)`;
        });
    });

    // 3. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.parentElement.classList.add('scrolled');
        } else {
            navbar.parentElement.classList.remove('scrolled');
        }

        // Active Link on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 4. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 5. Tilt Effect (Simple Parallax)
    // 5. Tilt Effect (Simple Parallax) - Desktop Only via CSS Media Query mainly
    const items = document.querySelectorAll('.tilt, .social-stat, .step');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 968) return; // Disable JS tilt on mobile

            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 968) return;
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 6. Reveal Animations
    const revealElements = document.querySelectorAll('.hero-content, .section-header, .gallery-item, .about-text, .about-image, .step, .social-stat');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        revealObserver.observe(el);
    });

    // 7. Mobile Bottom Nav Interaction
    const bottomNavLinks = document.querySelectorAll('.nav-item');

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        bottomNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 8. Like Button Interaction
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent triggering parent click if any
            this.classList.toggle('liked');

            const icon = this.querySelector('i');
            if (this.classList.contains('liked')) {
                icon.classList.remove('far'); // If you change to outline later
                icon.classList.add('fas');
            }
        });
    });

    // 9. Load Static Artworks (Wall Painting and Posters)
    function loadArtworks() {
        const wallPaintingGrid = document.getElementById('wall-painting-grid');
        const posterGrid = document.getElementById('poster-grid');

        const addArtwork = (container, path, title) => {
            const item = document.createElement('div');
            item.className = 'artwork-item tilt';
            item.innerHTML = `
                <img src="${path}" alt="${title}" loading="lazy">
                <div class="item-overlay">
                    
                </div>
             `;
            container.appendChild(item);

            // Observe for reveal
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
            if (typeof revealObserver !== 'undefined') {
                revealObserver.observe(item);
            }

            // Add tilt effect manually
            item.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 968) return;

                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (centerY - y) / 15;
                const rotateY = (x - centerX) / 15;

                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth <= 968) return;
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        };

        if (wallPaintingGrid) {
            for (let i = 1; i <= 14; i++) {
                addArtwork(wallPaintingGrid, `Wall_painting/1 (${i}).jpeg`, `Wall Art ${i}`);
            }
        }

        if (posterGrid) {
            for (let i = 1; i <= 34; i++) {
                addArtwork(posterGrid, `posters/1 (${i}).jpeg`, `Poster ${i}`);
            }
        }

        const rangDeGrid = document.getElementById('rang-de-grid');
        if (rangDeGrid) {
            for (let i = 1; i <= 15; i++) {
                addArtwork(rangDeGrid, `rang_de_Gorakhpur/1 (${i}).jpeg`, `Rang De Gorakhpur ${i}`);
            }
        }
    }

    loadArtworks();
    // 10. Desktop Carousel Navigation
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const container = document.getElementById(targetId);

            if (container) {
                const scrollAmount = 400; // Adjust scroll distance
                if (btn.classList.contains('prev-btn')) {
                    container.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
