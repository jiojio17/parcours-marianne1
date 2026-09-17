# Mettre le site en ligne (Cloudflare Pages)

Le site est **100 % statique** : un dossier de fichiers, aucune installation, aucun serveur.
Le paquet prêt à déployer est `dist/parcours-marianne-quiz.zip` (contenu du dossier `app/`).

Il y a trois façons de le mettre en ligne, de la plus simple à la plus « automatique ».

---

## Option A — Déposer le paquet (2 minutes, immédiat)

1. Ouvrir <https://dash.cloudflare.com> → **Workers & Pages**.
2. **Soit** ouvrir le projet existant `parcours-marianne-e1u` → onglet **Deployments** →
   **Create new deployment** → **Upload assets**, puis glisser `dist/parcours-marianne-quiz.zip`.
   Le site reste à la même adresse : <https://parcours-marianne-e1u.pages.dev/>.
   **Soit** créer un nouveau projet (**Create application → Pages → Upload assets**) pour garder
   l'ancienne version en ligne à côté ; le site aura alors une nouvelle adresse
   `xxx.pages.dev`.
3. Attendre 10 secondes : c'est en ligne.

> ⚠️ Déployer dans le projet existant **remplace** la version actuelle du site.
> Cloudflare conserve tout l'historique : en cas de besoin, on revient à l'ancienne version
> en un clic depuis **Deployments → … → Rollback**.

Pour régénérer le paquet après une modification des questions :

```bash
npm run build && npm run pack      # → dist/parcours-marianne-quiz.zip
```

---

## Option B — Connexion au dépôt GitHub (mise à jour automatique)

À faire une seule fois :

1. Fusionner la branche de travail dans `main` (voir la *pull request* ouverte sur le dépôt
   `jiojio17/parcours-marianne1`).
2. Dashboard Cloudflare → **Workers & Pages** → **Create application** → **Pages** →
   **Connect to Git** → autoriser GitHub → choisir le dépôt `parcours-marianne1`.
3. Réglages de construction :
   - **Production branch** : `main`
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `app`
4. **Save and Deploy**.

Chaque `git push` sur `main` redéploie alors le site automatiquement.

---

## Option C — Ajouter seulement les quiz au site existant

Si tu veux **garder** le site actuel (`parcours-marianne-e1u.pages.dev`) et y ajouter
uniquement les quiz, il faut son **code source** (le projet qui a servi à le déployer) :

- soit le dossier du projet en `.zip` (il sera intégré : questions, moteur de quiz,
  examens blancs, bilan de départ) ;
- soit un dépôt GitHub contenant ce code.

Sans ce code source, la seule solution est de republier le site reconstruit ici
(options A ou B) : il reprend la même logique (bilan de départ → parcours personnalisé,
mêmes thèmes, même esprit) avec les quiz en plus.

---

## À propos du dépôt `parcours-marianne` (sans le « 1 »)

Ce dépôt existe sur GitHub mais il est **vide** (aucun commit). Pour que le site y soit
hébergé, il faut y transférer le code — deux solutions simples :

- **Renommer** : GitHub → *Settings* → *Rename* du dépôt `parcours-marianne1`, puis créer un
  nouveau `parcours-marianne1` si besoin ;
- **Pousser le code** depuis un ordinateur :
  ```bash
  git clone https://github.com/jiojio17/parcours-marianne1.git
  cd parcours-marianne1
  git remote add autre https://github.com/jiojio17/parcours-marianne.git
  git push autre main:main --force
  ```
  (le dépôt `parcours-marianne` étant vide, rien ne peut être écrasé).
