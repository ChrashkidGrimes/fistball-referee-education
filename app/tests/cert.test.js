/* Pruefbarer Nachweis: Pruefcode, Name, Wartezeit, Zertifikat, Pruefseite */
const {JSDOM}=require('jsdom'); const fs=require('fs');
const DIR=require('path').resolve(__dirname,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};
const KEY='ifa-referee-education-v1';
const H=3600e3;

/* App mit vorgegebenem Speicherstand starten.
   opt.url    Adresse der Seite (fuer #verify= und file://)
   opt.now    Startwert der Uhr; a.clock.now laesst sich danach vorstellen
   opt.before Hook nach dem Laden der Daten, vor app.js */
function boot(st, opt){
  opt=opt||{};
  const mem={}; if(st) mem[KEY]=JSON.stringify(st);
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),
    {runScripts:'outside-only', url:opt.url||'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const clock={now:opt.now||Date.now()};
  w.__clock=()=>clock.now;
  w.eval('Date.now=function(){return window.__clock();};');
  ['i18n','data-content','data-questions','data-clips','cert-code','vendor/qrcode']
    .forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  if(opt.before) opt.before(w);
  w.eval(fs.readFileSync(DIR+'/assets/js/app.js','utf8'));
  const d=w.document;
  return {w,d,mem,clock,
    T:()=>d.getElementById('app').textContent,
    click:s=>{const n=d.querySelector(s); if(!n) throw new Error('nicht gefunden: '+s);
      n.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));},
    store:()=>JSON.parse(mem[KEY]||'{}')};
}
/* Speicherstand mit allen Modulen erledigt */
function ready(lvl, extra){
  const p={read:{},quiz:{},exam:null};
  for(let i=1;i<=16;i++){p.quiz[i]=100;p.read[i]=true;}
  Object.assign(p, extra||{});
  return {lang:'de',nat:true,progress:{[lvl]:p}};
}
/* Laufende Pruefung beantworten; ratio = Anteil richtiger Antworten */
function runExam(a, ratio){
  const {w,d}=a; let total=null, correct=0;
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    if(total===null) total=parseInt(a.T().match(/von (\d+)/)[1],10);
    const opts=[...d.querySelectorAll('.opt span:last-child')].map(s=>s.textContent);
    const q=w.IFA_QUESTIONS.find(x=>x.q.de===qt.textContent);
    const right=opts.indexOf(q.a.de[q.c]);
    const want=correct<Math.round(total*ratio);
    if(want) correct++;
    a.click('[data-opt="'+(want?right:(right===0?1:0))+'"]');
    const act=(d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]')).getAttribute('data-act');
    a.click('[data-act="'+act+'"]');
    if(act==='finish') break;
  }
  return {total, correct};
}

/* ------------------------------------------------------------------ */
const C=(()=>{const w={}; new Function('window',fs.readFileSync(DIR+'/assets/js/cert-code.js','utf8'))(w); return w.IFA_CERT;})();

console.log('\n== Pruefcode: Codieren und Decodieren ==');
const rec={lvl:'N',date:'2026-10-25',attempt:3,name:'Jürgen Müßig-Öztürk',pct:88.3,
  q:[['IFA-A-004',2],['QA-2022-021',0],['IFA-BILD-001',3]]};
const code=C.encode(rec);
const crc=code.split('.')[1], body=code.split('.')[0];
ok(/^[A-Za-z0-9_-]+\.[0-9a-f]{8}$/.test(code),'Code besteht aus base64url und Pruefsumme');
const dec=C.decode(code);
ok(dec&&dec.name===rec.name,'Name mit Umlauten bleibt erhalten');
ok(dec&&dec.lvl==='N'&&dec.date==='2026-10-25'&&dec.attempt===3&&dec.pct===88.3,
   'Stufe, Datum, Versuch und Ergebnis bleiben erhalten');
ok(dec&&JSON.stringify(dec.q)===JSON.stringify(rec.q),'Fragen und Antworten bleiben erhalten');
ok(dec&&dec.no===(crc.slice(0,4)+'-'+crc.slice(4)).toUpperCase(),'Zertifikatsnummer aus der Pruefsumme');
ok(C.decode(C.encode(Object.assign({},rec,{pct:100}))).pct===100,'100 % uebersteht die Codierung');

