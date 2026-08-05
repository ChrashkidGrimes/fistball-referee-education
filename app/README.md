# IFA Schiedsrichter-Ausbildung – Web-App

Lernprogramm für die Ausbildung von Faustball-Schiedsrichtern in den Lizenzstufen **C, B und A**.
Statische Web-App ohne Server, Build-Schritt oder Abhängigkeiten. Läuft per Doppelklick auf `index.html`,
auf GitHub Pages, SharePoint oder jedem beliebigen Webspace.

**Quellen:** IFA-Spielregeln 2025 / IFA Rules of the Game 2025 (gültig ab 1. April 2025),
IFA-Schulungsmappe für Schiedsrichter 2025 / IFA Training Manual for Referees 2025,
Moodle-Fragenkataloge von Faustball Deutschland.
**Design:** nach `ifa_logo_datasheet.pdf` – Primärfarbe C100 M95 Y15 K20 = `#25276A`, Schwarz, Weiß.

---

## Starten

```
index.html im Browser öffnen
```

Fortschritt, Sprache und Einstellungen werden im `localStorage` des Browsers gespeichert – pro Gerät,
ohne Konto und ohne Server.

---

## Inhalt

| | |
|---|---|
| Kapitel | 16 (Regeln 1–10, Handzeichen, Verhalten, Linienrichter, Altersklassen, nationale Ordnungen, Aufgaben rund um das Spiel) |
| Regeltext-Blöcke | 90 nummerierte Regeln, wortgleich aus den offiziellen Ausgaben |
| Auslegungen | 51 Erläuterungen aus der Schulungsmappe |
| Handzeichen | 18 Zeichen mit 21 Fotos (16 aus der Schulungsmappe, 2 aus den Schulungsfolien) |
| Sprachen | Deutsch und Englisch, vollständig – 226 Inhaltsblöcke und 196 Fragen in beiden Sprachen |
| Prüfungsfragen | 196 zweisprachig: 121 aus dem Katalog von Faustball Deutschland, 69 aus Spielregeln und Schulungsmappe, 6 Bildfragen |

### Abschlussprüfungen

| Stufe | Fragen | Zusammensetzung | Bestanden | Nachprüfung ab |
|-------|--------|-----------------|-----------|----------------|
| C | 54 | 21 Grundmodul, 33 C | 70 % | 65 % |
| B | 36 | 22 B, 6 Grundmodul, 8 C | 80 % | 75 % |
| A | 34 | 22 A, 6 B, 2 Grundmodul, 4 C | 85 % | 75 % |

Die A-Prüfung zieht damit 65 % ihrer Fragen aus dem A-Pool.

Der C-Aufgabenpool umfasst Grundmodul und C zusammen (104 Fragen) und wird nach dem Größenverhältnis
seiner beiden Teile aufgeteilt (41 : 63). So enthält jede Prüfung Fragen aus beiden Teilen.
Wächst der Katalog, ist diese Aufteilung nachzuziehen.

Die Fragen werden bei jedem Versuch neu aus den Pools gezogen, **Reihenfolge und Antwortoptionen werden
gemischt**. Während der Prüfung gibt es kein Zwischenfeedback; die Auswertung mit Fundstellen erfolgt am
Ende. Kapitelquizzes geben dagegen sofortiges Feedback inklusive Regelverweis.

Verfügbar sind 196 Fragen: Grundmodul 41, C 63, B 34, A 58. Reicht ein Pool für seine Quote nicht aus –
etwa weil ein Verband die nationalen Fragen abschaltet –, füllen die
übrigen Pools auf, damit die Fragenzahl erhalten bleibt. Die Stufenseite weist darauf hin, weil sich der
Schwerpunkt dadurch verschiebt.

---

## Anpassen

### Prüfungsumfang und Bestehensgrenzen

`assets/js/app.js`, ganz oben:

```js
var LEVELS = {
  C: { pools: ["Q","C"], pass: 70, retake: 65, quizPass: 70,
       exam: { size: 54, quota: { Q: 21, C: 33 } } },

  B: { pools: ["B"],      pass: 80, retake: 75, quizPass: 80,
       exam: { size: 36, quota: { B: 22, Q: 6, C: 8 } } },

  A: { pools: ["A"],      pass: 85, retake: 75, quizPass: 85,
       exam: { size: 34, quota: { A: 22, B: 6, Q: 2, C: 4 } } }
};
```

