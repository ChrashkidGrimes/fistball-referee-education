/* Haelt die englischen Erlaeuterungen mit den offiziellen Ausgaben in Deckung.

   Anlass: sechs Erlaeuterungen trugen eine Arbeitsuebersetzung, obwohl die
   offizielle englische Ausgabe den Text sehr wohl enthaelt – bei zweien war
   das nicht einmal gekennzeichnet, Lernende hielten meine Formulierung fuer
   die verbindliche. Ursache war die fehlende Farbtrennung beim Einlesen:
   die Mappe setzt Regeltext schwarz und Erlaeuterung blau, und wo die
   englische Ausgabe die Erlaeuterung ohne eigene Ueberschrift direkt an den
   Regeltext haengt, war sie nicht mehr als eigener Block erkennbar.

   Der Test laeuft zweistufig:
   - immer: Struktur. Welche Bloecke duerfen eine Arbeitsuebersetzung sein,
     welche muessen eine Quellangabe tragen.
   - wenn die PDFs im uebergeordneten Ordner liegen: Volltextabgleich jeder
     Erlaeuterung, die offiziellen Status beansprucht. */
const fs=require('fs');
const path=require('path');
const DIR=path.resolve(__dirname,'..');
const ROOT=path.resolve(DIR,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};

const w={};
new Function('window', fs.readFileSync(DIR+'/assets/js/data-content.js','utf8'))(w);
const C=w.IFA_CONTENT;

const notes=[];
C.forEach(c=>c.blocks.forEach((b,i)=>{ if(b.t==='note') notes.push({ch:c.id,i,b}); }));

/* Diese beiden Stellen haben in der offiziellen englischen Ausgabe wirklich
   keine Entsprechung: die Lockerung der Kleidungsvorschriften zu Regel 2.3
   und der Zusatz zu den Unterziehhosen bei 2.3.3. Kommt eine dazu oder faellt
   eine weg, soll das auffallen. */
const ARBEITSUEBERSETZUNG=[[2,15],[2,19]];
/* Eigener Einleitungstext zu den Verbandsordnungen – zweisprachig von uns
   verfasst, es gibt dafuer keine Quelle und damit nichts abzugleichen. */
const EIGENER_TEXT=[[15,0]];

const istIn=(liste,ch,i)=>liste.some(([a,b])=>a===ch&&b===i);

console.log('\n== Kennzeichnung ==');
{
  const markiert=notes.filter(n=>n.b.tr).map(n=>[n.ch,n.i]);
  ok(markiert.length===ARBEITSUEBERSETZUNG.length&&
     markiert.every(([c,i])=>istIn(ARBEITSUEBERSETZUNG,c,i)),
     'genau die erwarteten Arbeitsuebersetzungen sind markiert, ist: '+
     JSON.stringify(markiert));
  ok(notes.every(n=>!(n.b.tr&&n.b.src_en)),
     'kein Block ist gleichzeitig Arbeitsuebersetzung und Quellangabe');
  ok(notes.filter(n=>n.b.origin!=='ppt').every(n=>n.b.x&&n.b.x.en),
     'jede Erlaeuterung ausserhalb der Foliensaetze hat englischen Text');
}

console.log('\n== Volltextabgleich gegen die offiziellen Ausgaben ==');
{
  const PDFS=[ROOT+'/33_IFA-Training-Manual-for-Referees-2025.pdf',
              ROOT+'/03_IFA-Rules-of-the-Game-2025.pdf'];
  const fehlend=PDFS.filter(p=>!fs.existsSync(p));
  if(fehlend.length){
    console.log('  uebersprungen – Quelldokumente liegen nicht im Ordner');
    console.log('  (sie gehoeren nicht ins Repository, siehe README)');
  } else {
    const cp=require('child_process');
    const py=`
import pdfplumber, re, json, sys
def norm(s):
    s=s.lower()
    for a,b in [('\\u2019',"'"),('\\u2018',"'"),('\\u201c','"'),('\\u201d','"'),
                ('\\u2013','-'),('\\u2014','-'),('\\u00a0',' ')]:
        s=s.replace(a,b)
    return re.sub(r'[^a-z0-9]','',s)
t=''
for f in sys.argv[1:]:
    with pdfplumber.open(f) as p:
        t += norm("\\n".join((pg.extract_text() or '') for pg in p.pages))
sys.stdout.write(t)
`;
    const r=cp.spawnSync('python3',['-c',py].concat(PDFS),
                         {encoding:'utf8',maxBuffer:64*1024*1024});
    if(r.status!==0){
      console.log('  uebersprungen – pdfplumber nicht verfuegbar');
    } else {
      const quelle=r.stdout;
      const norm=s=>s.toLowerCase()
        .replace(/[’‘]/g,"'").replace(/[“”]/g,'"')
        .replace(/[–—]/g,'-').replace(/ /g,' ')
        .replace(/[^a-z0-9]/g,'');
      ok(quelle.length>50000,'Quelltext eingelesen ('+quelle.length+' Zeichen)');
      const pruefen=notes.filter(n=>n.b.origin!=='ppt'&&!n.b.tr&&
                                    !istIn(EIGENER_TEXT,n.ch,n.i));
      const daneben=pruefen.filter(n=>{
        const p=norm(n.b.x.en).slice(0,80);
        return p&&!quelle.includes(p);
      });
      ok(daneben.length===0,
         pruefen.length+' Erlaeuterungen stehen wortgleich in den offiziellen Ausgaben'+
         (daneben.length?' – Abweichung bei '+
          daneben.map(n=>'Kap '+n.ch+' Block '+n.i).join(', '):''));
      /* Gegenprobe: die als Arbeitsuebersetzung markierten duerfen dort
         gerade NICHT stehen, sonst ist die Kennzeichnung ueberfluessig. */
      const unnoetig=notes.filter(n=>n.b.tr).filter(n=>{
        const p=norm(n.b.x.en).slice(0,80);
        return p&&quelle.includes(p);
      });
      ok(unnoetig.length===0,
         'keine Arbeitsuebersetzung, fuer die es offiziellen Text gibt'+
         (unnoetig.length?' ('+unnoetig.map(n=>'Kap '+n.ch+' Block '+n.i).join(', ')+')':''));
      /* Die acht Bloecke mit Quellangabe einzeln nachweisen. */
      notes.filter(n=>n.b.src_en).forEach(n=>{
        const p=norm(n.b.x.en).slice(0,80);
        ok(quelle.includes(p),'Kap '+n.ch+' Block '+n.i+' ('+n.b.src_en+') steht in der Quelle');
      });
    }
  }
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
