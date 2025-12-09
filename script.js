// ========================================
// RANDOMIZATION ENGINE
// ========================================

class PortfolioTheme {
    constructor() {
        this.colorSchemes = [
            {
                name: 'dark-mode',
                label: 'Dark Mode',
                cssClass: 'theme-dark',
                colors: {
                    primary: '#ffffff',
                    secondary: '#e0e0e0',
                    accent: '#b0b0b0',
                    background: '#121212'
                }
            },
            {
                name: 'blue-tech',
                label: 'Blue Tech',
                cssClass: 'theme-blue',
                colors: {
                    primary: '#0066cc',
                    secondary: '#00bfff',
                    accent: '#0099ff',
                    background: '#f0f8ff'
                }
            },
            {
                name: 'warm-professional',
                label: 'Warm Professional',
                cssClass: 'theme-warm',
                colors: {
                    primary: '#8b4513',
                    secondary: '#cd853f',
                    accent: '#daa520',
                    background: '#fffdd0'
                }
            },
            {
                name: 'minimalist-green',
                label: 'Minimalist Green',
                cssClass: 'theme-green',
                colors: {
                    primary: '#556b2f',
                    secondary: '#6b8e23',
                    accent: '#7cb342',
                    background: '#f5f5f0'
                }
            }
        ];

        this.layoutStyles = [
            { name: 'left-aligned', label: 'Left-aligned Hero', cssClass: 'layout-left-aligned' },
            { name: 'centered', label: 'Centered Layout', cssClass: 'layout-centered' },
            { name: 'split-screen', label: 'Split-screen Design', cssClass: 'layout-split-screen' },
            { name: 'card-based', label: 'Card-based Sections', cssClass: 'layout-card-based' }
        ];

        this.animationStyles = [
            { name: 'fade', label: 'Subtle Fade-ins', cssClass: 'animation-fade' },
            { name: 'slide', label: 'Gentle Slide Animations', cssClass: 'animation-slide' },
            { name: 'scale', label: 'Hover Scaling Effects', cssClass: 'animation-scale' },
            { name: 'typewriter', label: 'Typewriter Text Effects', cssClass: 'animation-typewriter' }
        ];

        this.fontStyles = [
            { name: 'sans', label: 'Modern Sans-serif', cssClass: 'font-sans' },
            { name: 'geometric', label: 'Clean Geometric Fonts', cssClass: 'font-geometric' },
            { name: 'serif', label: 'Professional Serif Headings', cssClass: 'font-serif' }
        ];

        this.backgroundPatterns = [
            { name: 'geometric', label: 'Subtle Geometric Patterns', cssClass: 'pattern-geometric' },
            { name: 'dotted', label: 'Dotted Backgrounds', cssClass: 'pattern-dotted' },
            { name: 'gradient', label: 'Gradient Overlays', cssClass: 'pattern-gradient' },
            { name: 'solid', label: 'Clean Solid Colors', cssClass: 'pattern-solid' }
        ];

        // Initialize with random selections
        this.init();
    }

    init() {
        // Get or create random selections
        this.selectedColorScheme = this.getOrCreateSelection('colorScheme', this.colorSchemes);
        this.selectedLayout = this.getOrCreateSelection('layout', this.layoutStyles);
        this.selectedAnimation = this.getOrCreateSelection('animation', this.animationStyles);
        this.selectedFont = this.getOrCreateSelection('font', this.fontStyles);
        this.selectedPattern = this.getOrCreateSelection('pattern', this.backgroundPatterns);

        // Apply theme
        this.applyTheme();
        this.logThemeInfo();
    }

    getOrCreateSelection(key, options) {
        const storageKey = `portfolio_${key}`;
        let stored = localStorage.getItem(storageKey);

        if (!stored) {
            const randomIndex = Math.floor(Math.random() * options.length);
            stored = options[randomIndex].name;
            localStorage.setItem(storageKey, stored);
        }

        return options.find(opt => opt.name === stored);
    }

    applyTheme() {
        const body = document.body;

        // Clear existing theme classes
        body.className = body.className
            .split(' ')
            .filter(cls => !cls.startsWith('theme-') && !cls.startsWith('layout-') &&
                !cls.startsWith('animation-') && !cls.startsWith('font-') && !cls.startsWith('pattern-'))
            .join(' ');

        // Apply new theme classes
        body.classList.add(this.selectedColorScheme.cssClass);
        body.classList.add(this.selectedLayout.cssClass);
        body.classList.add(this.selectedAnimation.cssClass);
        body.classList.add(this.selectedFont.cssClass);

        // Apply pattern to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.className = hero.className
                .split(' ')
                .filter(cls => !cls.startsWith('pattern-'))
                .join(' ');
            hero.classList.add(this.selectedPattern.cssClass);
        }

