# -*- coding: utf-8 -*-
"""Zusätze aus den Schulungsfoliensätzen (Faustball Deutschland, Verwendung im
   IFA-Kontext freigegeben). Nur auf Deutsch verfügbar – die App kennzeichnet das."""

def B(de, en=None):
    return {'de': de, 'en': en} if en else {'de': de}

# ---------- Kapitel 1: Bilder ----------
BALL = [
 ('ball-01','Gutball','Ball in',
  'Der Ball liegt vollständig im Feld, ohne die Linie zu berühren.',
  'The ball lies entirely inside the court without touching the line.'),
 ('ball-02','Gutball','Ball in',
  'Der Ball liegt auf der Linie – er berührt sie an der Feldseite.',
  'The ball lies on the line, touching it on the court side.'),
 ('ball-03','Gutball','Ball in',
  'Der Ball liegt mit seiner Auflagefläche mitten auf der Linie.',
  'The ball rests with its contact area in the middle of the line.'),
 ('ball-04','Gutball','Ball in',
  'Der Ball wirkt auf den ersten Blick aus – er berührt die Linie aber noch an ihrer Außenkante. Maßgeblich ist die Stelle, an der er aufkommt.',
  'The ball lies outside and looks out – but it still touches the outer edge of the line. What counts is where it lands.'),
 ('ball-05','Fehler','Fault',
  'Der Ball liegt neben der Linie. Der Abstand ist klein, aber es gibt keinen Kontakt.',
  'The ball lies beside the line. The gap is small, but there is no contact.'),
 ('ball-06','Fehler','Fault',
  'Der Ball liegt deutlich außerhalb, ohne Kontakt zur Linie.',
  'The ball lies clearly outside, with no contact with the line.'),
]
CH1_IMG = [
 {'t':'img','src':'ppt/feld-masse','h':B('Spielfeld Feld – Maße','Outdoor court – dimensions'),
  'x':B('50 m Länge, 20 m Breite, Angabelinie 3 m von der Mittellinie, Leinenhöhe 2 m.',
       '50 m long, 20 m wide, service line 3 m from the centre line, net height 2 m.')},
 {'t':'img','src':'ppt/halle-masse','h':B('Spielfeld Halle – Maße','Indoor court – dimensions'),
  'x':B('40 m Länge, 20 m Breite. Die Mitgliedsverbände dürfen für ihren Spielbetrieb kleinere Feldgrößen zulassen.',
       '40 m long, 20 m wide. Member federations are free to allow smaller court sizes for their own competitions.')},
]
CH1_BALLSERIE_INTRO = {'t':'note','h':B('Gut oder aus? Sechs Beispiele','In or out? Six examples'),
 'x':B('Regel 1.1.2 sagt: „Ein Ball, der diese Linien berührt, ist im Feld.“ Entscheidend ist die Berührung, nicht das Überdecken. Die folgenden Aufnahmen zeigen typische Grenzfälle – links das Spielfeld (Court), rechts der Außenbereich (Outfield).',
       'Rule 1.1.2 states: "A ball touching these lines is in the court." What counts is contact with the line, not covering it. The following photographs show typical borderline cases – the court is on the left, the outfield on the right.')}
