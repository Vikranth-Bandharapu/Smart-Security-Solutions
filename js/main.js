document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.documentElement.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.documentElement.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.documentElement.style.overflow = '';
            }
        });

        // Close menu and reset scroll when clicking a navigation link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.documentElement.style.overflow = '';
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // GSAP Animations (Make sure GSAP & ScrollTrigger are loaded in HTML)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade Up Elements
        const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
        fadeUpElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Staggered Cards
        const cardContainers = document.querySelectorAll('.gsap-stagger-container');
        cardContainers.forEach((container) => {
            const cards = container.querySelectorAll('.glass-card');
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                    }
                }
            );
        });
    }

    // Dynamic Counters
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0 && typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));
                    let startValue = 0;
                    const duration = 2000;
                    const increment = endValue / (duration / 16); // 60fps

                    const updateCounter = () => {
                        startValue += increment;
                        if (startValue < endValue) {
                            target.innerText = Math.ceil(startValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = endValue;
                        }
                    };
                    updateCounter();
                    obs.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Interactive Hero Parallax
    const interactiveHeroes = document.querySelectorAll('.interactive-hero');
    interactiveHeroes.forEach(hero => {
        hero.addEventListener('mousemove', (e) => {
            // Only apply parallax on desktop
            if(window.innerWidth < 992) return;
            
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            const layers = hero.querySelectorAll('.parallax-layer');
            layers.forEach(layer => {
                const speed = layer.getAttribute('data-speed') || 1;
                gsap.to(layer, {
                    x: x * speed,
                    y: y * speed,
                    duration: 1,
                    ease: 'power1.out'
                });
            });
        });
    });
});
