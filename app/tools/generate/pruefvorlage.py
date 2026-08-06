# -*- coding: utf-8 -*-
"""Erzeugt die Pruefvorlage fuer die 39 neuen Fragen."""
import io, json, re

Q = json.load(io.open('/sessions/affectionate-serene-volta/mnt/outputs/neue_fragen.json', encoding='utf-8'))

KAP = {8: "Wertung", 11: "Handzeichen und Gestik",
       12: "Aufgaben und Verhalten des Schiedsrichters",
       13: "Linienrichter und Anschreiber", 16: "Aufgaben rund um das Spiel"}

# Belegstellen aus der Schulungsmappe, wortgleich uebernommen
BELEG = {
 "IFA-BILD-007": "Der rechte oder linke gestreckte Arm wird mit geschlossener Faust senkrecht nach oben gehalten. Gleichzeitig wird die Geste mit dem Ausruf „BLOCK“ unterstützt. Das ist NICHT das Zeichen für Gleichstand.",
 "IFA-BILD-008": "Der rechte und der linke gestreckte Arm werden mit geschlossener Faust vor der Brust gehalten.",
 "IFA-BILD-009": "Wenn ein Spieler einen anderen Spieler behindert oder wenn ein Zuschauer einen Spieler behindert, macht der Schiedsrichter beide Hände außerhalb des Körperrahmens zu Fäusten und verbindet sie horizontal an der Brust, um einen Zusammenstoß anzuzeigen.",
 "IFA-BILD-010": "Ein abgewinkelter Arm zeigt mit geöffneter Hand nach oben, die andere geöffnete Hand wird mittig über die senkrechte Hand gelegt (Time out).",
 "IFA-BILD-011": "Berührt der Ball nach einem Überschlag die Decke, so weisen beide Hände mit geöffneter Handfläche nach oben. Der zweite Arm zeigt danach in die Waagerechte in die Richtung der Mannschaft, welcher der Punkt gutgeschrieben wird.",
 "IFA-BILD-012": "Fliegt ein Ball unter dem Band hindurch, so ist mit offener Hand, Handfläche nach oben, Arm vor dem Körper schräg nach unten gerichtet, die Flugbahn des Balles nachzuzeigen.",
 "IFA-BILD-013": "Springt ein Ball ohne Berührung über das Netz, so ist mit offener Hand, Handfläche nach unten, Arm über dem Körper, die Flugbahn des Balles nachzuzeigen.",
 "IFA-BILD-014": "Beide Arme zeigen waagerecht nach außen, die Daumen zeigen nach oben.",
 "IFA-BILD-015": "Der gestreckte Arm zeigt mit zwei gespreizten Fingern nach unten.",
 "IFA-BILD-016": "Eine Hand zeigt/klopft auf den Körperteil, den der Ball berührt hat. Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.",
 "IFA-BILD-017": "Ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Netz (Band/Leine). Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.",
 "IFA-BILD-018": "Ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Angabelinie. Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.",
 "IFA-BILD-019": "Die Auswechslung ist durch Kreisen beider Hände über dem Kopf zu signalisieren.",
 "IFA-C-027": "Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.",
 "IFA-A-044": "Bei Treffern am Fuß reicht die Hand auf Brust oder Oberschenkel, ggf. mit verbaler Ergänzung „Fuß“.",
 "IFA-C-028": "Der Schiedsrichter trifft seine Entscheidungen auf Grund visueller Wahrnehmung und lässt sich durch Spieler, Betreuungspersonen oder Zuschauer nicht beeinflussen. Das Gehör darf ihm die Richtigkeit seiner optischen Wahrnehmung nur bestätigen.",
 "IFA-A-045": "Stelle ich fest, dass ich eine falsche Entscheidung getroffen habe, so kann ich diese ohne weiteres zurücknehmen, wenn es der Spielgang zulässt.",
 "IFA-A-046": "Einsprüche – auch solche gegen Tatsachenentscheidungen – sind auf dem Spielformular sofort zu vermerken.",
 "IFA-C-029": "Auf Fragen des Mannschaftsführers muss der Schiedsrichter antworten. Er gibt die Antwort kurz und klar und lässt keine Diskussion zu.",
 "IFA-A-047": "Auf Fragen des Mannschaftsführers – bei Jugendmannschaften ggf. einer volljährigen Betreuungsperson – muss der Schiedsrichter antworten.",
 "IFA-A-048": "Artet das Spiel aus oder fühlt sich der Schiedsrichter durch Zuschauer bedroht, so hat er den Mannschaftsführern bzw. dem Veranstalter die notwendigen Weisungen zu erteilen.",
 "IFA-C-030": "Der Schiedsrichter überwacht die Aufzeichnungen im Spielformular. In regelmäßigen Abständen ist die Aufzeichnung des Anschreibers zu prüfen.",
 "IFA-C-031": "Die Linienrichter haben ihren Stand an den Endpunkten der dem Schiedsrichter gegenüberliegenden Seitenlinie. (Regel 9.3)",
 "IFA-C-032": "Hat der Ball die Außenlinie überschritten, zeigt der Linienrichter mit der Fahne nach oben. Hat er sie nicht überschritten, zeigt die Fahne in Richtung Spielfeld.",
 "IFA-C-033": "Kann der Linienrichter keine Aussage machen, hält er die Fahne mit beiden Händen waagerecht in Brusthöhe.",
 "IFA-A-049": "Kann ein Linienrichter die Situation „Ausball“ nicht erkennen, … so ist die Fahne waagerecht vor den Körper zu halten. In diesem Falle übernimmt der Kollege die Verantwortung. Kann auch dieser die Situation nicht erkennen, übernimmt der Schiedsrichter.",
 "IFA-A-050": "Bei Ausbällen wird die Fahne von dem „vorrangigen Linienrichter“ senkrecht nach oben gestreckt. Der Kollege quittiert dies mit kurzer Verzögerung. Auf keinen Fall darf er zuerst reagieren.",
 "IFA-A-051": "Wenn ein Ball im Feld aufspringt und dann die Hallenwand berührt, so weist der Linienrichter mit der Fahne in das Feld und hebt den anderen Arm senkrecht nach oben.",
 "IFA-C-034": "Der Standpunkt an den gegenüberliegenden Seitenlinien wechselt mit jedem Ballwechsel. … Beim Angriffs- oder Angabewechsel wechseln die beiden Positionen.",
 "IFA-A-052": "Linienrichter dürfen während eines Spieles nur aufgrund besonderer Umstände ausgewechselt werden, etwa bei Übelkeit.",
 "IFA-C-035": "Der Anschreiber hat seinen Platz in der Nähe des Schiedsrichters und bucht nach dessen Zeichen für beide Mannschaften die gewonnenen Gutbälle. (Regel 9.4)",
 "IFA-C-036": "Jeder Fehler wird als Gutball für die gegnerische Mannschaft gewertet. (Regel 8.1)",
 "IFA-A-053": "Der Schiedsrichter achtet darauf, dass der Anschreiber die Aufgabenstellung beherrscht. Ein Entwerten der Leerfelder ist zu verhindern.",
 "IFA-C-037": "Der Schiedsrichter sollte 30 Minuten vor Spielbeginn am Spielort anwesend sein.",
 "IFA-C-038": "Etwa 5 Minuten vor Spielbeginn fordert ein anhaltender Pfiff die Mannschaften auf, das Einspielen einzustellen, sodass 3 Minuten vor Spielbeginn ausgelost werden kann.",
 "IFA-C-039": "Er lost mit den Mannschaftsführern Feld oder Ball und damit die erste Angabe aus.",
 "IFA-A-054": "Der nächste Ball, der ins Spiel gebracht werden könnte, liegt direkt neben dem Pfosten, alle weiteren 3 bis 5 m hinter dem Pfosten.",
 "IFA-A-055": "Die zu Beginn tatsächlich eingesetzten Spieler werden mit einem Kreuz markiert. Ergänzungen und Auswechslungen werden nachgetragen, nicht anwesende Spieler gestrichen.",
 "IFA-A-056": "Er prüft die Vollständigkeit des Spielformulars, schließt mit seiner Unterschrift ab und übergibt es der Spielleitung.",
}

