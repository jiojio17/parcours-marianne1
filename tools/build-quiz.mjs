#!/usr/bin/env node
/**
 * build-quiz.mjs — construit les données du moteur de quiz Parcours Marianne.
 *
 * Entrées  : data/quizzes/*.json  (banque de questions rédigée à la main)
 * Sorties  : app/data/questions.js  (banque complète)
 *            app/data/series.js     (40 examens blancs générés, 40 questions / 40 min)
 *
 * Aucune dépendance externe. Déterministe : le même contenu produit les mêmes séries.
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
  durationMin: 40,      // durée demandée pour l'entraînement (officiel : 45 min)
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
const byTheme = (t) => bank.filter((q) => q.theme === t && !q.dupOf);
const situations = byTheme('situation');

/* ---------- tirage déterministe ---------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function draw(pool, n, rnd, taken) {
  const available = pool.filter((q) => !taken.has(q.id));
  const picked = shuffle(available, rnd).slice(0, n);
  if (picked.length < n) throw new Error(`Pas assez de questions pour tirer ${n} éléments (${picked.length})`);
  picked.forEach((q) => taken.add(q.id));
  return picked;
}

const series = [];
for (let i = 1; i <= EXAM.seriesCount; i++) {
  const rnd = mulberry32(1000 + i * 7919);
  const taken = new Set();
  const knowledge = [];
  for (const [theme, n] of Object.entries(EXAM.mix)) knowledge.push(...draw(byTheme(theme), n, rnd, taken));
  const sits = draw(situations, EXAM.situations, rnd, taken);
  const questions = interleave(shuffle(knowledge, rnd), shuffle(sits, rnd));
  if (questions.length !== EXAM.questions) throw new Error(`Série ${i} : ${questions.length} questions`);
  series.push({
    id: `serie-${String(i).padStart(2, '0')}`,
    label: `Série ${i}`,
    durationMin: EXAM.durationMin,
    pass: EXAM.pass,
    questionIds: questions.map((q) => q.id),
  });
}

// alterne connaissance / mise en situation par blocs pour éviter les longues séries identiques
function interleave(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    for (let k = 0; k < 2 && i < a.length; k++) out.push(a[i++]);
    if (j < b.length) out.push(b[j++]);
  }
  return out;
}

/* ---------- écriture ---------- */
const payload = {
  meta: {
    exam: EXAM,
    themes: THEMES,
    generatedAt: new Date().toISOString().slice(0, 10),
    counts: Object.fromEntries(Object.keys(THEMES).map((t) => [t, byTheme(t).length])),
    total: bank.length,
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
console.log(`Séries générées : ${series.length} × ${EXAM.questions} questions (${EXAM.durationMin} min, seuil ${EXAM.pass}/${EXAM.questions})`);
