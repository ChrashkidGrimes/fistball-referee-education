# Offene Punkte – Schiedsrichter-Lernapp

Stand 6. August 2026, zuletzt aktualisiert nach der Umstellung auf zwei Lizenzstufen.
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

- [x] ~~**Zuschnitt der C-Stufe bestätigen.**~~ Von Toby bestätigt am 1. August 2026.
      Überholt durch die Umstellung auf zwei Stufen am 6. August, siehe Abschnitt E.

- [x] ~~**Kumulative Kapitelquizzes bestätigen.**~~ Von Toby bestätigt am 5. August 2026.
      Überholt durch die Umstellung auf zwei Stufen: die Kapitelquizzes enthalten jetzt
      alle Fragen ihres Kapitels und sind auf beiden Stufen gleich.

---

## B – Grundsatzentscheidung: soll die Prüfung zählen?

Daran hängt der Rest.

| Stufe | Prüfung | Bestehensgrenze | erlaubte Fehler | gezogen aus |
|-------|---------|-----------------|-----------------|-------------|
| Regional | 40 | 70 % | 12 | 235 Fragen |
| National | 60 | 85 % | 9 | 235 Fragen |

**Teilweise entschärft:** Es wird nicht mehr der gesamte Katalog abgefragt, und die
Prüfungen variieren zwischen zwei Versuchen.

**Weiter entschärft:** Der Katalog ist von 196 auf 235 Fragen gewachsen. Die
Nationalprüfung zieht 60 davon, also gut ein Viertel – nach einem Versuch ist der
Bestand nicht annähernd erschöpft.

**Weiter offen:** Das Ergebnis liegt im `localStorage` und lässt sich in der
Browserkonsole setzen. Ein so erzeugtes Zertifikat trägt aber keinen gültigen Prüfcode,
solange niemand den Code gezielt nachbaut.

Die Prozentgrenzen 70/65 und 85/75 stammen aus einer beaufsichtigten Einzelprüfung.
In eine Selbstbedienungs-App übernommen, übertragen sie die Form, nicht die Wirkung.

**Entschieden am 25. Oktober 2026: Weg 2.** Das Zertifikat bescheinigt die bestandene
Abschlussprüfung und trägt einen Prüfcode, über den ein Verband es nachprüfen kann.
Spec: `docs/superpowers/specs/2026-10-25-pruefnachweis-design.md`.

**Weg 1 – Ausbildung, Prüfung bleibt beim Verband**
- [x] ~~Zertifikat als Durcharbeitungsnachweis~~ – verworfen zugunsten von Weg 2.

**Weg 2 – Prüfung soll zählen**
- [x] ~~Fragenkatalog erweitern~~ – 114 Fragen ergänzt und freigegeben, Katalog von
      121 auf 235. Kein Kapitel ist mehr ohne Fragen.
- [x] ~~Prüfungsumfang auf eine Teilmenge des Katalogs begrenzen~~ – erledigt (40 / 60)
- [x] ~~Auswertung ohne Lösungen~~ – bewusst abgewählt: Die Lösungen nach der Prüfung
      dienen dem Lernen. Die Wartezeit und der Umfang des Katalogs dämpfen den Effekt.
- [x] ~~Wartezeit zwischen Prüfungsversuchen~~ – 2 Stunden nach einem nicht
      bestandenen Versuch. Der Versuch zählt schon beim Start, ein Abbruch oder
      geschlossener Browser gilt als nicht bestanden. Liegt im Browser und ist umgehbar;
      die Versuchsnummer steht deshalb im Prüfcode. Das Zurücksetzen des Fortschritts (je Stufe oder „alle
      Daten“) löscht den Lernstand, behält aber Versuchszähler und Sperre – sonst ließe
      sich die Wartezeit mit dem Knopf der App umgehen.
- [x] ~~Serverseitige Ablage der Ergebnisse~~ – ersetzt durch den Prüfcode: Name,
      Stufe, Datum, Versuch, Ergebnis und alle Antworten, abgesichert mit CRC32, als
      QR-Code auf dem Zertifikat. Die Prüfseite rechnet das Ergebnis nach.
      **Grenzen:** Die Prüfung ist unbeaufsichtigt. Die Prüfsumme ist kein Geheimnis –
      wer den Quellcode liest, kann einen gültigen Code bauen. Der Code belegt, dass das
      Zertifikat nicht nachträglich verändert wurde, nicht wer geantwortet hat.

**Weg 3 – Server mit Verbands-Login**
- [ ] Löst Manipulation und zentrale Auswertung, kostet laufenden Betrieb.
      Weiter abgewählt. Ein Zwischenschritt wäre ein Prüfungsschlüssel, den der Verband
      vorab ausgibt (Spec, Ansatz 2) – lässt sich ohne Umbau des Prüfcodes ergänzen.

