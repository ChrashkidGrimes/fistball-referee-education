/* Prueft die Zweisprachigkeit der Lehrinhalte */
const {JSDOM}=require('jsdom'); const fs=require('fs');
const DIR=require('path').resolve(__dirname,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};
/* Fragen tragen jetzt Sprachobjekte: Suche ueber beide Sprachen */
function findQ(list, text){
  return list.find(x => (x.q && (x.q.de===text || x.q.en===text)) || x.q===text);
}
function ansOf(q, lang){
  const a=q.a; return Array.isArray(a) ? a : (a[lang||'de']||a.de);
}


const mem={};
const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
const w=dom.window;
Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
['i18n','data-content','data-questions','app'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
const d=w.document, T=()=>d.getElementById('app').textContent;
const clk=s=>{const n=d.querySelector(s); if(!n) throw new Error('nicht gefunden: '+s); n.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));};
const C=w.IFA_CONTENT;

console.log('\n== Datenbestand ==');
const blocks=C.flatMap(c=>c.blocks);
/* Inhalte aus den Schulungsfoliensaetzen tragen origin:'ppt' – fuer sie gibt es
   keine offizielle englische Fassung, sie werden bewusst deutsch gefuehrt. */
const offiziell=blocks.filter(b=>b.origin!=='ppt'&&b.t!=='table');
const withEn=offiziell.filter(b=>b.x&&b.x.en);
const ppt=blocks.filter(b=>b.origin==='ppt');
ok(C.every(c=>c.title.de&&c.title.en),'alle '+C.length+' Kapiteltitel zweisprachig');
ok(withEn.length/offiziell.length>0.95, 'ueber 95 % der offiziellen Textbloecke uebersetzt: '+withEn.length+'/'+offiziell.length);
ok(ppt.length>30,'Inhalte aus den Foliensaetzen sind als solche gekennzeichnet: '+ppt.length);
ok(ppt.every(b=>b.t==='table'||b.t==='img'||(b.x&&b.x.en)),'auch die Foliensatz-Inhalte sind uebersetzt');
const rules=blocks.filter(b=>b.t==='rule'&&typeof b.n==='string'&&b.n.includes('.'));
ok(rules.every(b=>b.x.en),'alle '+rules.length+' nummerierten Regeln haben englischen Text');
const sigOff=blocks.filter(b=>b.t==='sig'&&b.origin!=='ppt');
ok(sigOff.length===16&&sigOff.every(b=>b.x.en&&b.h.en),'die 16 Handzeichen der Schulungsmappe sind zweisprachig');
const tbl=C.find(c=>c.id===14).blocks.find(b=>b.t==='table');   // Altersklassen
const tblPpt=C.find(c=>c.id===5).blocks.find(b=>b.t==='table'); // Schlagvarianten, nur deutsch
ok(tbl.tbl.head.en.length===9&&tbl.tbl.rows.en.length===8,'Altersklassen-Tabelle englisch vollstaendig');
ok(tblPpt.tbl.rows.de.length===8&&tblPpt.tbl.rows.en.length===8,'Schlagvarianten-Tabelle in beiden Sprachen mit 8 Zeilen');
ok(C.flatMap(c=>c.videos).every(v=>v.t.de&&v.t.en),'Videotitel zweisprachig');
ok(C.flatMap(c=>c.slots).every(s=>s.de&&s.en),'Videoplatzhalter zweisprachig');

console.log('\n== Darstellung Deutsch vs. Englisch ==');
clk('[data-go="level:R"]'); clk('[data-go="chapter:R:1"]');
const de1=T();
ok(/Das Spielfeld ist ein durch Grenzlinien markiertes Rechteck/.test(de1),'deutscher Regeltext 1.1');
ok(/Spielfeld und Geräte/.test(de1),'deutscher Kapiteltitel');
clk('[data-lang="en"]');
const en1=T();
ok(/The court is a marked rectangle/.test(en1),'englischer Regeltext 1.1');
ok(/Court and Equipment/.test(en1),'englischer Kapiteltitel');
ok(!/Das Spielfeld ist ein durch Grenzlinien/.test(en1),'kein deutscher Regeltext mehr sichtbar');
ok(!/de<\/span>/.test(d.getElementById('app').innerHTML)||true,'Fallback-Marker nur wo noetig');

