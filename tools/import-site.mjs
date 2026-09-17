#!/usr/bin/env node
/**
 * import-site.mjs — convertit le contenu du site parcours-marianne
 * (extrait dans extraction/site/) en données exploitables par l'application.
 *
 * Entrées  : extraction/site/{exam-bank,data,lesson-extras,videos-catalog}.js
 * Sorties  : data/site/*.json                    (contenu brut normalisé)
 *            data/quizzes/site-connaissances.json (228 questions au format de la banque)
 *            data/quizzes/site-situations.json
 *            app/data/fiches.js                  (fiches, capsules et repères du site)
 *
 * Aucune dépendance. Les fichiers du site sont des fichiers de données
 * (aucun accès réseau ni DOM) : ils sont évalués dans une fonction isolée.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'extraction', 'site');
const OUT_SITE = join(ROOT, 'data', 'site');
const OUT_QUIZ = join(ROOT, 'data', 'quizzes');
const OUT_APP = join(ROOT, 'app', 'data');
const SITE_ORIGIN = 'https://parcours-marianne-e1u.pages.dev/';

for (const dir of [OUT_SITE, OUT_QUIZ, OUT_APP]) mkdirSync(dir, { recursive: true });

/* ---------- lecture des fichiers du site ---------- */

function readSiteFile(name) {
  const path = join(SITE, name);
  if (!existsSync(path)) throw new Error(`Fichier manquant : extraction/site/${name} — lancer le workflow « Extraire le site ».`);
  return readFileSync(path, 'utf8');
}

// Évalue un fichier de données et renvoie les identifiants demandés.
function evalData(src, names) {
  const body = src + '\n;return {' + names.map((n) => `'${n}': typeof ${n} !== 'undefined' ? ${n} : undefined`).join(', ') + '};';
  return new Function(body)();
}

const bankSrc = readSiteFile('exam-bank.js');
const dataSrc = readSiteFile('data.js');
const extrasSrc = readSiteFile('lesson-extras.js');
const videosSrc = readSiteFile('videos-catalog.js');

const { EXAM_BANK, EXAM_SETTINGS } = evalData(bankSrc, ['EXAM_BANK', 'EXAM_SETTINGS']);
const { DAYS, QUESTIONS, FLASHCARDS, SITUATIONS } = evalData(dataSrc, ['DAYS', 'QUESTIONS', 'FLASHCARDS', 'SITUATIONS']);
const { LESSON_EXTRAS } = evalData(extrasSrc, ['LESSON_EXTRAS']);
const { VIDEO_CATALOG } = evalData(videosSrc, ['VIDEO_CATALOG']);

if (!Array.isArray(EXAM_BANK) || EXAM_BANK.length < 100) throw new Error('Banque d’examen illisible');

/* ---------- correspondance des thèmes ---------- */

// Le site classe ses questions en 5 thèmes numérotés (THEME5 dans app.js).
const THEME5 = ['Principes et valeurs', 'Institutions', 'Droits et devoirs', 'Histoire et culture', 'Vie quotidienne'];
const THEME5_TO_OURS = {
  'Principes et valeurs': 'valeurs',
  'Institutions': 'institutions',
  'Droits et devoirs': 'droits',
  'Histoire et culture': 'histoire',
  'Vie quotidienne': 'vivre',
};

/* ---------- 1. banque d'examen normalisée ---------- */

// Convention du site : la bonne réponse est la première option
// (app.js : `Number.isInteger(q.ok) ? q.ok : 0`).
const bank = EXAM_BANK.map((q, i) => {
  const theme5 = THEME5[(q.theme || 1) - 1] || 'Vie quotidienne';
  return {
    n: i + 1,
    kind: q.kind,
    theme5,
    theme: THEME5_TO_OURS[theme5],
    q: String(q.q).trim(),
    options: q.options.map((o) => String(o).trim()),
    correct: Number.isInteger(q.ok) ? q.ok : 0,
    explanation: (q.explanation || '').trim(),
    piege: (q.why || '').trim(),
  };
});

/* ---------- 2. leçons (fiches) et enrichissements ---------- */

const lessons = DAYS.map((d) => {
  const extra = LESSON_EXTRAS[d.id] || {};
  return {
    id: d.id,
    theme: d.theme,
    title: d.title,
    intro: d.intro,
    objective: d.objective,
    videoMin: d.videoMin,
    videoTitle: d.videoTitle,
    video: SITE_ORIGIN + d.video,
    listen: d.listen,
    facts: d.facts.map(([front, back]) => ({ front, back })),
    quiz: { q: d.q, options: d.a, correct: d.ok, why: d.why },
    warmup: extra.warmup || '',
    retain: extra.retain || '',
    scenario: extra.scenario || '',
    scenarioOptions: extra.options || [],
    scenarioCorrect: Number.isInteger(extra.ok) ? extra.ok : 0,
    confusion: extra.confusion || '',
  };
});

/* ---------- 3. capsules vidéo ---------- */

const videos = VIDEO_CATALOG.map((v) => ({
  slug: v.slug,
  title: v.title,
  kind: v.kind,               // 'qa' = révisions éclair, 'sit' = mises en situation
  ep: v.ep,
  themes: v.themes,
  count: v.count,             // nombre de questions traitées dans la capsule
  durationMin: Math.round((v.duration / 60) * 10) / 10,
  mp4: SITE_ORIGIN + v.mp4,
  vtt: SITE_ORIGIN + v.vtt,
  poster: SITE_ORIGIN + v.poster,
}));

const sousTitres = videos.map((v) => ({
  slug: v.slug,
  fichier: 'extraction/site/videos/' + v.slug + '.vtt',
  urlSource: v.vtt,
}));

