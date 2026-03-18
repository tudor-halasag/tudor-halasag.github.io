/**
 * Main JavaScript for Professional Portfolio
 * Handles: Loader, Theme Toggle, Language Switch, and Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Logic
    const loader = document.getElementById('loader');
    const loaderPercent = document.getElementById('loaderPercent');
    let progress = 0;

    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden'); // Matches CSS .loader-screen.hidden [cite: 46]
                document.body.style.overflow = 'auto';
            }, 500);
        }
        loaderPercent.textContent = `${progress}%`;
    }, 100);

    // 2. Theme Toggle (Dark/Light)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // 3. Language Toggle (English/Arabic)
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');

    langToggle.addEventListener('click', () => {
        const currentLang = body.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        const newDir = newLang === 'ar' ? 'rtl' : 'ltr';

        // Update body attributes for CSS selectors [cite: 40]
        body.setAttribute('data-lang', newLang);
        body.setAttribute('data-dir', newDir);
        body.dir = newDir;

        // Toggle button text
        langText.textContent = newLang === 'en' ? 'AR' : 'EN';

        // Switch all translatable text
        document.querySelectorAll('[data-text-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-text-${newLang}`);
        });

        // Switch all placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${newLang}`);
        });
    });

    // 4. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('show'); // Ensure your CSS handles .nav-menu.show
    });
});
