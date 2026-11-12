document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // VARIABLES
  // =========================================================
  const HOOK_EDUCATION = "https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/website_page_education";
  const HOOK_STATS = "https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/visit_page_education";

  // =========================================================
  // PARTIE 1 : STATISTIQUES (Page acces.html)
  // =========================================================
  const driveLink = document.getElementById("drive-link");

  if (driveLink) {
    // 1. Créer un ID de session unique pour cette visite
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = "visite_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
      sessionStorage.setItem("session_id", sessionId);
    }

    // 2. Fonction d'envoi vers n8n (silencieuse)
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

    // 3. Enregistrer la vue de la page
    trackEvent("page_view");

    // 4. Enregistrer le clic sur le Drive
    driveLink.addEventListener("click", () => {
      const selectedRadio = document.querySelector('input[name="classe"]:checked');
      const classe = selectedRadio ? selectedRadio.value : "Inconnue";
      trackEvent("drive_click", { classe: classe });
    });
  }

  // =========================================================
  // PARTIE 2 : FORMULAIRE DE CONTACT (Page education.html)
  // =========================================================
  const formEducation = document.getElementById("education-form");

  if (formEducation) {
    formEducation.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = formEducation.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.textContent = "Envoi en cours…";
      btn.disabled = true;

      const formData = new FormData(formEducation);
      const data = Object.fromEntries(formData);

      // On s'assure que le sujet est bien défini
      if (!data.sujet) data.sujet = "Virtuel All Education — contact vitrine";

      try {
        const res = await fetch(HOOK_EDUCATION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error(res.status);

        // Succès : on cache le formulaire et on affiche le message
        formEducation.classList.add("hidden");
        const successEl = formEducation.parentElement.querySelector(".success");
        if (successEl) successEl.classList.remove("hidden");
        
      } catch (err) {
        // Erreur
        const errEl = formEducation.parentElement.querySelector(".error");
        if (errEl) errEl.classList.remove("hidden");
        btn.textContent = label;
        btn.disabled = false;
      }
    });
  }
});