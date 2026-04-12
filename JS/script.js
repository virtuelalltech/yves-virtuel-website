/**
 * Yves Virtuel / Virtuel All Tech - Script Officiel 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation des animations AOS (Animate On Scroll)
    AOS.init({
        duration: 900,
        once: true,
        offset: 120,
        easing: 'ease-out-quad'
    });

    // 2. Gestion du Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Animation de l'icône (Menu burger vs Croix)
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-xmark');
            }
        });

        // Fermer le menu si on clique sur un lien (Navigation fluide)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            });
        });

        // Fermer le menu si on clique n'importe où ailleurs sur l'écran
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            }
        });
    }

    // 3. Animation de la Navbar au Scroll (Réduction de hauteur)
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'bg-slate-900/98', 'shadow-2xl');
            navbar.querySelector('.container').classList.replace('h-28', 'h-20');
        } else {
            navbar.classList.remove('py-2', 'bg-slate-900/98', 'shadow-2xl');
            navbar.querySelector('.container').classList.replace('h-20', 'h-28');
        }
    });

    // 4. Feedback Formulaire (Simple)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Envoi en cours...';
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";
        });
    }
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la redirection

    const btn = document.getElementById('submit-btn');
    const form = e.target;
    const successMsg = document.getElementById('success-message');

    // Changement d'état du bouton pendant l'envoi
    btn.innerText = "Envoi en cours...";
    btn.disabled = true;

    // Récupération des données du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Envoi au Webhook n8n
    fetch('https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/8c199002-2419-499a-8793-197bf32903ba', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            form.classList.add('hidden'); // Cache le formulaire
            successMsg.classList.remove('hidden'); // Affiche le message de succès
        } else {
            alert("Erreur lors de l'envoi. Veuillez réessayer.");
            btn.innerText = "Envoyer ma demande";
            btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("Une erreur réseau est survenue.");
        btn.innerText = "Envoyer ma demande";
        btn.disabled = false;
    });
});