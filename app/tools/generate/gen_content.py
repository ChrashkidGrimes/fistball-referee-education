# -*- coding: utf-8 -*-
import json, io, sys
sys.path.insert(0, '/sessions/affectionate-serene-volta/mnt/outputs/build')
import ppt_content as P
APP='/sessions/affectionate-serene-volta/mnt/referee-education/app'
merged=json.load(open('merged_1_10.json'))

TT={  # offizielle Kapiteltitel aus beiden Ausgaben
 1:('Spielfeld und Geräte','Court and Equipment'),
 2:('Mannschaft','Team'),
 3:('Spieldauer','Playing Time'),
 4:('Spielgang','Rally'),
 5:('Schlag','Hit'),
 6:('Angabe','Service'),
 7:('Rückschlag und Zuspiel','Return and Pass'),
 8:('Wertung','Scoring'),
 9:('Spielrichter','Referees'),
 10:('Strafen','Penalties'),
 11:('Handzeichen und Gestik','Hand Signals and Gestures'),
 12:('Aufgaben und Verhalten des Schiedsrichters','Duties and Conduct of the Referee'),
 13:('Linienrichter und Anschreiber','Linesmen and Scorer'),
 14:('Anhang: Regelungen für Altersklassen','Annex: Regulations for Age Groups'),
 15:('Spiel- und Schiedsrichterordnung (national)','Playing and Referee Regulations (national)'),
 16:('Aufgaben rund um das Spiel','Duties before, during and after the match'),
}
def T(n): return {'de':TT[n][0],'en':TT[n][1]}
def B(de,en): return {'de':de,'en':en}

VIDEOS={
 1:[{'yt':'q342pxvhdTU','t':B('This is Fistball – Rules (IFA)','This is Fistball – Rules (IFA)')}],
 4:[{'yt':'eMVKl4XLZ4g','t':B('Offizielle Spielregeln – Faustball','Official Rules of the Game – Fistball (German)')},
    {'yt':'kI-BBLh98sc','t':B('Official Rules – Fistball (englisch)','Official Rules – Fistball')}],
 6:[{'yt':'OrdV0_UjvMc','t':B('Die Angabe (Heiner Josuttis)','The Service (Heiner Josuttis, German)')}],
}
SLOTS={
 2:[B('Auswechslung und Ergänzung an der Angabelinie','Substitution and completion at the service line')],
 3:[B('Satzende, Seitenwechsel und Auszeit','End of set, change of ends and time out')],
 5:[B('Erlaubte und unerlaubte Schlagausführung','Legal and illegal hitting technique')],
 7:[B('Blocksituation aus Schiedsrichterperspektive','Block situation from the referee’s perspective'),
    B('Zuspiel: 3 Ballkontakte, Doppelberührung','Pass: three ball contacts, double contact'),
    B('Ball unter der Leine / über die Mittellinie','Ball under the net / across the centre line')],
 9:[B('Positionierung des Schiedsrichters am Pfosten','Referee positioning at the post')],
 10:[B('Gelbe Karte, Zeitstrafe, rote Karte in der Praxis','Yellow card, time penalty and red card in practice')],
 11:[B('Alle Handzeichen in Bewegung','All hand signals in motion')],
 13:[B('Zusammenspiel Schiedsrichter – Linienrichter','Interaction between referee and linesmen')],
}

