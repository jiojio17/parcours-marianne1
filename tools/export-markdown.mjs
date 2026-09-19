#!/usr/bin/env node
/**
 * export-markdown.mjs — produit docs/BANQUE-QUESTIONS.md : la banque complète
 * (énoncés, quatre choix, bonne réponse, explication) en Markdown imprimable.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data', 'quizzes');

const THEMES = {
  valeurs: 'Principes et valeurs de la République',
  institutions: 'Système institutionnel et politique',
  droits: 'Droits et devoirs',
  histoire: 'Histoire, géographie et culture',
  vivre: 'Vivre dans la société française',
  situation: 'Mises en situation (format officiel)',
};

// banque déjà fusionnée et dédoublonnée par tools/build-quiz.mjs
const built = readFileSync(join(ROOT, 'app', 'data', 'questions.js'), 'utf8');
const sandbox = {};
const bank = new Function('window', built + '\n;return window.QUIZ_DATA.questions;')(sandbox).filter((q) => !q.dupOf);
const sources = bank.reduce((acc, q) => { const k = q.source || 'sujet'; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
console.log('Sources de la banque :', sources);

const LETTERS = ['A', 'B', 'C', 'D'];
let out = `# Banque de questions corrigées — examen civique

**${bank.length} questions** issues de deux corpus fusionnés et dédoublonnés :
les sujets d'entraînement du dossier Drive « Exercices renouvellement » (255 questions
transcrites, complétées de 30 mises en situation) et la banque du site
« Marianne · Examen civique » (228 questions importées).

Chaque question comporte **quatre choix, une seule bonne réponse** (marquée ✔) et une
**explication**. Généré par \`tools/export-markdown.mjs\` — ne pas modifier à la main.

---

## Sommaire

`;

let n = 0;
const counts = {};
for (const q of bank) counts[q.theme] = (counts[q.theme] || 0) + 1;
Object.keys(THEMES).forEach((t, i) => {
  out += `${i + 1}. **${THEMES[t]}** — ${counts[t] || 0} questions\n`;
});

for (const theme of Object.keys(THEMES)) {
  const pool = bank.filter((q) => q.theme === theme);
  if (!pool.length) continue;
  out += `\n---\n\n## ${THEMES[theme]}\n\n`;
  pool.forEach((q) => {
    n++;
    out += `### ${n}. ${q.q}\n\n`;
    q.options.forEach((o, i) => {
      out += `- ${LETTERS[i]}. ${o}${i === q.correct ? ' ✔' : ''}\n`;
    });
    out += `\n**Réponse : ${LETTERS[q.correct]}.** ${q.why}\n`;
    if (q.page) out += `\n*Source : sujet d'entraînement, page ${q.page}.*\n`;
    else if (q.source === 'site') out += `\n*Source : banque du site Marianne · Examen civique (${q.themeOrigine || q.theme}).*\n`;
    out += '\n';
  });
}

writeFileSync(join(ROOT, 'docs', 'BANQUE-QUESTIONS.md'), out);
console.log(`docs/BANQUE-QUESTIONS.md écrit — ${n} questions.`);
