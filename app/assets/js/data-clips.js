/* ============================================================
   Videofragen — Vorlage zum Ausfüllen
   ============================================================

   Jede Frage hier zeigt vor den Antwortmöglichkeiten einen Ausschnitt
   aus einem YouTube-Video. Nötig sind nur drei Angaben:

     yt     die Video-ID, also der Teil hinter "watch?v=" in der Adresse
     start  Startsekunde des Ausschnitts
     end    Endsekunde  (Ausschnitte von 6 bis 12 Sekunden funktionieren gut)

   Vorgehen: ein Spiel auf dem IFA-Kanal öffnen, zur Szene spulen, die
   Sekunde ablesen (Rechtsklick auf das Video -> "Video-URL mit aktueller
   Zeit kopieren" liefert sie direkt), hier eintragen und die Zeilen
   "yt", "start", "end" von den Kommentarzeichen befreien.

   Solange yt leer ist, wird die Frage NICHT in Quiz und Prüfung
   aufgenommen — unfertige Einträge stören also nicht.

   Felder wie bei den übrigen Fragen:
     ch     Kapitelnummer (siehe data-content.js). Bestimmt zugleich den
            Themenpool – siehe POOLS in app.js.
     a      vier Antwortmöglichkeiten
     c      Index der richtigen Antwort in a, beginnend bei 0
     ref    Fundstelle im Regelwerk
   ============================================================ */

window.IFA_CLIPS = [

  {
    id: "CLIP-001", ch: 7, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Blocksituation: Berühren beide Spieler den Ball gleichzeitig, oder ist einer erkennbar früher am Ball? Wie entscheidest du?",
    a: ["Gleichzeitige Berührung – Block, Anzeige mit der senkrecht erhobenen Faust",
        "Der Angreifer war früher am Ball – Angriff, kein Block",
        "Der Blockspieler war früher am Ball – Fehler des Blockspielers",
        "Nicht erkennbar – Wiederholung der letzten Angabe"],
    c: 0,
    ref: "Spielregeln 7.6.1, Erläuterung Block"
  },

  {
    id: "CLIP-002", ch: 7, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Berührt bei dieser Blockaktion einer der Spieler die Leine? Wie entscheidest du?",
    a: ["Leinenberührung – Fehler der berührenden Mannschaft",
        "Keine Leinenberührung – der Spielgang läuft weiter",
        "Leinenberührung nach der Ballaktion – kein Fehler",
        "Wiederholung der letzten Angabe"],
    c: 0,
    ref: "Spielregeln 7.6.1, Erläuterung Block"
  },

  {
    id: "CLIP-003", ch: 6, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Sprungangabe: Wo erfolgt die erste Bodenberührung des Anschlägers nach dem Schlag?",
    a: ["Vor der Angabelinie – gültige Angabe",
        "Hinter der Angabelinie – Fehler wegen Übertritts",
        "Gleichzeitig vor und hinter der Linie – Fehler",
        "Außerhalb des Spielfeldes – keine Angabe"],
    c: 0,
    ref: "Spielregeln 6.3, Erläuterung Angabe im Laufen, Springen, Stehen oder Gehen"
  },

  {
    id: "CLIP-004", ch: 6, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Verlässt der Ball bei dieser kurzen Angabe sichtbar die Abwurfhand?",
    a: ["Ja – gültige Angabe, auch bei sehr kurzem Wurf",
        "Nein, der Ball wird aus der Hand geschoben – Fehler",
        "Der Ball wird aufgefangen – Fehler",
        "Die Angabe wurde nicht begonnen – Wiederholung"],
    c: 0,
    ref: "Spielregeln 6.2, Erläuterung Ball muss Abwurfhand verlassen"
  },

  {
    id: "CLIP-005", ch: 7, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Der Ball geht unter der Leine hindurch. Wie entscheidest du?",
    a: ["Der Ball ist mit vollem Überschreiten der Mittellinie ungültig – weitere Berührungen sind unerheblich",
        "Der Ball darf zurückgespielt werden, solange er noch nicht aufgesprungen ist",
        "Behinderung – Wiederholung der letzten Angabe",
        "Kein Fehler, das Spiel läuft weiter"],
    c: 0,
    ref: "Spielregeln 7.2.1, Erläuterung direkt unter dem Netz hindurchgespielt"
  },

  {
    id: "CLIP-006", ch: 7, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Ein Spieler rutscht nach seiner Aktion ins Gegenfeld und trifft dort auf einen Gegner. Wie entscheidest du?",
    a: ["Unvermeidbare Behinderung – die letzte Angabe wird wiederholt",
        "Absichtliche Behinderung – Fehler der behindernden Mannschaft",
        "Der Spielfluss wurde nicht beeinflusst – weiterspielen lassen",
        "Fehler der behinderten Mannschaft"],
    c: 0,
    ref: "Spielregeln 7.8.1, Erläuterung unbeabsichtigt und unverschuldet"
  },

  {
    id: "CLIP-007", ch: 1, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Der Ball landet an der Grenzlinie. Aus oder gut?",
    a: ["Gut – der Ball berührt die Linie",
        "Aus – der Ball überdeckt die Linie nur, ohne sie zu berühren",
        "Aus – der Ball muss mit vollem Umfang auf der Linie liegen",
        "Wiederholung, weil nicht erkennbar"],
    c: 0,
    ref: "Spielregeln 1.1.2, Erläuterung Aus oder In"
  },

  {
    id: "CLIP-008", ch: 5, scope: "ifa", origin: "draft",
    clip: { yt: "", start: 0, end: 0 },
    q: "Wird der Ball hier regelgerecht geschlagen oder unerlaubt geführt?",
    a: ["Unerlaubtes Schieben – Fehler",
        "Regelgerechter Schlag mit dem Arm",
        "Regelgerechter Schlag mit der Faust",
        "Doppelberührung – Fehler"],
    c: 0,
    ref: "Spielregeln 5.1 und 5.3"
  }

];
