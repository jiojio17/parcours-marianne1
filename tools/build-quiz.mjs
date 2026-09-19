#!/usr/bin/env node
/**
 * build-quiz.mjs — construit les données du moteur de quiz Parcours Marianne.
 *
 * Entrées  : data/quizzes/*.json  (banque de questions rédigée à la main)
 * Sorties  : app/data/questions.js  (banque complète : 472 questions dont 67 mises en situation)
 *            app/data/series.js     (fichier de compatibilité : plus de série figée)
 *
 * Aucune dépendance externe. Le tirage des examens blancs, désormais aléatoire,
 * est fait côté navigateur par app/app.js (aucune série en dur : chaque tentative
 * pose des questions différentes).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data', 'quizzes');
const OUT = join(ROOT, 'app', 'data');

const THEMES = {
  vivre:       { label: 'Vivre dans la société française', short: 'Vivre en société' },
  histoire:    { label: 'Histoire, géographie et culture', short: 'Histoire et culture' },
  droits:      { label: 'Droits et devoirs',               short: 'Droits et devoirs' },
  institutions:{ label: 'Système institutionnel et politique', short: 'Institutions' },
  valeurs:     { label: 'Principes et valeurs de la République', short: 'Valeurs de la République' },
  situation:   { label: 'Mises en situation',              short: 'Mises en situation' },
};

// Format officiel de l'examen civique (décret 2025-1345 / arrêté du 10 octobre 2025)
const EXAM = {
  questions: 40,
  durationMin: 45,      // durée officielle de l'épreuve
  pass: 32,             // 80 %
  knowledge: 28,
  situations: 12,
  // répartition des 28 questions de connaissances
  mix: { vivre: 6, histoire: 6, droits: 5, institutions: 6, valeurs: 5 },
  seriesCount: 40,
};

/* ---------- chargement ---------- */
const bank = [];
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.json')).sort()) {
  const items = JSON.parse(readFileSync(join(SRC, file), 'utf8'));
  for (const item of items) {
    if (!item.id || !item.q || !Array.isArray(item.options) || item.options.length !== 4) {
      throw new Error(`Question invalide dans ${file} : ${item.id ?? '(sans id)'}`);
    }
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) {
      throw new Error(`'correct' invalide pour ${item.id}`);
    }
    if (!THEMES[item.theme]) throw new Error(`Thème inconnu pour ${item.id} : ${item.theme}`);
    bank.push({ ...item, themeLabel: THEMES[item.theme].label });
  }
}

const byId = new Map(bank.map((q) => [q.id, q]));
if (byId.size !== bank.length) throw new Error('Identifiants de questions en doublon');

/* ---------- dédoublonnage entre les sources ----------
   Les questions des sujets d'entraînement (source « sujet ») et celles importées
   du site Marianne (source « site ») portent souvent sur la même notion.
   On conserve la première (nos sujets), en récupérant l'apport de la seconde. */
const norm = (s) => s.toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

function apport(existing, autre) {
  let texte = (autre.why || '').trim();
  if (!texte) return;
  const dejaLa = norm(existing.why || '').includes(norm(texte).slice(0, 40));
  if (dejaLa) return;
  if (norm(existing.q) === norm(autre.q)) {
    const court = (existing.why || '').length < texte.length;
    existing.why = court
      ? `\u00c0 retenir : ${texte}` + (existing.why ? ` ${existing.why}` : '')
      : `${existing.why} Compl\u00e9ment : ${texte}`;
  }
}

const vus = new Map();
const conservees = [];
let doublons = 0, enrichies = 0;
for (const q of bank) {
  const cle = norm(q.q);
  const jumelle = vus.get(cle);
  if (jumelle && q.theme !== 'situation' && jumelle.theme !== 'situation') {
    doublons++;
    const avant = jumelle.why;
    apport(jumelle, q);
    if (jumelle.why !== avant) enrichies++;
    continue;
  }
  vus.set(cle, q);
  conservees.push(q);
}
if (doublons) console.log(`Dédoublonnage : ${doublons} question(s) en double écartée(s), ${enrichies} explication(s) enrichie(s).`);
bank.length = 0;
bank.push(...conservees);
const byTheme = (t) => bank.filter((q) => q.theme === t && !q.dupOf);

/* ---------- tirage au sort : fait côté navigateur ---------- */

// Les examens blancs ne sont plus générés ici : app/app.js tire chaque examen
// au sort (Math.random) au moment du lancement, en évitant les questions vues
// récemment. Les 40 « séries » figées ont été supprimées, car elles posaient
// toujours les mêmes 40 questions : c'était le défaut signalé par l'utilisateur.
// On écrit quand même un fichier series.js (compatibilité des scripts et du
// service worker) : il ne contient plus de tirage figé, uniquement un marqueur.
const series = [];

/* ---------- écriture ---------- */
const sources = bank.reduce((acc, q) => { const k = q.source || 'sujet'; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
const payload = {
  meta: {
    exam: EXAM,
    themes: THEMES,
    generatedAt: new Date().toISOString().slice(0, 10),
    counts: Object.fromEntries(Object.keys(THEMES).map((t) => [t, byTheme(t).length])),
    total: bank.length,
    sources,
  },
  questions: bank,
};

writeFileSync(join(OUT, 'questions.js'),
  '/* Fichier généré par tools/build-quiz.mjs — ne pas modifier à la main. */\n' +
  `window.QUIZ_DATA = ${JSON.stringify(payload, null, 0)};\n`);
writeFileSync(join(OUT, 'series.js'),
  '/* Fichier généré par tools/build-quiz.mjs — ne pas modifier à la main. */\n' +
  `window.QUIZ_SERIES = ${JSON.stringify(series, null, 0)};\n`);

const counts = payload.meta.counts;
console.log(`Banque : ${bank.length} questions`, counts);
console.log('Origine :', sources);
console.log(`Examens blancs : tirage aléatoire de ${EXAM.questions} questions (${EXAM.durationMin} min, seuil ${EXAM.pass}/${EXAM.questions}) au lancement, côté navigateur.`);
