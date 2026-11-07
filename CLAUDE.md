# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Page d'accueil vendeur (index.html) : sections dans l'ordre logique (Ce que vous gagnez, Services, Preuves, Projet pilote, FAQ, CTA). Les détails approfondis sont sur projets.html. Design Tailwind (CDN) + custom CSS, sans build. Contenu en français, pas d'invention de témoignages, chiffres, clients ou prix.

## Tech Stack

- **HTML5** — `index.html` (accueil) + `projets.html` (détails projets) + `blog/` (articles)
- **Tailwind CSS** — loaded via CDN (`cdn.tailwindcss.com`), utility-first classes inline
- **Custom CSS** — `CSS/style.css` pour les overrides (variables CSS, scrollbar, glassmorphism, tweaks AOS)
- **JavaScript Vanilla** — `JS/script.js` pour la navigation, la gestion du formulaire et l'analytics
- **Bibliothèques (CDN)** : AOS (animations au défilement), Font Awesome 6 (icônes), Google Fonts (Inter, Orbitron)
- **Backend** : points de terminaison webhook n8n pour la soumission du formulaire et le suivi analytique
- **Analytics** : Cloudflare Web Analytics + suivi d'événements personnalisé via n8n

## Structure du projet

```
├── index.html          # Page d'accueil vendeur (Hero + 6 sections + formulaire contact)
├── projets.html        # Détails des projets réalisés (cas réels, démonstrations, liens)
├── CSS/style.css       # Styles personnalisés et variables CSS
├── JS/script.js        # Navigation, initialisation AOS, gestion du formulaire, suivi
├── assets/             # Images (logo, photos de profil), CV PDF, certificats PNG
├── blog/               # Articles (n8n/Gmail, Telegram local, filigranes IA Claude)
└── CLAUDE.md
```

## Décisions d'architecture clés

- **Pas d'étape de build** : Tailwind est chargé depuis le CDN à l'exécution. Aucun `package.json`, aucun bundler, aucune transpilation.
- **Pas de framework** : HTML/CSS/JS pur. Aucun React, Vue ou autre framework.
- **Webhooks n8n** : Le formulaire de contact (`#contact-form`) envoie du JSON vers le webhook `formwebsite`. Les événements d'analytics envoient vers le webhook `stats`. Tous deux utilisent `fetch()` avec `mode: 'no-cors'`.
- **Exclusion de Google Translate** : Les éléments possédant la classe `.notranslate` sont exclus de la traduction automatique (noms de marque).
- **Suivi de session** : `sessionStorage` génère un `session_id` unique par session de navigateur pour l'analytics.

## Sections (index.html - accueil vendeur)

| ID / Section        | Contenu (dans l'ordre)                                                                              |
|---------------------|-----------------------------------------------------------------------------------------------------|
| Hero                | Logo, titre, slogan, image de profil, coordonnées, CTA                                               |
| Ce que vous gagnez  | 3 cartes : gagner du temps, réduire les erreurs, se concentrer sur l'essentiel                       |
| Services            | 3 cartes : automatisation de processus, assistants IA sur mesure, conseil et accompagnement IA      |
| Preuves             | Cas réel (agence immobilière Yaoundé), démo de l'assistant juridique, GitHub, certifications, ressources |
| Projet pilote       | Encadré avec tarif 50 000 FCFA, suivi 20 000 FCFA/mois, paiement Mobile Money                      |
| Questions fréquentes| 4 questions : durée, sécurité des données, coût, maintenance                                         |
| Contact             | Formulaire (n8n webhook) dans le footer                                                            |
| Bouton WhatsApp     | Flottant discret sur mobile (lien déjà présent)                                                     |

## Tâches courantes

**Aperçu local** : Ouvrez `index.html` directement dans un navigateur, ou utilisez un serveur local :
```bash
# Python
python -m http.server 8000

# Node.js (si disponible)
npx serve .
```

**Pas de commandes lint/test/build** — il s'agit d'un site statique sans outil de configuration.

## Intégrations externes

- **Webhooks n8n** (auto-hébergés sur Hugging Face Spaces) :
  - Formulaire : `https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/formwebsite`
  - Statistiques : `https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/stats`
- **Google Forms** : liens de téléchargement des ressources (variantes FR/EN par ressource)
- **Notion** : lien vers le centre de ressources
- **Cloudflare Web Analytics** : script beacon dans le footer
- **WhatsApp** : lien de contact direct (`wa.me/237673219281`)

## Directives de contenu

- Tout le texte visible est en français ; ne pas traduire les marques de commerce (classe `.notranslate`)
- Liens sociaux : LinkedIn, Facebook, WhatsApp, TikTok
- Images de profil dans `assets/` : privilégier les formats optimisés (.webp) plutôt que les .jpg/.png bruts