console.log('\n== Pruefcode: Veraenderungen fallen auf ==');
const plain=Buffer.from(body,'base64url').toString('utf8');
const recode=p=>Buffer.from(p,'utf8').toString('base64url')+'.'+crc;
ok(C.decode(recode(plain))!==null,'unveraenderter Klartext bleibt gueltig');
ok(C.decode(recode(plain.replace('|88.3|','|98.3|')))===null,'geaenderte Prozentzahl -> ungueltig');
ok(C.decode(recode(plain.replace('Jürgen','Peter')))===null,'geaenderter Name -> ungueltig');
ok(C.decode(recode(plain.replace('IFA-A-004:2','IFA-A-004:1')))===null,'geaenderte Antwort -> ungueltig');
ok(C.decode(body+'.00000000')===null,'falsche Pruefsumme -> ungueltig');
ok(C.decode('kein code')===null&&C.decode('')===null&&C.decode(null)===null,'Unsinn -> ungueltig');
ok(C.decode(C.encode(Object.assign({},rec,{name:'A|B'})))===null,'Trennzeichen im Namen wird nicht still uebernommen');

const fresh=p=>{const b=Buffer.from(p,'utf8'); return b.toString('base64url')+'.'+C.crc32(b.toString('latin1'));};
ok(C.crc32('123456789')==='cbf43926','CRC32 liefert den Standard-Pruefwert');
ok(C.decode(fresh(plain))!==null,'neu berechnete Pruefsumme ist gueltig');
ok(C.decode(' '+body+'.'+crc.toUpperCase()+' ')!==null,'Pruefsumme in Grossbuchstaben und Leerraum werden angenommen');
ok(C.decode(fresh(plain.replace('|N|','|X|')))===null,'unbekannte Stufe -> ungueltig, auch mit passender Pruefsumme');
ok(C.decode(fresh(plain.replace('|2026-10-25|','||')))===null,'leeres Datum -> ungueltig');
ok(C.decode(fresh(plain.replace('|3|','|x|')))===null,'Versuch keine Zahl -> ungueltig');
ok(C.decode(fresh(plain.replace('|88.3|','|188.3|')))===null,'Ergebnis ueber 100 % -> ungueltig');
ok(C.decode(fresh(plain.replace('IFA-A-004:2','IFA-A-004:2:9')))===null,'kaputter Fragen-Eintrag -> ungueltig');
{ const e=C.decode(C.encode(Object.assign({},rec,{q:[]}))); ok(e&&e.q.length===0,'leere Fragenliste uebersteht die Codierung'); }

console.log('\n== Nachrechnen gegen den Katalog ==');
const cat=[{id:'A',c:1},{id:'B',c:0},{id:'C',c:3}];
const r1=C.regrade({q:[['A',1],['B',2],['C',3]]},cat);
ok(r1.c===2&&r1.n===3&&r1.pct===66.7,'2 von 3 richtig = 66,7 %');
const r2=C.regrade({q:[['A',1],['X',0]]},cat);
ok(r2.unknown===1&&r2.n===1&&r2.c===1,'unbekannte Frage wird gezaehlt, aber nicht gewertet');
ok(r2.items[1].q===null&&r2.items[1].id==='X','unbekannte Frage ist markiert');
const r3=C.regrade({q:[['__proto__',0],['constructor',1]]},cat);
ok(r3.unknown===2&&r3.n===0,'Namen wie __proto__ gelten nicht als Frage');
{
  const w0={};
  new Function('window',fs.readFileSync(DIR+'/assets/js/data-questions.js','utf8'))(w0);
  ok(w0.IFA_QUESTIONS.every(q=>/^[A-Za-z0-9-]+$/.test(q.id)),'alle Frage-IDs ohne Trennzeichen des Codes');
}