# ---- Kapitel 11: Handzeichen (DE Schulungsmappe S.23-28 / EN Manual S.23-29) ----
SIG=[
 (1,('Ausbälle','Ball is out'),
    ('Beide geöffneten, nach hinten gerichteten Hände zeigen mit abgewinkelten Armen neben dem Kopf nach hinten. Danach geht ein Arm in die Waagerechte, und zwar in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.',
     'Both hands open, hands facing backwards, arms bent, pointing backwards next to the head. Then one arm is raised horizontally in the direction of the team that scored a point.'),
    ['sig-01a','sig-01b']),
 (2,('Körper','Body'),
    ('Eine Hand zeigt/klopft auf den Körperteil, den der Ball berührt hat. Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.\n\nHinweis: Bei Treffern am Fuß reicht die Hand auf Brust oder Oberschenkel, ggf. mit verbaler Ergänzung „Fuß“. Der Schiedsrichter sollte durch Gestik nicht in eine „lächerliche Position“ gebracht werden.',
     'A hand points/taps the part of the body touched by the ball. The second arm points horizontally, in the direction of the team that scored a point.\n\nNote: If the foot is hit, the hand points to the foot or thigh and, if necessary, a verbal supplement "foot". The referee should not be put in a "ridiculous position" by gestures.'),
    ['sig-02']),
 (3,('Netz (Band/Leine)','Net'),
    ('Ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Netz (Band/Leine). Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.',
     'An outstretched arm with an open hand points in the direction of the net. The second arm points horizontally, in the direction of the team that scored a point.'),
    ['sig-03']),
 (4,('Übertritt','Foot Fault'),
    ('Ein ausgestreckter Arm mit geöffneter Hand zeigt in Richtung Angabelinie. Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.',
     'An outstretched arm with an open hand points toward the service line. The second arm points horizontally, in the direction of the team that scored a point.'),
    ['sig-04']),
 (5,('2 - mal auf','Double bounce'),
    ('Der gestreckte Arm zeigt mit zwei gespreizten Fingern nach unten. Der zweite Arm zeigt in die Waagerechte in die Richtung der Mannschaft, die einen Gutpunkt erzielt hat.',
     'The stretched arm points downwards with two spread fingers. The second arm points horizontally, in the direction of the team that scored a point.'),
    ['sig-05']),
 (6,('Time out oder sonstige Spielunterbrechung','Time out or other game interruption'),
    ('Ein abgewinkelter Arm zeigt mit geöffneter Hand nach oben, die andere geöffnete Hand wird mittig über die senkrechte Hand gelegt (Time out).',
     'A bent arm points upwards with an open hand, the other open hand is placed in the middle over the vertical hand (time out).'),
    ['sig-06']),
 (7,('Block','Block'),
    ('Der rechte oder linke gestreckte Arm wird mit geschlossener Faust senkrecht nach oben gehalten.'+P.BLOCK_ZUSATZ,
     'The right or left stretched arm is held vertically upwards with a closed fist. The gesture is supported by calling out "BLOCK". This is NOT the signal for a tie.'),
    ['sig-07']),
 (8,('Wiederholung der letzten Angabe','Repetition of last Service'),
    ('Beide Arme zeigen waagerecht nach außen, die Daumen zeigen nach oben.',
     'Both arms point horizontally outwards, thumbs point upwards.'),
    ['sig-08']),
 (9,('Auswechslung','Substitution'),
    ('Die Auswechslung ist durch Kreisen beider Hände über dem Kopf zu signalisieren.',
     'The substitution is to be signaled by circling both hands above the head.'),
    ['sig-09']),
 (10,('Ball war knapp gut','Ball was close in'),
    ('Wenn ein Ball knapp und scharf noch im Feld gelandet ist, so zeigen beide Hände zum Boden.',
     'If a ball has just landed sharply in the field, one or both hands point to the ground.'),
    ['sig-10']),
 (11,('Unterhalb','Under the net'),
    ('Fliegt ein Ball unter dem Band hindurch, so ist mit offener Hand, Handfläche nach oben, Arm vor dem Körper schräg nach unten gerichtet, die Flugbahn des Balles nachzuzeigen. Der andere Arm zeigt in die Richtung des Teams, dem der Punkt gutgeschrieben wird.',
     'If a ball bounces under the net, the trajectory of the ball is to be shown with an open hand, the palm of the hand pointing upwards, and the arm around the mid-section of the body pointing horizontally. The second arm points horizontally, in the direction of the team that scored a point.'),
    ['sig-11']),
 (12,('Über das Netz ohne Berührung','Over the net'),
    ('Springt ein Ball ohne Berührung über das Netz, so ist mit offener Hand, Handfläche nach unten, Arm über dem Körper, die Flugbahn des Balles nachzuzeigen. Der andere Arm zeigt in die Richtung der Mannschaft, welcher der Punkt gutgeschrieben wird.',
     'If a ball bounces over the net, the trajectory of the ball is to be shown with an open hand, the palm of the hand pointing downwards, and the arm overhead pointing horizontally. The second arm points horizontally, in the direction of the team that scored a point.'),
    ['sig-12']),
 (13,('Decke','Ceiling'),
    ('Berührt der Ball nach einem Überschlag die Decke, so weisen beide Hände mit geöffneter Handfläche nach oben. Der zweite Arm zeigt danach in die Waagerechte in die Richtung der Mannschaft, welcher der Punkt gutgeschrieben wird.',
     'If the ball touches the ceiling after a return hit, both hands with open palms point upwards. The second arm then points horizontally in the direction of the team that scored a point.'),
    ['sig-13']),
 (14,('Behinderung','Interference'),
    ('Wenn ein Spieler einen anderen Spieler behindert oder wenn ein Zuschauer einen Spieler behindert, macht der Schiedsrichter beide Hände außerhalb des Körperrahmens zu Fäusten und verbindet sie horizontal an der Brust, um einen Zusammenstoß anzuzeigen. Entweder gibt es einen Punkt, und ein Arm wird horizontal in Richtung der Mannschaft erhoben, die den Punkt erzielt hat, oder es wird eine Wiederholung des Aufschlagsignals gezeigt.',
     'In the case that one player interferes with another, or there is a separate interference from a spectator for instance, the referee will make both hands into fists outside the body frame and connect them horizontally by the chest to indicate a collision. Either a point is awarded, and one arm is raised horizontally in the direction of the team that scored a point, or a repetition of service signal is shown.'),
    ['sig-14']),
 (15,('Unsportliches Verhalten','Unsportsmanlike conduct'),
    ('Bei unsportlichem Verhalten hat der Schiedsrichter das Recht, je nach Schwere des Verstoßes folgende Strafen zu verhängen: Verwarnung (gelbe Karte), Ausschluss im laufenden Spiel bis beide Mannschaften zusammen 10 Gutbälle erzielt haben („Zeitstrafe“; gelbe und rote Karte), Feldverweis (rote Karte).',
     'A physical card will be vertically shown to the guilty party. Information related to the card will be written in the game report. Depending on the severity of the offence the referee may impose: a warning (yellow card), exclusion during the running match until both teams together have scored 10 points ("time penalty"; yellow and red card), or sending off (red card).'),
    ['sig-15']),
 (16,('Linienrichter / Schiedsrichter-Assistenten','Assistants'),
    ('Hat der Ball die Außenlinie überschritten, zeigt der Linienrichter mit der Fahne nach oben. Hat er sie nicht überschritten, zeigt die Fahne in Richtung Spielfeld. Kann der Linienrichter keine Aussage machen, hält er die Fahne mit beiden Händen waagerecht in Brusthöhe.\n\nSpringt der Ball im Feld auf und berührt dann die Hallenwand, weist die Fahne in das Feld und der andere Arm senkrecht nach oben.',
     'If the ball has crossed the outside line, the linesman raises the flag. If it has not, the flag points towards the court. If the linesman cannot judge the situation, the flag is held horizontally with both hands at chest height.'),
    ['sig-16a','sig-16b','sig-16c']),
]

