#!/usr/bin/env python3
"""pack.py — crée l'archive du site statique, prête à déposer sur Cloudflare Pages.

Usage : python3 tools/pack.py
Sortie : dist/parcours-marianne-quiz.zip  (contenu du dossier app/, à la racine de l'archive)
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "app")
OUT_DIR = os.path.join(ROOT, "dist")
OUT = os.path.join(OUT_DIR, "parcours-marianne-quiz.zip")

os.makedirs(OUT_DIR, exist_ok=True)
count = 0
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for base, _dirs, files in os.walk(SRC):
        for f in sorted(files):
            full = os.path.join(base, f)
            rel = os.path.relpath(full, SRC)
            z.write(full, rel)
            count += 1

size = os.path.getsize(OUT) / 1024
print(f"{OUT} — {count} fichiers, {size:.0f} Ko")
