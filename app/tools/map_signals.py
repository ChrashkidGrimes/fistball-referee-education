#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Handzeichen-Fotos aus der Schulungsmappe extrahieren und den Zeichen zuordnen.

Wichtig: Die Reihenfolge der Bild-Objekte im PDF entspricht NICHT der
Lesereihenfolge. Auf Seite 27 der Schulungsmappe steht das Bild zu Zeichen 14
(Behinderung) an erster Stelle, obwohl es unten auf der Seite abgebildet ist.
Die Zuordnung erfolgt deshalb ueber die vertikale Position: jedes Bild gehoert
zu der Zeichen-Ueberschrift, die ihm am naechsten liegt.

Wird zusaetzlich das englische Training Manual uebergeben, werden die Diagramme
mit Beschriftung (Spielfeld, Linienrichter-Positionen) auch in der englischen
Fassung als "*-en.jpg" abgelegt. Die Handzeichen-Fotos sind reine Fotografien
ohne Text und werden nicht doppelt vorgehalten.

Aufruf aus dem Ordner app/:
    python3 tools/map_signals.py ../33d_IFA-Schulungsmappe-fur-Schiedsrichter-2025.pdf \
                                 ../33_IFA-Training-Manual-for-Referees-2025.pdf

Erzeugt assets/img/signals/*.jpg, assets/img/court*.jpg und
assets/img/signals/manifest.json.
Benoetigt: pdfplumber, Pillow, pdfimages (poppler-utils).
"""
import json, os, re, subprocess, sys, tempfile, collections
import pdfplumber
from PIL import Image

FIRST_PAGE, LAST_PAGE = 23, 28          # Seiten mit den Handzeichen
# Beschriftete Diagramme: Seite -> Namen, je Ausgabe
DIAGRAMS_DE = {3: ['court'], 29: ['lr-1'], 30: ['lr-2', 'lr-3']}
DIAGRAMS_EN = {3: ['court'], 31: ['lr-1', 'lr-2', 'lr-3']}
MAX_PX, QUALITY = 640, 82
COURT_PX = 1200                         # Spielfeldplan darf groesser sein


def derive(pdf):
    """-> { zeichen: [(seite, index_in_pdf_reihenfolge), ...] }"""
    out = collections.defaultdict(list)
    with pdfplumber.open(pdf) as doc:
        for pi in range(FIRST_PAGE - 1, LAST_PAGE):
            page = doc.pages[pi]
            heads = [(int(m.group(1)), w['top'])
                     for w in page.extract_words()
                     for m in [re.fullmatch(r'(\d{1,2})\.', w['text'])]
                     if m and w['x0'] < 70]
            if not heads:
                continue
            for j, im in enumerate(page.images):
                num = min(heads, key=lambda h: abs(h[1] - im['top']))[0]
                out[num].append((pi + 1, j, im['top'], im['x0']))
    for k in out:                                   # oben nach unten, links nach rechts
        out[k].sort(key=lambda t: (round(t[2]), t[3]))
    return out


def pages_of(pdf, tmp, tag):
    """PDF-Bilder extrahieren -> { seite: [pfade in PDF-Reihenfolge] }"""
    subprocess.run(['pdfimages', '-png', '-p', pdf, os.path.join(tmp, tag)], check=True)
    by_page = collections.defaultdict(list)
    for f in sorted(os.listdir(tmp)):
        if not f.startswith(tag + '-'):
            continue
        by_page[int(re.search(r'-(\d+)-', f).group(1))].append(os.path.join(tmp, f))
    return by_page


def save(src, path, max_px):
    im = Image.open(src).convert('RGB')
    im.thumbnail((max_px, max_px))
    im.save(path, quality=QUALITY, optimize=True)


def main(pdf, pdf_en=None):
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dest = os.path.join(here, 'assets', 'img', 'signals')
    img_dir = os.path.join(here, 'assets', 'img')
    os.makedirs(dest, exist_ok=True)
    sig = derive(pdf)

    with tempfile.TemporaryDirectory() as tmp:
        by_page = pages_of(pdf, tmp, 'de')

        plan, manifest = {}, {}
        for num, entries in sorted(sig.items()):
            files = [by_page[pg][idx] for pg, idx, _, _ in entries]
            names = ([f'sig-{num:02d}'] if len(files) == 1
                     else [f'sig-{num:02d}{chr(97 + i)}' for i in range(len(files))])
            for name, src, (pg, idx, _, _) in zip(names, files, entries):
                plan[name] = src
                manifest[name] = {'signal': num, 'page': pg, 'index': idx, 'lang': 'de'}
        for pg, names in DIAGRAMS_DE.items():
            for i, name in enumerate(names):
                plan[name] = by_page[pg][i]
                manifest[name] = {'signal': None, 'page': pg, 'index': i, 'lang': 'de'}

        plan_en = {}
        if pdf_en:
            en_pages = pages_of(pdf_en, tmp, 'en')
            for pg, names in DIAGRAMS_EN.items():
                for i, name in enumerate(names):
                    plan_en[name + '-en'] = en_pages[pg][i]
                    manifest[name + '-en'] = {'signal': None, 'page': pg, 'index': i, 'lang': 'en'}

        for d in (dest, img_dir):
            for f in os.listdir(d):
                if f.endswith('.jpg') and (d == dest or f.startswith('court')):
                    os.remove(os.path.join(d, f))
        for name, src in list(plan.items()) + list(plan_en.items()):
            base = name[:-3] if name.endswith('-en') else name
            target = img_dir if base == 'court' else dest
            save(src, os.path.join(target, name + '.jpg'),
                 COURT_PX if base == 'court' else MAX_PX)

    with open(os.path.join(dest, 'manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=1, sort_keys=True)

    for name in sorted(manifest):
        m = manifest[name]
        print(f'  {name:<10} <- {m["lang"]} Seite {m["page"]}, Bild {m["index"]}'
              + (f'  (Zeichen {m["signal"]})' if m['signal'] else '  (Diagramm)'))
    print(f'{len(plan) + len(plan_en)} Bilder geschrieben')


if __name__ == '__main__':
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    main(*sys.argv[1:])
