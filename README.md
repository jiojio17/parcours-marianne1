# Parcours Marianne

Entraînement à l'**examen civique** français (naturalisation, carte de résident,
carte de séjour pluriannuelle) : banque de questions corrigées, **examens blancs
chronométrés** et révision par thème.

## Ce que fait le site

| Fonction | Détail |
| --- | --- |
| **Parcours personnalisé** | bilan de départ (niveau, date d'examen, temps par jour, thèmes à renforcer) → programme quotidien, séance guidée et suivi thème par thème |
| **Examens blancs** | 40 séries de **40 questions en 45 minutes** (chronomètre, seuil de réussite 32/40 = 80 %) |
| **Tirage aléatoire** | un examen complet reconstruit à chaque partie, avec la répartition officielle (28 connaissances + 12 mises en situation) |
| **Correction immédiate** | score global, score par thème, corrigé de chaque erreur avec l'explication de la règle |
| **Révision par thème** | question par question, correction et explication après chaque réponse |
| **Fiches** | les 14 fiches de révision du site (texte d'écoute, cartes mémoire, pièges) |
| **Capsules** | les 22 capsules vidéo avec durées, thèmes et sous-titres |
| **Banque complète** | les 472 questions avec leurs quatre choix, la bonne réponse et le corrigé |
| **Historique** | meilleur score et liste des tentatives, stockés dans le navigateur |

Tout est enregistré **uniquement dans le navigateur** (profil, statistiques, historique) :
aucune donnée n'est envoyée à un serveur, aucun compte n'est nécessaire.

## Contenu

- **472 questions corrigées**, issues de deux corpus fusionnés :
  - **244 questions** des **sujets d'entraînement** (11 pages photographiées du dossier
    Drive « Exercices renouvellement ») : 255 questions transcrites, complétées par une
    bonne réponse, trois réponses fausses crédibles et une explication ;
  - **228 questions** de la banque du site **« Marianne · Examen civique »**
    (191 connaissances + 37 mises en situation), importées avec leurs explications et
    leurs « pièges fréquents ».
  - Après dédoublonnage : 472 questions retenues (41 doublons écartés, 41 explications
    enrichies par recoupement des deux corpus).
- **14 fiches de révision** reprises du site : objectif, texte d'écoute, 4 cartes mémoire,
  rappel actif, mise en situation et piège fréquent (page « Fiches »).
- **22 capsules vidéo** (105 min) : 18 révisions éclair et 4 mises en situation, avec
  leurs 36 fichiers de sous-titres archivés (page « Capsules »).
- **67 mises en situation** au total pour l'entraînement (12 dans chaque examen blanc).
- Tout le contenu importé du site est documenté dans **`docs/EXTRACTION-SITE.md`**.

## Structure

```
app/                     site statique (aucune dépendance, s'ouvre dans un navigateur)
  index.html             page unique + routage par ancre (#/examen/…, #/revision/…)
  styles.css
  app.js                 moteur de quiz (chronomètre, correction, historique, parcours)
  data/questions.js      banque générée
  data/series.js         séries générées
  data/site.js           fiches, capsules et repères du site importé
data/quizzes/            sources de la banque (JSON) : sujets transcrits + site importé
data/site/               contenu du site importé, normalisé (leçons, capsules, banque)
extraction/site/         fichiers du site d'origine, tels quels + 36 sous-titres
  MANIFEST.md            empreintes et inventaire
  STATS.json             statistiques de contenu
  COMPLETUDE.json        contrôle de complétude vs service worker
documents/               sujets d'entraînement d'origine + transcription + inventaire
tools/build-quiz.mjs     fusionne et dédoublonne la banque, génère les séries
tools/import-site.mjs    convertit le site extrait en données exploitables
tools/serve.mjs          serveur statique local
tools/smoke-test.mjs     test de bout en bout du parcours (jsdom)
docs/QUIZZ.md            documentation du quiz et du format officiel
docs/BANQUE-QUESTIONS.md  les 285 questions corrigées, version imprimable
docs/DEPLOIEMENT.md      mise en ligne sur Cloudflare Pages (paquet prêt à déposer)
docs/EXTRACTION-SITE.md  inventaire complet du site « Marianne · Examen civique »
dist/                    paquet du site à déployer (généré par `npm run pack`)
app/parcours             bilan de départ et programme personnalisé (dans app.js)
```

## Sur tous les appareils

L'application est une **PWA** : elle s'installe sur l'écran d'accueil d'un téléphone
(icône, plein écran, **fonctionnement hors-ligne**) et s'adapte du petit téléphone au
grand écran — menu défilant, cibles tactiles de 44 px, chronomètre toujours visible,
tableaux défilants, navigation au clavier, impression propre des fiches. Détail complet
dans `docs/DEPLOIEMENT.md`.

## Utilisation

```bash
npm run build     # (re)génère app/data/questions.js et app/data/series.js
npm start         # serveur local sur http://localhost:4173
npm test          # parcours complet simulé, 36 vérifications (nécessite npm i -D jsdom)
npm run pack      # crée dist/parcours-marianne-quiz.zip, prêt pour Cloudflare Pages
```

Mise en ligne : voir `docs/DEPLOIEMENT.md` (GitHub Pages en 3 clics, ou dépôt du paquet
sur Cloudflare Pages).

Le site fonctionne aussi sans serveur : ouvrir `app/index.html` dans un navigateur.

## Format officiel de référence

Examen civique (décret n° 2025-1345 et arrêté du 10 octobre 2025) : **40 questions
à choix multiples — 28 de connaissances et 12 mises en situation — en 45 minutes**,
avec **80 % de bonnes réponses** (32/40) pour réussir. Les examens blancs sont chronométrés sur cette durée officielle de 45 minutes.
