/**
 * Virtuel All Tech - Script Portfolio Officiel 2026
 * Système de navigation, contact et tracking n8n intégré
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURATION DU TRACKING (Session & Temps) ---
    const startTime = Date.now();
    if (!sessionStorage.getItem('session_id')) {
        sessionStorage.setItem('session_id', 'sess_' + Math.random().toString(36).substr(2, 9));
    }

    const trackEvent = (type, extraData = {}) => {
        const payload = {
            sessionId: sessionStorage.getItem('session_id'),
            event: type,
            url: window.location.pathname,
            timestamp: new Date().toISOString(),
            ...extraData
        };
        // Remplace par ton URL Webhook n8n dédiée au tracking
        navigator.sendBeacon('https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook-test/stats', JSON.stringify(payload));
    };

    // Tracking de la visite au chargement
    trackEvent('page_view', { referrer: document.referrer });

    // Tracking du temps passé à la fermeture de la page
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('session_end', { duration_seconds: timeSpent });
    });


    // --- 2. ANIMATIONS & UI (AOS) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true, easing: 'ease-out-quad' });
    }


    // --- 3. GESTION DU MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    const toggleMenu = (forceClose = false) => {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');

        if (forceClose || !isHidden) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
        } else {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            if (menuIcon) menuIcon.classList.replace('fa-bars', 'fa-xmark');
        }
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }


    // --- 4. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        const container = navbar.querySelector('.container');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'bg-slate-900/98', 'shadow-2xl', 'backdrop-blur-md');
            if(container) container.classList.replace('h-28', 'h-20');
        } else {
            navbar.classList.remove('py-2', 'bg-slate-900/98', 'shadow-2xl', 'backdrop-blur-md');
            if(container) container.classList.replace('h-20', 'h-28');
        }
    });


    // --- 5. FORMULAIRE DE CONTACT (n8n Webhook) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('success-message');
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Envoi...';
            btn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://ton-n8n.com/webhook/formwebsite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    this.reset();
                    this.classList.add('hidden');
                    if (successMsg) successMsg.classList.remove('hidden');
                    trackEvent('form_submission_success'); // On track aussi le succès
                } else { throw new Error(); }
            } catch (error) {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert("Erreur d'envoi. Réessayez bientôt.");
            }
        });
    }
});