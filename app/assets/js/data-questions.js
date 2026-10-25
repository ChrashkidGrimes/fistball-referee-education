/* Prüfungsfragen – zweisprachig.
   ch      Kapitelnummer. Bestimmt zugleich den Themenpool – siehe POOLS in app.js.
   q,a,ref Sprachobjekte { de, en }; a enthält je Sprache vier Antworten
   c       Index der richtigen Antwort – gilt für beide Sprachen
   scope   ifa = international gültig, fed = Ordnung eines Mitgliedsverbandes,
           derzeit nur Deutschland (SpOF/SRO/Faustball Deutschland)
   shot    optional: Foto zur Spielsituation, Pfad unter assets/img/ ohne Endung
   tr      englische Fassung ist eine Arbeitsübersetzung, nicht offiziell
   origin  fbd  = Moodle-Fragenkataloge von Faustball Deutschland
           ifa  = aus IFA-Spielregeln und Schulungsmappe abgeleitet, freigegeben
           ppt  = aus den Schulungsfoliensätzen abgeleitet, freigegeben */
window.IFA_QUESTIONS = [
{
"id": "QA-2022-021",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Leinenhöhe (Netz/Band) gilt im Hallenfaustball in der Altersklasse Jugend weiblich U18?",
"en": "What is the net height for indoor fistball in the girls' U18 category?"
},
"a": {
"de": [
"1,90 m",
"2,00 m",
"1,80 m",
"1,60 m"
],
"en": [
"1.90 m",
"2.00 m",
"1.80 m",
"1.60 m"
]
},
"c": 0,
"ref": {
"de": "Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-013",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Leinenhöhe (Netz/Band) gilt im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "What is the net height for indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"2,00 m",
"2,10 m",
"1,90 m",
"1,80 m"
],
"en": [
"2.00 m",
"2.10 m",
"1.90 m",
"1.80 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln Anhang",
"en": "Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-009",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Spielfeld im Feldfaustball in der Altersklasse Jugend männlich / weiblich U14?",
"en": "How wide is the court in outdoor fistball in the U14 category?"
},
"a": {
"de": [
"20 m",
"25 m",
"15 m",
"10 m"
],
"en": [
"20 m",
"25 m",
"15 m",
"10 m"
]
},
"c": 0,
"ref": {
"de": "Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-012",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Spielfeld im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "How wide is the court in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"20 m",
"25 m",
"15 m",
"10 m"
],
"en": [
"20 m",
"25 m",
"15 m",
"10 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 (Halle) und Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-020",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Spielfeld im Hallenfaustball in der Altersklasse Jugend weiblich U18?",
"en": "How wide is the court in indoor fistball in the girls' U18 category?"
},
"a": {
"de": [
"20 m",
"25 m",
"15 m",
"10 m"
],
"en": [
"20 m",
"25 m",
"15 m",
"10 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 (Halle) und Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-008",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Länge hat das Spielfeld im Feldfaustball in der Altersklasse Jugend männlich / weiblich U14?",
"en": "How long is the court in outdoor fistball in the U14 category?"
},
"a": {
"de": [
"40 m",
"50 m",
"30 m",
"15 m"
],
"en": [
"40 m",
"50 m",
"30 m",
"15 m"
]
},
"c": 0,
"ref": {
"de": "Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-011",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Länge hat das Spielfeld im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "How long is the court in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"40 m",
"50 m",
"30 m",
"15 m"
],
"en": [
"40 m",
"50 m",
"30 m",
"15 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 (Halle) und Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-019",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Länge hat das Spielfeld im Hallenfaustball in der Altersklasse Jugend weiblich U18?",
"en": "How long is the court in indoor fistball in the girls' U18 category?"
},
"a": {
"de": [
"40 m",
"50 m",
"30 m",
"15 m"
],
"en": [
"40 m",
"50 m",
"30 m",
"15 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 (Halle) und Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "QA-2022-010",
"ch": 14,
"scope": "ifa",
"q": {
"de": "Welche Leinenhöhe (Netz/Band) gilt im Feldfaustball in der Altersklasse U14 (männlich/weiblich)?",
"en": "What is the net height in outdoor fistball in the U14 category?"
},
"a": {
"de": [
"1,80 m",
"1,90 m",
"2,00 m",
"1,60 m"
],
"en": [
"1.80 m",
"1.90 m",
"2.00 m",
"1.60 m"
]
},
"c": 0,
"ref": {
"de": "Regelungen für Altersklassen",
"en": "Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-026",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Sind mehrfarbige Bälle zugelassen?",
"en": "Are multi-coloured balls permitted?"
},
"a": {
"de": [
"Ja, bei weißer Grundfarbe mit höchstens 20 % Farbfläche",
"Nein",
"Wird vom Schiedsrichter festgelegt.",
"Nur mit Zustimmung der Mannschaften."
],
"en": [
"Yes, with a white basic colour and at most 20 % coloured surface",
"No",
"Determined by the referee.",
"Only with the teams' consent."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4",
"en": "Rules of the Game 1.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-015",
"ch": 1,
"scope": "ifa",
"q": {
"de": "In welchen Abständen muss die Hell-/Dunkelfärbung des Netzes (Bandes/der Leine) angebracht sein?",
"en": "At what intervals must the light and dark colouring of the net be arranged?"
},
"a": {
"de": [
"15 - 20 cm",
"8 - 12 cm",
"20 - 25 cm",
"3 - 6 cm"
],
"en": [
"15 - 20 cm",
"8 - 12 cm",
"20 - 25 cm",
"3 - 6 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2",
"en": "Rules of the Game 1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-022",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Angaben zum Ballgewicht in der Altersklasse Frauen (F19+) sind richtig?",
"en": "Which figures for ball weight in the women's category (F19+) are correct?"
},
"a": {
"de": [
"320 +/- 10 g",
"350 +/- 10 g",
"290 +/- 10 g",
"260 +/- 10 g"
],
"en": [
"320 +/- 10 g",
"350 +/- 10 g",
"290 +/- 10 g",
"260 +/- 10 g"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.4 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-023",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Angaben zum Ballgewicht in der Altersklasse Männer (M19+) sind richtig?",
"en": "Which figures for ball weight in the men's category (M19+) are correct?"
},
"a": {
"de": [
"350 +/- 10 g",
"320 +/- 10 g",
"290 +/- 10 g",
"260 +/- 10 g"
],
"en": [
"350 +/- 10 g",
"320 +/- 10 g",
"290 +/- 10 g",
"260 +/- 10 g"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.4 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-024",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Angaben zum Ballumfang sind richtig?",
"en": "Which figures for the ball's circumference are correct?"
},
"a": {
"de": [
"65 - 68 cm",
"62 - 65 cm",
"61 - 64 cm",
"66 - 69 cm"
],
"en": [
"65 - 68 cm",
"62 - 65 cm",
"61 - 64 cm",
"66 - 69 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-025",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Angaben zum Luftdruck des Balles sind richtig?",
"en": "Which figures for the ball's air pressure are correct?"
},
"a": {
"de": [
"0,55 - 0,70 bar",
"0,55 - 0,75 bar",
"0,60 - 0,70 bar",
"0,50 - 0,75 bar"
],
"en": [
"0.55 - 0.70 bar",
"0.55 - 0.75 bar",
"0.60 - 0.70 bar",
"0.50 - 0.75 bar"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.4 and Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-004",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Netz (Band) im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "How wide is the net in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"3 - 6 cm",
"5 - 8 mm",
"8 - 12 cm",
"15 - 20 cm"
],
"en": [
"3 - 6 cm",
"5 - 8 mm",
"8 - 12 cm",
"15 - 20 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2",
"en": "Rules of the Game 1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-014",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Netz (Band) im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "How wide is the net in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"3 - 6 cm",
"5 - 8 mm",
"8 - 12 cm",
"15 - 20 cm"
],
"en": [
"3 - 6 cm",
"5 - 8 mm",
"8 - 12 cm",
"15 - 20 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2",
"en": "Rules of the Game 1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-002",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Breite hat das Spielfeld im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "How wide is the court in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"20 m",
"25 m",
"15 m",
"10 m"
],
"en": [
"20 m",
"25 m",
"15 m",
"10 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.1 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-001",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Länge hat das Spielfeld im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "How long is the court in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"50 m",
"40 m",
"30 m",
"15 m"
],
"en": [
"50 m",
"40 m",
"30 m",
"15 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.1 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-005",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Linienbreite ist im Feldfaustball in der Altersklasse Männer (M19+) zulässig?",
"en": "What line width is permitted in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"10 - 15 cm",
"3 - 6 cm",
"5 - 8 mm",
"15 - 20 cm"
],
"en": [
"10 - 15 cm",
"3 - 6 cm",
"5 - 8 mm",
"15 - 20 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.3",
"en": "Rules of the Game 1.1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-016",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Linienbreite ist im Hallenfaustball in der Altersklasse Jugend männlich U18 zulässig?",
"en": "What line width is permitted in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"5 - 15 cm",
"3 - 6 cm",
"5 - 8 mm",
"15 - 20 cm"
],
"en": [
"5 - 15 cm",
"3 - 6 cm",
"5 - 8 mm",
"15 - 20 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.3",
"en": "Rules of the Game 1.1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-003",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Welche Leinenhöhe (Netz/Band) gilt im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "What is the net height in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"2,00 m",
"2,10 m",
"1,90 m",
"1,80 m"
],
"en": [
"2.00 m",
"2.10 m",
"1.90 m",
"1.80 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.2 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-007",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie viel beträgt der hintere Mindestauslauf im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "What is the minimum rear buffer zone in outdoor fistball in the men's category (M19+)?"
},
"a": {
"de": [
"6,00 m",
"3,00 m",
"1,00 m",
"0,50 m"
],
"en": [
"6.00 m",
"3.00 m",
"1.00 m",
"0.50 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.3",
"en": "Rules of the Game 1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-018",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie viel beträgt der hintere Mindestauslauf im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "What is the minimum rear buffer zone in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"1,00 m",
"3,00 m",
"6,00 m",
"0,50 m"
],
"en": [
"1.00 m",
"3.00 m",
"6.00 m",
"0.50 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.3",
"en": "Rules of the Game 1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-006",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie viel beträgt der seitliche Mindestauslauf im Feldfaustball in der Altersklasse Männer (M19+)?",
"en": "What is the minimum side buffer zone in outdoor fistball in the men's category (M19)?"
},
"a": {
"de": [
"6,00 m",
"3,00 m",
"1,00 m",
"0,50 m"
],
"en": [
"6.00 m",
"3.00 m",
"1.00 m",
"0.50 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.3",
"en": "Rules of the Game 1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-017",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie viel beträgt der seitliche Mindestauslauf im Hallenfaustball in der Altersklasse Jugend männlich U18?",
"en": "What is the minimum side buffer zone in indoor fistball in the boys' U18 category?"
},
"a": {
"de": [
"0,50 m",
"6,00 m",
"3,00 m",
"1,00 m"
],
"en": [
"0.50 m",
"6.00 m",
"3.00 m",
"1.00 m"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.3",
"en": "Rules of the Game 1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q1-2022-040",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Zu welchem Feld gehört die Mittellinie?",
"en": "To which half of the court does the centre line belong?"
},
"a": {
"de": [
"Gehört beiden Spielfeldern gemeinsam",
"Zur Spielhälfte der angreifenden Mannschaft",
"Zur Spielhälfte der abwehrenden Mannschaft",
"Zu keiner Spielhälfte"
],
"en": [
"It belongs to both halves",
"To the attacking team's half",
"To the defending team's half",
"To neither half"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2",
"en": "Rules of the Game 1.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-034",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Darf ein Spieler mit bloßem Oberkörper spielen?",
"en": "May a player play bare-chested?"
},
"a": {
"de": [
"Nein",
"Ja",
"Ja, wenn alle mit bloßem Oberkörper spielen.",
"Nur bei starker Sonneneinstrahlung und Hitze."
],
"en": [
"No",
"Yes",
"Yes, if everyone plays bare-chested.",
"Only in strong sunshine and heat."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.3",
"en": "Rules of the Game 2.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-033",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Ist das Spielen mit Metalldornen (Spikes) erlaubt?",
"en": "Is playing in metal spikes allowed?"
},
"a": {
"de": [
"Nein",
"Ja",
"Wenn sie von allen Spielern getragen werden.",
"Nur mit Zustimmung der Mannschaften."
],
"en": [
"No",
"Yes",
"If they are worn by all players.",
"Only with the teams' consent."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.3.3",
"en": "Rules of the Game 2.3.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-029",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Mit wie vielen Spielern muss eine Mannschaft mindestens antreten, um spielfähig zu sein?",
"en": "What is the minimum number of players a team must field to be able to play?"
},
"a": {
"de": [
"Mit 4 Spielern",
"Mit 3 Spielern",
"Mit 5 Spielern",
"Mit 8 Spielern"
],
"en": [
"With 4 players",
"With 3 players",
"With 5 players",
"With 8 players"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1",
"en": "Rules of the Game 2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-031",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Muss das Auswechseln beim Schiedsrichter angemeldet werden?",
"en": "Does a substitution have to be reported to the referee?"
},
"a": {
"de": [
"Ja",
"Nein",
"In der Satzpause oder im Time-out nicht.",
"Nur wenn die Mannschaft kein Angaberecht hat."
],
"en": [
"Yes",
"No",
"Not during the interval between sets or a time-out.",
"Only if the team does not have the right to serve."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.2",
"en": "Rules of the Game 2.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-032",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Welche Anforderungen werden an die Spielkleidung gestellt?",
"en": "What requirements apply to the playing kit?"
},
"a": {
"de": [
"Einheitliche Oberbekleidung mit langen oder kurzen Ärmeln und kurzer Hose",
"Oberbekleidung mit langen Ärmeln und kurzer Hose",
"Einheitliche Oberbekleidung mit langen oder kurzen Ärmeln und langer oder kurzer Hose",
"Oberbekleidung mit langen Ärmeln und langer Hose in der Halle"
],
"en": [
"Uniform tops with long or short sleeves and short trousers",
"Tops with long sleeves and short trousers",
"Uniform tops with long or short sleeves and long or short trousers",
"Tops with long sleeves and long trousers indoors"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.3 ff.",
"en": "Rules of the Game 2.3 et seq."
},
"origin": "fbd",
"tr": true
},
{
"id": "Q2-2022-030",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Wie viele Spieler dürfen je Spiel pro Mannschaft höchstens eingesetzt werden?",
"en": "What is the maximum number of players a team may use in a match?"
},
"a": {
"de": [
"10 Spieler",
"8 Spieler",
"5 Spieler",
"Beliebig viele Spieler"
],
"en": [
"10 players",
"8 players",
"5 players",
"Any number of players"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.1",
"en": "Rules of the Game 2.1.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q3-2022-028",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Bei Spielen auf Zeit wird das Ende jeder Halbzeit akustisch angezeigt. Wie lautet die richtige Ansage?",
"en": "In time-limited matches the end of each half is signalled acoustically. What is the correct call?"
},
"a": {
"de": [
"Herunterzählen der letzten 5 Spielsekunden; akustisches Signal (Pfiff)",
"Letzte Spielminute",
"Mannschaften und Spielrichter, \"Achtung\"; akustisches Signal (Pfiff)",
"Diese Regelung gibt es nicht mehr, da nur noch auf Sätze gespielt wird."
],
"en": [
"Counting down the last 5 seconds of play, then an acoustic signal (whistle)",
"Last minute of play",
"Teams and officials, \"attention\", then an acoustic signal (whistle)",
"This rule no longer exists because matches are now only played in sets."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.3",
"en": "Rules of the Game 3.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q3-2022-027",
"ch": 3,
"scope": "fed",
"q": {
"de": "Welcher Spielmodus wird in den Frauen- und Männerklassen deines Landesverbandes gespielt?",
"en": "Which match format is played in your regional federation in women's and men's fistball?"
},
"a": {
"de": [
"Satzspiel bis 11 Gutbälle",
"Satzspiel bis 15 Gutbälle",
"Satzspiel mit Zeitbegrenzung",
"Spielbetrieb auf Zeit"
],
"en": [
"Sets played to 11 points",
"Sets played to 15 points",
"Sets with a time limit",
"Time-limited competition"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.2; SpOF 4.4.2.4",
"en": "Rules of the Game 3.1.2; SpOF 4.4.2.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q4-2022-035",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Wann beginnt ein Spielgang?",
"en": "When does a rally begin?"
},
"a": {
"de": [
"Mit der Angabe",
"Mit dem Anpfiff des Spiels",
"Mit der Auslosung",
"Wenn beide Mannschaften bereit sind."
],
"en": [
"With the service",
"With the opening whistle",
"With the toss",
"When both teams are ready."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 4.1",
"en": "Rules of the Game 4.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q4-2022-036",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Wann endet ein Spielgang?",
"en": "When does a rally end?"
},
"a": {
"de": [
"Mit dem ersten Fehler.",
"Mit Ankündigung der Auszeit (Time Out)",
"Mit Ende der Auszeit (Time Out)",
"Bei Auswechslung eines Spielers"
],
"en": [
"With the first fault.",
"When the time-out is announced",
"When the time-out ends",
"When a player is substituted"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 4.1",
"en": "Rules of the Game 4.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q7-2022-037",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wie oft darf der Ball im eigenen Feld von jedem Spieler geschlagen werden?",
"en": "How often may each player hit the ball in their own court?"
},
"a": {
"de": [
"Einmal",
"Zweimal",
"Dreimal",
"Viermal"
],
"en": [
"Once",
"Twice",
"Three times",
"Four times"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.1",
"en": "Rules of the Game 7.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q7-2022-038",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wie oft darf der Ball im eigenen Feld vor jedem Schlag maximal den Boden berühren?",
"en": "How often at most may the ball touch the ground in your own court before each hit?"
},
"a": {
"de": [
"Einmal",
"Zweimal",
"Dreimal",
"Keinmal"
],
"en": [
"Once",
"Twice",
"Three times",
"Not once"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.1",
"en": "Rules of the Game 7.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q10-2022-041",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Bei unsportlichem Verhalten hat der Schiedsrichter das Recht, je nach Schwere des Verstoßes folgende Strafen zu verhängen:\n– Verwarnung (gelbe Karte)\n– Zeitstrafe (gelbe und rote Karte): Ausschluss im laufenden Spiel, bis beide Mannschaften zusammen 10 Gutbälle erzielt haben\n– Feldverweis (rote Karte): Ausschluss für den Rest des Spiels\nIst der Schiedsrichter bei der Wahl der Strafe an diese Reihenfolge gebunden?",
"en": "For unsporting behaviour the referee has the right to impose the following penalties, depending on the severity of the offence:\n– warning (yellow card)\n– time penalty (yellow and red card): exclusion during the match until both teams together have scored 10 points\n– sending off (red card): exclusion for the rest of the match\nIs the referee bound to follow this order when choosing a penalty?"
},
"a": {
"de": [
"Nein",
"Ja",
"Der Schiedsrichter berät sich mit den Mannschaften",
"Der Schiedsrichter berät sich mit den anderen Spielrichtern."
],
"en": [
"No",
"Yes",
"The referee consults the teams",
"The referee consults the other match officials."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.1",
"en": "Rules of the Game 10.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "Q10-2022-039",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Gegen einen Spieler wird eine Zeitstrafe (gelb/rot) ausgesprochen. Wann darf sich die Mannschaft wieder ergänzen?",
"en": "A player is given a time penalty (yellow and red). When may the team make itself up to strength again?"
},
"a": {
"de": [
"Wenn beide Mannschaften zusammen 10 Gutbälle erzielt haben.",
"Am Ende des Satzes, in dem die Zeitstrafe ausgesprochen wurde",
"Wenn die gegnerische Mannschaft 10 Gutbälle erzielt hat.",
"Nach 2 Minuten"
],
"en": [
"When both teams together have scored 10 points.",
"At the end of the set in which the time penalty was given",
"When the opposing team has scored 10 points.",
"After 2 minutes"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.1",
"en": "Rules of the Game 10.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "CS-2022-025",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wann ist die Spielberechtigung zu prüfen?",
"en": "When does eligibility to play have to be checked?"
},
"a": {
"de": [
"An jedem Spieltag durch den Schiedsrichter / die Spielleitung",
"Nur vor Beginn der jeweiligen Spielrunde",
"Wenn sich die Mannschaft für weiterführende Spiele (Meisterschaften) qualifiziert hat",
"Die Spielberechtigung muss nicht kontrolliert werden, man kennt sich"
],
"en": [
"On every match day, by the referee or the competition management",
"Only before the start of the respective round",
"When the team has qualified for further rounds or championships",
"Eligibility does not have to be checked, everyone knows each other"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.3.4.1",
"en": "SpOF 4.3.3.4.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "CS-2022-026",
"ch": 15,
"scope": "fed",
"q": {
"de": "Nach wie vielen Einsätzen für dieselbe Mannschaft in einer Leistungsklasse spielt sich ein aktiver Spieler in dieser Mannschaft fest?",
"en": "After how many appearances for the same team in one division does an active player become tied to that team?"
},
"a": {
"de": [
"Nach drei Einsätzen (Spielen) in einer Leistungsklasse",
"Nach einem Einsatz (Spiel) in einer Leistungsklasse",
"Nach zwei Einsätzen (Spielen) in einer Leistungsklasse",
"Nach vier Einsätzen (Spielen) in einer Leistungsklasse"
],
"en": [
"After three appearances in one division",
"After one appearance in one division",
"After two appearances in one division",
"After four appearances in one division"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.4.1.2",
"en": "SpOF 4.3.4.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "CS-2022-027",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wann wird ein Spieler mit einem „X“ im Spielbericht gekennzeichnet, so dass erkennbar ist, dass er gespielt hat?",
"en": "When is a player marked with an X on the match report to show that he has played?"
},
"a": {
"de": [
"Mit dem 1. Einsatz / Einwechslung beim Spiel",
"Grundsätzlich, wenn er auf dem Spielformular steht",
"Eine Kennzeichnung ist nicht notwendig",
"Wenn seine Spielberechtigung vorliegt"
],
"en": [
"With his first appearance or substitution in the match",
"In principle, as soon as he is on the match report",
"No marking is needed",
"Once his eligibility document is available"
]
},
"c": 0,
"ref": "",
"origin": "fbd",
"tr": true
},
{
"id": "CA-2022-017",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wer ist für die Überwachung und Einhaltung der Zeitstrafe verantwortlich?",
"en": "Who is responsible for monitoring and enforcing the time penalty?"
},
"a": {
"de": [
"Der Schiedsrichter",
"Der Anschreiber",
"Der Trainer / Betreuer",
"Die Spielleitung"
],
"en": [
"The referee",
"The scorer",
"The coach or official",
"The competition management"
]
},
"c": 0,
"ref": {
"de": "SRO-Anlage 5-1",
"en": "SRO annex 5-1"
},
"origin": "fbd",
"tr": true
},
{
"id": "CS-2022-028",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie wird ein kampflos gewonnenes Spiel auf zwei Gewinnsätze (bis 11) gewertet?",
"en": "How is a walkover scored in a match played to two sets won, each set to 11?"
},
"a": {
"de": [
"22:00",
"22:11",
"22:15",
"22:21"
],
"en": [
"22:00",
"22:11",
"22:15",
"22:21"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.6.1.2",
"en": "SpOF 4.6.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C1-2022-020",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Bei Hallenspielen entstehen Fehler, wenn der Ball nach der Annahme oder dem Zuspiel bestimmte Halleneinrichtungen berührt. Um welche Halleneinrichtung handelt es sich dabei?",
"en": "Indoors, a fault occurs if the ball touches certain hall fittings after the reception or the set. Which fittings are these?"
},
"a": {
"de": [
"Hallendecke jenseits der Mittellinie, wenn der Ball nach Annahme oder Zuspiel hinüberfliegt",
"Hallendecke direkt über der eigenen Spielfeldhälfte",
"Geräte die von der Decke in der eigenen Spielhälfte hinunter ragen",
"Pfosten oder Leine (Band / Netz) nach dem Ersatzpfosten (außerhalb des Spielfeldes)"
],
"en": [
"The ceiling beyond the centre line when the ball crosses over after the reception or the set",
"The ceiling directly above your own half of the court",
"Fittings projecting down from the ceiling over your own half",
"The post or net beyond the substitute post, that is outside the court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2",
"en": "Rules of the Game 1.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C1-2022-023",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Ist es erlaubt, in der Halle das Netz (Band, Leine) an der Wand, also außerhalb des Spielfeldes, zu befestigen?",
"en": "Indoors, is it allowed to fix the net to the wall, that is outside the court?"
},
"a": {
"de": [
"Ja",
"Nein",
"Nur mit Zustimmung der beiden Mannschaftsführer",
"Nein, weil das Netz das Standardmaß von 20 m hat."
],
"en": [
"Yes",
"No",
"Only with both team captains' consent",
"No, because the net has the standard length of 20 m."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2",
"en": "Rules of the Game 1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C1-2022-004",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Kann der Gewinner der Auslosung den Ball des Gegners wählen?",
"en": "May the winner of the toss choose the opponent's ball?"
},
"a": {
"de": [
"Ja",
"Nein",
"Nur mit Zustimmung des Gegners",
"Nur mit Zustimmung des Schiedsrichters"
],
"en": [
"Yes",
"No",
"Only with the opponent's consent",
"Only with the referee's consent"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.5, Erläuterung Ballwahl",
"en": "Rules of the Game 1.6.5"
},
"origin": "fbd",
"tr": true
},
{
"id": "C1-2022-003",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Muss vor Spielbeginn ausgelost werden?",
"en": "Does a toss have to be held before the match?"
},
"a": {
"de": [
"Ja",
"Nein, da Mannschaft „A“ grundsätzlich das Wahlrecht hat",
"Nur wenn ein Mannschaftsführer darauf besteht",
"Nur wenn beide Mannschaften darauf bestehen"
],
"en": [
"Yes",
"No, because team A always has the choice",
"Only if a team captain insists",
"Only if both teams insist"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.5",
"en": "Rules of the Game 1.5"
},
"origin": "fbd",
"tr": true
},
{
"id": "C2-2022-031",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Durch wen darf ein Time-Out angemeldet werden?",
"en": "Who may request a time-out?"
},
"a": {
"de": [
"Durch den Mannschaftsführer oder Trainer / Betreuer",
"Nur durch den Mannschaftsführer",
"Alle auf dem Spielformular eingetragenen Spieler und Trainer/Betreuer (Mannschaftskader)",
"Nur durch den Trainer oder Betreuer"
],
"en": [
"By the team captain or the coach or official",
"By the team captain only",
"Everyone entered on the match report: players and coaches or officials (the squad)",
"By the coach or official only"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.4, Erläuterung Time out (Schulungsmappe)",
"en": "Training Manual for Referees, 3.4, explanation: time-out"
},
"origin": "fbd",
"tr": true
},
{
"id": "C2-2022-002",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Wann darf Mannschaft „A“ ohne Angaberecht auswechseln bzw. sich ergänzen?",
"en": "In youth competition, when may team A substitute or make an addition?"
},
"a": {
"de": [
"Bei einer Spielunterbrechung durch den Schiedsrichter",
"Während des Spielgangs",
"Nach jedem Spielgang",
"Nur bei Angabe von Mannschaft „B“"
],
"en": [
"When the referee has stopped play",
"During the rally",
"After every rally",
"Only when team B is serving"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.2",
"en": "Rules of the Game 2.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C3-2022-001",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Bei einem Spiel auf Zeit soll nach unentschiedenem Ausgang eine Entscheidung herbeigeführt werden, das Spiel wird verlängert. Über welche Zeit läuft diese Verlängerung?",
"en": "In a time-limited match that ends level, a decision has to be reached and the match goes to extra time. How long is that extra time?"
},
"a": {
"de": [
"Über 2 x 5 Minuten",
"Über 2 x 2 ½ Minuten",
"Über 2 x 7 ½ Minuten",
"Diese Regelung gibt es nicht mehr, da nur noch auf Sätze gespielt wird."
],
"en": [
"2 x 5 minutes",
"Over 2 x 2½ minutes",
"Over 2 x 7½ minutes",
"This rule no longer exists because matches are now only played in sets."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.3.1",
"en": "Rules of the Game 3.3.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C3-2022-016",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Die Zeitnahme erfolgt für 4 Felder zentral. Du stellst als Schiedsrichter anhand deiner Uhr fest, dass die Zeit abgelaufen ist, ohne dass zentral abgepfiffen wurde. Wie verhältst du dich?",
"en": "Timing is handled centrally for 4 courts. As referee you see from your own watch that time is up but no central whistle has come. How do you act?"
},
"a": {
"de": [
"5 Spielsekunden auszählen und selbst abpfeifen",
"Warten bis der zentrale Abpfiff erfolgt",
"Sofort selbst abpfeifen",
"Das Spielen auf Zeit gibt es nicht mehr"
],
"en": [
"Count down the last 5 seconds and blow the final whistle yourself",
"Wait for the central whistle",
"Blow the whistle yourself straight away",
"Time-limited play no longer exists"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.2.2; Schulungsmappe 9.2.1, Erläuterung zentrale Zeitnahme",
"en": "Rules of the Game 3.2.2; Training Manual for Referees, 9.2.1, explanation: central timing"
},
"origin": "fbd",
"tr": true
},
{
"id": "C3-2022-024",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Wann müssen in einem Entscheidungssatz bis 11 die Seiten gewechselt werden?",
"en": "In a deciding set to 11, when do the ends have to change?"
},
"a": {
"de": [
"Nachdem eine Mannschaft 6 Gutbälle erzielt hat",
"Nachdem beide Mannschaften zusammen 6 Gutbälle erzielt haben",
"Nachdem eine Mannschaft 5 Gutbälle erzielt hat",
"Jederzeit, sobald der Schiedsrichter dies anzeigt"
],
"en": [
"Once a team has scored 6 points",
"Once both teams together have scored 6 points",
"Once a team has scored 5 points",
"At any time once the referee signals it"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.4",
"en": "Rules of the Game 3.1.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "C3-2022-029",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Wie lange dauert ein von einer Mannschaft genommenes Time-out?",
"en": "How long does a time-out taken by a team last?"
},
"a": {
"de": [
"30 Sek.",
"45 Sek.",
"50 Sek.",
"20 Sek."
],
"en": [
"30 sec",
"45 sec",
"50 sec",
"20 sec"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.4",
"en": "Rules of the Game 3.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "C3-2022-030",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Wie viele Time-Outs hat eine Mannschaft pro Satz?",
"en": "How many time-outs does a team have per set?"
},
"a": {
"de": [
"1",
"2",
"3",
"4"
],
"en": [
"1",
"2",
"3",
"4"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.4",
"en": "Rules of the Game 3.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "C5-2022-007",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Darf ein Ball beim Rückschlag mit der Faust über die Leine (Band / Netz) „geschoben“ werden?",
"en": "On the return, may the ball be pushed over the net with the fist?"
},
"a": {
"de": [
"Nein",
"Ja",
"Nur, wenn der Ball direkt über der Leine (Band / Netz) gespielt wird",
"Ja, wenn der Ball schwierig zu spielen ist"
],
"en": [
"No",
"Yes",
"Only if the ball is played directly above the net",
"Yes, if the ball is difficult to play"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.1",
"en": "Rules of the Game 5.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C5-2022-006",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Darf ein Spieler den Ball zweimal berühren, bevor er in das Gegenfeld geschlagen wird? Keine Blocksituation!",
"en": "May a player touch the ball twice before it is hit into the opposite court? No block situation."
},
"a": {
"de": [
"Nein",
"Ja",
"Nur beim Rückschlag",
"Nur bei der Annahme"
],
"en": [
"No",
"Yes",
"Only on the return",
"Only on the reception"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.2, Spielregeln 7.1",
"en": "Rules of the Game 5.2, Rules of the Game 7.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C5-2022-005",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Wann darf beim Schlag die Hand geöffnet sein?",
"en": "When may the hand be open when hitting?"
},
"a": {
"de": [
"Beim Schlag mit dem Arm",
"Beim Schlag mit der Faust",
"Wenn der Trainer es erlaubt",
"Wenn der Schiedsrichter es erlaubt"
],
"en": [
"When hitting with the arm",
"When hitting with the fist",
"When the coach allows it",
"When the referee allows it"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.3",
"en": "Rules of the Game 5.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-011",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Darf ein Hinterspieler eine Angabe ausführen?",
"en": "May a back-court player take the service?"
},
"a": {
"de": [
"Ja",
"Nein",
"Nur mit Einverständnis seines Mannschaftsführers",
"Nur wenn er auch Mannschaftsführer ist"
],
"en": [
"Yes",
"No",
"Only with his team captain's agreement",
"Only if he is also the team captain"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.1",
"en": "Rules of the Game 6.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-022",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Eine Angabe kann im Stehen und aus dem Laufen erfolgen. Welche Bedingungen müssen für eine fehlerfreie Ausführung beachtet werden?",
"en": "A service may be taken standing or on the move. What conditions have to be met for it to be faultless?"
},
"a": {
"de": [
"Der Ball muss geschlagen worden sein, bevor die erste Bodenberührung mit einem Fuß vor der Angabelinie erfolgt",
"Die erste beliebige Bodenberührung erfolgt vor dem Schlag gegen den Ball",
"Gleichzeitiges Schlagen des Balles und Landen mit einem Bein auf der Angabelinie",
"Die erste beliebige Bodenberührung kann überall erfolgen"
],
"en": [
"The ball must have been hit before the first ground contact with a foot in front of the service line",
"The first ground contact of any kind occurs before the ball is hit",
"Hitting the ball and landing with one leg on the service line at the same time",
"The first ground contact may be anywhere"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3.2",
"en": "Rules of the Game 6.3.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-012",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Mannschaft „A“ hat Angabe. Wo dürfen die Mitspieler des Anschlägers sich während der Angabe nicht aufhalten?",
"en": "Team A is serving. Where may the server's team-mates not be during the service?"
},
"a": {
"de": [
"In der Spielfeldhälfte des Gegners",
"In der eigenen Spielfeldhälfte",
"Innerhalb des eigenen Auslaufes",
"Im eigenen 3-m-Raum"
],
"en": [
"In the opponent's half of the court",
"In your own half of the court",
"Inside your own buffer zone",
"In your own 3 m area"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3.1",
"en": "Rules of the Game 6.3.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-008",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Wann ist eine Angabe bzw. ein Rückschlag gültig ausgeführt und führt zum Gutball für die schlagende Mannschaft? Wenn der Ball …",
"en": "When is a service or return validly executed so that the hitting team wins the point? When the ball …"
},
"a": {
"de": [
"Den Boden im Gegenfeld zweimal berührt",
"Die Leine (Band / Netz) berührt",
"Einen Auswechselspieler außerhalb des Auslaufes berührt",
"Den Boden außerhalb des Gegenfeldes berührt"
],
"en": [
"Touches the ground twice in the opposite court",
"Touches the net",
"Touches a substitute outside the buffer zone",
"Touches the ground outside the opposite court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.2.1",
"en": "Rules of the Game 6.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-010",
"ch": 6,
"scope": "ifa",
"q": {
"de": "In welcher Haltung kann eine Angabe nicht regelgerecht ausgeführt werden?",
"en": "In which position can a service not be taken in accordance with the rules?"
},
"a": {
"de": [
"Im Knien",
"Im Stehen",
"Im Gehen",
"Im Laufen"
],
"en": [
"Kneeling",
"Standing",
"While walking",
"While running"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3",
"en": "Rules of the Game 6.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "C6-2022-009",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Wo und wie kann eine Angabe gültig begonnen und beendet werden?",
"en": "Where and how may a service validly begin and end?"
},
"a": {
"de": [
"Beginn auf einem Punkt im eigenen Feld, Ende mit der ersten Bodenberührung vor der 3-m-Angabelinie",
"Außerhalb des Spielfeldes und Ende im 3-m-Raum",
"Anlauf im Feld, Sprung, danach erste Bodenberührung außerhalb des Feldes",
"Aus dem Gehen, Standbein rutscht auf die 3-m-Angabelinie, danach Schlagen des Balles"
],
"en": [
"From a point on the playing surface, finishing in front of the 3 m service line",
"Outside the court, finishing in the 3 m area",
"Run-up inside the court, jump, then first ground contact outside the court",
"From walking, the standing leg slides onto the 3 m service line, then the ball is hit"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3, 6.3.2",
"en": "Rules of the Game 6.2.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "C7-2022-015",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein aus dem Gegenfeld gültig geschlagener Ball wird von einem Spieler der Mannschaft „B“ angenommen und von einem anderen Spieler der Mannschaft „B“ weitergespielt. Danach schlagen zwei (2) weitere Spieler der Mannschaft „B“ den Ball gleichzeitig über die Leine (Band / Netz) in das Feld „A“. Wie ist zu entscheiden?",
"en": "A ball validly hit from the opposite court is received by a player of team B and played on by another player of team B. Two further players of team B then hit the ball simultaneously over the net into court A. How is this decided?"
},
"a": {
"de": [
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“",
"Kein Fehler, weiterspielen",
"Kein Fehler. Wiederholung der letzten Angabe"
],
"en": [
"Point for team A",
"Point for team B",
"No fault, play on",
"No fault. The last service is replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.1.1",
"en": "Rules of the Game 7.1.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C7-2022-018",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Spieler der Mannschaft „A“ wird beim Spielen des Balles durch den Schiedsrichter oder einen Linienrichter behindert. Wie entscheidest du?",
"en": "A player of team A is obstructed by the referee or a linesman while playing the ball. What is your decision?"
},
"a": {
"de": [
"Kein Fehler. Wiederholung der letzten Angabe",
"Kein Fehler, weiterspielen",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“"
],
"en": [
"No fault. The last service is replayed",
"No fault, play on",
"Point for team A",
"Point for team B"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.8.2",
"en": "Rules of the Game 7.8.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C7-2022-019",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Spieler der Mannschaft „A“ wird beim Versuch, den Ball innerhalb des Auslaufes zu spielen, durch einen nicht am Spiel beteiligten Zuschauer behindert. Wie ist zu entscheiden?",
"en": "A player of team A is obstructed by an uninvolved spectator while trying to play the ball inside the buffer zone. How is this decided?"
},
"a": {
"de": [
"Kein Fehler. Wiederholung der letzten Angabe",
"Kein Fehler, weiterspielen",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“"
],
"en": [
"No fault. The last service is replayed",
"No fault, play on",
"Point for team A",
"Point for team B"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.8.2",
"en": "Rules of the Game 7.8.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C7-2022-014",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Nach erfolgter Ballannahme springt der Ball vom Boden des eigenen Feldes unter der Leine (Band / Netz) hindurch in den Luftraum des Gegenfeldes. Wann darf der Ball gültig zurückgeschlagen werden?",
"en": "After the reception the ball bounces off your own court and passes under the net into the airspace of the opposite court. When may it validly be played back?"
},
"a": {
"de": [
"Mit dem zweiten Schlag",
"Er darf nicht weitergespielt werden",
"Mit dem dritten Schlag",
"Nachdem er im Gegenfeld den Boden berührt hat"
],
"en": [
"With the second hit",
"It may not be played on",
"With the third hit",
"Once it has touched the ground in the opposite court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.5",
"en": "Rules of the Game 7.5"
},
"origin": "fbd",
"tr": true
},
{
"id": "C7-2022-013",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wann darf der Ball, der direkt unter der Leine (Band / Netz) hindurch in den Luftraum des Gegenfeldes gespielt wird, noch gültig zurückgespielt werden?",
"en": "When may a ball played directly under the net into the airspace of the opposite court still validly be played back?"
},
"a": {
"de": [
"Er darf nicht weitergespielt werden",
"Bevor er im Gegenfeld den Boden berührt",
"Bevor er im Gegenfeld die 3-m-Linie berührt",
"Bevor der Gegner den Ball berührt"
],
"en": [
"It may not be played on",
"Before it touches the ground in the opposite court",
"Before it touches the 3 m line in the opposite court",
"Before an opponent touches the ball"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.2.1",
"en": "Rules of the Game 7.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "C9-2022-021",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Darf ein Schiedsrichter während eines laufenden Spieles ausgewechselt werden?",
"en": "May a referee be replaced during a match in progress?"
},
"a": {
"de": [
"Nein, außer der Schiedsrichter kann aus gesundheitlichen Gründen das Spiel nicht bis zum Spielende leiten und ein qualifizierter Schiedsrichter vor Ort ihn vertritt",
"Ja, wenn der Schiedsrichter sich für das nächste Spiel warmmachen muss und ein qualifizierter Schiedsrichter vor Ort ihn vertritt",
"Ja, wenn ein qualifizierter Schiedsrichter vor Ort ihn ersetzt.",
"Ja, denn jeder kann Schiedsrichter machen"
],
"en": [
"No, unless the referee is unable to finish the match for health reasons and a qualified referee on site stands in for him",
"Yes, if the referee has to warm up for the next match and a qualified referee on site stands in for him.",
"Yes, if a qualified referee on site replaces him.",
"Yes, because anyone can referee"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9",
"en": "Rules of the Game 9"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-015",
"ch": 15,
"scope": "fed",
"q": {
"de": "An einem Spieltag ist das erste Spiel um 10:00 Uhr angesetzt. Die anreisende Mannschaft für dieses Spiel ist aber erst um 10:25 Uhr spielbereit, da sie verzögert anreist. Wie ist zu entscheiden?",
"en": "On a match day the first match is scheduled for 10:00. The visiting team is delayed and only ready to play at 10:25. How is this decided?"
},
"a": {
"de": [
"Der SR weist die Heimmannschaft auf die sportliche Fairness hin und versucht das Spiel durchzuführen",
"Das Spiel findet auf jeden Fall statt",
"Das Spiel findet statt, auch wenn die Heimmannschaft es nicht möchte",
"Ausschließlich der Schiedsrichter entscheidet"
],
"en": [
"The referee reminds the home team of fair play and tries to get the match played",
"The match takes place in any case",
"The match takes place even if the home team does not want it to",
"The referee decides alone"
]
},
"c": 0,
"ref": {
"de": "SpOF 6.2.4.4.1",
"en": "SpOF 6.2.4.4.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-019",
"ch": 15,
"scope": "fed",
"q": {
"de": "Bei einer Hallenmeisterschaft verlässt ein Spieler bei einer Spielunterbrechung im ersten Satz das Spielfeld ohne Abmeldung beim Schiedsrichter und setzt sich auf die Bank. Wie ist zu entscheiden?",
"en": "At an indoor championship a player leaves the court during a stoppage in the first set without notifying the referee and sits down on the bench. How is this decided?"
},
"a": {
"de": [
"Die Mannschaft muss mit vier Spielern das Spiel beenden und im folgenden Spiel auch auf diesen Spieler verzichten",
"Der Spieler darf im zweiten Satz wieder eingesetzt werden",
"Der Spieler ist für das laufende und die 2 folgenden Spiele gesperrt und darf im laufenden Spiel nicht ergänzt werden",
"Der Trainer/Betreuer meldet ihn nachträglich ab und kann einen Auswechselspieler einsetzen"
],
"en": [
"The team has to finish the match with four players and must also do without that player in the next match",
"The player may return in the second set",
"The player is suspended for the current match and the next two matches, and may not be replaced in the current match",
"The coach or official reports him off afterwards and may bring on a substitute"
]
},
"c": 0,
"ref": {
"de": "SpOF Anlage 4 (RuVO) 2.3.7",
"en": "SpOF annex 4 (RuVO) 2.3.7"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-007",
"ch": 15,
"scope": "fed",
"q": {
"de": "Darf nach einem Platzverweis (rote Karte) der betroffene Spieler während der Sperrfrist in anderen Spielklassen eingesetzt werden?",
"en": "After a sending off (red card), may the player concerned play in other divisions during the suspension?"
},
"a": {
"de": [
"Nein",
"Ja",
"Ja, es weiß ja niemand",
"Es gilt nur für eine Spielklasse"
],
"en": [
"No",
"Yes",
"Yes, nobody will know",
"It applies to one division only"
]
},
"c": 0,
"ref": {
"de": "SpOF 6.2.4.3",
"en": "SpOF 6.2.4.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-018",
"ch": 15,
"scope": "fed",
"q": {
"de": "Ein Verein spielt mit seiner 1. und 2. Mannschaft in der gleichen Leistungsklasse. Ein Spieler absolviert am 1. Spieltag zwei Spiele für die 2. Mannschaft und am 2. Spieltag ein Spiel für die 1. Mannschaft seines Vereins. In welcher Mannschaft ist der Spieler festgespielt?",
"en": "A club fields its 1st and 2nd team in the same division. A player plays two matches for the 2nd team on match day 1 and one match for the 1st team on match day 2. To which team is he now tied?"
},
"a": {
"de": [
"Er ist gar nicht festgespielt",
"Er ist in der 1. Mannschaft festgespielt",
"Er ist in der 2. Mannschaft festgespielt",
"Bereits mit dem ersten Spieleinsatz"
],
"en": [
"He is not tied to any team",
"He is tied to the 1st team",
"He is tied to the 2nd team",
"From the very first appearance"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.3.5.1; SpOF 4.3.4.1.2",
"en": "SpOF 4.3.3.5.1; SpOF 4.3.4.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-009",
"ch": 15,
"scope": "fed",
"q": {
"de": "Eine Verspätung (Stau, Glatteis, etc.) infolge Nutzung privater Verkehrsmittel gilt als …?",
"en": "A delay caused by using private transport (traffic jam, black ice) counts as …?"
},
"a": {
"de": [
"Verschuldet",
"Unverschuldet",
"Unwesentlich",
"Verschuldet, wenn der Schiedsrichter darauf besteht"
],
"en": [
"The team's own fault",
"Not the team's fault",
"Immaterial",
"Correct, if the referee insists"
]
},
"c": 0,
"ref": {
"de": "SpOF 6.2.4.4.1",
"en": "SpOF 6.2.4.4.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-021",
"ch": 15,
"scope": "fed",
"q": {
"de": "Was passiert, wenn bei einem Meisterschaftsspiel in der Spielrunde die Spielberechtigung eines Spielers fehlt?",
"en": "What happens if a player's eligibility document is missing at a championship match during the season?"
},
"a": {
"de": [
"Er darf spielen. Die Spielberechtigung muss innerhalb von 3 Werktagen nach dem entsprechenden Spieltag bei der Staffelleitung vorgelegt werden.",
"Er darf nicht spielen",
"Er darf gegen eine sofortige Strafzahlung spielen",
"Er darf spielen. Die Spielberechtigung muss bis zum nächsten Spieltag bei der Staffelleitung vorgelegt werden."
],
"en": [
"He may play. The eligibility document has to be submitted to the division manager within 3 working days after that match day.",
"He may not play",
"He may play on payment of an immediate fine",
"He may play. The eligibility document has to be submitted to the division manager by the next match day."
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.3.4.3",
"en": "SpOF 4.3.3.4.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-001",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welche Bälle dürfen in der höchsten Männerklasse von Faustball Deutschland gespielt werden?",
"en": "Which balls may be used in the top men's division of Faustball Deutschland?"
},
"a": {
"de": [
"Bälle mit vorhandener Genehmigung der IFA (Signet)",
"Bälle, die nicht auf der aktuellen Ballliste von Faustball Deutschland stehen",
"Weiß-rote Bälle für Frauen",
"Weiß-blaue Bälle für Schüler"
],
"en": [
"Balls carrying IFA approval (the signet)",
"Balls not on the current Faustball Deutschland ball list",
"White and red balls for women",
"White and blue balls for juniors"
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland; aktuelle Ballliste von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations; current Faustball Deutschland ball list"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-016",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welche Konsequenz ergibt sich für eine Mannschaft, die einen Spieler unberechtigt in Meisterschaftsspielen in Turnierform eingesetzt hat?",
"en": "What are the consequences for a team that has fielded an ineligible player in championship matches played as a tournament?"
},
"a": {
"de": [
"Alle Spiele werden als verloren gewertet",
"Keine",
"Alle Spiele müssen wiederholt werden",
"Die gewonnenen Spiele zählen, die verlorenen müssen wiederholt werden"
],
"en": [
"All matches are recorded as lost",
"None",
"All matches have to be replayed",
"The matches won count, the ones lost have to be replayed"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.3.6; SpOF 4.3.3.3.1",
"en": "SpOF 4.3.3.6; SpOF 4.3.3.3.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-025",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welchen Zeitraum versteht man unter Spieljahr für die Feldsaison?",
"en": "What period is meant by the playing year for the outdoor season?"
},
"a": {
"de": [
"01.01. – 31.12.",
"01.05. – 30.09.",
"01.04. – 28.02.",
"01.07. – 30.06."
],
"en": [
"1 Jan – 31 Dec",
"1 May – 30 Sep",
"1 Apr – 28 Feb",
"1 Jul – 30 Jun"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.2",
"en": "SpOF 4.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-008",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welcher Zeitraum gilt für das Spieljahr „Hallensaison“?",
"en": "What period applies to the playing year for the indoor season?"
},
"a": {
"de": [
"01.07. – 30.06.",
"01.01. – 31.12.",
"01.04. – 31.03.",
"01.10. – 01.04."
],
"en": [
"1 Jul – 30 Jun",
"1 Jan – 31 Dec",
"1 Apr – 31 Mar",
"1 Oct – 1 Apr"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.2",
"en": "SpOF 4.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-026",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie lang ist die Pause zwischen dem 1. und 2. Satz grundsätzlich?",
"en": "How long is the interval between the 1st and 2nd set as a rule?"
},
"a": {
"de": [
"90 sec",
"5 min",
"10 min",
"So lange, bis beide Mannschaften wieder spielbereit sind"
],
"en": [
"90 sec",
"5 min",
"10 min",
"Until both teams are ready to play again."
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-033",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie lange dauert eine generelle Sperrfrist beim Vereinswechsel?",
"en": "How long is the general waiting period when changing clubs?"
},
"a": {
"de": [
"3 Monate",
"5 Monate",
"Sofort spielberechtigt",
"3 Wochen"
],
"en": [
"3 months",
"5 months",
"Eligible immediately",
"3 weeks"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.3.5.2.1",
"en": "SpOF 4.3.5.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "BS-2023-034",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie viele Spiele darf ein Jugendspieler bzw. eine Jugendspielerin an einem Tag bestreiten?",
"en": "How many matches may a youth player play in one day?"
},
"a": {
"de": [
"maximal 5",
"maximal 4",
"es gibt keine Einschränkung",
"es hängt von der körperlichen Verfassung des Spielers bzw. der Spielerin ab"
],
"en": [
"at most 5",
"at most 4",
"there is no restriction",
"it depends on the player's physical condition"
]
},
"c": 0,
"ref": "",
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-032",
"ch": 15,
"scope": "fed",
"q": {
"de": "Bei wie vielen Veranstaltungen darf ein Spieler bzw. eine Spielerin an einem Tag spielen?",
"en": "At how many events may a player play in one day?"
},
"a": {
"de": [
"1",
"2",
"3",
"4"
],
"en": [
"1",
"2",
"3",
"4"
]
},
"c": 0,
"ref": "",
"origin": "fbd",
"tr": true
},
{
"id": "BS-2022-027",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie wird ein kampflos gewonnenes Spiel auf 3 Gewinnsätze bis 11 gewertet?",
"en": "How is a walkover recorded in a match to 3 sets won, played to 11?"
},
"a": {
"de": [
"33:00",
"33:22",
"33:11",
"33:15"
],
"en": [
"33:00",
"33:22",
"33:11",
"33:15"
]
},
"c": 0,
"ref": {
"de": "SpOF 4.6.1.2",
"en": "SpOF 4.6.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "B1-2022-002",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Du bist als Schiedsrichter in der Landesliga Frauen eingesetzt. Welche Vorgaben entsprechen den gültigen Spielregeln?",
"en": "You are refereeing in the women's regional league. Which specifications match the rules in force?"
},
"a": {
"de": [
"Leinenhöhe (Band/Netz) 1,90 m",
"Leinen- (Band / Netz) Höhe 2,00 m",
"Hinterer Auslauf 3,00 m",
"Linienbreite: mind. 15 cm"
],
"en": [
"Net height 1.90 m",
"Net height 2.00 m",
"Rear buffer zone 3.00 m",
"Line width: at least 15 cm"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.3, 1.2 und 1.3",
"en": "Rules of the Game 1.1.3, 1.2 and 1.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "B1-2022-003",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Du überprüfst vor Spielbeginn die aufgelegten Bälle in der Landesliga Männer. Welche Werte sind zulässig?",
"en": "Before the start you check the balls presented in the men's regional league. Which values are permitted?"
},
"a": {
"de": [
"Der Ball wiegt 355 Gramm",
"Der Ball wiegt 330 Gramm",
"Der Luftdruck beträgt 0,85 bar",
"Der Ballumfang ist egal"
],
"en": [
"The ball weighs 355 grams",
"The ball weighs 330 grams",
"The air pressure is 0.85 bar",
"The circumference does not matter"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.4 und Regelungen für Altersklassen",
"en": "Rules of the Game 1.4 and Annex – Regulations for age groups"
},
"origin": "fbd",
"tr": true
},
{
"id": "B1-2022-012",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft legt vor dem Spiel beim Schiedsrichter zwei Bälle auf und ist zur Angabe berechtigt. Nachdem der erste Ball weit ins Aus fliegt, kommt der zweite Ball ins Spiel. Nachdem der erste Ball wieder zurückkommt, fordert die Mannschaft, ihren ersten Ball wieder ins Spiel zu bringen. Wie ist zu entscheiden?",
"en": "Before the match a team presents two balls to the referee and has the right to serve. After the first ball flies far out, the second ball comes into play. When the first ball comes back, the team demands that it be brought into play again. How is this decided?"
},
"a": {
"de": [
"Mit dem zweiten – also derzeit im Spiel befindlichen – Ball weiterspielen",
"Austauschen, d.h., den ersten Ball ins Spiel bringen",
"Austauschen, d. h. den ersten Ball mit Zustimmung des Gegners ins Spiel bringen",
"Mit dem Ball des Gegners sofort weiterspielen"
],
"en": [
"Play on with the second ball, the one currently in play",
"Exchange it, that is bring the first ball into play",
"Exchange it, that is bring the first ball into play with the opponent's consent",
"Play on immediately with the opponent's ball"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6.3, Erläuterung Balltausch",
"en": "Rules of the Game 1.6.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "B1-2022-024",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft legt vor dem Spiel beim Schiedsrichter zwei Bälle auf und ist zur Angabe berechtigt. Nachdem der erste Ball weit ins Aus fliegt, kommt der zweite Ball ins Spiel, auch dieser fliegt weit weg ins Aus. Nun gibst Du einen Ball des Gegners ins Spiel. Nachdem der erste Ball wieder zurückkommt, fordert die Mannschaft ihren ersten Ball wieder ins Spiel zu bringen. Wie ist zu entscheiden?",
"en": "Before the match a team presents two balls to the referee and has the right to serve. The first ball flies far out, the second ball comes into play and also flies far out. You then bring an opponent's ball into play. When the first ball comes back, the team demands that it be brought into play again. How is this decided?"
},
"a": {
"de": [
"Sofort, nach Ende des Spielgangs, austauschen",
"Nach Ende des Satzes austauschen",
"Mit Zustimmung des Gegners austauschen",
"Nicht austauschen. Mit dem Ball des Gegners weiterspielen"
],
"en": [
"Exchange it immediately, at the end of the rally",
"Exchange it at the end of the set",
"Exchange it with the opponent's consent",
"Do not exchange it. Play on with the opponent's ball"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6.4",
"en": "Rules of the Game 1.6"
},
"origin": "fbd",
"tr": true
},
{
"id": "B1-2022-013",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie ist zu entscheiden, wenn keine Mannschaft vor Beginn eines Spieles spielfähige Bälle auflegt?",
"en": "How is it decided if neither team presents balls fit for play before the match?"
},
"a": {
"de": [
"Das Spiel findet nicht statt",
"Der Spielbeginn wird verschoben bis ein Ball vorhanden ist",
"Es wird mit einem nicht spielfähigen Ball gespielt",
"Es muss gespielt werden"
],
"en": [
"The match does not take place",
"The start is postponed until a ball is available",
"The match is played with a ball that is not fit for play",
"Play has to go ahead"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6.2",
"en": "Rules of the Game 1.6.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "B3-2022-034",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Ein Spiel geht in den Entscheidungssatz. Der Schiedsrichter versäumt es, beim 6. Gutball die Seiten wechseln zu lassen, und wird beim Stand von 7:5 vom Anschreiber auf den nicht erfolgten Seitenwechsel aufmerksam gemacht. Wie hat der Schiedsrichter zu entscheiden?",
"en": "A match goes to a deciding set. The referee misses the change of ends at the 6th point and is alerted by the scorer at 7:5 that it did not happen. How should the referee decide?"
},
"a": {
"de": [
"Der Schiedsrichter unterbricht das Spiel und bespricht die Entscheidung mit beiden Mannschaftsführern. Der Satz wird bei dem Spielstand, bei dem eine Mannschaft 6 Gutbälle erzielt hatte, mit Seitenwechsel und neuer Angabe fortgesetzt.",
"Der Schiedsrichter lässt weiterspielen, bis der Satz entschieden ist.",
"Der Schiedsrichter lässt beim nächsten Fehler die Seiten und die Angabe wechseln. Das Spiel wird mit dem aktuellen Spielstand fortgesetzt.",
"Der Schiedsrichter bespricht mit den Trainern / Betreuern das weitere Vorgehen."
],
"en": [
"The referee stops play and discusses the decision with both captains: the set resumes at the score at which one team had reached 6 points, with a change of ends and a new service.",
"The referee lets play continue until the set is decided.",
"At the next fault the referee has the teams change ends and service. Play continues from the current score.",
"The referee discusses how to proceed with the coaches and officials."
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.4",
"en": "Rules of the Game 3.1.4"
},
"origin": "fbd",
"tr": true
},
{
"id": "B4-2022-010",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Der Schlagmann von Mannschaft „A“ hat den Ball von seinem Zuspieler über die Leine (Band/Netz) gespielt bekommen. Er platziert seinen Schlag auf die Mittellinie. Danach springt der Ball ohne Einwirkung des Gegners an die Leine (Band/Netz). Wie ist zu entscheiden?",
"en": "The attacker of team A receives the ball from his setter above the net. He places his hit onto the centre line. The ball then bounces into the net without any opponent touching it. How is this decided?"
},
"a": {
"de": [
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“",
"Kein Fehler, weiterspielen",
"Kein Fehler. Wiederholung der letzten Angabe"
],
"en": [
"Point for team A",
"Point for team B",
"No fault, play on",
"No fault. The last service is replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2; Spielregeln 4.3",
"en": "Rules of the Game 1.1.2; Rules of the Game 4.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "B6-2022-004",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Was ist bei einer Sprungangabe ein Fehler?",
"en": "What makes a jump service faulty?"
},
"a": {
"de": [
"Landen mit einem Bein zuerst auf oder hinter der Angabelinie",
"Gleichzeitiges Landen nach dem Schlag mit einem Bein vor und einem Bein hinter der Angabelinie",
"Gleichzeitiges Schlagen und Landen vor der Angabelinie",
"Nach dem Schlag landen mit einem Bein vor, mit dem zweiten Bein auf der Angabelinie"
],
"en": [
"Landing with one leg first on or behind the service line",
"Landing after the hit with one leg in front of and one behind the service line at the same time",
"Hitting and landing in front of the service line at the same time",
"After the hit, landing with one leg in front of and the other on the service line"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3",
"en": "Rules of the Game 6.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "B6-2022-030",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Wo muss bei der Sprungangabe der erste Kontakt mit dem Boden sein?",
"en": "On a jump service, where must the first contact with the ground be?"
},
"a": {
"de": [
"Vor der Angabelinie",
"Hinter der Angabelinie (im 3-m-Raum)",
"Gleichzeitiges Landen auf und hinter der Angabelinie",
"Auf der Angabelinie"
],
"en": [
"In front of the service line",
"Behind the service line (in the 3 m area)",
"Landing on and behind the service line at the same time",
"On the service line"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3",
"en": "Rules of the Game 6.3"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-023",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Darf der am Block unmittelbar beteiligte Spieler auch als erster den Ball im laufenden Spielgang spielen?",
"en": "May the player directly involved in the block also be the first to play the ball in the continuing rally?"
},
"a": {
"de": [
"Ja, bei angezeigtem Blockspiel gilt das nicht als erste Berührung",
"Ja, aber nur nach einmaligem Zuspiel",
"Gar nicht",
"Nein, er hatte schon eine Berührung"
],
"en": [
"Yes, where a block has been signalled this does not count as the first contact",
"Yes, but only after one set",
"Not at all",
"No, he has already had a contact"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6.1",
"en": "Rules of the Game 7.6.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-028",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Der Ball berührt nach einem Block die Hallendecke. Wie ist zu entscheiden?",
"en": "After a block the ball touches the ceiling. How is this decided?"
},
"a": {
"de": [
"Kein Fehler. Wiederholung der letzten Angabe",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“",
"Kein Fehler, weiterspielen"
],
"en": [
"No fault. The last service is replayed",
"Point for team A",
"Point for team B",
"No fault, play on"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6",
"en": "Rules of the Game 7.6"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-011",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Nach der Ballannahme durch den Mittelspieler der Mannschaft „A“ fliegt der Ball über die Leine (Band / Netz). Ein Mitspieler greift über die Leine und holt den Ball zurück, sodass der Schlagmann in eine optimale Position kommt und den Ball verwandelt. Wie ist zu entscheiden?",
"en": "After team A's middle player receives the ball it flies over the net. A team-mate reaches over the net and brings it back, so that the attacker gets into an ideal position and puts the ball away. How is this decided?"
},
"a": {
"de": [
"Gutball für Mannschaft „B“",
"Gutball für Mannschaft „A“",
"Kein Fehler, weiterspielen",
"Kein Fehler. Wiederholung der letzten Angabe"
],
"en": [
"Point for team B",
"Point for team A",
"No fault, play on",
"No fault. The last service is replayed"
]
},
"c": 1,
"ref": {
"de": "Spielregeln 7.5.1",
"en": "Rules of the Game 7.5.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-005",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Nach einem direkten Zuspiel aus dem Feld „A“ schlagen zwei Gegner den Ball gleichzeitig (Block) über dem Band. Unmittelbar danach berührt der Ball das Band. Wie ist zu entscheiden?",
"en": "After a direct set from court A, two opponents hit the ball simultaneously above the net (a block). Immediately afterwards the ball touches the net. How is this decided?"
},
"a": {
"de": [
"Kein Fehler. Wiederholung der letzten Angabe",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“",
"Kein Fehler, weiterspielen"
],
"en": [
"No fault. The last service is replayed",
"Point for team A",
"Point for team B",
"No fault, play on"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6",
"en": "Rules of the Game 7.6"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-006",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Nach einem direkten Zuspiel aus dem Feld „A“ schlagen zwei Gegner den Ball gleichzeitig (Block) über dem Band. Unmittelbar danach springt der Ball auf den Boden des Feldes „B“. Wie ist zu entscheiden?",
"en": "After a direct set from court A, two opponents hit the ball simultaneously above the net (a block). Immediately afterwards the ball bounces on the floor of court B. How is this decided?"
},
"a": {
"de": [
"Kein Fehler, weiterspielen",
"Kein Fehler. Wiederholung der letzten Angabe",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“"
],
"en": [
"No fault, play on",
"No fault. The last service is replayed",
"Point for team A",
"Point for team B"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6",
"en": "Rules of the Game 7.6"
},
"origin": "fbd",
"tr": true
},
{
"id": "B7-2022-029",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wie ist nach dem Block der erste Schlag für die Mannschaft, in deren Feld der Ball gelangt ist, zu bewerten?",
"en": "After a block, how is the first hit by the team into whose court the ball has gone to be counted?"
},
"a": {
"de": [
"Es darf dreimal gespielt werden, sofern der Schiedsrichter auf Block entschieden hat",
"Es darf noch zwei Mal gespielt werden. Die erste Berührung ist durch die Beteiligung am Block bereits erfolgt",
"Es darf drei Mal gespielt werden. Der am Block beteiligte Spieler darf nicht mehr spielen",
"Der Schiedsrichter entscheidet auf Fehler"
],
"en": [
"The ball may be played three times, provided the referee has ruled a block",
"The ball may be played twice more. The first contact has already been used by taking part in the block",
"The ball may be played three times. The player involved in the block may not play it again",
"The referee rules a fault"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6.1",
"en": "Rules of the Game 7.6.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "B9-2022-017",
"ch": 9,
"scope": "ifa",
"q": {
"de": "An einem Spieltag stellt der Mannschaftsführer der Mannschaft „A“ fest, dass die Leine (Band/Netz) nicht die erforderliche Höhe aufweist. Wann hat er die Möglichkeit, Einspruch einzulegen?",
"en": "On a match day the captain of team A notices that the net is not at the required height. When can he lodge an objection?"
},
"a": {
"de": [
"Vor Beginn des Spieles",
"Beim ersten Leinenfehler",
"Wenn die Mannschaft „A“ das Spiel verloren hat",
"Jederzeit während des Spielganges"
],
"en": [
"Before the start of the match",
"At the first net fault",
"When team A has lost the match",
"At any time during the rally"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2.1 (Prüfung des Spielfelds); Einspruchsfrist nach Wettkampf-/Rechtsordnung",
"en": "Rules of the Game 9.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "B9-2022-014",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Wogegen kann ein Einspruch keinen Erfolg haben?",
"en": "Against what can an objection not succeed?"
},
"a": {
"de": [
"Tatsachenentscheidung des Schiedsrichters",
"Spieleinrichtung (Spielfeld und Geräte)",
"Wertung des Spieles",
"Regelwidrige Auslegung der Spielregeln durch den Schiedsrichter"
],
"en": [
"A referee's decision on a matter of fact",
"Playing facilities (court and equipment)",
"The result of the match",
"Misapplication of the rules by the referee"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2",
"en": "Rules of the Game 9.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "B9-2022-020",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Welche Aufgabe hat ein Schiedsrichter bei einem Einsatz zu erfüllen?",
"en": "What duties does a referee have to fulfil on an appointment?"
},
"a": {
"de": [
"Überprüfung von Spielfeld und Spielgerät vor Spielbeginn",
"Neuansetzung abgebrochener Spiele",
"Nachmarkieren des Spielfeldes",
"Verhandlung eines Einspruches wegen nicht ordnungsgemäßen Spielaufbaus"
],
"en": [
"Checking the court and equipment before the match",
"Rescheduling of abandoned matches",
"Re-marking the court lines",
"Hearing an objection about an improperly prepared court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2.1; SRO-Anlage 5-1",
"en": "Rules of the Game 9.2.1; SRO annex 5-1"
},
"origin": "fbd",
"tr": true
},
{
"id": "B10-2022-022",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Bei der ersten Spielverzögerung verwarnt der Schiedsrichter die Mannschaft. Gegen wen ist die Verwarnung auszusprechen?",
"en": "For the first delay of play the referee warns the team. To whom is the warning addressed?"
},
"a": {
"de": [
"Mannschaftsführer",
"Spieler, der verzögert hat",
"Trainer/Betreuer",
"Schlagmann"
],
"en": [
"Team captain",
"The player who caused the delay",
"Coach or official",
"Attacker"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.2",
"en": "Rules of the Game 10.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "AS-2022-014",
"ch": 15,
"scope": "fed",
"q": {
"de": "Bei einem Spiel der 2. Bundesliga verletzt sich ein Spieler der Mannschaft „A“ am Schienbein (stark blutende Wunde). Der SR unterbricht das Spiel (SR-Auszeit), kümmert sich um den Verletzten, trägt die Verletzung in den Spielbericht ein und fordert ihn auf, das Spielfeld zu verlassen. Dieser erklärt, dass er um seine fehlende Blutgerinnung weiß und auf jeden Fall weiterspielen will. Wie verhält sich der SR?",
"en": "In a 2nd Bundesliga match a player of team A injures his shin (a heavily bleeding wound). The referee stops play (referee time-out), attends to the injured player, records the injury on the match report and asks him to leave the court. The player states that he knows about his clotting disorder and insists on playing on. How does the referee act?"
},
"a": {
"de": [
"Er nimmt den Spieler vom Platz und lässt ihn erst wieder spielen, wenn die Blutung gestoppt ist.",
"Er unterbricht das Spiel so lange, bis die Verletzung versorgt ist.",
"Er lässt trotz Verletzung / Blutung weiterspielen.",
"Er ruft einen Arzt zur Beurteilung der Verletzung hinzu."
],
"en": [
"He takes the player off court and only lets him play again once the bleeding has stopped.",
"He suspends play until the injury has been treated.",
"He lets play continue despite the injury and the bleeding.",
"He calls a doctor to assess the injury."
]
},
"c": 0,
"ref": {
"de": "SRO-Anlage 5-1",
"en": "SRO annex 5-1"
},
"origin": "fbd",
"tr": true
},
{
"id": "AW-2022-013",
"ch": 15,
"scope": "fed",
"q": {
"de": "Bis wann müssen die Ergebnisse eingetragen werden?",
"en": "By when do the results have to be entered?"
},
"a": {
"de": [
"Dreißig Minuten nach Ende des letzten Spieles",
"Bis 24 Uhr des jeweiligen Spieltags",
"Am nächsten Wochentag",
"3 Tage nach dem Spieltag"
],
"en": [
"Thirty minutes after the end of the last match",
"By midnight on the match day",
"On the next weekday",
"3 days after the match day"
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations"
},
"origin": "fbd",
"tr": true
},
{
"id": "AS-2022-007",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welche der folgenden Aufgaben gehört nicht zu den Kontrollen des Schiedsrichters bei seinem Einsatz?",
"en": "Which of the following tasks is not one of the referee's checks on an appointment?"
},
"a": {
"de": [
"Neuansetzung abgebrochener Spiele",
"Überprüfung von Spielfeld und Geräten",
"Überprüfung der Spielberechtigung",
"Überwachung der Aufzeichnungen im Spielformular"
],
"en": [
"Rescheduling of abandoned matches",
"Checking the court and the equipment",
"Checking eligibility to play",
"Monitoring the entries on the match report"
]
},
"c": 0,
"ref": {
"de": "SRO-Anlage 5-1",
"en": "SRO annex 5-1"
},
"origin": "fbd",
"tr": true
},
{
"id": "AW-2022-008",
"ch": 15,
"scope": "fed",
"q": {
"de": "Welche der folgenden Aussagen zum Satzmodus in der Feldsaison der Bundesligen trifft zu?",
"en": "Which of the following statements about the set format in the outdoor season of the Bundesliga is correct?"
},
"a": {
"de": [
"1. Bundesliga Männer wird auf 5 Gewinnsätze gespielt",
"2. Bundesliga Frauen wird auf 2 Gewinnsätze gespielt",
"1. Bundesliga Frauen wird auf 4 Gewinnsätze gespielt",
"1. Bundesliga Männer wird auf 4 Gewinnsätze gespielt"
],
"en": [
"Men's 1st Bundesliga is played to 5 sets won",
"Women's 2nd Bundesliga is played to 2 sets won",
"Women's 1st Bundesliga is played to 4 sets won",
"Men's 1st Bundesliga is played to 4 sets won"
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland; Spielordnung Faustball von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations; Faustball Deutschland playing regulations"
},
"origin": "fbd",
"tr": true
},
{
"id": "AS-2022-009",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wer ist für die Einteilung der Schiedsrichter in den Bundesligen zuständig?",
"en": "Who is responsible for appointing referees in the Bundesliga?"
},
"a": {
"de": [
"Der zuständige Schiedsrichter-Einsatzleiter (SEL)",
"Der Staffelleiter der entsprechenden Bundesliga",
"Der Wettkampfleiter",
"Das Präsidiumsmitglied Bundesliga von Faustball Deutschland"
],
"en": [
"The responsible referee appointments officer",
"The division manager of the respective Bundesliga",
"The competition director",
"The Faustball Deutschland board member for the Bundesliga"
]
},
"c": 0,
"ref": {
"de": "SRO-Anlage 5-1",
"en": "SRO annex 5-1"
},
"origin": "fbd",
"tr": true
},
{
"id": "AW-2022-006",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wie viele Bälle dürfen vor Spielbeginn je Mannschaft aufgelegt werden?",
"en": "How many balls may each team present before the match?"
},
"a": {
"de": [
"Maximal 3 Bälle gleichen Herstellers und Modells",
"Die Anzahl der Bälle wird durch den Ausrichter festgelegt und bereitgestellt",
"Maximal 6 Bälle, beliebiger Hersteller und Modelle",
"Die maximale Anzahl ist nicht definiert"
],
"en": [
"At most 3 balls of the same make and model",
"The number of balls is set and provided by the organiser",
"At most 6 balls, any make and model",
"No maximum is defined"
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations"
},
"origin": "fbd",
"tr": true
},
{
"id": "AW-2022-012",
"ch": 15,
"scope": "fed",
"q": {
"de": "Wo muss sich das faustball.de-Abzeichen auf dem Trikot befinden?",
"en": "Where must the faustball.de badge be placed on the shirt?"
},
"a": {
"de": [
"Am rechten oder linken Oberarm",
"Das Abzeichen ist nicht erforderlich.",
"Auf der Brust neben dem Vereinslogo",
"Auf der Hose neben der Nummer"
],
"en": [
"On the right or left upper arm",
"The badge is not required.",
"On the chest next to the club logo",
"On the shorts next to the number"
]
},
"c": 0,
"ref": {
"de": "Wettkampfbestimmungen von Faustball Deutschland",
"en": "Faustball Deutschland competition regulations"
},
"origin": "fbd",
"tr": true
},
{
"id": "A1-2022-005",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Bei einem Spiel auf drei Gewinnsätze gewinnt der Mannschaftsführer der Mannschaft „A“ die Wahl und wählt die Bälle des Gegners. Wann hat er wieder die Möglichkeit den eigenen Ball zu wählen?",
"en": "In a match to three sets won, the captain of team A wins the toss and chooses the opponent's balls. When does he next have the chance to choose his own ball?"
},
"a": {
"de": [
"Nach der Auslosung vor dem Entscheidungssatz",
"Nach dem 1. Satz",
"Im 2. Satz",
"Überhaupt nicht mehr"
],
"en": [
"After the toss before the deciding set",
"After the 1st set",
"In the 2nd set",
"Not at all any more"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6.5",
"en": "Rules of the Game 1.6.5"
},
"origin": "fbd",
"tr": true
},
{
"id": "A2-2022-004",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Der Mannschaftsführer wird von seinem Trainer ausgewechselt. Bleibt er weiterhin Mannschaftsführer?",
"en": "The team captain is substituted by his coach. Does he remain team captain?"
},
"a": {
"de": [
"Nein, es muss ein neuer Mannschaftsführer bestimmt werden, der sich auf dem Spielfeld befindet.",
"Ja, er bleibt auch nach einer Auswechslung der Mannschaftsführer.",
"Das entscheidet der Schiedsrichter situationsbedingt",
"Das entscheidet der Trainer / Betreuer"
],
"en": [
"No, a new team captain who is on court has to be appointed.",
"Yes, he remains team captain even after being substituted.",
"The referee decides according to the situation",
"The coach or official decides"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.2.1",
"en": "Rules of the Game 2.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "A2-2022-011",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Vor lauter Freude, dass ein Abwehrspieler der Mannschaft „A“ nach einem tollen Hecht den Ball wieder zurück ins Spiel holte, läuft ein Auswechselspieler der Mannschaft „A“ während des laufenden Spielganges auf das Spielfeld und gratuliert seinem Mitspieler. Der Mittelspieler der Mannschaft „A“ erkennt, dass die Hintermannschaft der Mannschaft „B“ sehr weit aufgerückt ist und spielt einen Roller, der im Gegenfeld zweimal aufspringt. Wie ist zu entscheiden?",
"en": "Delighted that a defender of team A has dug the ball back into play with a spectacular dive, a substitute of team A runs onto the court during the rally and congratulates his team-mate. Team A's middle player notices that team B's back players have moved far forward and plays a roller that bounces twice in the opposite court. How is this decided?"
},
"a": {
"de": [
"Gutball Mannschaft „B“",
"Gutball Mannschaft „A“",
"Wiederholung der letzten Angabe",
"Es muss dreimal gespielt werden"
],
"en": [
"Point for team B",
"Point for team A",
"Replay of the last service",
"The ball has to be played three times"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.2",
"en": "Rules of the Game 2.1.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "A2-2022-003",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Wegen unsportlichen Verhaltens wird der Mannschaftsführer des Feldes verwiesen (rote Karte). Bleibt er weiterhin Mannschaftsführer?",
"en": "The team captain is sent off for unsporting behaviour (red card). Does he remain team captain?"
},
"a": {
"de": [
"Nein, es muss ein neuer Mannschaftsführer bestimmt werden",
"Ja, die „rote Karte“ hat keine Auswirkung auf das Amt des Mannschaftsführers",
"Das entscheidet der Schiedsrichter situationsbedingt",
"Nur wenn die Mannschaft oder der Trainer/Betreuer darauf besteht"
],
"en": [
"No, a new team captain has to be appointed",
"Yes, the red card has no effect on the office of team captain",
"The referee decides according to the situation",
"Only if the team or the coach insists"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.2.1",
"en": "Rules of the Game 2.2.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "A4-2022-010",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Nach einem unplatzierten Rückschlag bleibt der Schlagmann der Mannschaft „A“ verärgert im gegnerischen Feld stehen und behindert den Mittelmann der Mannschaft „B“ am Spielaufbau. Wie ist zu entscheiden?",
"en": "After a poorly placed return, team A's attacker stays annoyed in the opponent's court and obstructs team B's middle player from building the play. How is this decided?"
},
"a": {
"de": [
"Gutball für Mannschaft „B“ wegen absichtlicher Behinderung und gelbe Karte gegen den Schlagmann „A“",
"Keine Behinderung. Weiterspielen",
"Mündliche Verwarnung gegen den Schlagmann der Mannschaft „A“, Wiederholung der letzten Angabe",
"Weiterspielen, wenn der Schlagmann nur im gegnerischen 3-m-Raum steht"
],
"en": [
"Point for team B for deliberate obstruction and a yellow card for team A's attacker",
"No obstruction. Play on",
"Verbal caution to team A's attacker, the last service is replayed",
"Play on if the attacker is only standing in the opponent's 3 m area"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 4.5; Spielregeln 7.8",
"en": "Rules of the Game 4.5; Rules of the Game 7.8"
},
"origin": "fbd",
"tr": true
},
{
"id": "A7-2022-002",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Ball wird nach gültigem Rückschlag von beiden Abwehrspielern der Mannschaft „A“ gleichzeitig angenommen, d.h. beide berühren den Ball gleichzeitig. Der Mittelspieler schlägt den Ball ins Gegenfeld. Wie ist zu entscheiden?",
"en": "After a valid return, both defenders of team A receive the ball simultaneously, that is both touch it at the same moment. The middle player then hits the ball into the opposite court. How is this decided?"
},
"a": {
"de": [
"Kein Fehler, weiterspielen",
"Kein Fehler. Wiederholung der letzten Angabe",
"Gutball für Mannschaft „A“",
"Gutball für Mannschaft „B“"
],
"en": [
"No fault, play on",
"No fault. The last service is replayed",
"Point for team A",
"Point for team B"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.1.1",
"en": "Rules of the Game 7.1.1"
},
"origin": "fbd",
"tr": true
},
{
"id": "A10-2022-015",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Nach dem Abpfiff eines Spiels der 1. Bundesliga – die Spieler befinden sich noch auf dem Platz, die letzten Unterschriften auf dem Spielbericht fehlen – äußert ein Spieler der unterlegenen Mannschaft lautstark und für alle hörbar: „Der Schiri hat uns von vorne bis hinten beschissen, so einen Blinden darf man kein Spiel mehr leiten lassen.“ Wie entscheidest du als Schiedsrichter?",
"en": "After the final whistle of a 1st Bundesliga match, with the players still on court and the last signatures on the match report missing, a player of the losing team says loudly and audibly to everyone: \"The ref cheated us from start to finish, someone that blind should never referee again.\" How do you decide as referee?"
},
"a": {
"de": [
"Der Schiedsrichter zeigt dem Spieler die rote Karte, trägt diesen Vorfall ins Spielformular ein und lässt die Mannschaftsführer unterschreiben.",
"Der Schiedsrichter zeigt dem Spieler die gelbe Karte, trägt diesen Vorfall ins Spielformular ein und lässt die Mannschaftsführer unterschreiben.",
"Der Schiedsrichter verwarnt die gesamte Mannschaft, trägt diesen Vorfall ins Spielformular ein und lässt die Mannschaftsführer unterschreiben.",
"Der Schiedsrichter reagiert nicht auf die Äußerung, lässt die Mannschaftsführer unterschreiben und schließt das Spielformular ab."
],
"en": [
"The referee shows the player the red card, records the incident on the match report and has the captains sign.",
"The referee shows the player the yellow card, records the incident on the match report and has the captains sign.",
"The referee warns the whole team, records the incident on the match report and has the captains sign.",
"The referee does not respond to the remark, has the captains sign and closes the match report."
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe für Schiedsrichter 10.1, Feldverweis – rote Karte (Insultierung des Schiedsgerichts) und Erläuterung Karten; Nachschlagewerk von Faustball Deutschland",
"en": "IFA Training Manual for Referees 10.1, sending off – red card (insulting the referee) and explanation on cards; Faustball Deutschland reference work"
},
"origin": "fbd",
"tr": true
},
{
"id": "A10-2022-001",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Nach einer Spielunterbrechung nimmt Mannschaft „B“ zügig die Spielposition ein. Mannschaft „A“ lässt sich auch nach nochmaligem Pfiff und mündlichen Aufforderungen nicht dazu bewegen, die Spielposition einzunehmen. Was ist zu unternehmen?",
"en": "After a stoppage team B promptly takes up position. Team A cannot be moved to do so even after another whistle and verbal requests. What is to be done?"
},
"a": {
"de": [
"Mannschaft „A“ ist wegen Spielverzögerung zu verwarnen",
"Mannschaft „A“ weiterhin auffordern, die Spielposition einzunehmen",
"Nichts unternehmen. Warten, bis Mannschaft „A“ spielbereit ist.",
"Ein Strafball für Mannschaft „B“"
],
"en": [
"Team A is to be warned for delaying play",
"Keep asking team A to take up its playing position",
"Do nothing. Wait until team A is ready to play.",
"A penalty point for team B"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.2",
"en": "Rules of the Game 10.2"
},
"origin": "fbd",
"tr": true
},
{
"id": "IFA-A-001",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Ein Trainer betritt während des Spiels die Schiedsrichterzone. Wie ist zu verfahren?",
"en": "During the match a coach enters the referee zone. How should this be handled?"
},
"a": {
"de": [
"Der Schiedsrichter entscheidet selbst, ob er das Betreten untersagt – ein generelles Verbot besteht nicht",
"Das Betreten ist ausnahmslos verboten und mit einer Verwarnung zu ahnden",
"Das Betreten ist stets erlaubt, die Zone schützt nur vor Ballkontakt",
"Nur der Mannschaftsführer darf die Zone betreten"
],
"en": [
"The referee decides for himself whether to prohibit entry – there is no general ban",
"Entering is prohibited without exception and is punished with a warning",
"Entering is always allowed, the zone only protects against ball contact",
"Only the team captain may enter the zone"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1, Erläuterung Schiedsrichterzone",
"en": "Rules of the Game 1.1, Explanation of referee zone"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-001",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wie wird das Breitenmaß des Spielfeldes von 20 m gemessen?",
"en": "How is the court width of 20 m measured?"
},
"a": {
"de": [
"Von Außenkante zu Außenkante der Grenzlinien",
"Von Innenkante zu Innenkante der Grenzlinien",
"Von Linienmitte zu Linienmitte",
"Von der Außenkante der einen zur Innenkante der anderen Linie"
],
"en": [
"From the outer edge to the outer edge of the boundary lines",
"From the inner edge to the inner edge of the boundary lines",
"From the middle of one line to the middle of the other",
"From the outer edge of one line to the inner edge of the other"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Lage und Maß der Linien",
"en": "Rules of the Game 1.1.2, Explanation of the position and dimensions of the lines"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-002",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Ein Ball landet so, dass er die Grenzlinie mit einem Teil seines Umfangs überdeckt, sie aber nicht berührt. Wie entscheidest du?",
"en": "A ball lands so that part of its circumference covers the boundary line without touching it. What is your decision?"
},
"a": {
"de": [
"Aus – der Ball muss die Linie berühren",
"Gut – das Überdecken der Linie genügt",
"Gut, sofern der Ball mit vollem Umfang über der Linie steht",
"Wiederholung der letzten Angabe"
],
"en": [
"Out – the ball has to touch the line",
"In – covering the line is enough",
"In, provided the ball stands over the line with its full circumference",
"Replay of the last service"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Aus oder In",
"en": "Rules of the Game 1.1.2, Explanation Out or In"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-002",
"ch": 1,
"scope": "ifa",
"q": {
"de": "In welchem Fall kennt die Faustball-Spielregel den „vollen Umfang“ des Balles?",
"en": "In which case do the fistball rules recognise the full circumference of the ball?"
},
"a": {
"de": [
"Nur beim direkten Überqueren der Mittellinie ohne vorherigen Bodenkontakt",
"Bei jeder Ausball-Entscheidung an den Grenzlinien",
"Beim Übertritt über die Angabelinie",
"Bei der Berührung der Hallendecke"
],
"en": [
"Only when the ball crosses the centre line directly without touching the ground first",
"For every out decision on the boundary lines",
"When stepping over the service line",
"When the ball touches the ceiling"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2 und 7.2.1",
"en": "Rules of the Game 1.1.2 and 7.2.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-003",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wo wird die Höhe der Leine gemessen?",
"en": "Where is the height of the net measured?"
},
"a": {
"de": [
"Vom Boden bis zur Oberkante der Leine",
"Vom Boden bis zur Unterkante der Leine",
"Vom Boden bis zur Mitte der Leine",
"Vom Boden bis zur Oberkante des Pfostens"
],
"en": [
"From the ground to the upper edge of the net",
"From the ground to the lower edge of the net",
"From the ground to the middle of the net",
"From the ground to the top of the post"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.2, Erläuterung Leinenhöhe",
"en": "Rules of the Game 1.2, Explanation of line height"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-003",
"ch": 1,
"scope": "ifa",
"q": {
"de": "In der Halle wurde der Auslauf vor der ersten Tribünenstufe enden gelassen. Ein Ball trifft dort einen sitzenden Auswechselspieler. Wie entscheidest du?",
"en": "Indoors the buffer zone was defined as ending in front of the first row of the stand. A ball hits a substitute sitting there. What is your decision?"
},
"a": {
"de": [
"Der Auswechselspieler verursacht keinen Fehler – der Ball gilt als außerhalb des Auslaufs zu Boden gefallen; Fehler der Mannschaft, die ihn zuletzt berührt hat",
"Fehler der Mannschaft, zu der der Auswechselspieler gehört",
"Behinderung, die letzte Angabe wird wiederholt",
"Gutball für den Gegner wegen unsportlichen Verhaltens"
],
"en": [
"The substitute causes no fault – the ball counts as having landed outside the buffer zone; fault by the team that touched it last",
"Fault by the team the substitute belongs to",
"Interference, the last service is replayed",
"Point for the opponent for unsporting behaviour"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.3, Erläuterung Auslauf in der Halle",
"en": "Rules of the Game 1.3, Explanation of the buffer zone indoors"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-004",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Bei einem Turnier hat der Veranstalter die Bälle aufgelegt. Worauf beschränkt sich die Wahl des Losgewinners?",
"en": "At a tournament the organiser has provided the balls. What is the winner of the toss left to choose?"
},
"a": {
"de": [
"Wie üblich auf Feldseite oder Angabe – nur das Ballkontingent ist nicht mehr zu wählen",
"Nur noch darauf, wer die erste Angabe schlägt; die Feldseite bekommt der Gegner",
"Der Losgewinner wählt trotzdem das Ballkontingent",
"Die Auslosung entfällt in diesem Fall vollständig"
],
"en": [
"End or service, as usual – only the choice of the set of balls falls away",
"Only on who serves first; the opponent gets the end without a choice",
"The winner of the toss still chooses the set of balls",
"In this case the toss is dropped entirely"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.5, Erläuterung Ballwahl",
"en": "Rules of the Game 1.5 and the explanation on ball choice. The winner of the toss still chooses end or service. If the organiser provides the balls, only the choice of ball allocation that normally goes with the service falls away."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-005",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Ein Spieler feuchtet den Ball während des Spiels absichtlich mit seinem nassen Trikot an. Wie reagierst du?",
"en": "During the match a player deliberately wets the ball with his damp shirt. How do you react?"
},
"a": {
"de": [
"Sofortige Ermahnung, bei Wiederholung weitere Strafen; wenn nötig anderen Ball ins Spiel bringen",
"Sofortiger Feldverweis des Spielers",
"Gutball für den Gegner ohne weitere Maßnahme",
"Keine Maßnahme, solange der Ball spielfähig bleibt"
],
"en": [
"An immediate verbal warning, further penalties if repeated; bring another ball into play if necessary",
"Sending the player off immediately",
"Point for the opponent with no further measure",
"No measure, as long as the ball remains fit for play"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6, Erläuterung Regelkonformität des Balles",
"en": "Rules of the Game 1.6, Explanation of compliance of the ball with the rules"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-006",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft erhebt Einwand gegen das Ergebnis der Ballprüfung. Wer trägt die Beweispflicht?",
"en": "A team objects to the outcome of the ball check. Who bears the burden of proof?"
},
"a": {
"de": [
"Der Beschwerdeführer",
"Der Schiedsrichter",
"Die gegnerische Mannschaft des Beschwerdeführers",
"Der Veranstalter"
],
"en": [
"The party making the complaint",
"The referee",
"The complaining team's opponent",
"The organiser"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6, Erläuterung Regelkonformität des Balles",
"en": "Rules of the Game 1.6, Explanation of compliance of the ball with the rules"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-007",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Wann bringen Ballkinder den Ball zurück ins Spiel?",
"en": "When do ball kids return the ball to play?"
},
"a": {
"de": [
"Nur dann, wenn der Schiedsrichter es ihnen bedeutet",
"Selbstständig sofort nach jedem Spielgang",
"Nur in den Satzpausen",
"Auf Zuruf des Mannschaftsführers der angebenden Mannschaft"
],
"en": [
"Only when the referee signals them to",
"On their own initiative immediately after every rally",
"Only during the intervals between sets",
"When called by the captain of the serving team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6, Erläuterung für den Einsatz von Ballkindern",
"en": "Rules of the Game 1.6, Explanation of use of ball kids"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-008",
"ch": 1,
"scope": "ifa",
"q": {
"de": "Der Schiedsrichter hält während eines Satzes einen Wechsel von Trocken- auf Nassbälle für nötig. Wer entscheidet, und wann wird gewechselt?",
"en": "During a set the referee considers a change from dry to wet balls necessary. Who decides, and when is the change made?"
},
"a": {
"de": [
"Er entscheidet allein; der Wechsel erfolgt bei der nächsten Spielunterbrechung",
"Beide Mannschaftsführer müssen zustimmen",
"Ein Wechsel ist erst zur Satzpause zulässig",
"Nur der Veranstalter darf einen solchen Wechsel anordnen"
],
"en": [
"He decides alone; the change is made at the next stoppage",
"Both team captains have to agree",
"A change is only permitted at the interval between sets",
"Only the organiser may order such a change"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6.4, Erläuterung Balltausch",
"en": "Rules of the Game 1.6.4, Explanation ball exchange"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-004",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Wer darf eine Auswechslung beim Schiedsrichter melden?",
"en": "Who may report a substitution to the referee?"
},
"a": {
"de": [
"Trainer, Betreuer oder Spielführer",
"Ausschließlich der Spielführer",
"Ausschließlich der Trainer",
"Jeder Spieler auf dem Feld"
],
"en": [
"Coach, official or team captain",
"The team captain only",
"The coach only",
"Any player on court"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 2.1.2, Erläuterung Auswechslung",
"en": "Training Manual for Referees, 2.1.2, explanation: substitution"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-009",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft möchte nach einem Time-out wechseln. Bis wann muss der Wechsel angekündigt werden?",
"en": "A team wants to substitute after a time-out. By when does the substitution have to be announced?"
},
"a": {
"de": [
"In zeitnaher Folge auf den Pfiff, der das Ende des Time-outs signalisiert",
"Bereits vor Beginn des Time-outs",
"Jederzeit während des folgenden Spielganges",
"Erst nach dem auf das Time-out folgenden Spielgang"
],
"en": [
"Immediately after the whistle that ends the time-out",
"Already before the time-out begins",
"At any time during the following rally",
"Only after the rally that follows the time-out"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 2.1.2, Erläuterung Wechsel bei Timeout",
"en": "Training Manual for Referees, 2.1.2, explanation: substitution during a time-out"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-005",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft wechselt ohne Meldung; kurzzeitig befinden sich sechs Spieler im Feld. Wie entscheidest du?",
"en": "A team substitutes without announcing it; for a moment six players are on court. What is your decision?"
},
"a": {
"de": [
"Spielgang abbrechen und auf Gutball für den Gegner entscheiden",
"Verwarnung aussprechen, der Spielgang läuft weiter",
"Die letzte Angabe wiederholen lassen",
"Zeitstrafe für den zusätzlich eingetretenen Spieler"
],
"en": [
"Stop the rally and award a point to the opponent",
"Give a warning, the rally continues",
"Have the last service replayed",
"A time penalty for the extra player who came on"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.2",
"en": "Rules of the Game 2.1.2"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-006",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Die Mannschaft ohne Angaberecht meldet eine Auswechslung an. Wie verfährst du?",
"en": "The team without the right to serve asks for a substitution. How do you proceed?"
},
"a": {
"de": [
"Den Wechsel vor Beginn des neuen Spielganges unterbinden",
"Den Wechsel zulassen – beide Mannschaften dürfen wechseln",
"Den Spielgang abbrechen und Gutball geben",
"Eine Verwarnung gegen die Mannschaft aussprechen"
],
"en": [
"Prevent the substitution before the new rally begins",
"Allow the substitution – both teams may substitute",
"Stop the rally and award a point",
"Give the team a warning"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 2.1.2",
"en": "Rules of the Game 2.1.2"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-010",
"ch": 2,
"scope": "ifa",
"q": {
"de": "Die Wechselmeldung erfolgt erst kurz vor der nächsten Angabe, und es steht kein Spieler erkennbar bereit. Wie verfährst du?",
"en": "The substitution is only announced shortly before the next service and no player is visibly ready. How do you proceed?"
},
"a": {
"de": [
"Den Wechsel unterbinden und den neuen Spielgang starten",
"Den Wechsel zulassen und bis zu 30 Sekunden warten",
"Sofort eine Verwarnung gegen die Mannschaft aussprechen",
"Auf Gutball für den Gegner entscheiden"
],
"en": [
"Prevent the substitution and start the new rally",
"Allow the substitution and wait up to 30 seconds",
"Immediately give the team a warning",
"Award a point to the opponent"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 2.1.3, Erläuterung ohne Verzögerung",
"en": "Training Manual for Referees, 2.1.3, explanation: without delay"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-007",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Ein Satz steht 14:14. Wie endet er?",
"en": "A set stands at 14:14. How does it end?"
},
"a": {
"de": [
"Bei 15 Gutbällen einer Mannschaft, also 15:14",
"Erst bei zwei Gutbällen Differenz, also frühestens 16:14",
"Bei 11 Gutbällen mit zwei Gutbällen Differenz",
"Der Satz wird unentschieden gewertet"
],
"en": [
"When one team reaches 15 points, so 15:14",
"Only at a two-point margin, so at the earliest 16:14",
"At 11 points with a two-point margin",
"The set is recorded as a draw"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.2",
"en": "Rules of the Game 3.1.2"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-008",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Was geschieht im Entscheidungssatz, sobald eine Mannschaft 6 Gutbälle erzielt hat?",
"en": "What happens in the deciding set once a team has scored 6 points?"
},
"a": {
"de": [
"Feld, Wahl des Ballkontingents und damit die erste Angabe wechseln",
"Nur die Feldseite wechselt",
"Nur das Angaberecht wechselt",
"Nichts – der Entscheidungssatz wird durchgespielt"
],
"en": [
"Ends, choice of balls and thus the first service all change",
"Only the ends change",
"Only the right to serve changes",
"Nothing – the deciding set is played straight through"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.4",
"en": "Rules of the Game 3.1.4"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-009",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Wann beginnt und wann endet die Satzpause?",
"en": "When does the interval between sets begin and end?"
},
"a": {
"de": [
"Sie beginnt mit dem Pfiff zum entscheidenden Punkt und endet mit dem anhaltenden Pfiff nach 90 Sekunden",
"Sie beginnt, sobald beide Mannschaften das Spielfeld verlassen haben",
"Sie beginnt mit dem Betreten der neuen Spielhälfte",
"Sie dauert so lange, bis beide Mannschaften bereit sind"
],
"en": [
"It begins with the whistle for the deciding point and ends with the sustained whistle after 90 seconds",
"It begins once both teams have left the court",
"It begins when the teams enter the new half",
"It lasts until both teams are ready"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 3.1.5, Erläuterung Pausenlänge",
"en": "Training Manual for Referees, 3.1.5, explanation: length of the break"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-011",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Der Angreifer steht bereits zur Angabe bereit, da meldet die gegnerische Mannschaft ein Time-out an. Wie entscheidest du?",
"en": "The server is already set to serve when the opposing team asks for a time-out. What is your decision?"
},
"a": {
"de": [
"Das Time-out kann verweigert und das Spiel fortgesetzt werden",
"Das Time-out muss in jedem Fall gewährt werden",
"Das Time-out wird gewährt, aber auf 15 Sekunden verkürzt",
"Das Time-out wird gewährt und zusätzlich eine Verwarnung ausgesprochen"
],
"en": [
"The time-out can be refused and play continued",
"The time-out has to be granted in any case",
"The time-out is granted but shortened to 15 seconds",
"The time-out is granted and a warning is given as well"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 3.4, Erläuterung Time out",
"en": "Training Manual for Referees, 3.4, explanation: time-out"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-010",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Kann eine Mannschaft ohne Angaberecht ein Time-out fordern?",
"en": "May a team without the right to serve ask for a time-out?"
},
"a": {
"de": [
"Ja",
"Nein, nur die angebende Mannschaft",
"Nur im Entscheidungssatz",
"Nur bei einer Verletzung"
],
"en": [
"Yes",
"No, only the serving team",
"Only in the deciding set",
"Only in case of injury"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 3.4, Erläuterung Time out",
"en": "Training Manual for Referees, 3.4, explanation: time-out"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-012",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Unmittelbar nach dem Time-out von Mannschaft A meldet Mannschaft B ebenfalls ein Time-out an. Wie entscheidest du?",
"en": "Immediately after team A's time-out, team B also asks for one. What is your decision?"
},
"a": {
"de": [
"Nicht möglich – ein Time-out kann nur nach einem Spielgang genommen werden",
"Zulässig, jede Mannschaft hat pro Satz ein Time-out",
"Zulässig, aber auf 15 Sekunden verkürzt",
"Zulässig, wenn der Schiedsrichter zustimmt"
],
"en": [
"Not possible – a time-out can only be taken after a rally",
"Permitted, each team has one time-out per set",
"Permitted, but shortened to 15 seconds",
"Permitted if the referee agrees"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 3.4, Erläuterung Time out",
"en": "Training Manual for Referees, 3.4, explanation: time-out"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-011",
"ch": 3,
"scope": "ifa",
"q": {
"de": "Wann dürfen die Mannschaften nach einem Satzende die neue Spielhälfte betreten?",
"en": "After the end of a set, when may the teams enter their new half?"
},
"a": {
"de": [
"Erst nach Anweisung des Schiedsrichters durch Pfiff",
"Sofort nach dem Seitenwechsel",
"Nach Ablauf von 30 Sekunden",
"Sobald der Anschreiber den Satz gebucht hat"
],
"en": [
"Only after the referee signals with a whistle",
"Immediately after changing ends",
"After 30 seconds have passed",
"Once the scorer has recorded the set"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 3.1.6",
"en": "Rules of the Game 3.1.6"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-013",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Ein zusätzlicher Ball rollt von außen ins Spielfeld, ohne den Spielfluss zu stören oder jemanden zu gefährden. Wie entscheidest du?",
"en": "A stray ball rolls onto the court from outside without disturbing play or endangering anyone. What is your decision?"
},
"a": {
"de": [
"Das Spiel nicht unterbrechen",
"Sofort unterbrechen und die letzte Angabe wiederholen",
"Gutball für die Mannschaft, die den Ball nicht verursacht hat",
"Das Spiel abbrechen"
],
"en": [
"Do not stop play",
"Stop play immediately and replay the last service",
"Point for the team that did not cause the ball",
"Abandon the match"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 4.1.1, Erläuterung Spielunterbrechung",
"en": "Training Manual for Referees, 4.1.1, explanation: stoppage of play"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-014",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Ein Ball trifft innerhalb des Auslaufes einen Auswechselspieler, ohne vorher im Feld aufgesprungen zu sein. Wie entscheidest du?",
"en": "Inside the buffer zone a ball hits a substitute without having bounced in the court first. What is your decision?"
},
"a": {
"de": [
"Fehler der Mannschaft, zu der der Auswechselspieler gehört",
"Kein Fehler",
"Behinderung, die letzte Angabe wird wiederholt",
"Fehler der gegnerischen Mannschaft"
],
"en": [
"Fault by the team the substitute belongs to",
"No fault",
"Obstruction, the last service is replayed",
"Fault by the opposing team"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 4.4, Erläuterung Ballberührung durch Nichtspieler",
"en": "Training Manual for Referees, 4.4, explanation: ball touched by non-players"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-015",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Ein Zuschauer berührt innerhalb des Auslaufes den Ball, den die schlagberechtigte Mannschaft noch hätte erreichen können. Wie entscheidest du?",
"en": "Inside the buffer zone a spectator touches a ball that the team entitled to play could still have reached. What is your decision?"
},
"a": {
"de": [
"Behinderung – der letzte Spielgang wird wiederholt",
"Fehler der Mannschaft, die den Ball zuletzt berührt hat",
"Gutball für die schlagberechtigte Mannschaft",
"Kein Eingriff, das Spiel läuft weiter"
],
"en": [
"Obstruction – the last rally is replayed",
"Fault by the team that touched the ball last",
"Point for the team entitled to play the ball",
"No intervention, play continues"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 4.4, Erläuterung Ballberührung durch Nichtspieler",
"en": "Training Manual for Referees, 4.4, explanation: ball touched by non-players"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-016",
"ch": 4,
"scope": "ifa",
"q": {
"de": "Ein Auswechselspieler betritt außerhalb eines Spielganges das Spielfeld. Wie entscheidest du?",
"en": "A substitute enters the court outside a rally. What is your decision?"
},
"a": {
"de": [
"Kein Fehler – es können lediglich Zeitspielmaßnahmen eingeleitet werden",
"Fehler, Gutball für den Gegner",
"Sofortige Verwarnung des Spielers",
"Zeitstrafe für den Spieler"
],
"en": [
"No fault – only time-wasting measures can be taken",
"Fault, point for the opponent",
"An immediate warning for the player",
"A time penalty for the player"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 4.2, Erläuterung Fehler während Spielgang",
"en": "Training Manual for Referees, 4.2, explanation: faults during a rally"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-012",
"ch": 4,
"scope": "ifa",
"q": {
"de": "In welchen Fällen darf das Gegenfeld während eines Spielganges betreten werden?",
"en": "In which cases may the opposite court be entered during a rally?"
},
"a": {
"de": [
"Beim unvermeidbaren Auslaufen nach Angriff oder Block sowie beim Zurückspielen eines Balles, der indirekt unter der Leine hindurch ins Gegenfeld geraten ist",
"In keinem Fall",
"Immer, solange kein Gegner behindert wird",
"Nur vom blockenden Spieler"
],
"en": [
"When running out unavoidably after an attack or block, and when playing back a ball that has gone indirectly under the net into the opposite court",
"In no case",
"Always, as long as no opponent is obstructed",
"Only by the blocking player"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 4.5, Erläuterung Betreten des Gegenfeldes",
"en": "Training Manual for Referees, 4.5, explanation: entering the opposite court"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-013",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Was ist nach den Spielregeln unter einem Schlag zu verstehen?",
"en": "What do the rules understand by a hit?"
},
"a": {
"de": [
"Jede kurzzeitige Berührung des Balles mit der Faust oder dem Arm",
"Jede Berührung des Balles mit einem beliebigen Körperteil",
"Ausschließlich die Berührung mit der geschlossenen Faust",
"Jede Berührung, bei der der Ball seine Richtung ändert"
],
"en": [
"Any brief contact with the ball using the fist or the arm",
"Any contact with the ball using any part of the body",
"Only contact with the closed fist",
"Any contact in which the ball changes direction"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.1",
"en": "Rules of the Game 5.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-014",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Wie muss die Faust beim Schlag geformt sein?",
"en": "How must the fist be formed when hitting?"
},
"a": {
"de": [
"Die Fingerkuppen berühren den Handteller, der Daumen ist angelegt",
"Die Hand darf auch beim Faustschlag geöffnet sein",
"Der Daumen muss abgespreizt sein",
"Die Finger dürfen locker gestreckt bleiben"
],
"en": [
"The fingertips touch the palm and the thumb is laid alongside",
"The hand may be open even when hitting with the fist",
"The thumb has to be spread out",
"The fingers may stay loosely extended"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.3",
"en": "Rules of the Game 5.3"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-015",
"ch": 5,
"scope": "ifa",
"q": {
"de": "Ein Spieler nimmt den Ball mit offener Hand an und führt ihn dabei sichtbar über eine längere Strecke mit. Wie entscheidest du?",
"en": "A player receives the ball with an open hand and visibly carries it along for some distance. What is your decision?"
},
"a": {
"de": [
"Fehler – der Ball darf nicht geschoben werden",
"Kein Fehler, beim Schlag mit dem Arm darf die Hand geöffnet sein",
"Kein Fehler, solange der Ball nicht zweimal berührt wird",
"Wiederholung der letzten Angabe"
],
"en": [
"Fault – the ball must not be pushed",
"No fault, when hitting with the arm the hand may be open",
"No fault, as long as the ball is not touched twice",
"Replay of the last service"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 5.1 und 5.3",
"en": "Rules of the Game 5.1 and 5.3"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-017",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Ein Angreifer wirft den Ball zur Angabe nur wenige Zentimeter hoch und schlägt ihn unmittelbar. Wie entscheidest du?",
"en": "A server throws the ball up only a few centimetres and hits it immediately. What is your decision?"
},
"a": {
"de": [
"Gültig, sofern der Ball die Hand verlassen hat",
"Fehler – der Ball muss deutlich sichtbar hoch geworfen werden",
"Fehler – der Wurf muss mindestens Kopfhöhe erreichen",
"Die Angabe ist zu wiederholen"
],
"en": [
"Valid, provided the ball has left the hand",
"Fault – the ball has to be thrown up clearly visibly",
"Fault – the throw has to reach at least head height",
"The service is to be replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.2, Erläuterung Ball muss Abwurfhand verlassen",
"en": "Rules of the Game 6.2, explanation “The ball must leave the release hand”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-018",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Ein Spieler spielt den Ball zur Angabe aus dem Knien über die Leine. Wie entscheidest du?",
"en": "A player plays the ball over the net from a kneeling position to serve. What is your decision?"
},
"a": {
"de": [
"Keine Angabe – weder Fehler noch eröffneter Spielgang",
"Fehler der angebenden Mannschaft",
"Gültige Angabe",
"Gutball für die angebende Mannschaft"
],
"en": [
"Not a service – neither a fault nor a rally started",
"Fault by the serving team",
"Valid service",
"Point for the serving team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3, Erläuterung Angabe im Laufen, Springen, Stehen oder Gehen",
"en": "Rules of the Game 6.3, explanation “Service while running, jumping, standing or walking”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-016",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Bei einer Angabe im Springen berührt der Anschläger den Boden erstmals hinter der Angabelinie. Wie entscheidest du?",
"en": "On a jump service the server's first ground contact is behind the service line. What is your decision?"
},
"a": {
"de": [
"Fehler – die erste Bodenberührung muss vor der Angabelinie erfolgen",
"Gültig, solange der Ball über die Leine geht",
"Gültig, wenn wenigstens ein Bein vor der Linie aufkommt",
"Die Angabe ist zu wiederholen"
],
"en": [
"Fault – the first ground contact has to be in front of the service line",
"Valid as long as the ball goes over the net",
"Valid if at least one leg lands in front of the line",
"The service is to be replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3, Erläuterung Angabe im Laufen, Springen, Stehen oder Gehen",
"en": "Rules of the Game 6.3, explanation “Service while running, jumping, standing or walking”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-019",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Der Anschläger berührt den Boden gleichzeitig mit einem Bein vor und einem Bein hinter der Angabelinie. Wie entscheidest du?",
"en": "The server touches the ground simultaneously with one leg in front of and one leg behind the service line. What is your decision?"
},
"a": {
"de": [
"Kein Fehler",
"Fehler wegen Übertritts",
"Die Angabe ist zu wiederholen",
"Fehler, aber nur bei der zweiten Angabe in Folge"
],
"en": [
"No fault",
"Fault – foot fault",
"The service is to be replayed",
"Fault, but only on the second consecutive service"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3, Erläuterung Angabe im Laufen, Springen, Stehen oder Gehen",
"en": "Rules of the Game 6.3, explanation “Service while running, jumping, standing or walking”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-017",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Der Angreifer wirft den Ball zur Angabe an und fängt ihn wieder auf. Wie entscheidest du?",
"en": "The server throws the ball up for the service and catches it again. What is your decision?"
},
"a": {
"de": [
"Fehler – mit dem Verlassen der Wurfhand gilt die Angabe als begonnen",
"Kein Fehler, die Angabe darf wiederholt werden",
"Kein Fehler, solange er den Ball nicht zu Boden fallen lässt",
"Die Angabe ist zu wiederholen"
],
"en": [
"Fault – the service counts as started once the ball leaves the throwing hand",
"No fault, the service may be replayed",
"No fault, as long as he does not let the ball drop to the ground",
"The service is to be replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.4.1, Erläuterung begonnene Angabe",
"en": "Rules of the Game 6.4.1, explanation “Started service”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-020",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Dem Anschläger fällt der Ball unabsichtlich aus der Hand, bevor er zum Wurf ansetzt. Wie entscheidest du?",
"en": "The server accidentally drops the ball before starting the throw. What is your decision?"
},
"a": {
"de": [
"Kein Fehler – dies gilt nicht als begonnene Angabe",
"Fehler – jede Ballbewegung eröffnet die Angabe",
"Gutball für den Gegner",
"Verwarnung wegen Spielverzögerung"
],
"en": [
"No fault – this does not count as a service having started",
"Fault – any movement of the ball starts the service",
"Point for the opponent",
"A warning for delaying play"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.4.1, Erläuterung begonnene Angabe",
"en": "Rules of the Game 6.4.1, explanation “Started service”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-021",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Eine Angabe wird außerhalb des Spielfeldes ausgeführt. Wie entscheidest du?",
"en": "A service is taken from outside the court. What is your decision?"
},
"a": {
"de": [
"Keine Angabe – weder Fehler noch Eröffnung des Spielganges",
"Fehler der angebenden Mannschaft",
"Gültig, sofern der Ball im Gegenfeld landet",
"Gutball für die angebende Mannschaft"
],
"en": [
"Not a service – neither a fault nor the start of a rally",
"Fault by the serving team",
"Valid, provided the ball lands in the opposite court",
"Point for the serving team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3.2, Erläuterung Angabe / Außerhalb des Spielfeldes",
"en": "Rules of the Game 6.3.2, explanation “Service / outside the field of play”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-018",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Wann ist eine Angabe gültig?",
"en": "When is a service valid?"
},
"a": {
"de": [
"Wenn der Ball den Boden im Gegenfeld oder innerhalb oder außerhalb des Gegenfeldes einen Gegner berührt",
"Nur wenn der Ball den Boden im Gegenfeld berührt",
"Nur wenn kein Gegner den Ball berührt",
"Sobald der Ball die Mittellinie überquert hat"
],
"en": [
"When the ball touches the ground in the opposite court, or touches an opponent inside or outside the opposite court",
"Only if the ball touches the ground in the opposite court",
"Only if no opponent touches the ball",
"Once the ball has crossed the centre line"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.2.1",
"en": "Rules of the Game 6.2.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-019",
"ch": 6,
"scope": "ifa",
"q": {
"de": "Ab wann darf der Anschläger den Raum zwischen Mittel- und Angabelinie betreten?",
"en": "From what moment may the server enter the area between the centre line and the service line?"
},
"a": {
"de": [
"Erst wenn seine erste Bodenberührung nach der Angabe vor der Angabelinie erfolgt ist",
"Sobald der Ball geschlagen ist",
"Sobald der Ball die Leine überquert hat",
"Sobald der Gegner den Ball berührt hat"
],
"en": [
"Only once his first ground contact after the service is in front of the service line",
"As soon as the ball has been hit",
"Once the ball has crossed the net",
"Once an opponent has touched the ball"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 6.3.2, Erläuterung Angabe / Übertritt",
"en": "Rules of the Game 6.3.2, explanation “Service / foot fault”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-022",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Block geht direkt unter der Leine hindurch ins Gegenfeld und trifft dort einen Gegner. Wie entscheidest du?",
"en": "A block goes directly under the net into the opposite court and hits an opponent there. What is your decision?"
},
"a": {
"de": [
"Die weitere Berührung ist unerheblich. Der Ball war mit Erreichen des gegnerischen Luftraums nach dem Block ungültig, deshalb wird die letzte Angabe wiederholt.",
"Fehler der Mannschaft, deren Spieler den Ball berührt hat",
"Fehler der Mannschaft des getroffenen Spielers",
"Gutball für die blockende Mannschaft"
],
"en": [
"Any further contact is irrelevant. The ball became dead when it reached the opponent's airspace after the block, so the last service is replayed.",
"Fault by the team whose player touched the ball",
"Fault by the team of the player who was hit",
"Point for the blocking team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.2.1, Erläuterung direkt unter dem Netz hindurchgespielt",
"en": "Rules of the Game 7.2.1, explanation “Played directly under the net”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-023",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wann ist der Luftraum des Gegners erreicht?",
"en": "When has the opponent's airspace been reached?"
},
"a": {
"de": [
"Wenn der Ball in vollem Umfang die Mittellinie überschritten hat",
"Sobald ein Teil des Balles die Mittellinie überragt",
"Sobald der Ball die Leine passiert hat",
"Sobald der Ball im Gegenfeld aufspringt"
],
"en": [
"When the ball has crossed the centre line with its full circumference",
"As soon as any part of the ball projects over the centre line",
"Once the ball has passed the net",
"As soon as the ball bounces in the opposite court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.2.1, Erläuterung direkt unter dem Netz hindurchgespielt",
"en": "Rules of the Game 7.2.1, explanation “Played directly under the net”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-024",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Ball ist unter der Leine hindurch ins Gegenfeld geraten. Der schlagberechtigte Spieler versucht nicht, ihn zurückzuspielen, sondern schlägt ihn in eine andere Richtung. Wie entscheidest du?",
"en": "A ball has passed under the net into the opposite court. The player entitled to play it does not try to play it back but hits it in another direction. What is your decision?"
},
"a": {
"de": [
"Fehler – das ist als direkter Schlag unter dem Band zu werten",
"Kein Fehler, solange der Ball keinen Gegner trifft",
"Die letzte Angabe wird wiederholt",
"Gutball für die schlagende Mannschaft"
],
"en": [
"Fault – this counts as a direct hit under the net",
"No fault, as long as the ball does not hit an opponent",
"The last service is replayed",
"Point for the hitting team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.5, Erläuterung Zurückspielen unter dem Netz",
"en": "Rules of the Game 7.5, explanation “Playing back under the net”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-025",
"ch": 7,
"scope": "ifa",
"q": {
"de": "In einer Blocksituation berührt ein Spieler als zweiter Spieler seines Teams den Ball im Gegenfeld; von seiner Faust fliegt der Ball ins eigene Feld. Wie geht es weiter?",
"en": "In a block situation a player is the second of his team to touch the ball in the opposite court; from his fist the ball flies into his own court. What happens next?"
},
"a": {
"de": [
"Das Team hat zwei weitere Ballberührungen und darf weiterspielen",
"Fehler wegen Zurückspielens über das Netz",
"Fehler wegen Betretens des Gegenfeldes",
"Die letzte Angabe wird wiederholt"
],
"en": [
"The team has two more contacts and may play on",
"Fault for playing the ball back over the net",
"Fault for entering the opposite court",
"The last service is replayed"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.5.1, Erläuterung Zurückspielen über dem Netz",
"en": "Rules of the Game 7.5.1, explanation “Playing back over the net”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-026",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein angenommener Ball springt über die Leine. Der Zuspieler spielt ihn durch Übergreifen über die Leine hoch. Darf die Mannschaft den Ball danach noch ein drittes Mal spielen?",
"en": "A received ball bounces over the net. The setter plays it up by reaching over the net. May the team still play the ball a third time?"
},
"a": {
"de": [
"Ja – der dritte Kontakt ist erlaubt, gleich ob im Gegenfeld oder im eigenen Feld",
"Nein – ein Übergreifen über die Leine ist stets ein Fehler",
"Nur wenn der Kontakt im eigenen Feld erfolgt",
"Nein – nach dem Überqueren der Leine ist der Ball ungültig"
],
"en": [
"Yes – the third contact is allowed, whether in the opposite court or in your own",
"No – reaching over the net is always a fault",
"Only if the contact takes place in your own court",
"No – once the ball has crossed the net it is dead"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.5.1, Erläuterung Zurückspielen über dem Netz",
"en": "Rules of the Game 7.5.1, explanation “Playing back over the net”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-027",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein bereits zweimal gespielter Ball unterschreitet danach das Netz. Wie entscheidest du?",
"en": "A ball already played twice then passes under the net. What is your decision?"
},
"a": {
"de": [
"Fehler",
"Kein Fehler – der dritte Kontakt steht noch aus",
"Die letzte Angabe wird wiederholt",
"Gutball für die schlagende Mannschaft"
],
"en": [
"Fault",
"No fault – the third contact is still to come",
"The last service is replayed",
"Point for the hitting team"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.5.2, Erläuterung ohne Berührung unter dem Netz",
"en": "Rules of the Game 7.5.2, explanation “Under the net without a touch”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-028",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Ein Zuspieler rutscht nach seinem Zuspiel unvermeidbar ins Gegenfeld und behindert dort den blockenden Spieler. Wie entscheidest du?",
"en": "After his set a setter slides unavoidably into the opposite court and obstructs the blocking player there. What is your decision?"
},
"a": {
"de": [
"Unvermeidbare Behinderung – die letzte Angabe wird wiederholt",
"Fehler der behindernden Mannschaft",
"Gutball für die behinderte Mannschaft",
"Kein Eingriff – das Spiel läuft weiter"
],
"en": [
"Unavoidable interference – the last service is replayed",
"Fault by the obstructing team",
"Point for the obstructed team",
"No intervention – play continues"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.8.1, Erläuterung unbeabsichtigt und unverschuldet",
"en": "Rules of the Game 7.8.1, explanation “Unintentionally and through no fault of one's own”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-029",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Wo steht der Schiedsrichter am besten, wenn sich eine Blocksituation abzeichnet?",
"en": "Where is the referee best positioned when a block situation is developing?"
},
"a": {
"de": [
"Dicht am Pfosten, so positioniert, dass die Blockbeteiligten den Blick auf die Leine nicht versperren",
"In der Verlängerung der Mittellinie auf Höhe der Angabelinie",
"Hinter der Hinterlinie der angreifenden Mannschaft",
"In der Schiedsrichterzone, unabhängig von der Spielsituation"
],
"en": [
"Close to the post, positioned so that the players blocking do not obstruct the view of the net",
"In line with the centre line at the height of the service line",
"Behind the back line of the attacking team",
"In the referee zone, regardless of the situation"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6.1, Erläuterung Block",
"en": "Rules of the Game 7.6.1, explanation “Block”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-030",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Woran erkennt der Schiedsrichter frühzeitig, dass eine Blocksituation bevorsteht?",
"en": "How does the referee recognise early that a block situation is coming?"
},
"a": {
"de": [
"Sobald der Ball den Arm des Zuspielers verlassen hat; hilfreich ist zudem die Ansage des Angreifers",
"Erst wenn beide Angreifer zum Sprung ansetzen",
"Wenn der Mannschaftsführer den Block ankündigt",
"Am Aufsprungpunkt des Balles im eigenen Feld"
],
"en": [
"As soon as the ball has left the setter's arm; the attacker's call also helps",
"Only when both attackers start their jump",
"When the team captain announces the block",
"At the point where the ball lands in your own court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6.1, Erläuterung Block",
"en": "Rules of the Game 7.6.1, explanation “Block”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-031",
"ch": 7,
"scope": "ifa",
"q": {
"de": "Worauf achtet der Schiedsrichter beim Block vom Anlauf bis zur Landung durchgehend?",
"en": "What does the referee watch continuously during a block, from the run-up to the landing?"
},
"a": {
"de": [
"Auf die Leine – auch nach der Ballaktion können Spieler sie noch berühren",
"Ausschließlich auf den Ball",
"Auf die Position der Linienrichter",
"Auf den Aufsprungpunkt im Gegenfeld"
],
"en": [
"On the net – players can still touch it after the ball has been played",
"On the ball only",
"On the position of the linesmen",
"On the landing point in the opposite court"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 7.6.1, Erläuterung Block",
"en": "Rules of the Game 7.6.1, explanation “Block”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-020",
"ch": 8,
"scope": "ifa",
"q": {
"de": "Wie wird jeder Fehler gewertet?",
"en": "How is every fault counted?"
},
"a": {
"de": [
"Als Gutball für die gegnerische Mannschaft",
"Als Punktabzug für die fehlerhafte Mannschaft",
"Als Wiederholung der letzten Angabe",
"Je nach Schwere des Fehlers unterschiedlich"
],
"en": [
"As a point for the opposing team",
"As a point deducted from the team at fault",
"As a replay of the last service",
"Differently according to the severity of the fault"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 8.1",
"en": "Rules of the Game 8.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-021",
"ch": 8,
"scope": "ifa",
"q": {
"de": "Wie werden die erzielten Gutbälle im Spielbericht festgehalten?",
"en": "How are the points scored recorded on the match report?"
},
"a": {
"de": [
"Für jede Mannschaft mit arabischen Ziffern in zeitlicher Reihenfolge",
"Als Strichliste ohne Reihenfolge",
"Nur der Satzendstand wird eingetragen",
"Mit römischen Ziffern getrennt nach Sätzen"
],
"en": [
"For each team in Arabic numerals in chronological order",
"As a tally without any order",
"Only the final set score is entered",
"In Roman numerals, separated by set"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 8.2",
"en": "Rules of the Game 8.2"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-022",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Welche Rolle haben die Linienrichter bei der Entscheidungsfindung?",
"en": "What role do the linesmen play in reaching a decision?"
},
"a": {
"de": [
"Sie geben dem Schiedsrichter Hinweise – entschieden wird allein durch den Schiedsrichter",
"Ihre Anzeige ist für den Schiedsrichter bindend",
"Sie entscheiden über Ausbälle endgültig",
"Bei Uneinigkeit entscheiden sie gemeinsam mit dem Schiedsrichter"
],
"en": [
"They give the referee indications – the referee decides alone",
"Their signal is binding on the referee",
"They decide finally on balls out",
"If they disagree, they decide together with the referee"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2, Erläuterung selbstständige Entscheidungen",
"en": "Rules of the Game 9.2, explanation “Independent decisions”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-032",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Der Linienrichter zeigt Aus, der Schiedsrichter hat den Ball als gut wahrgenommen. Was gilt?",
"en": "The linesman signals out, but the referee saw the ball in. What applies?"
},
"a": {
"de": [
"Der Schiedsrichter kann überstimmen, sollte das aber nur im absoluten Ausnahmefall tun",
"Die Anzeige des Linienrichters ist bindend",
"Die letzte Angabe ist zu wiederholen",
"Der Anschreiber entscheidet"
],
"en": [
"The referee may overrule, but should only do so in absolutely exceptional cases",
"The linesman's signal is binding",
"The last service is to be replayed",
"The scorer decides"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2, Erläuterung selbstständige Entscheidungen",
"en": "Rules of the Game 9.2, explanation “Independent decisions”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-033",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Die zentrale Spielleitung vergisst, das Ende der Spielzeit abzupfeifen. Was tust du?",
"en": "The central timekeeper forgets to whistle for the end of playing time. What do you do?"
},
"a": {
"de": [
"Der Schiedsrichter übernimmt und zählt eigenständig so laut ab, dass auch Nachbarfelder reagieren können",
"Der Satz läuft weiter, bis das Signal kommt",
"Der Satz wird annulliert und wiederholt",
"Der Anschreiber entscheidet über das Satzende"
],
"en": [
"The referee takes over and counts down loudly enough for neighbouring courts to react as well",
"The set continues until the signal comes",
"The set is annulled and replayed",
"The scorer decides when the set ends"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2.1, Erläuterung zentrale Zeitnahme",
"en": "Rules of the Game 9.2.1, explanation “Central timing”"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-023",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Sind Tatsachenentscheidungen des Schiedsrichters anfechtbar?",
"en": "Can the referee's decisions on matters of fact be challenged?"
},
"a": {
"de": [
"Nein, sie sind unanfechtbar",
"Ja, durch den Mannschaftsführer",
"Ja, wenn beide Linienrichter widersprechen",
"Ja, per Videobeweis auf Antrag der Mannschaft"
],
"en": [
"No, they cannot be challenged",
"Yes, by the team captain",
"Yes, if both linesmen disagree",
"Yes, by video review at the team's request"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2",
"en": "Rules of the Game 9.2"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-034",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Wer initiiert das Heranziehen eines Videobeweises?",
"en": "Who initiates the use of video review?"
},
"a": {
"de": [
"Ausschließlich der Haupt-Schiedsrichter",
"Der Mannschaftsführer",
"Der Video-Assistenz-Schiedsrichter",
"Der Veranstalter"
],
"en": [
"The head referee only",
"The team captain",
"The video assistant referee",
"The organiser"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.1",
"en": "Rules of the Game 9.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-024",
"ch": 9,
"scope": "ifa",
"q": {
"de": "Wer bestätigt nach dem Spiel die Richtigkeit der Eintragungen im Spielbericht durch Unterschrift?",
"en": "Who confirms by signature after the match that the entries on the match report are correct?"
},
"a": {
"de": [
"Schiedsrichter, Anschreiber und beide Mannschaftsführer",
"Nur der Schiedsrichter",
"Schiedsrichter und Anschreiber",
"Beide Mannschaftsführer allein"
],
"en": [
"Referee, scorer and both team captains",
"The referee only",
"Referee and scorer",
"Both team captains alone"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.2.5",
"en": "Rules of the Game 9.2.5"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-035",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Ein Spieler tritt nach einem eigenen Fehler laut fluchend gegen den Pfosten. Welche Maßnahme ist angemessen?",
"en": "After a fault of his own a player kicks the post while swearing loudly. What measure is appropriate?"
},
"a": {
"de": [
"Verwarnung (gelbe Karte)",
"Zeitstrafe (gelb-rote Karte)",
"Feldverweis (rote Karte)",
"Keine Maßnahme, da niemand beleidigt wurde"
],
"en": [
"Warning (yellow card)",
"Time penalty (yellow and red card)",
"Sending off (red card)",
"No measure, since nobody was insulted"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Beispiele von unsportlichem Verhalten",
"en": "Training Manual 10.1, examples of unsporting behaviour"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-036",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Ein Spieler, der bereits eine Zeitstrafe erhalten hat, begeht nach seiner Rückkehr ein weiteres Vergehen, das mit einer Karte geahndet werden soll. Welche Karte?",
"en": "A player who has already received a time penalty commits another offence after returning that is to be punished with a card. Which card?"
},
"a": {
"de": [
"Zwingend die rote Karte",
"Erneut die gelb-rote Karte",
"Die gelbe Karte",
"Die Wahl liegt im Ermessen des Schiedsrichters"
],
"en": [
"The red card, without exception",
"The yellow-and-red card again",
"The yellow card",
"The choice is at the referee's discretion"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Vorgehen bei wiederholten Verstößen",
"en": "Training Manual 10.1, procedure for repeated offences"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-037",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Der Schiedsrichter hat versehentlich keine Karten dabei. Kann er dennoch verwarnen oder des Feldes verweisen?",
"en": "The referee has accidentally come without his cards. Can he still warn a player or send him off?"
},
"a": {
"de": [
"Ja – Verwarnung und Feldverweis können auch ohne Karte erfolgen",
"Nein, ohne Karte ist keine Strafe möglich",
"Nur mündliche Ermahnungen sind möglich",
"Nur nach Rücksprache mit dem Anschreiber"
],
"en": [
"Yes – a warning and a sending off may also be given without a card",
"No, without a card no penalty is possible",
"Only verbal warnings are possible",
"Only after consulting the scorer"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Erläuterung Karten",
"en": "Training Manual 10.1, explanation on cards"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-038",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Bis wann können Strafen erteilt werden?",
"en": "Up to what point may penalties be imposed?"
},
"a": {
"de": [
"Bis die Spielformulare fertig ausgefüllt und unterschrieben sind",
"Bis zum Schlusspfiff",
"Bis zum Ende des laufenden Satzes",
"Bis die Mannschaften das Spielfeld verlassen haben"
],
"en": [
"Until the match reports have been completed and signed",
"Until the final whistle",
"Until the end of the current set",
"Until the teams have left the court"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Erläuterung Karten",
"en": "Training Manual 10.1, explanation on cards"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-039",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Ein Spieler spuckt einen Gegner an. Welche Maßnahme ist vorgesehen?",
"en": "A player spits at an opponent. What measure is provided for?"
},
"a": {
"de": [
"Feldverweis (rote Karte) – der Vorfall kann auch zum Spielabbruch führen",
"Verwarnung (gelbe Karte)",
"Zeitstrafe (gelb-rote Karte)",
"Ermahnung und Eintrag im Spielbericht"
],
"en": [
"Sending off (red card) – the incident may also lead to the match being abandoned",
"Warning (yellow card)",
"Time penalty (yellow and red card)",
"A verbal warning and an entry on the match report"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Feldverweis",
"en": "Training Manual 10.1, sending off"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-040",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Ein Zuschauer wirft Gegenstände auf das Spielfeld. Wie gehst du vor?",
"en": "A spectator throws objects onto the court. How do you proceed?"
},
"a": {
"de": [
"Verweis durch den Schiedsrichter; die Entfernung ist Aufgabe des Organisators, das Spiel kann so lange unterbrochen werden",
"Sofortiger Spielabbruch",
"Verwarnung der Heimmannschaft",
"Der Schiedsrichter entfernt den Zuschauer selbst"
],
"en": [
"A dismissal by the referee; removing the person is the organiser's task and play may be suspended until then",
"Abandoning the match immediately",
"A warning for the home team",
"The referee removes the spectator himself"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1, Sanktionsmöglichkeiten gegenüber Zuschauern",
"en": "Training Manual 10.1, measures against spectators"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-041",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft verzögert wiederholt die Rückgabe des Balles. Was soll der Verwarnung in der Regel vorausgehen?",
"en": "A team repeatedly delays returning the ball. What should normally precede the warning?"
},
"a": {
"de": [
"Mindestens eine Ermahnung „Bitte spielen“",
"Ein Strafball für den Gegner",
"Eine Zeitstrafe gegen den betroffenen Spieler",
"Nichts – die Verwarnung kann unmittelbar erfolgen"
],
"en": [
"At least one verbal warning (\"Please play\")",
"A penalty point for the opponent",
"A time penalty against the player concerned",
"Nothing – the warning may be given straight away"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.2, Erläuterung Verwarnung gegen Mannschaft",
"en": "Training Manual 10.2, explanation of warning against team"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-042",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Ein Trainer erhält die rote Karte. Was folgt daraus?",
"en": "A coach is shown the red card. What follows from that?"
},
"a": {
"de": [
"Er muss in den Zuschauerbereich und darf auf die Spieler nicht mehr einwirken",
"Er darf auf der Bank bleiben, sich aber nicht mehr äußern",
"Die Mannschaft spielt zusätzlich 10 Gutbälle in Unterzahl",
"Er darf nach 10 Gutbällen auf die Bank zurückkehren"
],
"en": [
"He has to go to the spectator area and may no longer influence the players",
"He may stay on the bench but must not speak any more",
"The team plays a further 10 points short-handed",
"He may return to the bench after 10 points"
]
},
"c": 0,
"ref": {
"de": "Schulungsmappe 10.1.3, Erläuterung Feldverweis Trainer/Betreuer",
"en": "Training Manual 10.1.3, explanation on sending off a coach or manager"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-025",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Wie lange dauert der Ausschluss bei einer Zeitstrafe?",
"en": "How long does exclusion under a time penalty last?"
},
"a": {
"de": [
"Bis beide Mannschaften zusammen 10 Gutbälle erzielt haben – die Strafe kann in den nächsten Satz hineinreichen",
"Bis zum Ende des laufenden Satzes",
"Zehn Minuten",
"Bis der Schiedsrichter den Spieler zurückholt"
],
"en": [
"Until both teams together have scored 10 points – the penalty can carry over into the next set",
"Until the end of the current set",
"Ten minutes",
"Until the referee calls the player back"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.1, Schulungsmappe Zeitstrafe",
"en": "Rules of the Game 10.1; Training Manual 10.1, time penalty"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-043",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Während einer laufenden Zeitstrafe wird ein weiterer Spieler derselben Mannschaft des Feldes verwiesen. Wie ist zu verfahren?",
"en": "While a time penalty is running, another player of the same team is sent off. How is this handled?"
},
"a": {
"de": [
"Das Spiel ist abzubrechen",
"Die Mannschaft spielt zu dritt weiter",
"Der zuerst ausgeschlossene Spieler darf sofort zurückkehren",
"Ein Auswechselspieler ersetzt den verwiesenen Spieler"
],
"en": [
"The match is to be abandoned",
"The team plays on with three players",
"The player excluded first may return immediately",
"A substitute replaces the player sent off"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.1.1",
"en": "Rules of the Game 10.1.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-026",
"ch": 10,
"scope": "ifa",
"q": {
"de": "Darf ein zeitweilig ausgeschlossener Spieler während seiner Zeitstrafe ersetzt werden?",
"en": "May a temporarily excluded player be replaced during his time penalty?"
},
"a": {
"de": [
"Nein",
"Ja, durch einen beliebigen Auswechselspieler",
"Ja, aber nur nach Zustimmung des Gegners",
"Ja, sobald die Mannschaft das Angaberecht erhält"
],
"en": [
"No",
"Yes, by any substitute",
"Yes, but only with the opponent's consent",
"Yes, as soon as the team gains the right to serve"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 10.1.1",
"en": "Rules of the Game 10.1.1"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-001",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-01",
"q": {
"de": "Der Ball kommt an der Grenzlinie auf. Gutball oder Fehler?",
"en": "The ball lands at the boundary line. Point or fault?"
},
"a": {
"de": [
"Gutball – der Ball liegt im Feld",
"Fehler – der Ball muss die Linie berühren, um gut zu sein",
"Fehler – der Ball berührt die Linie nicht",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Point – the ball is inside the court",
"Fault – the ball has to touch the line to be in",
"Fault – the ball does not touch the line",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2 – der Ball liegt vollständig im Feld.",
"en": "Rules of the Game 1.1.2 – the ball lies entirely inside the court."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-002",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-02",
"q": {
"de": "Der Ball liegt auf der Grenzlinie. Wie entscheidest du?",
"en": "The ball lies on the boundary line. What is your decision?"
},
"a": {
"de": [
"Gutball – der Ball berührt die Linie",
"Fehler – der größte Teil des Balles liegt außerhalb",
"Fehler – der Ball berührt die Linie nicht",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Point – the ball touches the line",
"Fault – most of the ball lies outside",
"Fault – the ball does not touch the line",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Aus oder In – der Ball berührt die Linie an der Feldseite.",
"en": "Rules of the Game 1.1.2, interpretation on in or out – the ball touches the line on the court side."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-003",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-03",
"q": {
"de": "Wie bewertest du diese Ballberührung an der Linie?",
"en": "How do you judge this contact with the line?"
},
"a": {
"de": [
"Gutball – der Ball berührt die Linie",
"Fehler – der Ball berührt die Linie nicht",
"Gutball, aber nur weil er die Linie vollständig überdeckt",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Point – the ball touches the line",
"Fault – the ball does not touch the line",
"Point, but only because it covers the line completely",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Aus oder In – die Auflagefläche liegt auf der Linie.",
"en": "Rules of the Game 1.1.2, interpretation on in or out – the contact area rests on the line."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-004",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-04",
"q": {
"de": "Auf den ersten Blick scheint der Ball im Aus zu sein. Deine Entscheidung?",
"en": "At first glance the ball looks out. What is your decision?"
},
"a": {
"de": [
"Gutball – die Aufsprungstelle berührt noch die Außenkante der Linie",
"Fehler – der Ball liegt außerhalb der Linie",
"Fehler – der Ball überdeckt die Linie nur",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Point – the landing point still touches the outer edge of the line",
"Fault – the ball lies outside the line",
"Fault – the ball merely covers the line",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Aus oder In – maßgeblich ist die Stelle, an der der Ball aufkommt.",
"en": "Rules of the Game 1.1.2, interpretation on in or out – what counts is the point where the ball lands."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-005",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-05",
"q": {
"de": "Der Ball liegt dicht neben der Linie. Gutball oder Fehler?",
"en": "The ball lies close beside the line. Point or fault?"
},
"a": {
"de": [
"Fehler – der Ball berührt die Linie nicht",
"Gutball – der Ball liegt nah genug an der Linie",
"Gutball – der Ball überdeckt die Linie",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Fault – the ball does not touch the line",
"Point – the ball is close enough to the line",
"Point – the ball covers the line",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2, Erläuterung Aus oder In – der Abstand ist klein, aber es gibt keinen Kontakt.",
"en": "Rules of the Game 1.1.2, interpretation on in or out – the gap is small, but there is no contact."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-006",
"ch": 1,
"scope": "ifa",
"shot": "ppt/ball-06",
"q": {
"de": "Wie entscheidest du bei diesem Aufkommen des Balles?",
"en": "What is your decision on where this ball lands?"
},
"a": {
"de": [
"Fehler – der Ball liegt deutlich außerhalb",
"Gutball – der Ball berührt die Linie",
"Gutball – die Linie gehört zum Feld",
"Wiederholung, weil nicht eindeutig erkennbar"
],
"en": [
"Fault – the ball lies clearly outside",
"Point – the ball touches the line",
"Point – the line belongs to the court",
"Replay, because it cannot be judged clearly"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.1.2 – kein Kontakt zur Linie.",
"en": "Rules of the Game 1.1.2 – no contact with the line."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-007",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-07",
"q": {
"de": "Welches Handzeichen zeigt die Schiedsrichterin bzw. der Schiedsrichter?",
"en": "Which hand signal is the referee showing?"
},
"a": {
"de": [
"Block",
"Gleichstand",
"Ball war knapp gut",
"Wiederholung der letzten Angabe"
],
"en": [
"Block",
"Tie",
"Ball was just in",
"Repetition of the last service"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 7 – gestreckter Arm, geschlossene Faust senkrecht nach oben. Schulungsfolien Faustball Deutschland: unterstützt durch den Ausruf „BLOCK“.",
"en": "IFA Training Manual, hand signal 7 – straight arm with closed fist held vertically upwards. Faustball Deutschland training slides: supported by the call \"BLOCK\"."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-008",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-18",
"q": {
"de": "Welches Handzeichen wird hier gezeigt?",
"en": "Which signal is shown here?"
},
"a": {
"de": [
"Gleichstand",
"Block",
"Behinderung",
"Time out"
],
"en": [
"Tie",
"Block",
"Obstruction",
"Time out"
]
},
"c": 0,
"ref": {
"de": "Schulungsfolien Faustball Deutschland (Spielrichter-Gestik), Zeichen 18 Gleichstand – beide gestreckten Arme mit geschlossener Faust vor der Brust. Nicht zu verwechseln mit dem Block, bei dem nur ein Arm nach oben geht.",
"en": "Faustball Deutschland training slides (officials' signals), signal 18 tie – both arms extended with closed fists in front of the chest. Not to be confused with block, where only one arm goes up."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-BILD-009",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-14",
"q": {
"de": "Die Fäuste sind vor der Brust verbunden, die Arme bleiben angewinkelt. Was zeigt die Schiedsrichterin an?",
"en": "The fists are joined in front of the chest with the arms bent. What is the referee indicating?"
},
"a": {
"de": [
"Behinderung",
"Gleichstand",
"Block",
"Zweimal auf"
],
"en": [
"Obstruction",
"Tie",
"Block",
"Two bounces"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 14 – beide Hände außerhalb des Körperrahmens zu Fäusten geschlossen und horizontal an der Brust verbunden. Beim Gleichstand sind die Arme dagegen nach vorn gestreckt.",
"en": "IFA Training Manual, hand signal 14 – both hands closed into fists outside the body frame and joined horizontally at the chest. For a tie the arms are extended forward instead."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-010",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-06",
"q": {
"de": "Welches Handzeichen zeigt die Schiedsrichterin?",
"en": "Which signal is the referee showing?"
},
"a": {
"de": [
"Time out oder sonstige Spielunterbrechung",
"Auswechslung",
"Ball hat die Decke berührt",
"Behinderung"
],
"en": [
"Time out or other interruption of play",
"Substitution",
"Ball touched the ceiling",
"Obstruction"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 6 – ein abgewinkelter Arm zeigt mit geöffneter Hand nach oben, die andere geöffnete Hand wird mittig darüber gelegt.",
"en": "IFA Training Manual, hand signal 6 – one bent arm points upwards with an open hand, the other open hand is placed across it."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-011",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-13",
"q": {
"de": "Beide Hände weisen mit geöffneter Handfläche nach oben. Was zeigt der Schiedsrichter an?",
"en": "Both hands point upwards with open palms. What is the referee indicating?"
},
"a": {
"de": [
"Der Ball hat nach einem Überschlag die Decke berührt",
"Time out",
"Der Ball ist unter dem Band hindurchgeflogen",
"Gleichstand"
],
"en": [
"After a return the ball touched the ceiling",
"Time out",
"The ball passed underneath the tape",
"Tie"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 13 – Deckenberührung nach einem Überschlag. Der zweite Arm zeigt danach waagerecht zur Mannschaft, die den Punkt erhält.",
"en": "IFA Training Manual, hand signal 13 – contact with the ceiling after a return. The second arm then points horizontally to the team awarded the point."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-012",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-11",
"q": {
"de": "Die offene Hand zeigt mit der Handfläche nach oben schräg nach unten vor dem Körper. Welche Situation wird angezeigt?",
"en": "The open hand points diagonally downwards in front of the body with the palm facing up. Which situation is being indicated?"
},
"a": {
"de": [
"Der Ball ist unter dem Band hindurchgeflogen",
"Der Ball ist ohne Berührung über das Netz gesprungen",
"Der Ball hat den Körper berührt",
"Zweimal auf"
],
"en": [
"The ball passed underneath the tape",
"The ball bounced over the net without contact",
"The ball touched the body",
"Two bounces"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 11 – die Flugbahn des Balles wird unterhalb des Bandes nachgezeigt.",
"en": "IFA Training Manual, hand signal 11 – the flight path of the ball is traced below the tape."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-013",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-12",
"q": {
"de": "Der Arm führt mit der Handfläche nach unten über den Körper. Welche Situation wird angezeigt?",
"en": "The arm moves across above the body with the palm facing down. Which situation is being indicated?"
},
"a": {
"de": [
"Der Ball ist ohne Berührung über das Netz gesprungen",
"Der Ball ist unter dem Band hindurchgeflogen",
"Der Ball hat die Decke berührt",
"Block"
],
"en": [
"The ball bounced over the net without contact",
"The ball passed underneath the tape",
"The ball touched the ceiling",
"Block"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 12 – die Flugbahn wird oberhalb des Körpers nachgezeigt, Handfläche nach unten.",
"en": "IFA Training Manual, hand signal 12 – the flight path is traced above the body with the palm facing down."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-014",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-08",
"q": {
"de": "Beide Arme zeigen waagerecht nach außen, die Daumen nach oben. Was bedeutet das Zeichen?",
"en": "Both arms point horizontally outwards with the thumbs up. What does this signal mean?"
},
"a": {
"de": [
"Wiederholung der letzten Angabe",
"Gleichstand",
"Ausball",
"Time out"
],
"en": [
"Repetition of the last service",
"Tie",
"Ball out",
"Time out"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 8.",
"en": "IFA Training Manual, hand signal 8."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-015",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-05",
"q": {
"de": "Der gestreckte Arm zeigt mit zwei gespreizten Fingern nach unten. Welcher Fehler wird angezeigt?",
"en": "The extended arm points downwards with two fingers spread. Which fault is being indicated?"
},
"a": {
"de": [
"Zweimal auf",
"Übertritt",
"Ball war knapp gut",
"Der Ball hat den Körper berührt"
],
"en": [
"Double bounce",
"Foot fault",
"Ball was just in",
"The ball touched the body"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 5.",
"en": "IFA Training Manual, hand signal 5."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-016",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-02",
"q": {
"de": "Eine Hand klopft auf einen Körperteil, der zweite Arm zeigt in die Waagerechte. Was zeigt der Schiedsrichter an?",
"en": "One hand taps a part of the body while the second arm points horizontally. What is the referee indicating?"
},
"a": {
"de": [
"Der Ball hat diesen Körperteil berührt",
"Der Spieler ist verletzt und wird ausgewechselt",
"Behinderung durch einen Gegenspieler",
"Unsportliches Verhalten"
],
"en": [
"The ball touched this part of the body",
"The player is injured and will be substituted",
"Obstruction by an opponent",
"Unsporting behaviour"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 2 – die Hand zeigt auf den Körperteil, den der Ball berührt hat.",
"en": "IFA Training Manual, hand signal 2 – the hand points to the part of the body the ball touched."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-017",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-03",
"q": {
"de": "Der ausgestreckte Arm zeigt mit geöffneter Hand nach oben, der zweite Arm in die Waagerechte. Welchen Fehler zeigt der Schiedsrichter an?",
"en": "The extended arm points upwards with an open hand, the second arm horizontally. Which fault is the referee indicating?"
},
"a": {
"de": [
"Ball an Netz, Band oder Leine",
"Übertritt an der Angabelinie",
"Ball ohne Berührung über das Netz",
"Zweimal auf"
],
"en": [
"Ball at the net, tape or cord",
"Foot fault at the service line",
"Ball over the net without contact",
"Two bounces"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 3 – ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Netz (Band/Leine). Beim Übertritt (Zeichen 4) weist derselbe Arm dagegen schräg nach unten zur Angabelinie.",
"en": "IFA Training Manual, hand signal 3 – an extended arm with an open hand points towards the net (tape/cord). For a foot fault (signal 4) the same arm points diagonally downwards to the service line instead."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-018",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-04",
"q": {
"de": "Der ausgestreckte Arm zeigt mit geöffneter Hand schräg nach unten, der zweite Arm in die Waagerechte. Welchen Fehler zeigt der Schiedsrichter an?",
"en": "The extended arm points diagonally downwards with an open hand, the second arm horizontally. Which fault is the referee indicating?"
},
"a": {
"de": [
"Übertritt an der Angabelinie",
"Ball an Netz, Band oder Leine",
"Ball unter dem Band hindurch",
"Behinderung"
],
"en": [
"Foot fault at the service line",
"Ball at the net, tape or cord",
"Ball underneath the tape",
"Obstruction"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 4 – ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Angabelinie. Beim Netzfehler (Zeichen 3) weist derselbe Arm nach oben.",
"en": "IFA Training Manual, hand signal 4 – an extended arm with an open hand points towards the service line. For a fault at the net (signal 3) the same arm points upwards."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-BILD-019",
"ch": 11,
"scope": "ifa",
"shot": "signals/sig-09",
"q": {
"de": "Beide Hände kreisen umeinander. Was zeigt die Schiedsrichterin an?",
"en": "Both hands circle around each other. What is the referee indicating?"
},
"a": {
"de": [
"Auswechslung",
"Time out",
"Wiederholung der letzten Angabe",
"Zweimal auf"
],
"en": [
"Substitution",
"Time out",
"Repetition of the last service",
"Two bounces"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 9 – die Auswechslung ist durch Kreisen beider Hände über dem Kopf zu signalisieren. Das Foto zeigt die Bewegung auf Brusthöhe; maßgeblich ist die Beschreibung.",
"en": "IFA Training Manual, hand signal 9 – a substitution is signalled by circling both hands above the head. The photo shows the movement at chest height; the written description prevails."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-027",
"ch": 11,
"scope": "ifa",
"q": {
"de": "Wohin zeigt bei den meisten Handzeichen der zweite Arm?",
"en": "With most hand signals, where does the second arm point?"
},
"a": {
"de": [
"In die Waagerechte, in Richtung der Mannschaft, die den Gutball erzielt hat",
"In die Waagerechte, in Richtung der Mannschaft, die den Fehler begangen hat",
"Immer in Richtung des Anschreibertisches",
"Senkrecht nach oben, um die Unterbrechung zu bestätigen"
],
"en": [
"Horizontally, towards the team that has won the point",
"Horizontally, towards the team that committed the fault",
"Always towards the scorer's table",
"Vertically upwards, to confirm the interruption"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 1 bis 5 und 11 bis 14 – der zweite Arm zeigt in die Waagerechte, in Richtung der Mannschaft, die den Gutpunkt erzielt hat (bei Behinderung ggf. stattdessen das Zeichen für Wiederholung der Angabe).",
"en": "IFA Training Manual, hand signals 1 to 5 and 11 to 14 – the second arm points horizontally towards the team that scored the point (for interference, the repetition-of-service signal may be shown instead)."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-044",
"ch": 11,
"scope": "ifa",
"q": {
"de": "Der Ball berührt den Fuß eines Spielers. Wie zeigt der Schiedsrichter das an?",
"en": "The ball touches a player's foot. How does the referee indicate this?"
},
"a": {
"de": [
"Die Hand auf Brust oder Oberschenkel genügt, bei Bedarf ergänzt durch den Zuruf „Fuß“",
"Der Schiedsrichter muss sich bücken und den Fuß berühren",
"Es gibt kein Handzeichen, der Pfiff allein genügt",
"Der Schiedsrichter zeigt mit gespreizten Fingern nach unten"
],
"en": [
"Touching the chest or thigh is sufficient, if necessary supported by calling \"foot\"",
"The referee has to bend down and touch the foot",
"There is no hand signal, the whistle alone is sufficient",
"The referee points downwards with spread fingers"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 2, Hinweis zu Treffern am Fuß.",
"en": "IFA Training Manual, hand signal 2, note on contacts with the foot."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-028",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Worauf gründet der Schiedsrichter seine Entscheidungen?",
"en": "On what does the referee base his decisions?"
},
"a": {
"de": [
"Auf die visuelle Wahrnehmung; das Gehör darf sie nur bestätigen",
"Auf das Gehör, weil ein Ballkontakt hörbar ist",
"Auf die übereinstimmende Einschätzung beider Mannschaftsführer",
"Auf die Einschätzung der Linienrichter"
],
"en": [
"On visual perception; hearing may only confirm it",
"On hearing, because contact with the ball is audible",
"On the matching assessment of both team captains",
"On the assessment of the linesmen"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – neutrale Entscheidungsfindung.",
"en": "IFA Training Manual, conduct of the referee – neutral decision-making."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-045",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Der Schiedsrichter erkennt unmittelbar, dass seine Entscheidung falsch war. Wie ist zu verfahren?",
"en": "The referee immediately realises that his decision was wrong. How should he proceed?"
},
"a": {
"de": [
"Er kann sie ohne weiteres zurücknehmen, sofern der Spielgang das noch zulässt",
"Eine getroffene Entscheidung ist in keinem Fall zurückzunehmen",
"Er nimmt sie nur zurück, wenn beide Mannschaftsführer zustimmen",
"Er gleicht den Fehler bei der nächsten strittigen Situation aus"
],
"en": [
"He may withdraw it without further ado, provided the rally still allows it",
"A decision once taken must never be withdrawn",
"He only withdraws it if both team captains agree",
"He compensates for the error at the next disputed situation"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – Umgang mit eigenen Fehlern.",
"en": "IFA Training Manual, conduct of the referee – dealing with one's own mistakes."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-046",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Eine Mannschaft legt Einspruch gegen eine Tatsachenentscheidung ein. Was tut der Schiedsrichter?",
"en": "A team lodges an objection against a decision of fact. What does the referee do?"
},
"a": {
"de": [
"Er vermerkt den Einspruch sofort auf dem Spielformular",
"Er weist ihn zurück, da Tatsachenentscheidungen unanfechtbar sind, und vermerkt nichts",
"Er unterbricht das Spiel bis zur Klärung durch die Spielleitung",
"Er trägt ihn nur ein, wenn er den Einspruch für berechtigt hält"
],
"en": [
"He notes the objection on the match form immediately",
"He rejects it, since decisions of fact are final, and records nothing",
"He interrupts the match until the competition management has clarified it",
"He records it only if he considers the objection justified"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – Einsprüche. Auch Einsprüche gegen Tatsachenentscheidungen sind sofort zu vermerken.",
"en": "IFA Training Manual, conduct of the referee – objections. Objections against decisions of fact must also be recorded immediately."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-029",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Der Mannschaftsführer stellt während des Spiels eine Frage. Wie verhält sich der Schiedsrichter?",
"en": "The team captain asks a question during the match. How does the referee respond?"
},
"a": {
"de": [
"Er muss antworten, gibt die Antwort kurz und klar und lässt keine Diskussion zu",
"Er ist zu einer Antwort nicht verpflichtet",
"Er antwortet erst in der nächsten Spielpause",
"Er verweist die Frage an den Anschreiber"
],
"en": [
"He must answer, gives the answer briefly and clearly and allows no discussion",
"He is not obliged to answer",
"He answers only at the next break in play",
"He refers the question to the scorer"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – Fragen von Mannschaftsführern.",
"en": "IFA Training Manual, conduct of the referee – questions from team captains."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-047",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Wer darf bei einer Jugendmannschaft an Stelle des Mannschaftsführers Fragen an den Schiedsrichter richten?",
"en": "In a youth team, who may address questions to the referee instead of the team captain?"
},
"a": {
"de": [
"Gegebenenfalls eine volljährige Betreuungsperson",
"Jeder Spieler der Mannschaft",
"Ausschließlich der Mannschaftsführer, ohne Ausnahme",
"Ein Elternteil aus dem Zuschauerbereich"
],
"en": [
"If applicable, an adult member of the support staff",
"Any player of the team",
"Exclusively the team captain, without exception",
"A parent from the spectator area"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – Fragen von Mannschaftsführern.",
"en": "IFA Training Manual, conduct of the referee – questions from team captains."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-048",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Das Spiel artet aus und der Schiedsrichter fühlt sich durch Zuschauer bedroht. Was hat er zu tun?",
"en": "The match gets out of hand and the referee feels threatened by spectators. What must he do?"
},
"a": {
"de": [
"Er erteilt den Mannschaftsführern beziehungsweise dem Veranstalter die notwendigen Weisungen",
"Er bricht das Spiel unverzüglich und endgültig ab",
"Er setzt das Spiel unverändert fort, da Zuschauer nicht seine Zuständigkeit sind",
"Er übergibt die Spielleitung an einen Linienrichter"
],
"en": [
"He gives the necessary instructions to the team captains or to the organiser",
"He abandons the match immediately and definitively",
"He continues the match unchanged, as spectators are not his responsibility",
"He hands over the conduct of the match to a linesman"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Verhalten des Schiedsrichters – der Schiedsrichter hat alle Maßnahmen zu ergreifen, die eine klaglose Beendigung des Wettspieles ermöglichen.",
"en": "IFA Training Manual, conduct of the referee – the referee must take all measures that allow the match to be completed without complaint."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-030",
"ch": 12,
"scope": "ifa",
"q": {
"de": "Wie hält es der Schiedsrichter mit den Eintragungen des Anschreibers?",
"en": "How does the referee handle the scorer's entries?"
},
"a": {
"de": [
"Er überwacht sie und prüft die Aufzeichnung in regelmäßigen Abständen",
"Er prüft sie ausschließlich nach Spielende",
"Die Prüfung obliegt allein den Mannschaftsführern",
"Er prüft sie nur, wenn eine Mannschaft das verlangt"
],
"en": [
"He supervises them and checks the record at regular intervals",
"He checks them only after the end of the match",
"Checking is solely the responsibility of the team captains",
"He checks them only if a team requests it"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Aufgaben des Schiedsrichters während des Spiels.",
"en": "IFA Training Manual, duties of the referee during the match."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-031",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Wo haben die Linienrichter ihren Stand?",
"en": "Where are the linesmen positioned?"
},
"a": {
"de": [
"An den Endpunkten der dem Schiedsrichter gegenüberliegenden Seitenlinie",
"An den Endpunkten der Seitenlinie auf der Seite des Schiedsrichters",
"Jeweils hinter den beiden Grundlinien",
"Neben dem Anschreibertisch"
],
"en": [
"At the end points of the side line opposite the referee",
"At the end points of the side line on the referee's side",
"Behind the two base lines",
"Next to the scorer's table"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.3.",
"en": "Rules of the Game 9.3."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-032",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Der Linienrichter zeigt mit der Fahne senkrecht nach oben. Was bedeutet das?",
"en": "The linesman holds the flag vertically upwards. What does that mean?"
},
"a": {
"de": [
"Ausball – der Ball hat außerhalb der Begrenzungslinien den Boden berührt",
"Der Ball war knapp im Feld",
"Der Linienrichter kann die Situation nicht beurteilen",
"Der Linienrichter bittet um eine Spielunterbrechung"
],
"en": [
"Ball out – the ball touched the ground outside the boundary lines",
"The ball was just in",
"The linesman cannot judge the situation",
"The linesman requests an interruption of play"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 16 – Linienrichter und Schiedsrichter-Assistenten.",
"en": "IFA Training Manual, hand signal 16 – linesmen and referee assistants."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-033",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Der Linienrichter hält die Fahne mit beiden Händen waagerecht in Brusthöhe. Was heißt das?",
"en": "The linesman holds the flag horizontally at chest height with both hands. What does that mean?"
},
"a": {
"de": [
"Er kann zu der Situation keine Aussage machen",
"Der Ball war eindeutig im Feld",
"Der Ball war eindeutig im Aus",
"Er meldet einen Wechsel der Linienrichter an"
],
"en": [
"He cannot give a judgement on the situation",
"The ball was clearly inside the court",
"The ball was clearly out",
"He is announcing a change of linesmen"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Handzeichen 16 sowie Abschnitt „Kontinuierlicher Standortwechsel“, Abbildung 3.",
"en": "IFA Training Manual, hand signal 16 and best position of the linesman 3."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-049",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Beide Linienrichter können einen Ausball nicht beurteilen. Wer entscheidet?",
"en": "Neither linesman can judge a ball out. Who decides?"
},
"a": {
"de": [
"Der Schiedsrichter übernimmt die Verantwortung und entscheidet",
"Der Ballwechsel wird wiederholt",
"Der Punkt geht an die abwehrende Mannschaft",
"Die Mannschaftsführer einigen sich"
],
"en": [
"The referee takes responsibility and decides",
"The rally is replayed",
"The point goes to the defending team",
"The team captains reach an agreement"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Abschnitt „Kontinuierlicher Standortwechsel“, Abbildung 3 – kann auch der Kollege die Situation nicht erkennen, übernimmt der Schiedsrichter.",
"en": "IFA Training Manual, best position of the linesman 3 – if the colleague cannot see the situation either, the referee takes over."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-050",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Ein Ball geht ins Aus. Wie ist das Zusammenspiel der beiden Linienrichter geregelt?",
"en": "A ball goes out. How is the interaction between the two linesmen regulated?"
},
"a": {
"de": [
"Der vorrangige Linienrichter hebt die Fahne, der Kollege quittiert mit kurzer Verzögerung",
"Beide heben die Fahne gleichzeitig, damit die Entscheidung eindeutig ist",
"Nur der Linienrichter auf der Angabeseite zeigt an, der andere bleibt untätig",
"Der Kollege reagiert zuerst, damit der vorrangige Linienrichter ihn bestätigen kann"
],
"en": [
"The linesman in charge raises the flag, the colleague acknowledges with a short delay",
"Both raise the flag simultaneously so that the decision is unambiguous",
"Only the linesman on the service side signals, the other remains inactive",
"The colleague reacts first so that the linesman in charge can confirm him"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Abschnitt „Kontinuierlicher Standortwechsel“, Abbildung 2 – der Kollege darf auf keinen Fall zuerst reagieren.",
"en": "IFA Training Manual, best position of the linesman 2 – the colleague must never react first."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-051",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Halle: Der Ball springt im Feld auf und berührt danach die Hallenwand. Wie signalisiert der Linienrichter?",
"en": "Indoor: the ball bounces inside the court and then touches the hall wall. How does the linesman signal?"
},
"a": {
"de": [
"Fahne in das Feld, gleichzeitig den anderen Arm senkrecht nach oben",
"Nur die Fahne senkrecht nach oben",
"Nur die Fahne in Richtung Spielfeld",
"Fahne waagerecht vor dem Körper"
],
"en": [
"Flag into the court and at the same time the other arm vertically upwards",
"Only the flag vertically upwards",
"Only the flag towards the court",
"Flag horizontally in front of the body"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, Besonderheiten in der Halle. Dieselbe Signalisierung gilt, wenn der Ball ins Aus fliegt und die abwehrende Mannschaft ihn berührt hat.",
"en": "IFA Training Manual, special features indoors. The same signal applies when the ball flies out after being touched by the defending team."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-034",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Wann wechselt der Standpunkt der Linienrichter?",
"en": "When do the linesmen change their position?"
},
"a": {
"de": [
"Mit jedem Ballwechsel, also beim Angriffs- oder Angabewechsel",
"Nur beim Seitenwechsel zur Halbzeit",
"Nach jedem gewonnenen Satz",
"Der Standpunkt bleibt während des gesamten Spiels unverändert"
],
"en": [
"With every rally, that is at each change of attack or service",
"Only when changing ends at half time",
"After each set won",
"The position remains unchanged throughout the match"
]
},
"c": 0,
"ref": {
"de": "IFA-Schulungsmappe, der Standort der Linienrichter.",
"en": "IFA Training Manual, the position of the linesmen."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-052",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Dürfen Linienrichter während eines Spiels ausgewechselt werden?",
"en": "May linesmen be replaced during a match?"
},
"a": {
"de": [
"Nur aufgrund besonderer Umstände, etwa bei Übelkeit",
"Ja, jederzeit auf Wunsch des Veranstalters",
"Ja, aber nur in der Halbzeitpause",
"Nein, ein Wechsel ist ausnahmslos ausgeschlossen"
],
"en": [
"Only for special reasons, for instance if they feel unwell",
"Yes, at any time at the organiser's request",
"Yes, but only during the half-time break",
"No, a change is excluded without exception"
]
},
"c": 0,
"ref": {
"de": "Schulungsfolien Faustball Deutschland, Linienrichter – Auswechslung von Linienrichtern.",
"en": "Faustball Deutschland training slides, linesmen – replacement of linesmen."
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-C-035",
"ch": 13,
"scope": "ifa",
"q": {
"de": "Welche Aufgabe hat der Anschreiber?",
"en": "What is the task of the scorer?"
},
"a": {
"de": [
"Er hat seinen Platz in der Nähe des Schiedsrichters und bucht nach dessen Zeichen die Gutbälle beider Mannschaften",
"Er entscheidet bei strittigen Bällen gemeinsam mit den Linienrichtern",
"Er misst die Spielzeit und pfeift das Spielende an",
"Er prüft vor dem Spiel die Spielberechtigung der Spieler"
],
"en": [
"He is positioned near the referee and records the points of both teams following the referee's signals",
"He decides on disputed balls together with the linesmen",
"He measures the playing time and whistles for the end of the match",
"He checks the players' eligibility before the match"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 9.4.",
"en": "Rules of the Game 9.4."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-053",
"ch": 8,
"scope": "ifa",
"q": {
"de": "Worauf achtet der Schiedsrichter bei der Eintragung der Gutbälle im Spielbericht besonders?",
"en": "What does the referee pay particular attention to when points are entered in the match report?"
},
"a": {
"de": [
"Dass der Anschreiber die Leerfelder nicht entwertet",
"Dass die Gutbälle mit römischen Ziffern eingetragen werden",
"Dass jede Mannschaft ihre eigenen Punkte selbst einträgt",
"Dass nur die Sätze, nicht die einzelnen Gutbälle festgehalten werden"
],
"en": [
"That the scorer does not cross out the empty boxes",
"That the points are entered in Roman numerals",
"That each team enters its own points itself",
"That only the sets and not the individual points are recorded"
]
},
"c": 0,
"ref": {
"de": "Schulungsfolien Kapitel 8 (Wertung), Folie 3, Notiz zu 8.2.1",
"en": "Training slides chapter 8 (Scoring), slide 3, note on 8.2.1"
},
"origin": "ppt",
"tr": true
},
{
"id": "IFA-C-037",
"ch": 16,
"scope": "fed",
"q": {
"de": "Wann soll der Schiedsrichter am Spielort anwesend sein?",
"en": "When should the referee be present at the venue?"
},
"a": {
"de": [
"30 Minuten vor Spielbeginn",
"15 Minuten vor Spielbeginn",
"60 Minuten vor Spielbeginn",
"Unmittelbar vor der Auslosung"
],
"en": [
"30 minutes before the start of the match",
"15 minutes before the start of the match",
"60 minutes before the start of the match",
"Immediately before the toss"
]
},
"c": 0,
"ref": {
"de": "Schiedsrichterordnung, Aufgaben vor dem Spiel. Rechtzeitig genug, um Spielformular, Zeitvergleich und Geräteprüfung vor dem planmäßigen Anpfiff zu erledigen.",
"en": "Referee regulations, duties before the match. Early enough to complete match form, time check and equipment inspection before the scheduled start."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-038",
"ch": 16,
"scope": "fed",
"q": {
"de": "Wie ist der zeitliche Ablauf unmittelbar vor Spielbeginn geregelt?",
"en": "How is the sequence immediately before the start of the match regulated?"
},
"a": {
"de": [
"5 Minuten vorher beendet ein anhaltender Pfiff das Einspielen, 3 Minuten vorher wird ausgelost",
"3 Minuten vorher endet das Einspielen, 1 Minute vorher wird ausgelost",
"10 Minuten vorher endet das Einspielen, 5 Minuten vorher wird ausgelost",
"Auslosung und Ende des Einspielens fallen zusammen"
],
"en": [
"5 minutes before, a sustained whistle ends the warm-up; 3 minutes before, the toss takes place",
"3 minutes before, the warm-up ends; 1 minute before, the toss takes place",
"10 minutes before, the warm-up ends; 5 minutes before, the toss takes place",
"The toss and the end of the warm-up coincide"
]
},
"c": 0,
"ref": {
"de": "Schiedsrichterordnung, Aufgaben vor dem Spiel – Auslosung.",
"en": "Referee regulations, duties before the match – the toss."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-C-039",
"ch": 16,
"scope": "ifa",
"q": {
"de": "Worüber wird vor Spielbeginn mit den Mannschaftsführern ausgelost?",
"en": "What is decided by the toss with the team captains before the match?"
},
"a": {
"de": [
"Spielfeldseite oder erste Angabe („Angabe“ oder „Abwehr“) – wer die erste Angabe schlägt, wählt das Ballkontingent",
"Nur die Spielfeldseite; die Angabe hat immer die Heimmannschaft",
"Nur die erste Angabe; die Seiten sind vorgegeben",
"Die Reihenfolge der Auswechslungen"
],
"en": [
"Choice of end or of the first service (\"service\" or \"defend\") – the team serving first chooses the balls",
"Only the end; the home team always serves first",
"Only the first service; the ends are predetermined",
"The order of substitutions"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.5",
"en": "Rules of the Game 1.5"
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-054",
"ch": 16,
"scope": "ifa",
"q": {
"de": "Wo verwahrt der Schiedsrichter die nicht gespielten Bälle?",
"en": "Where does the referee keep the balls that are not in play?"
},
"a": {
"de": [
"Außerhalb des Auslaufs – im Auslauf darf außer dem gespielten Ball kein weiterer Ball liegen",
"Direkt neben dem Pfosten, damit der nächste Ball schnell greifbar ist",
"Verteilt im Auslauf hinter den Grundlinien, damit sie schnell greifbar sind",
"Die Bälle verbleiben bei den Mannschaften auf der Auswechselbank"
],
"en": [
"Outside the buffer zone – apart from the ball in play, no ball may lie in the buffer zone",
"Directly beside the post, so that the next ball is quickly at hand",
"Spread around the run-off area behind the base lines so they are quickly at hand",
"The balls stay with the teams on the substitutes' bench"
]
},
"c": 0,
"ref": {
"de": "Spielregeln 1.6: die nicht gespielten Bälle bleiben unter der Kontrolle des Schiedsrichters, aber außerhalb des Auslaufs. Schiedsrichterordnung, Aufgaben während des Spiels: die Reservebälle liegen 3 bis 5 m hinter dem Pfosten. Außer dem gespielten Ball gehört kein Ball in den Auslauf – Spieler verfolgen den Ball dort mit dem Blick nach oben und können auf einem liegenden Ball umknicken.",
"en": "Rules of the Game 1.6: the balls not in use remain under the referee's control, but outside the buffer zone. Referee regulations, duties during the match: spare balls lie at least 3 to 5 m behind the post. Apart from the ball in play, no ball belongs in the run-off area - players there follow the ball with their eyes upwards and can turn an ankle on a ball lying on the ground."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-055",
"ch": 16,
"scope": "ifa",
"q": {
"de": "Wie werden die zu Beginn tatsächlich eingesetzten Spieler im Spielformular kenntlich gemacht?",
"en": "How are the players actually fielded at the start marked on the match form?"
},
"a": {
"de": [
"Mit einem Kreuz; nicht anwesende Spieler werden gestrichen",
"Durch Unterstreichen des Namens; nicht anwesende Spieler bleiben stehen",
"Durch die Rückennummer in Klammern",
"Es wird nichts markiert, der Eintrag der Namen genügt"
],
"en": [
"With a cross; players who are absent are struck out",
"By underlining the name; absent players are left in the list",
"By the shirt number in brackets",
"Nothing is marked, entering the names is sufficient"
]
},
"c": 0,
"ref": {
"de": "Schiedsrichterordnung, Aufgaben vor dem Spiel – Formulareintragungen. Ergänzungen und Auswechslungen werden nachgetragen.",
"en": "Referee regulations, duties before the match – entries on the form. Additions and substitutions are entered subsequently."
},
"origin": "ifa",
"tr": true
},
{
"id": "IFA-A-056",
"ch": 16,
"scope": "ifa",
"q": {
"de": "Was hat der Schiedsrichter nach dem Spiel mit dem Spielformular zu tun?",
"en": "What must the referee do with the match form after the match?"
},
"a": {
"de": [
"Er prüft es auf Vollständigkeit, schließt es mit seiner Unterschrift ab und übergibt es der Spielleitung",
"Er übergibt es unverzüglich dem Mannschaftsführer der Heimmannschaft",
"Er behält es und reicht es innerhalb einer Woche nach",
"Er übergibt es dem Anschreiber, der es unterschreibt"
],
"en": [
"He checks it for completeness, closes it with his signature and hands it to the competition management",
"He hands it immediately to the captain of the home team",
"He keeps it and submits it within a week",
"He hands it to the scorer, who signs it"
]
},
"c": 0,
"ref": {
"de": "Schiedsrichterordnung, Aufgaben nach dem Spiel – Formularprüfung.",
"en": "Referee regulations, duties after the match – checking the form."
},
"origin": "ifa",
"tr": true
}
];