CH11=[{'t':'note','h':B('Gestik','Signaling of a point gesture'),
  'x':B('Er zeigt Spielunterbrechungen wegen Fehlers durch Pfiff an und erläutert durch die offiziellen Handzeichen seine Entscheidung. Vor allem bei Hallenspielen, bei denen die Zuschauer sehr häufig lautstark die Stimme des Schiedsrichters übertreffen, aber auch wegen des besseren Verständnisses für Zuschauer und Spieler, ist es notwendig, deutlich mit Gestik zu arbeiten. Neben dem deutlichen kurzen Pfiff bei allen Fehlern muss die Gestik immer unterstützen.',
        'The referee whistles to indicate game interruptions due to errors and explains his decision with official hand signals. Especially in indoor games, where the spectators very often loudly exceed the referee’s voice, but also because of the better understanding of spectators and players, it is necessary to work clearly with gestures. In addition to the clear short whistle for all errors, the gestures must always support the decision.')}]
CAPS={
 1: B(['Phase 1: Hände nach hinten','Phase 2: Arm in die Waagerechte'],
      ['Phase 1: hands backwards','Phase 2: arm raised horizontally']),
 16:B(['Ausball – Fahne nach oben','Sichtbehinderung – Fahne waagerecht in Brusthöhe','Ball im Feld – Fahne in Richtung Spielfeld'],
      ['Out – flag raised','Cannot judge – flag horizontal at chest height','Ball in – flag pointing towards the court']),
}
for n,(hd,he),(xd,xe),imgs in SIG:
    blk={'t':'sig','n':str(n),'h':B(hd,he),'x':B(xd,xe),'img':imgs}
    if n in CAPS: blk['caps']=CAPS[n]
    CH11.append(blk)
