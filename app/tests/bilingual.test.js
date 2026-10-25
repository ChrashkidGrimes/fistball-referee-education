/* Vollstaendigkeit beider Sprachen: kein deutscher Rest in der englischen Fassung. */
const {JSDOM}=require('jsdom'); const fs=require('fs');
const DIR=require('path').resolve(__dirname,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};

const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
const w=dom.window; const mem={};
Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
['i18n','data-content','data-questions','data-clips'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
const C=w.IFA_CONTENT, Q=w.IFA_QUESTIONS, CL=w.IFA_CLIPS, I=w.IFA_I18N;

/* Woerter, die in einem englischen Text nichts zu suchen haben */
const DE_MARKER=/\b(der|die|das|und|nicht|wird|werden|Mannschaft|Schiedsrichter|Spieler|Angabe|Gutball|Fehler|Spielfeld|Leine)\b/;
const UMLAUT=/[äöüßÄÖÜ]/;
/* Eigennamen und Kuerzel, die auch im Englischen deutsch bleiben */
const ERLAUBT=/SpOF|SRO|Faustball Deutschland|Bundesliga|IFA|faustball\.de|Landesliga|Spielordnung/;

console.log('\n== Lehrinhalte ==');
{
  const B=C.flatMap(c=>c.blocks);
  ok(C.every(c=>c.title.de&&c.title.en),'alle '+C.length+' Kapiteltitel zweisprachig');
  const txt=B.filter(b=>b.t!=='table');
  ok(txt.every(b=>b.x&&b.x.de&&b.x.en),'alle '+txt.length+' Textbloecke zweisprachig');
  const mitH=B.filter(b=>b.h);
  ok(mitH.every(b=>b.h.de&&b.h.en),'alle '+mitH.length+' Ueberschriften zweisprachig');
  const tab=B.filter(b=>b.t==='table');
  ok(tab.every(b=>b.tbl.head.en&&b.tbl.rows.en&&b.tbl.rows.de.length===b.tbl.rows.en.length),
     'alle '+tab.length+' Tabellen zweisprachig mit gleicher Zeilenzahl');
  const caps=B.filter(b=>b.caps);
  ok(caps.every(b=>b.caps.en&&b.caps.de.length===b.caps.en.length),'Bildbeschriftungen zweisprachig');
  const reste=txt.filter(b=>UMLAUT.test(b.x.en)&&!ERLAUBT.test(b.x.en));
  ok(reste.length===0,'keine deutschen Umlaute im englischen Lehrtext'+
     (reste.length?' ('+reste.length+', z.B. '+reste[0].x.en.slice(0,60)+')':''));
}

console.log('\n== Pruefungsfragen ==');
{
  ok(Q.every(q=>q.q&&q.q.de&&q.q.en),'alle '+Q.length+' Fragetexte zweisprachig');
  ok(Q.every(q=>q.a&&q.a.de&&q.a.en),'alle Antwortlisten zweisprachig');
  ok(Q.every(q=>q.a.de.length===4&&q.a.en.length===4),'je vier Antworten in beiden Sprachen');
  ok(Q.every(q=>!q.ref||(q.ref.de&&q.ref.en)),'alle Fundstellen zweisprachig');
  ok(Q.every(q=>q.c>=0&&q.c<4),'Loesungsindex gueltig');
  const deQ=Q.filter(q=>UMLAUT.test(q.q.en)&&!ERLAUBT.test(q.q.en));
  ok(deQ.length===0,'keine deutschen Umlaute in englischen Fragetexten'+
     (deQ.length?' ('+deQ.length+', z.B. '+deQ[0].id+': '+deQ[0].q.en.slice(0,60)+')':''));
  const deA=Q.filter(q=>q.a.en.some(a=>UMLAUT.test(a)&&!ERLAUBT.test(a)));
  ok(deA.length===0,'keine deutschen Umlaute in englischen Antworten'+
     (deA.length?' ('+deA.length+', z.B. '+deA[0].id+')':''));
  const gleich=Q.filter(q=>q.q.de===q.q.en);
  ok(gleich.length===0,'kein Fragetext in beiden Sprachen identisch'+
     (gleich.length?' ('+gleich.length+', z.B. '+gleich[0].id+')':''));
  ok(Q.every(q=>q.tr===true),'englische Fassung durchgaengig als Arbeitsuebersetzung markiert');
}

console.log('\n== Videofragen-Vorlagen ==');
ok(CL.every(c=>c.q&&c.a&&c.a.length===4),'Vorlagen unveraendert nutzbar');

console.log('\n== Oberflaeche ==');
{
  const de=Object.keys(I.de), en=Object.keys(I.en);
  ok(de.filter(k=>!en.includes(k)).length===0,'keine Oberflaechentexte ohne englische Fassung');
  ok(en.filter(k=>!de.includes(k)).length===0,'keine englischen Schluessel ohne deutsches Gegenstueck');
  const leer=de.filter(k=>!I.en[k]);
  ok(leer.length===0,'keine leeren englischen Werte');
  /* Werte, die im englischen Block noch woertlich deutsch stehen */
  const GLEICH=['_name','appSub','certKicker','videos'];
  const kopiert=de.filter(k=>!GLEICH.includes(k)
                             &&I.en[k]===I.de[k]&&/[a-z]{4}/.test(I.de[k]));
  ok(kopiert.length===0,'kein Oberflaechentext unuebersetzt aus dem deutschen Block kopiert'+
     (kopiert.length?' ('+kopiert.join(', ')+')':''));
  const umlaut=de.filter(k=>UMLAUT.test(I.en[k]));
  ok(umlaut.length===0,'keine Umlaute in englischen Oberflaechentexten'+
     (umlaut.length?' ('+umlaut.join(', ')+')':''));
}

console.log('\n== Anzeige im Browser-DOM ==');
{
  w.eval(fs.readFileSync(DIR+'/assets/js/app.js','utf8'));
  const d=w.document;
  const clk=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  clk('[data-lang="en"]');
  let deutsch=[];
  for(const ch of C.map(c=>c.id)){
    clk('[data-go="home"]'); clk('[data-go="level:R"]');
    const sel=d.querySelector('[data-go="chapter:R:'+ch+'"]'); if(!sel) continue;
    sel.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const t=d.getElementById('app').textContent;
    if(UMLAUT.test(t.replace(ERLAUBT,''))){
      const m=t.match(/[^.!?]*[äöüßÄÖÜ][^.!?]*/);
      if(m && !ERLAUBT.test(m[0])) deutsch.push('K'+ch+': '+m[0].trim().slice(0,70));
    }
  }
  ok(deutsch.length===0,'kein Kapitel zeigt auf Englisch deutschen Text'+
     (deutsch.length?'\n      '+deutsch.slice(0,4).join('\n      '):''));

  /* Quiz und Auswertung ebenfalls pruefen */
  clk('[data-go="home"]'); clk('[data-go="level:R"]'); clk('[data-go="chapter:R:1"]');
  clk('[data-go="quiz:R:1"]');
  let quizDe=[];
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    const t=d.getElementById('app').textContent;
    const m=t.match(/[^.!?|]*[äöüßÄÖÜ][^.!?|]*/);
    if(m && !ERLAUBT.test(m[0])) quizDe.push(m[0].trim().slice(0,70));
    d.querySelector('[data-opt="0"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const ck=d.querySelector('[data-act="check"]');
    if(ck) ck.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  ok(quizDe.length===0,'kein deutscher Text im englischen Quiz'+
     (quizDe.length?'\n      '+quizDe.slice(0,4).join('\n      '):''));
  const res=d.getElementById('app').textContent;
  const mr=res.match(/[^.!?|]*[äöüßÄÖÜ][^.!?|]*/);
  ok(!(mr&&!ERLAUBT.test(mr[0])),'kein deutscher Text in der englischen Auswertung'+
     (mr?' ('+mr[0].trim().slice(0,70)+')':''));
}

console.log('\n== Bewusste Abweichung vom offiziellen Englisch ==');
{
  /* Die englische Ausgabe 2025 verlangt in 6.3 und 6.3.2 die erste Bodenberuehrung
     "behind the service line" – eine Fehluebersetzung des deutschen "vor der
     Angabelinie". Die IFA korrigiert das; die App verwendet schon "in front of". */
  const en=C.find(c=>c.id===6).blocks.map(b=>b.x&&b.x.en||'').join(' ');
  ok(!/ground[ -]contact[^.]*behind the service line/i.test(en.replace(/one foot in front of the service line – the other behind/g,'')),
     'Kapitel 6 englisch: erste Bodenberuehrung "in front of the service line"');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