- `exam.size` – Anzahl Fragen in der Prüfung
- `exam.quota` – Verteilung auf die Pools; die Summe muss `size` ergeben
- `pools` – Pools des Lernpfads, bestimmt die Kapitelquizzes (kumulativ)
- `quizPass` – Grenze, ab der ein Kapitelquiz als abgeschlossen gilt

Reicht ein Pool nicht aus – etwa weil die nationalen Fragen abgeschaltet sind – füllen die übrigen Pools
in der notierten Reihenfolge auf; die App weist auf der Stufenseite darauf hin. Bliebe die Prüfung dennoch
zu kurz, würde sie entsprechend kürzer. Mit der aktuellen Aufteilung tritt das nicht ein: auch ohne die
nationalen Fragen kommen alle drei Stufen auf ihre volle Fragenzahl.

### Videos einbinden

`assets/js/data-content.js`, pro Kapitel:

```json
"videos": [ { "yt": "q342pxvhdTU", "t": { "de": "Titel", "en": "Title" } } ],
"slots":  [ "Blocksituation aus Schiedsrichterperspektive" ]
```

`yt` ist die YouTube-Video-ID (der Teil hinter `watch?v=`). Einträge aus `slots` erscheinen in der App als
gestrichelter Platzhalter mit Themenbeschreibung – das sind die noch zu produzierenden Clips.

Aktuell eingebunden:

| Kapitel | Video |
|---------|-------|
| 1 Spielfeld und Geräte | This is Fistball – Rules (IFA Fistball Channel) |
| 4 Spielgang | Offizielle Spielregeln – Faustball / Official Rules – Fistball |
| 6 Angabe | Die Angabe (Heiner Josuttis) |

Offene Videoplätze: Kapitel 2, 3, 5, 7 (3 Clips), 9, 10, 11, 13.

### Sprachen

**Oberfläche:** `assets/js/i18n.js` enthält alle Bedientexte. Neue Sprache: Block `de` kopieren, Kürzel
ändern, Werte übersetzen – die Sprachumschaltung im Kopf erscheint automatisch. Fehlende Schlüssel fallen
auf Deutsch zurück.

**Lehrinhalte:** In `data-content.js` ist jedes Textfeld ein Sprachobjekt:

```json
{ "t": "rule", "n": "1.1", "x": { "de": "Das Spielfeld ist …", "en": "The court is …" } }
```

Für eine weitere Sprache genügt ein zusätzlicher Schlüssel im selben Objekt.

**Prüfungsfragen** tragen dieselbe Struktur, auch die Antwortlisten:

```json
{ "q": { "de": "…", "en": "…" },
  "a": { "de": ["…","…","…","…"], "en": ["…","…","…","…"] },
  "c": 0, "ref": { "de": "…", "en": "…" }, "tr": true }
```

`c` ist der Index der richtigen Antwort und gilt für beide Sprachen – die Antwortreihenfolge ist in
beiden Listen identisch.

**Herkunft der englischen Fassung.** 88 nummerierte Regeln und 45 Erläuterungen stammen wortgleich aus
den offiziellen englischen IFA-Ausgaben, zugeordnet über die Regelnummer. Alles Übrige ist eine
Arbeitsübersetzung und als solche gekennzeichnet:

| Was | Umfang | Kennzeichnung |
|-----|--------|---------------|
| Erläuterungen ohne englische Entsprechung | 6 | `tr: true`, Hinweis im Kapitel |
| Inhalte aus den Schulungsfoliensätzen | 47 | `origin: "ppt"`, eigener Hinweis im Kapitel |
| Prüfungsfragen | alle 196 | `tr: true`, Hinweis im Quiz |

Für die Fragen ist der deutsche Wortlaut maßgeblich; die App sagt das im englischen Modus dazu.

### Herkunft der Fragen

| `origin` | Anzahl | Woher |
|----------|--------|-------|
| `fbd` | 121 | Moodle-Fragenkataloge von Faustball Deutschland, unverändert übernommen |
| `ifa` | 69 | aus den Auslegungen der Schulungsmappe und bisher nicht abgefragtem Regeltext abgeleitet, fachlich freigegeben |
| `ppt` | 6 | Bildfragen zur Ausball-Entscheidung aus dem Foliensatz „01 Spielfeld und Geräte“, fachlich freigegeben |

Die 75 ergänzten Fragen verteilen sich auf 32 C-Niveau (Grundwissen, darunter die 6 Bildfragen) und
43 A-Niveau (Auslegung, Ermessen, Strafen). `Fragen-Nachweis.md` im übergeordneten Ordner hält fest,
auf welche Quellstelle sich jede stützt – als Nachweis, warum eine Antwort richtig ist.