CH11.append(P.GESTIK_ZUSATZ)
CH11.append({'t':'note','origin':'ppt','h':{'de':'Zusätzliche Zeichen','en':'Additional signals'},
  'x':{'de':'Die folgenden beiden Zeichen sind in der Schulungsmappe nicht nummeriert, werden im Spielbetrieb aber verwendet.',
       'en':'The following two signals are not numbered in the training manual but are used in practice.'}})
for n,(hd,he),(xd,xe),imgs in P.SIG_EXTRA:
    CH11.append({'t':'sig','n':str(n),'h':{'de':hd,'en':he},'x':{'de':xd,'en':xe},'img':imgs})

CH12=[
 {'t':'note','h':B('Neutrale Entscheidungsfindung','Neutral decision-making'),
  'x':B('Der Schiedsrichter trifft seine Entscheidungen auf Grund visueller Wahrnehmung und lässt sich durch Spieler, Betreuungspersonen oder Zuschauer nicht beeinflussen. Das Gehör darf ihm die Richtigkeit seiner optischen Wahrnehmung nur bestätigen. Je sicherer ein Schiedsrichter bei einer getroffenen Entscheidung ist, desto stärker kann er diese Entscheidung auch vertreten.',
        'The referee makes decisions on the basis of visual perception and is not influenced by players, support staff or spectators. Hearing may only confirm the correctness of the visual perception. The more certain a referee is about a decision, the more firmly that decision can be defended.')},
 {'t':'note','h':B('Umgang mit eigenen Fehlern','Dealing with your own mistakes'),
  'x':B('Natürlich ist ein Schiedsrichter auch Mensch und macht deshalb Fehler. Ein guter Schiedsrichter zeichnet sich dadurch aus, dass diese Fehler auf ein Minimum beschränkt sind. Erkennt ein Schiedsrichter sofort seine falsch getroffene Entscheidung, oder gibt ein Spieler einen nicht erkannten Fehler zu, so kann er diese revidieren. Hat ein Schiedsrichter jedoch eine Entscheidung aufgrund seiner Wahrnehmung getroffen, so wird er diese nicht aufgrund von Protesten zurücknehmen.',
        'A referee is human and therefore makes mistakes. A good referee keeps those mistakes to a minimum. If a referee immediately recognises a wrong decision, or if a player admits an error that went unnoticed, the decision may be revised. However, once a referee has made a decision based on his perception, it will not be withdrawn because of protests.')},
 {'t':'rule','n':'','x':B('Klar, deutlich und sicher muss jeder Gutpunkt durch einen Pfiff dokumentiert werden. Der Schiedsrichter überwacht die Aufzeichnungen im Spielformular. In regelmäßigen Abständen ist die Aufzeichnung des Anschreibers zu prüfen.',
        'Every point must be clearly and safely documented by a whistle. The referee monitors the records in the game form. The scorer’s record should be checked at regular intervals.')},
 {'t':'note','h':B('Einsprüche','Objections'),
  'x':B('Einsprüche – auch solche gegen Tatsachenentscheidungen – sind auf dem Spielformular sofort zu vermerken.',
        'Objections – including those against factual decisions – must be noted immediately on the game report.')},
 {'t':'note','h':B('Fragen von Mannschaftsführern','Questions from team captain'),
  'x':B('Auf Fragen des Mannschaftsführers – bei Jugendmannschaften ggf. einer volljährigen Betreuungsperson – muss der Schiedsrichter antworten. Er gibt die Antwort kurz und klar und lässt keine Diskussion zu.',
        'The referee must answer questions from the team captain – in the case of youth teams, if necessary, an adult supervisor. He gives the answer briefly and clearly and does not allow any discussion.')},
 {'t':'note','h':B('Verhalten in kritischen Situationen – Tipp 1','Behavior in critical situations – Tip 1'),
  'x':B('Stelle ich fest, dass ich eine falsche Entscheidung getroffen habe, so kann ich diese ohne weiteres zurücknehmen, wenn es der Spielgang zulässt. Ist dies nicht mehr möglich, versuche ich trotzdem ruhig zu bleiben, tief zu atmen und kommende Situationen gut zu meistern.',
        'If I find out that I made a wrong decision, I can easily take it back if the course of the game allows it. If this is no longer possible, I still try to stay calm, breathe deeply and master upcoming situations well.')},
 {'t':'note','h':B('Verhalten in kritischen Situationen – Tipp 2','Behavior in critical situations – Tip 2'),
  'x':B('Bei Anfragen (Protesten) durch den Mannschaftsführer erklärt der Schiedsrichter, wie er die Situation wahrgenommen hat, um zu erläutern, warum die Entscheidung so getroffen wurde. Durchaus kann er einräumen, dass diese Wahrnehmung falsch gewesen sein könnte, dass er aber dennoch bei seiner Entscheidung bleiben wird, da die Beschwerde eines Spielers keine Grundlage für das Zurücknehmen einer Entscheidung ist. Er lässt sich darüber auf keine Diskussionen ein; ggf. mit Ermahnung oder Verwarnung reagieren.',
        'In the event of inquiries (protesting) by the team captain, the referee will explain how the situation was perceived to explain why the decision was made. The referee can certainly concede that this perception could of course have been wrong, but that he will nevertheless stand by his decision as a player’s complaint is not a basis for reversing a decision. He does not enter into any discussions about this; if necessary, react with a verbal warning or warning (yellow card).')},
 {'t':'rule','n':'','x':B('Artet das Spiel aus oder fühlt sich der Schiedsrichter durch Zuschauer bedroht, so hat er den Mannschaftsführern bzw. dem Veranstalter die notwendigen Weisungen zu erteilen. Der Schiedsrichter hat auf jeden Fall die Pflicht, alle Maßnahmen zu ergreifen, welche die klaglose Beendigung des Wettspieles ermöglichen.',
        'If the game escalates or the referee feels threatened by spectators, the referee must give the team captains or the organizer the necessary instructions. In any case, the referee is obliged to take all measures that enable the competition to be ended without complaint.')},
]