CH1_HALLE = [
 {'t':'img','src':'ppt/halle-wand','h':B('Halle: Seitenwände','Indoor: side walls'),
  'x':B('Jede Berührung der Seitenwände durch den Ball ist ein Fehler.','Any contact of the ball with the side walls is a fault.')},
 {'t':'img','src':'ppt/halle-decke-1','h':B('Halle: Hallendecke über dem eigenen Feld','Indoor: ceiling above your own court'),
  'x':B('Die Hallendecke über dem eigenen Spielfeld gehört bei Ballaufnahme und Zuspiel zum Feld – ein Ball, der sie berührt, darf weitergespielt werden.','For the reception and the set-up, the ceiling above your own court belongs to the court – a ball touching it may be played on.')},
 {'t':'img','src':'ppt/halle-decke-2','h':B('Halle: Decke jenseits der Mittellinie','Indoor: ceiling beyond the centre line'),
  'x':B('Ein Ball, der nach einem Überschlag jenseits der Mittellinie die Decke berührt, ist als Fehler zu werten – auch dann, wenn er wieder in das eigene Feld zurückspringt.','A ball that touches the ceiling beyond the centre line after being played over is a fault – even if it bounces back into your own court.')},
 {'t':'img','src':'ppt/auslauf-feld','h':B('Auslauf im Feld','Buffer zone outdoors'),
  'x':B('Zuschauer, benachbarte Spielfelder und andere Hindernisse müssen 6 m von den Seiten- und Hinterlinien entfernt sein. Eingezeichnet sind außerdem Schiedsrichterzone sowie Wechsel- und Time-out-Zone.','Spectators, neighbouring courts and other obstacles must be 6 m away from the side and back lines. The diagram also shows the referee zone and the substitution and time-out zone.')},
 {'t':'img','src':'ppt/auslauf-halle','h':B('Auslauf in der Halle','Buffer zone indoors'),
  'x':B('In der Halle mindestens 0,50 m an den Seitenlinien und mindestens 1 m an den Hinterlinien. Weil der Auslauf variabel ist, empfiehlt es sich, ihn vor dem Spiel mit den Mannschaftsführern zu definieren und vor der ersten Tribünenstufe enden zu lassen.','Indoors at least 0.50 m along the side lines and at least 1 m along the back lines. Because the buffer zone varies from hall to hall, it should be defined with the team captains before the match and should end in front of the first row of the stand.')},
 {'t':'img','src':'ppt/pfosten-3','h':B('Pfosten und Leine','Posts and net'),
  'x':B('Leinenhöhe 2 m für Männer, 1,90 m für Frauen, gemessen vom Boden bis zur Oberkante. Das Berühren der über dieser Höhe liegenden Pfostenteile durch Ball oder Spieler ist ein Fehler.','Net height 2 m for men, 1.90 m for women, measured from the ground to the upper edge. Touching the parts of the post above that height, whether by the ball or by a player, is a fault.')},
]

# ---------- Kapitel 5: Schlagvarianten ----------
SCHLAG_TBL = {'head': B(['Schlagvariante','Bewertung'],['Type of hit','Ruling']),
 'rows': B([
  ['Eine Ballberührung mit Arm oder Faust','erlaubt'],
  ['Ballberührung mit dem Arm bei offener Hand','erlaubt'],
  ['Schnelles Zurückziehen des Armes, damit der Ball Drall bekommt','erlaubt'],
  ['Schlagen in der Armbeuge, ohne dass eine zweimalige Ballberührung vorliegt','erlaubt'],
  ['Rundschlag mit der Faust, wenn diese geschlossen ist','erlaubt'],
  ['Rundschlag mit dem Arm','erlaubt'],
  ['Mehrmaliges Berühren des Balles mit Arm oder Faust','nicht erlaubt'],
  ['Ball berührt Ober- und Unterarm','nicht erlaubt'],
 ],[
  ['One contact with the ball using arm or fist','allowed'],
  ['Contact with the arm with an open hand','allowed'],
  ['Pulling the arm back quickly to put spin on the ball','allowed'],
  ['Hitting in the crook of the arm without a double contact','allowed'],
  ['Round-arm hit with the fist, provided the fist is closed','allowed'],
  ['Round-arm hit with the arm','allowed'],
  ['Touching the ball more than once with arm or fist','not allowed'],
  ['Ball touches both upper and lower arm','not allowed'],
 ])}

