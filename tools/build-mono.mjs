#!/usr/bin/env node
/**
 * build-mono.mjs — assemble le site en UN SEUL fichier HTML.
 *
 * Tout est intégré dans le fichier : styles, moteur, 472 questions, séries,
 * fiches, capsules. Le résultat s'ouvre par double-clic (ou depuis une pièce
 * jointe, une clé USB, un mail) sur téléphone, tablette ou ordinateur, même
 * sans connexion et sans installation : aucune dépendance externe n'est requise
 * hormis les vidéos, qui restent en ligne.
 *
 * Usage : node tools/build-mono.mjs
 * Sortie : dist/parcours-marianne-complet.html
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lire = (p) => readFileSync(join(racine, p), 'utf8');

const index = lire('app/index.html');
const css = lire('app/styles.css');
const scripts = ['app/data/questions.js', 'app/data/site.js', 'app/data/series.js', 'app/app.js'];

/** Empêche la fermeture prématurée de la balise script. */
const sur = (js) => js.replace(/<\/script/gi, '<\\/script');

const icone = lire('app/icons/icon-512.png').toString('base64');
const icone192 = lire('app/icons/icon-192.png').toString('base64');

let sortie = index
  // feuille de style intégrée
  .replace(
    /[ \t]*<link rel="stylesheet" href="styles\.css">\r?\n/,
    `<style>\n${css.trim()}\n</style>\n`
  )
  // icônes intégrées (le manifeste et le service worker ne servent pas en local)
  .replace(/[ \t]*<link rel="manifest"[^>]*>\r?\n/, '')
  .replace(
    /[ \t]*<link rel="apple-touch-icon"[^>]*>\r?\n/,
    `  <link rel="apple-touch-icon" href="data:image/png;base64,${icone192}">\n`
  )
  // scripts et données intégrés
  .replace(/[ \t]*<script src="data\/questions\.js"><\/script>\r?\n/, `<script>\n${sur(lire('app/data/questions.js'))}\n</script>\n`)
  .replace(/[ \t]*<script src="data\/site\.js"><\/script>\r?\n/, `<script>\n${sur(lire('app/data/site.js'))}\n</script>\n`)
  .replace(/[ \t]*<script src="data\/series\.js"><\/script>\r?\n/, `<script>\n${sur(lire('app/data/series.js'))}\n</script>\n`)
  .replace(/[ \t]*<script src="app\.js"><\/script>\r?\n/, `<script>\n${sur(lire('app/app.js'))}\n</script>\n`)
  // le service worker n'a pas de sens en fichier unique : on retire son amorçage
  .replace(/[ \t]*<script>\s*\n?\s*\/\/[^\n]*serviceWorker[\s\S]*?<\/script>\r?\n/, '');

// ligne de conduite en tête de fichier
sortie = sortie.replace(
  /(<title>[^<]*<\/title>)/,
  `$1\n<meta name="generator" content="tools/build-mono.mjs — site en un seul fichier">`
);

mkdirSync(join(racine, 'dist'), { recursive: true });
const cible = join(racine, 'dist/parcours-marianne-complet.html');
writeFileSync(cible, sortie, 'utf8');

const ko = (n) => `${Math.round(n / 1024)} Ko`;
console.log('Fichier unique écrit :', 'dist/parcours-marianne-complet.html', `(${ko(Buffer.byteLength(sortie))})`);
console.log('Contenu intégré :');
for (const s of scripts) console.log(' -', s, ko(statSync(join(racine, s)).size));
console.log(' - app/styles.css', ko(statSync(join(racine, 'app/styles.css')).size));
if (/<script src=/.test(sortie) || /<link rel="stylesheet"/.test(sortie)) {
  console.error('❌ Il reste des références externes non intégrées.');
  process.exit(1);
}
console.log('✅ Aucune dépendance externe locale : le fichier s’ouvre seul.');
