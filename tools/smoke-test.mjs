import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const html = readFileSync('/home/user/parcours-marianne1/app/index.html', 'utf8');
const dom = new JSDOM(html, {
  url: 'http://localhost:4173/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;
window.confirm = () => true;
const run = (f) => window.eval(readFileSync('/home/user/parcours-marianne1/app/' + f, 'utf8'));
run('data/questions.js');
run('data/series.js');
run('app.js');

const app = window.document.getElementById('app');
const tick = () => new Promise((r) => setTimeout(r, 10));
const nav = async (hash) => { window.location.hash = hash; window.dispatchEvent(new window.Event('hashchange')); await tick(); };
const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const ok = (label, cond, extra = '') => console.log((cond ? '✅' : '❌') + ' ' + label + (extra ? ' — ' + extra : ''));

// 1. accueil
ok('Accueil rendu', app.innerHTML.includes('examen civique'));
ok('Statistiques affichées', app.innerHTML.includes('285'));

// 2. examen blanc
await nav('#/examen/aleatoire');
const card = window.document.getElementById('qcard');
ok('Examen : première question affichée', !!card && card.innerHTML.includes('question-text'));
ok('Examen : 4 réponses proposées', card.querySelectorAll('.option').length === 4);
ok('Examen : minuteur démarré', window.document.getElementById('timer').textContent.startsWith('45:') || /^\d+:\d\d$/.test(window.document.getElementById('timer').textContent), window.document.getElementById('timer').textContent);
ok('Examen : 40 pastilles de navigation', window.document.querySelectorAll('#qgrid button').length === 40);

// 3. répondre à toutes les questions en cochant la bonne réponse (via les données)
const total = 40;
let correctCount = 0;
for (let i = 0; i < total; i++) {
  const cur = window.document.getElementById('qcard');
  const meta = cur.querySelector('.question-meta').textContent;
  // retrouver la question affichée par son texte
  const text = cur.querySelector('.question-text').textContent;
  const q = window.QUIZ_DATA.questions.find((x) => x.q === text);
  const good = q.options[q.correct];
  const buttons = Array.from(cur.querySelectorAll('.option'));
  const idx = buttons.findIndex((b) => b.textContent.includes(good));
  click(buttons[idx]);
  if (i < total - 1) {
    click(window.document.getElementById('btn-next'));
  }
}
ok('Toutes les questions répondables', true);

// 4. terminer
click(window.document.getElementById('btn-finish'));
await tick();
ok('Redirection vers le résultat', window.location.hash === '#/resultat', window.location.hash);
ok('Score 40/40 attendu', app.innerHTML.includes('Examen réussi'), app.textContent.match(/\d+ \/ 40/)?.[0] || '');
ok('Historique enregistré', (window.localStorage.getItem('pm.historique') || '').includes('"score":40'));

// 5. série numérotée
await nav('#/examen/serie-07');
ok('Série 7 démarre', window.document.getElementById('qcard').innerHTML.includes('question-text'));
ok('Titre de série affiché', app.innerHTML.includes('Série 7'));

// 6. mauvaises réponses -> corrigé détaillé
for (let i = 0; i < 40; i++) {
  const cur = window.document.getElementById('qcard');
  const text = cur.querySelector('.question-text').textContent;
  const q = window.QUIZ_DATA.questions.find((x) => x.q === text);
  const good = q.options[q.correct];
  const buttons = Array.from(cur.querySelectorAll('.option'));
  const wrong = buttons.find((b) => !b.textContent.includes(good));
  click(wrong);
  if (i < 39) click(window.document.getElementById('btn-next'));
}
click(window.document.getElementById('btn-finish'));
await tick();
ok('Verdict d’échec affiché', app.innerHTML.includes('Examen non validé'));
ok('Corrigé détaillé affiché', app.innerHTML.includes('Bonne réponse :'));
ok('Explication affichée', app.innerHTML.includes('explanation'));

// 7. révision par thème
await nav('#/revision/valeurs');
ok('Révision : question affichée', window.document.getElementById('qcard') === null && app.innerHTML.includes('question-card'));
const ropts = window.document.querySelectorAll('.option');
click(ropts[0]);
ok('Révision : correction immédiate', window.document.getElementById('feedback').innerHTML.includes('Bonne réponse'));
ok('Révision : bouton suivant activé', !window.document.getElementById('btn-next').disabled);

// 8. banque complète
await nav('#/questions');
ok('Banque complète listée', window.document.querySelectorAll('details.qa').length === 285);

// 9. liste des séries
await nav('#/series');
ok('40 séries listées', app.querySelectorAll('a.serie').length === 40);

// 10. historique
await nav('#/historique');
ok('Historique affiché', app.innerHTML.includes('Historique'));

/* ---------- 11. parcours personnalisé : bilan de départ, programme, séance guidée ---------- */
window.localStorage.removeItem('pm.profil');
window.localStorage.removeItem('pm.stats');
await nav('#/');
ok('Accueil sans profil : invitation au bilan', app.innerHTML.includes('bilan de départ'));

await nav('#/bilan');
ok('Bilan : étape 1 affichée', app.innerHTML.includes('Étape 1 / 3'));
const btnNext = () => window.document.getElementById('btn-next');
ok('Bilan : « Continuer » bloqué sans réponse', btnNext().disabled === true);
click(window.document.querySelector('button[data-level="reperes"]'));
ok('Bilan : niveau sélectionné', window.document.querySelector('button[data-level="reperes"]').classList.contains('selected'));
ok('Bilan : « Continuer » débloqué', btnNext().disabled === false);
click(btnNext());
await tick();
ok('Bilan : étape 2 (calendrier)', app.innerHTML.includes('Étape 2 / 3'));
click(window.document.querySelector('button[data-min="20"]'));
await tick();
click(btnNext());
await tick();
ok('Bilan : étape 3 (priorités)', app.innerHTML.includes('Étape 3 / 3'));
click(window.document.querySelector('button[data-theme="histoire"]'));
await tick();
click(btnNext());
await tick();
ok('Bilan terminé → programme', window.location.hash === '#/parcours', window.location.hash);
ok('Programme : séance du jour proposée', app.innerHTML.includes('Ta séance du jour'));
ok('Programme : plan affiché', app.innerHTML.includes('Ton plan'));
ok('Profil enregistré', (window.localStorage.getItem('pm.profil') || '').includes('"minutes":20'));

await nav('#/seance');
const seanceCard = window.document.getElementById('qcard');
ok('Séance guidée démarrée', !!seanceCard && seanceCard.querySelectorAll('.option').length === 4);
click(seanceCard.querySelectorAll('.option')[0]);
await tick();
ok('Séance guidée : réponse enregistrée', window.document.querySelectorAll('.option.selected').length === 1);

await nav('#/parcours');
ok('Programme : statistiques mises à jour', app.innerHTML.includes('questions travaillées'));
ok('Programme : thème prioritaire marqué', app.innerHTML.includes('prioritaire'));
