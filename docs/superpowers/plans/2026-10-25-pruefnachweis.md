# Prüfbarer Nachweis der Abschlussprüfung – Umsetzungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das Zertifikat belegt eine bestandene Abschlussprüfung und lässt sich vom Verband über einen Prüfcode (QR-Code) auf Echtheit prüfen – ohne Server.

**Architecture:** Neue Datei `assets/js/cert-code.js` mit reinen Funktionen (Codieren, Decodieren mit CRC32, Nachrechnen). `app.js` bekommt Namenseingabe vor der Prüfung, Versuchszähler, 24-Stunden-Sperre nach Nichtbestehen, gespeicherten bestandenen Versuch, neues Zertifikat mit QR-Code und eine Prüfseite `#verify=<Code>`. QR-Erzeugung über die lokal abgelegte MIT-Bibliothek `qrcode-generator` 1.4.4.

**Tech Stack:** Vanilla JS (ES5, IIFE, keine Build-Kette), Tests mit Node + jsdom (`app/tests`).

**Spec:** `docs/superpowers/specs/2026-10-25-pruefnachweis-design.md`

**Arbeitsverzeichnis für alle Befehle:** `/Users/tobias/workspace/referee-education/app/tests`, sofern nicht anders angegeben. Tests einzeln mit `node <datei>.test.js`, alle mit `npm test`.

---

## Dateien

| Datei | Änderung | Verantwortung |
|-------|----------|---------------|
| `app/assets/js/cert-code.js` | neu | Prüfcode: encode, decode, certNo, regrade, crc32 |
| `app/assets/js/vendor/qrcode.js` | neu (Fremdcode) | QR-Code als SVG |
| `app/index.html` | ändern | beide Skripte vor `app.js` einbinden |
| `app/assets/js/app.js` | ändern | Name, Versuche, Sperre, Zertifikat, Prüfseite, Start über `#verify=` |
| `app/assets/js/i18n.js` | ändern | neue Texte DE/EN, Zertifikatstexte ersetzen |
| `app/assets/css/app.css` | ändern | Namensfeld, QR-Code, Prüfseite |
| `app/tests/cert.test.js` | neu | alle neuen Prüfungen |
| `app/tests/package.json` | ändern | `cert.test.js` einhängen |
| `app/tests/app.test.js`, `exam-thresholds.test.js`, `exam-composition.test.js`, `questions.test.js` | ändern | Name vorbelegen bzw. eintragen, Uhr vorstellen |
| `OFFENE-PUNKTE.md`, `README.md`, `README.de.md`, `app/README.md`, `app/README.de.md` | ändern | Dokumentation |

---

### Task 1: Prüfcode-Modul

**Files:**
- Create: `app/assets/js/cert-code.js`
- Create: `app/tests/cert.test.js`
- Modify: `app/tests/package.json`

- [ ] **Step 1: Testdatei mit Gerüst und Unit-Tests anlegen**

`app/tests/cert.test.js`:

```js
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
```

Alle späteren Tasks fügen ihre Abschnitte **direkt vor** der Zeile `console.log('\n'+pass+' bestanden, '+fail+' fehlgeschlagen');` ein.

- [ ] **Step 2: Test laufen lassen, er muss scheitern**

Run: `node cert.test.js`
Expected: Abbruch mit `ENOENT … cert-code.js`

- [ ] **Step 3: `app/assets/js/cert-code.js` schreiben**

```js
/* ============================================================
   Prüfcode des Zertifikats
   Reine Funktionen ohne DOM – getrennt von app.js, damit sie sich
   einzeln testen lassen.

   Klartext:  1|N|2026-10-25|3|Name|88.3|IFA-A-004:2,QA-2022-021:0,…
              Version|Stufe|Datum ISO|Versuch|Name|Ergebnis|Frage:Antwortindex
   Code:      base64url(UTF-8 des Klartexts) + "." + CRC32 in 8 Hex-Zeichen

   Die Prüfsumme ist kein Geheimnis. Sie macht Änderungen am Zertifikat
   sichtbar, verhindert aber nicht, dass jemand mit Kenntnis dieser Datei
   einen gültigen Code baut.
   ============================================================ */
(function () {
"use strict";

var VERSION = "1";

var CRC_TABLE = (function () {
  var tab = [], c, n, k;
  for (n = 0; n < 256; n++) {
    c = n;
    for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    tab[n] = c >>> 0;
  }
  return tab;
})();
/* CRC32 über einen Bytestring – jedes Zeichen steht für ein Byte */
function crc32(bytes) {
  var c = 0xFFFFFFFF;
  for (var i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes.charCodeAt(i)) & 0xFF] ^ (c >>> 8);
  return ("0000000" + ((c ^ 0xFFFFFFFF) >>> 0).toString(16)).slice(-8);
}
function toUtf8(s) { return unescape(encodeURIComponent(s)); }
function fromUtf8(b) { return decodeURIComponent(escape(b)); }
function toB64url(bytes) {
  return btoa(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

/* rec = { lvl, date, attempt, name, pct, q: [[id, antwortIndex], …] } */
function encode(rec) {
  var plain = [VERSION, rec.lvl, rec.date, rec.attempt, rec.name, rec.pct.toFixed(1),
    rec.q.map(function (x) { return x[0] + ":" + x[1]; }).join(",")].join("|");
  var bytes = toUtf8(plain);
  return toB64url(bytes) + "." + crc32(bytes);
}

/* Zertifikatsnummer: die Prüfsumme in Vierergruppen */
function certNo(code) {
  var crc = String(code).split(".")[1] || "";
  return (crc.slice(0, 4) + "-" + crc.slice(4)).toUpperCase();
}

/* null, wenn der Code nicht lesbar ist oder die Prüfsumme nicht passt */
function decode(code) {
  try {
    var m = /^([A-Za-z0-9_-]+)\.([0-9a-f]{8})$/.exec(String(code == null ? "" : code).trim());
    if (!m) return null;
    var bytes = fromB64url(m[1]);
    if (crc32(bytes) !== m[2]) return null;
    var f = fromUtf8(bytes).split("|");
    if (f.length !== 7 || f[0] !== VERSION) return null;
    return {
      lvl: f[1], date: f[2], attempt: parseInt(f[3], 10), name: f[4], pct: parseFloat(f[5]),
      q: f[6] ? f[6].split(",").map(function (x) {
        var p = x.split(":"); return [p[0], parseInt(p[1], 10)];
      }) : [],
      no: certNo(m[0])
    };
  } catch (e) { return null; }
}

/* Ergebnis gegen den aktuellen Katalog nachrechnen. Fragen, die es nicht
   mehr gibt, werden aufgeführt, aber nicht gewertet. */
function regrade(dec, questions) {
  var byId = {};
  questions.forEach(function (q) { byId[q.id] = q; });
  var items = dec.q.map(function (x) {
    var q = byId[x[0]] || null;
    return { id: x[0], q: q, a: x[1], ok: !!q && q.c === x[1] };
  });
  var known = items.filter(function (x) { return x.q; });
  var c = known.filter(function (x) { return x.ok; }).length, n = known.length;
  return { items: items, c: c, n: n, unknown: items.length - n,
           pct: n ? Math.round((c / n) * 1000) / 10 : 0 };
}

window.IFA_CERT = { encode: encode, decode: decode, certNo: certNo, regrade: regrade, crc32: crc32 };
})();
```

