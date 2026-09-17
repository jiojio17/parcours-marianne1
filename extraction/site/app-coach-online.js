/* Coach Marianne en ligne : après la réponse locale instantanée, une réponse affinée
   par la cascade IA (Cloudflare → Mistral → Gemini) via /api/coach.
   Hors-ligne ou sans serveur : rien ne change, le coach local reste la référence. */
(function () {
  'use strict';
  document.addEventListener('submit', async e => {
    if (!e.target || e.target.id !== 'coach-form') return;
    if (!navigator.onLine) return;
    const q = (document.getElementById('coach-input')?.value || '').trim();
    if (q.length < 4) return;
    const chat = document.getElementById('chat');
    if (!chat) return;
    const wait = document.createElement('p');
    wait.className = 'bubble ai';
    wait.dataset.pending = '1';
    wait.textContent = 'Je vérifie avec mes repères en ligne…';
    setTimeout(() => { chat.appendChild(wait); chat.scrollTop = chat.scrollHeight; }, 200);
    try {
      const res = await fetch('./api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      if (!res.ok) throw new Error('coach');
      const j = await res.json();
      if (!j || !j.answer) throw new Error('coach');
      wait.textContent = j.answer;
      const from = document.createElement('small');
      from.className = 'ai-from';
      from.textContent = '· Marianne en ligne (' + (j.source || 'cascade') + ')';
      wait.appendChild(from);
      wait.removeAttribute('data-pending');
    } catch (_) {
      wait.textContent = 'Je reste sur mes repères locaux : la réponse ci-dessus reste la bonne.';
      wait.removeAttribute('data-pending');
    }
    chat.scrollTop = chat.scrollHeight;
  });
})();