console.log('\n== Name vor der Pruefung ==');
{
  const a=boot(ready('R'));
  a.click('[data-go="level:R"]');
  ok(a.d.getElementById('examName')!==null,'Namensfeld vor dem Start');
  a.click('[data-go="exam:R"]');
  ok(a.d.querySelector('.qtxt')===null,'ohne Namen startet keine Pruefung');
  ok(/Bitte zuerst den Namen eintragen/.test(a.T()),'Hinweis auf fehlenden Namen');
  a.d.getElementById('examName').value='  Erika | Muster, mann ';
  a.click('[data-go="exam:R"]');
  ok(a.d.querySelector('.qtxt')!==null,'mit Namen startet die Pruefung');
  ok(a.store().progress.R.name==='Erika Muster mann','Name bereinigt gespeichert, ist: '+a.store().progress.R.name);
}
{
  const a=boot(ready('R',{name:'Max'}));
  a.click('[data-go="level:R"]');
  ok(a.d.getElementById('examName').value==='Max','gespeicherter Name vorbelegt');
}
{
  const a=boot({lang:'de',nat:true,progress:{C:{read:{},quiz:{},exam:null,name:'Alt'}}});
  ok(a.store().progress.R.name==='Alt','Name aus der dreistufigen Fassung wird uebernommen');
}

console.log('\n== Versuche und Wartezeit ==');
{
  const a=boot(ready('R',{name:'Erika'}),{now:Date.UTC(2026,9,25,10,0)});
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,0.5);
  let ex=a.store().progress.R.exam;
  ok(ex.attempts===1,'Versuch 1 gezaehlt');
  ok(ex.lastFail===a.clock.now,'nicht bestanden -> Zeitpunkt gemerkt');
  ok(!ex.cert,'ohne Bestehen kein gespeicherter Versuch');
  ok(/Nächster Versuch möglich ab/.test(a.T()),'Ergebnis nennt die Wartezeit');
  ok(!a.d.querySelector('[data-act="again"]'),'kein Sofort-Wiederholen nach Nichtbestehen');
  a.click('[data-go="level:R"]');
  ok(a.d.querySelector('[data-go="exam:R"]').disabled,'Start gesperrt');
  a.click('[data-go="exam:R"]');
  ok(a.d.querySelector('.qtxt')===null,'Klick waehrend der Sperre startet nichts');
  a.clock.now+=2*H-60e3; a.click('[data-go="home"]'); a.click('[data-go="level:R"]');
  ok(a.d.querySelector('[data-go="exam:R"]').disabled,'nach 1 Stunde 59 Minuten noch gesperrt');
  a.clock.now+=60e3+1; a.click('[data-go="home"]'); a.click('[data-go="level:R"]');
  ok(!a.d.querySelector('[data-go="exam:R"]').disabled,'nach 2 Stunden frei');
  a.click('[data-go="exam:R"]'); runExam(a,0.8);
  ex=a.store().progress.R.exam;
  ok(ex.attempts===2,'Versuch 2 gezaehlt');
  ok(!ex.lastFail,'bestanden -> keine Sperre');
  ok(ex.cert&&ex.cert.attempt===2&&ex.cert.name==='Erika'&&ex.cert.lvl==='R','bestandener Versuch gespeichert');
  ok(ex.cert.q.length===40&&ex.cert.q.every(x=>typeof x[0]==='string'&&x[1]>=0&&x[1]<4),'40 Fragen mit Antwortindex');
  ok(/^\d{4}-\d\d-\d\d$/.test(ex.cert.date),'Datum im ISO-Format');
  ok(a.w.IFA_CERT.regrade(ex.cert,a.w.IFA_QUESTIONS).pct===ex.cert.pct,'gespeicherte Antworten ergeben nachgerechnet dasselbe Ergebnis');
  const best=ex.cert.pct;
  a.click('[data-act="again"]'); runExam(a,0.75);
  ex=a.store().progress.R.exam;
  ok(ex.attempts===3&&ex.cert.pct===best&&ex.cert.attempt===2,'schlechterer bestandener Versuch ersetzt den gespeicherten nicht');
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,1);
  ex=a.store().progress.R.exam;
  ok(ex.cert.attempt===4&&ex.cert.pct===100,'besserer bestandener Versuch ersetzt ihn');
}