- [ ] **Step 4: Test laufen lassen, er muss bestehen**

Run: `node cert.test.js`
Expected: `17 bestanden, 0 fehlgeschlagen`

- [ ] **Step 5: In `npm test` einhängen**

In `app/tests/package.json` am Ende des `test`-Skripts ` && node cert.test.js` anhängen:

```json
"test": "node app.test.js && node exam-thresholds.test.js && node exam-composition.test.js && node i18n.test.js && node questions.test.js && node bilingual.test.js && node docs.test.js && node manual-abgleich.test.js && node cert.test.js"
```

- [ ] **Step 6: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/cert-code.js app/tests/cert.test.js app/tests/package.json
git commit -m "Pruefcode-Modul fuer das Zertifikat: Codierung, CRC32, Nachrechnen"
```

(`docs.test.js` scheitert ab hier, bis Task 7 `cert.test.js` in den READMEs aufführt. Das ist erwartet.)

---

### Task 2: QR-Bibliothek einbinden

**Files:**
- Create: `app/assets/js/vendor/qrcode.js`
- Modify: `app/index.html:25-29`

- [ ] **Step 1: Bibliothek herunterladen und Prüfsumme kontrollieren**

```bash
cd /Users/tobias/workspace/referee-education/app
mkdir -p assets/js/vendor
curl -sf https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js -o assets/js/vendor/qrcode.js
shasum -a 256 assets/js/vendor/qrcode.js
```

Expected: `18ae399f81182bc9de916e9c77b195df20cc58d6f2d55a62b085a299f1bf1780`. Bei Abweichung abbrechen und melden. Der Dateikopf trägt den MIT-Lizenzhinweis von Kazuhiko Arase – unverändert lassen.

- [ ] **Step 2: Skripte in `app/index.html` einbinden**

Zwischen `data-clips.js` und `app.js`:

```html
<script src="assets/js/data-clips.js"></script>
<script src="assets/js/cert-code.js"></script>
<script src="assets/js/vendor/qrcode.js"></script>
<script src="assets/js/app.js"></script>
```

- [ ] **Step 3: Prüfen, dass die Bibliothek im jsdom-Fenster ein SVG liefert**

```bash
cd /Users/tobias/workspace/referee-education/app/tests
node -e "const {JSDOM}=require('jsdom');const w=new JSDOM('',{runScripts:'outside-only'}).window;w.eval(require('fs').readFileSync('../assets/js/vendor/qrcode.js','utf8'));const q=w.qrcode(0,'L');q.addData('https://x/#verify='+'A'.repeat(1100));q.make();console.log(q.getTypeNumber(), /<svg/.test(q.createSvgTag({cellSize:2,margin:0,scalable:true})))"
```

Expected: eine Versionsnummer um 24 und `true`.

- [ ] **Step 4: Bestehende Tests laufen lassen**

Run: `npm test`
Expected: alle Dateien bis auf `docs.test.js` grün (siehe Task 1).

- [ ] **Step 5: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/vendor/qrcode.js app/index.html
git commit -m "qrcode-generator 1.4.4 (MIT) lokal eingebunden"
```

---

### Task 3: Name vor der Prüfung

**Files:**
- Modify: `app/assets/js/app.js` (Helfer, `migrate`, `viewLevel` Prüfungskasten, Click-Handler `exam`)
- Modify: `app/assets/js/i18n.js` (de und en)
- Modify: `app/assets/css/app.css`
- Modify: `app/tests/app.test.js:133`, `app/tests/exam-thresholds.test.js:20`, `app/tests/exam-composition.test.js:26`, `app/tests/questions.test.js:22,127,266`
- Test: `app/tests/cert.test.js`

- [ ] **Step 1: Tests anfügen** (vor der Schlusszeile von `cert.test.js`)

```js
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
```

- [ ] **Step 2: Test laufen lassen, er muss scheitern**

Run: `node cert.test.js`
Expected: FAIL bei „Namensfeld vor dem Start“ und folgenden.

- [ ] **Step 3: i18n-Texte ergänzen**

In `app/assets/js/i18n.js`, Block `de`, direkt nach `retryExam: "Prüfung wiederholen",`:

```js
    examName: "Name für das Zertifikat",
    examNameHint: "Der Name erscheint auf dem Zertifikat und im Prüfcode und lässt sich danach nicht mehr ändern.",
    examNameMissing: "Bitte zuerst den Namen eintragen.",
```

Block `en`, direkt nach `retryExam: "Retake exam",`:

```js
    examName: "Name for the certificate",
    examNameHint: "The name appears on the certificate and in the verification code and cannot be changed afterwards.",
    examNameMissing: "Please enter your name first.",
```

- [ ] **Step 4: Helfer und Start der Prüfung in `app.js`**

Nach der Funktion `nQuestions` (Abschnitt i18n) einfügen:

```js
/* Name für Zertifikat und Prüfcode: | und , sind im Code Trennzeichen */
function cleanName(s) {
  return String(s == null ? "" : s).replace(/[|,]/g, "").replace(/\s+/g, " ").trim();
}
```

Im Abschnitt „Quiz-Engine“ direkt nach `buildQuiz` einfügen:

```js
/* Start der Abschlussprüfung – nur mit Namen. Der Name wird mit der Stufe
   gespeichert und steht damit auf dem Zertifikat und im Prüfcode. */
function startExam(lvl, name) {
  name = cleanName(name);
  if (!name) { state.nameMissing = lvl; return go({ name: "level", lvl: lvl }); }
  state.nameMissing = null;
  prog(lvl).name = name; save();
  state.quiz = buildQuiz(lvl, null, true);
  go({ name: "quiz" });
}
```

In `state` nach `quiz: null` ergänzen (Komma hinter `quiz: null` setzen):

```js
  quiz: null,
  nameMissing: null          // Stufe, deren Prüfung ohne Namen gestartet werden sollte
```

Im Click-Handler den `exam`-Zweig ersetzen:

```js
    if (parts[0] === "exam") {
      var ni = el("examName");
      return startExam(parts[1], ni ? ni.value : prog(parts[1]).name);
    }
```

Im `again`-Zweig unter `data-act` die Prüfung über `startExam` leiten:

```js
    if (act === "again" && q) {
      if (q.exam) return startExam(q.lvl, prog(q.lvl).name);
      state.quiz = buildQuiz(q.lvl, q.ch, q.exam);
      window.scrollTo(0, 0); return render();
    }
```

In `migrate` in der `alt.forEach`-Schleife nach der `exam`-Zeile:

```js
    if (von.name && !z.name) z.name = von.name;
```

- [ ] **Step 5: Namensfeld im Prüfungskasten (`viewLevel`)**

Im `else`-Zweig von `if (!st.ready)` die Zeile `'<div class="btnrow">' +` samt Startknopf ersetzen, sodass der Kasten so endet:

```js
      (ex ? '<p style="margin:12px 0 0;font-size:14.5px"><b>' + esc(t("bestExam")) + ":</b> " +
        fmtPct(ex.best) + " (" + esc(ex.date) + ")</p>" : "") +
      '<label class="fld"><span>' + esc(t("examName")) + "</span>" +
        '<input class="inp" id="examName" maxlength="80" autocomplete="name" value="' +
        esc(p.name || "") + '"></label>' +
      '<p class="fldhint">' + esc(t("examNameHint")) + "</p>" +
      (state.nameMissing === lvl
        ? '<div class="hint" style="margin:10px 0 0">' + esc(t("examNameMissing")) + "</div>" : "") +
      '<div class="btnrow">' +
        '<button class="btn" data-go="exam:' + lvl + '">' + esc(ex ? t("retryExam") : t("startExam")) + "</button>" +
        (ex && ex.best >= cfg.pass
          ? '<button class="btn sec" data-go="cert:' + lvl + '">' + esc(t("getCertificate")) + "</button>" : "") +
      "</div></div>";
```

- [ ] **Step 6: CSS** – in `app/assets/css/app.css` direkt nach der `.inp`-Zeile:

```css
.fld{display:flex;flex-direction:column;gap:6px;margin:16px 0 0;font-size:14.5px;font-weight:600}
.fld .inp{max-width:420px}
.fldhint{margin:6px 0 0;font-size:13px;color:var(--muted)}
```

- [ ] **Step 7: Bestehende Tests anpassen**

`app/tests/app.test.js`, vor Zeile 133 (`click2('[data-go="exam:R"]');`):

```js
d2.getElementById('examName').value='Test';
```

`app/tests/exam-thresholds.test.js:20`:

```js
  st.progress[lvl]={read:{},quiz:{},exam:null,name:'Test'};
```

`app/tests/exam-composition.test.js:26`:

```js
  ['R','N'].forEach(L=>{ st.progress[L]={read:{},quiz:{},exam:null,name:'Test'};
```

`app/tests/questions.test.js:22`:

```js
  ['R','N'].forEach(L=>{ st.progress[L]={read:{},quiz:{},exam:null,name:'Test'};
```

`app/tests/questions.test.js:127` und `:266` (beide Zeilen gleich):

```js
  const st={lang:'de',nat:true,draft:true,progress:{N:{read:{},quiz:{},exam:null,name:'Test'}}};
```

- [ ] **Step 8: Alle Tests laufen lassen**

Run: `npm test`
Expected: alles grün bis auf `docs.test.js`; `cert.test.js` mit `24 bestanden, 0 fehlgeschlagen`.

- [ ] **Step 9: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/app.js app/assets/js/i18n.js app/assets/css/app.css app/tests
git commit -m "Name vor der Abschlusspruefung festlegen"
```

---

### Task 4: Versuche, 24-Stunden-Sperre, gespeicherter Versuch

**Files:**
- Modify: `app/assets/js/app.js` (Konfiguration, Helfer, `finishQuiz`, `startExam`, `viewLevel`, `viewResult`)
- Modify: `app/assets/js/i18n.js`
- Modify: `app/tests/exam-composition.test.js` (Uhr)
- Test: `app/tests/cert.test.js`

- [ ] **Step 1: Tests anfügen**

```js
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
  a.clock.now+=23*H; a.click('[data-go="level:R"]');
  ok(a.d.querySelector('[data-go="exam:R"]').disabled,'nach 23 Stunden noch gesperrt');
  a.clock.now+=H+1; a.click('[data-go="level:R"]');
  ok(!a.d.querySelector('[data-go="exam:R"]').disabled,'nach 24 Stunden frei');
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
```

- [ ] **Step 2: Test laufen lassen, er muss scheitern**

Run: `node cert.test.js`
Expected: FAIL ab „Versuch 1 gezaehlt“.

- [ ] **Step 3: i18n-Texte ergänzen**

`de`, nach `examNameMissing`:

```js
    examLockedUntil: "Nächster Versuch möglich ab {when}.",
    attempts: "Versuche",
```

`en`, nach `examNameMissing`:

```js
    examLockedUntil: "Next attempt possible from {when}.",
    attempts: "Attempts",
