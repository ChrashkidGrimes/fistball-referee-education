# Prüfbarer Nachweis der Abschlussprüfung

Stand: 25. Oktober 2026 · Bezug: `OFFENE-PUNKTE.md`, „Weg 2 – Prüfung soll zählen“

## Ziel

Das Zertifikat gilt als Nachweis einer **bestandenen Abschlussprüfung**, nicht als
bloße Teilnahmebestätigung. Ein Mitgliedsverband soll ein vorgelegtes Zertifikat auf
Echtheit prüfen können – ohne Server, ohne Konten, ohne dass Daten das Gerät verlassen.

**Was erreicht wird:** Ein im PDF bearbeitetes oder frei erfundenes Zertifikat fällt
bei der Prüfung auf; der Verband sieht, welche Fragen gestellt und wie sie beantwortet
wurden, an welchem Tag und im wievielten Versuch.

**Was bewusst nicht erreicht wird:** Die Prüfung bleibt unbeaufsichtigt. Nachschlagen
oder fremde Hilfe verhindert kein Verfahren ohne Aufsicht. Wer den Quellcode liest,
kann einen gültigen Code nachbauen – das ist aufwendig, aber möglich. Die Prüfsumme
ist kein Geheimnis.

## 1. Prüfungsablauf

- **Name vor dem Start.** Vor Beginn der Abschlussprüfung wird der Name eingegeben;
  ohne Namen startet sie nicht. Der Name gehört zum Prüfcode und lässt sich auf dem
  Zertifikat danach nicht mehr ändern. Er ist mit der Stufe gespeichert und für den
  nächsten Versuch vorbelegt.
- **Auswertung unverändert mit Lösungen.** Nach der Prüfung werden wie bisher jede
  Antwort, die richtige Lösung und die Fundstelle angezeigt – das dient dem Lernen.
  (Der Punkt „Auswertung ohne Lösungen“ aus Weg 2 ist damit bewusst abgewählt.)
- **Wartezeit 2 Stunden** (bis 30. Oktober 2026: 24 Stunden) nach einem nicht bestandenen Versuch. Bis dahin ist der
  Startknopf gesperrt, angezeigt wird Datum und Uhrzeit der Freigabe. Nach einem
  bestandenen Versuch gibt es keine Sperre. Die Sperre liegt im `localStorage` und ist
  damit umgehbar; die Versuchsnummer im Prüfcode macht viele Versuche trotzdem sichtbar.
- **Versuchszähler** je Stufe, erhöht beim Start jeder Prüfung. Der Start setzt auch
  die Sperre, erst das Bestehen hebt sie auf – Abbrechen oder Schließen des Browsers
  zählt damit als nicht bestandener Versuch (Nachtrag 30. Oktober 2026).
- **Gespeicherter Versuch.** Für den besten bestandenen Versuch werden Frage-IDs,
  gewählte Antworten (Index in der Originalreihenfolge der Frage, nicht der gemischten
  Anzeige), Ergebnis, Datum, Versuchsnummer und Name abgelegt. Ein späterer bestandener
  Versuch ersetzt ihn nur bei höherem Ergebnis.

## 2. Prüfcode

Klartext vor der Codierung, Felder durch `|` getrennt:

```
1|N|2026-10-25|3|Erika Mustermann|88.3|IFA-A-004:2,QA-2022-021:0,…
```

| Feld | Inhalt |
|------|--------|
| 1 | Formatversion (`1`) |
| 2 | Stufe (`R` oder `N`) |
| 3 | Datum ISO 8601, unabhängig von der Sprache; angezeigt wird es weiter im Format der gewählten Sprache |
| 4 | Versuchsnummer |
| 5 | Name; `|` und `,` werden beim Eintippen entfernt |
| 6 | Ergebnis in Prozent, eine Nachkommastelle |
| 7 | Fragen als `ID:Antwortindex`, durch Komma getrennt |

Der Klartext wird als UTF-8 base64url-codiert; angehängt wird `.` und die CRC32 des
Klartexts in 8 Hex-Zeichen. Länge bei 60 Fragen etwa 1000 Zeichen. Die **Zertifikats-
nummer** sind die 8 Hex-Zeichen der Prüfsumme, in Vierergruppen (`3F2A-91C0`).

Codieren, Decodieren und Nachrechnen liegen als reine Funktionen in einer eigenen Datei
`assets/js/cert-code.js` (ohne DOM-Zugriff, `window.IFA_CERT`), damit sie einzeln
testbar sind.

## 3. Zertifikat

