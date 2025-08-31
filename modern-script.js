// Modern JavaScript for Website Interactions
class ModernWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileNavigation();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupPerformanceOptimizations();
    }

    // Theme Management
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;
        
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Add animation feedback
                themeToggle.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    themeToggle.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const body = document.body;
        
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                const isActive = mobileToggle.classList.contains('active');
                
                if (isActive) {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                } else {
                    mobileToggle.classList.add('active');
                    mobileNav.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            });
            
            // Close mobile nav when clicking on a link
            const mobileLinks = mobileNav.querySelectorAll('.nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                });
            });
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
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

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Throttled scroll handler for performance
        let ticking = false;
        
        const updateOnScroll = () => {
            this.updateNavigationState();
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    // Update navigation active state based on scroll position
    updateNavigationState() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalImages = [
            'img/profile.jpeg',
            'img/google-scholar.png',
            'img/rg.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Enhanced Card Interactions
class CardInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardHoverEffects();
        this.setupCardClickAnimations();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.info-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(card) {
        const cardIcon = card.querySelector('.card-icon');
        if (cardIcon) {
            cardIcon.style.transform = 'scale(1.1) rotate(5deg)';
            cardIcon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    removeHoverEffect(card) {
        const cardIcon = card.querySelector('.card-icon');
        if (cardIcon) {
            cardIcon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    setupCardClickAnimations() {
        const listItems = document.querySelectorAll('.card-list-item');
        
        listItems.forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Social Links Enhancement
class SocialLinksEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupSocialAnimations();
        this.setupTooltips();
    }

    setupSocialAnimations() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            // Staggered entrance animation
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Hover animations
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupTooltips() {
        const socialLinks = document.querySelectorAll('.social-link[title]');
        
        socialLinks.forEach(link => {
            const tooltip = document.createElement('div');
            tooltip.className = 'social-tooltip';
            tooltip.textContent = link.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--gray-800);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                pointer-events: none;
                opacity: 0;
                transform: translateX(-50%) translateY(-100%);
                transition: all 0.3s;
                z-index: 1000;
                white-space: nowrap;
                top: -10px;
                left: 50%;
            `;
            
            link.style.position = 'relative';
            link.appendChild(tooltip);
            
            link.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(-100%) translateY(-8px)';
            });
            
            link.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
            });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
    new CardInteractions();
    new SocialLinksEnhancer();
});

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// Read More Functionality
function toggleReadMore() {
    const fullText = document.querySelector('.description-full');
    const button = document.querySelector('.read-more-btn');
    const buttonText = document.querySelector('.read-more-text');
    const buttonIcon = document.querySelector('.read-more-icon');
    
    if (fullText.style.display === 'none' || fullText.style.display === '') {
        fullText.style.display = 'block';
        buttonText.textContent = 'Read Less';
        button.classList.add('expanded');
        
        // Smooth animation
        fullText.style.opacity = '0';
        fullText.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            fullText.style.opacity = '1';
            fullText.style.transform = 'translateY(0)';
        }, 10);
    } else {
        fullText.style.opacity = '0';
        fullText.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            fullText.style.display = 'none';
            buttonText.textContent = 'Read More';
            button.classList.remove('expanded');
        }, 300);
    }
}

// Console greeting
console.log(`
🚀 Welcome to Binayak Lohani's Modern Portfolio!
🔬 Exploring the frontiers of mechanical engineering
💻 Built with modern web technologies
`);
