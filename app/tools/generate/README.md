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
| `retier.py` | Stuft Entwurfsfragen nach Niveau ein (C oder A). |
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
python3 build_fragen.py
```