CH13=[
 {'t':'rule','n':'9.3','x':B('Die Linienrichter haben ihren Stand an den Endpunkten der dem Schiedsrichter gegenüberliegenden Seitenlinie. Sie unterstützen den Schiedsrichter in der Leitung des Spieles. Linienfehler (Ausbälle) zeigen sie durch Erheben einer Fahne oder eines Armes an.',
        'The linesmen are positioned at the ends of the sideline opposite the referee. They support the referee in controlling the match. They indicate line faults (balls out) by raising a flag or an arm.')},
 {'t':'note','h':B('Der Standort der Linienrichter','The location of the linesmen'),
  'x':B('Der Standpunkt an den gegenüberliegenden Seitenlinien wechselt mit jedem Ballwechsel. Der Linienrichter, bei dem die Angabe oder der Angriff durchgeführt wird, beobachtet vorrangig diese Seitenlinie. Er soll sich dabei leicht nach vorne orientieren, jedoch nur so weit, dass bei einem Rückschlag die Position an der Hinterlinie rechtzeitig eingenommen werden kann. Sein Gegenüber steht in Verlängerung der hinteren Auslinie und beobachtet vorrangig diese Hinterlinie.',
        'The position on the opposite sidelines changes with every rally. The linesman who is on the same side as the player serving or attacking primarily observes that sideline. The linesmen should orientate slightly forward for a better line view, but only so far that the position on the back line can be reached in time in the event of a return hit. The other linesman stands in the extension of the back line and primarily observes this back line.')},
 {'t':'img','src':B('lr-1','lr-1-en'),'h':B('Die beste Position des Linienschiedsrichters 1','Best position of the linesman 1'),
  'x':B('9.3.1.1 Kontinuierlicher Standortwechsel mit Abwehr und Angriff: Der Standpunkt an den gegenüberliegenden Seitenlinien wechselt mit jedem Ballwechsel. Der Linienrichter, bei dem die Angabe oder der Angriff durchgeführt wird, steht etwas vorgezogen bei der seitlichen Auslinie.',
        '9.3.1.1 Continuous location change with defense and attack: the position on the opposite sidelines changes with every rally. The linesman who is making the call or attack stands slightly ahead of the side line and primarily observes this side line.')},
 {'t':'img','src':B('lr-2','lr-2-en'),'h':B('Die beste Position des Linienschiedsrichters 2','Best position of the linesman 2'),
  'x':B('Beim Angriffs- oder Angabewechsel wechseln die beiden Positionen. Bei Ausbällen wird die Fahne (der Arm) von dem „vorrangigen Linienrichter“ senkrecht nach oben gestreckt. Der Kollege quittiert dies mit kurzer Verzögerung. Auf keinen Fall darf er zuerst reagieren.',
        'The two positions switch when attacking or service changes to the other team. For balls that are out, the flag (arm) is stretched vertically upwards by the "near linesman". The counterpart acknowledges this with a short delay and matches the gesture. In no case should the counterpart react first.')},
 {'t':'img','src':B('lr-3','lr-3-en'),'h':B('Die beste Position des Linienschiedsrichters 3','Best position of the linesman 3'),
  'x':B('Kann ein Linienrichter die Situation „Ausball“ nicht erkennen, weil z. B. die Sicht durch einen Spieler verdeckt war, so ist die Fahne (beide Arme) waagerecht vor den Körper zu halten. In diesem Falle übernimmt der Kollege die Verantwortung. Kann auch dieser die Situation nicht erkennen, übernimmt der Schiedsrichter die Verantwortung.',
        'If a linesman cannot recognize the situation "ball out", e.g. because the view was blocked by a player, the flag (both arms) must be held horizontally in front of the body. In this case, the counterpart takes responsibility. If the counterpart cannot recognize the situation either, this is indicated by holding the flag horizontally in front of his chest. Then the referee takes responsibility.')},
 {'t':'note','h':B('Besonderheiten in der Halle','Peculiarities in the hall'),
  'x':B('Wenn ein Ball im Feld aufspringt und dann die Hallenwand berührt, so weist der Linienrichter mit der Fahne in das Feld und hebt den anderen Arm senkrecht nach oben. Die gleiche Signalisierung erfolgt, wenn der Ball ins Aus fliegt und die abwehrende Mannschaft den Ball berührt hat.',
        'If a ball bounces in the field and then touches the wall of the hall, the linesman points the flag into the field and raises his other arm vertically. The same signaling occurs when the ball flies out of bounds and the defending team has touched the ball.')},
 {'t':'rule','n':'9.4','x':B('Der Anschreiber hat seinen Platz in der Nähe des Schiedsrichters und bucht nach dessen Zeichen für beide Mannschaften die gewonnenen Gutbälle.',
        'The scorer is positioned near the referee and records the points won by both teams according to the referee’s signals.')},
 {'t':'note','h':B('Anschreibertisch','Scorer table'),
  'x':B('Beim Anschreibertisch hält sich nur der Anschreiber und eventuell eine weitere Person auf, die eine Anzeigetafel bedient. Keinesfalls sollten alkoholische Getränke o. Ä. dort abgestellt werden. Weiters verbucht der Anschreiber alle weiteren mit dem Spielbericht verbundenen Einträge.',
        'At the scorer’s table there is only the scorer and possibly one other person operating a scoreboard. Under no circumstances should alcoholic beverages or similar be placed there. The scorer also records all other entries associated with the match report.')},
]