- Titel „Zertifikat“ / „Certificate“. Text: „… hat die Abschlussprüfung der Stufe
  {Stufe} mit {pct} % ({c} von {n} Fragen) bestanden.“
- Zertifikatsnummer, Datum, Stufe, Versuch.
- **QR-Code** auf `https://chrashkidgrimes.github.io/fistball-referee-education/#verify=<Code>`,
  darunter klein die Adresse der Prüfseite und die Zertifikatsnummer. Die Basis-URL steht
  als Konstante in `app.js`; läuft die App unter einer anderen Adresse (nicht `file://`),
  wird die eigene Adresse genommen.
- Hinweis: „Unbeaufsichtigt abgelegt. Echtheit prüfbar über den QR-Code. Ersetzt nicht
  die Lizenzerteilung durch den zuständigen Mitgliedsverband.“
- Das Namensfeld auf der Zertifikatsseite entfällt.
- **Bestand ohne gespeicherten Versuch** (vor dieser Änderung bestanden): Zertifikat
  ohne QR-Code und Nummer, mit dem Hinweis, dass für einen prüfbaren Nachweis die
  Prüfung neu abzulegen ist. Kein Fortschritt geht verloren.
- QR-Erzeugung mit `qrcode-generator` (Kazuhiko Arase, MIT), lokal unter
  `assets/js/vendor/qrcode.js`, Lizenzhinweis im Dateikopf. Kein CDN – die App läuft
  weiter offline und per `file://`. Fehlerkorrektur Stufe L, Ausgabe als SVG.

## 4. Prüfseite „Zertifikat prüfen“

- Aufruf über `#verify=<Code>` beim Laden der Seite oder über ein Eingabefeld, das
  von der Startseite (Link unter der Stufenauswahl) und den Einstellungen erreichbar ist.
- **Prüfsumme falsch oder Code nicht lesbar:** „Code ungültig oder verändert“, keine
  weiteren Angaben.
- **Prüfsumme richtig:** Name, Stufe, Datum, Versuch, Zertifikatsnummer; Ergebnis laut
  Code und nachgerechnetes Ergebnis gegen den aktuellen Katalog; Bestehensgrenze der
  Stufe; Liste aller Fragen mit gewählter und richtiger Antwort.
- **Abweichungen:** Unbekannte Frage-IDs werden markiert und nicht gewertet. Weicht
  das nachgerechnete Ergebnis ab, erscheint der Hinweis, dass der Fragenkatalog seit
  der Prüfung geändert wurde; maßgeblich bleibt das Ergebnis laut Code.
- Die Seite ist zweisprachig wie die übrige App und ändert keinen Lernfortschritt.

## 5. Tests

Neue Datei `tests/cert.test.js`, eingehängt in `npm test`, Stil wie die bestehenden
jsdom-Tests:

- Codieren → Decodieren ergibt dieselben Werte, auch mit Umlauten im Namen.
- Geänderte Prozentzahl, geänderter Name, vertauschte Antwort → Prüfsumme ungültig.
- Nachrechnen ergibt das gespeicherte Ergebnis; unbekannte ID wird markiert.
- Ohne Namen startet keine Prüfung.
- Nach nicht bestandenem Versuch ist der Start 2 Stunden gesperrt, danach frei;
  nach bestandenem Versuch keine Sperre.
- Versuchszähler steigt; nur ein besserer bestandener Versuch ersetzt den gespeicherten.
- Zertifikat zeigt QR-Code und Nummer; alter Fortschritt ohne Versuch zeigt den
  Hinweis statt Code.
- `#verify=` öffnet die Prüfseite mit korrektem Ergebnis.

Bestehende Tests zum Zertifikat (`app.test.js`) werden an den neuen Text und das
entfallene Namensfeld angepasst.

## 6. Dokumentation

- `OFFENE-PUNKTE.md`: Weg-1-Punkt „Zertifikat als Durcharbeitungsnachweis“ als
  verworfen markieren; in Weg 2 „Auswertung ohne Lösungen“ als bewusst abgewählt,
  „Wartezeit“ als erledigt, „serverseitige Ablage“ ersetzt durch Prüfcode mit den
  oben genannten Grenzen.
- `README.md`, `README.de.md`, `app/README.md`, `app/README.de.md`: Prüfcode und
  Prüfseite beschreiben, Satz zu „keine Abhängigkeiten“ um die eingebundene
  QR-Bibliothek ergänzen, Abschnitt „Rechtliches“ an den neuen Zertifikatstext anpassen.
