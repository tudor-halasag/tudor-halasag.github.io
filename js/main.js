const translations = {
    en: {
        "name": "Tudor-Andrei Hălășag",
        "title": "Robotics & Industrial Engineering Student",
        "about-title": "Profile Description",
        "projects-title": "Key Projects",
        "p1": "Implemented SHA-256 hashing to encrypt and decrypt audio files at binary level.",
        "p2": "Simulated the full Bucharest transit network including metro, tram, and bus lines.",
        "p3": "Designed a functional transformer applying electromagnetic theory and winding calculations."
    },
    ro: {
        "name": "Tudor-Andrei Hălășag",
        "title": "Student Robotică și Inginerie Industrială",
        "about-title": "Descriere Profil",
        "projects-title": "Proiecte Cheie",
        "p1": "Implementat hashing SHA-256 pentru criptarea și decriptarea fișierelor audio la nivel binar.",
        "p2": "Simularea întregii rețele de tranzit din București, inclusiv liniile de metrou, tramvai și autobuz.",
        "p3": "Proiectarea unui transformator funcțional aplicând teoria electromagnetică."
    },
    it: { "name": "Tudor-Andrei Hălășag", "about-title": "Descrizione del profilo", "projects-title": "Progetti chiave" },
    fr: { "name": "Tudor-Andrei Hălășag", "about-title": "Description du profil", "projects-title": "Projets clés" },
    de: { "name": "Tudor-Andrei Hălășag", "about-title": "Profilbeschreibung", "projects-title": "Wichtige Projekte" },
    ar: { "name": "تودور أندري هالشاج", "about-title": "وصف الملف الشخصي", "projects-title": "المشاريع الرئيسية" },
    zh: { "name": "都铎-安德烈·哈拉萨格", "about-title": "个人简介", "projects-title": "重点项目" }
};

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggle');
    const langSelect = document.getElementById('langSelect');
    const body = document.body;

    // --- DARK MODE LOGIC ---
    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        
        // Update Icon
        themeBtn.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        
        // Save preference
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // --- LANGUAGE SWITCH LOGIC ---
    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        body.setAttribute('data-lang', lang);
        
        // Set Right-to-Left for Arabic
        body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        // Update all elements with a data-key attribute
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    });

    // Load saved theme on startup
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeBtn.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
});