/* ---------- 4. repères techniques du site ---------- */

const siteInfo = {
  nom: 'Marianne · Examen civique',
  adresse: SITE_ORIGIN.replace(/\/$/, ''),
  description: 'Apprendre, écouter, pratiquer et mémoriser l’examen civique.',
  formatExamen: EXAM_SETTINGS || { total: 40, duration: 45, passing: 32 },
  themes: {
    '5 thèmes des questions du site (THEME5)': THEME5,
    '10 thèmes proposés au bilan de départ': [
      'Symboles et valeurs', 'Laïcité', 'Égalité et droits', 'Institutions', 'Vote et démocratie',
      'Histoire', 'Europe', 'Vie quotidienne', 'Travail', 'Libertés',
    ],
    'thèmes des leçons': [...new Set(DAYS.map((d) => d.theme))],
  },
  fonctionnalites: [
    'Bilan de départ en 4 étapes (niveau, date d’examen, temps par jour, façon d’apprendre, priorités)',
    'Parcours guidé : 14 leçons avec objectif, écoute, 4 cartes mémoire et un quiz de contrôle',
    'Révisions éclair : 18 capsules vidéo de 9 à 17 questions, avec sous-titres',
    'Mises en situation : 4 capsules vidéo (dont une finale « le réflexe citoyen parfait »)',
    'Entraînement : examens blancs de 40 questions en 45 minutes, seuil 32/40',
    'Pratique libre par thème et par mode (connaissances / mises en situation)',
    'Fiches mémoire (cartes recto/verso) construites depuis les leçons',
    'Atelier oral (entraînement à l’entretien) et prise de notes',
    'Coach Marianne : réponses locales hors-ligne, affinées en ligne par une cascade IA',
    'Synchronisation facultative du profil par code à 6 caractères',
    'Export / import des données, application installable (PWA) et hors-ligne',
  ],
  api: {
    '/api/coach': 'question posée au coach ; cascade IA Cloudflare → Mistral → Gemini, sinon réponse locale',
    '/api/personalize': 'construit le programme personnalisé à partir du bilan (avec accord explicite)',
    '/api/profile': 'synchronisation du profil par code (POST pour enregistrer, GET pour restaurer)',
  },
  conception: {
    polices: 'Fraunces (titres, serif) + DM Sans (texte)',
    couleurs: {
      violet: '#5953b7', 'violet foncé': '#403987', encre: '#3f3147',
      fond: '#f8f3ed', 'blanc cassé': '#fffdf9', or: '#f0dfaa',
      vert: '#3c8d75', 'vert foncé': '#2b6e59',
    },
  },
  fichiers: [
    'index.html', 'style.css', 'app.js', 'data.js', 'exam-bank.js', 'lesson-extras.js',
    'videos-catalog.js', 'app-coach-online.js', 'manifest.json', 'sw.js', 'icons/icon.svg',
  ],
};

/* ---------- écriture ---------- */

const write = (dir, name, value) => {
  writeFileSync(join(dir, name), JSON.stringify(value, null, 2) + '\n', 'utf8');
  return `${name}`;
};

write(OUT_SITE, 'exam-bank.json', bank);
write(OUT_SITE, 'lecons.json', lessons);
write(OUT_SITE, 'flashcards.json', FLASHCARDS);
write(OUT_SITE, 'questions-lecons.json', QUESTIONS);
write(OUT_SITE, 'situations-lecons.json', SITUATIONS);
write(OUT_SITE, 'videos.json', videos);
write(OUT_SITE, 'sous-titres.json', sousTitres);
write(OUT_SITE, 'site.json', siteInfo);

/* banque convertie au format de l'application */

const pad = (n) => String(n).padStart(3, '0');

const connaissances = bank
  .filter((q) => q.kind === 'connaissance')
  .map((q) => ({
    id: 'SC-' + pad(q.n),
    theme: q.theme,
    source: 'site',
    themeOrigine: q.theme5,
    q: q.q,
    options: q.options,
    correct: q.correct,
    why: [q.explanation, q.piege && 'Piège : ' + q.piege].filter(Boolean).join(' '),
  }));

const situations = bank
  .filter((q) => q.kind === 'situation')
  .map((q) => ({
    id: 'SS-' + pad(q.n),
    theme: 'situation',
    source: 'site',
    themeOrigine: q.theme5,
    q: q.q,
    options: q.options,
    correct: q.correct,
    why: [q.explanation, q.piege && 'Piège : ' + q.piege].filter(Boolean).join(' '),
  }));

write(OUT_QUIZ, 'site-connaissances.json', connaissances);
write(OUT_QUIZ, 'site-situations.json', situations);

/* données consommées par l'application */

const payload = {
  origine: siteInfo.adresse,
  formatExamen: siteInfo.formatExamen,
  themes: siteInfo.themes,
  fonctionnalites: siteInfo.fonctionnalites,
  lecons: lessons,
  capsules: videos,
  flashcards: FLASHCARDS,
};

writeFileSync(join(OUT_APP, 'site.js'),
  '/* Fichier généré par tools/import-site.mjs — ne pas modifier à la main. */\n' +
  `window.SITE_DATA = ${JSON.stringify(payload, null, 0)};\n`);

console.log(`Banque du site importée : ${connaissances.length} questions de connaissances + ${situations.length} mises en situation`);
console.log(`Fiches : ${lessons.length} leçons · Capsules : ${videos.length} vidéos · Cartes mémoire : ${FLASHCARDS.length}`);
console.log('Fichiers écrits : data/site/*.json, data/quizzes/site-*.json, app/data/site.js');
