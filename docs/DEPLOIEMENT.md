# Mettre le site en ligne

Le site est prêt et fonctionne. Il ne manque qu'une chose, que GitHub réserve au
propriétaire du dépôt : **la création du site Pages**. Tous les essais
automatiques ont été refusés par GitHub (réponse `403 Resource not accessible by
integration`, y compris avec la permission `pages: write`) ; c'est une règle de
GitHub, pas un défaut du dépôt.

## Option 1 — GitHub Pages : 2 clics, puis tout est automatique ⭐

1. Ouvre : **https://github.com/jiojio17/parcours-marianne1/settings/pages**
2. Sous **Source**, choisis **GitHub Actions** et clique sur **Save**.

C'est terminé. Ensuite, le workflow `pages.yml` publie le site :

- à chaque modification du contenu ;
- **toutes les 30 minutes** (tâche planifiée) : dès que le site existe, la
  publication part toute seule, sans aucune action ;
- et à la demande, depuis l'onglet **Actions** → *Publier le site* → *Run workflow*.

Adresse publique une fois publié :

```
https://jiojio17.github.io/parcours-marianne1/
```

## Option 2 — Cloudflare Pages (ton compte existe déjà)

Le site tient dans un seul fichier ZIP : **`dist/parcours-marianne-quiz.zip`** (99 Ko).

1. Va sur **https://dash.cloudflare.com** → **Workers & Pages** → **Create** →
   **Pages** → **Upload assets**.
2. Donne-lui un nom (par exemple `parcours-marianne`), glisse le ZIP, valide.

Tu obtiens une adresse `https://<nom>.pages.dev` qui se met à jour à chaque
nouvel envoi du ZIP.

Autre possibilité, entièrement automatique depuis GitHub : ajouter deux secrets
dans **Settings → Secrets and variables → Actions** —
`CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` — et une variable
`CLOUDFLARE_PROJECT_NAME` (par exemple `parcours-marianne-e1u`). Le workflow
`deploy-cloudflare.yml` prend alors le relais à chaque modification.

## Option 3 — En local, tout de suite

```bash
npm start          # http://localhost:4173
```

Aucune dépendance n'est nécessaire pour servir le site : `tools/serve.mjs` est
un serveur Node minimal (bons types MIME, repli 404, en-têtes PWA).

## Ce qui a été écarté, et pourquoi

| Piste | Résultat |
| --- | --- |
| Création du site Pages par le robot | **403** de GitHub (3 essais, dont `enablement: true`) |
| CDN jsDelivr | Sert le HTML en `text/plain` (sécurité) : non navigable |
| CDN statically.io | Bons types MIME, mais erreurs **500** sur `data/questions.js` et les images |
| raw.githack / rawcdn.githack | Page d'avertissement interstitielle |
| gitcdn.link | Domaine en vente |
| Pages d'un autre dépôt | Le robot n'a de droits que sur `parcours-marianne1` |

Le dépôt reste donc **auto-suffisant** : dès l'activation, la publication est
automatique, contrôlée (472 questions et 40 séries vérifiées à chaque passage)
et reprend toute seule en cas de modification.

## Suivre l'état

```bash
gh run list --limit 5                     # derniers passages du workflow
gh api repos/jiojio17/parcours-marianne1/pages   # 404 tant que Pages n'est pas activé
bash tools/surveille-pages.sh 90          # surveille l'activation et publie dès qu'elle a lieu
```
