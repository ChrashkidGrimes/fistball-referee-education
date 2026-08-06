# Generatoren

`assets/js/data-content.js` und `assets/js/data-questions.js` sind erzeugte Dateien.
Diese Skripte halten fest, wie sie entstanden sind – wichtig, sobald die IFA eine
neue Ausgabe der Spielregeln veröffentlicht.

| Skript | Was es tut |
|--------|------------|
| `merge.py` | Führt die deutschen und englischen Ausgaben zusammen. Regeln über die Regelnummer, Erläuterungen über die Ordinalposition innerhalb der Regelgruppe – benannte mit benannten, titellose mit titellosen. |
| `de_only_en.py` | Arbeitsübersetzungen für die sechs Erläuterungen, die in der englischen Ausgabe fehlen. |
| `ppt_content.py` | Alle aus den Schulungsfoliensätzen übernommenen Inhalte, zweisprachig. |
| `gen_content.py` | Baut daraus `data-content.js` – Kapitel, Bilder, Videoplätze, Handzeichen. |
| `tr_all.json` | Deutsch-englisches Wörterbuch der 806 eindeutigen Frage- und Antworttexte. |
| `tr_refs.json` | Übersetzte Fundstellen. |
| `../map_signals.py` | Extrahiert die Handzeichen-Fotos aus den PDFs und ordnet sie über die Position auf der Seite zu. |

## Ablauf

Die Skripte erwarten die Quelldokumente im übergeordneten Ordner und arbeiten mit
Zwischenständen (`chapters_de.json`, `chapters_en.json`, `merged_1_10.json`), die aus den
PDFs gewonnen werden. Sie sind als Nachweis und Ausgangspunkt gedacht, nicht als
Ein-Klick-Pipeline – für eine neue Regelausgabe ist die Extraktion aus den PDFs ohnehin
erneut zu prüfen.

Benötigt: `pdfplumber`, `Pillow`, `pdfimages` (poppler-utils), `python-pptx`, `markitdown`.

## Fragen zur Spielleitung (Kapitel 8, 11–13, 16)

`neue_fragen.py` enthält den Wortlaut der 39 Fragen, die am 6. August 2026 für die
bis dahin leeren Kapitel ergänzt wurden. `build_fragen.py` setzt daraus die deutschen
Umlaute, prüft auf unaufgelöste Transliterationen, doppelte Kennungen und Umlaute im
englischen Text und schreibt `fragen-spielleitung.json`. Diese Datei ist der Stand,
der in `assets/js/data-questions.js` eingepflegt ist – wer die Fragen ändert, ändert
sie hier und pflegt sie erneut ein.

```
cd app/tools/generate
python3 build_fragen.py          # schreibt fragen-spielleitung.json
python3 nachweis_spielleitung.py # schreibt Fragen-Nachweis-Spielleitung.md
```

Die erzeugte JSON wird anschließend in `assets/js/data-questions.js` eingepflegt;
beide Skripte laufen ohne Argumente aus ihrem eigenen Verzeichnis.

## Entfallen

`retier.py` stufte Entwurfsfragen nach Niveau ein und schrieb das Feld `lvl`.
Mit der Umstellung auf zwei Lizenzstufen am 6. August 2026 ist `lvl` ersatzlos
weggefallen: Der Themenpool einer Frage ergibt sich aus ihrem Kapitel (`ch`),
siehe `POOLS` in `assets/js/app.js`. Das Skript ist deshalb gelöscht.
