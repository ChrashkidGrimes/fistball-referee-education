/* Zusammensetzung der Abschlusspruefungen: Groesse, Verteilung auf die
   Themenpools, Verhalten bei abgeschalteten Verbandsordnungen. */
const {JSDOM}=require('jsdom'); const fs=require('fs');
const DIR=require('path').resolve(__dirname,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};
/* Fragen tragen Sprachobjekte: Suche ueber beide Sprachen */
function findQ(list, text){
  return list.find(x => (x.q && (x.q.de===text || x.q.en===text)) || x.q===text);
}

/* Der Themenpool ergibt sich aus dem Kapitel – dieselbe Tabelle wie in app.js.
   Sie hier zu wiederholen ist Absicht: weicht app.js ab, faellt es auf. */
const POOLS={
  feld:[1], rahmen:[2,3,14], spiel:[4,5,6], ballfuehrung:[7,8],
  leitung:[9,10,11,12,13,16], verband:[15]
};
const poolOf=q=>Object.keys(POOLS).find(p=>POOLS[p].includes(q.ch));

function app(nat){
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const st={lang:'de',nat:nat,progress:{}};
  ['R','N'].forEach(L=>{ st.progress[L]={read:{},quiz:{},exam:null,name:'Test'};
    for(let i=1;i<=16;i++){st.progress[L].quiz[i]=100;st.progress[L].read[i]=true;} });
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  /* Jeder Blick auf die Uhr liegt 25 Stunden spaeter – die Wartezeit nach
     einem nicht bestandenen Versuch spielt fuer diese Tests keine Rolle. */
  let clock=Date.now(); w.__clock=()=>(clock+=25*3600e3);
  w.eval('Date.now=function(){return window.__clock();};');
  ['i18n','data-content','data-questions','app'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  return w;
}
/* Pruefung starten und die tatsaechlich gestellten Fragen einsammeln */
function run(w,lvl){
  const d=w.document;
  const clk=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  clk('[data-go="home"]'); clk('[data-go="level:'+lvl+'"]'); clk('[data-go="exam:'+lvl+'"]');
  const seen=[];
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    seen.push(findQ(w.IFA_QUESTIONS, qt.textContent));
    d.querySelector('[data-opt="0"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  const by={}; seen.forEach(q=>{const p=poolOf(q); by[p]=(by[p]||0)+1;});
  return {n:seen.length, by, ids:seen.map(q=>q.id), seen};
}

/* Vorgabe: Regional 40 Fragen, National 60. Beide ziehen aus allen sechs
   Themenpools; die Quoten folgen nicht den Poolgroessen, sondern gewichten
   die Spielleitung hoch und das Kapitel Spielfeld herunter. */
const SOLL={
  R:{size:40,quota:{feld:7, rahmen:7, spiel:8, ballfuehrung:7, leitung:7, verband:4}},
  N:{size:60,quota:{feld:10,rahmen:10,spiel:12,ballfuehrung:10,leitung:12,verband:6}}
};

console.log('\n== Mit Verbandsordnungen ==');
for(const [lvl,soll] of Object.entries(SOLL)){
  const w=app(true); const r=run(w,lvl);
  const summe=Object.values(soll.quota).reduce((a,b)=>a+b,0);
  ok(summe===soll.size, lvl+': Quote summiert sich auf '+soll.size+' (ist '+summe+')');
  ok(r.n===soll.size, lvl+': '+r.n+' Fragen gestellt (erwartet '+soll.size+')');
  const ist=Object.entries(soll.quota).map(([p,v])=>p+' '+(r.by[p]||0)+'/'+v).join(', ');
  ok(Object.entries(soll.quota).every(([p,v])=>(r.by[p]||0)===v), lvl+': Verteilung '+ist);
  ok(new Set(r.ids).size===r.n, lvl+': keine Frage doppelt');
  ok(Object.keys(r.by).every(p=>p in soll.quota), lvl+': keine Frage ausserhalb der Themenpools');
}

console.log('\n== Beide Stufen ziehen aus allen Pools ==');
{
  const w=app(true);
  ['R','N'].forEach(lvl=>{
    const r=run(w,lvl);
    ok(Object.keys(POOLS).every(p=>(r.by[p]||0)>0), lvl+': jeder Themenpool ist vertreten');
  });
}

console.log('\n== Gewichtung ==');
{
  const n=run(app(true),'N');
  /* Der Pool Spielleitung soll ein Fuenftel der Nationalpruefung tragen. */
  ok(n.by.leitung/60>=0.2,'National: mindestens 20 % Spielleitung ('+Math.round(n.by.leitung/60*100)+' %)');
  /* Kapitel 1 stellt rund ein Fuenftel des Katalogs, aber weniger der Pruefung. */
  const w=app(true);
  const anteilKatalog=w.IFA_QUESTIONS.filter(q=>q.ch===1).length/w.IFA_QUESTIONS.length;
  ok(n.by.feld/60 < anteilKatalog,
     'National: Spielfeld ist gegenueber dem Katalog untergewichtet ('+
     Math.round(n.by.feld/60*100)+' % gegen '+Math.round(anteilKatalog*100)+' %)');
  ok(n.n>run(app(true),'R').n,'National stellt mehr Fragen als Regional');
}

console.log('\n== Zwei Laeufe ziehen unterschiedliche Fragen ==');
{
  const w=app(true);
  const r1=run(w,'R'), r2=run(w,'R');
  const gleich=r1.ids.filter(i=>r2.ids.includes(i)).length;
  ok(gleich<r1.n, 'Regional: Auswahl variiert ('+gleich+' von '+r1.n+' identisch)');
  ok(r1.ids.join()!==r2.ids.join(),'Regional: Reihenfolge unterscheidet sich');
}

console.log('\n== Ohne Verbandsordnungen ==');
for(const [lvl,soll] of Object.entries(SOLL)){
  const w=app(false); const r=run(w,lvl);
  /* Der Pool verband faellt weg. Die Fragenzahl muss trotzdem stehen –
     die uebrigen Pools fuellen auf. */
  ok(r.n===soll.size, lvl+': weiterhin '+soll.size+' Fragen, ist: '+r.n);
  ok(!r.by.verband, lvl+': keine Frage aus den Verbandsordnungen');
  ok(!r.seen.some(q=>q.scope==='fed'), lvl+': keine als fed markierte Frage');
  ok(new Set(r.ids).size===r.n, lvl+': keine Frage doppelt');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