```

- [ ] **Step 4: Konfiguration und Helfer in `app.js`**

Nach `var STORE_KEY = …;`:

```js
/* Wartezeit nach einer nicht bestandenen Abschlussprüfung */
var EXAM_LOCK_MS = 24 * 3600 * 1000;
```

Nach `today()`:

```js
function isoToday() {
  var d = new Date();
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}
/* ISO-Datum in der Schreibweise der aktiven Sprache */
function fmtDate(iso) {
  var m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(iso || "");
  if (!m) return iso || "";
  return state.lang === "de" ? m[3] + "." + m[2] + "." + m[1] : iso;
}
function fmtDateTime(ms) {
  var d = new Date(ms);
  var hm = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  var iso = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  return fmtDate(iso) + ", " + hm;
}
```

Nach `levelStats`:

```js
/* Zeitpunkt, ab dem die Prüfung wieder gestartet werden kann; 0 = keine Sperre */
function examLockUntil(lvl) {
  var ex = prog(lvl).exam;
  return ex && ex.lastFail ? ex.lastFail + EXAM_LOCK_MS : 0;
}
function examLocked(lvl) { return examLockUntil(lvl) > Date.now(); }
```

- [ ] **Step 5: `startExam` sperren** – als erste Zeile in `startExam` nach `name = cleanName(name);`:

```js
  if (examLocked(lvl)) return go({ name: "level", lvl: lvl });
```

- [ ] **Step 6: `finishQuiz` ersetzen**

```js
function finishQuiz() {
  var z = state.quiz;
  var correct = z.items.filter(function (x) { return x.picked === x.correctPos; }).length;
  var p = pct(correct, z.items.length);
  var pr = prog(z.lvl);
  if (z.exam) {
    var old = pr.exam || {};
    var attempts = (old.attempts || 0) + 1;
    var passed = p >= LEVELS[z.lvl].pass;
    /* Bestandener Versuch mit allen Antworten – Grundlage des Prüfcodes.
       Antwortindex in der Originalreihenfolge der Frage, nicht der Anzeige. */
    var rec = passed ? {
      lvl: z.lvl, date: isoToday(), attempt: attempts, name: pr.name || "", pct: p,
      c: correct, n: z.items.length,
      q: z.items.map(function (x) { return [x.q.id, x.picked === null ? -1 : x.order[x.picked]]; })
    } : null;
    pr.exam = {
      best: old.best != null && old.best > p ? old.best : p,
      pct: p, c: correct, n: z.items.length, date: today(),
      attempts: attempts,
      lastFail: passed ? null : Date.now(),
      cert: rec && (!old.cert || rec.pct > old.cert.pct) ? rec : (old.cert || null)
    };
  } else {
    if (pr.quiz[z.ch] == null || p > pr.quiz[z.ch]) pr.quiz[z.ch] = p;
  }
  save();
  z.finished = true;
  window.scrollTo(0, 0);
  render();
}
```

- [ ] **Step 7: Sperre im Prüfungskasten (`viewLevel`)**

Direkt vor `'<div class="btnrow">' +` im Prüfungskasten (aus Task 3) einfügen und den Startknopf um `disabled` ergänzen:

```js
      (examLocked(lvl)
        ? '<div class="hint" style="margin:10px 0 0">' +
          esc(t("examLockedUntil", { when: fmtDateTime(examLockUntil(lvl)) })) + "</div>" : "") +
      (ex && ex.attempts ? '<p style="margin:10px 0 0;font-size:14.5px"><b>' + esc(t("attempts")) + ":</b> " +
        ex.attempts + "</p>" : "") +
      '<div class="btnrow">' +
        '<button class="btn" data-go="exam:' + lvl + '"' + (examLocked(lvl) ? " disabled" : "") + ">" +
          esc(ex ? t("retryExam") : t("startExam")) + "</button>" +
```

(Der Zertifikatsknopf und `"</div></div>";` bleiben wie in Task 3.)

- [ ] **Step 8: Ergebnisseite (`viewResult`)**

`text` nach der Statusbestimmung um die Sperre ergänzen – direkt vor `var review = …`:

```js
  if (z.exam && p < cfg.pass && examLocked(z.lvl)) {
    text += " " + t("examLockedUntil", { when: fmtDateTime(examLockUntil(z.lvl)) });
  }
```

`actions` so ersetzen, dass „Nochmal versuchen“ nach nicht bestandener Prüfung entfällt:

```js
  var actions = '<div class="btnrow" style="justify-content:center">' +
    (z.exam && p < cfg.pass ? "" :
      '<button class="btn sec" data-act="again">' + esc(t("again")) + "</button>") +
    '<button class="btn" data-go="level:' + z.lvl + '">' + esc(t("backToPath")) + "</button>" +
    (z.exam && p >= cfg.pass ? '<button class="btn sec" data-go="cert:' + z.lvl + '">' +
      esc(t("getCertificate")) + "</button>" : "") + "</div>";
```

- [ ] **Step 9: Uhr in `exam-composition.test.js`**

Dort laufen mehrere nicht bestandene Prüfungen im selben Fenster. In `function app(nat)` direkt vor der Zeile mit `['i18n','data-content',…].forEach(…)`:

```js
  /* Jeder Blick auf die Uhr liegt 25 Stunden spaeter – die Wartezeit nach
     einem nicht bestandenen Versuch spielt fuer diese Tests keine Rolle. */
  let clock=Date.now(); w.__clock=()=>(clock+=25*3600e3);
  w.eval('Date.now=function(){return window.__clock();};');
```

- [ ] **Step 10: Alle Tests laufen lassen**

Run: `npm test`
Expected: alles grün bis auf `docs.test.js`; `cert.test.js` mit `41 bestanden, 0 fehlgeschlagen`.

- [ ] **Step 11: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/app.js app/assets/js/i18n.js app/tests
git commit -m "Versuchszaehler, 24 Stunden Wartezeit, bestandenen Versuch speichern"
```

---

### Task 5: Zertifikat mit Prüfcode und QR-Code

**Files:**
- Modify: `app/assets/js/app.js` (Konstante, `verifyUrl`, `qrSvg`, `viewCert`, Click-Handler `savename` entfernen)
- Modify: `app/assets/js/i18n.js`
- Modify: `app/assets/css/app.css`
- Modify: `app/tests/app.test.js:156-158`
- Test: `app/tests/cert.test.js`

- [ ] **Step 1: Tests anfügen**

```js
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
```

- [ ] **Step 2: Test laufen lassen, er muss scheitern**

Run: `node cert.test.js`
Expected: FAIL ab „Titel Zertifikat“.

- [ ] **Step 3: i18n-Texte**

`de` und `en`: die Schlüssel `certTitle`, `certBody`, `certNote` ersetzen, `certName` in beiden Blöcken entfernen, sodass der Zertifikatsblock lautet:

