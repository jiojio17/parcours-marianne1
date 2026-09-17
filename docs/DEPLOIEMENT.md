# Le site est en ligne

**https://jiojio17.github.io/parcours-marianne1/**

Ouvre cette adresse depuis n'importe quel appareil (téléphone, tablette,
ordinateur) : rien à installer, aucun compte à créer. Tu peux l'enregistrer en
favori, l'ajouter à l'écran d'accueil de ton téléphone, ou l'envoyer à qui tu
veux.

## Comment ça se met à jour tout seul

Le workflow `.github/workflows/pages.yml` republie le site **automatiquement** :

- à chaque modification du contenu (`app/`, `data/`, `tools/`) ;
- à la demande, depuis l'onglet **Actions** → *Publier le site* → *Run workflow*.

Tu n'as donc plus rien à faire : publier un changement, c'est modifier un
fichier du dépôt.

## Ce qui a été nécessaire une seule fois

GitHub interdit à un robot de **créer** le site Pages : l'API répond
`403 Resource not accessible by integration`, y compris avec la permission
`pages: write` (vérifié 4 fois, dont via `actions/configure-pages` et un appel
direct à l'API). La création a donc été faite par le propriétaire du dépôt :

> **Settings → Pages → Source : « GitHub Actions » → Save**

Depuis, la publication est entièrement automatique.

## Autres façons d'accéder au site

| Moyen | Où | Remarque |
| --- | --- | --- |
| **En un seul fichier** | `dist/parcours-marianne-complet.html` (358 Ko) | le site entier, ouvrable par double-clic, **sans Internet** (`npm run mono` le régénère) |
| **En local** | `npm start` → http://localhost:4173 | aucun paquet requis |
| **Archive** | `dist/parcours-marianne-quiz.zip` (99 Ko) | à glisser sur Cloudflare Pages ou Netlify si tu veux une seconde adresse |

## Pistes écartées, et pourquoi

| Piste | Résultat |
| --- | --- |
| Création du site Pages par le robot | **403** de GitHub (4 essais, dont `enablement: true`) |
| Cloudflare Pages en automatique | identifiants absents du dépôt (rapport `docs/cloudflare-rapport.txt`) |
| CDN jsDelivr | sert le HTML en `text/plain` (sécurité) : non navigable |
| CDN statically.io | erreurs **500** sur les questions et les images |
| raw.githack / rawcdn.githack | page d'avertissement interstitielle |
| gitcdn.link | domaine en vente |

## Contrôles

```bash
npm test          # 44 contrôles du site
npm run test:mono # 12 contrôles du fichier unique
gh api repos/jiojio17/parcours-marianne1/pages   # état du site Pages
```