**Neue Fragen zur Prüfung stellen.** Wer Fragen ergänzt, die noch nicht abgenommen sind, setzt
`"origin": "draft"`. Solche Fragen tragen im Quiz ein Kennzeichen, und unter **Einstellungen** erscheint
automatisch ein Schalter, mit dem sie sich abschalten lassen. Enthält der Katalog keine Entwürfe, ist der
Schalter ausgeblendet. Nach der Freigabe `origin` auf `ifa` setzen.

### Videofragen

`assets/js/data-clips.js` enthält Fragen, denen ein Videoausschnitt vorangestellt wird:

```js
clip: { yt: "VideoID", start: 128, end: 137 }
```

Solange `yt` leer ist, bleibt die Frage außerhalb des Fragenpools – unfertige Vorlagen stören
also nicht. Acht Vorlagen zu Block, Sprungangabe, Ball unter der Leine, Behinderung und
Schlagausführung sind angelegt und warten auf Video-ID und Sekunden. Im Video liefert ein
Rechtsklick → „Video-URL mit aktueller Zeit kopieren“ die Startsekunde direkt.

### Inhalte aus den Schulungsfoliensätzen

Aus den elf Foliensätzen von Faustball Deutschland (Verwendung im IFA-Kontext freigegeben)
sind 47 Blöcke übernommen. Sie tragen `"origin": "ppt"`. Eine offizielle englische Ausgabe
gibt es dafür nicht, die englische Fassung ist eine Arbeitsübersetzung – das Kapitel weist
im englischen Modus darauf hin.

Übernommen wurden:

| Wohin | Was |
|-------|-----|
| Kapitel 1 | Sechs Fotos „gut oder aus“ mit Urteil, Hallenfotos zu Wand und Decke, Spielfeld- und Auslaufdiagramme, Pfosten und Leine |
| Kapitel 5 | Tabelle der Schlagvarianten, acht Fälle erlaubt / nicht erlaubt |
| Kapitel 6 | Methodik der Angabenbeobachtung, Standort je Angabetyp, Wechselschrittangabe |
| Kapitel 7 | Standort beim Rückschlag, Blickfolge beim Block, „Klick und Klack“ |
| Kapitel 8 | Kontrolle des Anschreibers |
| Kapitel 9 | Zwei-Schiedsrichter-System in der Halle |
| Kapitel 11 | Zeichen 17 Übertritt ins Gegenfeld, Zeichen 18 Gleichstand, Warnhinweis zum Blockzeichen |
| Kapitel 13 | Kleidung der Linienrichter, Einweisung vor dem Spiel, Luftbild der Positionen |
| Kapitel 16 | Aufgaben vor, während und nach dem Spiel aus der Schiedsrichterordnung |

Die Bilddateien liegen in `assets/img/ppt/`; das Faustball-Deutschland-Branding der Folien
steckte nur im Folienrahmen und ist nicht mit übernommen.

### Bildfragen

Fragen mit einem Foto zur Spielsituation tragen das Feld `shot`:

```js
{ id: "IFA-BILD-001", shot: "ppt/ball-01", q: "…", a: [ … ], c: 0 }
```

`shot` ist ein Pfad unterhalb `assets/img/` ohne Endung. Die sechs Ausball-Entscheidungen
nutzen dieselben Fotos wie die Bilderserie in Kapitel 1 – dort mit Urteil, im Quiz ohne.

### Nationale Regelungen

27 Fragen stammen aus der deutschen Spielordnung (SpOF), Schiedsrichterordnung (SRO) und den
Wettkampfbestimmungen von Faustball Deutschland. Sie sind mit `"scope": "national"` markiert und über **Einstellungen →
Nationale Ordnungen einbeziehen** abschaltbar. Andere Mitgliedsverbände schalten sie ab oder ersetzen
Kapitel 15 durch ihre eigenen Ordnungen.

---

## Tests

```
cd tests
npm install
npm test
```

