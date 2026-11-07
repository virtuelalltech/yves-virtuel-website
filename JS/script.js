/* Virtuel All Tech — navigation, contact et suivi n8n */
document.addEventListener('DOMContentLoaded', () => {
  const HOOK = 'https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/';
  const start = Date.now();
  if (!sessionStorage.getItem('session_id')) sessionStorage.setItem('session_id', 'sess_' + Math.random().toString(36).slice(2, 11));
  const track = (event, extra = {}) => fetch(HOOK + 'stats', {
    method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: sessionStorage.getItem('session_id'), brand: 'Virtuel All Tech', event, url: location.pathname, timestamp: new Date().toISOString(), ...extra })
  }).catch(() => {});
  track('page_view', { referrer: document.referrer || 'Direct Access' });
  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') track('session_end', { duration_seconds: Math.round((Date.now() - start) / 1000) });
  });

  const btn = document.getElementById('menu-toggle'), menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    const set = open => {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      btn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };
    btn.addEventListener('click', () => set(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); btn.focus(); } });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    const err = document.getElementById('form-error'), ok = document.getElementById('success-message'), sb = document.getElementById('submit-btn');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      err.classList.add('hidden');
      const label = sb.textContent; sb.textContent = 'Envoi en cours…'; sb.disabled = true;
      try {
        const res = await fetch(HOOK + 'formwebsite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
        if (!res.ok) throw new Error(res.status);
        form.reset(); form.classList.add('hidden'); ok.classList.remove('hidden'); track('form_submission_success');
      } catch (_) {
        err.classList.remove('hidden'); sb.textContent = label; sb.disabled = false;
      }
    });
  }
});
