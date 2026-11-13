document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // VARIABLES GLOBALES
  // =========================================================
  const HOOK_EDUCATION =
    "https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/website_page_education";
  const HOOK_STATS =
    "https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/visit_page_education";

  // ⚠️ VOS LIENS DRIVE
  const liensDrive = {
    Troisieme:
      "https://drive.google.com/drive/folders/1rO0T9gJewUzqxLvgFG4MhiH9CQnssz1e?usp=sharing",
    Premiere_A:
      "https://drive.google.com/drive/folders/1nisN7oupN5GK7xq4nTItEwf9oaftysaP?usp=sharing",
    Premiere_C:
      "https://drive.google.com/drive/folders/1GoI2gnOBSa0dd3TelQDYLviRAeMQ8hDf?usp=sharing",
    Premiere_D:
      "https://drive.google.com/drive/folders/1V5EX1ew2uzdG6JBFFyIPSEU790rbHwHN?usp=sharing",
    Terminale_A:
      "https://drive.google.com/drive/folders/1nCMQWrzkBspIGlJ1hzaABnOFMmKiK9Rd?usp=sharing",
    Terminale_C:
      "https://drive.google.com/drive/folders/1OYEhmin4B4GK3k5KZqh39CIunwlm9PYH?usp=sharing",
    Terminale_D:
      "https://drive.google.com/drive/folders/18Ng85zoNju_8RoMhnsOefHrggNMu-my7?usp=sharing",
  };

  // =========================================================
  // PARTIE 1 : SÉLECTION DE LA CLASSE ET AFFICHAGE DU DRIVE (Page acces.html)
  // =========================================================
  const btn = document.getElementById("btn-voir");
  const btnContainer = document.getElementById("btn-container");
  const msg = document.getElementById("acces-msg");
  const stepClasse = document.getElementById("step-classe");
  const stepDrive = document.getElementById("step-drive");
  const driveLink = document.getElementById("drive-link");
  const driveLabel = document.getElementById("drive-label");

  if (btn) {
    const radios = document.querySelectorAll('input[name="classe"]');

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        console.log("👉 Classe sélectionnée :", radio.value);

        // 1. On récupère la carte (le span) qui vient d'être cliquée
        const carte = radio.nextElementSibling;

        // 2. On déplace le conteneur du bouton À L'INTÉRIEUR de cette carte
        if (carte && btnContainer) {
          carte.appendChild(btnContainer);
        }

        // 3. On affiche le bouton
        if (btnContainer) {
          btnContainer.classList.remove("hidden");
        }

        if (msg) msg.textContent = "";
      });
    });

    btn.addEventListener("click", () => {
      const selection = document.querySelector('input[name="classe"]:checked');
      if (!selection) return;

      const classe = selection.value;
      const lien = liensDrive[classe];

      if (!lien || lien.includes("REMPLACER_PAR")) {
        if (msg)
          msg.textContent =
            "Le lien pour la classe " + classe + " n'est pas encore configuré.";
        return;
      }

      // Affichage de l'écran 2
      if (driveLink) driveLink.href = lien;
      if (driveLabel)
        driveLabel.textContent =
          "Pack découverte — " + classe.replace("_", " ");
      if (stepClasse) stepClasse.classList.add("hidden");
      if (stepDrive) stepDrive.classList.remove("hidden");
    });
  }

  // =========================================================
  // PARTIE 2 : STATISTIQUES (Page acces.html)
  // =========================================================
  if (driveLink) {
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId =
        "visite_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
      sessionStorage.setItem("session_id", sessionId);
    }

    const trackEvent = (event, extra = {}) => {
      fetch(HOOK_STATS, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: event,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          ...extra,
        }),
      }).catch(() => {});
    };

    trackEvent("page_view");

    driveLink.addEventListener("click", () => {
      const selectedRadio = document.querySelector(
        'input[name="classe"]:checked',
      );
      const classe = selectedRadio ? selectedRadio.value : "Inconnue";
      trackEvent("drive_click", { classe: classe });
    });
  }

  // =========================================================
  // PARTIE 3 : FORMULAIRE DE CONTACT (Page education.html)
  // =========================================================
  const formEducation = document.getElementById("education-form");

  if (formEducation) {
    formEducation.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = formEducation.querySelector('button[type="submit"]');
      const label = submitBtn.textContent;
      submitBtn.textContent = "Envoi en cours…";
      submitBtn.disabled = true;

      const formData = new FormData(formEducation);
      const data = Object.fromEntries(formData);
      if (!data.sujet) data.sujet = "Virtuel All Éducation — contact vitrine";

      try {
        const res = await fetch(HOOK_EDUCATION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.status);
        formEducation.classList.add("hidden");
        const successEl = formEducation.parentElement.querySelector(".success");
        if (successEl) successEl.classList.remove("hidden");
      } catch (err) {
        const errEl = formEducation.parentElement.querySelector(".error");
        if (errEl) errEl.classList.remove("hidden");
        submitBtn.textContent = label;
        submitBtn.disabled = false;
      }
    });
  }
});
