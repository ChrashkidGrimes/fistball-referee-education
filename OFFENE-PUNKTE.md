# Offene Punkte – Schiedsrichter-Lernapp

Stand 6. August 2026, zuletzt aktualisiert nach der Freigabe der ergänzten Fragen.
Sortiert nach Dringlichkeit: A ist zu prüfen, bevor jemand damit lernt. B ist die
Grundsatzentscheidung, an der die halbe Konzeption hängt.

---

## A – Vor dem ersten Einsatz prüfen

- [x] ~~**App im Browser ansehen.**~~ Erledigt am 1. August 2026 mit Chromium 151,
      Desktop (1180 px), Mobil (390 px) und Druckansicht. Fünf Darstellungsfehler
      gefunden und behoben: unlesbarer Antworttext nach dem Prüfen, rechts
      abgeschnittene Altersklassen-Tabelle, `[object Object]` in den Videoplatzhaltern,
      falsches Stufen-Label „C- Licence“, überlaufender Kopf auf dem Handy.
      Keine Konsolenfehler. Screenshots liegen nicht im Projekt.

- [x] ~~**Bildfragen und Bilderserie gegenlesen.**~~ Von Toby geprüft am 5. August 2026.
      Zwei Beschreibungen waren falsch: Bild 1 zeigt den Ball vollständig im Feld ohne
      Linienkontakt, Bild 2 den Ball auf der Linie. Alle sechs Unterschriften wurden
      daraufhin neu gefasst.
      Folgefehler, der dabei mit aufgefallen ist: Die sechs Bildfragen hatten identische
      Antwortmöglichkeiten mit der Lösung „Gutball – der Ball berührt die Linie“. Für
      Bild 1 war das die falsche Begründung. Die Fragen haben jetzt fallbezogene
      Antworten und Fundstellen.

- [x] ~~**Zuordnung der Erläuterungen DE/EN prüfen.**~~ Erledigt am 5. August 2026 –
      und es steckte tatsächlich ein Fehler drin: In Kapitel 10 hatte die deutsche
      Ausgabe einen zusätzlichen titellosen Absatz, wodurch „Erläuterung Karten“ mit
      dem falschen englischen Text gepaart war. Aufgefallen ist es über eine leere
      Überschrift.
      Die Paarung erfolgt jetzt nur noch gleichartig: benannte Erläuterungen mit
      benannten, titellose Fortsetzungsabsätze mit titellosen. Kapitel 2, 7 und 10
      wurden Absatz für Absatz gegengelesen.

- [x] ~~**Handzeichen-Fotos prüfen.**~~ Korrigiert am 1. August 2026 nach zwei Hinweisen
      von Toby. Zwei Fehler, beide aus derselben falschen Annahme:
      1. Zeichen 9 (Auswechslung) hatte zwei Bilder bekommen, Zeichen 14 (Behinderung)
         keines – dadurch waren 10 bis 14 um eins verschoben.
      2. Auf Seite 27 entspricht die Reihenfolge der Bild-Objekte im PDF nicht der
         Lesereihenfolge: das Bild zu Zeichen 14 steht dort an erster Stelle.

      Die Zuordnung wird jetzt nicht mehr geraten, sondern von
      `app/tools/map_signals.py` über die vertikale Position auf der Seite hergeleitet
      und in `assets/img/signals/manifest.json` festgehalten. Beide Ausgaben liefern
      unabhängig dieselbe Anzahl Bilder je Zeichen. `app.test.js` prüft die Daten gegen
      das Manifest. Alle 16 Zeichen im Browser sichtgeprüft.

- [x] ~~**Zuschnitt der C-Stufe bestätigen.**~~ Von Toby bestätigt am 1. August 2026:
      Grundmodul Q und C-Lizenz bilden eine gemeinsame Stufe. Die App setzt das bereits
      so um, es war keine Änderung nötig. Prüfungsumfang festgelegt auf 54 / 36 / 34.

- [x] ~~**Kumulative Kapitelquizzes bestätigen.**~~ Von Toby bestätigt am 5. August 2026:
      Auf den Stufen B und A enthalten die Kapitelquizzes zusätzlich die Fragen der
      niedrigeren Stufen, die Abschlussprüfungen folgen dagegen der festgelegten Quote.
      Bleibt so.

---

## B – Grundsatzentscheidung: soll die Prüfung zählen?

Daran hängt der Rest.

