/**
 * Virtuel All Tech - Script Portfolio Officiel 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation des animations AOS
    AOS.init({
        duration: 900,
        once: true,
        offset: 120,
        easing: 'ease-out-quad'
    });

    // 2. Gestion du Menu Mobile & Verrouillage du Scroll
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    const toggleMenu = (forceClose = false) => {
        if (forceClose || !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Réactive le scroll
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        } else {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Bloque le scroll
            if (menuIcon) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        }
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Fermer au clic sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        // Fermer au clic n'importe où
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(true);
            }
        });
    }

    // 3. Animation de la Navbar au Scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const container = navbar.querySelector('.container');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'bg-slate-900/98', 'shadow-2xl');
            if(container) container.classList.replace('h-28', 'h-20');
        } else {
            navbar.classList.remove('py-2', 'bg-slate-900/98', 'shadow-2xl');
            if(container) container.classList.replace('h-20', 'h-28');
        }
    });

    // 4. Gestion du Formulaire de Contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = document.getElementById('submit-btn');
            const successMsg = document.getElementById('success-message');

            // État de chargement
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Envoi en cours...';
            btn.disabled = true;
            btn.style.opacity = "0.7";

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // REMPLACE L'URL CI-DESSOUS PAR TON URL N8N PRODUCTION
            fetch('https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/formwebsite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (response.ok) {
                    contactForm.classList.add('hidden');
                    successMsg.classList.remove('hidden');
                } else {
                    throw new Error('Erreur serveur');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert("Une erreur est survenue. Vérifiez votre connexion ou l'URL du Webhook.");
                btn.innerText = "Envoyer ma demande";
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        });
    }
});