```js
    /* Certificate */
    certKicker: "International Fistball Association",
    certTitle: "Zertifikat",
    certBody: "hat die Abschlussprüfung für die {lvl} mit {pct} % ({c} von {n} Fragen) bestanden.",
    certDate: "Datum",
    certLevel: "Lizenzstufe",
    certAttempt: "Versuch",
    certNo: "Zertifikatsnummer",
    certVerifyAt: "Echtheit prüfen:",
    certNote: "Unbeaufsichtigt abgelegt. Die Echtheit lässt sich über den QR-Code prüfen. Dieses Zertifikat ersetzt nicht die Lizenzerteilung durch den zuständigen Mitgliedsverband.",
    certNoCode: "Diese Prüfung wurde vor Einführung des Prüfcodes abgelegt. Für einen prüfbaren Nachweis die Prüfung erneut ablegen.",
    print: "Drucken / als PDF speichern",
```

`en` entsprechend:

```js
    certKicker: "International Fistball Association",
    certTitle: "Certificate",
    certBody: "has passed the final exam for the {lvl} with {pct} % ({c} of {n} questions).",
    certDate: "Date",
    certLevel: "Licence level",
    certAttempt: "Attempt",
    certNo: "Certificate no.",
    certVerifyAt: "Verify authenticity:",
    certNote: "Taken unsupervised. Authenticity can be verified via the QR code. This certificate does not replace the licence award by the responsible member federation.",
    certNoCode: "This exam was taken before verification codes were introduced. Retake the exam to obtain a verifiable certificate.",
```

(`print` steht im `en`-Block bereits; nur prüfen, dass er erhalten bleibt.)

- [ ] **Step 4: Adresse und QR-Helfer in `app.js`**

Nach `EXAM_LOCK_MS`:

```js
/* Veröffentlichte Adresse – Ziel des QR-Codes, wenn die App per file://
   läuft. Unter http(s) gilt die eigene Adresse. */
var PUBLIC_URL = "https://chrashkidgrimes.github.io/fistball-referee-education/";
```

Vor `/* ---------- View: Zertifikat`:

```js
function verifyUrl(code) {
  var l = window.location;
  var base = /^https?:$/.test(l.protocol) ? l.origin + l.pathname : PUBLIC_URL;
  return base + "#verify=" + code;
}
/* QR-Code als SVG; leer, wenn die Bibliothek fehlt */
function qrSvg(text) {
  if (typeof window.qrcode !== "function") return "";
  var qr = window.qrcode(0, "L");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true });
}
```

- [ ] **Step 5: `viewCert` ersetzen**

```js
function viewCert(lvl) {
  var p = prog(lvl), ex = p.exam;
  if (!ex || ex.best < LEVELS[lvl].pass) return viewLevel(lvl);
  /* rec fehlt bei Prüfungen von vor der Einführung des Prüfcodes */
  var rec = ex.cert || null;
  var code = rec && window.IFA_CERT ? window.IFA_CERT.encode(rec) : null;
  var url = code ? verifyUrl(code) : "";
  var name = rec ? rec.name : (p.name || "");
  var body = t("certBody", {
    lvl: lvlName(lvl),
    pct: Math.round(rec ? rec.pct : ex.best),
    c: rec ? rec.c : ex.c, n: rec ? rec.n : ex.n
  });
  return "" +
    '<div class="crumb no-print"><a href="#" data-go="level:' + lvl + '">← ' + esc(t("backToPath")) + "</a></div>" +
    '<div class="cert">' +
      '<img src="assets/img/ifa-logo.png" alt="IFA">' +
      '<div class="kicker">' + esc(t("certKicker")) + "</div>" +
      "<h1>" + esc(t("certTitle")) + "</h1>" +
      '<div class="name">' + esc(name) + "</div>" +
      '<div class="body">' + esc(body) + "</div>" +
      '<div class="foot"><span>' + esc(t("certLevel")) + ": <b>" + esc(lvlName(lvl)) + "</b></span>" +
        (rec ? "<span>" + esc(t("certAttempt")) + ": <b>" + rec.attempt + "</b></span>" : "") +
        "<span>" + esc(t("certDate")) + ": <b>" + esc(rec ? fmtDate(rec.date) : ex.date) + "</b></span></div>" +
      (code
        ? '<div class="qr">' + qrSvg(url) + "</div>" +
          '<div class="cno">' + esc(t("certNo")) + ": <b>" + esc(window.IFA_CERT.certNo(code)) + "</b></div>" +
          '<div class="cno">' + esc(t("certVerifyAt")) + ' <a class="vurl" href="' + esc(url) + '">' +
            esc(url.split("#")[0]) + "</a></div>"
        : '<div class="hint" style="margin:18px 0 0">' + esc(t("certNoCode")) + "</div>") +
      '<p style="font-size:12px;color:var(--muted);margin:18px 0 0">' + esc(t("certNote")) + "</p>" +
    "</div>" +
    '<div class="btnrow no-print" style="justify-content:center">' +
      '<button class="btn" data-act="print">' + esc(t("print")) + "</button>" +
    "</div>";
}
```

Im Click-Handler den Zweig `if (act === "savename") { … }` vollständig entfernen.

- [ ] **Step 6: CSS** – nach der `.cert .foot`-Zeile:

```css
.cert .qr{width:150px;margin:26px auto 8px}
.cert .qr svg{display:block;width:100%;height:auto}
.cert .cno{font-size:12px;color:var(--muted);margin-top:4px;word-break:break-all}
.cert .cno a{color:inherit}
```

- [ ] **Step 7: `app.test.js` anpassen** (Abschnitt „Zertifikat“, Zeile 157)

```js
ok(/Zertifikat/.test(d2.querySelector('.cert h1').textContent),'Zertifikat rendert');
```

- [ ] **Step 8: Alle Tests laufen lassen**

Run: `npm test`
Expected: alles grün bis auf `docs.test.js`; `cert.test.js` mit `54 bestanden, 0 fehlgeschlagen`.

- [ ] **Step 9: Sichtprüfung im Browser**

```bash
open /Users/tobias/workspace/referee-education/app/index.html
```