console.log('\n== Abbruch zaehlt als Versuch ==');
{
  const t0=Date.UTC(2026,9,25,10,0);
  const a=boot(ready('R',{name:'Erika'}),{now:t0});
  a.click('[data-go="level:R"]');
  ok(/Mit dem Start zählt der Versuch/.test(a.T()),'Hinweis vor dem Start');
  a.click('[data-go="exam:R"]');
  let ex=a.store().progress.R.exam;
  ok(ex.attempts===1&&ex.lastFail===t0,'Start zaehlt den Versuch und sperrt sofort');
  ok(ex.best==null,'Start allein ergibt kein Ergebnis');
  /* Browser geschlossen: neuer Start mit dem gespeicherten Stand */
  const b=boot(a.store(),{now:t0+H});
  b.click('[data-go="level:R"]');
  ok(b.d.querySelector('[data-go="exam:R"]').disabled,'nach Schliessen des Browsers gesperrt');
  ok(/Versuche:\s*1/.test(b.T())&&/kein Versuch abgeschlossen/.test(b.T())&&!/Bestes Prüfungsergebnis:/.test(b.T()),'Versuch angezeigt, kein Ergebnis');
  /* Abbruch ueber den Knopf */
  const c=boot(ready('R',{name:'Erika'}),{now:t0});
  c.click('[data-go="level:R"]'); c.click('[data-go="exam:R"]'); c.click('[data-act="abort"]');
  ex=c.store().progress.R.exam;
  ok(ex.attempts===1&&ex.lastFail===t0&&c.d.querySelector('[data-go="exam:R"]').disabled,'Abbruch: Versuch gezaehlt, gesperrt');
  c.clock.now+=2*H+1; c.click('[data-go="home"]'); c.click('[data-go="level:R"]');
  c.click('[data-go="exam:R"]'); runExam(c,0.8);
  ex=c.store().progress.R.exam;
  ok(ex.attempts===2&&!ex.lastFail&&ex.cert.attempt===2,'danach bestanden: Versuch 2, Sperre aufgehoben');
}

console.log('\n== Nachpruefungsband und Zuruecksetzen ==');
{
  const a=boot(ready('R',{name:'Erika'}));
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,0.675);
  const ex=a.store().progress.R.exam;
  ok(ex.lastFail&&!ex.cert,'67,5 % (Nachpruefung) gilt als nicht bestanden und sperrt');
  ok(/Nachprüfung/.test(a.T())&&/Nächster Versuch möglich ab/.test(a.T())&&!a.d.querySelector('[data-act="again"]'),
     'Nachpruefung: Hinweis auf Wartezeit, kein Sofort-Wiederholen');
  a.click('[data-go="level:R"]'); a.click('[data-reset="R"]');
  const g=a.store().progress.R;
  ok(g.exam&&g.exam.attempts===1&&g.exam.lastFail===ex.lastFail,'Zuruecksetzen behaelt Versuchszaehler und Sperre');
  ok(!g.quiz||Object.keys(g.quiz).length===0,'Zuruecksetzen loescht den Lernfortschritt');
  a.click('[data-go="settings"]'); a.click('[data-act="resetall"]');
  ok(a.store().progress.R.exam.attempts===1,'auch "Alle Daten zuruecksetzen" behaelt den Zaehler');
  a.click('[data-go="home"]');
  ok(/Starten|starten/.test(a.d.querySelector('[data-go="level:R"]').textContent),'Stufe gilt nach dem Zuruecksetzen als nicht begonnen');
}
{
  const a=boot(ready('R'));
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]');
  a.click('[data-go="home"]'); a.click('[data-go="level:R"]');
  ok(!/Bitte zuerst den Namen eintragen/.test(a.T()),'Hinweis auf fehlenden Namen verschwindet beim Verlassen');
  a.d.getElementById('examName').value='x'.repeat(200);
  a.click('[data-go="exam:R"]');
  ok(a.store().progress.R.name.length===80,'Name auf 80 Zeichen begrenzt');
}

