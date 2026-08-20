# Fistball Referee Education

*[English version: `README.md`](README.md)*

Lernprogramm für die Ausbildung von Faustball-Schiedsrichtern in den Stufen **Regional und National**,
zweisprachig deutsch und englisch. Gedacht für Mitgliedsverbände der International Fistball
Association, die ihre Schiedsrichter selbst ausbilden.

**→ [`app/`](app/) enthält die Anwendung, [`app/README.de.md`](app/README.de.md) die technische Dokumentation.**

---

## Was das ist

Eine statische Web-App ohne Server, Build-Schritt oder Abhängigkeiten. `app/index.html` im Browser
öffnen genügt – lokal per Doppelklick, auf GitHub Pages oder auf beliebigem Webspace. Der Lernfortschritt
liegt im `localStorage` des Browsers, es gibt keine Konten und keine Datenübertragung.

| | |
|---|---|
| Kapitel | 16 – Regeln 1 bis 10, Handzeichen, Verhalten des Schiedsrichters, Linienrichter, Altersklassen, Verbandsordnungen, Aufgaben rund um das Spiel |
| Prüfungsfragen | 235, alle zweisprachig, mit Fundstelle im Regelwerk |
| Bilder | 21 Handzeichen-Fotos, Spielfeld- und Auslaufdiagramme, sechs Ausball-Entscheidungen; 19 davon als Bildfrage |
| Abschlussprüfungen | Regional 40 Fragen ab 70 %, National 60 ab 85 %, jeweils mit Nachprüfungsgrenze |
| Tests | 319 automatisierte Prüfungen |

## Quellen

- IFA-Spielregeln 2025 / IFA Rules of the Game 2025, gültig ab 1. April 2025
- IFA-Schulungsmappe für Schiedsrichter 2025 / IFA Training Manual for Referees 2025
- Schulungsfoliensätze von Faustball Deutschland, Verwendung im IFA-Kontext freigegeben
- Moodle-Fragenkataloge von Faustball Deutschland

Die Quelldokumente selbst liegen **nicht** im Repository. Die Spielregeln verlangen für Kopien – auch
auszugsweise – die Genehmigung der IFA, und die Foliensätze und Fragenkataloge gehören
Faustball Deutschland. Wer die Datendateien neu erzeugen will, legt die Dokumente in diesen Ordner; welche
Dateien erwartet werden, steht in [`app/tools/generate/README.md`](app/tools/generate/README.md).

Die App selbst enthält Regeltexte, Fotos und Diagramme aus diesen Dokumenten. Für eine Verbreitung über
den internen Gebrauch hinaus ist die Freigabe der IFA einzuholen – siehe die offenen Punkte.

## Was noch offen ist

[`OFFENE-PUNKTE.md`](OFFENE-PUNKTE.md) führt den Stand. Die drei größten:

1. **Soll die Prüfung zählen?** Die Bestehensgrenzen stammen aus einer beaufsichtigten Einzelprüfung.
   In einer Selbstbedienungs-App zeigt die Auswertung alle Lösungen, und das Ergebnis liegt manipulierbar
   im Browser. Davon hängt ab, ob die App ausbildet oder prüft.
2. **Englische Fassung abnehmen.** Regeltexte und die meisten Erläuterungen stammen wortgleich aus den
   offiziellen englischen Ausgaben. Die Prüfungsfragen und die Inhalte aus den Foliensätzen sind
   Arbeitsübersetzungen, im Datensatz markiert und in der App gekennzeichnet.
3. **Trägerschaft und Freigaben.** Logo, Regeltexte und Fragenkatalog gehören IFA und Faustball Deutschland. Ob das ein
   IFA-Produkt wird oder ein Export von Faustball Deutschland, bestimmt auch, wer es nach der nächsten Regeländerung pflegt.

## Nachweise

- [`Fragen-Nachweis.md`](Fragen-Nachweis.md) – für jede der 75 zuerst ergänzten Fragen die Quellstelle,
  auf die sich die Antwort stützt, deutsch und englisch.
- [`Fragen-Nachweis-Spielleitung.md`](Fragen-Nachweis-Spielleitung.md) – dasselbe für die 39 Fragen zu
  Handzeichen, Verhalten, Linienrichtern und den Aufgaben rund um das Spiel.
- [`app/assets/img/signals/manifest.json`](app/assets/img/signals/manifest.json) – Herkunft jedes
  Handzeichen-Fotos nach Seite und Position im Ausgangsdokument.

## Rechtliches

Logo und Bildmaterial © International Fistball Association. Verwendung des Logos nur nach Absprache mit
der IFA (marketing@fistball.sport). Regeltexte © IFA, Kopien – auch Auszüge – erfordern die Genehmigung
der IFA. Das Zertifikat der App ist eine Lernbestätigung und ersetzt keine Lizenzerteilung durch einen
Mitgliedsverband.
