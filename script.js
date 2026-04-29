// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW failed'));
    });
}

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navMenu?.classList.toggle('open');
});

// Fermer menu sur clic lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Form validation & submit
const form = document.querySelector('form');
form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validation simple
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if (!data.name || !data.email) {
        alert('Veuillez remplir les champs obligatoires');
        return;
    }
    
    // Simulation envoi (remplace par ton API)
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Envoi...';
    button.disabled = true;
    
    try {
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simu
        form.reset();
        alert('✅ Message envoyé ! Nous vous contactons sous 24h.');
    } catch (error) {
        alert('❌ Erreur: ' + error.message);
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});

// Smooth scroll & active nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer pour animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
