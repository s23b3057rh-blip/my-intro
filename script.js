document.addEventListener('DOMContentLoaded', () => {

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            setTimeout(() => {
                follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });

        const interactives = document.querySelectorAll('a, .profile-image-container, .scroll-indicator');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '60px';
                follower.style.height = '60px';
                follower.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.backgroundColor = 'transparent';
            });
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Initially add the show class to navbar to make it visible right away
        setTimeout(() => {
            navbar.classList.add('show');
        }, 300);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(11, 12, 16, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.mixBlendMode = 'normal';
                navbar.style.padding = '1.5rem 4rem';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.mixBlendMode = 'difference';
                navbar.style.padding = '2rem 4rem';
            }
        });
    }

    // Glitch effect enhancement
    const glitchTitle = document.querySelector('.glitch');
    if(glitchTitle) {
        setInterval(() => {
            glitchTitle.style.animation = 'none';
            void glitchTitle.offsetWidth; // Trigger reflow
            glitchTitle.style.animation = 'glitch 2500ms infinite';
        }, 5000);
    }
});
