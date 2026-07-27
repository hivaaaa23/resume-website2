'use strict';

/* ==========================================
   CANALLA CAFE
   Premium Interaction System
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollReveal();
    initializeStatCounters();
    initializeHeroFloatingEffect();
    initializeHoverEffects();
    initializeParallaxElements();

});

/* ==========================================
   MOBILE MENU
========================================== */

function initializeMobileMenu() {

    const header = document.querySelector('.site-header');
    const navigation = document.querySelector('.main-navigation');

    if (!header || !navigation) return;

    let toggleButton = document.querySelector('.mobile-menu-toggle');

    if (!toggleButton) {

        toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle Menu');

        toggleButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        const headerActions = document.querySelector('.header-actions');

        if (headerActions) {
            headerActions.parentNode.insertBefore(
                toggleButton,
                headerActions
            );
        } else {
            header.appendChild(toggleButton);
        }
    }

    toggleButton.addEventListener('click', () => {

        navigation.classList.toggle('mobile-open');
        toggleButton.classList.toggle('active');
        document.body.classList.toggle('menu-open');

    });

    const navLinks = navigation.querySelectorAll('a');

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            navigation.classList.remove('mobile-open');
            toggleButton.classList.remove('active');
            document.body.classList.remove('menu-open');

        });

    });

    window.addEventListener('resize', () => {

        if (window.innerWidth > 768) {

            navigation.classList.remove('mobile-open');
            toggleButton.classList.remove('active');
            document.body.classList.remove('menu-open');

        }

    });

}

/* ==========================================
   SMOOTH SCROLLING
========================================== */

function initializeSmoothScrolling() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link => {

        link.addEventListener('click', event => {

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const targetElement =
                document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            const header =
                document.querySelector('.site-header');

            const offset =
                header ? header.offsetHeight : 0;

            const position =
                targetElement.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });

        });

    });

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(`
        .feature-card,
        .menu-card,
        .product-card,
        .testimonial-card,
        .gallery-item,
        .stat-card,
        .about-image,
        .about-content,
        .contact-information,
        .contact-form-wrapper,
        .morning-ritual-banner,
        .customize-drink-card,
        .newsletter-layout
    `);

    if (!revealElements.length) return;

    revealElements.forEach((element, index) => {

        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `
            opacity .8s ease,
            transform .8s ease
        `;

        element.style.transitionDelay =
            `${index * 0.05}s`;

    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = '1';
                entry.target.style.transform =
                    'translateY(0)';

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }

    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

}

/* ==========================================
   STATISTICS COUNTERS
========================================== */

function initializeStatCounters() {

    const stats =
        document.querySelectorAll('.stat-card strong');

    if (!stats.length) return;

    const counterObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            });

        },

        {
            threshold: 0.4
        }

    );

    stats.forEach(stat => {
        counterObserver.observe(stat);
    });

}

function animateCounter(element) {

    const originalText =
        element.textContent.trim();

    let target = 0;

    if (originalText.includes('25')) {
        target = 25000;
    } else if (originalText.includes('7')) {
        target = 7;
    } else if (originalText.includes('12')) {
        target = 12;
    } else if (originalText.includes('4.9')) {
        target = 4.9;
    }

    let startTime = null;

    const duration = 2200;

    function updateCounter(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }

        const progress =
            Math.min(
                (timestamp - startTime) / duration,
                1
            );

        const ease =
            1 - Math.pow(1 - progress, 3);

        let value = target * ease;

        if (target === 25000) {

            element.textContent =
                `${Math.floor(value).toLocaleString()}+`;

        }

        else if (target === 4.9) {

            element.textContent =
                `${value.toFixed(1)}★`;

        }

        else {

            element.textContent =
                `${Math.floor(value)}${target === 7 ? '+' : ''}`;

        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }

    }

    requestAnimationFrame(updateCounter);

}

/* ==========================================
   HERO FLOATING EFFECT
========================================== */

