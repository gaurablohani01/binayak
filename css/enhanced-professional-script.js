// Enhanced Professional JavaScript with Smooth Animations
class EnhancedProfessionalWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileNavigation();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupReadMore();
        this.setupScrollIndicator();
        this.updateNavigationState();
        this.setupScrollHeader();
        this.setupCardHoverEffects();
        this.triggerLoadAnimations();
    }

    // Enhanced Theme Toggle with Animation
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                // Add smooth transition
                html.style.transition = 'background 0.5s ease, color 0.5s ease';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Animate button
                themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
                setTimeout(() => {
                    themeToggle.style.transform = '';
                }, 300);
            });
        }
    }

    // Mobile Navigation with Smooth Transitions
    setupMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const body = document.body;
        
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                const isActive = mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
                body.style.overflow = isActive ? 'hidden' : '';
            });
            
            // Close on link click
            const mobileLinks = mobileNav.querySelectorAll('.nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                });
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    }

    // Enhanced Scroll Animations with Stagger Effect
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Smooth Scrolling with Easing
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#' || targetId === '#home') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Read More with Smooth Animation
    setupReadMore() {
        const readMoreBtn = document.querySelector('.read-more-btn');
        const descriptionFull = document.querySelector('.description-full');
        
        if (readMoreBtn && descriptionFull) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isExpanded = descriptionFull.classList.contains('expanded');
                
                if (isExpanded) {
                    descriptionFull.classList.remove('expanded');
                    readMoreBtn.classList.remove('expanded');
                    readMoreBtn.querySelector('.read-more-text').textContent = 'Read More';
                } else {
                    descriptionFull.classList.add('expanded');
                    readMoreBtn.classList.add('expanded');
                    readMoreBtn.querySelector('.read-more-text').textContent = 'Read Less';
                }
            });
        }
    }

    // Scroll Indicator with Smooth Hide/Show
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            let lastScroll = 0;
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 300) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
                
                lastScroll = currentScroll;
            });
            
            // Click to scroll
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.info-section');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Scroll Header Effect
    setupScrollHeader() {
        const nav = document.querySelector('.modern-nav');
        let lastScroll = 0;
        
        if (nav) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });
        }
    }

    // Update Navigation Active State
    updateNavigationState() {
        let ticking = false;
        
        const updateNav = () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Check if we're on a page with sections (index.html)
            if (sections.length === 0) {
                // We're on a different page, don't update nav state
                return;
            }
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 200 && sectionTop >= -section.offsetHeight + 200) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Only update for hash links (internal navigation)
                if (href.startsWith('#')) {
                    link.classList.remove('active');
                    if (href === `#${currentSection}` || (href === '#home' && !currentSection)) {
                        link.classList.add('active');
                    }
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
        updateNav();
    }

    // Card Hover Effects
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.info-card');
        
        cards.forEach(card => {
            // Parallax effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Trigger Load Animations
    triggerLoadAnimations() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.prefetchLinks();
        this.setupIntersectionObserver();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    prefetchLinks() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        const prefetchLink = (href) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        };
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                prefetchLink(link.href);
            }, { once: true });
        });
    }

    setupIntersectionObserver() {
        // Add viewport detection for performance
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// Smooth Page Transitions
class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageLoad();
        this.setupLinkTransitions();
    }

    setupPageLoad() {
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            
            // Trigger hero animations
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-text > *, .hero-image, .social-links');
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 100);
        });
    }

    setupLinkTransitions() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Add subtle transition effect
                document.body.style.transition = 'opacity 0.3s ease';
            });
        });
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

function initializeWebsite() {
    new EnhancedProfessionalWebsite();
    new PerformanceOptimizer();
    new PageTransitions();
}

// Global function for backwards compatibility
function toggleReadMore() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const descriptionFull = document.querySelector('.description-full');
    
    if (readMoreBtn && descriptionFull) {
        const isExpanded = descriptionFull.classList.contains('expanded');
        
        if (isExpanded) {
            descriptionFull.classList.remove('expanded');
            readMoreBtn.classList.remove('expanded');
            readMoreBtn.querySelector('.read-more-text').textContent = 'Read More';
        } else {
            descriptionFull.classList.add('expanded');
            readMoreBtn.classList.add('expanded');
            readMoreBtn.querySelector('.read-more-text').textContent = 'Read Less';
        }
    }
}

// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Smooth reveal on page load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
});