AGE={'head':B(['Altersklasse','Feldgröße (m)','Leinenhöhe (m)','Ballgewicht (g)','Ballumfang (cm)','Ballkontakte','Luftdruck (bar)','Spieler/Team','Angabelinie'],
              ['Age Group','Court (m)','Net height (m)','Ball weight (g)','Ball circumference (cm)','Ball contacts','Air pressure (bar)','Number of players','Service line']),
     'rows':B([
  ['Männlich: U18, U21, Männer, Senioren','50 x 20','2,00','350 +/- 10','65-68','3','0,55 - 0,7','5','3 m'],
  ['Weiblich: U18, U21, Frauen, Seniorinnen','50 x 20','1,90','320 +/- 10','65-68','3','0,55 - 0,7','5','3 m'],
  ['U16 m','50 x 20','2,00','320 +/- 10','65-68','3','0,55 - 0,7','5','3 m'],
  ['U16 w','50 x 20','1,90','320 +/- 10','65-68','3','0,55 - 0,7','5','3 m'],
  ['U14 m/w','40 x 20','1,80','290 +/- 10','65-68','3','0,55 - 0,7','5','3 m'],
  ['U12 m/w','28 x 15 ***','1,60','260 +/- 10','65-68','3/4 **','0,3 - 0,5','3-5 **','3 m'],
  ['U10 m/w','18 x 9 ***','1,50','240 +/- 10','60-68','3/4 **','0,2 - 0,3','3-5 **','3 m'],
  ['U8 m/w','12 x 6 ***','1,30','220 +/- 10','60-68','3/4 **','0,2 - 0,3','3-5 **','2 m'],
 ],[
  ['Male: U18, U21, Men, Masters','50x20','2.00','350 +/- 10','65-68','3','0.55 - 0.7','5','3 m'],
  ['Female: U18, U21, Women, Masters','50x20','1.90','320 +/- 10','65-68','3','0.55 - 0.7','5','3 m'],
  ['U16 m','50x20','2.00','320 +/- 10','65-68','3','0.55 - 0.7','5','3 m'],
  ['U16 f','50x20','1.90','320 +/- 10','65-68','3','0.55 - 0.7','5','3 m'],
  ['U14 m/f','40x20','1.80','290 +/- 10','65-68','3','0.55 - 0.7','5','3 m'],
  ['U12 m/f','28x15 ***','1.60','260 +/- 10','65-68','3/4 **','0.3 - 0.5','3-5 **','3 m'],
  ['U10 m/f','18x9 ***','1.50','240 +/- 10','60-68','3/4 **','0.2 - 0.3','3-5 **','3 m'],
  ['U8 m/f','12x6 ***','1.30','220 +/- 10','60-68','3/4 **','0.2 - 0.3','3-5 **','2 m'],
 ])}

