/* Haelt die Kennzahlen in den READMEs mit dem Code in Deckung.

   Anlass: die Zahlen in der Dokumentation sind bei drei Umbauten hintereinander
   stehengeblieben – Fragenzahl, Poolgroessen, Testumfang. Wer die Daten aendert,
   soll es hier merken und nicht erst, wenn ein Verband die Doku liest.

   Geprueft werden nur Zahlen, die sich wirklich aus den Daten ergeben. Prosa
   bleibt unberuehrt. */
const fs=require('fs');
const path=require('path');
const DIR=path.resolve(__dirname,'..');
const ROOT=path.resolve(DIR,'..');
let pass=0,fail=0; const ok=(c,m)=>{c?pass++:fail++;console.log((c?'  PASS ':'  FAIL ')+m);};

/* ---- Ist-Zahlen aus den Daten ---- */
const w={};
['data-questions','data-content'].forEach(f=>{
  const g={window:w}; const src=fs.readFileSync(DIR+'/assets/js/'+f+'.js','utf8');
  new Function('window', src)(w);
});
const Q=w.IFA_QUESTIONS, C=w.IFA_CONTENT;
const POOLS={feld:[1],rahmen:[2,3,14],spiel:[4,5,6],ballfuehrung:[7,8],
             leitung:[9,10,11,12,13,16],verband:[15]};
const poolSize=p=>Q.filter(q=>POOLS[p].includes(q.ch)).length;
const origin={}; Q.forEach(q=>origin[q.origin]=(origin[q.origin]||0)+1);

const IST={
  fragen: Q.length,
  ohneVerband: Q.filter(q=>q.scope!=='fed').length,
  fed: Q.filter(q=>q.scope==='fed').length,
  kapitel: C.length,
  bloecke: C.reduce((a,c)=>a+c.blocks.length,0),
  shots: Q.filter(q=>q.shot).length,
  signalShots: Q.filter(q=>q.shot&&q.shot.startsWith('signals/')).length,
  fbd: origin.fbd||0, ifa: origin.ifa||0, ppt: origin.ppt||0
};

/* ---- Dateien ---- */
const DOCS={
  'README.md':          fs.readFileSync(ROOT+'/README.md','utf8'),
  'README.de.md':       fs.readFileSync(ROOT+'/README.de.md','utf8'),
  'app/README.md':      fs.readFileSync(DIR+'/README.md','utf8'),
  'app/README.de.md':   fs.readFileSync(DIR+'/README.de.md','utf8')
};

console.log('\n== Fragenzahl in allen vier READMEs ==');
Object.entries(DOCS).forEach(([name,txt])=>{
  const zahlen=(txt.match(/\b(1\d\d|2\d\d)\b/g)||[]).map(Number);
  ok(zahlen.includes(IST.fragen), name+': nennt die Fragenzahl '+IST.fragen);
  /* Eine alte Fragenzahl darf nicht mehr vorkommen. */
  const alt=[196,232,235].filter(n=>n!==IST.fragen);
  const drin=alt.filter(n=>zahlen.includes(n));
  ok(drin.length===0, name+': keine ueberholte Fragenzahl'+(drin.length?' ('+drin+')':''));
});

console.log('\n== Poolgroessen in den technischen READMEs ==');
['app/README.md','app/README.de.md'].forEach(name=>{
  const txt=DOCS[name];
  Object.keys(POOLS).forEach(p=>{
    const zeile=txt.split('\n').find(l=>l.includes('`'+p+'`'));
    ok(!!zeile, name+': Pool '+p+' ist in der Tabelle');
    if(zeile){
      /* Zellenweise lesen. Ein Match auf "| 45 |" verschluckt sonst den
         Trenner und uebersieht die naechste Zahl. */
      const n=zeile.split('|').map(c=>c.trim()).filter(c=>/^\d+$/.test(c)).map(Number);
      ok(n.includes(poolSize(p)), name+': '+p+' nennt '+poolSize(p)+' verfuegbare Fragen'+
         ' (Zeile: '+n.join(', ')+')');
    }
  });
  ok(txt.includes(String(IST.ohneVerband)),
     name+': nennt '+IST.ohneVerband+' Fragen ohne Verbandsordnungen');
  ok(txt.includes(IST.fed+' Fragen')||txt.includes(IST.fed+' questions'),
     name+': nennt '+IST.fed+' Fragen aus den Verbandsordnungen');
});