| Stufe | Prüfung | Bestehensgrenze | erlaubte Fehler | gezogen aus |
|-------|---------|-----------------|-----------------|-------------|
| C | 54 | 70 % | 16 | 104 Fragen |
| B | 36 | 80 % | 7 | 138 Fragen |
| A | 34 | 85 % | 5 | 196 Fragen |

**Teilweise entschärft:** Seit der Festlegung von 54 / 36 / 34 wird nicht mehr der
gesamte Pool abgefragt, und die Prüfungen variieren zwischen zwei Versuchen.

**Weiter entschärft:** Der A-Pool ist von 15 auf 58 Fragen gewachsen, die A-Prüfung
zieht 22 davon – das stufenspezifische Material ist nach einem Versuch nicht mehr
erschöpft. Die ergänzten Fragen sind seit dem 6. August freigegeben.

**Nicht entschärft:** Die Auswertung zeigt nach der Prüfung jede richtige Antwort mit
Fundstelle. Und das Ergebnis liegt im `localStorage`, lässt sich also in der
Browserkonsole setzen.

Die Prozentgrenzen 70/65, 80/75, 85/75 stammen aus einer beaufsichtigten Einzelprüfung.
In eine Selbstbedienungs-App übernommen, übertragen sie die Form, nicht die Wirkung.

**Weg 1 – Ausbildung, Prüfung bleibt beim Verband**
- [ ] Bestehenslogik im Lernmodus zurücknehmen, Kapitelquizzes ohne Grenzwert
- [ ] Zertifikat klar als Durcharbeitungsnachweis, nicht als Prüfungsergebnis

**Weg 2 – Prüfung soll zählen**
- [x] ~~Fragenkatalog erweitern, vor allem Pool A~~ – 75 Fragen ergänzt und freigegeben,
      Pool A von 15 auf 58, Pool C von 31 auf 63.
- [x] ~~Prüfungsumfang auf eine Teilmenge des Pools begrenzen~~ – erledigt (54 / 36 / 34)
- [ ] Auswertung ohne Lösungen – nur Punktzahl und schwache Kapitel
- [ ] Wartezeit zwischen Prüfungsversuchen
- [ ] Serverseitige Ablage der Ergebnisse, sonst bleibt es manipulierbar

**Weg 3 – Server mit Verbands-Login**
- [ ] Löst Manipulation und zentrale Auswertung, kostet laufenden Betrieb.
      War bewusst abgewählt; erneut zu bewerten, falls Weg 2 gewählt wird.

---

## C – Inhalte ergänzen

- [x] ~~**75 Entwurfsfragen fachlich prüfen.**~~ Von Toby freigegeben am 6. August 2026.
      Die Kennzeichnung `origin: "draft"` ist entfallen; die Fragen tragen jetzt
      `ifa` (69) beziehungsweise `ppt` (6 Bildfragen), damit die Herkunft
      nachvollziehbar bleibt. Der Entwurfsschalter in den Einstellungen blendet sich
      aus, solange keine Entwürfe im Katalog sind, und erscheint automatisch wieder,
      sobald welche dazukommen. `Fragen-Nachweis.md` hält weiterhin fest, auf welche
      Quellstelle sich jede Frage stützt.

- [ ] **36 neue Entwurfsfragen zur Spielleitung abnehmen.** Erstellt am 6. August 2026
      für die Kapitel 8, 11, 12, 13 und 16, die bis dahin fast keine Fragen hatten.
      Darunter zehn Bildfragen auf den vorhandenen Handzeichen-Fotos. Sie tragen
      `origin: "draft"` und sind über die Einstellungen abschaltbar.
      Vorlage: `Pruefvorlage-Spielleitung.md`. Zwei Punkte darin brauchen eine
      Entscheidung: die Reichweite der Kapitel-16-Fragen (deutsche
      Schiedsrichterordnung oder international) und die Frage, ob alle sechs
      auf `national` gehören.

- [ ] **Foto und Beschreibung zu Handzeichen 9 klären.** Das Bild zum Zeichen
      „Auswechslung“ zeigt die kreisenden Hände auf Brusthöhe, die Schulungsmappe
      beschreibt sie „über dem Kopf“. Solange das auseinandergeht, gibt es dazu
      bewusst keine Bildfrage. Ebenso unbrauchbar für Bildfragen: die Zeichen 3
      (Netz) und 4 (Übertritt), die auf den Fotos kaum zu unterscheiden sind.
      Ein Punkt für die Rückmeldung an die IFA.