out = []
w = out.append
w("# Prüfvorlage: 39 neue Fragen zu den Kapiteln 8, 11–13 und 16\n")
w("Stand 6. August 2026. Diese Fragen schließen die Lücke im künftigen Pool **Spielleitung**\n"
  "(Kapitel 9–13 und 16), der in der zweistufigen Struktur 20 % der Nationalprüfung tragen soll.\n"
  "Bisher hatten die Kapitel 11, 12, 13 und 16 **keine einzige** Frage.\n")
w("Alle 39 tragen `origin: \"draft\"` und sind im Quiz als Entwurf gekennzeichnet. Über\n"
  "**Einstellungen → Entwurfsfragen einbeziehen** lassen sie sich abschalten. Nach deiner\n"
  "Abnahme wird `origin` auf `ifa` gesetzt.\n")
w("Die englische Fassung steht kursiv darunter; sie ist eine Arbeitsübersetzung, maßgeblich\n"
  "ist der deutsche Wortlaut. Das Zitat am Ende jeder Frage ist die Belegstelle aus dem\n"
  "Quelldokument.\n")
w("---\n")

# Zwei Punkte, die Toby entscheiden muss
w("## Zwei Punkte zur Entscheidung\n")
w("**1. Kapitel 16 stammt aus der Schiedsrichterordnung.** Die Inhalte des Kapitels sind aus den\n"
  "Foliensätzen von Faustball Deutschland übernommen und beruhen auf der deutschen\n"
  "Schiedsrichterordnung. Die beiden Fragen mit konkreten Zeitangaben – 30 Minuten Anwesenheit\n"
  "(IFA-C-037) und der Ablauf 5/3 Minuten vor Anpfiff (IFA-C-038) – habe ich vorsorglich als\n"
  "`scope: national` markiert, weil diese Zahlen international nicht gelten müssen. Die übrigen\n"
  "vier Fragen zu Kapitel 16 sind allgemeine Schiedsrichterpraxis und als `ifa` markiert.\n"
  "Falls die IFA eigene Fristen kennt, gehören alle sechs auf `national`.\n")