function initializeHeroFloatingEffect() {

    const heroImage =
        document.querySelector('.hero-image');

    if (!heroImage) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
        'mousemove',
        event => {

            const centerX =
                window.innerWidth / 2;

            const centerY =
                window.innerHeight / 2;

            mouseX =
                (event.clientX - centerX) * 0.015;

            mouseY =
                (event.clientY - centerY) * 0.015;

        },
        { passive: true }
    );

    function animateHero() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;

        const floating =
            Math.sin(Date.now() * 0.0015) * 10;

        heroImage.style.transform = `
            translate3d(
                ${currentX}px,
                ${currentY + floating}px,
                0
            )
        `;

        requestAnimationFrame(animateHero);

    }

    animateHero();

}

/* ==========================================
   PREMIUM HOVER EFFECTS
========================================== */

function initializeHoverEffects() {

    const interactiveCards =
        document.querySelectorAll(`
            .feature-card,
            .menu-card,
            .product-card,
            .testimonial-card,
            .gallery-item
        `);

    interactiveCards.forEach(card => {

        card.addEventListener('mousemove', event => {

            if (
                window.matchMedia(
                    '(hover: none)'
                ).matches
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;

        });

        card.addEventListener('mouseleave', () => {

            card.style.transform = '';
            card.style.transition =
                'transform .4s ease';

            setTimeout(() => {

                card.style.transition = '';

            }, 400);

        });

    });

}

/* ==========================================
   PARALLAX EFFECTS
========================================== */

function initializeParallaxElements() {

    const heroSection =
        document.querySelector('.hero-section');

    if (!heroSection) return;

    let ticking = false;

    function updateParallax() {

        const scrollY =
            window.pageYOffset;

        const heroImage =
            document.querySelector('.hero-image');

        const heroContent =
            document.querySelector('.hero-copy');

        if (heroImage) {

            heroImage.style.willChange =
                'transform';

            const offset =
                scrollY * 0.12;

            heroImage.style.filter = `
                drop-shadow(
                    0 0
                    ${30 + offset * 0.15}px
                    rgba(214,161,76,.25)
                )
            `;

        }

        if (heroContent) {

            heroContent.style.transform =
                `translateY(${scrollY * 0.08}px)`;

        }

        ticking = false;

    }

    window.addEventListener(
        'scroll',
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}

/* ==========================================
   HEADER SCROLL STATE
========================================== */

(function initializeHeaderState() {

    const header =
        document.querySelector('.site-header');

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    };

    updateHeader();

    window.addEventListener(
        'scroll',
        updateHeader,
        { passive: true }
    );

})();

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

(function initializeRippleEffects() {

    document.addEventListener('click', event => {

        const button =
            event.target.closest(
                '.btn, button'
            );

        if (!button) return;

        const ripple =
            document.createElement('span');

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(
                rect.width,
                rect.height
            );

        ripple.style.position = 'absolute';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.background =
            'rgba(255,255,255,.25)';
        ripple.style.transform =
            'translate(-50%,-50%) scale(0)';
        ripple.style.left =
            `${event.clientX - rect.left}px`;
        ripple.style.top =
            `${event.clientY - rect.top}px`;
        ripple.style.transition =
            'transform .6s ease, opacity .6s ease';

        if (
            getComputedStyle(button).position ===
            'static'
        ) {
            button.style.position = 'relative';
        }

        button.style.overflow = 'hidden';

        button.appendChild(ripple);

        requestAnimationFrame(() => {

            ripple.style.transform =
                'translate(-50%,-50%) scale(3)';

            ripple.style.opacity = '0';

        });

        setTimeout(() => {
            ripple.remove();
        }, 650);

    });

})();

/* ==========================================
   GALLERY SHINE EFFECT
========================================== */

(function initializeGalleryEffects() {

    const items =
        document.querySelectorAll(
            '.gallery-item'
        );

    items.forEach(item => {

        item.addEventListener('mouseenter', () => {

            item.style.willChange =
                'transform';

        });

        item.addEventListener('mouseleave', () => {

            item.style.willChange =
                'auto';

        });

    });

})();

/* ==========================================
   PERFORMANCE OPTIMIZATION
========================================== */

(function optimizePerformance() {

    const passiveEvents = [
        'touchstart',
        'touchmove',
        'wheel'
    ];

    passiveEvents.forEach(eventName => {

        window.addEventListener(
            eventName,
            () => {},
            { passive: true }
        );

    });

})();