# ---------- Methodik ----------
ANGABE_METHODIK = [
 {'t':'note','h':B('Die Angabe – eines der schwierigsten Elemente','The service – one of the hardest elements'),
  'x':B('Bei der Angabe hat der Schiedsrichter mehrere, zeitlich dicht aufeinanderfolgende Abläufe zu beobachten: den Übertritt und unmittelbar danach Band, Körper oder Aus.\n\nHäufigste Fehlleistung: Jede nicht regelgerechte Angabe ist als Gutpunkt für den Gegner zu werten – auch bereits die erste. Kommen bei einer Angabe Zweifel auf, ist bei den folgenden Angaben desselben Spielers die Aufmerksamkeit auf den zweifelhaften Punkt zu verstärken.',
        'During the service the referee has to watch several events that follow one another very closely: the foot fault and, immediately afterwards, the net, the body or the ball going out.\n\nThe most frequent referee error occurs here. Every service that does not comply with the rules is a point for the opponent – including the very first one. If a service raises any doubt, the referee should pay closer attention to that particular point on the same player\u2019s following services.')},
 {'t':'note','h':B('Grundsatz der Beobachtung','Principle of observation'),
  'x':B('Am besten beobachtet man im Stehen, mit ruhigem Kopf und ohne Pupillenbewegung. Der Schiedsrichter muss den besten Standort deshalb so schnell einnehmen, dass er die kritische Situation im Ruhezustand beobachten kann.',
        'Observation works best standing still, with the head steady and the eyes at rest. The referee must therefore reach the best position quickly enough to watch the critical situation from a settled stance.')},
 {'t':'note','h':B('Standort je nach Angabetyp','Position according to the type of service'),
  'x':B('Standbein bleibt fest am Boden: etwa 3 bis 5 m hinter der Mittellinie, dicht an der äußeren Begrenzung. Übertritt, Band und erste Ballberührung sind mit minimaler Kopfbewegung zu erfassen.\n\nSprungangabe mit Anlauf: derselbe Standort. Der Ball hat nach der Landung meist schon das Band überschritten, beides ist gleichzeitig zu sehen.\n\nAnschläger hüpft nach vorn und landet dicht vor oder auf der Angabelinie: Standort nahe der 3-m-Linie. Nachteil ist die schnelle Kopfdrehung vom Fuß über das Band bis zur ersten Boden- oder Gegnerberührung.',
        'Standing leg stays firmly on the ground: about 3 to 5 m behind the centre line, close to the outer boundary. Foot fault, net and first contact can then be taken in with minimal head movement.\n\nJump service with a run-up: the same position. By the time the server lands the ball has usually already crossed the net, so both can be seen at once.\n\nServer hops forward and lands close to or on the service line: position near the 3 m line. The drawback is the quick turn of the head from the foot across the net to the first contact with the ground or an opponent.')},
 {'t':'note','h':B('Wechselschrittangabe','Change-of-step service'),
  'x':B('Der kritischste Fall: Es ist schwer erkennbar, welcher Fuß zuerst gelandet ist. Bei voll durchgezogener Angabe landet eher der vordere Fuß zuerst. Häufig rutscht das Standbein nur rückwärts über den Boden, verlässt ihn also nicht und berührt den Rasen – das ist kein Übertritt. Solche Anschläger sollte man vor dem Spiel beobachten.',
        'The most difficult case: it is hard to tell which foot landed first. On a fully executed service the front foot tends to land first. Often the standing leg merely slides backwards along the ground without leaving it – that is not a foot fault. Servers like this should be watched before the match.')},
]
RUECK_METHODIK = [
 {'t':'note','h':B('Standort beim Rückschlag','Position for the return'),
  'x':B('Normale Spielsituation ohne Blockmöglichkeit: etwa 3 bis 5 m von der Mittellinie entfernt, auf der Seite des Feldes, in dem der Angriff läuft.\n\nBall wird in Netznähe erwartet: möglichst dicht am Pfosten der Angriffsseite. Ist der Ball weit über dem Netz zu erwarten, kann die beste Sicht auch vom Gegenfeld aus bestehen – in der Halle bei Blocksituationen jedoch nicht.',
        'Normal rally with no possibility of a block: about 3 to 5 m from the centre line, on the side of the court where the attack is being played.\n\nBall expected close to the net: as near as possible to the post on the attacking side. If the ball is expected high above the net, the best view may even be from the opposite court – but not indoors when a block is possible.')},
 {'t':'note','h':B('Blickfolge beim Block','Sequence of the gaze during a block'),
  'x':B('Beim Absprung zuerst auf die Füße: Betreten die Blockbeteiligten das Gegenfeld?\n\nDanach bis zum Ende der Aktion beobachten, ob einer der Beteiligten mit dem Körper das Netz berührt.\n\nGleichzeitig: Berühren beide Spieler den Ball gleichzeitig? Nur dann liegt ein Block vor, angezeigt durch die erhobene Faust.',
        'At the take-off, look at the feet first: do the players involved in the block enter the opposite court?\n\nThen watch until the end of the action whether either of them touches the net with the body.\n\nAt the same time: do both players touch the ball simultaneously? Only then is it a block, shown with the raised fist.')},
 {'t':'note','h':B('„Klick“ und „Klack“ – kein Block','\u201cClick\u201d and \u201cclack\u201d – not a block'),
  'x':B('Berühren die Spieler den Ball nicht gleichzeitig – es ist ein „Klick“ und ein „Klack“ zu hören –, liegt kein Block vor. Der Schiedsrichter entscheidet dann, wer den Ball zuletzt berührt hat; dieser Spieler ist für die folgende Aktion verantwortlich. Je erfahrener der Schiedsrichter, desto sicherer unterscheidet er die beiden Geräusche.',
        'If the players do not touch the ball at the same moment – a \u201cclick\u201d and a \u201cclack\u201d can be heard – it is not a block. The referee then decides who touched the ball last; that player is responsible for the action that follows. The more experienced the referee, the more reliably the two sounds can be told apart.')},
 {'t':'note','h':B('Übergreifen über das Band','Reaching over the net'),
  'x':B('Ein Übergreifen über das Band ist jederzeit erlaubt. Beide Mannschaften sind zu jedem Zeitpunkt gleichberechtigt schlagberechtigt.',
        'Reaching over the net is permitted at any time. Both teams have an equal right to play the ball at every moment.')},
]
SPIELRICHTER_ZUSATZ = [
 {'t':'hall','x':B('Die Mitgliedsverbände dürfen in ihrem Spielbetrieb zwei Schiedsrichter einsetzen. Werden zwei Schiedsrichter eingesetzt, so entscheidet während des Spieles jeder Schiedsrichter über gesehene Fehler und ist dafür allein, ohne Rücksprache mit dem anderen, verantwortlich. Vor dem Spiel überzeugt sich nach Vereinbarung einer der beiden vom regelgerechten Zustand des Spielfeldes, der Bälle und der Spielkleidung, sorgt für die Richtigkeit des Spielberichtes und führt die Auslosung durch.',
        'Member federations may appoint two referees for their competitions. Where two referees are used, each of them decides on the faults he has seen during the match and is solely responsible for those decisions, without consulting the other. Before the match, one of the two – as agreed between them – checks that court, balls and playing kit comply with the rules, ensures the match report is correct and carries out the toss.')},
]
WERTUNG_ZUSATZ = [
 {'t':'note','h':B('Kontrolle des Anschreibers','Supervising the scorer'),
  'x':B('Der Schiedsrichter achtet darauf, dass der Anschreiber die Aufgabenstellung beherrscht. Ein Entwerten der Leerfelder ist zu verhindern.',
        'The referee makes sure the scorer is up to the task. Empty boxes on the form must not be cancelled out.')},
]

