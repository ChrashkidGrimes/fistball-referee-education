const {JSDOM}=require('jsdom'); const fs=require('fs'); const path=require('path');
const DIR=require('path').resolve(__dirname,'..');
let pass=0, fail=0;
const ok=(c,m)=>{ c?pass++:fail++; console.log((c?'  PASS ':'  FAIL ')+m); };
/* Fragen tragen jetzt Sprachobjekte: Suche ueber beide Sprachen */
function findQ(list, text){
  return list.find(x => (x.q && (x.q.de===text || x.q.en===text)) || x.q===text);
}
function ansOf(q, lang){
  const a=q.a; return Array.isArray(a) ? a : (a[lang||'de']||a.de);
}


const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),
  {runScripts:'outside-only', url:'https://x/', pretendToBeVisual:true});
const w=dom.window;
// localStorage-Stub
const mem={}; Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
w.confirm=()=>true; w.print=()=>{}; w.scrollTo=()=>{};
['i18n','data-content','data-questions','app'].forEach(f=>
  w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
const d=w.document;
const click=s=>{ const n=d.querySelector(s); if(!n) throw new Error('nicht gefunden: '+s);
  n.dispatchEvent(new w.MouseEvent('click',{bubbles:true})); };
const txt=()=>d.getElementById('app').textContent;

console.log('\n== Navigation ==');
ok(/Schiedsrichter-Ausbildung Faustball/.test(txt()),'Startseite rendert');
ok(d.querySelectorAll('.lvl').length===3,'drei Lizenzstufen (C/B/A)');
click('[data-go="level:C"]');
ok(/Lernpfad/.test(txt()),'Lernpfad C');
const mods=d.querySelectorAll('.mod').length;
ok(mods===16,'16 Module sichtbar (mit nationalem Kapitel), ist: '+mods);
ok(/gesperrt/.test(txt()),'Pruefung gesperrt solange Module offen');

console.log('\n== Sprache ==');
click('[data-lang="en"]');
ok(/Learning path/.test(txt()),'Umschaltung auf Englisch');
ok(/not yet available/.test(txt())===false,'Hinweis nur in Kapiteln');
click('[data-lang="de"]');

console.log('\n== Kapitel ==');
click('[data-go="chapter:C:11"]');
ok(d.querySelectorAll('.sig').length===18,'18 Handzeichen (16 aus der Schulungsmappe, 2 aus den Folien), ist: '+d.querySelectorAll('.sig').length);
ok(d.querySelectorAll('.sig img').length===21,'21 Handzeichen-Fotos, ist: '+d.querySelectorAll('.sig img').length);
click('[data-go="level:C"]'); click('[data-go="chapter:C:1"]');
ok(d.querySelectorAll('iframe').length===1,'Video in Kapitel 1 eingebettet');
ok(d.querySelector('iframe').src.includes('youtube-nocookie'),'Video ueber youtube-nocookie');
ok(d.querySelectorAll('.rule').length>10,'Regeltextbloecke vorhanden');
ok(d.querySelectorAll('.note').length>5,'Auslegungen vorhanden');
ok(d.querySelectorAll('.hall').length>0,'Hallen-Sonderregeln vorhanden');
click('[data-go="level:C"]'); click('[data-go="chapter:C:14"]');
ok(d.querySelectorAll('table.data tbody tr').length===8,'Altersklassen-Tabelle mit 8 Zeilen');

console.log('\n== Kapitelquiz mit Feedback ==');
click('[data-go="level:C"]'); click('[data-go="chapter:C:1"]'); click('[data-go="quiz:C:1"]');
ok(/Frage 1 von/.test(txt()),'Quiz startet');
ok(d.querySelectorAll('.opt').length===4,'vier Antwortoptionen');
click('[data-act="check"]');            // ohne Auswahl -> disabled, kein Effekt
ok(/Frage 1 von/.test(txt()),'Pruefen ohne Auswahl wirkungslos');
click('[data-opt="0"]'); click('[data-act="check"]');
ok(d.querySelector('.fb')!==null,'Sofortfeedback im Kapitelquiz');
ok(d.querySelector('.opt.right')!==null,'richtige Antwort markiert');

// Quiz mit 100 % abschliessen
function solveQuiz(){
  for(;;){
    const z=w.eval('null'); // state ist gekapselt -> ueber DOM loesen
    const opts=[...d.querySelectorAll('.opt')];
    if(!opts.length) break;
    // richtige Option ueber Feedback ermitteln: erst pruefen, dann Markierung lesen
    if(!d.querySelector('.fb')){ opts[0].dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
      const cb=d.querySelector('[data-act="check"]'); if(cb) cb.dispatchEvent(new w.MouseEvent('click',{bubbles:true})); }
    const right=[...d.querySelectorAll('.opt')].findIndex(o=>o.classList.contains('right'));
    // zurueckspringen ist nicht moeglich -> weiter
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    if(!nx) break;
    const isFinish=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    if(isFinish) break;
  }
}
solveQuiz();
ok(/Ergebnis/.test(txt()),'Quiz-Auswertung erscheint');
ok(d.querySelectorAll('.rq').length>0,'Antwortdurchsicht vorhanden');

console.log('\n== Bildzuordnung der Handzeichen ==');
/* Die Reihenfolge der Bild-Objekte im PDF entspricht nicht der Lesereihenfolge
   (Seite 27 der Schulungsmappe ist vertauscht). tools/map_signals.py leitet die
   Zuordnung ueber die Position auf der Seite her und schreibt manifest.json.
   Hier wird geprueft, dass data-content.js dazu passt. */
const fs2=require('fs');
const man=JSON.parse(fs2.readFileSync(DIR+'/assets/img/signals/manifest.json','utf8'));
const sigs=w.IFA_CONTENT.find(c=>c.id===11).blocks.filter(b=>b.t==='sig');
ok(sigs.length===18,'18 Zeichen');
let mapOk=true, cover=[];
sigs.forEach(b=>{
  b.img.forEach(name=>{
    cover.push(name);
    const m=man[name];
    if(!m){ mapOk=false; console.log('    '+name+' fehlt im Manifest'); }
    else if(m.signal!==Number(b.n)){ mapOk=false;
      console.log('    '+name+' gehoert laut Manifest zu Zeichen '+m.signal+' ('+m.source+'), steht aber bei '+b.n); }
  });
});
ok(mapOk,'jedes Bild steht bei dem Zeichen, zu dem es laut Manifest gehoert');
ok(sigs.every(b=>b.img.length>0),'kein Zeichen ohne Bild');
ok(new Set(cover).size===cover.length,'kein Bild doppelt vergeben');
const imFiles=fs2.readdirSync(DIR+'/assets/img/signals').filter(f=>f.endsWith('.jpg')).map(f=>f.replace('.jpg',''));
ok(imFiles.filter(f=>f.startsWith('sig')).every(f=>cover.includes(f)),'keine verwaisten Zeichen-Bilder');
ok(cover.every(f=>imFiles.includes(f)),'alle referenzierten Bilddateien vorhanden');
/* Nur Zeichen 1 und 16 sind mehrteilig – das war die Fehlerquelle */
ok(sigs.filter(b=>b.img.length>1).map(b=>b.n).join(',')==='1,16','nur Zeichen 1 und 16 haben mehrere Bilder');

console.log('\n== Pruefung: Freischaltung ==');
// alle Kapitel per Direktzugriff auf den Speicher abschliessen
const store=JSON.parse(mem['ifa-referee-education-v1']);
store.progress.C={read:{},quiz:{},exam:null};
for(let i=1;i<=16;i++){ store.progress.C.quiz[i]=100; store.progress.C.read[i]=true; }
mem['ifa-referee-education-v1']=JSON.stringify(store);
const dom2=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
const w2=dom2.window;
Object.defineProperty(w2,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
w2.confirm=()=>true; w2.print=()=>{}; w2.scrollTo=()=>{};
['i18n','data-content','data-questions','app'].forEach(f=>w2.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
const d2=w2.document, txt2=()=>d2.getElementById('app').textContent;
const click2=s=>d2.querySelector(s).dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
click2('[data-go="level:C"]');
ok(/Alle Module abgeschlossen/.test(txt2()),'Pruefung freigeschaltet nach allen Modulen');
ok(/54 Fragen/.test(txt2()),'Pruefung mit 54 Fragen');

console.log('\n== Pruefungsdurchlauf (alles richtig) ==');
click2('[data-go="exam:C"]');
ok(d2.querySelector('.fb')===null,'kein Zwischenfeedback in der Pruefung');
let steps=0, order=[];
for(;;){
  const qt=d2.querySelector('.qtxt'); if(!qt) break;
  order.push(qt.textContent);
  // richtige Antwort ueber die Daten bestimmen
  const opts=[...d2.querySelectorAll('.opt span:last-child')].map(s=>s.textContent);
  const meta=qt.textContent;
  const q=findQ(w2.IFA_QUESTIONS, meta);
  const pos=opts.indexOf(ansOf(q)[q.c]);
  d2.querySelector('[data-opt="'+pos+'"]').dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
  const nx=d2.querySelector('[data-act="next"]')||d2.querySelector('[data-act="finish"]');
  const fin=nx.getAttribute('data-act')==='finish';
  nx.dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
  steps++; if(fin) break;
}
ok(steps===54,'54 Pruefungsfragen durchlaufen, ist: '+steps);
ok(/Bestanden/.test(txt2()),'100 % -> Bestanden');
ok(/100%/.test(txt2()),'Prozentwert 100 %');
ok(new Set(order).size===54,'keine Frage doppelt');

console.log('\n== Zertifikat ==');
click2('[data-go="cert:C"]');
ok(/Teilnahmebestätigung/.test(txt2()),'Zertifikat rendert');
ok(/C/.test(txt2())&&/100\s%|100%/.test(txt2()),'Zertifikat zeigt Stufe und Ergebnis');

console.log('\n== Nationale Fragen abschaltbar ==');
click2('[data-go="settings"]');
const sw=d2.getElementById('swNat'); sw.checked=false; sw.dispatchEvent(new w2.Event('change',{bubbles:true}));
click2('[data-go="home"]'); click2('[data-go="level:C"]');
ok(d2.querySelectorAll('.mod').length===15,'nationales Kapitel ausgeblendet, ist: '+d2.querySelectorAll('.mod').length);
ok(/54 Fragen/.test(txt2()),'C bleibt auch ohne nationale Fragen bei 54');

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
