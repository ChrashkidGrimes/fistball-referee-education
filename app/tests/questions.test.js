/* Herkunft der Fragen, Fundstellen, Bild- und Videofragen sowie der
   Entwurfsmechanismus. */
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


function app(opts){
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const st=Object.assign({lang:'de',nat:true,draft:true,progress:{}},opts||{});
  ['C','B','A'].forEach(L=>{ st.progress[L]={read:{},quiz:{},exam:null};
    for(let i=1;i<=16;i++){st.progress[L].quiz[i]=100;st.progress[L].read[i]=true;} });
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  ['i18n','data-content','data-questions','data-clips','app'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  return w;
}

console.log('\n== Herkunft der Fragen ==');
{
  const w=app(); const Q=w.IFA_QUESTIONS;
  const HERKUNFT=['fbd','ifa','ppt','draft'];
  ok(Q.every(q=>HERKUNFT.includes(q.origin)),'jede Frage hat eine bekannte Herkunft');
  const z={}; Q.forEach(q=>z[q.origin]=(z[q.origin]||0)+1);
  ok(z.fbd===121,'121 Fragen aus dem Katalog von Faustball Deutschland unveraendert, ist: '+z.fbd);
  ok(z.ifa===69,'69 Fragen aus Spielregeln und Schulungsmappe, ist: '+z.ifa);
  ok(z.ppt===6,'6 Bildfragen aus den Foliensaetzen, ist: '+z.ppt);
  ok(z.draft===39,'39 Entwuerfe zu den Kapiteln 8, 11-13 und 16, ist: '+z.draft);

  /* Die Entwuerfe schliessen die Luecke im Pool Spielleitung. */
  const ent=Q.filter(q=>q.origin==='draft');
  ok(ent.every(q=>[8,11,12,13,16].includes(q.ch)),'Entwuerfe liegen in den vorgesehenen Kapiteln');
  ok(ent.every(q=>q.tr===true),'Entwuerfe sind als Arbeitsuebersetzung markiert');
  ok(ent.every(q=>q.ref&&q.ref.de&&q.ref.de.length>8&&q.ref.en),'jeder Entwurf nennt eine Fundstelle');
  ok(ent.every(q=>ansOf(q,'de').length===4&&ansOf(q,'en').length===4),'je vier Antworten in beiden Sprachen');
  ok(ent.every(q=>new Set(ansOf(q,'de')).size===4),'keine doppelte Antwort innerhalb eines Entwurfs');
  [11,12,13,16].forEach(ch=>ok(Q.some(q=>q.ch===ch),'Kapitel '+ch+' hat mindestens eine Frage'));

  const neu=Q.filter(q=>q.origin==='ifa'||q.origin==='ppt');
  ok(neu.every(q=>q.lvl==='A'||q.lvl==='C'),'die ergaenzten Fragen liegen auf A oder C');
  ok(neu.every(q=>q.scope==='ifa'),'keine davon ist als national markiert');
  ok(neu.every(q=>ansOf(q,'de').length===4&&ansOf(q,'en').length===4),'je vier Antworten in beiden Sprachen');
  ok(neu.every(q=>q.c>=0&&q.c<4),'gueltiger Loesungsindex');
  ok(neu.every(q=>q.ref&&q.ref.de&&q.ref.de.length>8&&q.ref.en),'jede nennt eine Fundstelle in beiden Sprachen');
  const ids=Q.map(q=>q.id);
  ok(new Set(ids).size===ids.length,'keine doppelte Kennung');
  const texte=Q.map(q=>q.q.de);
  ok(new Set(texte).size===texte.length,'kein doppelter Fragetext');
  ok(neu.every(q=>new Set(ansOf(q,'de')).size===4&&new Set(ansOf(q,'en')).size===4),
     'keine doppelte Antwortmoeglichkeit innerhalb einer Frage');
  const text=neu.filter(q=>!q.shot);
  ok(text.every(q=>q.id.startsWith('IFA-'+q.lvl+'-')),'Kennung der Textfragen passt zur Stufe');
  ok(neu.filter(q=>q.shot).every(q=>q.id.startsWith('IFA-BILD-')),'Bildfragen tragen die Kennung IFA-BILD');

  /* Fundstellen muessen im Lehrinhalt auflösbar sein */
  const rules=new Set();
  w.IFA_CONTENT.forEach(c=>c.blocks.forEach(b=>{ if(b.t==='rule'&&typeof b.n==='string') rules.add(b.n); }));
  const offen=neu.filter(q=>{
    const nums=(q.ref.de.match(/\d+(?:\.\d+)+/g)||[]);
    return !nums.some(n=>rules.has(n));
  });
  ok(offen.length===0,'alle Fundstellen verweisen auf eine vorhandene Regel'+
     (offen.length?' ('+offen.map(q=>q.id).join(',')+')':''));
}

console.log('\n== Abschaltbarkeit ==');
{
  const an=app({draft:true}), aus=app({draft:false});
  const nAn=an.IFA_QUESTIONS.filter(q=>q.lvl==='A').length;
  const nCn=an.IFA_QUESTIONS.filter(q=>q.lvl==='C').length;
  ok(nAn>50,'A-Pool mit Entwürfen deutlich vergrößert: '+nAn);
  ok(nCn>50,'C-Pool mit Entwürfen deutlich vergrößert: '+nCn);
  const d=aus.document, T=()=>d.getElementById('app').textContent;
  const clk=s=>d.querySelector(s).dispatchEvent(new aus.window.MouseEvent?new aus.MouseEvent('click',{bubbles:true}):null);
  const click=s=>d.querySelector(s).dispatchEvent(new aus.MouseEvent('click',{bubbles:true}));
  click('[data-go="level:A"]');
  ok(/34 Fragen/.test(T()),'A-Prüfung bleibt auch ohne Entwürfe bei 34 Fragen');
  /* Prüfung durchlaufen und prüfen, dass keine Entwurfsfrage auftaucht */
  click('[data-go="exam:A"]');
  let seen=[];
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    seen.push(findQ(aus.IFA_QUESTIONS, qt.textContent));
    d.querySelector('[data-opt="0"]').dispatchEvent(new aus.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new aus.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  ok(seen.length===34,'34 Fragen gestellt, ist: '+seen.length);
  ok(seen.every(q=>q&&q.origin!=='draft'),'keine Entwurfsfrage bei abgeschaltetem Schalter');
}

console.log('\n== Entwurfsmechanismus ==');
{
  /* Der Katalog enthält derzeit keine Entwürfe. Der Mechanismus muss trotzdem
     funktionieren, sobald wieder welche dazukommen – daher eine eingeschleuste
     Testfrage. */
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  const st={lang:'de',nat:true,draft:true,progress:{A:{read:{},quiz:{},exam:null}}};
  for(let i=1;i<=16;i++){st.progress.A.quiz[i]=100;st.progress.A.read[i]=true;}
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  ['i18n','data-content','data-questions','data-clips'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  w.eval("window.IFA_QUESTIONS.push({id:'TEST-DRAFT-1',lvl:'A',ch:7,scope:'ifa',origin:'draft',tr:true,"
        +"q:{de:'Testfrage Entwurf',en:'Test draft question'},"
        +"a:{de:['A','B','C','D'],en:['A','B','C','D']},c:0,ref:{de:'Spielregeln 7.1',en:'Rules 7.1'}});");
  w.eval(fs.readFileSync(DIR+'/assets/js/app.js','utf8'));
  const d=w.document;
  const click=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));

  click('[data-go="settings"]');
  ok(d.getElementById('swDraft')!==null,'Schalter erscheint, sobald Entwuerfe vorhanden sind');
  ok(/Entwurfsfragen einbeziehen/.test(d.getElementById('app').textContent),'Beschriftung des Schalters');

  const durchlauf=()=>{
    click('[data-go="home"]'); click('[data-go="level:A"]');
    click('[data-go="chapter:A:7"]'); click('[data-go="quiz:A:7"]');
    let gesehen=false, badge=false;
    for(;;){
      const qt=d.querySelector('.qtxt'); if(!qt) break;
      if(qt.textContent==='Testfrage Entwurf'){ gesehen=true;
        if(/badge draft/.test(d.getElementById('app').innerHTML)) badge=true; }
      d.querySelector('[data-opt="0"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
      const ck=d.querySelector('[data-act="check"]');
      if(ck) ck.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
      const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
      const fin=nx.getAttribute('data-act')==='finish';
      nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
      if(fin) break;
    }
    return {gesehen,badge};
  };
  const an=durchlauf();
  ok(an.gesehen,'Entwurfsfrage erscheint im Kapitelquiz');
  ok(an.badge,'Entwurfsfrage ist als Entwurf gekennzeichnet');

  click('[data-go="settings"]');
  const sw=d.getElementById('swDraft'); sw.checked=false;
  sw.dispatchEvent(new w.Event('change',{bubbles:true}));
  ok(!durchlauf().gesehen,'abgeschaltet verschwindet die Entwurfsfrage');
}

console.log('\n== Einstellungen ohne Entwuerfe ==');
{
  /* Entwuerfe vor dem Start aus dem Katalog nehmen – der Schalter muss sich dann
     ausblenden. Nach der Abnahme durch die Schiedsrichter-Kommission ist das der
     Normalfall. app.js kopiert den Katalog beim Laden, deshalb muss das Entfernen
     davor geschehen. */
  const mem={};
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w=dom.window;
  Object.defineProperty(w,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w.confirm=()=>true; w.scrollTo=()=>{}; w.print=()=>{};
  mem['ifa-referee-education-v1']=JSON.stringify({lang:'de',nat:true,draft:true,progress:{}});
  ['i18n','data-content','data-questions','data-clips'].forEach(f=>w.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  w.eval("window.IFA_QUESTIONS=window.IFA_QUESTIONS.filter(function(q){return q.origin!=='draft';});");
  w.eval(fs.readFileSync(DIR+'/assets/js/app.js','utf8'));
  const d=w.document;
  const click=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  ok(!w.IFA_QUESTIONS.some(q=>q.origin==='draft'),'Katalog fuer diesen Fall ohne Entwuerfe');
  click('[data-go="settings"]');
  ok(d.getElementById('swDraft')===null,'ohne Entwuerfe wird der Schalter ausgeblendet');
  ok(d.getElementById('swNat')!==null,'der Schalter fuer nationale Ordnungen bleibt');
}

console.log('\n== Bildfragen ==');
{
  const w=app(); const fs3=require('fs');
  const shots=w.IFA_QUESTIONS.filter(q=>q.shot);
  ok(shots.every(q=>fs3.existsSync(DIR+'/assets/img/'+q.shot+'.jpg')),'alle Bilddateien vorhanden');
  ok(new Set(shots.map(q=>q.shot)).size===shots.length,'jede Bildfrage nutzt ein eigenes Foto');
  ok(new Set(shots.map(q=>q.q.de)).size===shots.length,'jede Bildfrage hat einen eigenen Wortlaut');
  ok(shots.every(q=>q.id.startsWith('IFA-BILD-')),'alle Bildfragen tragen die Kennung IFA-BILD');

  /* Zwei Serien: Ausball-Entscheidungen aus den Folien, Handzeichen aus der Schulungsmappe. */
  const sig=shots.filter(q=>q.shot.startsWith('signals/'));
  ok(sig.length===13,'dreizehn Bildfragen zu den Handzeichen, ist: '+sig.length);
  ok(sig.every(q=>q.ch===11),'Handzeichenfragen liegen in Kapitel 11');
  ok(new Set(sig.map(q=>ansOf(q)[q.c])).size===sig.length,'jedes Handzeichen hat eine eigene Loesung');
  /* Drei Fotos sind schwach: sig-09 zeigt die Haende auf Brusthoehe statt ueber dem
     Kopf, sig-03 und sig-04 unterscheiden sich nur in der Armrichtung. Die Fragen
     nennen die Armhaltung deshalb im Text und die Fundstelle grenzt gegen das
     verwechselbare Zeichen ab. Faellt das weg, wird die Frage unfair. */
  const heikel=sig.filter(q=>/sig-(03|04|09)/.test(q.shot));
  ok(heikel.length===3,'die drei schwachen Fotos sind abgedeckt, ist: '+heikel.length);
  ok(heikel.every(q=>q.q.de.length>60),'ihre Fragetexte beschreiben die Armhaltung');
  ok(heikel.every(q=>/Zeichen \d|Beschreibung/.test(q.ref.de)),
     'ihre Fundstellen grenzen gegen das verwechselbare Zeichen ab');

  shots.length=0; shots.push(...w.IFA_QUESTIONS.filter(q=>q.shot&&q.shot.startsWith('ppt/ball-')));
  ok(shots.length===6,'sechs Bildfragen zur Ausball-Entscheidung, ist: '+shots.length);
  ok(shots.every(q=>q.origin==='ppt'),'Ausballfragen tragen die Herkunft der Foliensaetze');
  const gut=shots.filter(q=>ansOf(q)[q.c].startsWith('Gutball')).length;
  ok(gut===4,'vier Gutball- und zwei Fehlerfaelle, Gutball ist: '+gut);
  /* Die Begruendung muss zum Foto passen – Bild 1 zeigt den Ball im Feld,
     nicht auf der Linie. Frueher trugen alle sechs dieselbe Loesung. */
  const b1=shots.find(q=>q.shot==='ppt/ball-01');
  ok(/im Feld/.test(ansOf(b1)[b1.c]),'Bild 1: Loesung begruendet mit der Lage im Feld');
  ok(!/berührt die Linie/.test(ansOf(b1)[b1.c]),'Bild 1: nicht mit Linienkontakt begruendet');
  const loesungen=shots.map(q=>ansOf(q)[q.c]);
  ok(new Set(loesungen).size>=4,'die Bildfragen haben unterschiedliche Begruendungen: '+new Set(loesungen).size);
  /* Anzeige im Kapitelquiz pruefen */
  const d=w.document;
  const click=s=>d.querySelector(s).dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  click('[data-go="level:C"]'); click('[data-go="chapter:C:1"]'); click('[data-go="quiz:C:1"]');
  let gesehen=false;
  for(;;){
    const qt=d.querySelector('.qtxt'); if(!qt) break;
    const img=d.querySelector('.qshot img');
    if(img && /ppt\/ball-/.test(img.getAttribute('src'))) gesehen=true;
    d.querySelector('[data-opt="0"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const ck=d.querySelector('[data-act="check"]');
    if(ck) ck.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nx=d.querySelector('[data-act="next"]')||d.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  ok(gesehen,'Bildfrage zeigt das Foto im Quiz');
}

console.log('\n== Videofragen ==');
{
  const w=app();
  const vorlagen=w.IFA_CLIPS||[];
  ok(vorlagen.length>0,'Vorlagen in data-clips.js vorhanden: '+vorlagen.length);
  ok(vorlagen.every(c=>c.clip&&'yt' in c.clip&&'start' in c.clip&&'end' in c.clip),
     'jede Vorlage hat yt, start und end');
  ok(vorlagen.every(c=>c.a.length===4&&c.c>=0&&c.c<4&&c.ref),'Vorlagen vollständig ausgefüllt bis auf die Zeitmarken');
  const leer=vorlagen.filter(c=>!c.clip.yt);
  ok(!w.IFA_QUESTIONS.some(q=>leer.some(l=>l.id===q.id)),
     'Vorlagen ohne Video-ID gelangen nicht in den Fragenpool');

  /* Mit ausgefüllter Video-ID muss der Ausschnitt erscheinen */
  const dom=new JSDOM(fs.readFileSync(DIR+'/index.html','utf8'),{runScripts:'outside-only',url:'https://x/'});
  const w2=dom.window; const mem={};
  Object.defineProperty(w2,'localStorage',{value:{getItem:k=>mem[k]??null,setItem:(k,v)=>mem[k]=v,removeItem:k=>delete mem[k]}});
  w2.confirm=()=>true; w2.scrollTo=()=>{}; w2.print=()=>{};
  const st={lang:'de',nat:true,draft:true,progress:{A:{read:{},quiz:{},exam:null}}};
  for(let i=1;i<=16;i++){st.progress.A.quiz[i]=100;st.progress.A.read[i]=true;}
  mem['ifa-referee-education-v1']=JSON.stringify(st);
  ['i18n','data-content','data-questions','data-clips'].forEach(f=>w2.eval(fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8')));
  w2.eval('window.IFA_CLIPS[0].clip.yt="q342pxvhdTU";window.IFA_CLIPS[0].clip.start=10;window.IFA_CLIPS[0].clip.end=20;');
  w2.eval(fs.readFileSync(DIR+'/assets/js/app.js','utf8'));
  const d2=w2.document;
  const click2=s=>d2.querySelector(s).dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
  /* Kapitelquiz statt Prüfung: dort erscheinen ALLE Fragen des Kapitels,
     die Prüfung zieht dagegen eine Stichprobe – das machte den Test zufällig. */
  click2('[data-go="level:A"]'); click2('[data-go="chapter:A:7"]'); click2('[data-go="quiz:A:7"]');
  let clipGesehen=false;
  for(;;){
    const qt=d2.querySelector('.qtxt'); if(!qt) break;
    if(d2.querySelector('.qclip iframe')){
      const src=d2.querySelector('.qclip iframe').getAttribute('src');
      if(/q342pxvhdTU/.test(src)&&/start=10/.test(src)&&/end=20/.test(src)) clipGesehen=true;
    }
    d2.querySelector('[data-opt="0"]').dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
    const ck=d2.querySelector('[data-act="check"]');
    if(ck) ck.dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
    const nx=d2.querySelector('[data-act="next"]')||d2.querySelector('[data-act="finish"]');
    const fin=nx.getAttribute('data-act')==='finish';
    nx.dispatchEvent(new w2.MouseEvent('click',{bubbles:true}));
    if(fin) break;
  }
  ok(clipGesehen,'ausgefüllte Videofrage zeigt den Ausschnitt mit Start- und Endzeit');
}

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