CH14=[
 {'t':'rule','n':'','x':B('Regelungen für Altersklassen, Spielfeldmaße, Leinenhöhe, Ballgewicht, Ballkontakte, Balldruck, Spieleranzahl auf dem Feld und Angabelinie – NEU ab 01.04.2025.',
        'Annex – Regulations for age group, court size, net height, ball weight, ball contacts, ball pressure, number of players and service line.')},
 {'t':'table','tbl':AGE},
 {'t':'note','h':B('Fußnoten','Asterisks'),
  'x':B('*) Altersklassen entsprechend IFCR, 4.1.3\n**) Möglichkeiten für interne Regelung von Nationalverbänden\n***) Empfehlung der IFA. Nationalverbände können abweichende Feldgrößen festlegen, falls nötig.',
        '*) according to the competition rules (IFCR), clause 4.1.3\n**) to be decided by member federation\n***) proposal of IFA. Member federations can use alternate dimensions if needed.')},
 {'t':'note','h':B('Hinweis','Meaning of asterisks'),
  'x':B('Nationalverbände können im Rahmen der mit **) und ***) gekennzeichneten Regelungen in Bezug auf Feldgröße, Anzahl der Ballkontakte und Spieleranzahl abweichende Festlegungen treffen – verbindlich sind in jedem Fall Leinenhöhe, Ballgewicht, Luftdruck und Angabelinie.',
        'Member federations can only decide about court size, ball contacts and number of players – not about height of the net, ball weight, air pressure and service line.')},
]

CH15=[
 {'t':'note','h':B('Nationale Bestimmungen','National regulations'),
  'x':B('Dieses Kapitel enthält Fragen zur Spielordnung (SpOF), zur Schiedsrichterordnung (SRO) und zu den Wettkampfbestimmungen von Faustball Deutschland. Diese Regelungen gelten NICHT international. Andere Mitgliedsverbände ersetzen die Inhalte durch ihre eigenen Ordnungen oder deaktivieren dieses Kapitel in den Einstellungen.',
        'This chapter contains questions on the German playing regulations (SpOF), referee regulations (SRO) and the competition rules of Faustball Deutschland. These regulations do NOT apply internationally. Other member federations should replace this content with their own regulations or switch the chapter off in the settings.')},
 {'t':'rule','n':'','x':B('Typische Themen: Spielberechtigung und deren Kontrolle, Festspielen von Spielern, Kennzeichnung im Spielbericht, Spieljahr Feld/Halle, Sperrfristen bei Vereinswechsel, kampflos gewertete Spiele, Wartezeiten und Verspätungen, Ballzulassungen, Trikotwerbung, Ergebnismeldung.',
        'Typical topics: eligibility to play and how it is checked, players becoming tied to a team, marking in the match report, outdoor/indoor season, waiting periods when changing clubs, matches awarded by default, waiting times and late arrivals, approved balls, shirt advertising, reporting of results.')},
]

