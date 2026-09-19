# Le site « Marianne · Examen civique » — extraction complète

**Source** : <https://parcours-marianne-e1u.pages.dev/>
**Extrait le** : 17 septembre 2026, par GitHub Actions (voir `.github/workflows/fetch-site.yml`)
**Volume** : 49 fichiers, 432 Ko, dont 36 fichiers de sous-titres (13 225 mots)

Ce document décrit **tout** ce que contient le site d'origine, ce qui a été récupéré, et
ce qui en a été repris dans ce dépôt.

---

## 1. Méthode : la boucle de vérification (5 passes)

1. **Découverte** — le site est une application à page unique (SPA) : la page HTML ne
   contient presque rien. Son **service worker** (`sw.js`) publie la liste complète des
   fichiers de l'application : c'est la carte du site.
2. **Extraction** — chaque fichier est téléchargé (`index.html`, `style.css`, `app.js`,
   `data.js`, `exam-bank.js`, `lesson-extras.js`, `videos-catalog.js`,
   `app-coach-online.js`, `manifest.json`, `sw.js`, icônes) ainsi que les **36 sous-titres**
   des capsules vidéo.
3. **Vérification** — chaque fichier JavaScript passe un contrôle de syntaxe ; les fichiers
   de données sont évalués pour compter et valider leur contenu
   (`extraction/VERIFICATION.txt`, `extraction/STATS.json`).
4. **Contrôle de complétude** — comparaison entre la liste du service worker et les
   fichiers réellement récupérés (`extraction/COMPLETUDE.json`). Un site « SPA » renvoie sa
   page d'accueil pour toute adresse inconnue : ces réponses de repli doivent être
   écartées, sans écarter les vraies pages (`downloads`).
5. **Conversion** — `tools/import-site.mjs` transforme le contenu brut en données
   exploitables (`data/site/*.json`) et l'intègre à la banque de questions de ce dépôt.

Résultat : **11 des 12 fichiers** du service worker sont extraits. Le douzième,
`downloads.html`, n'est pas servi séparément par Cloudflare Pages (la page de
téléchargement est fabriquée par l'application) : son contenu a été capturé et enregistré
dans `data/site/site.json` → `telechargements`.

---

## 2. Ce que contient le site d'origine

### Architecture

| Élément | Détail |
| --- | --- |
| Type | Application à page unique, **sans framework** (JavaScript natif) |
| Hébergement | Cloudflare Pages (`parcours-marianne-e1u.pages.dev`) |
| Hors-ligne | **PWA** : service worker, caches versionnés (`BUILD_STAMP`), `manifest.json` |
| Serveur | Fonctions `/api/…` (coach IA, personnalisation, synchronisation du profil) |
| Polices | **Fraunces** (titres, serif) et **DM Sans** (texte), chargées depuis Google Fonts |
| Couleurs | violet `#5953b7` / `#403987`, encre `#3f3147`, fond crème `#f8f3ed`, or `#f0dfaa`, vert `#3c8d75` |

### Écrans et fonctionnalités

| Écran | Contenu |
| --- | --- |
| **Bilan de départ** | 4 étapes : niveau (je découvre / quelques repères / je veux consolider), date d'examen et temps par jour (10 à 60 min), façon d'apprendre (parler, lire, écouter), thèmes à renforcer |
| **Parcours** | 14 journées de travail : objectif, capsule vidéo, texte d'écoute, 4 cartes mémoire, quiz de contrôle, mise en situation et « piège fréquent » |
| **Pratique libre** | Entraînement par thème et par mode (connaissances / mises en situation), avec score et enregistrement de la progression |
| **Examen blanc** | 40 questions en 45 minutes, seuil 32/40, chronomètre, récapitulatif des erreurs |
| **Cartes mémoire** | 56 cartes recto/verso construites depuis les leçons |
| **Coach Marianne** | Réponses locales hors-ligne, affinées en ligne par une cascade IA |
| **Atelier oral** | Entraînement à l'entretien ; prise de notes personnelle |
| **Capsules vidéo** | 22 vidéos : 18 « révisions éclair » et 4 « mises en situation » |
| **Téléchargements** | Archives ZIP de l'application et des capsules, ou capsules à la carte |
| **Synchronisation** | Profil sauvegardé localement, restaurable par un code à 6 caractères |

### Intelligence artificielle (côté serveur)

| Route | Rôle |
| --- | --- |
| `/api/coach` | Question au coach : cascade **Cloudflare AI → Mistral → Gemini**, réponse locale en secours |
| `/api/personalize` | Construit le programme à partir du bilan, uniquement avec l'accord explicite de la personne |
| `/api/profile` | Enregistre (`POST`) et restaure (`GET`) le profil via un code |

