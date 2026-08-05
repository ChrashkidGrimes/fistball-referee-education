/* Zusammensetzung der Abschlusspruefungen: Groesse, Verteilung auf die Pools,
   Verhalten bei zu kleinem Pool. */
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


function app(nat){
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const st={lang:'de',nat:nat,progress:{}};
  ['C','B','A'].forEach(L=>{ st.progress[L]={read:{},quiz:{},exam:null};
    for(let i=1;i<=16;i++){st.progress[L].quiz[i]=100;st.progress[L].read[i]=true;} });
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  ['i18n','data-content','data-questions','app'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  return w;
}
/* Pruefung starten und die tatsaechlich gestellten Fragen einsammeln */
function run(w,lvl){
  const d=w.document;
  const clk=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  clk('[data-go="level:'+lvl+'"]'); clk('[data-go="exam:'+lvl+'"]');
  const seen=[];
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    const q=findQ(w.IFA_QUESTIONS, qt.textContent);
    seen.push(q);
    d.querySelector('[data-opt="0"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  const by={}; seen.forEach(q=>by[q.lvl]=(by[q.lvl]||0)+1);
  return {n:seen.length, by, ids:seen.map(q=>q.id)};
}
/* Vorgabe: C 54 aus dem C-Pool (Grundmodul + C), B 36 mit Schwerpunkt B,
   A 34 mit deutlichem Schwerpunkt A. Der C-Pool wird nach Groesse aufgeteilt (41 : 63). */
const SOLL={
  C:{size:54,quota:{Q:21,C:33}},
  B:{size:36,quota:{B:22,Q:6,C:8}},
  A:{size:34,quota:{A:22,B:6,Q:2,C:4}}
};

console.log('\n== Mit nationalen Ordnungen ==');
for(const [lvl,soll] of Object.entries(SOLL)){
  const w=app(true); const r=run(w,lvl);
  const summe=Object.values(soll.quota).reduce((a,b)=>a+b,0);
  ok(summe===soll.size, lvl+': Quote summiert sich auf '+soll.size+' (ist '+summe+')');
  ok(r.n===soll.size, lvl+': '+r.n+' Fragen gestellt (erwartet '+soll.size+')');
  const ist=Object.entries(soll.quota).map(([p,v])=>p+' '+(r.by[p]||0)+'/'+v).join(', ');
  ok(Object.entries(soll.quota).every(([p,v])=>(r.by[p]||0)===v), lvl+': Verteilung '+ist);
  ok(new Set(r.ids).size===r.n, lvl+': keine Frage doppelt');
  const fremd=Object.keys(r.by).filter(p=>!(p in soll.quota));
  ok(fremd.length===0, lvl+': keine Fragen aus fremden Pools'+(fremd.length?' ('+fremd+')':''));
}

console.log('\n== Schwerpunkt liegt auf dem richtigen Pool ==');
{
  const w=app(true);
  const b=run(w,'B');
  ok(Object.entries(b.by).every(([p,v])=>p==='B'||v<b.by.B),
     'B-Pruefung: B ist der groesste Anteil ('+JSON.stringify(b.by)+')');
  ok((b.by.Q||0)+(b.by.C||0)===14,'B-Pruefung: 14 Fragen aus dem C-Pool');
  ok(!b.by.A,'B-Pruefung: keine Fragen aus dem A-Pool');
  const a=run(app(true),'A');
  ok(Object.entries(a.by).every(([p,v])=>p==='A'||v<a.by.A),'A-Pruefung: A ist der groesste Anteil ('+JSON.stringify(a.by)+')');
  ok((a.by.Q||0)+(a.by.C||0)===6,'A-Pruefung: 6 Fragen aus dem C-Pool');
  ok(a.by.A/34>0.6,'A-Pruefung: mehr als 60 % aus dem A-Pool ('+Math.round(a.by.A/34*100)+' %)');
}

console.log('\n== Zwei Laeufe ziehen unterschiedliche Fragen ==');
{
  const w=app(true);
  const r1=run(w,'C'), r2=run(w,'C');
  const gleich=r1.ids.filter(i=>r2.ids.includes(i)).length;
  ok(gleich<r1.n, 'C: Auswahl variiert ('+gleich+' von '+r1.n+' identisch)');
  ok(r1.ids.join()!==r2.ids.join(),'C: Reihenfolge unterscheidet sich');
}

console.log('\n== Ohne nationale Ordnungen ==');
for(const [lvl,soll] of Object.entries(SOLL)){
  const w=app(false); const r=run(w,lvl);
  const verfuegbar=Object.keys(soll.quota)
    .reduce((a,p)=>a+w.IFA_QUESTIONS.filter(q=>q.lvl===p&&q.scope!=='national').length,0);
  const erwartet=Math.min(soll.size,verfuegbar);
  ok(r.n===erwartet, lvl+': '+r.n+' Fragen (moeglich '+verfuegbar+', Ziel '+soll.size+')');
  ok(!r.ids.some(id=>{const q=w.IFA_QUESTIONS.find(x=>x.id===id);return q.scope==='national';}),
     lvl+': keine nationale Frage in der Pruefung');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
