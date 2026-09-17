#!/usr/bin/env bash
# surveille-pages.sh — dès que GitHub Pages est activé sur le dépôt, déclenche la
# publication du site et vérifie qu'il est en ligne. À lancer en arrière-plan :
#   bash tools/surveille-pages.sh [durée_minutes]
# Journal : tools/surveille-pages.log

set -uo pipefail
cd "$(dirname "$0")/.."

DUREE_MIN=${1:-60}
REPO="jiojio17/parcours-marianne1"
BRANCHE="arena/01a0aff8-parcours-marianne1"
URL_SITE="https://jiojio17.github.io/parcours-marianne1/"
JOURNAL="tools/surveille-pages.log"

journal() {
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] $*" | tee -a "$JOURNAL"
}

journal "Surveillance démarrée (durée maximale : ${DUREE_MIN} min)."
journal "Dès que GitHub Pages sera activé, la publication se déclenchera seule."

limite=$((DUREE_MIN * 2))   # une vérification toutes les 30 s
etat_precedent=""

for i in $(seq 1 "$limite"); do
  reponse=$(gh api "repos/$REPO/pages" 2>/dev/null || true)

  if echo "$reponse" | grep -q '"html_url"'; then
    url=$(echo "$reponse" | python3 -c "import sys,json;print(json.load(sys.stdin).get('html_url',''))" 2>/dev/null || echo "")
    statut=$(echo "$reponse" | python3 -c "import sys,json;print(json.load(sys.stdin).get('status',''))" 2>/dev/null || echo "")

    if [ "$etat_precedent" != "actif" ]; then
      etat_precedent="actif"
      journal "Pages est ACTIVÉ (statut : ${statut:-?}, adresse : ${url:-$URL_SITE})."
      journal "Déclenchement de la publication…"

      # une modification de tools/ suffit à déclencher le workflow (filtre paths)
      date -u '+%Y-%m-%d %H:%M:%S UTC — publication automatique' > tools/deploy-trigger.txt
      git add tools/deploy-trigger.txt
      git -c user.name="arena-agent[bot]" -c user.email="arena-agent[bot]@users.noreply.github.com" \
        commit -q -m "Publication automatique du site (GitHub Pages activé)" || true
      git push -q origin "$BRANCHE" || journal "Échec du push (à vérifier)."
      journal "Publication demandée."
    fi

    # vérifie que le site répond
    if [ -n "$url" ]; then
      code=$(curl -s -o /dev/null -w '%{http_code}' -m 10 "$url" 2>/dev/null || echo 000)
      if [ "$code" = "200" ]; then
        journal "✅ Le site répond ($url → HTTP 200). Mission accomplie."
        rm -f tools/deploy-trigger.txt
        exit 0
      fi
    fi
  else
    if [ "$etat_precedent" != "inactif" ]; then
      etat_precedent="inactif"
      journal "Pages n'est pas encore activé. En attente…  (Settings → Pages → Source : GitHub Actions)"
    fi
  fi

  sleep 30
done

journal "Délai écoulé sans activation de Pages. Le site reste disponible via l'aperçu de travail."
exit 0