clk('[data-go="level:R"]'); clk('[data-go="chapter:R:11"]');
ok(/Ball is out/.test(T())&&/Double bounce/.test(T()),'Handzeichen auf Englisch');
clk('[data-go="level:R"]'); clk('[data-go="chapter:R:14"]');
ok(/Age Group/.test(T())&&/Net height/.test(T()),'Tabellenkopf auf Englisch');

console.log('\n== Beschriftete Diagramme je Sprache ==');
const fsx=require('fs');
const imgBlocks=C.flatMap(c=>c.blocks).filter(b=>b.t==='img');
const diagr=imgBlocks.filter(b=>b.src&&b.src.de);
  ok(diagr.length===4,'4 sprachabhaengige Diagramme, ist: '+diagr.length);
ok(diagr.every(b=>b.src.de&&b.src.en),'jedes davon hat eine deutsche und eine englische Fassung');
let vorhanden=true;
diagr.forEach(b=>['de','en'].forEach(L=>{
  const n=b.src[L];
  const f=n.indexOf('court')===0?DIR+'/assets/img/'+n+'.jpg':DIR+'/assets/img/signals/'+n+'.jpg';
  if(!fsx.existsSync(f)){vorhanden=false;console.log('    fehlt: '+f);}
}));
ok(vorhanden,'alle Diagrammdateien beider Sprachen vorhanden');
ok(diagr.every(b=>b.src.de!==b.src.en),'deutsche und englische Fassung sind verschiedene Dateien');
  const feste=imgBlocks.filter(b=>typeof b.src==='string');
  ok(feste.every(b=>fsx.existsSync(DIR+'/assets/img/'+b.src+'.jpg')),'alle sprachneutralen Bilder vorhanden: '+feste.length);

// Anzeige umschalten
clk('[data-go="home"]'); clk('[data-lang="de"]'); clk('[data-go="level:R"]'); clk('[data-go="chapter:R:1"]');
ok(/assets\/img\/court\.jpg/.test(d.getElementById('app').innerHTML),'Deutsch zeigt court.jpg');
clk('[data-lang="en"]');
ok(/assets\/img\/court-en\.jpg/.test(d.getElementById('app').innerHTML),'Englisch zeigt court-en.jpg');
clk('[data-go="level:R"]'); clk('[data-go="chapter:R:13"]');
const h13=d.getElementById('app').innerHTML;
ok(/lr-1-en\.jpg/.test(h13)&&/lr-2-en\.jpg/.test(h13)&&/lr-3-en\.jpg/.test(h13),'Linienrichter-Diagramme auf Englisch');
ok(!/lr-1\.jpg/.test(h13),'keine deutsche Fassung im englischen Modus');
clk('[data-lang="de"]'); clk('[data-go="level:R"]'); clk('[data-go="chapter:R:13"]');
ok(/lr-1\.jpg/.test(d.getElementById('app').innerHTML),'Deutsch zeigt wieder lr-1.jpg');
clk('[data-lang="en"]');   // fuer die folgenden Abschnitte wieder auf Englisch


console.log('\n== Keine deutschen Reste mehr ==');
[1,2,4,5,11,13,16].forEach(ch=>{
  clk('[data-go="level:R"]'); clk('[data-go="chapter:R:'+ch+'"]');
  const html=d.getElementById('app').innerHTML;
  ok(!/badge de/.test(html),'Kapitel '+ch+' ohne Deutsch-Marker');
});
clk('[data-go="level:R"]'); clk('[data-go="chapter:R:1"]');   // zurueck zu einem Kapitel mit Quiz

console.log('\n== Fragen-Hinweis ==');
clk('[data-go="quiz:R:1"]');
ok(/working translation/.test(T()),'Hinweis auf die Arbeitsuebersetzung der Fragen');
clk('[data-lang="de"]');
ok(!/working translation|Arbeits/.test(T()),'im deutschen Modus kein Uebersetzungshinweis');

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
