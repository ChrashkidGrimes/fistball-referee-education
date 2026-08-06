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


function run(lvl, targetCorrectRatio){
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const st={lang:'de',nat:true,progress:{}};
  st.progress[lvl]={read:{},quiz:{},exam:null};
  for(let i=1;i<=16;i++){ st.progress[lvl].quiz[i]=100; st.progress[lvl].read[i]=true; }
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  ['i18n','data-content','data-questions','app'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  const d=w.document, T=()=>d.getElementById('app').textContent;
  const clk=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  clk('[data-go="level:'+lvl+'"]'); clk('[data-go="exam:'+lvl+'"]');
  let i=0, total=null, correct=0;
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    if(total===null){ const m=T().match(/von (\d+)/); total=parseInt(m[1],10); }
    const opts=[...d.querySelectorAll('.opt span:last-child')].map(s=>s.textContent);
    const q=findQ(w.IFA_QUESTIONS, qt.textContent);
    const right=opts.indexOf(ansOf(q)[q.c]);
    const wantRight = correct < Math.round(total*targetCorrectRatio);
    const pick = wantRight ? right : (right===0?1:0);
    if(wantRight) correct++;
    d.querySelector('[data-opt="'+pick+'"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    i++; if(fin) break;
  }
  const txt=T();
  const status = /Bestanden/.test(txt)&&!/Nicht bestanden/.test(txt) ? 'bestanden'
               : /Nachprüfung möglich/.test(txt) ? 'nachpruefung' : 'nicht bestanden';
  const pctv = correct/total*100;
  return {status, pctv:Math.round(pctv*10)/10, total, correct, hasCert:/Zertifikat anzeigen/.test(txt)};
}

/* Regional: bestanden ab 70 %, Nachpruefung ab 65 %.
   National: bestanden ab 85 %, Nachpruefung ab 75 %.
   Je Stufe ein Wert unterhalb, einer im Nachpruefungsband, einer darueber. */
console.log('\n== Grenzwerte Abschlusspruefung ==');
[['R',0.60,'nicht bestanden'],['R',0.67,'nachpruefung'],['R',0.72,'bestanden'],
 ['N',0.70,'nicht bestanden'],['N',0.80,'nachpruefung'],['N',0.90,'bestanden']
].forEach(([lvl,r,exp])=>{
  const res=run(lvl,r);
  ok(res.status===exp, lvl+': '+res.correct+'/'+res.total+' = '+res.pctv+'% -> '+res.status+' (erwartet '+exp+')');
  if(exp==='bestanden') ok(res.hasCert, '  '+lvl+': Zertifikat angeboten');
  if(exp!=='bestanden') ok(!res.hasCert, '  '+lvl+': kein Zertifikat bei '+exp);
});

/* Genau auf der Grenze muss bestanden herauskommen, nicht knapp darunter.
   Regional: 28 von 40 sind exakt 70 %. National: 51 von 60 sind exakt 85 %. */
console.log('\n== Genau auf der Grenze ==');
[['R',28/40,'bestanden'],['N',51/60,'bestanden'],
 ['R',26/40,'nachpruefung'],['N',45/60,'nachpruefung']
].forEach(([lvl,r,exp])=>{
  const res=run(lvl,r);
  ok(res.status===exp, lvl+': '+res.correct+'/'+res.total+' = '+res.pctv+'% -> '+res.status+' (erwartet '+exp+')');
});
console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