console.log('\n== Zertifikat ==');
{
  const a=boot(ready('R',{name:'Erika'}));
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,1);
  a.click('[data-go="cert:R"]');
  ok(a.d.querySelector('.cert h1').textContent==='Zertifikat','Titel Zertifikat');
  ok(/Abschlussprüfung/.test(a.T())&&/bestanden/.test(a.T()),'Text: Abschlusspruefung bestanden');
  ok(a.d.querySelector('.cert .name').textContent==='Erika','Name aus dem Pruefungsstart');
  ok(!a.d.getElementById('nameInput'),'kein Namensfeld mehr auf dem Zertifikat');
  ok(a.d.querySelector('.cert .qr svg')!==null,'QR-Code vorhanden');
  ok(/[0-9A-F]{4}-[0-9A-F]{4}/.test(a.d.querySelector('.cert .cno').textContent),'Zertifikatsnummer angezeigt');
  const link=a.d.querySelector('.cert .vurl').getAttribute('href');
  ok(link.startsWith('https://x/#verify='),'Prueflink auf die eigene Adresse, ist: '+link.slice(0,30));
  const dec=a.w.IFA_CERT.decode(link.split('#verify=')[1]);
  ok(dec&&dec.name==='Erika'&&dec.pct===100&&dec.q.length===40,'Prueflink enthaelt den gueltigen Code');
  ok(/Versuch/.test(a.T())&&/Unbeaufsichtigt/.test(a.T()),'Versuch und Hinweis auf unbeaufsichtigte Pruefung');
}
{
  const a=boot(ready('R',{name:'Max',exam:{best:90,pct:90,c:36,n:40,date:'01.08.2026'}}));
  a.click('[data-go="level:R"]'); a.click('[data-go="cert:R"]');
  ok(a.d.querySelector('.cert .qr')===null,'Altbestand: kein QR-Code');
  ok(/erneut ablegen/.test(a.T()),'Altbestand: Hinweis auf neue Pruefung');
  ok(a.d.querySelector('.cert .name').textContent==='Max','Altbestand: Name bleibt');
}
{
  const a=boot(ready('R',{name:'Erika'}),{url:'file:///tmp/app/index.html'});
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,1);
  a.click('[data-go="cert:R"]');
  ok(a.d.querySelector('.cert .vurl').getAttribute('href')
     .startsWith('https://chrashkidgrimes.github.io/fistball-referee-education/#verify='),
     'per file:// zeigt der QR-Code auf die veroeffentlichte Adresse');
}

console.log('\n== Pruefseite ==');
{
  const a=boot(ready('N',{name:'Erika'}));
  a.click('[data-go="level:N"]'); a.click('[data-go="exam:N"]'); runExam(a,0.9);
  a.click('[data-go="cert:N"]');
  const link=a.d.querySelector('.cert .vurl').getAttribute('href');
  const code=link.split('#verify=')[1];

  const v=boot(null,{url:link});
  ok(/Zertifikat prüfen/.test(v.T()),'#verify= oeffnet die Pruefseite');
  ok(/Prüfsumme gültig/.test(v.T()),'gueltiger Code erkannt');
  ok(/Erika/.test(v.T())&&/Nationale Lizenz/.test(v.T()),'Name und Stufe angezeigt');
  ok(/90 %/.test(v.T()),'Ergebnis angezeigt');
  ok(v.d.querySelectorAll('.rq').length===60,'alle 60 Fragen aufgefuehrt');
  ok(!/Fragenkatalog wurde/.test(v.T()),'kein Katalog-Hinweis bei unveraendertem Katalog');
  ok(!v.store().progress,'Pruefseite schreibt keinen Fortschritt');

  const m=boot(null);
  m.click('[data-go="verify"]');
  m.d.getElementById('verifyInput').value=link;
  m.click('[data-act="verify"]');
  ok(/Prüfsumme gültig/.test(m.T()),'eingefuegte Adresse wird akzeptiert');
  m.d.getElementById('verifyInput').value=code.slice(0,-1)+(code.slice(-1)==='0'?'1':'0');
  m.click('[data-act="verify"]');
  ok(/Code ungültig oder verändert/.test(m.T())&&m.d.querySelectorAll('.rq').length===0,
     'veraenderter Code -> ungueltig, keine Details');

  const first=a.w.IFA_CERT.decode(code).q[0][0];
  const k=boot(null,{url:link,before:w=>{w.IFA_QUESTIONS=w.IFA_QUESTIONS.filter(q=>q.id!==first);}});
  ok(/Fragenkatalog wurde seit der Prüfung geändert/.test(k.T()),'geaenderter Katalog -> Hinweis');
  ok(/nicht mehr im Katalog/.test(k.T()),'fehlende Frage markiert');

  const e=boot({lang:'en',nat:true,progress:{}},{url:link});
  ok(/Checksum valid/.test(e.T()),'Pruefseite auf Englisch');
}
{
  const h=boot(null);
  ok(h.d.querySelector('#app [data-go="verify"]')!==null,'Link auf der Startseite');
  h.click('[data-go="settings"]');
  ok(h.d.querySelector('#app [data-go="verify"]')!==null,'Link in den Einstellungen');
}

