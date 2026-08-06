# Plan: Umstellung auf zwei Lizenzstufen

Stand 6. August 2026. Ersetzt die dreistufige Struktur C / B / A durch
**Regional** und **National**. Entschieden am 6. August 2026 mit Toby.

---

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Lernpfad | **Ein gemeinsamer Lernpfad**, alle 16 Kapitel für beide Stufen. Die Stufen unterscheiden sich allein in Umfang und Bestehensgrenze der Prüfung. |
| Fragenauswahl | Beide Prüfungen ziehen aus **allen** Pools. Keine Frage ist einer Stufe vorbehalten. |
| Gewichtung | **Rein thematische Quote.** Innerhalb eines Pools wird zufällig gezogen; keine Schwierigkeitseinstufung. |
| Bestehensgrenze National | **85 % bei 60 Fragen**, Nachprüfung ab 75 %. |

---

## Zielstruktur

### Stufen

| Stufe | Schlüssel | Fragen | Bestehen | Nachprüfung ab | Kapitelquiz |
|---|---|---|---|---|---|
| Regional | `R` | 40 | 70 % (28 richtig) | 65 % | 70 % |
| National | `N` | 60 | 85 % (51 richtig) | 75 % | 85 % |

### Pools

Pools werden von Schwierigkeitsstufen zu **Themenbereichen**. Das ist die Folge aus
„alle Fragen aus allen Pools": ein Pool kann nicht mehr steuern, wer welche Frage
sieht – er sichert nur noch, dass jede Prüfung das Regelwerk gleichmäßig abdeckt.

| Pool | Kapitel | verfügbar | Regional | National |
|---|---|---|---|---|
| `feld` – Spielfeld und Geräte | 1 | 45 | 7 | 10 |
| `rahmen` – Mannschaft, Zeit, Altersklassen | 2, 3, 14 | 40 | 7 | 10 |
| `spiel` – Spielgang, Schlag, Angabe | 4, 5, 6 | 32 | 8 | 12 |
| `ballfuehrung` – Rückschlag, Zuspiel, Wertung | 7, 8 | 28 | 7 | 10 |
| `leitung` – Spielrichter, Strafen, Handzeichen, Verhalten, Linienrichter, Aufgaben rund ums Spiel | 9–13, 16 | 63 | 7 | 12 |
| `verband` – Verbandsordnungen (abschaltbar) | 15 | 27 | 4 | 6 |
| | | **235** | **40** | **60** |

Die Quoten folgen bewusst **nicht** den Poolgrößen. Kapitel 1 stellt 19 % des
Katalogs, aber nur 17 % der Prüfung – es besteht überwiegend aus Maßen und Zahlen.
Der Pool `leitung` geht auf 20 % der Nationalprüfung hoch; dort steckt die
Urteilsfähigkeit, die die höhere Lizenz rechtfertigt.

Jeder Pool erfüllt seine Quote. Schaltet ein Verband die Verbandsordnungen ab,
bleiben 208 Fragen; die bestehende Auffüllmechanik hält die Fragenzahl konstant.

---

## Was die gewählte Grenze bedeutet

85 % bei 60 Fragen heißt: **9 Fehler erlaubt.** Für sich genommen ist das eine harte
Grenze, weil sie nah an der Streuung der Ziehung liegt – ein Kandidat, der den Stoff
zu 85 % beherrscht, besteht im ersten Anlauf nur in 59 % der Fälle.

Entscheidend ist, dass die Nachprüfungsgrenze das auffängt:

| tatsächliches Können | bestanden | Nachprüfung | durchgefallen | nach Nachprüfung |
|---|---|---|---|---|
| 70 % | 1 % | 24 % | 76 % | 1 % |
| 75 % | 5 % | 52 % | 43 % | 7 % |
| 80 % | 21 % | 66 % | 13 % | 35 % |
| 85 % | 59 % | 40 % | 1 % | **82 %** |
| 90 % | 93 % | 7 % | 0 % | 99 % |

Wer den Stoff beherrscht, fällt praktisch nie endgültig durch (1,4 %), muss aber in
vier von zehn Fällen nachprüfen. Wer bei 75 % steht, kommt auch über die Nachprüfung
nur in 7 % der Fälle durch. Die Stufe trennt also sauber – der Preis ist eine hohe
Nachprüfungsquote. Das ist vertretbar, sollte aber in der Kommunikation an die
Verbände stehen, damit eine Nachprüfung nicht als Makel gilt.

Die Regionalstufe bleibt bei 70 % / 65 %: ein 70-%-Könner besteht in 58 % der Fälle,
ein 60-%-Könner in 13 %.

---

## Voraussetzung: Lücke im Pool `leitung` schließen — erledigt

Der Fragenbestand hatte eine Lücke, die genau den Pool traf, der die neue Struktur
tragen soll. Am 6. August 2026 geschlossen:

| Kapitel | Thema | vorher | jetzt |
|---|---|---|---|
| 8 | Wertung | 2 | 4 |
| 11 | Handzeichen und Gestik | **0** | 15 |
| 12 | Aufgaben und Verhalten des Schiedsrichters | **0** | 7 |
| 13 | Linienrichter und Anschreiber | **0** | 9 |
| 16 | Aufgaben rund um das Spiel | **0** | 6 |

Der Pool `leitung` wächst damit von 26 auf 63 Fragen; die Nationalquote von 12
zieht knapp ein Fünftel davon. Dreizehn der neuen Fragen sind Bildfragen auf den
vorhandenen Handzeichen-Fotos.

Die 39 Fragen tragen `origin: "draft"` und stehen in
[`Pruefvorlage-Spielleitung.md`](Pruefvorlage-Spielleitung.md) zur Abnahme.

---

## Umsetzung

### 1. Datenmodell

- **`lvl` entfällt** an allen 196 Fragen. Der Pool ergibt sich aus `ch` über eine
  Zuordnungstabelle – kein Nachtaggen von 196 Datensätzen, und neue Fragen sind
  automatisch richtig einsortiert.
- **`scope` umbenennen.** `scope: "national"` markiert heute die 27 Fragen zu
  deutschen Ordnungen. Mit einer Lizenzstufe gleichen Namens ist der Begriff doppelt
  belegt. Neu: `scope: "fed"` (Verbandsordnung) gegenüber `scope: "ifa"`.
- Betroffen: `data-questions.js`, `data-clips.js`, die Generatoren unter
  `app/tools/generate/`.

### 2. `app.js`

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
var LEVEL_ORDER = ["R", "N"];
```

Das Feld `pools` je Stufe entfällt: der Lernpfad ist für beide Stufen gleich, die
Kapitelquizzes ziehen alle Fragen ihres Kapitels. Die Auffüllmechanik bei zu kleinen
Pools bleibt unverändert bestehen.

### 3. Fortschritt der Nutzer

Im `localStorage` liegen Stände unter `C` / `B` / `A`. Migration beim ersten Start
der neuen Fassung: `C` → `R`, `B` und `A` → `N` (der höhere Stand gewinnt).
Alternativ Versionsschlüssel hochziehen und zurücksetzen – sauberer, kostet aber
jeden bisherigen Fortschritt. **Empfehlung: migrieren**, der Aufwand ist gering.

### 4. Oberfläche und Texte

- `i18n.js`: `lvlCdesc` / `lvlBdesc` / `lvlAdesc` → `lvlRdesc` / `lvlNdesc`;
  `poolQ` / `poolC` / `poolB` / `poolA` → sechs Poolnamen; `levelLabel` von
  „{L}-Lizenz" auf den ausgeschriebenen Stufennamen. Alles in DE und EN.
- Englische Stufennamen: *Regional Referee* / *National Referee*.
- `setNat` → „Verbandsordnungen einbeziehen", Beschreibung entsprechend.
- Zertifikat: Stufenbezeichnung statt Buchstabe.
- README, `app/README.md` und `OFFENE-PUNKTE.md` nachziehen.

### 5. Tests

- `exam-thresholds.test.js`: Grenzen 70/65 und 85/75, Simulationen neu.
- `exam-composition.test.js`: sechs Themenpools, Quotensummen 40 und 60,
  Auffüllverhalten mit abgeschalteten Verbandsordnungen.
- `questions.test.js`: Poolzählungen über `ch` statt `lvl`; Prüfung, dass jedes
  Kapitel 1–16 mindestens eine Frage hat (fängt die heutige Lücke künftig ab).
- `i18n.js` / `bilingual.test.js`: neue Schlüssel.
- Neu: Test, dass jeder Pool die Nationalquote aus eigener Kraft erfüllt.

---

## Reihenfolge

1. ~~**Fragen für Kapitel 11–13 schreiben**, dazu Kapitel 8 und 16 auffüllen.~~
   Erledigt am 6. August 2026: 39 Fragen, Nachweis in `Pruefvorlage-Spielleitung.md`.
2. **Fragen von Toby abnehmen lassen.** ← hier stehen wir
3. Datenmodell umstellen: `lvl` raus, Pool aus `ch`, `scope` umbenennen.
4. `app.js` auf zwei Stufen umbauen, Fortschrittsmigration ergänzen.
5. Oberfläche und Texte, DE und EN.
6. Tests neu fassen, vollständig grün.
7. Im Browser gegenprüfen: beide Stufen, beide Sprachen, Desktop, Mobil, Druck.
8. Dokumentation nachziehen, committen.

Die Schritte 3 bis 6 sind mechanisch.

---

## Offene Folgefrage

Mit 60 Fragen aus 196 zieht die Nationalprüfung 31 % des Katalogs pro Versuch, und
die Auswertung zeigt anschließend jede richtige Antwort mit Fundstelle. Nach zwei bis
drei Versuchen kennt ein Kandidat den größten Teil des Bestands. Das verschärft die
Grundsatzfrage aus `OFFENE-PUNKTE.md`, Abschnitt B: soll die Prüfung zählen, und wenn
ja, muss die Auswertung dann ohne Lösungen auskommen.