out=[]
for n in range(1,11):
    blocks=[]
    if n==1:
        blocks.append({'t':'img','src':B('court','court-en'),'h':B('Spielfeld','Court'),
                       'x':B('Maße des Spielfeldes nach IFA-Spielregeln 2025.','Court dimensions according to the IFA Rules of the Game 2025.')})
    blocks += merged[str(n)]
    if n==1:
        blocks += P.CH1_IMG
        blocks.append(P.CH1_BALLSERIE_INTRO)
        for src,uDe,uEn,eDe,eEn in P.BALL:
            blocks.append({'t':'img','src':'ppt/'+src,
                           'h':{'de':uDe,'en':uEn},'x':{'de':eDe,'en':eEn}})
        blocks += P.CH1_HALLE
    if n==5:
        blocks.append({'t':'note','origin':'ppt','h':{'de':'Schlagvarianten','en':'Types of hit'},
                       'x':{'de':'Übersicht der in der Praxis auftretenden Schlagformen.',
                            'en':'Overview of the forms of hit that occur in practice.'}})
        blocks.append({'t':'table','origin':'ppt','tbl':P.SCHLAG_TBL})
    if n==6: blocks += P.ANGABE_METHODIK
    if n==7: blocks += P.RUECK_METHODIK
    if n==8: blocks += P.WERTUNG_ZUSATZ
    if n==9: blocks += P.SPIELRICHTER_ZUSATZ
    out.append({'id':n,'title':T(n),'blocks':blocks})
out.append({'id':11,'title':T(11),'blocks':CH11})
out.append({'id':12,'title':T(12),'blocks':CH12})
out.append({'id':13,'title':T(13),'blocks':CH13+P.LR_ZUSATZ})
out.append({'id':14,'title':T(14),'blocks':CH14})
out.append({'id':15,'title':T(15),'blocks':CH15})
out.append({'id':16,'title':T(16),'blocks':P.CH16})
# Herkunft der aus den Schulungsfoliensätzen übernommenen Blöcke festhalten.
# Für diese Inhalte gibt es keine offizielle englische Fassung.
PPT_BLOCKS = (P.CH1_IMG + [P.CH1_BALLSERIE_INTRO] + P.CH1_HALLE + P.ANGABE_METHODIK
              + P.RUECK_METHODIK + P.SPIELRICHTER_ZUSATZ + P.WERTUNG_ZUSATZ
              + P.LR_ZUSATZ + P.CH16 + [P.GESTIK_ZUSATZ])
_ids = set(id(b) for b in PPT_BLOCKS)
for c in out:
    for b in c['blocks']:
        if id(b) in _ids or (b.get('t')=='sig' and b.get('n') in ('17','18')) \
           or (b.get('t')=='img' and isinstance(b.get('src'),str) and b['src'].startswith('ppt/')) \
           or (b.get('t')=='table' and b.get('tbl') is P.SCHLAG_TBL):
            b['origin']='ppt'
    c['videos']=VIDEOS.get(c['id'],[]); c['slots']=SLOTS.get(c['id'],[])

with io.open(APP+'/assets/js/data-content.js','w',encoding='utf-8') as f:
    f.write('/* Auto-generiert / auto-generated aus:\n'
            '   03d_IFA-Spielregeln-2025.pdf + 33d_IFA-Schulungsmappe-fuer-Schiedsrichter-2025.pdf (de)\n'
            '   03_IFA-Rules-of-the-Game-2025.pdf + 33_IFA-Training-Manual-for-Referees-2025.pdf (en)\n'
            '   Textfelder sind Sprachobjekte: { "de": "...", "en": "..." }.\n'
            '   Fehlt "en", zeigt die App den deutschen Text mit Hinweis. */\n')
    f.write('window.IFA_CONTENT = ')
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write(';\n')

tot=sum(len(c['blocks']) for c in out)
def has_en(v): return isinstance(v,dict) and 'en' in v and v['en']
withen=sum(1 for c in out for b in c['blocks'] if has_en(b.get('x')) or b['t']=='table')
print('Kapitel',len(out),'Bloecke',tot,'davon mit EN',withen, '->', round(withen/tot*100), '%')