w("**2. Drei Fotos sind schwach – die Fragen fangen das im Text ab.** Bei den Zeichen 3 (Netz),\n"
  "4 (Übertritt) und 9 (Auswechslung) trägt das Bild allein die Antwort nicht:\n\n"
  "- **sig-03 / sig-04** unterscheiden sich nur in der Armrichtung – nach oben zum Netz\n"
  "  gegenüber schräg nach unten zur Angabelinie. Beide Fragen nennen die Armhaltung im\n"
  "  Fragetext, und die Fundstelle grenzt ausdrücklich gegen das jeweils andere Zeichen ab.\n"
  "- **sig-09** zeigt die kreisenden Hände auf Brusthöhe, die Schulungsmappe beschreibt sie\n"
  "  „über dem Kopf“. Die Fundstelle nennt die korrekte Ausführung und sagt dazu, dass das\n"
  "  Foto davon abweicht.\n\n"
  "So sind die Fragen fair, aber die Bilder bleiben der schwache Punkt. In `OFFENE-PUNKTE.md`\n"
  "steht deshalb, dass diese drei Zeichen neu fotografiert werden sollten. Ein Test hält fest,\n"
  "dass Fragetext und Fundstelle diese Abgrenzung tragen müssen – fällt sie weg, wird die\n"
  "Frage unfair.\n")
w("---\n")

for ch in [11, 12, 13, 8, 16]:
    inch = [q for q in Q if q["ch"] == ch]
    w("\n## Kapitel %d — %s (%d Fragen)\n" % (ch, KAP[ch], len(inch)))
    for q in inch:
        w("### %s%s\n" % (q["id"], "  ·  Stufe " + q["lvl"] +
                          ("  ·  national" if q["scope"] == "national" else "")))
        if q.get("shot"):
            w("![%s](app/assets/img/%s.jpg)\n" % (q["shot"], q["shot"]))
            w("*Foto: `%s.jpg`*\n" % q["shot"])
        w("**%s**  \n*%s*\n" % (q["q"]["de"], q["q"]["en"]))
        for i, (de, en) in enumerate(zip(q["a"]["de"], q["a"]["en"])):
            mark = "- [x] **%s**" % de if i == q["c"] else "- [ ] %s" % de
            w("%s  —  *%s*" % (mark, en))
        w("")
        w("*Fundstelle:* %s" % q["ref"]["de"])
        if q["id"] in BELEG:
            w("")
            w("> %s" % BELEG[q["id"]])
        w("")

io.open('/sessions/affectionate-serene-volta/mnt/referee-education/Pruefvorlage-Spielleitung.md',
        'w', encoding='utf-8').write("\n".join(out))
print("geschrieben:", len(Q), "Fragen,", sum(1 for q in Q if q["id"] in BELEG), "mit Belegzitat")
