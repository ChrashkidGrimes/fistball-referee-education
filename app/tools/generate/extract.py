# -*- coding: utf-8 -*-
"""Schulungsmappe nach Schriftfarbe trennen.

Beide Ausgaben der IFA-Schulungsmappe setzen Regeltext schwarz und die
Erläuterung/Auslegung blau. Ohne diese Trennung laufen Regel und Erläuterung
im extrahierten Text ineinander – genau daran ist die erste Zuordnung der
englischen Erläuterungen gescheitert: wo die englische Ausgabe die Erläuterung
ohne eigene Überschrift direkt an den Regeltext hängt, war sie nicht mehr als
eigener Block erkennbar und wurde durch eine Arbeitsübersetzung ersetzt,
obwohl offizieller Text vorlag.

Ergebnis ist eine Liste von Absätzen mit Seitenzahl und Farbe. Bewusst roh
gehalten: die Datei ist zum Nachschlagen und Gegenlesen da, nicht zum direkten
Einspielen.

    python3 extract.py ../../../33_IFA-Training-Manual-for-Referees-2025.pdf en.json
    python3 extract.py ../../../33d_IFA-Schulungsmappe-fur-Schiedsrichter-2025.pdf de.json

Braucht pdfplumber.
"""
import json, io, re, sys

BLAU = (0.0, 0.0, 1.0)
SCHWARZ = (0.0, 0.0, 0.0)
# Zeilenanfang einer nummerierten Regel, z. B. "2.1.2 Ergänzung und ..."
REGEL = re.compile(r'^(\d{1,2}(?:\.\d+){0,3})\s*(?=[A-ZÄÖÜ])')
# Seitenzahl-Zeilen wie "- 12 -"
SEITENZAHL = re.compile(r'^-\s*\d+\s*-$')


def farbe_der_zeile(chars):
    """schwarz, blau oder gemischt. Gemischt kommt vor, wenn ein Satz die
       Farbe wechselt – dann entscheidet die Mehrheit."""
    werte = [c.get('non_stroking_color') for c in chars if c['text'].strip()]
    if not werte:
        return 'leer'
    blau = sum(1 for v in werte if v == BLAU)
    schwarz = sum(1 for v in werte if v == SCHWARZ)
    if blau and not schwarz:
        return 'blau'
    if schwarz and not blau:
        return 'schwarz'
    return 'blau' if blau > schwarz else 'schwarz'


def zeilen(pdf):
    import pdfplumber
    with pdfplumber.open(pdf) as doc:
        for nr, seite in enumerate(doc.pages, start=1):
            gruppen = {}
            for ch in seite.chars:
                gruppen.setdefault(round(ch['top'], 1), []).append(ch)
            for top in sorted(gruppen):
                chars = sorted(gruppen[top], key=lambda c: c['x0'])
                text = ''.join(c['text'] for c in chars).strip()
                if not text or SEITENZAHL.match(text):
                    continue
                yield nr, farbe_der_zeile(chars), text


def absaetze(pdf):
    """Zeilen gleicher Farbe zu Absätzen zusammenfassen. Ein neuer Absatz
       beginnt bei Farbwechsel oder bei einer neuen Regelnummer."""
    out = []
    for nr, farbe, text in zeilen(pdf):
        neu = REGEL.match(text) is not None
        if out and out[-1]['farbe'] == farbe and not neu:
            # Trennstrich am Zeilenende zusammenziehen
            if out[-1]['text'].endswith('-'):
                out[-1]['text'] = out[-1]['text'][:-1] + text
            else:
                out[-1]['text'] += ' ' + text
        else:
            m = REGEL.match(text)
            out.append({'seite': nr, 'farbe': farbe,
                        'regel': m.group(1) if m else None,
                        'text': text})
    for a in out:
        a['text'] = re.sub(r'\s+', ' ', a['text']).strip()
    return out


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1
    quelle, ziel = sys.argv[1], sys.argv[2]
    a = absaetze(quelle)
    io.open(ziel, 'w', encoding='utf-8').write(
        json.dumps(a, ensure_ascii=False, indent=1))
    schwarz = sum(1 for x in a if x['farbe'] == 'schwarz')
    blau = sum(1 for x in a if x['farbe'] == 'blau')
    regeln = sum(1 for x in a if x['regel'])
    print('%s -> %s' % (quelle, ziel))
    print('  Absätze: %d  (schwarz %d, blau %d)' % (len(a), schwarz, blau))
    print('  davon mit Regelnummer: %d' % regeln)
    return 0


if __name__ == '__main__':
    sys.exit(main())