# ---------- Kapitel 11: zwei zusätzliche Handzeichen ----------
SIG_EXTRA = [
 (17,('Übertritt ins Gegenfeld','Stepping into the opposite court'),
  ('Ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Mittellinie. Der zweite Arm zeigt in die Waagerechte und zwar in die Richtung der Mannschaft, die den Gutball erzielt hat.',
   'An outstretched arm with an open hand points towards the centre line. The second arm points horizontally, in the direction of the team that scored the point.'),
  ['sig-17']),
 (18,('Gleichstand','Tie'),
  ('Der rechte und der linke gestreckte Arm werden mit geschlossener Faust vor der Brust gehalten.',
   'The right and the left arm are held stretched in front of the chest with closed fists.'),
  ['sig-18']),
]
BLOCK_ZUSATZ = '\n\nGleichzeitig wird die Geste mit dem Ausruf „BLOCK“ unterstützt. Das ist NICHT das Zeichen für Gleichstand.'
GESTIK_ZUSATZ = {'t':'note','h':B('Pfiff und Deutlichkeit','Whistle and clarity'),
 'x':B('Klar und deutlich muss jeder Spielgang mittels der Gestik angezeigt werden. Unklare Situationen sind mit einem kurzen, aber kräftigen Pfiff zu unterstützen.',
       'Every rally must be signalled clearly and unmistakably with the hand signals. Unclear situations should be backed up with a short but firm whistle.')}

