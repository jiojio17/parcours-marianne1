#!/usr/bin/env node
/**
 * test-mono.mjs — vérifie que le fichier unique (dist/parcours-marianne-complet.html)
 * fonctionne réellement : données chargées, écrans rendus, aucune erreur JS.
 *
 * Usage : node tools/test-mono.mjs
 */
import { readFileSync } from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';

const chemin = 'dist/parcours-marianne-complet.html';
const html = readFileSync(chemin, 'utf8');

const erreurs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => {
  if (!/not implemented/i.test(e.message)) erreurs.push(e.message);
});

const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', virtualConsole: vc });
const w = dom.window;
const d = w.document;

let ok = 0;
let ko = 0;
const verifier = (nom, condition, detail = '') => {
  if (condition) { ok++; console.log(`✅ ${nom}${detail ? ' — ' + detail : ''}`); }
  else { ko++; console.error(`❌ ${nom}${detail ? ' — ' + detail : ''}`); }
};

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

await attendre(400);

verifier('Banque de questions intégrée', w.QUIZ_DATA?.questions?.length === 472, `${w.QUIZ_DATA?.questions?.length} questions`);
verifier('Aucune série figée (tirage aléatoire actif)', Array.isArray(w.QUIZ_SERIES) && w.QUIZ_SERIES.length === 0, `${w.QUIZ_SERIES?.length} série(s) figée(s)`);
verifier('Fiches du site intégrées', (w.SITE_DATA?.lecons?.length ?? 0) >= 14, `${w.SITE_DATA?.lecons?.length} fiches`);
verifier('Accueil rendu', d.getElementById('app').innerHTML.length > 1000);

const titres = {};
// #/parcours affiche un écran d'invitation court tant que le bilan n'a pas été fait.
const seuils = { '#/parcours': 200 };
for (const route of ['#/series', '#/revision', '#/fiches', '#/capsules', '#/questions', '#/parcours']) {
  w.location.hash = route;
  await attendre(120);
  titres[route] = d.getElementById('app').innerHTML.length;
  verifier(`Écran ${route}`, titres[route] > (seuils[route] ?? 500), `${titres[route]} caractères`);
}

w.location.hash = '#/examen/aleatoire';
await attendre(150);
verifier('Examen blanc atteignable', d.getElementById('app').innerHTML.length > 500);

// Deux lancements successifs doivent poser des questions différentes.
const questionTexte = () => {
  const el = d.querySelector('#qcard .question-text');
  return el ? el.textContent : '';
};
const premier = questionTexte();
w.location.hash = '#/';
await attendre(150);
w.location.hash = '#/examen/aleatoire';
await attendre(150);
const second = questionTexte();
verifier('Deux examens blancs successifs différents', premier !== '' && second !== '' && premier !== second);

verifier('Aucune erreur JavaScript', erreurs.length === 0, erreurs.slice(0, 2).join(' | ') || 'aucune');

console.log(`\n${ok}/${ok + ko} contrôles du fichier unique réussis`);
process.exit(ko ? 1 : 0);
