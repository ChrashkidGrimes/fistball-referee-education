# IFA Schiedsrichter-Ausbildung – Web-App

*[English version: `README.md`](README.md)*

Lernprogramm für die Ausbildung von Faustball-Schiedsrichtern in den Stufen **Regional und National**.
Statische Web-App ohne Server und Build-Schritt; einziger Fremdcode ist eine kleine
QR-Code-Bibliothek, die im Repository liegt. Läuft per Doppelklick auf `index.html`,
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
| Kapitel | 16 (Regeln 1–10, Handzeichen, Verhalten, Linienrichter, Altersklassen, Verbandsordnungen, Aufgaben rund um das Spiel) |
| Regeltext-Blöcke | 90 nummerierte Regeln, wortgleich aus den offiziellen Ausgaben |
| Auslegungen | 51 Erläuterungen aus der Schulungsmappe |
| Handzeichen | 18 Zeichen mit 21 Fotos (16 aus der Schulungsmappe, 2 aus den Schulungsfolien), 13 davon als Bildfrage |
| Sprachen | Deutsch und Englisch, vollständig – 226 Inhaltsblöcke und 235 Fragen in beiden Sprachen |
| Prüfungsfragen | 235 zweisprachig: 121 aus dem Katalog von Faustball Deutschland, 108 aus Spielregeln und Schulungsmappe, 6 Bildfragen |

### Lizenzstufen

| Stufe | Fragen | Bestanden | Nachprüfung ab | Kapitelquiz |
|-------|--------|-----------|----------------|-------------|
| Regional (`R`) | 40 | 70 % | 65 % | 70 % |
| National (`N`) | 60 | 85 % | 75 % | 85 % |

Der **Lernpfad ist für beide Stufen gleich**: alle 16 Kapitel, dieselben Kapitelquizzes. Die Stufen
unterscheiden sich allein in Umfang und Grenze der Abschlussprüfung und in der Grenze, ab der ein
Kapitelquiz als erledigt gilt.

### Themenpools

Ein Pool ist ein **Themenbereich, kein Schwierigkeitsgrad**. Beide Prüfungen ziehen aus allen Pools;
der Pool sorgt nur dafür, dass jede Prüfung das Regelwerk gleichmäßig abdeckt. Welcher Pool eine Frage
trägt, ergibt sich aus ihrem Kapitel – neue Fragen sortieren sich damit von selbst ein.

| Pool | Kapitel | verfügbar | Regional | National |
|------|---------|-----------|----------|----------|
| `feld` – Spielfeld und Geräte | 1 | 45 | 7 | 10 |
| `rahmen` – Mannschaft, Zeit, Altersklassen | 2, 3, 14 | 40 | 7 | 10 |
| `spiel` – Spielgang, Schlag, Angabe | 4, 5, 6 | 32 | 8 | 12 |
| `ballfuehrung` – Rückschlag, Zuspiel, Wertung | 7, 8 | 28 | 7 | 10 |
| `leitung` – Spielleitung | 9–13, 16 | 63 | 7 | 12 |
| `verband` – Verbandsordnungen (abschaltbar) | 15 | 27 | 4 | 6 |
| | | **235** | **40** | **60** |

Die Quoten folgen bewusst **nicht** den Poolgrößen. Kapitel 1 stellt 19 % des Katalogs, aber nur 17 %
der Prüfung – es besteht überwiegend aus Maßen und Zahlen. Der Pool `leitung` trägt umgekehrt 20 % der
Nationalprüfung; dort steckt die Urteilsfähigkeit, die die höhere Lizenz rechtfertigt.

Die Fragen werden bei jedem Versuch neu gezogen, **Reihenfolge und Antwortoptionen werden gemischt**.
Während der Prüfung gibt es kein Zwischenfeedback; die Auswertung mit Fundstellen erfolgt am Ende.
Kapitelquizzes geben dagegen sofortiges Feedback inklusive Regelverweis.

Schaltet ein Verband die Verbandsordnungen ab, bleiben 206 Fragen. Die übrigen Pools füllen dann auf,
damit die Fragenzahl erhalten bleibt; die Stufenseite weist darauf hin, weil sich der Schwerpunkt
dadurch verschiebt.

---

## Anpassen

### Prüfungsumfang und Bestehensgrenzen

`assets/js/app.js`, ganz oben:

```js
var POOLS = {
  feld:         [1],
  rahmen:       [2, 3, 14],
  spiel:        [4, 5, 6],
  ballfuehrung: [7, 8],
  leitung:      [9, 10, 11, 12, 13, 16],
  verband:      [15]
};

var LEVELS = {
  R: { pass: 70, retake: 65, quizPass: 70,
       exam: { size: 40, quota: { feld: 7, rahmen: 7, spiel: 8,
                                  ballfuehrung: 7, leitung: 7, verband: 4 } } },

  N: { pass: 85, retake: 75, quizPass: 85,
       exam: { size: 60, quota: { feld: 10, rahmen: 10, spiel: 12,
                                  ballfuehrung: 10, leitung: 12, verband: 6 } } }
};
```

- `POOLS` – welche Kapitel welchen Themenpool bilden. Ein Kapitel gehört genau einem Pool an;
  Kapitel ohne Pool tauchen in keiner Prüfung auf.
- `exam.size` – Anzahl Fragen in der Prüfung
- `exam.quota` – Verteilung auf die Pools; die Summe muss `size` ergeben
- `quizPass` – Grenze, ab der ein Kapitelquiz als abgeschlossen gilt

Reicht ein Pool nicht aus – etwa weil die Verbandsordnungen abgeschaltet sind – füllen die übrigen Pools
in der notierten Reihenfolge auf; die App weist auf der Stufenseite darauf hin. Bliebe die Prüfung dennoch
zu kurz, würde sie entsprechend kürzer. Mit der aktuellen Aufteilung tritt das nicht ein: auch ohne die
Verbandsordnungen kommen beide Stufen auf ihre volle Fragenzahl.

Eine neue Stufe anzulegen heißt: Eintrag in `LEVELS`, Kürzel in `LEVEL_ORDER`, dazu die Schlüssel
`lvl<X>Name` und `lvl<X>desc` in `assets/js/i18n.js`.

### Prüfcode

`assets/js/cert-code.js` codiert den besten bestandenen Versuch als
`1|Stufe|Datum|Versuch|Name|Ergebnis|ID:Antwort,…`, UTF-8, base64url, dazu eine CRC32-Prüfsumme.
Das Zertifikat zeigt ihn als QR-Code auf `#verify=<Code>`; unter `file://` zeigt er auf die
veröffentlichte Adresse (`PUBLIC_URL` in `app.js`). Bei einer Prüfung mit 60 Fragen ist der Link
rund 1.200 Zeichen lang; der QR-Code wird etwa 5 cm breit gedruckt. Die Prüfseite decodiert, prüft
die Prüfsumme und rechnet das Ergebnis gegen den aktuellen Katalog nach. `decode` weist außerdem
Codes zurück, deren Felder nicht dem erwarteten Format entsprechen (Stufe R/N, ISO-Datum, numerischer
Versuch, Ergebnis höchstens 100, Einträge `ID:Index`), auch bei passender Prüfsumme. Ein Code mit gültiger Prüfsumme, der aus
keiner echten Prüfung stammen kann (Ergebnis unter der Grenze, falsche Fragenzahl, doppelte
Fragen), erscheint mit Warnung. Nach einem
nicht bestandenen Versuch ist die Prüfung 24 Stunden gesperrt (`EXAM_LOCK_MS`). Das Zurücksetzen des
Fortschritts, je Stufe oder „alle Daten“, löscht den Lernstand, behält aber Versuchszähler und
Sperre; sonst ließe sich die Wartezeit mit dem Knopf der App umgehen. QR-Codes erzeugt
`assets/js/vendor/qrcode.js` (qrcode-generator 1.4.4, MIT, Kazuhiko Arase).

### Fortschritt aus der dreistufigen Fassung

Bis August 2026 gab es die Stufen C, B und A. `LEVEL_MIGRATION` in `app.js` überführt gespeicherte
Stände beim ersten Start: C wird Regional, B und A werden auf National zusammengeführt – je Kapitel und
für die Prüfung zählt das bessere Ergebnis. Der umgestellte Stand wird sofort zurückgeschrieben, ein
zweiter Start rührt ihn nicht mehr an.

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

**Herkunft der englischen Fassung.** Alle nummerierten Regeln und 56 von 59 Erläuterungen stammen
wortgleich aus den offiziellen englischen IFA-Ausgaben. Alles Übrige ist eine Arbeitsübersetzung und
als solche gekennzeichnet:

| Was | Umfang | Kennzeichnung |
|-----|--------|---------------|
| Erläuterungen ohne englische Entsprechung | 2 | `tr: true`, Hinweis im Kapitel |
| Inhalte aus den Schulungsfoliensätzen | 47 | `origin: "ppt"`, eigener Hinweis im Kapitel |
| Prüfungsfragen | alle 235 | `tr: true`, Hinweis im Quiz |

