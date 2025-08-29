// Enhanced JavaScript for responsive features and theme switching
let date = new Date();
let year = date.getFullYear();
let year_html = document.body.querySelector('.year');
let yeara = document.body.querySelector('.yeara');

if (year_html) year_html.innerHTML = `${year}`;
if (yeara) yeara.innerHTML = `${year}`;

// Theme Management System
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
        }
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a nice transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'T' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // System theme preference detection
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (!localStorage.getItem('theme')) {
                this.setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
            
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}

// Enhanced Animation System
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.intro, .intro-p, .card, .research-section, .publication-item, .single-cta'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            const backgrounds = document.querySelectorAll('.whole, .whole-research, .publication-whole');
            backgrounds.forEach(bg => {
                bg.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        };
        
        const requestParallax = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallax);
    }
    
    setupHoverAnimations() {
        // Enhanced card hover effects
        const cards = document.querySelectorAll('.card, .research-section, .intro, .intro-p');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-heavy)';
            });
            
            card.addEventListener('mouseleave', function(e) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-medium)';
            });
        });
        
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.theme-toggle, .network a, .btn');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// Enhanced Performance Manager
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeImages();
        this.setupReducedMotion();
        this.setupVirtualScrolling();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading animation
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    const loadHandler = () => {
                        img.style.opacity = '1';
                        img.removeEventListener('load', loadHandler);
                    };
                    
                    img.addEventListener('load', loadHandler);
                    
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', 'none');
            document.documentElement.style.setProperty('--transition-medium', 'none');
            document.documentElement.style.setProperty('--transition-slow', 'none');
        }
    }
    
    setupVirtualScrolling() {
        // Throttle scroll events for better performance
        let scrollTimeout;
        const throttledScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll-based optimizations
                this.updateNavbarOnScroll();
            }, 16); // ~60fps
        };
        
        window.addEventListener('scroll', throttledScroll);
    }
    
    updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.style.background = 'var(--bg-glass)';
            navbar.style.backdropFilter = 'blur(40px) saturate(200%)';
        } else {
            navbar.style.background = 'var(--bg-glass)';
            navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
        }
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme, animation, and performance managers
    const themeManager = new ThemeManager();
    const animationManager = new AnimationManager();
    const performanceManager = new PerformanceManager();
    
    // Add loading animation for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // Add a subtle entrance animation
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // Enhanced mobile menu behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarCollapse.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            }
        });
    }
    
    // Add smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add typing effect to main heading (optional, only on homepage)
    const mainHeading = document.querySelector('.name h1');
    if (mainHeading && window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    mainHeading.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after page load
        setTimeout(typeWriter, 1500);
    }
    
    // Add enhanced focus management for accessibility
    let focusedElementBeforeModal;
    
    document.addEventListener('keydown', function(e) {
        // Escape key handling
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add page transition effects
    const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                e.preventDefault();
                
                // Add exit animation
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate sticky elements on resize
    const stickyElements = document.querySelectorAll('.intro, .publication-name');
    stickyElements.forEach(el => {
        if (window.innerWidth < 768) {
            el.style.position = 'static';
            el.style.top = 'auto';
        } else {
            el.style.position = 'sticky';
            el.style.top = 'var(--space-xl)';
        }
    });
    
    // Update theme toggle position on mobile
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (window.innerWidth < 768) {
            themeToggle.style.right = 'var(--space-md)';
            themeToggle.style.top = '20%';
        } else {
            themeToggle.style.right = 'var(--space-lg)';
            themeToggle.style.top = '50%';
        }
    }
});

// Enhanced error handling and fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality works
});

// Add CSS feature detection and fallbacks
const supportsGrid = CSS.supports('display', 'grid');
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');

if (!supportsGrid) {
    document.body.classList.add('no-grid');
}

if (!supportsBackdropFilter) {
    document.body.classList.add('no-backdrop-filter');
}

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }
        }, 0);
    });
}
