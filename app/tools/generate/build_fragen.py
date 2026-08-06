# -*- coding: utf-8 -*-
"""Baut die neuen Fragen als JSON. Deutsche Texte bekommen ihre Umlaute zurueck,
englische bleiben ASCII (Testvorgabe: keine deutschen Umlaute im englischen Text)."""
import io, json, re, sys
sys.path.insert(0, '/sessions/affectionate-serene-volta/mnt/outputs')
from neue_fragen import BILD, TEXT

# Wortstaemme, laengste zuerst, damit Teiltreffer nicht dazwischenfunken
UML = [
 ("Schliess", "Schließ"), ("schliess", "schließ"),
 ("heisst", "heißt"),
 ("bestaetig", "bestätig"),
 ("Rueck", "Rück"), ("rueck", "rück"),
 ("Geraete", "Geräte"),
 ("regelmaessigen", "regelmäßigen"),
 ("Handflaeche", "Handfläche"),
 ("planmaessigen", "planmäßigen"),
 ("unverzueglich", "unverzüglich"),
 ("Aussenlinie", "Außenlinie"),
 ("Massnahmen", "Maßnahmen"),
 ("massgeblich", "maßgeblich"),
 ("roemischen", "römischen"),
 ("Uebelkeit", "Übelkeit"),
 ("ausserhalb", "außerhalb"),
 ("volljaehrig", "volljährig"),
 ("saechlich", "sächlich"),
 ("Beruehr", "Berühr"), ("beruehr", "berühr"),
 ("geoeffnet", "geöffnet"),
 ("Ueber", "Über"), ("ueber", "über"),
 ("Faeust", "Fäust"),
 ("Haend", "Händ"),
 ("Koerper", "Körper"),
 ("schaetz", "schätz"),
 ("stuetz", "stütz"),
 ("staend", "ständ"),
 ("spruech", "sprüch"),
 ("Duerf", "Dürf"), ("duerf", "dürf"),
 ("gaenz", "gänz"),
 ("gueltig", "gültig"),
 ("aendert", "ändert"),
 ("baelle", "bälle"), ("Baelle", "Bälle"),
 ("Klaer", "Klär"), ("klaer", "klär"),
 ("Verzoeger", "Verzöger"),
 ("moeglich", "möglich"),
 ("hoehe", "höhe"),
 ("koenn", "könn"),
 ("fueh", "füh"),
 ("fuer", "für"),
 ("hoer", "hör"),
 ("haelt", "hält"),
 ("faellt", "fällt"),
 ("traegt", "trägt"),
 ("waehrend", "während"),
 ("Pruefung", "Prüfung"),
 ("pruefung", "prüfung"),
 ("naechst", "nächst"),
 ("untaetig", "untätig"),
 ("zulaesst", "zulässt"),
 ("gruendet", "gründet"),
 ("genuegt", "genügt"),
 ("schraeg", "schräg"),
 ("buecken", "bücken"),
 ("zurueck", "zurück"),
 ("Saetze", "Sätze"),
 ("laesst", "lässt"),
 ("prueft", "prüft"),
 ("aussen", "außen"),
 ("Naehe", "Nähe"),
 ("Fuss", "Fuß"),
]

# echte Woerter, die ae/oe/ue als Buchstabenfolge enthalten
OK_WORT = re.compile(r"^(zuerst|Zuschauer\w*|visuelle\w*|Auslosung|Auswechslung\w*|"
                     r"Ausruf\w*|Aufgabe\w*|aufgeb\w*|neue\w*|Neue\w*|aktuelle\w*|"
                     r"Spielgaenge)$")

def de(s):
    for a, b in UML:
        s = s.replace(a, b)
    return s

def frage(qid, _lvl, ch, scope, qde, qen, ade, aen, c, rde, ren, shot=None):
    o = {"id": qid, "ch": ch, "scope": scope}  # Pool ergibt sich aus ch
    if shot:
        o["shot"] = shot
    o["q"] = {"de": de(qde), "en": qen}
    o["a"] = {"de": [de(x) for x in ade], "en": aen}
    o["c"] = c
    o["ref"] = {"de": de(rde), "en": ren}
    o["origin"] = "ifa"
    o["tr"] = True
    return o

neu = []
for qid, shot, qde, qen, ade, aen, c, rde, ren in BILD:
    neu.append(frage(qid, "C", 11, "ifa", qde, qen, ade, aen, c, rde, ren, shot))
for qid, lvl, ch, scope, qde, qen, ade, aen, c, rde, ren in TEXT:
    neu.append(frage(qid, lvl, ch, scope, qde, qen, ade, aen, c, rde, ren))

# ---- Selbstkontrolle
fehler = []
UMLAUT = re.compile(r"[äöüÄÖÜß]")
REST = re.compile(r"(ae|oe|ue|Ae|Oe|Ue)")
SZ = re.compile(r"(ei|ie|au|eu|äu|ah|oh|uh|aa|ee|oo)ss", re.IGNORECASE)
# "aus" + s-Anlaut ist eine Wortfuge, kein langer Vokal: Aussage, ausschließlich
SZ_OK = re.compile(r"^[Aa]uss")
ids = set()
for q in neu:
    if q["id"] in ids:
        fehler.append("doppelte ID " + q["id"])
    ids.add(q["id"])
    if len(q["a"]["de"]) != 4 or len(q["a"]["en"]) != 4:
        fehler.append(q["id"] + ": nicht vier Antworten")
    if q["q"]["de"] == q["q"]["en"]:
        fehler.append(q["id"] + ": Fragetext identisch")
    for t in [q["q"]["en"], q["ref"]["en"]] + q["a"]["en"]:
        if UMLAUT.search(t):
            fehler.append(q["id"] + ": Umlaut im englischen Text -> " + t)
    for t in [q["q"]["de"], q["ref"]["de"]] + q["a"]["de"]:
        for w in re.findall(r"[\wäöüÄÖÜß]+", t):
            if REST.search(w) and not OK_WORT.match(w):
                fehler.append(q["id"] + ": nicht aufgeloest -> " + w)
            # nach langem Vokal oder Diphthong steht ss, nicht sz
            if SZ.search(w) and not SZ_OK.match(w):
                fehler.append(q["id"] + ": ss statt sz? -> " + w)

print("neue Fragen:", len(neu))
from collections import Counter
print("nach Kapitel:", dict(sorted(Counter(q["ch"] for q in neu).items())))
print("nach Stufe:  ", dict(Counter(q["lvl"] for q in neu)))
print("scope:       ", dict(Counter(q["scope"] for q in neu)))
print()
if fehler:
    print("PRUEFUNG:")
    for f in sorted(set(fehler)):
        print("  ", f)
else:
    print("PRUEFUNG: ohne Befund")

io.open('/sessions/affectionate-serene-volta/mnt/outputs/neue_fragen.json', 'w', encoding='utf-8').write(
    json.dumps(neu, ensure_ascii=False, indent=1))