---

## C – Inhalte ergänzen

- [x] ~~**75 Entwurfsfragen fachlich prüfen.**~~ Von Toby freigegeben am 6. August 2026.
      Die Kennzeichnung `origin: "draft"` ist entfallen; die Fragen tragen jetzt
      `ifa` (69) beziehungsweise `ppt` (6 Bildfragen), damit die Herkunft
      nachvollziehbar bleibt. Der Entwurfsschalter in den Einstellungen blendet sich
      aus, solange keine Entwürfe im Katalog sind, und erscheint automatisch wieder,
      sobald welche dazukommen. `Fragen-Nachweis.md` hält weiterhin fest, auf welche
      Quellstelle sich jede Frage stützt.

- [x] ~~**39 neue Fragen zur Spielleitung abnehmen.**~~ Von Toby freigegeben am
      6. August 2026. Erstellt für die Kapitel 8, 11, 12, 13 und 16, die bis dahin
      fast keine Fragen hatten; darunter dreizehn Bildfragen auf den vorhandenen
      Handzeichen-Fotos. Eine Frage wurde bei der Abnahme geändert: IFA-A-054 nennt
      jetzt ausdrücklich, dass im Auslauf kein weiterer Ball liegen darf –
      Verletzungsgefahr. Die Kennzeichnung `origin: "draft"` ist entfallen, die
      Fragen tragen `ifa`. Herkunftsnachweis: `Fragen-Nachweis-Spielleitung.md`.

- [x] ~~**Reichweite der Kapitel-16-Fragen klären.**~~ Am 25. Oktober 2026 gegen SRO
      (SpOF Anlage 5) mit Anlagen 5.1/5.2, RuVO und WKB samt Anlage 2 geprüft:
      Auslosung (IFA-C-039), Reservebälle (IFA-A-054) und Kreuz im Spielformular
      (IFA-A-055) stehen auch in IFA-Quellen und bleiben `ifa`. Die Übergabe des
      Spielformulars (IFA-A-056) steht nur in SRO Anlage 5.1 und ist jetzt `fed`.
- [ ] **IFA-C-037 und IFA-C-038 belegen.** 30 Minuten Anwesenheit und der Ablauf 5/3
      Minuten vor Anpfiff stehen in keiner vorliegenden Quelle – weder SRO, Anlagen
      5.1/5.2, SpOF, RuVO noch WKB Halle mit Anlage 2 (Einsatzordnung Spielrichter).
      Die Fragen bleiben unverändert, die Quelle wird nachgereicht.

- [x] ~~**Regeltext und Erläuterung sauber trennen.**~~ Erledigt am 6. August 2026,
      dieselbe Ursache wie oben. Fünf englische Regeltexte (2.1, 2.2, 2.2.1, 10.1,
      10.2.2) enthielten zusätzlich die blaue Erläuterung – bei 2.1 standen
      1139 Zeichen englisch gegen 344 deutsch, und derselbe Text erschien im
      Kapitel zweimal. Umgekehrt waren zwei deutsche Regeltexte zu kurz: bei 1.6
      fehlte der Satz zur Verwahrung der Bälle, bei 8.2.1 die Ziffernfolge des
      Beispiels. Alle sieben stammen jetzt aus dem Regelwerk, das reiner Regeltext
      ist. `regeltext_bereinigen.py` hält das fest, `manual-abgleich.test.js`
      prüft es bei jedem Testlauf.

- [ ] **Verwahrung der Bälle: Abweichung vom Foliensatz an die IFA melden.**
      Korrigiert am 6. August 2026 nach Hinweis von Toby. Der Foliensatz von
      Faustball Deutschland schreibt: „Der nächste Ball, der ins Spiel gebracht
      werden könnte, liegt direkt neben dem Pfosten." Richtig ist: **außer dem
      gespielten Ball darf kein Ball im Auslauf liegen**, auch nicht der nächste
      einsetzbare – alle Reservebälle gehören außerhalb des Auslaufs. Ein liegender
      Ball im Auslauf ist eine Verletzungsgefahr, weil Spieler den Ball dort mit dem
      Blick nach oben verfolgen. Kapitel 16 und die Frage `IFA-A-054` sind auf die
      korrigierte Fassung umgestellt; die Abweichung ist im Nachweis vermerkt.
      Der Foliensatz sollte bei nächster Gelegenheit nachgezogen werden.
      **Nachtrag:** Regel 1.6 sagt es selbst – „Die Bälle, mit denen nicht gespielt
      wird, bleiben unter seiner Kontrolle aber ausserhalb des Auslaufs.“ Der Satz
      fehlte im Datensatz und ist jetzt ergänzt; `IFA-A-054` verweist zuerst
      darauf und erst danach auf die Schiedsrichterordnung.