# ---------- Kapitel 13: Linienrichter ----------
LR_ZUSATZ = [
 {'t':'img','src':'signals/lr-kleidung','h':B('Kleidung der Linienrichter','Clothing of the linesmen'),
  'x':B('Der Linienrichter muss farblich gekennzeichnet sein.','The linesman must be identifiable by colour.')},
 {'t':'note','h':B('Einweisung vor dem Spiel','Briefing before the match'),
  'x':B('Auf die Einweisung der Linienrichter zusammen mit den Mannschaftsführern vor Spielbeginn ist unbedingt zu achten. Festzulegen ist: Zeigt der zuständige Linienrichter den Ball an, ist diese Entscheidung zu übernehmen. Kann er den Ball nicht beurteilen, hat aber der andere Linienrichter nachgezogen und zeigt an, so gilt dessen Entscheidung. Können beide den Ball nicht beurteilen – Fahne waagerecht vor der Brust –, muss der Schiedsrichter entscheiden.',
       'The briefing of the linesmen together with the team captains before the match must not be skipped. It has to be agreed that: if the responsible linesman signals the ball, that decision is adopted. If he cannot judge the ball but the other linesman has followed the play and signals, his decision applies. If neither can judge the ball – flag held horizontally in front of the chest – the referee has to decide.')},
 {'t':'note','h':B('Auswechslung von Linienrichtern','Replacing a linesman'),
  'x':B('Linienrichter dürfen während eines Spieles nur aufgrund besonderer Umstände ausgewechselt werden, etwa bei Übelkeit.',
       'Linesmen may only be replaced during a match in special circumstances, for instance if they feel unwell.')},
 {'t':'img','src':'ppt/sr-position-1','h':B('Schiedsrichter- und Linienrichterpositionen','Positions of referee and linesmen'),
  'x':B('Luftaufnahme mit den Standorten von Schiedsrichter und Linienrichtern während eines Spielganges.',
       'Aerial photograph showing where referee and linesmen stand during a rally.')},
]

