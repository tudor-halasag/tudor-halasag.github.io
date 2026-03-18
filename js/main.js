const translations = {
    en: {
        "name": "Tudor-Andrei Hălășag",
        "title": "Robotics & Industrial Engineering Student",
        "about-title": "Profile",
        "about-text": "I am Tudor-Andrei Hălășag, a Robotics and Industrial Engineering student at the Polytechnic University of Bucharest...",
        "skills-title": "Technical Expertise",
        "projects-title": "Key Projects",
        "contact-title": "Contact"
    },
    ro: {
        "name": "Tudor-Andrei Hălășag",
        "title": "Student Robotică și Inginerie Industrială",
        "about-title": "Profil",
        "about-text": "Sunt Tudor-Andrei Hălășag, student la Robotică și Inginerie Industrială la Universitatea Politehnica din București...",
        "skills-title": "Expertiză Tehnică",
        "projects-title": "Proiecte Cheie",
        "contact-title": "Contact"
    }
    // Add it, fr, de, ar, zh similarly...
};

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggle');
    const langSelect = document.getElementById('langSelect');
    const body = document.body;

    // --- Theme Logic ---
    themeBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // --- Language Logic ---
    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        body.setAttribute('data-lang', lang);
        
        // Update RTL for Arabic
        body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    });
});