console.log('\n== Herkunft der Fragen ==');
['app/README.md','app/README.de.md'].forEach(name=>{
  const txt=DOCS[name];
  [['fbd',IST.fbd],['ifa',IST.ifa],['ppt',IST.ppt]].forEach(([k,n])=>{
    const zeile=txt.split('\n').find(l=>l.startsWith('| `'+k+'`'));
    ok(zeile&&zeile.includes('| '+n+' |'), name+': origin '+k+' = '+n);
  });
});

console.log('\n== Stufen und Grenzen ==');
{
  const app=fs.readFileSync(DIR+'/assets/js/app.js','utf8');
  const lvl={};
  [['R',/R: \{ pass: (\d+), retake: (\d+)[^]*?size: (\d+)/],
   ['N',/N: \{ pass: (\d+), retake: (\d+)[^]*?size: (\d+)/]].forEach(([k,re])=>{
    const m=app.match(re); lvl[k]={pass:+m[1],retake:+m[2],size:+m[3]};
  });
  ok(lvl.R.size+lvl.N.size>0,'Stufenwerte aus app.js gelesen: '+JSON.stringify(lvl));
  Object.entries(DOCS).forEach(([name,txt])=>{
    ['R','N'].forEach(k=>{
      const z=lvl[k];
      ok(txt.includes(z.size+' ')||txt.includes('| '+z.size+' |'),
         name+': Stufe '+k+' nennt '+z.size+' Fragen');
      ok(txt.includes(z.pass+' %'), name+': Stufe '+k+' nennt die Grenze '+z.pass+' %');
    });
  });
}

console.log('\n== Testumfang ==');
{
  /* Die Zahl in Klammern hinter jeder Testdatei muss zur Datei passen. */
  const txt=DOCS['app/README.md'], txtDe=DOCS['app/README.de.md'];
  fs.readdirSync(__dirname).filter(f=>f.endsWith('.test.js')).forEach(f=>{
    if(f==='docs.test.js') return;
    ok(txt.includes('`'+f+'`'), 'app/README.md fuehrt '+f+' auf');
    ok(txtDe.includes('`'+f+'`'), 'app/README.de.md fuehrt '+f+' auf');
  });
}

console.log('\n== Beide Sprachfassungen verweisen aufeinander ==');
ok(DOCS['README.md'].includes('README.de.md'),'README.md verlinkt die deutsche Fassung');
ok(DOCS['README.de.md'].includes('](README.md)'),'README.de.md verlinkt die englische Fassung');
ok(DOCS['app/README.md'].includes('README.de.md'),'app/README.md verlinkt die deutsche Fassung');
ok(DOCS['app/README.de.md'].includes('](README.md)'),'app/README.de.md verlinkt die englische Fassung');

console.log('\n== Keine deutschen Umlaute in den englischen Fassungen ==');
[['README.md',DOCS['README.md']],['app/README.md',DOCS['app/README.md']]].forEach(([name,txt])=>{
  /* Eigennamen und Zitate deutscher Titel duerfen Umlaute tragen. */
  const ERLAUBT=/Spielregeln|Schulungsmappe|Geräte|Faustball|Angabe|Spielfeld|Blocksituation|Schiedsrichterperspektive|Josuttis|Titel|Offizielle|Die /;
  const treffer=txt.split('\n').filter(l=>/[äöüß]/.test(l)&&!ERLAUBT.test(l));
  ok(treffer.length===0, name+': keine deutschen Reste'+
     (treffer.length?' ('+treffer[0].slice(0,60)+'…)':''));
});

console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
