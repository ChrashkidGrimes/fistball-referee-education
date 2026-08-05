# -*- coding: utf-8 -*-
"""Entwurfsfragen nach Niveau einstufen.
   C: Grundwissen, das jeder Schiedsrichter zur Spielleitung braucht –
      Maße, Grundbegriffe, Satzende, Grundregeln der Angabe, Wertung,
      Grundzuständigkeiten. Faktenabfrage.
   A: Auslegung, Abwägung, Ermessensentscheidungen, Sonderfälle,
      Strafen, Positionierung und Verhalten des Schiedsrichters."""
import json, io, collections

# alte Kennung -> C-Niveau
C_LEVEL = {
 'IFA-A-002',  # Breitenmaß 20 m
 'IFA-A-003',  # Ball berührt Linie = im Feld
 'IFA-A-005',  # Leinenhöhe messen
 'IFA-A-012',  # wer meldet die Auswechslung
 'IFA-A-014',  # sechs Spieler im Feld
 'IFA-A-015',  # Wechsel ohne Angaberecht
 'IFA-A-017',  # Satzende 15:14
 'IFA-A-018',  # Entscheidungssatz bei 6 Gutbällen
 'IFA-A-019',  # Beginn und Ende der Satzpause
 'IFA-A-021',  # Time-out ohne Angaberecht
 'IFA-A-023',  # Betreten der neuen Spielhälfte nach Pfiff
 'IFA-A-028',  # Betreten des Gegenfeldes
 'IFA-A-029',  # Was ist ein Schlag
 'IFA-A-030',  # Faustform
 'IFA-A-031',  # Schieben des Balles
 'IFA-A-034',  # Sprungangabe, erste Bodenberührung
 'IFA-A-036',  # Ball angeworfen und aufgefangen
 'IFA-A-039',  # Wann ist die Angabe gültig
 'IFA-A-040',  # Ab wann 3-m-Raum betreten
 'IFA-A-051',  # Fehler = Gutball für den Gegner
 'IFA-A-052',  # Gutbälle im Spielbericht
 'IFA-A-053',  # Rolle der Linienrichter
 'IFA-A-056',  # Tatsachenentscheidungen unanfechtbar
 'IFA-A-058',  # Unterschriften im Spielbericht
 'IFA-A-067',  # Dauer der Zeitstrafe
 'IFA-A-069',  # kein Ersatz während der Zeitstrafe
}

APP='/sessions/affectionate-serene-volta/mnt/referee-education/app'
import subprocess
subprocess.run(['node','-e',
  "global.window={};require('%s/assets/js/data-questions.js');"
  "require('fs').writeFileSync('/tmp/q.json',JSON.stringify(window.IFA_QUESTIONS))" % APP], check=True)
qs=json.load(open('/tmp/q.json'))

nc=na=0
for q in qs:
    if q.get('origin')!='draft': continue
    if q['id'] in C_LEVEL:
        q['lvl']='C'; nc+=1; q['id']='IFA-C-%03d'%nc
    else:
        na+=1; q['id']='IFA-A-%03d'%na

with io.open(APP+'/assets/js/data-questions.js','w',encoding='utf-8') as f:
    f.write('/* Prüfungsfragen.\n'
            '   lvl     Q = Grundmodul, C/B/A = Lizenzstufe\n'
            '   c       Index der richtigen Antwort in a[]\n'
            '   scope   ifa = international gültig, national = nur Deutschland (SpOF/SRO/Faustball Deutschland)\n'
            '   origin  fbd   = aus den Moodle-Fragenkatalogen von Faustball Deutschland\n'
            '           draft = Entwurf, aus Regelwerk und Schulungsmappe abgeleitet,\n'
            '                   fachlich noch nicht freigegeben. In den Einstellungen abschaltbar. */\n')
    f.write('window.IFA_QUESTIONS = ')
    json.dump(qs, f, ensure_ascii=False, indent=0)
    f.write(';\n')

print('Entwürfe auf C-Niveau:', nc, '| auf A-Niveau:', na)
pool=collections.Counter(q['lvl'] for q in qs)
print('Pools jetzt:', dict(sorted(pool.items())))
print('C-Aufgabenpool (Q+C):', pool['Q']+pool['C'], ' davon Grundmodul', pool['Q'], 'C', pool['C'])
for n,size in [('C',54),('B',14),('A',6)]:
    tot=pool['Q']+pool['C']
    print(f'  {n}: {size} aus dem C-Pool -> Grundmodul {round(size*pool["Q"]/tot)}, C {size-round(size*pool["Q"]/tot)}')