        // Set CSS variables
        this.setCSSVariables();
    }

    setCSSVariables() {
        const scheme = this.selectedColorScheme.colors;
        const root = document.documentElement;

        root.style.setProperty('--primary-color', scheme.primary);
        root.style.setProperty('--secondary-color', scheme.secondary);
        root.style.setProperty('--accent-color', scheme.accent);
        root.style.setProperty('--background-color', scheme.background);

        // Set derived colors based on theme
        this.setDerivedColors();
    }

    setDerivedColors() {
        const root = document.documentElement;
        const isDark = this.selectedColorScheme.name === 'dark-mode';

        if (isDark) {
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--text-light', '#b0b0b0');
            root.style.setProperty('--card-bg', '#1e1e1e');
            root.style.setProperty('--card-border', '#333333');
        } else {
            root.style.setProperty('--text-color', this.selectedColorScheme.colors.primary);
            root.style.setProperty('--text-light', this.selectedColorScheme.colors.secondary);
            root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.02)');
            root.style.setProperty('--card-border', 'rgba(0, 0, 0, 0.08)');
        }
    }

    logThemeInfo() {
        console.log('%c🎨 Portfolio Theme Applied', 'color: #00bfff; font-weight: bold; font-size: 14px;');
        console.log(`%cColor Scheme: ${this.selectedColorScheme.label}`, 'color: #00bfff;');
        console.log(`%cLayout: ${this.selectedLayout.label}`, 'color: #00bfff;');
        console.log(`%cAnimation: ${this.selectedAnimation.label}`, 'color: #00bfff;');
        console.log(`%cTypography: ${this.selectedFont.label}`, 'color: #00bfff;');
        console.log(`%cBackground Pattern: ${this.selectedPattern.label}`, 'color: #00bfff;');
        console.log('%cRefresh the page to see a different random theme!', 'color: #00bfff; font-style: italic;');
    }

    resetTheme() {
        localStorage.removeItem('portfolio_colorScheme');
        localStorage.removeItem('portfolio_layout');
        localStorage.removeItem('portfolio_animation');
        localStorage.removeItem('portfolio_font');
        localStorage.removeItem('portfolio_pattern');
        location.reload();
    }
}

// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================

class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.mobileMenuOpen = false;

        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupScrollSpyHighlight();
    }

    setupMobileMenu() {
        if (!this.navToggle) return;

        this.navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close menu when clicking a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
    }

    openMobileMenu() {
        this.navbar.setAttribute('data-nav-open', '');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenuOpen = true;
    }

    closeMobileMenu() {
        this.navbar.removeAttribute('data-nav-open');
        this.navToggle?.setAttribute('aria-expanded', 'false');
        this.mobileMenuOpen = false;
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    setupScrollSpyHighlight() {
        const sections = document.querySelectorAll('section[id]');
        let ticking = false;

        const updateActiveLink = () => {
            let current = '';
            const scrollPos = window.pageYOffset + 100;

            sections.forEach(section => {
                if (section.offsetTop <= scrollPos) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveLink);
                ticking = true;
            }
        }, { passive: true });
    }
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

class AnimationTrigger {
    constructor() {
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = entry.target.style.animation || 'none';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.project-card, .skill-item, .timeline-item, .about-content').forEach(el => {
            observer.observe(el);
        });
    }
}

// ========================================
// TEXT EFFECT MANAGER
// ========================================

class TextEffectManager {
    constructor() {
        this.initTypewriterEffect();
    }

    initTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        const theme = new PortfolioTheme();

        if (heroTitle && theme.selectedAnimation.name === 'typewriter') {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let index = 0;

            const type = () => {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, 50);
                }
            };

            setTimeout(type, 200);
        }
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

class PerformanceOptimizer {
    constructor() {
        this.lazyLoadImages();
        this.debounceScroll();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    debounceScroll() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll events handled here
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

class AccessibilityManager {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusVisibility();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Tab key for navigation
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupAriaLabels() {
        // Add aria-labels to interactive elements if not present
        document.querySelectorAll('.btn, a, button').forEach(el => {
            if (!el.hasAttribute('aria-label') && el.textContent) {
                el.setAttribute('aria-label', el.textContent.trim());
            }
        });
    }

    setupFocusVisibility() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus-visible {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme with randomization
    const theme = new PortfolioTheme();

    // Initialize navigation
    new NavigationManager();

    // Initialize animations
    new AnimationTrigger();

    // Initialize text effects
    new TextEffectManager();

    // Initialize performance optimizations
    new PerformanceOptimizer();

    // Initialize accessibility
    new AccessibilityManager();

    // Log initialization complete
    console.log('%c✨ Portfolio fully loaded and ready!', 'color: #00ff00; font-weight: bold;');
});

// ========================================
// UTILITY: THEME RESET
// ========================================

// Make theme reset available in console for debugging
window.resetPortfolioTheme = () => {
    const theme = new PortfolioTheme();
    theme.resetTheme();
};

console.log('%cTip: Type resetPortfolioTheme() in console to reload with a different random theme!', 'color: #ffaa00; font-style: italic;');
