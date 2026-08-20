# -*- coding: utf-8 -*-
"""Englischen Regeltext von mitgeschleppten Erläuterungen befreien.

Fünf Regeln trugen im Datensatz zusätzlich die blaue Erläuterung aus der
Schulungsmappe – dieselbe Ursache wie bei den Erläuterungsblöcken: die
englische Ausgabe war ohne Farbtrennung eingelesen worden. Bei Regel 2.1
standen so 1139 Zeichen englisch gegen 344 deutsch, und der Erläuterungstext
erschien im Kapitel zweimal.

Maßgeblich für Regeltext ist das Regelwerk, nicht die Schulungsmappe: 71 der
93 nummerierten Regeln stimmen damit bereits wortgleich überein. Die fünf
Ausnahmen werden hier darauf zurückgeführt.

    python3 regeltext_bereinigen.py --pruefen
    python3 regeltext_bereinigen.py
"""
import io, json, os, re, sys

REGELN_EN = '../../../03_IFA-Rules-of-the-Game-2025.pdf'
REGELN_DE = '../../../03d_IFA-Spielregeln-2025.pdf'
DATA = '../../assets/js/data-content.js'

# (Kapitel, Regelnummer) – englischer Regeltext aus dem Regelwerk übernehmen
BETROFFEN = [(2, '2.1'), (2, '2.2'), (2, '2.2.1'), (10, '10.1'), (10, '10.2.2')]

# Umgekehrter Fall: hier ist der deutsche Regeltext zu kurz. Bei 1.6 fehlte der
# Satz zur Verwahrung der Bälle – ausgerechnet der, auf den sich die Frage
# IFA-A-054 stützt. Bei 8.2.1 sind die Ziffern des Beispiels verlorengegangen,
# übrig blieb „Beispiel: A A“.
UNVOLLSTAENDIG_DE = [(1, '1.6'), (8, '8.2.1')]

# Regel 10.2.2 läuft im PDF ohne Absatzwechsel in den Anhang über. Nur der
# Regelsatz gehört in den Datensatz.
SCHNITT = {
    '10.2.2': 'In a match with time limits, the sum of all delays has to be added as extra time.'
}


def norm(s):
    s = s.lower()
    for a, b in [('’', "'"), ('‘', "'"), ('“', '"'), ('”', '"'),
                 ('–', '-'), ('—', '-'), (' ', ' ')]:
        s = s.replace(a, b)
    return re.sub(r'[^a-z0-9]', '', s)


def regelwerk(pdf):
    """Regelnummer -> Regeltext aus dem Regelwerk."""
    import extract
    out = {}
    for a in extract.absaetze(pdf):
        if not a['regel']:
            continue
        out[a['regel']] = re.sub(r'^' + re.escape(a['regel']) + r'\s*', '',
                                 a['text']).strip()
    return out


def main():
    for pdf in (REGELN_EN, REGELN_DE):
        if not os.path.exists(pdf):
            print('  %s nicht vorhanden – nichts zu tun' % os.path.basename(pdf))
            return 0
    quelle_en = regelwerk(REGELN_EN)
    quelle_de = regelwerk(REGELN_DE)

    s = io.open(DATA, encoding='utf-8').read()
    kopf = s[:s.index('[')]
    daten = json.loads(s[s.index('['):s.rindex(']') + 1])

    def block(ch, n):
        kap = next(c for c in daten if c['id'] == ch)
        return next(x for x in kap['blocks']
                    if x['t'] == 'rule' and str(x.get('n')) == n)

    fehler = False

    print('Englischer Regeltext – Erläuterung entfernen:')
    for ch, n in BETROFFEN:
        text = SCHNITT.get(n) or quelle_en.get(n)
        if not text:
            raise SystemExit('Regel %s nicht im englischen Regelwerk' % n)
        b = block(ch, n)
        alt = b['x']['en']
        drin = norm(text) in norm(quelle_en.get(n, '')) or n in SCHNITT
        print('  Regel %-8s  %4d -> %4d Zeichen   im Regelwerk: %s' %
              (n, len(alt), len(text), 'ja' if drin else 'NEIN'))
        # Gleich lang heißt: schon bereinigt. Länger wäre falsch – dann würde
        # das Skript etwas anhängen statt zu kürzen.
        if not drin or len(text) > len(alt):
            fehler = True
        if '--pruefen' not in sys.argv:
            b['x']['en'] = text
            b['src_en'] = 'rules'

    print('Deutscher Regeltext – fehlenden Teil ergänzen:')
    for ch, n in UNVOLLSTAENDIG_DE:
        text = quelle_de.get(n)
        if not text:
            raise SystemExit('Regel %s nicht im deutschen Regelwerk' % n)
        b = block(ch, n)
        alt = b['x']['de']
        # Der neue Text muss den alten enthalten – ergänzt wird, nicht ersetzt.
        # Ausnahme 8.2.1: dort war die Ziffernfolge verloren, nicht nur gekürzt.
        enthalten = norm(alt) in norm(text) or n == '8.2.1'
        print('  Regel %-8s  %4d -> %4d Zeichen   %s' %
              (n, len(alt), len(text),
               'ergänzt' if len(text) > len(alt) else 'schon vollständig'))
        if not enthalten:
            fehler = True
        if '--pruefen' not in sys.argv:
            b['x']['de'] = text
            b['src_de'] = 'rules'

    if fehler:
        return 1
    if '--pruefen' not in sys.argv:
        io.open(DATA, 'w', encoding='utf-8').write(
            kopf + json.dumps(daten, ensure_ascii=False, indent=1) + ';\n')
        print('  %d Regeltexte bereinigt' % (len(BETROFFEN) + len(UNVOLLSTAENDIG_DE)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