Ces fonctions ne sont pas récupérables (elles vivent chez l'hébergeur) ; le
comportement de repli hors-ligne, lui, est entièrement dans `app.js`.

---

## 3. Contenus pédagogiques extraits

### Banque d'examen — 228 questions

| Mesure | Valeur |
| --- | --- |
| Questions | **228** (191 de connaissances + 37 mises en situation) |
| Thèmes | 5 : Principes et valeurs · Institutions · Droits et devoirs · Histoire et culture · Vie quotidienne |
| Répartition | 41 / 35 / 58 / 61 / 33 |
| Explications | **228 / 228** (aucune question sans explication) |
| Pièges rédigés | 9 (« Travail, Famille, Patrie » était la devise de Vichy, le 4 juillet est la fête américaine, etc.) |
| Format | 4 réponses par question, la bonne en premier dans le fichier source (le site mélange l'ordre à l'affichage) |
| Micro-quiz de leçons | 46 questions supplémentaires |
| Mises en situation de leçons | 6 scénarios |

> Détail technique important : le site stocke la bonne réponse en première position
> (`app.js` : `Number.isInteger(q.ok) ? q.ok : 0`). La conversion dans ce dépôt fige donc
> `correct: 0` pour ces questions, puis mélange l'ordre des choix à l'affichage.

### 14 fiches (leçons)

Chaque fiche contient : thème, titre, introduction, objectif, durée de la vidéo, **texte
d'écoute intégral**, 4 cartes mémoire, un rappel actif, une mise en situation, la question
de contrôle et le **piège fréquent**. Thèmes des leçons : Symboles, Laïcité, Droits et
devoirs, Institutions, Démocratie, Histoire, Géographie, Europe, Vie quotidienne, Travail,
Égalité, Vivre ensemble, Entretien, Révision.

### 22 capsules vidéo (105 minutes)

| Série | Nombre | Contenu |
| --- | --- | --- |
| Révisions éclair (`qa-01` à `qa-18`) | 18 | 9 à 17 questions par capsule, avec la correction commentée |
| Mises en situation (`sit-01` à `sit-04`) | 4 | Scènes concrètes, dont la finale « le réflexe citoyen parfait » |

Les capsules couvrent **les 228 questions** de la banque. Les **36 fichiers de sous-titres**
(13 225 mots) sont archivés dans `extraction/site/videos/` et forment un corpus de révision
écrite.

---

## 4. Ce qui a été intégré dans ce dépôt

| Contenu du site | Où il est repris |
| --- | --- |
| 228 questions + explications + pièges | **banque de quiz** (`data/quizzes/site-connaissances.json`, `site-situations.json`) |
| 14 fiches complètes | **page « Fiches »** de l'application (`app/data/site.js`) |
| 22 capsules + durées + liens | **page « Capsules »** |
| 56 cartes mémoire | `data/site/flashcards.json` (données prêtes pour un futur mode cartes) |
| Bilan de départ (niveaux, rythme, priorités) | **parcours personnalisé** de l'application |
| Format officiel 40 questions / 45 min / 32 sur 40 | examens blancs de l'application |
| Repères de conception et fonctionnalités | page « Capsules » et ce document |
| Liens de téléchargement (ZIP, capsules) | `data/site/site.json` → `telechargements` |

Après fusion : **472 questions** dans la banque (244 issues des sujets photographiés +
228 du site, 41 doublons écartés et **41 explications enrichies** par recoupement des deux
corpus).

### Ce qui n'a pas été récupéré

| Élément | Pourquoi | Comment le récupérer |
| --- | --- | --- |
| Vidéos `.mp4` et affiches `.jpg` (105 min) | Volume (plusieurs centaines de Mo) | Archives ZIP listées dans `data/site/site.json`, ou liens directs par capsule |
| Fonctions serveur `/api/…` | Hébergées chez Cloudflare, non publiées | À réécrire si besoin (le repli local est déjà dans `app.js`) |
| `downloads.html` | Non servi séparément par l'hébergeur | Contenu capturé dans `data/site/site.json` |

---

## 5. Rejouer l'extraction

```bash
# 1. Récupérer les fichiers du site (GitHub Actions, accès Internet complet)
gh workflow run fetch-site.yml --repo jiojio17/parcours-marianne1

# 2. Convertir le contenu extrait et reconstruire la banque
npm run build      # import-site.mjs + build-quiz.mjs + export-markdown.mjs
npm test           # 43 vérifications, dont les pages Fiches et Capsules
```

Les fichiers d'origine sont conservés **tels quels** dans `extraction/site/` (aucune
modification) ; tout ce qui est régénéré porte la mention « fichier généré » en tête.
