# Le quiz Parcours Marianne

## Origine des questions

Les questions viennent des **sujets d'entraînement à l'examen civique** (dossier Drive
« Exercices renouvellement ») récupérés dans `documents/` :

| Thème | Pages sources | Questions |
| --- | --- | --- |
| Vivre dans la société française | 1789657471668, 1789657471675 | 44 |
| Histoire, géographie et culture | 1789657471681, 1789657471689, 1789657471698 | 83 |
| Droits et devoirs | 1789657471705, 1789657471714 | 37 |
| Système institutionnel et politique | 1789657471730, 1789657471721 | 55 |
| Principes et valeurs de la République | 1789657471738, 1789657471746 | 36 |
| **Sous-total (transcription des sujets)** | 11 pages | **255** |
| Mises en situation (format officiel) | rédigées pour l'entraînement | 30 |
| **Total de la banque** | | **285** |

Les énoncés sont ceux des feuilles, à l'orthographe près (les sources sont sans accents).
Chaque question a été complétée par :

- **une bonne réponse** vérifiée contre les sources officielles (Constitution, Code civil,
  Code du travail, Code pénal, Livret du citoyen, traités européens) ;
- **trois réponses fausses « crédibles »** : elles correspondent à des confusions
  fréquentes (ex. 1999/2002 pour l'euro, Rodin peintre/sculpteur, 5/6 ans pour le mandat
  municipal, Bruxelles/Strasbourg pour le Parlement européen) ;
- **une explication** rappelant la règle de droit ou la date, affichée après la correction.

Les réponses manuscrites présentes sur certaines feuilles n'ont pas servi de corrigé :
elles sont conservées dans `documents/QUESTIONS-CIVIQUES.md` et plusieurs sont fautives
(ex. « Auguste Rodin → un peintre »).

## Le format de l'épreuve

| Élément | Examen officiel | Entraînement ici |
| --- | --- | --- |
| Questions | 40 (28 connaissances + 12 mises en situation) | idem |
| Durée | 45 minutes | 45 minutes (chronométré) |
| Réussite | 32/40 (80 %) | idem |
| Support | ordinateur ou tablette en centre agréé | navigateur, sans document |

Répartition d'un tirage : 6 « Vivre en société », 6 « Histoire et culture », 5 « Droits et
devoirs », 6 « Institutions », 5 « Valeurs de la République », 12 mises en situation.
Les questions marquées `dupOf` (doublons repérés dans les feuilles) servent à la révision
mais ne sont jamais tirées deux fois dans le même examen.

## Ajouter ou modifier une question

1. Éditer le fichier concerné dans `data/quizzes/` (`theme-1-vivre.json`, …).
   Format d'une entrée :

```json
{
  "id": "V-45",
  "theme": "vivre",
  "page": "1789657471668",
  "q": "Énoncé de la question ?",
  "options": ["Bonne réponse", "Mauvaise 1", "Mauvaise 2", "Mauvaise 3"],
  "correct": 0,
  "why": "Explication affichée après la réponse."
}
```

2. Contrôles automatiques au moment du build : 4 choix exactement, `correct` entre 0 et 3,
   identifiants uniques, thème connu.
3. `npm run build` : la banque et les 40 séries sont régénérées (tirage déterministe).

## Séries et tirages

`tools/build-quiz.mjs` produit 40 séries numérotées à partir d'une graine fixe : elles
sont donc reproductibles. L'application propose en plus un **tirage aléatoire**,
reconstruit à chaque partie avec la même répartition.

## Limites

- Outil d'entraînement indépendant, sans lien avec l'administration.
- Les données officielles évoluent (ex. nombre d'États membres, montants, majorités) :
  une relecture périodique est conseillée.