Für die Fragen ist der deutsche Wortlaut maßgeblich; die App sagt das im englischen Modus dazu.

### Herkunft der Fragen

| `origin` | Anzahl | Woher |
|----------|--------|-------|
| `fbd` | 121 | Moodle-Fragenkataloge von Faustball Deutschland, unverändert übernommen |
| `ifa` | 108 | aus Regeltext, den Auslegungen der Schulungsmappe und der Schiedsrichterordnung abgeleitet, fachlich freigegeben |
| `ppt` | 6 | Bildfragen zur Ausball-Entscheidung aus dem Foliensatz „01 Spielfeld und Geräte“, fachlich freigegeben |

Von den 114 ergänzten Fragen prüfen 19 anhand eines Fotos, die übrigen als Text. `Fragen-Nachweis.md` und
`Fragen-Nachweis-Spielleitung.md` im übergeordneten Ordner halten fest, auf welche Quellstelle sich
jede stützt – als Nachweis, warum eine Antwort richtig ist.

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

### Verbandsordnungen

29 Fragen stammen aus der deutschen Spielordnung (SpOF), Schiedsrichterordnung (SRO) und den
Wettkampfbestimmungen von Faustball Deutschland. Sie sind mit `"scope": "fed"` markiert und über **Einstellungen →
Verbandsordnungen einbeziehen** abschaltbar. Andere Mitgliedsverbände schalten sie ab oder ersetzen
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
| `app.test.js` | Navigation, Kapitelinhalte, Quiz- und Prüfungsablauf, Zertifikat, Abschaltung der Verbandsordnungen, Bildzuordnung der Handzeichen, Migration des Fortschritts aus der dreistufigen Fassung (49 Prüfungen) |
| `cert.test.js` | Prüfcode (Codierung, Prüfsumme, Prüfung der Codefelder, Nachrechnen), Name vor der Prüfung, Versuchszähler und 24 Stunden Wartezeit, Nachprüfungsbereich zählt als nicht bestanden, Zurücksetzen behält Versuchszähler und Sperre, Zertifikat mit QR-Code, Prüfseite (96 Prüfungen) |
| `exam-thresholds.test.js` | Prüfungen je Lizenzstufe mit definierten Trefferquoten; verifiziert bestanden / Nachprüfung / nicht bestanden, einschließlich der Fälle genau auf der Grenze (16 Prüfungen) |
| `exam-composition.test.js` | Umfang und Pool-Verteilung der Prüfungen, Gewichtung, Variation zwischen Versuchen, Verhalten bei abgeschalteten Verbandsordnungen (25 Prüfungen) |
| `i18n.test.js` | Anzeige der deutsch-englischen Inhalte, Kennzeichnung der Foliensatz-Inhalte, sprachabhängige Diagramme (37 Prüfungen) |
| `bilingual.test.js` | Vollständigkeit beider Sprachen in Inhalten, Fragen und Oberfläche; sucht deutsche Reste im englischen DOM von Kapiteln, Quiz und Auswertung (25 Prüfungen) |
| `questions.test.js` | Herkunft und Fundstellen aller Fragen, Abdeckung aller 16 Kapitel, Entwurfsmechanismus, Bild- und Videofragen (73 Prüfungen) |
| `docs.test.js` | Hält die Kennzahlen in allen vier READMEs mit den Daten in Deckung: Fragenzahl, Poolgrößen, Herkunftstabelle, Stufengrenzen, Liste der Testdateien (81 Prüfungen) |
| `manual-abgleich.test.js` | Prüft jede englische Erläuterung gegen die offiziellen Ausgaben und dass kein Regeltext eine Erläuterung verschluckt hat – inhaltlich und über das Längenverhältnis zwischen Deutsch und Englisch. Ohne die PDFs im Ordner entfällt der Volltextteil (16 Prüfungen) |

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
assets/js/data-questions.js    235 Prüfungsfragen mit Lösungen                        (generiert)
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
der IFA. Das Zertifikat der App bescheinigt eine unbeaufsichtigt abgelegte Prüfung und ersetzt keine
Lizenzerteilung durch einen Mitgliedsverband.

### Generatoren

`assets/js/data-content.js` und `assets/js/data-questions.js` sind erzeugte Dateien. Die Skripte in
`tools/generate/` halten fest, wie sie entstanden sind – siehe `tools/generate/README.md`. Das ist vor
allem für die nächste Regelausgabe relevant: Ohne die Generatoren wären die Datendateien ein Artefakt,
das niemand mehr nachvollziehen oder neu erzeugen kann.