| Datei | Umfang |
|-------|--------|
| `app.test.js` | Navigation, Kapitelinhalte, Quiz- und Prüfungsablauf, Zertifikat, Abschaltung nationaler Fragen, Bildzuordnung der Handzeichen (40 Prüfungen) |
| `exam-thresholds.test.js` | Prüfungen je Lizenzstufe mit definierten Trefferquoten; verifiziert bestanden / Nachprüfung / nicht bestanden (18 Prüfungen) |
| `exam-composition.test.js` | Umfang und Pool-Verteilung der Prüfungen, Variation zwischen Versuchen, Verhalten bei zu kleinem Pool (29 Prüfungen) |
| `i18n.test.js` | Anzeige der deutsch-englischen Inhalte, Kennzeichnung der Foliensatz-Inhalte, sprachabhängige Diagramme (37 Prüfungen) |
| `bilingual.test.js` | Vollständigkeit beider Sprachen in Inhalten, Fragen und Oberfläche; sucht deutsche Reste im englischen DOM von Kapiteln, Quiz und Auswertung (24 Prüfungen) |
| `questions.test.js` | Herkunft und Fundstellen aller Fragen, Entwurfsmechanismus, Bild- und Videofragen (43 Prüfungen) |

### Bilder neu erzeugen

```
python3 tools/map_signals.py ../33d_IFA-Schulungsmappe-fur-Schiedsrichter-2025.pdf \
                             ../33_IFA-Training-Manual-for-Referees-2025.pdf
```

Die Reihenfolge der Bild-Objekte im PDF entspricht **nicht** der Lesereihenfolge – auf
Seite 27 steht das Bild zu Zeichen 14 an erster Stelle. Das Skript ordnet deshalb über
die vertikale Position zu: jedes Bild gehört zu der Zeichen-Überschrift, die ihm am
nächsten liegt. Es schreibt `assets/img/signals/manifest.json` mit der Herkunft jedes
Bildes (Seite und Index), und `app.test.js` prüft `data-content.js` dagegen.

Nur Zeichen 1 (zwei Phasen) und Zeichen 16 (drei Fahnenstellungen) sind mehrteilig,
alle übrigen haben genau ein Bild. Benötigt `pdfplumber`, `Pillow` und `pdfimages`.

### Beschriftete Diagramme

Vier Bilder tragen Text im Bild und liegen deshalb in beiden Sprachen vor – der
Spielfeldplan und die drei Linienrichter-Positionen. Beim Umschalten der Sprache
tauscht die App sie aus. In `data-content.js` ist das Feld `src` dafür ein Sprachobjekt:

```json
{ "t": "img", "src": { "de": "court", "en": "court-en" } }
```

Die Handzeichen sind reine Fotografien ohne Text und werden nicht doppelt vorgehalten.

> **Hinweis zur Quelle:** In der deutschen Schulungsmappe tragen die Diagramme 2 und 3
> bereits eine englische Legende (Player, Ball, 1st Referee …), nur Diagramm 1 ist
> deutsch beschriftet. Die App gibt das unverändert wieder. Für eine saubere deutsche
> Fassung müssten diese beiden Grafiken bei der IFA nachgefordert werden.

---

## Dateien

```
index.html                     Grundgerüst
assets/css/app.css             Design nach IFA-Vorgaben
assets/js/i18n.js              Oberflächentexte (DE, EN)
assets/js/data-content.js      Kapitel, Regeltexte, Auslegungen, Videos – zweisprachig (generiert)
assets/js/data-questions.js    196 Prüfungsfragen mit Lösungen                        (generiert)
assets/js/data-clips.js        Videofragen – Vorlage für Video-ID und Zeitmarken
assets/js/app.js               Anwendungslogik
assets/img/                    IFA-Logo, Diagramme, Handzeichen, Fotos aus den Foliensätzen
tests/                         automatisierte Tests
```

Die beiden generierten Dateien stammen aus den PDFs bzw. den Moodle-XML-Exporten im übergeordneten Ordner.

---

## Rechtliches

Logo und Bildmaterial: © International Fistball Association. Verwendung des Logos nur nach Absprache mit
der IFA (marketing@fistball.sport). Regeltexte © IFA, Kopien – auch Auszüge – erfordern die Genehmigung
der IFA. Das Zertifikat der App ist eine Lernbestätigung und ersetzt keine Lizenzerteilung durch einen
Mitgliedsverband.

### Generatoren

`assets/js/data-content.js` und `assets/js/data-questions.js` sind erzeugte Dateien. Die Skripte in
`tools/generate/` halten fest, wie sie entstanden sind – siehe `tools/generate/README.md`. Das ist vor
allem für die nächste Regelausgabe relevant: Ohne die Generatoren wären die Datendateien ein Artefakt,
das niemand mehr nachvollziehen oder neu erzeugen kann.