console.log('\n== Pruefseite: praeparierte Codes ==');
{
  const C2=boot(null).w.IFA_CERT;
  const mk=(o)=>C2.encode(Object.assign({lvl:'R',date:'2026-10-25',attempt:1,name:'Erika',pct:80,
    q:Array.from({length:40},(_,i)=>['IFA-A-'+String(i+1).padStart(3,'0'),0])},o));
  let v=boot(null,{url:'https://x/#verify='+mk({name:'<img src=x onerror=alert(1)>'})});
  ok(v.d.querySelector('#app img[src="x"]')===null&&/<img src=x/.test(v.T()),'HTML im Namen wird als Text angezeigt');
  ok(/✓/.test(v.d.querySelector('.vres h2').textContent),'regulaere Pruefung ohne Warnung');
  v=boot(null,{url:'https://x/#verify='+mk({pct:10})});
  ok(v.d.querySelector('.vres.warn')!==null&&/keiner regulären Prüfung/.test(v.T()),'Ergebnis unter der Grenze -> Warnung');
  v=boot(null,{url:'https://x/#verify='+mk({q:[['IFA-A-001',0],['IFA-A-001',0]]})});
  ok(v.d.querySelector('.vres.warn')!==null,'doppelte Fragen und falsche Fragenzahl -> Warnung');
  v=boot(null,{url:'https://x/#verify='+mk({q:[['IFA-A-001',7],['IFA-A-002',-1]].concat(Array.from({length:38},(_,i)=>['IFA-C-'+String(i+1).padStart(3,'0'),0]))})});
  ok(v.d.querySelectorAll('.rq').length===40,'Antwortindex ausserhalb des Bereichs bricht nichts');
  v=boot(null,{url:'https://x/#verify=abc%zz'});
  ok(/Zertifikat prüfen/.test(v.T())&&/Code ungültig/.test(v.T()),'kaputtes %-Zeichen im Link: App startet, Code ungueltig');
  ok(v.w.location.hash==='','Pruefcode verschwindet nach dem Start aus der Adresse');
  v.w.location.hash='#verify='+mk({});
  v.w.dispatchEvent(new v.w.HashChangeEvent('hashchange'));
  ok(/Prüfsumme gültig/.test(v.T()),'neu eingefuegter Pruefllink im offenen Tab wird geprueft');
}
{
  const a=boot(ready('R',{name:'Erika'}),{before:w=>{delete w.qrcode;}});
  a.click('[data-go="level:R"]'); a.click('[data-go="exam:R"]'); runExam(a,1);
  a.click('[data-go="cert:R"]');
  ok(a.d.querySelector('.cert .cno')!==null,'ohne QR-Bibliothek: Zertifikat mit Nummer und Link');
  const b=boot(ready('R',{name:'Erika',exam:{best:90,pct:90,c:36,n:40,date:'01.08.2026',
    cert:{lvl:'R',date:'2026-10-25',attempt:1,name:'Erika',pct:'kaputt',c:36,n:40,q:[]}}}));
  b.click('[data-go="level:R"]'); b.click('[data-go="cert:R"]');
  ok(b.d.querySelector('.cert')!==null,'beschaedigter Speicherstand: Zertifikat rendert trotzdem');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
