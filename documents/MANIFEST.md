# Dossier Drive « Exercices renouvellement »

**Source** : <https://drive.google.com/drive/folders/1DERlcp5UxYtl7E-7hEIAqE3VzALwrZY_>
**Récupéré le** : 2026-09-17
**Contenu** : 11 photos de sujets d'entraînement à l'examen civique
(naturalisation ou réintégration dans la nationalité française), prises au format JPG 4000×3000.

## Où sont les fichiers

| Dossier | Contenu |
| --- | --- |
| `documents/exercices-renouvellement/` | Les 11 photos d'origine, telles que téléchargées depuis Drive (aucune modification) |
| `documents/exercices-renouvellement-redresses/` | Les 11 mêmes pages remises à l'endroit, recadrées sur la feuille, contraste et netteté améliorés — ce sont les versions lisibles |
| `documents/QUESTIONS-CIVIQUES.md` | Transcription des 255 questions, classées par thème |
| `.github/workflows/fetch-drive.yml` | Workflow permettant de re-télécharger le dossier Drive si son contenu change |

## Inventaire des pages

| # | Fichier | Thème | Questions | Rotation appliquée |
| --- | --- | --- | --- | --- |
| 1 | 1789657471668.jpg | Vivre dans la société française | 14 | 180° (photo prise à l'envers) |
| 2 | 1789657471675.jpg | Vivre dans la société française | 30 | 180° |
| 3 | 1789657471681.jpg | Histoire, géographie et culture | 23 | — (1,99° de redressement) |
| 4 | 1789657471689.jpg | Histoire, géographie et culture | 30 | 180° |
| 5 | 1789657471698.jpg | Histoire, géographie et culture | 30 | 180° |
| 6 | 1789657471705.jpg | Droits et devoirs | 8 | 180° |
| 7 | 1789657471714.jpg | Droits et devoirs | 29 | 180° |
| 8 | 1789657471721.jpg | Système institutionnel et politique | 27 | 180° |
| 9 | 1789657471730.jpg | Système institutionnel et politique | 28 | — (1,48° de redressement) |
| 10 | 1789657471738.jpg | Principes et valeurs de la République | 8 | 180° |
| 11 | 1789657471746.jpg | Principes et valeurs de la République | 28 | 180° |
| | | **Total** | **255** | |

L'orientation de chaque page a été déterminée automatiquement (score de reconnaissance
de texte comparé entre 0° et 180°, confiance moyenne 0,86 à 0,95), puis vérifiée visuellement.

## Empreintes des fichiers d'origine

| Fichier | Taille | SHA-256 (12 premiers) |
| --- | --- | --- |
| 1789657471668.jpg | 2,4 MB | `859448168841` |
| 1789657471675.jpg | 2,7 MB | `4dae9744f77b` |
| 1789657471681.jpg | 2,3 MB | `5c7107189eba` |
| 1789657471689.jpg | 2,6 MB | `6095f930c149` |
| 1789657471698.jpg | 2,6 MB | `99be05b0b8f0` |
| 1789657471705.jpg | 2,1 MB | `59a8e9f32cad` |
| 1789657471714.jpg | 2,6 MB | `cf414474f531` |
| 1789657471721.jpg | 2,7 MB | `9f9160ae9918` |
| 1789657471730.jpg | 2,7 MB | `8a8e7960b5d9` |
| 1789657471738.jpg | 2,4 MB | `e6d1e8e2747e` |
| 1789657471746.jpg | 2,7 MB | `ca76a1b55e94` |

## Remarques

- Le dossier Drive n'est accessible que via son lien de partage ; l'agent n'a pas d'accès
  réseau direct à Google depuis son environnement. Les fichiers ont été récupérés via un
  workflow GitHub Actions (voir `fetch-drive.yml`), qui dispose d'un accès Internet complet,
  puis rapatriés dans le dépôt.
- Certaines feuilles portent des réponses manuscrites : elles sont reproduites dans
  `QUESTIONS-CIVIQUES.md`, sans correction.
- Deux feuilles sont peu remplies (8 questions sur la page 1 et sur la page 10) : leur tableau
  se termine en haut de page, le reste de la feuille est vierge.