Stufe Regional per Konsole freischalten ist nicht nötig – stattdessen im Speicher vorbelegen:
in der Browserkonsole `s=JSON.parse(localStorage['ifa-referee-education-v1']||'{"lang":"de","nat":true,"progress":{}}'); s.progress.R={read:{},quiz:Object.fromEntries([...Array(16)].map((_,i)=>[i+1,100])),exam:null,name:'Test'}; localStorage['ifa-referee-education-v1']=JSON.stringify(s); location.reload()`,
dann Prüfung ablegen, Zertifikat öffnen, Druckvorschau ansehen (QR-Code scharf, alles auf einer Seite) und QR-Code mit dem Handy scannen. Danach `localStorage.removeItem('ifa-referee-education-v1')`.

- [ ] **Step 10: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/app.js app/assets/js/i18n.js app/assets/css/app.css app/tests
git commit -m "Zertifikat: Abschlusspruefung bestanden, Pruefcode als QR-Code"
```

---

### Task 6: Prüfseite „Zertifikat prüfen“

**Files:**
- Modify: `app/assets/js/app.js` (`viewVerify`, `render`, Click-Handler, `viewHome`, `viewSettings`, Start)
- Modify: `app/assets/js/i18n.js`
- Modify: `app/assets/css/app.css`
- Test: `app/tests/cert.test.js`

- [ ] **Step 1: Tests anfügen**

```js
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
```

- [ ] **Step 2: Test laufen lassen, er muss scheitern**

Run: `node cert.test.js`
Expected: FAIL ab „#verify= oeffnet die Pruefseite“.

- [ ] **Step 3: i18n-Texte**

`de`, nach `print`:

```js
    /* Verify */
    verifyTitle: "Zertifikat prüfen",
    verifyLead: "Prüfcode oder Link aus dem QR-Code des Zertifikats einfügen.",
    verifyBtn: "Prüfen",
    verifyInvalid: "Code ungültig oder verändert.",
    verifyValid: "Prüfsumme gültig – der Code ist unverändert.",
    verifyName: "Name",
    verifyScore: "Ergebnis laut Zertifikat",
    verifyRegraded: "Nachgerechnet",
    verifyCatalog: "Der Fragenkatalog wurde seit der Prüfung geändert. Maßgeblich ist das Ergebnis laut Zertifikat.",
    verifyUnknown: "Frage nicht mehr im Katalog",
    verifyGiven: "Gegebene Antwort:",
    verifyLimits: "Die Prüfung wurde unbeaufsichtigt abgelegt. Die Prüfsumme belegt, dass der Code nicht verändert wurde – nicht, wer die Fragen beantwortet hat.",
```

`en`, nach `print`:

```js
    /* Verify */
    verifyTitle: "Verify certificate",
    verifyLead: "Paste the verification code or the link from the certificate's QR code.",
    verifyBtn: "Verify",
    verifyInvalid: "Code invalid or altered.",
    verifyValid: "Checksum valid – the code has not been altered.",
    verifyName: "Name",
    verifyScore: "Result on certificate",
    verifyRegraded: "Recalculated",
    verifyCatalog: "The question catalogue has changed since the exam. The result on the certificate prevails.",
    verifyUnknown: "Question no longer in the catalogue",
    verifyGiven: "Answer given:",
    verifyLimits: "The exam was taken unsupervised. The checksum proves that the code has not been altered – not who answered the questions.",
```

- [ ] **Step 4: `viewVerify` in `app.js`** – nach `viewCert` einfügen:

```js
/* ---------- View: Zertifikat prüfen -------------------------------------- */
function viewVerify(code) {
  var form = '<div class="card" style="padding:22px;max-width:720px">' +
      '<p style="margin:0 0 10px;color:var(--muted)">' + esc(t("verifyLead")) + "</p>" +
      '<textarea class="inp" id="verifyInput" rows="3" style="width:100%">' + esc(code || "") + "</textarea>" +
      '<div class="btnrow"><button class="btn" data-act="verify">' + esc(t("verifyBtn")) + "</button></div>" +
    "</div>";
  var out = "";
  if (code) {
    var dec = window.IFA_CERT ? window.IFA_CERT.decode(code) : null;
    if (!dec || !LEVELS[dec.lvl]) {
      out = '<div class="card vres bad"><h2>✗ ' + esc(t("verifyInvalid")) + "</h2></div>";
    } else {
      var rg = window.IFA_CERT.regrade(dec, QUESTIONS);
      var changed = rg.unknown > 0 || rg.pct !== dec.pct;
      var list = rg.items.map(function (x) {
        if (!x.q) return '<div class="rq no"><div class="qq">? ' + esc(x.id) + '</div>' +
          '<div class="aa">' + esc(t("verifyUnknown")) + "</div></div>";
        var aa = answers(x.q);
        return '<div class="rq ' + (x.ok ? "yes" : "no") + '">' +
          '<div class="qq">' + (x.ok ? "✓ " : "✗ ") + esc(localized(x.q.q)) + "</div>" +
          '<div class="aa">' + esc(t("verifyGiven")) + " " + esc(x.a >= 0 && aa[x.a] != null ? aa[x.a] : "–") +
          (x.ok ? "" : "<br>" + esc(t("correctAnswerIs")) + " <b>" + esc(aa[x.q.c]) + "</b>") +
          "</div></div>";
      }).join("");
      out = '<div class="card vres ok"><h2>✓ ' + esc(t("verifyValid")) + "</h2>" +
          '<dl class="vdl">' +
            "<dt>" + esc(t("verifyName")) + "</dt><dd>" + esc(dec.name) + "</dd>" +
            "<dt>" + esc(t("certLevel")) + "</dt><dd>" + esc(lvlName(dec.lvl)) + "</dd>" +
            "<dt>" + esc(t("certDate")) + "</dt><dd>" + esc(fmtDate(dec.date)) + "</dd>" +
            "<dt>" + esc(t("certAttempt")) + "</dt><dd>" + dec.attempt + "</dd>" +
            "<dt>" + esc(t("certNo")) + "</dt><dd>" + esc(dec.no) + "</dd>" +
            "<dt>" + esc(t("verifyScore")) + "</dt><dd>" + fmtPct(dec.pct) + "</dd>" +
            "<dt>" + esc(t("verifyRegraded")) + "</dt><dd>" + fmtPct(rg.pct) + " (" +
              esc(t("scoreLine", { c: rg.c, n: rg.n })) + ")</dd>" +
            "<dt>" + esc(t("passMark")) + "</dt><dd>" + LEVELS[dec.lvl].pass + " %</dd>" +
          "</dl>" +
          (changed ? '<div class="hint">' + esc(t("verifyCatalog")) + "</div>" : "") +
          '<p style="font-size:13px;color:var(--muted);margin:12px 0 0">' + esc(t("verifyLimits")) + "</p>" +
        "</div>" +
        "<h2>" + esc(t("reviewAnswers")) + '</h2><div class="rlist">' + list + "</div>";
    }
  }
  return "" +
    '<div class="crumb"><a href="#" data-go="home">← ' + esc(t("appTitle")) + "</a></div>" +
    "<h1>" + esc(t("verifyTitle")) + "</h1>" + form + out;
}
```

(`scoreLine` existiert bereits in beiden Sprachen; vorher mit `grep -n scoreLine app/assets/js/i18n.js` bestätigen.)

- [ ] **Step 5: Routing, Events, Links, Start**

In `render()` im `switch`:

```js
    case "verify":   html = viewVerify(v.code); break;
