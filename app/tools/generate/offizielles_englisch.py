# -*- coding: utf-8 -*-
"""Sechs Erläuterungen auf den offiziellen englischen Wortlaut umstellen.

Diese sechs Blöcke trugen eine Arbeitsübersetzung, obwohl die offizielle
englische Ausgabe den Text sehr wohl enthält. Ursache war die fehlende
Farbtrennung beim Einlesen der englischen Mappe – siehe extract.py.

Die Texte hier sind wortgleich aus `33_IFA-Training-Manual-for-Referees-2025.pdf`
übernommen, Seitenangabe jeweils dabei. `verify()` prüft das gegen das PDF,
solange es im übergeordneten Ordner liegt.

    python3 offizielles_englisch.py          # prüfen und einpflegen
    python3 offizielles_englisch.py --pruefen # nur prüfen
"""
import io, json, os, re, sys

PDF = '../../../33_IFA-Training-Manual-for-Referees-2025.pdf'
DATA = '../../assets/js/data-content.js'

# (Kapitel, Blockindex, Seite im Manual, offizieller englischer Wortlaut)
OFFIZIELL = [
 (2, 1, 8,
  "All players as well as coaches and officials must be entered in the match report "
  "before the start of the match. Players which are used must be marked with a cross "
  "from the point in time they enter the court.\n\n"
  "For IFA competitions there are substitute zones where the substitutes are located. "
  "The substitute zones can only be left to warm up. If a substitute or trainer/coach "
  "enters the field during a game, this is to be marked as a fault. Only 2 people "
  "(coaches, supervisors) who are noted in the game report and who are clearly "
  "different in their clothing (color) from the players are allowed to stay within "
  "their own buffer zone during play. The only exception to this is during a time-out, "
  "when all team members may enter the buffer zone."),

 (2, 11, 9,
  "An “armband” is only to be worn on the arm!\n\n"
  "The team captain is the referee's point of contact for general questions (e.g. "
  "verbal warnings to the team in timed games, announcement of extra time....). In "
  "these cases and also in the event of complaints from the team, he is the sole "
  "spokesman for the team.\n\n"
  "In situations that affect an individual player (e.g. query, verbal warning, "
  "warning, sending off, etc.), this will be discussed with this player.\n\n"
  "Of course, the referee can also communicate with all other players if he deems it "
  "appropriate. For official messages to the team, however, the team captain is the "
  "contact person."),

 (2, 13, 9,
  "The reason for this rule is that the referee has a responsible contact person on "
  "the pitch at all times and is not forced to go to the substitutes' bench for any "
  "explanations or questions. This is particularly important for events that are "
  "broadcast on TV or the internet.\n\n"
  "The captain designee in the game report will not be filled out until the end of "
  "the match. The last captain during the match will be marked on the game report and "
  "will be responsible to sign the final game report."),

 (10, 1, 19,
  "General guidance on penalties: The referee ensures that everyone involved in the "
  "game abides by the rules of the game and respects the idea of fair play in their "
  "behavior. In order to ensure this, they have various options available from which "
  "they can choose the best possible deployment option depending on the situation. "
  "The examples and situations described below provide orientation as to the "
  "appropriateness of the various punishment options. A final \"if-then instruction\" "
  "cannot be given conclusively due to the variety of situations in the overall "
  "context of the game (emotions, overall process, previous events). A situational "
  "assessment by the referee in the overall context of the game will always be the "
  "final assessment in order to recognize misconduct in the sense that further "
  "escalation is avoided and the person to be punished realizes that the behavior was "
  "unacceptable and that is the respective penalty."),

 (12, 0, 21,
  "The referee makes decisions based on visual perception and cannot be influenced by "
  "players, support staff or spectators. Hearing can only confirm the correctness of "
  "his visual perception. The more certain a referee is about a decision made, the "
  "stronger this decision can be represented."),

 (12, 1, 21,
  "Of course, a referee is also human and therefore makes mistakes. A good referee is "
  "characterized by keeping these errors to a minimum. If a referee immediately "
  "recognizes his wrong decision, or if a player admits an unrecognized mistake, he "
  "can revise it. However, if a referee has made a decision based on his perception, "
  "he will not overturn it on protest."),
]


def norm(s):
    s = s.lower()
    for a, b in [('’', "'"), ('‘', "'"), ('“', '"'), ('”', '"'),
                 ('–', '-'), ('—', '-'), (' ', ' ')]:
        s = s.replace(a, b)
    return re.sub(r'[^a-z0-9]', '', s)


def verify():
    """Jeden Wortlaut gegen das PDF halten. Ohne PDF wird uebersprungen."""
    if not os.path.exists(PDF):
        print('  PDF nicht vorhanden – Wortlautprüfung übersprungen')
        return True
    import pdfplumber
    with pdfplumber.open(PDF) as p:
        voll = norm("\n".join((pg.extract_text() or '') for pg in p.pages))
    ok = True
    for ch, i, seite, text in OFFIZIELL:
        if norm(text) in voll:
            print('  ok      Kapitel %-3d Block %-3d (Manual S. %d)' % (ch, i, seite))
        else:
            print('  FEHLER  Kapitel %-3d Block %-3d steht so nicht im Manual' % (ch, i))
            ok = False
    return ok


def einpflegen():
    s = io.open(DATA, encoding='utf-8').read()
    daten = json.loads(s[s.index('['):s.rindex(']') + 1])
    geaendert = 0
    for ch, i, seite, text in OFFIZIELL:
        kap = next(c for c in daten if c['id'] == ch)
        b = kap['blocks'][i]
        assert b['t'] == 'note', 'Block %d in Kapitel %d ist kein note' % (i, ch)
        b['x']['en'] = text
        b.pop('tr', None)          # kein Arbeitsuebersetzungs-Kennzeichen mehr
        b['src_en'] = 'manual-p%d' % seite
        geaendert += 1
    kopf = s[:s.index('[')]
    io.open(DATA, 'w', encoding='utf-8').write(
        kopf + json.dumps(daten, ensure_ascii=False, indent=1) + ';\n')
    print('  %d Blöcke auf den offiziellen Wortlaut umgestellt' % geaendert)


if __name__ == '__main__':
    print('Wortlaut gegen das Manual prüfen:')
    if not verify():
        sys.exit('Abbruch – Wortlaut stimmt nicht mit dem PDF überein')
    if '--pruefen' not in sys.argv:
        einpflegen()