# ---------- Kapitel 16: Aufgaben rund um das Spiel ----------
CH16 = [
 {'t':'note','h':B('Grundlage','Basis'),
  'x':B('Die folgenden Aufgaben ergeben sich aus der Schiedsrichterordnung und ergänzen die Spielregeln. Der Schiedsrichter ist alleiniger Leiter des Spieles; er entscheidet unabhängig und endgültig, seine Tatsachenentscheidungen sind unanfechtbar.',
       'The duties below follow from the referee regulations and supplement the rules of the game. The referee is the sole director of the match; he decides independently and finally, and his decisions on matters of fact cannot be challenged.')},

 {'t':'rule','n':{'de':'Vor dem Spiel','en':'Before the match'},'x':B('Spielformular und Zeitvergleich: Der Schiedsrichter sollte 30 Minuten vor Spielbeginn am Spielort anwesend sein. Er nimmt das Spielformular bei der Spielleitung entgegen und vergleicht bei zentraler Zeitnahme die Uhren – so rechtzeitig, dass alle weiteren Aufgaben vor dem planmäßigen Anpfiff erledigt werden können.',
       'Match report and clock comparison: the referee should be at the venue 30 minutes before the scheduled start. He collects the match report from the competition management and, where central timing is used, compares the clocks – early enough for all remaining duties to be completed before the scheduled start.')},
 {'t':'rule','n':'','x':B('Prüfung der Spielgeräte: Er prüft Spielfeld, Spielgeräte und Spielkleidung auf ordnungsgemäßen Zustand und sorgt dafür, dass Mängel durch Veranstalter oder Mannschaftsführer behoben werden.',
       'Checking the equipment: he checks that court, equipment and playing kit are in proper condition and sees to it that any defects are remedied by the organiser or the team captains.')},
 {'t':'rule','n':'','x':B('Prüfung der Spielberechtigung, sofern dies nicht bereits durch den Technischen Delegierten erfolgt ist.',
       'Checking eligibility to play, unless this has already been done by the technical delegate.')},
 {'t':'rule','n':'','x':B('Formulareintragungen: Er sorgt für den namentlichen Eintrag der Spieler im Spielformular. Die zu Beginn tatsächlich eingesetzten Spieler werden mit einem Kreuz markiert. Ergänzungen und Auswechslungen werden nachgetragen, nicht anwesende Spieler gestrichen.',
       'Entries on the form: he ensures the players are entered by name on the match report. Those actually on court at the start are marked with a cross. Additions and substitutions are entered as they occur; players who are not present are struck out.')},
 {'t':'rule','n':'','x':B('Auslosung: Etwa 5 Minuten vor Spielbeginn fordert ein anhaltender Pfiff die Mannschaften auf, das Einspielen einzustellen, sodass 3 Minuten vor Spielbeginn ausgelost werden kann. Er lost mit den Mannschaftsführern Feld oder Ball und damit die erste Angabe aus.',
       'The toss: about 5 minutes before the start a sustained whistle asks the teams to stop warming up, so that the toss can take place 3 minutes before the start. With the team captains he tosses for court or ball, and thus for the first service.')},
 {'t':'rule','n':'','x':B('Abstimmung mit den übrigen Spielrichtern – möglichst vor der Auslosung. Ist eine Anzeigetafel vorhanden, ist vorrangig zu prüfen, ob Anzeige und tatsächlicher Spielstand übereinstimmen.',
       'Coordination with the other match officials – preferably before the toss. If a scoreboard is in use, the first thing to check is that the display and the actual score agree.')},
 {'t':'rule','n':'','x':B('Freigabe: Sind alle Vorbereitungen abgeschlossen und Mannschaften wie Spielrichter bereit, gibt der Schiedsrichter das Spiel mit einem kräftigen Pfiff frei.',
       'Starting the match: once all preparations are complete and both teams and officials are ready, the referee starts play with a firm whistle.')},

 {'t':'rule','n':{'de':'Während des Spiels','en':'During the match'},'x':B('Jeder Gutpunkt ist klar, deutlich und sicher durch einen Pfiff zu dokumentieren. Der Schiedsrichter überwacht die Aufzeichnungen im Spielformular und prüft in regelmäßigen Abständen die Eintragungen des Anschreibers.',
       'Every point must be recorded clearly, distinctly and confidently with a whistle. The referee monitors the entries on the match report and checks the scorer\'s records at regular intervals.')},
 {'t':'rule','n':'','x':B('Verwahrung der Bälle: Er verwahrt die nicht gespielten, von den Mannschaften vorgelegten Bälle. Der nächste Ball, der ins Spiel gebracht werden könnte, liegt direkt neben dem Pfosten, alle weiteren 3 bis 5 m hinter dem Pfosten.',
       'Keeping the balls: he keeps custody of the balls presented by the teams that are not in play. The next ball that might be brought into play lies directly beside the post, all others 3 to 5 m behind the post.')},

 {'t':'rule','n':{'de':'Nach dem Spiel','en':'After the match'},'x':B('Ergebnis und Spielergruß: Der Schiedsrichter verkündet das Ergebnis und gibt den Mannschaftsführern Gelegenheit zum Spielergruß. Die Linienrichter sollten dabei neben dem Schiedsrichter stehen.',
       'Result and salute: the referee announces the result and gives the team captains the opportunity to exchange the players\' salute. The linesmen should stand beside the referee.')},
 {'t':'rule','n':'','x':B('Formularprüfung: Er prüft die Vollständigkeit des Spielformulars, schließt mit seiner Unterschrift ab und übergibt es der Spielleitung. Das Formular muss enthalten: Halbzeit-, Satz- und Endergebnis mit Feststellung des Siegers; die Liste der aufgebotenen Spieler, wobei die tatsächlich eingesetzten mit einem Kreuz gekennzeichnet sind; besondere Vorkommnisse wie Einsprüche, Ermahnungen, Verwarnungen, Feldverweise und Unfälle bei schwerwiegenden Verletzungen.',
       'Checking the form: he checks that the match report is complete, closes it with his signature and hands it to the competition management. The form must contain: half-time, set and final results with the winner identified; the list of nominated players, with those who actually played marked by a cross; and special incidents such as objections, cautions, warnings, sendings off and accidents involving serious injury.')},
]
