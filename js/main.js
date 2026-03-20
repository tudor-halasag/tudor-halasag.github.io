document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Optional: Save preference to local storage
        localStorage.setItem('theme', newTheme);
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a timeline or project card, they might need the class too
                const children = entry.target.querySelectorAll('.timeline-item, .project-card');
                children.forEach(child => child.classList.add('visible'));
            }
        });
    }, observerOptions);

    // Observe all sections and animation-ready items
    document.querySelectorAll('.section, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });
});