```

Im `data-go`-Zweig nach der `settings`-Zeile:

```js
    if (parts[0] === "verify") return go({ name: "verify" });
```

Im `data-act`-Zweig vor `if (act === "print")`:

```js
    if (act === "verify") {
      var vi = el("verifyInput");
      /* Auch die ganze Adresse aus dem QR-Code wird angenommen */
      var vc = vi ? vi.value.trim().replace(/^.*#verify=/, "") : "";
      return go({ name: "verify", code: vc });
    }
```

In `viewHome` den Schluss-Hinweis ersetzen, damit der Link unter der Stufenauswahl steht:

```js
    '<div class="levels">' + cards + "</div>" +
    '<p style="margin:18px 0 0"><a href="#" data-go="verify">' + esc(t("verifyTitle")) + " →</a></p>" +
    '<div class="hint" style="margin-top:34px"><b>' + esc(t("sources")) + ":</b> " +
      esc(t("sourcesText")) + "</div>";
```

In `viewSettings` vor dem Quellen-Hinweis (`'<div class="hint" style="max-width:720px">…`):

```js
    '<p style="max-width:720px"><a href="#" data-go="verify">' + esc(t("verifyTitle")) + " →</a></p>" +
```

Start am Dateiende ersetzen:

```js
/* ---------- Start -------------------------------------------------------- */
load();
var startHash = /^#verify=(.+)$/.exec(window.location.hash || "");
go(startHash ? { name: "verify", code: decodeURIComponent(startHash[1]) } : { name: "home" });
```

- [ ] **Step 6: CSS** – nach den `.cert`-Regeln:

```css
/* ---------- Verify ---------- */
.vres{padding:22px;margin-top:20px;max-width:720px;border-left:5px solid var(--ok)}
.vres.bad{border-left-color:var(--bad)}
.vres h2{margin:0 0 6px;font-size:19px}
.vdl{display:grid;grid-template-columns:max-content 1fr;gap:6px 16px;margin:14px 0}
.vdl dt{color:var(--muted)}
.vdl dd{margin:0;font-weight:600}
```

- [ ] **Step 7: Alle Tests laufen lassen**

Run: `npm test`
Expected: alles grün bis auf `docs.test.js`; `cert.test.js` mit `68 bestanden, 0 fehlgeschlagen`.

- [ ] **Step 8: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add app/assets/js/app.js app/assets/js/i18n.js app/assets/css/app.css app/tests/cert.test.js
git commit -m "Pruefseite: Zertifikat ueber #verify= pruefen und nachrechnen"
```

---

### Task 7: Dokumentation

**Files:**
- Modify: `OFFENE-PUNKTE.md:81-95`
- Modify: `README.md`, `README.de.md`, `app/README.md`, `app/README.de.md`

- [ ] **Step 1: Testzahlen ermitteln**

```bash
cd /Users/tobias/workspace/referee-education/app/tests
for f in app cert; do printf "%s: " $f; node $f.test.js | tail -1; done
```

Die Zahlen „bestanden“ werden in Step 3 eingetragen.

- [ ] **Step 2: `OFFENE-PUNKTE.md`, Abschnitt B** – die Blöcke „Weg 1“ bis „Weg 3“ ersetzen:

```markdown
**Entschieden am 25. Oktober 2026: Weg 2.** Das Zertifikat bescheinigt die bestandene
Abschlussprüfung und trägt einen Prüfcode, über den ein Verband es nachprüfen kann.
Spec: `docs/superpowers/specs/2026-10-25-pruefnachweis-design.md`.

**Weg 1 – Ausbildung, Prüfung bleibt beim Verband**
- [x] ~~Zertifikat als Durcharbeitungsnachweis~~ – verworfen zugunsten von Weg 2.

**Weg 2 – Prüfung soll zählen**
- [x] ~~Fragenkatalog erweitern~~ – 114 Fragen ergänzt und freigegeben, Katalog von
      121 auf 235. Kein Kapitel ist mehr ohne Fragen.
- [x] ~~Prüfungsumfang auf eine Teilmenge des Katalogs begrenzen~~ – erledigt (40 / 60)
- [x] ~~Auswertung ohne Lösungen~~ – bewusst abgewählt: Die Lösungen nach der Prüfung
      dienen dem Lernen. Die Wartezeit und der Umfang des Katalogs dämpfen den Effekt.
- [x] ~~Wartezeit zwischen Prüfungsversuchen~~ – 24 Stunden nach einem nicht
      bestandenen Versuch. Liegt im Browser und ist umgehbar; die Versuchsnummer steht
      deshalb im Prüfcode.
- [x] ~~Serverseitige Ablage der Ergebnisse~~ – ersetzt durch den Prüfcode: Name,
      Stufe, Datum, Versuch, Ergebnis und alle Antworten, abgesichert mit CRC32, als
      QR-Code auf dem Zertifikat. Die Prüfseite rechnet das Ergebnis nach.
      **Grenzen:** Die Prüfung ist unbeaufsichtigt. Die Prüfsumme ist kein Geheimnis –
      wer den Quellcode liest, kann einen gültigen Code bauen. Der Code belegt, dass das
      Zertifikat nicht nachträglich verändert wurde, nicht wer geantwortet hat.

**Weg 3 – Server mit Verbands-Login**
- [ ] Löst Manipulation und zentrale Auswertung, kostet laufenden Betrieb.
      Weiter abgewählt. Ein Zwischenschritt wäre ein Prüfungsschlüssel, den der Verband
      vorab ausgibt (Spec, Ansatz 2) – lässt sich ohne Umbau des Prüfcodes ergänzen.
```

Den Absatz „**Nicht entschärft:** …“ darüber ersetzen durch:

```markdown
**Weiter offen:** Das Ergebnis liegt im `localStorage` und lässt sich in der
Browserkonsole setzen. Ein so erzeugtes Zertifikat trägt aber keinen gültigen Prüfcode,
solange niemand den Code gezielt nachbaut.
```

- [ ] **Step 3: READMEs**

`README.md` (Wurzel), Satz in „What this is“ ersetzen:

```markdown
A static web app with no server and no build step; the only third-party code is a small QR-code
library kept in the repository. Opening `app/index.html` in a
```

`README.de.md` (Wurzel) entsprechend:

```markdown
Eine statische Web-App ohne Server und Build-Schritt; einziger Fremdcode ist eine kleine
QR-Code-Bibliothek, die im Repository liegt. `app/index.html` im Browser
```

In beiden Wurzel-READMEs nach dem Absatz zur Speicherung einen Absatz anfügen:

EN:
```markdown
**Certificate.** Passing the final exam produces a certificate with a verification code as a QR
code. Scanning it opens the app's *Verify certificate* page, which shows name, level, date, attempt
and every answer, and recalculates the score. The exam is unsupervised and the checksum is not a
secret: the code proves that the certificate has not been altered, not who answered the questions.
```

DE:
```markdown
**Zertifikat.** Wer die Abschlussprüfung besteht, erhält ein Zertifikat mit Prüfcode als QR-Code.
Der Scan öffnet die Seite *Zertifikat prüfen* der App: Name, Stufe, Datum, Versuch und jede
Antwort, das Ergebnis wird nachgerechnet. Die Prüfung ist unbeaufsichtigt und die Prüfsumme kein
Geheimnis – der Code belegt, dass das Zertifikat nicht verändert wurde, nicht wer geantwortet hat.
```

Im Abschnitt „Rechtliches“ von `README.de.md` den Satz „Das Zertifikat der App ist eine Lernbestätigung und ersetzt keine Lizenzerteilung durch einen Mitgliedsverband.“ ersetzen durch:

```markdown
Das Zertifikat der App bescheinigt eine unbeaufsichtigt abgelegte Prüfung und ersetzt keine
Lizenzerteilung durch einen Mitgliedsverband.
```

und den entsprechenden Satz in `README.md` („Legal“) durch:

```markdown
The app's certificate attests an exam taken unsupervised and does not replace the licence award by
a member federation.
```

(Fundstelle vorher mit `grep -n "certificate" README.md` bestätigen.)

`app/README.md` und `app/README.de.md`:
- Den Satz „no dependencies“ / „keine Abhängigkeiten“ in Zeile 6 bzw. 6–7 wie oben ergänzen.
- In der Tabelle der Testdateien die Zeile zu `app.test.js` auf die Zahl aus Step 1 setzen und darunter einfügen (Zahl aus Step 1):

EN:
```markdown
| `cert.test.js` | Verification code (encoding, checksum, recalculation), name before the exam, attempt counter and 24-hour wait, certificate with QR code, verify page (N checks) |
```

DE:
```markdown
| `cert.test.js` | Prüfcode (Codierung, Prüfsumme, Nachrechnen), Name vor der Prüfung, Versuchszähler und 24 Stunden Wartezeit, Zertifikat mit QR-Code, Prüfseite (N Prüfungen) |
```

- Einen Abschnitt zum Prüfcode an passender Stelle (nach dem Abschnitt zur Prüfung) ergänzen:

EN:
```markdown
### Verification code

`assets/js/cert-code.js` encodes the best passed attempt as
`1|level|date|attempt|name|score|ID:answer,…`, UTF-8, base64url, plus a CRC32 checksum. The
certificate shows it as a QR code pointing to `#verify=<code>`; under `file://` it points to the
published address (`PUBLIC_URL` in `app.js`). The verify page decodes it, checks the checksum and
recalculates the score against the current catalogue. After a failed attempt the exam is locked for
24 hours (`EXAM_LOCK_MS`). QR codes come from `assets/js/vendor/qrcode.js`
(qrcode-generator 1.4.4, MIT, Kazuhiko Arase).
```

DE:
```markdown
### Prüfcode

`assets/js/cert-code.js` codiert den besten bestandenen Versuch als
`1|Stufe|Datum|Versuch|Name|Ergebnis|ID:Antwort,…`, UTF-8, base64url, dazu eine CRC32-Prüfsumme.
Das Zertifikat zeigt ihn als QR-Code auf `#verify=<Code>`; unter `file://` zeigt er auf die
veröffentlichte Adresse (`PUBLIC_URL` in `app.js`). Die Prüfseite decodiert, prüft die Prüfsumme
und rechnet das Ergebnis gegen den aktuellen Katalog nach. Nach einem nicht bestandenen Versuch ist
die Prüfung 24 Stunden gesperrt (`EXAM_LOCK_MS`). QR-Codes erzeugt `assets/js/vendor/qrcode.js`
(qrcode-generator 1.4.4, MIT, Kazuhiko Arase).
```

- [ ] **Step 4: Alle Tests laufen lassen**

Run: `npm test`
Expected: alle Dateien grün, auch `docs.test.js` (u. a. „app/README.md fuehrt cert.test.js auf“, „keine deutschen Reste“ in den englischen Fassungen).

- [ ] **Step 5: Commit**

```bash
cd /Users/tobias/workspace/referee-education
git add OFFENE-PUNKTE.md README.md README.de.md app/README.md app/README.de.md
git commit -m "Pruefnachweis dokumentiert, offener Punkt B entschieden"
```

---

### Task 8: Abschluss

- [ ] **Step 1:** `npm test` – Ausgabe vollständig grün.
- [ ] **Step 2:** `git log --oneline origin/main..main` zeigen und den Nutzer fragen, ob gepusht werden soll (ein Push auf `main` veröffentlicht sofort auf GitHub Pages).
- [ ] **Step 3:** Nach dem Push: Pages-Lauf mit `gh run watch` abwarten und `https://chrashkidgrimes.github.io/fistball-referee-education/assets/js/cert-code.js` auf HTTP 200 prüfen.
