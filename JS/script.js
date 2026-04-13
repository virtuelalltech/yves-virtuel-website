/**
 * Virtuel All Tech - Script Portfolio Officiel 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation des animations AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 120,
            easing: 'ease-out-quad'
        });
    }

    // 2. Gestion du Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    const toggleMenu = (forceClose = false) => {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');

        if (forceClose || !isHidden) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Correction : on vide pour remettre par défaut
            if (menuIcon) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        } else {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            if (menuIcon) {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        }
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Fermeture automatique au clic sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(true);
            }
        });
    }

    // 3. Animation de la Navbar au Scroll (Optimisée)
    const navbar = document.querySelector('nav');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        
        // Optimisation de performance avec requestAnimationFrame
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                const container = navbar.querySelector('.container');
                if (window.scrollY > 50) {
                    navbar.classList.add('py-2', 'bg-slate-900/98', 'shadow-2xl', 'backdrop-blur-md');
                    if(container) container.classList.replace('h-28', 'h-20');
                } else {
                    navbar.classList.remove('py-2', 'bg-slate-900/98', 'shadow-2xl', 'backdrop-blur-md');
                    if(container) container.classList.replace('h-20', 'h-28');
                }
                scrollTimeout = false;
            });
            scrollTimeout = true;
        }
    });

    // 4. Gestion du Formulaire de Contact & Webhook n8n
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('success-message');
            if (!btn) return;

            // État visuel : Chargement
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Traitement...';
            btn.disabled = true;
            btn.classList.add('opacity-70', 'cursor-not-allowed');

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                // Remplace par ton URL n8n finale
                const response = await fetch('https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/formwebsite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    this.reset(); // Nettoyage du formulaire
                    this.classList.add('hidden');
                    if (successMsg) {
                        successMsg.classList.remove('hidden');
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    throw new Error('Réponse serveur incorrecte');
                }
            } catch (error) {
                console.error('Erreur Webhook:', error);
                alert("Oups ! Un problème de connexion est survenu. Réessayez ou contactez-moi directement via WhatsApp.");
                
                // Reset du bouton en cas d'erreur
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        });
    }
});