# Mettre le site en ligne

Le site est **100 % statique**, **installable sur téléphone** (PWA) et fonctionne
**hors-ligne** une fois visité. Trois voies possibles, de la plus rapide à la plus
automatique.

---

## Option 0 — GitHub Pages : 3 clics, une seule fois ⭐ (recommandée)

Le site se publie ensuite **tout seul à chaque mise à jour** (workflow
`.github/workflows/pages.yml`, déjà dans le dépôt).

1. Ouvrir <https://github.com/jiojio17/parcours-marianne1/settings/pages>
2. Dans **Source**, choisir **GitHub Actions** (pas « Deploy from a branch »).
3. Ouvrir <https://github.com/jiojio17/parcours-marianne1/actions/workflows/pages.yml>
   et cliquer sur **Run workflow** → branche `arena/01a0aff8-parcours-marianne1` → **Run**.

L'adresse publique du site est indiquée en haut de l'exécution (et dans
**Settings → Pages**) :

```
https://jiojio17.github.io/parcours-marianne1/
```

Cette adresse fonctionne sur **n'importe quel appareil** : téléphone, tablette,
ordinateur, à la maison comme ailleurs. Sur téléphone, le navigateur propose
« Ajouter à l'écran d'accueil » : l'application s'ouvre alors en plein écran, avec son
icône, et reste utilisable **sans réseau**.

### Pourquoi ce n'est pas déjà activé

L'activation de GitHub Pages demande les droits d'administration du dépôt, que l'agent
n'a pas (jeton limité à l'écriture de code : l'API répond « Resource not accessible by
integration »). Le workflow, lui, est prêt et testé : il ne manque que ce clic.

---

## Option 1 — Cloudflare Pages : dépôt du paquet (2 minutes)

1. Ouvrir <https://dash.cloudflare.com> → **Workers & Pages**.
2. Ouvrir le projet `parcours-marianne-e1u` → **Deployments** → **Create new deployment**
   → **Upload assets**, puis glisser `dist/parcours-marianne-quiz.zip`.
   → Le site reste à l'adresse habituelle : <https://parcours-marianne-e1u.pages.dev/>
   → Cloudflare conserve l'historique : **Rollback** en un clic si besoin.

   *(Pour garder l'ancienne version en ligne à côté, créer un nouveau projet :
   **Create application → Pages → Upload assets** ; le site aura une nouvelle adresse
   `xxx.pages.dev`.)*

3. Pour régénérer le paquet après une modification :

```bash
npm run build && npm run pack     # → dist/parcours-marianne-quiz.zip
```

---

## Option 2 — Cloudflare Pages : déploiement automatique

Le workflow `.github/workflows/deploy-cloudflare.yml` déploie à chaque push, sans
tableau de bord. Configuration unique :

1. Créer un jeton Cloudflare **« Cloudflare Pages : Edit »**
   (<https://dash.cloudflare.com/profile/api-tokens>).
2. Dans le dépôt : **Settings → Secrets and variables → Actions** →
   ajouter les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`.
3. Facultatif : ajouter la variable `CLOUDFLARE_PROJECT_NAME` pour cibler un projet
   existant (par défaut `parcours-marianne` ; mets `parcours-marianne-e1u` pour mettre à
   jour le site actuel).

Sans ces secrets, le workflow ne fait rien : aucun échec, rien à nettoyer.

---

## Comment le site s'adapte à chaque appareil

| Appareil | Ce qui a été prévu |
| --- | --- |
| **Téléphone** (≤ 700 px) | menu qui défile horizontalement, boutons pleine largeur, cibles tactiles de 44 px minimum, chronomètre d'examen toujours visible en haut, tableaux qui défilent au lieu d'être écrasés, marges adaptées aux encoches (iPhone et Android) |
| **Tablette** (701–1024 px) | grilles en deux colonnes, marges élargies |
| **Ordinateur** (≥ 1025 px) | largeur de lecture confortable (980 px), grilles en trois ou quatre colonnes |
| **Grand écran** (≥ 1400 px) | colonne de lecture limitée à 1100 px et texte légèrement agrandi |
| **Téléphone en paysage** | barre d'examen non collante pour libérer la hauteur |
| **Clavier** | navigation complète (Tab, touches 1 à 4 pour répondre, flèches, Entrée) avec contour de focus visible |
| **Impression** | les menus et boutons disparaissent, les fiches et la banque s'impriment proprement |
| **Mouvement réduit** | les animations se désactivent si le système le demande |
| **Hors-ligne** | installation sur l'écran d'accueil, consultation des fiches, des capsules et des questions déjà visitées |

---

## À propos du dépôt `parcours-marianne` (sans le « 1 »)

Ce dépôt existe sur GitHub mais il est **vide** (aucun commit). Pour que le site y soit
hébergé :

- **Renommer** : GitHub → *Settings* → *Rename* du dépôt `parcours-marianne1`, puis créer
  un nouveau `parcours-marianne1` si besoin ;
- **Pousser le code** depuis un ordinateur :
  ```bash
  git clone https://github.com/jiojio17/parcours-marianne1.git
  cd parcours-marianne1
  git remote add autre https://github.com/jiojio17/parcours-marianne.git
  git push autre main:main --force
  ```
  (le dépôt `parcours-marianne` étant vide, rien ne peut être écrasé).

---

## Adresses utiles

| Quoi | Où |
| --- | --- |
| Code et historique | <https://github.com/jiojio17/parcours-marianne1> |
| Propositions de fusion | <https://github.com/jiojio17/parcours-marianne1/pulls> |
| Dépôts automatiques | <https://github.com/jiojio17/parcours-marianne1/actions> |
| Site d'origine (Cloudflare) | <https://parcours-marianne-e1u.pages.dev/> |
