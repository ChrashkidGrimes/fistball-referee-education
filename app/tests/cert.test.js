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

console.log('\n== Nachrechnen gegen den Katalog ==');
const cat=[{id:'A',c:1},{id:'B',c:0},{id:'C',c:3}];
const r1=C.regrade({q:[['A',1],['B',2],['C',3]]},cat);
ok(r1.c===2&&r1.n===3&&r1.pct===66.7,'2 von 3 richtig = 66,7 %');
const r2=C.regrade({q:[['A',1],['X',0]]},cat);
ok(r2.unknown===1&&r2.n===1&&r2.c===1,'unbekannte Frage wird gezaehlt, aber nicht gewertet');
ok(r2.items[1].q===null&&r2.items[1].id==='X','unbekannte Frage ist markiert');
{
  const w0={};
  new Function('window',fs.readFileSync(DIR+'/assets/js/data-questions.js','utf8'))(w0);
  ok(w0.IFA_QUESTIONS.every(q=>/^[A-Za-z0-9-]+$/.test(q.id)),'alle Frage-IDs ohne Trennzeichen des Codes');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
