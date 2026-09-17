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
| **Banque complète** | les 285 questions avec leurs quatre choix, la bonne réponse et le corrigé |
| **Historique** | meilleur score et liste des tentatives, stockés dans le navigateur |

Tout est enregistré **uniquement dans le navigateur** (profil, statistiques, historique) :
aucune donnée n'est envoyée à un serveur, aucun compte n'est nécessaire.

## Contenu

- **285 questions corrigées** : 44 « Vivre dans la société française », 83 « Histoire,
  géographie et culture », 37 « Droits et devoirs », 55 « Système institutionnel et
  politique », 36 « Principes et valeurs de la République », 30 mises en situation.
- Les 255 questions de connaissances proviennent des **sujets d'entraînement**
  (11 pages photographiées) du dossier Drive
  « Exercices renouvellement » ; elles ont été retranscrites, puis complétées avec
  **une bonne réponse et trois réponses fausses crédibles** et une explication.
- Les **30 mises en situation** reproduisent le format officiel de l'examen
  (12 par épreuve).

## Structure

```
app/                     site statique (aucune dépendance, s'ouvre dans un navigateur)
  index.html             page unique + routage par ancre (#/examen/…, #/revision/…)
  styles.css
  app.js                 moteur de quiz (chronomètre, correction, historique)
  data/questions.js      banque générée
  data/series.js         séries générées
data/quizzes/            sources de la banque, rédigées à la main (JSON)
documents/               sujets d'entraînement d'origine + transcription + inventaire
tools/build-quiz.mjs     génère app/data/*.js à partir de data/quizzes/*.json
tools/serve.mjs          serveur statique local
tools/smoke-test.mjs     test de bout en bout du parcours (jsdom)
docs/QUIZZ.md            documentation du quiz et du format officiel
docs/BANQUE-QUESTIONS.md  les 285 questions corrigées, version imprimable
docs/DEPLOIEMENT.md      mise en ligne sur Cloudflare Pages (paquet prêt à déposer)
dist/                    paquet du site à déployer (généré par `npm run pack`)
app/parcours             bilan de départ et programme personnalisé (dans app.js)
```

## Utilisation

```bash
npm run build     # (re)génère app/data/questions.js et app/data/series.js
npm start         # serveur local sur http://localhost:4173
npm test          # parcours complet simulé, 36 vérifications (nécessite npm i -D jsdom)
npm run pack      # crée dist/parcours-marianne-quiz.zip, prêt pour Cloudflare Pages
```

Mise en ligne : voir `docs/DEPLOIEMENT.md`.

Le site fonctionne aussi sans serveur : ouvrir `app/index.html` dans un navigateur.

## Format officiel de référence

Examen civique (décret n° 2025-1345 et arrêté du 10 octobre 2025) : **40 questions
à choix multiples — 28 de connaissances et 12 mises en situation — en 45 minutes**,
avec **80 % de bonnes réponses** (32/40) pour réussir. Les examens blancs sont chronométrés sur cette durée officielle de 45 minutes.