- [ ] **Widersprüche bei den Strafen mit der IFA klären.** Geprüft am 6. August 2026
      anhand von `Strafen_Anwendung_Oesterreich.pdf` (Bundesschiedsrichter-Referat
      Österreich, 1. März 2019). Inhaltlich ist das Papier eine ältere Teilmenge der
      IFA-Schulungsmappe – die Gelb-Karten-Liste stimmt Punkt für Punkt überein.
      **Übernommen wurde nichts**, maßgeblich bleibt die Schulungsmappe. Drei Stellen
      weichen jedoch ab und sollten der IFA-Schiedsrichterkommission vorgelegt werden:

      1. **Beleidigendes Kritisieren des Schiedsgerichts** – Österreich stuft es als
         *rote Karte* ein („Insultierung des Schiedsgerichtes, z.B. beleidigendes
         Kritisieren, ‚Stinkefinger', ‚Vogel zeigen'"), die Schulungsmappe unter
         *gelb-rot* („Grob unsportliches Verhalten … Beleidigungen – verbal oder mit
         Gestik > Stinkefinger"); rot ist dort für „tätlicher Angriff, grobe
         Beschimpfung" reserviert. Dieselbe Formulierung liegt eine Karte auseinander.
         Die App folgt der Schulungsmappe.

      2. **Tätlicher Angriff – Unklarheit in der Schulungsmappe selbst.** Dort steht
         „tätlicher Angriff … Spielgericht" sowohl bei gelb-rot als auch bei rot.
         Österreich löst das über die Schwere auf: „leichtes Wegstoßen" gelb-rot,
         „echter tätlicher Angriff" rot. Eine Klarstellung durch die IFA wäre die
         sauberste Lösung – bis dahin bleibt die Stelle unverändert.

      3. **Abbruch bei laufender Zeitstrafe – das österreichische Papier ist
         überholt.** Es nennt nur den Feldverweis; Ziffer 10.1.1 der Regeln 2025
         nennt „zeitweilig ausgeschlossen **oder** des Feldes verwiesen". Hier war
         bewusst nichts zu übernehmen. Die App bildet die Regel 2025 korrekt ab.

- [ ] **Frage zum zweiten zeitweiligen Ausschluss ergänzen?** Bei der Prüfung oben
      aufgefallen, unabhängig vom österreichischen Papier: `IFA-A-043` fragt nur den
      Fall „weiterer Spieler wird des Feldes verwiesen" ab. Der zweite Zweig von
      Ziffer 10.1.1 – ein weiterer Spieler wird *zeitweilig ausgeschlossen*, was
      ebenfalls zum Abbruch führt – ist nicht abgefragt. Genau dort liegt die
      Verwechslungsgefahr, weil ältere Fassungen der Regel nur den Feldverweis kannten.

- [ ] **Handzeichen 3, 4 und 9 neu fotografieren.** Die drei Fotos tragen die Antwort
      nicht aus eigener Kraft:

      - Zeichen 3 (Netz) und 4 (Übertritt) unterscheiden sich nur in der Armrichtung –
        nach oben zum Netz gegenüber schräg nach unten zur Angabelinie. Auf den Fotos
        ist das kaum zu erkennen.
      - Zeichen 9 (Auswechslung) zeigt die kreisenden Hände auf Brusthöhe, die
        Schulungsmappe beschreibt sie „über dem Kopf“. Bild und Text gehen auseinander.

      Die Fragen dazu bleiben im Katalog. Sie nennen die Armhaltung im Fragetext, und
      die Fundstelle grenzt gegen das jeweils verwechselbare Zeichen ab – damit sind
      sie fair. `questions.test.js` hält fest, dass diese Abgrenzung erhalten bleiben
      muss. Sauber wird es aber erst mit besseren Aufnahmen: Zeichen 3 und 4 aus
      derselben Perspektive und mit sichtbarem Netz beziehungsweise sichtbarer
      Angabelinie, Zeichen 9 mit den Händen über dem Kopf.
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

- [x] ~~**Sechs Erläuterungen ohne englische Entsprechung abnehmen.**~~ Erledigt am
      6. August 2026 – und dabei stellte sich heraus, dass die Prämisse falsch war.
      Nach einem Hinweis von Toby, dass die Schulungsmappe Regeltext schwarz und
      Erläuterung blau setzt, habe ich die englische Ausgabe nach Schriftfarbe
      getrennt neu eingelesen. Ergebnis: für sechs Erläuterungen gibt es sehr wohl
      offiziellen englischen Text – Kapitel 2 (Regeln 2.1, 2.2, 2.2.1), Kapitel 10
      (Orientierung bei Strafen) und Kapitel 12 (neutrale Entscheidungsfindung,
      Umgang mit eigenen Fehlern). Zwei davon waren nicht einmal als
      Arbeitsübersetzung gekennzeichnet.
      Alle sechs tragen jetzt den offiziellen Wortlaut mit Seitenangabe. Übrig
      bleiben zwei echte Lücken: die Lockerung der Kleidungsvorschriften zu
      Regel 2.3 und der Zusatz zu den Unterziehhosen bei 2.3.3.
      Der fehlende Extraktor liegt jetzt als `app/tools/generate/extract.py` im
      Repository, und `manual-abgleich.test.js` prüft alle 56 übrigen
      Erläuterungen wortgleich gegen Schulungsmappe und Regelwerk.

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

- [ ] **Zwei Erläuterungen ohne englische Entsprechung abnehmen.** Beide in Kapitel 2:
      die Lockerung der Kleidungsvorschriften zu Regel 2.3 und der Zusatz zu den
      Unterziehhosen bei 2.3.3. Die englische Ausgabe ist dort tatsächlich kürzer;
      die englische Fassung stammt von mir und ist mit `tr: true` markiert. Falls die
      IFA das Training Manual ergänzt, sollten diese Stellen ersetzt werden.
      (Die ursprünglich hier genannten sechs Stellen waren teils ein Irrtum – siehe
      oben, Abschnitt C.)

- [x] ~~**Inhalte aus den Schulungsfoliensätzen ins Englische bringen.**~~ Erledigt –
      alle 47 Blöcke übersetzt. Da es dafür keine offizielle englische Ausgabe gibt,
      ist auch das eine Arbeitsübersetzung; die Blöcke tragen `origin: "ppt"` und das
      Kapitel weist im englischen Modus darauf hin.

- [ ] **Weitere Sprachen?** Spanisch und Portugiesisch wären für die tatsächlichen
      Wachstumsregionen wahrscheinlich wertvoller als weitere europäische Sprachen.
      Voraussetzung ist eine von der IFA freigegebene Regelübersetzung – ohne die
      gäbe es nur eine inoffizielle Fassung.

- [x] ~~**Englischer Regeltext 6.3 / 6.3.2: „behind the service line“.**~~ Am 25. Oktober
      2026 von Toby bestätigt: Die englische Ausgabe 2025 übersetzt „vor der Angabelinie“
      falsch mit „behind the service line“. Gemeint ist die Seite zur Mittellinie hin –
      „in front of“. Die IFA korrigiert den Regeltext. Die App weicht bewusst ab und
      verwendet in Kapitel 6 und in den Fragen „in front of the service line“;
      `bilingual.test.js` hält das fest.

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

---

## E – Umstellung auf zwei Stufen (6. August 2026)

- [x] ~~**Zwei Lizenzstufen statt drei.**~~ C, B und A sind durch **Regional** und
      **National** ersetzt. Der Lernpfad ist für beide gleich – alle 16 Kapitel,
      dieselben Kapitelquizzes; die Stufen unterscheiden sich in Umfang und Grenze
      der Abschlussprüfung. Plan und Begründung: `PLAN-Zwei-Stufen.md`.

- [x] ~~**Pools von Schwierigkeitsstufen auf Themenbereiche.**~~ Sechs Pools, der
      Pool ergibt sich aus dem Kapitel. Das Feld `lvl` ist an allen 235 Fragen
      entfallen; neue Fragen sortieren sich über ihr Kapitel von selbst ein.

- [x] ~~**Begriffskollision aufgelöst.**~~ `scope: "national"` hieß dasselbe wie
      die neue Stufe. Der Wert heißt jetzt `fed`, die Einstellung
      „Verbandsordnungen einbeziehen“.

- [x] ~~**Fortschritt migrieren.**~~ Gespeicherte Stände werden beim ersten Start
      überführt: C → Regional, B und A → National, je Kapitel gewinnt der bessere
      Wert. Der umgestellte Stand wird sofort zurückgeschrieben.

- [ ] **Stufenbezeichnungen mit der IFA abstimmen.** „Regional“ und „National“
      sind aus der Sache heraus gewählt. Ob die IFA andere Bezeichnungen führt –
      etwa mit Bezug auf internationale Einsätze –, ist offen. Die Namen stehen
      an einer Stelle: `lvlRName` und `lvlNName` in `assets/js/i18n.js`.

- [ ] **Kapitelquizzes sind auf beiden Stufen identisch.** Das ist die gewollte
      Folge aus „ein Lernpfad, zwei Prüfungsstandards“. Wer National anstrebt,
      braucht im Kapitelquiz aber 85 % statt 70 % – das ist der einzige
      Unterschied im Lernpfad. Falls sich das im Einsatz als zu wenig Trennung
      erweist, wäre der nächste Schritt, National zusätzliche Kapitel oder
      vertiefende Fragen zuzuordnen.
