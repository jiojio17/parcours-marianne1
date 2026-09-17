#!/usr/bin/env python3
"""optimize-documents.py — allège les photos des sujets d'entraînement.

Les photos d'origine pèsent 2,5 Mo chacune (4000×3000) : utiles pour l'archivage, mais
très lourdes pour un site web et un dépôt Git. Ce script produit des versions lisibles
et légères (1 800 px de large au maximum, JPEG progressif qualité 82), en conservant
les noms de fichiers.

Usage :
    pip install Pillow
    python3 tools/optimize-documents.py            # traite documents/*/
    python3 tools/optimize-documents.py --dry-run   # affiche seulement les gains

Les fichiers d'origine restent téléchargeables depuis le dossier Google Drive
(workflow « Fetch Drive documents »).
"""
import argparse
import pathlib
import sys

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow est requis : pip install Pillow")

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOSSIERS = [
    ROOT / "documents" / "exercices-renouvellement",
    ROOT / "documents" / "exercices-renouvellement-redresses",
]
LARGEUR_MAX = 1800
QUALITE = 82


def traiter(chemin: pathlib.Path, dry_run: bool) -> tuple[int, int]:
    avant = chemin.stat().st_size
    if dry_run:
        return avant, avant
    with Image.open(chemin) as img:
        img = img.convert("RGB")
        if max(img.size) > LARGEUR_MAX:
            ratio = LARGEUR_MAX / max(img.size)
            taille = (round(img.width * ratio), round(img.height * ratio))
            img = img.resize(taille, Image.LANCZOS)
        img.save(chemin, "JPEG", quality=QUALITE, optimize=True, progressive=True)
    return avant, chemin.stat().st_size


def main() -> int:
    parseur = argparse.ArgumentParser(description="Allège les photos des sujets d'entraînement.")
    parseur.add_argument("--dry-run", action="store_true", help="ne rien écrire, seulement mesurer")
    args = parseur.parse_args()

    total_avant = total_apres = 0
    fichiers = 0
    for dossier in DOSSIERS:
        if not dossier.exists():
            continue
        print(f"--- {dossier.relative_to(ROOT)} ---")
        for chemin in sorted(dossier.glob("*.jpg")):
            avant, apres = traiter(chemin, args.dry_run)
            total_avant += avant
            total_apres += apres
            fichiers += 1
            print(f"  {chemin.name}  {avant/1048576:5.2f} Mo → {apres/1048576:5.2f} Mo")

    if not fichiers:
        print("Aucune image trouvée.")
        return 1

    gain = 100 * (1 - total_apres / total_avant) if total_avant else 0
    print()
    print(f"{fichiers} images : {total_avant/1048576:.1f} Mo → {total_apres/1048576:.1f} Mo "
          f"(gain {gain:.0f} %)")
    if args.dry_run:
        print("(mode simulation : aucun fichier modifié)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