- [ ] **Zeitmarken für die acht Videofragen eintragen.** `app/assets/js/data-clips.js`
      enthält fertige Fragen zu Block, Sprungangabe, Ball unter der Leine, Behinderung
      und Schlagausführung – es fehlen nur Video-ID sowie Start- und Endsekunde.
      Solange die ID leer ist, bleibt die Frage außerhalb des Fragenpools.
      Quelle wären Vollspiele auf dem IFA-Kanal; Rechtsklick auf das Video liefert
      „Video-URL mit aktueller Zeit kopieren“.

- [ ] **Zehn offene Videoplätze füllen.** Kapitel 2, 3, 5, 7 (drei Clips), 9, 10, 11, 13.
      Erster Ort zum Nachsehen: die Playlist *Fistball Technique – Training Snacks* auf
      dem IFA-Kanal (13 Videos), die ohne Browser-Erweiterung nicht auslesbar war.
      Eintragen als YouTube-ID im Feld `videos` in `data-content.js`.
      Besonders wertvoll wären Block, Zuspiel und die Handzeichen in Bewegung – das ist
      genau der Teil, den Multiple Choice nicht abdeckt.

- [ ] **Englische Fassung der Prüfungsfragen fachlich abnehmen.** Alle 196 Fragen sind
      übersetzt, aber es gibt keine offizielle englische Fassung des Katalogs – die
      Übersetzung ist eine Arbeitsfassung, im Datensatz mit `tr: true` markiert und im
      Quiz mit einem Hinweis versehen. Maßgeblich bleibt der deutsche Wortlaut. Vor
      einem verbindlichen Einsatz auf Englisch sollte jemand mit Fachenglisch sie
      gegenlesen, insbesondere die Begriffe Gutball/point, Angabe/service,
      Übertritt/foot fault, Zuspiel/set.

- [ ] **Deutsche Legende für die Linienrichter-Diagramme 2 und 3 nachfordern.**
      In der deutschen Schulungsmappe tragen diese beiden Grafiken bereits eine
      englische Legende (Player, Ball, 1st Referee, Eye contact with referees …).
      Nur Diagramm 1 ist deutsch beschriftet. Die App zeigt die Quelle unverändert;
      deutschsprachige Lernende sehen dort also englische Begriffe.
      Ein Fehler im Ausgangsdokument, kein Fehler der App – zu klären mit der IFA.

- [ ] **Sechs Erläuterungen ohne englische Entsprechung abnehmen.** Fünf in Kapitel 2
      (Spielbericht, Armbinde, Kleidungsvorschriften), eine in Kapitel 10 (allgemeine
      Orientierung bei Strafen). Die englische Ausgabe ist dort kürzer; die englische
      Fassung stammt von mir und ist mit `tr: true` markiert. Falls die IFA das
      Training Manual ergänzt, sollten diese Stellen ersetzt werden.

- [x] ~~**Inhalte aus den Schulungsfoliensätzen ins Englische bringen.**~~ Erledigt –
      alle 47 Blöcke übersetzt. Da es dafür keine offizielle englische Ausgabe gibt,
      ist auch das eine Arbeitsübersetzung; die Blöcke tragen `origin: "ppt"` und das
      Kapitel weist im englischen Modus darauf hin.

- [ ] **Weitere Sprachen?** Spanisch und Portugiesisch wären für die tatsächlichen
      Wachstumsregionen wahrscheinlich wertvoller als weitere europäische Sprachen.
      Voraussetzung ist eine von der IFA freigegebene Regelübersetzung – ohne die
      gäbe es nur eine inoffizielle Fassung.

---

## D – Organisation und Rechte

- [ ] **Pflege über Regeländerungen hinweg klären.** Die Texte sind auf die Ausgabe 2025
      eingefroren. Wenn mehrere Verbände sich je eine Kopie mit eigenem Kapitel 15 und
      eigener Übersetzung ziehen, ist die Fassung 2027 nicht mehr einspielbar.
      Jetzt entscheiden: nationale Ergänzungen in eine separate Datei auslagern, die ein
      Update der Regeltexte überlebt.

- [ ] **Freigaben einholen.** Das Logo-Datasheet verlangt Abstimmung mit der IFA
      (marketing@fistball.sport). Die Spielregeln verlangen für Kopien – auch
      auszugsweise – die Genehmigung der IFA. Der Fragenkatalog gehört Faustball Deutschland.
      Für internationale Verbreitung ist das eine Freigabe, kein Formfehler.

- [ ] **Trägerschaft klären.** Soll das ein IFA-Produkt werden oder ein Export von Faustball Deutschland?
      Die Antwort bestimmt, wo es gehostet wird, wer es pflegt und wie Kapitel 15
      aufgebaut ist.
