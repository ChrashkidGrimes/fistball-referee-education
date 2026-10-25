/* ============================================================
   IFA Referee Education — App-Logik
   Reine Client-App, keine Abhängigkeiten, läuft auch per file://
   ============================================================ */
(function () {
"use strict";

/* ---------- Konfiguration ------------------------------------------------
   Themenpools.

   Ein Pool ist ein Themenbereich, kein Schwierigkeitsgrad. Beide Lizenzstufen
   ziehen aus allen Pools; der Pool sorgt nur dafür, dass jede Prüfung das
   Regelwerk gleichmäßig abdeckt. Welcher Pool eine Frage trägt, ergibt sich
   aus ihrem Kapitel – neue Fragen sortieren sich damit von selbst ein.
-------------------------------------------------------------------------- */
var POOLS = {
  feld:         [1],                    // Spielfeld und Geräte
  rahmen:       [2, 3, 14],             // Mannschaft, Spieldauer, Altersklassen
  spiel:        [4, 5, 6],              // Spielgang, Schlag, Angabe
  ballfuehrung: [7, 8],                 // Rückschlag, Zuspiel, Wertung
  leitung:      [9, 10, 11, 12, 13, 16],// Spielrichter, Strafen, Handzeichen,
                                        // Verhalten, Linienrichter, Aufgaben rund ums Spiel
  verband:      [15]                    // Ordnungen des Mitgliedsverbandes, abschaltbar
};

/* ---------- Lizenzstufen -------------------------------------------------
   pass / retake  Prozentgrenzen laut Vorgabe:
                    Regional  70 % bestanden, Nachprüfung ab 65 %
                    National  85 % bestanden, Nachprüfung ab 75 %
   quizPass       Prozentgrenze, ab der ein Kapitelquiz als erledigt gilt.
   exam.size      Anzahl Fragen in der Abschlussprüfung.
   exam.quota     Wie sich diese Fragen auf die Themenpools verteilen. Die Summe
                  muss exam.size ergeben. Reicht ein Pool nicht aus – etwa weil
                  ein Verband die Verbandsordnungen abschaltet –, füllen die
                  übrigen Pools in der hier notierten Reihenfolge auf, damit die
                  Fragenzahl erhalten bleibt.

   Die Quoten folgen bewusst nicht den Poolgrößen. Kapitel 1 stellt rund ein
   Fünftel des Katalogs, überwiegend Maße und Zahlen, und ist deshalb
   untergewichtet. Der Pool "leitung" trägt umgekehrt ein Fünftel der
   Nationalprüfung – dort steckt die Urteilsfähigkeit, die die höhere Lizenz
   rechtfertigt.

   Der Lernpfad ist für beide Stufen gleich: alle Kapitel, dieselben
   Kapitelquizzes. Die Stufen unterscheiden sich in Umfang und Grenze der
   Abschlussprüfung sowie in der Grenze der Kapitelquizzes.
-------------------------------------------------------------------------- */
var LEVELS = {
  R: { pass: 70, retake: 65, quizPass: 70,
       exam: { size: 40, quota: { feld: 7, rahmen: 7, spiel: 8,
                                  ballfuehrung: 7, leitung: 7, verband: 4 } } },

  N: { pass: 85, retake: 75, quizPass: 85,
       exam: { size: 60, quota: { feld: 10, rahmen: 10, spiel: 12,
                                  ballfuehrung: 10, leitung: 12, verband: 6 } } }
};
var LEVEL_ORDER = ["R", "N"];
var STORE_KEY = "ifa-referee-education-v1";
/* Ablösung der Stufen C/B/A: C wird Regional, B und A werden National.
   Treffen beide auf N, gewinnt der weiter fortgeschrittene Stand. */
var LEVEL_MIGRATION = { C: "R", B: "N", A: "N" };

/* ---------- State -------------------------------------------------------- */
var state = {
  lang: "de",
  nat: true,                 // Verbandsordnungen einbeziehen
  draft: true,               // Entwurfsfragen einbeziehen (noch nicht fachlich freigegeben)
  progress: {},              // { R: { read:{ch:true}, quiz:{ch:pct}, exam:{best,pct,c,n,date} } }
  view: null,
  quiz: null,
  nameMissing: null          // Stufe, deren Prüfung ohne Namen gestartet werden sollte
};

/* ---------- Persistenz --------------------------------------------------- */
function load() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var d = JSON.parse(raw);
      if (d.lang) state.lang = d.lang;
      if (typeof d.nat === "boolean") state.nat = d.nat;
      if (typeof d.draft === "boolean") state.draft = d.draft;
      if (d.progress) {
        state.progress = migrate(d.progress);
        /* Umgestellten Stand sofort zurückschreiben, sonst liegt bis zur
           nächsten Änderung weiter die alte Struktur im Speicher. */
        if (migrated) save();
      }
    }
  } catch (e) { /* localStorage nicht verfügbar – App läuft ohne Speicherung */ }
  if (!window.IFA_I18N[state.lang]) state.lang = "de";
}
/* Fortschritt aus der dreistufigen Fassung übernehmen. Wer B und A begonnen
   hatte, bekommt beides auf National zusammengeführt – je Kapitel und für die
   Prüfung zählt das bessere Ergebnis, damit niemand Fortschritt verliert. */
var migrated = false;
function migrate(p) {
  var alt = Object.keys(p).filter(function (k) { return LEVEL_MIGRATION[k]; });
  if (!alt.length) return p;
  migrated = true;
  var out = {};
  LEVEL_ORDER.forEach(function (L) { if (p[L]) out[L] = p[L]; });
  alt.forEach(function (k) {
    var ziel = LEVEL_MIGRATION[k], von = p[k] || {};
    var z = out[ziel] || (out[ziel] = { read: {}, quiz: {}, exam: null });
    Object.keys(von.read || {}).forEach(function (ch) { if (von.read[ch]) z.read[ch] = true; });
    Object.keys(von.quiz || {}).forEach(function (ch) {
      if (z.quiz[ch] == null || von.quiz[ch] > z.quiz[ch]) z.quiz[ch] = von.quiz[ch];
    });
    if (von.exam && (!z.exam || von.exam.pct > z.exam.pct)) z.exam = von.exam;
    if (von.name && !z.name) z.name = von.name;
  });
  return out;
}
function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      lang: state.lang, nat: state.nat, draft: state.draft, progress: state.progress
    }));
  } catch (e) { /* ignorieren */ }
}
function prog(lvl) {
  if (!state.progress[lvl]) state.progress[lvl] = { read: {}, quiz: {}, exam: null };
  var p = state.progress[lvl];
  if (!p.read) p.read = {};
  if (!p.quiz) p.quiz = {};
  return p;
}

/* ---------- i18n --------------------------------------------------------- */
function t(key, vars) {
  var dict = window.IFA_I18N[state.lang] || {};
  var s = dict[key];
  if (s === undefined) s = window.IFA_I18N.de[key];
  if (s === undefined) return key;
  if (vars) {
    Object.keys(vars).forEach(function (k) {
      s = s.split("{" + k + "}").join(vars[k]);
    });
  }
  return s;
}
function localized(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  if (Array.isArray(obj)) return obj;
  return obj[state.lang] != null ? obj[state.lang] : (obj.de != null ? obj.de : "");
}
/* true, wenn für die aktive Sprache keine Übersetzung vorliegt und Deutsch greift */
function isFallback(obj) {
  if (state.lang === "de" || obj == null || typeof obj === "string") return false;
  return !obj[state.lang];
}
function fbMark(obj, fromPpt) {
  if (!isFallback(obj)) return "";
  return ' <span class="badge de" title="' +
    esc(t(fromPpt ? "transPpt" : "transMissing")) + '">de</span>';
}
/* Ausgeschriebener Stufenname, kommt aus der Sprachdatei */
function lvlName(lvl) { return t("lvl" + lvl + "Name"); }
/* Antwortliste in der aktiven Sprache */
function answers(q) {
  var a = localized(q.a);
  return Array.isArray(a) ? a : q.a;
}
/* "1 Frage" statt "1 Fragen" */
function nQuestions(n) { return n + " " + t(n === 1 ? "questionOne" : "questions"); }

/* Name für Zertifikat und Prüfcode: | und , sind im Code Trennzeichen */
function cleanName(s) {
  return String(s == null ? "" : s).replace(/[|,]/g, "").replace(/\s+/g, " ").trim();
}

/* ---------- Helfer ------------------------------------------------------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function el(id) { return document.getElementById(id); }
function shuffle(arr) {
  var a = arr.slice(), i, j, tmp;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function pct(c, n) { return n ? Math.round((c / n) * 1000) / 10 : 0; }
function fmtPct(v) { return (Math.round(v * 10) / 10).toString().replace(".", state.lang === "de" ? "," : ".") + " %"; }
function today() {
  var d = new Date();
  return state.lang === "de"
    ? ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear()
    : d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

/* ---------- Daten -------------------------------------------------------- */
var CONTENT = window.IFA_CONTENT || [];
/* Videofragen werden nur aufgenommen, wenn eine Video-ID eingetragen ist –
   unfertige Vorlagen aus data-clips.js bleiben so folgenlos. */
var CLIPS = (window.IFA_CLIPS || []).filter(function (q) {
  return q.clip && q.clip.yt;
});
var QUESTIONS = (window.IFA_QUESTIONS || []).concat(CLIPS);

function chapterById(id) {
  for (var i = 0; i < CONTENT.length; i++) if (CONTENT[i].id === id) return CONTENT[i];
  return null;
}
/* Themenpool einer Frage – ergibt sich aus dem Kapitel */
var POOL_OF = (function () {
  var m = {};
  Object.keys(POOLS).forEach(function (p) {
    POOLS[p].forEach(function (ch) { m[ch] = p; });
  });
  return m;
})();
function poolOf(q) { return POOL_OF[q.ch] || null; }

/* Ist die Frage nach den aktuellen Einstellungen überhaupt sichtbar? */
function usable(q) {
  if (!state.nat && q.scope === "fed") return false;
  if (!state.draft && q.origin === "draft") return false;
  return poolOf(q) !== null;
}
/* Fragen eines Kapitels. Der Lernpfad ist für beide Stufen gleich, deshalb
   filtert hier nichts mehr nach Stufe – die Stufen unterscheiden sich allein
   in der Grenze, ab der ein Quiz als bestanden gilt. */
function questionsFor(lvl, chapter) {
  return QUESTIONS.filter(function (q) {
    if (!usable(q)) return false;
    if (chapter != null && q.ch !== chapter) return false;
    return true;
  });
}
/* Fragen eines einzelnen Themenpools */
function poolQuestions(pool) {
  return QUESTIONS.filter(function (q) { return usable(q) && poolOf(q) === pool; });
}
/* Zusammensetzung der Prüfung: wie viele Fragen je Pool tatsächlich gezogen werden.
   Ist ein Pool zu klein, übernehmen die übrigen Pools den Rest. */
function examPlan(lvl) {
  var cfg = LEVELS[lvl].exam;
  var order = Object.keys(cfg.quota);
  var avail = {}, take = {}, total = 0, pot = 0;
  order.forEach(function (p) {
    avail[p] = poolQuestions(p).length;
    pot += avail[p];
    take[p] = Math.min(cfg.quota[p], avail[p]);
    total += take[p];
  });
  var target = Math.min(cfg.size, pot);
  while (total < target) {
    var placed = false;
    for (var i = 0; i < order.length && total < target; i++) {
      if (take[order[i]] < avail[order[i]]) { take[order[i]]++; total++; placed = true; }
    }
    if (!placed) break;
  }
  /* Pools, die ihre Quote nicht erfüllen konnten – der Rest wurde ergänzt */
  var lacking = order.filter(function (p) { return avail[p] < cfg.quota[p]; })
    .map(function (p) { return t("pool" + p) + " " + avail[p] + "/" + cfg.quota[p]; });
  return { order: order, take: take, avail: avail, size: total, wanted: cfg.size, lacking: lacking };
}
function examQuestions(lvl) {
  var plan = examPlan(lvl), out = [];
  plan.order.forEach(function (p) {
    out = out.concat(shuffle(poolQuestions(p)).slice(0, plan.take[p]));
  });
  return shuffle(out);
}

/* Kapitel, die auf dieser Stufe im Lernpfad erscheinen */
function chaptersFor(lvl) {
  return CONTENT.filter(function (c) {
    if (c.id === 15 && !state.nat) return false;
    return true;
  });
}
function chapterDone(lvl, chId) {
  var p = prog(lvl);
  var qs = questionsFor(lvl, chId);
  if (!qs.length) return !!p.read[chId];
  return p.quiz[chId] != null && p.quiz[chId] >= LEVELS[lvl].quizPass;
}
function levelStats(lvl) {
  var chs = chaptersFor(lvl), done = 0;
  chs.forEach(function (c) { if (chapterDone(lvl, c.id)) done++; });
  return { total: chs.length, done: done, ready: done === chs.length };
}

/* ---------- Routing ------------------------------------------------------ */
function go(view) { state.view = view; window.scrollTo(0, 0); render(); }

/* ---------- Rendering: Kopf ---------------------------------------------- */
function renderHeader() {
  var langs = Object.keys(window.IFA_I18N);
  el("hdrTitle").innerHTML = esc(t("appTitle")) + "<small>" + esc(t("appSub")) + "</small>";
  el("langSel").innerHTML = langs.map(function (L) {
    return '<button class="hdr-btn' + (L === state.lang ? " on" : "") + '" data-lang="' + L + '">' +
      esc(L.toUpperCase()) + "</button>";
  }).join("");
  el("btnSettings").textContent = t("settings");
}

/* ---------- View: Startseite --------------------------------------------- */
function viewHome() {
  var cards = LEVEL_ORDER.map(function (L) {
    var cfg = LEVELS[L], st = levelStats(L), p = prog(L);
    var qn = examPlan(L).size;
    var started = st.done > 0 || p.exam;
    return '' +
      '<div class="card lvl" data-go="level:' + L + '">' +
        '<div class="lvl-badge">' + L + "</div>" +
        "<h3>" + esc(lvlName(L)) + "</h3>" +
        "<p>" + esc(t("lvl" + L + "desc")) + "</p>" +
        '<div class="bar' + (st.ready ? " ok" : "") + '"><i style="width:' +
          (st.total ? (st.done / st.total) * 100 : 0) + '%"></i></div>' +
        '<div class="pct">' + st.done + " / " + st.total + " " + esc(t("modulesDone")) + "</div>" +
        "<dl>" +
          "<dt>" + esc(t("examQuestions")) + "</dt><dd>" + qn + "</dd>" +
          "<dt>" + esc(t("passMark")) + "</dt><dd>" + cfg.pass + " %</dd>" +
          "<dt>" + esc(t("retakeMark")) + "</dt><dd>" + cfg.retake + " %</dd>" +
        "</dl>" +
        '<div class="btnrow"><span class="btn sm">' +
          esc(started ? t("continueLevel") : t("startLevel")) + " →</span></div>" +
      "</div>";
  }).join("");

  return "" +
    "<h1>" + esc(t("homeTitle")) + "</h1>" +
    '<p class="lead">' + esc(t("homeLead")) + "</p>" +
    "<h2>" + esc(t("chooseLevel")) + "</h2>" +
    '<div class="levels">' + cards + "</div>" +
    '<div class="hint" style="margin-top:34px"><b>' + esc(t("sources")) + ":</b> " +
      esc(t("sourcesText")) + "</div>";
}

/* ---------- View: Lernpfad einer Stufe ----------------------------------- */
function viewLevel(lvl) {
  var cfg = LEVELS[lvl], st = levelStats(lvl), p = prog(lvl);
  var chs = chaptersFor(lvl);

  var list = chs.map(function (c, idx) {
    var qs = questionsFor(lvl, c.id);
    var done = chapterDone(lvl, c.id);
    var sub, badge;
    if (!qs.length) {
      sub = t("noQuestions");
      badge = done ? '<span class="badge ok">✓</span>' : "";
    } else if (done) {
      sub = nQuestions(qs.length) + " · " + fmtPct(p.quiz[c.id] || 0);
      badge = '<span class="badge ok">' + esc(t("quizDone")) + "</span>";
    } else {
      sub = nQuestions(qs.length);
      badge = '<span class="badge">' + esc(t("quizOpen")) + "</span>";
    }
    return '<li><button class="mod' + (done ? " done" : "") + '" data-go="chapter:' + lvl + ":" + c.id + '">' +
      '<span class="mod-n">' + (done ? "✓" : (idx + 1)) + "</span>" +
      '<span class="mod-b"><span class="mod-t">' + esc(localized(c.title)) +
        (c.id === 15 ? ' <span class="badge nat">' + esc(t("natBadge")) + "</span>" : "") +
      '</span><span class="mod-s">' + esc(sub) + "</span></span>" +
      '<span class="mod-c">' + badge + " ›</span>" +
      "</button></li>";
  }).join("");

  var plan = examPlan(lvl);
  var examN = plan.size;
  var mix = plan.order.filter(function (q) { return plan.take[q] > 0; })
    .map(function (q) { return plan.take[q] + " × " + t("pool" + q); }).join(" · ");
  var short = "";
  if (plan.size < plan.wanted) {
    short = '<div class="hint" style="margin:12px 0 0">' +
      esc(t("examShort", { wanted: plan.wanted, size: plan.size })) + "</div>";
  } else if (plan.lacking.length) {
    short = '<div class="hint" style="margin:12px 0 0">' +
      esc(t("examFilled", { pools: plan.lacking.join(", ") })) + "</div>";
  }
  var ex = p.exam;
  var examBox;
  if (!st.ready) {
    examBox = '<div class="card" style="padding:22px">' +
      '<span class="badge lock">' + esc(t("locked")) + "</span>" +
      "<p style=\"margin:10px 0 0;color:var(--muted)\">" + esc(t("examLocked")) + "</p></div>";
  } else {
    examBox = '<div class="card" style="padding:22px">' +
      "<p style=\"margin:0 0 6px;font-weight:700\">" + esc(t("examReady")) + "</p>" +
      "<p style=\"margin:0;color:var(--muted);font-size:14.5px\">" +
        esc(t("examIntro", { n: examN })) + "</p>" +
      '<p style="margin:10px 0 0;font-size:14.5px"><b>' + esc(t("examMix")) + ":</b> " +
        esc(mix) + "</p>" + short +
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
  }

  return "" +
    '<div class="crumb"><a href="#" data-go="home">← ' + esc(t("backToLevels")) + "</a></div>" +
    "<h1>" + esc(lvlName(lvl)) + "</h1>" +
    '<p class="lead">' + esc(t("lvl" + lvl + "desc")) + "</p>" +
    '<div class="grid2" style="margin-bottom:26px">' +
      '<div class="card stat"><div class="v">' + st.done + " / " + st.total + '</div><div class="l">' +
        esc(t("modulesDone")) + '</div><div class="bar' + (st.ready ? " ok" : "") + '"><i style="width:' +
        (st.total ? (st.done / st.total) * 100 : 0) + '%"></i></div></div>' +
      '<div class="card stat"><div class="v">' + cfg.pass + " % / " + cfg.retake + ' %</div><div class="l">' +
        esc(t("passMark")) + " · " + esc(t("retakeMark")) + "</div></div>" +
      '<div class="card stat"><div class="v">' + (ex ? fmtPct(ex.best) : "–") + '</div><div class="l">' +
        esc(t("bestExam")) + (ex ? "" : " (" + esc(t("noAttempt")) + ")") + "</div></div>" +
    "</div>" +
    "<h2>" + esc(t("learnPath")) + "</h2>" +
    '<p class="lead">' + esc(t("learnPathLead")) + "</p>" +
    '<ul class="mods">' + list + "</ul>" +
    "<h2>" + esc(t("examSection")) + "</h2>" + examBox +
    '<div class="btnrow"><button class="btn gho sm" data-reset="' + lvl + '">' +
      esc(t("resetLevel")) + "</button></div>";
}

/* ---------- View: Kapitel ------------------------------------------------ */
function blockHtml(b) {
  var x = esc(localized(b.x));
  var h = localized(b.h);
  var mark = fbMark(b.x, b.origin === "ppt");

  if (b.t === "rule") {
    return '<div class="blk rule">' +
      (b.n ? '<span class="num">' + esc(localized(b.n)) + mark + "</span>" : (mark ? '<span class="num">' + mark + "</span>" : "")) +
      "<p>" + x + "</p></div>";
  }
  if (b.t === "note") {
    return '<div class="blk note"><h4>' + esc(h || t("interpretation")) + mark + "</h4><p>" + x + "</p></div>";
  }
  if (b.t === "hall") {
    return '<div class="blk hall"><h4>' + esc(t("indoor")) + mark + "</h4><p>" + x + "</p></div>";
  }
  if (b.t === "sig") {
    var caps = b.caps ? localized(b.caps) : null;
    var imgs = (b.img || []).map(function (s, i) {
      var img = '<img src="assets/img/signals/' + esc(s) + '.jpg" alt="' + esc(h) + '" loading="lazy">';
      return caps && caps[i]
        ? "<figure>" + img + "<figcaption>" + esc(caps[i]) + "</figcaption></figure>"
        : "<figure>" + img + "</figure>";
    }).join("");
    return '<div class="blk sig">' +
      (imgs ? '<div class="sig-imgs">' + imgs + "</div>" : "") +
      '<div class="sig-b"><h4><span>' + esc(b.n) + ".</span>" + esc(h) + mark + "</h4><p>" + x + "</p></div></div>";
  }
  if (b.t === "img") {
    /* Diagramme tragen Beschriftungen im Bild und liegen je Sprache vor */
    var name = localized(b.src);
    /* Namen mit Schrägstrich (ppt/…, signals/…) sind bereits Pfade unterhalb
       assets/img/, alles andere liegt in signals/ */
    var src = "assets/img/" + (name.indexOf("/") >= 0 || name.indexOf("court") === 0
      ? name : "signals/" + name) + ".jpg";
    return '<figure class="blk figure" style="margin:0 0 14px"><img src="' + esc(src) + '" alt="' +
      esc(h) + '" loading="lazy">' +
      "<figcaption>" + (h ? "<b>" + esc(h) + "</b> " : "") + x + mark + fbMark(b.src, b.origin === "ppt") +
      "</figcaption></figure>";
  }
  if (b.t === "table") {
    var head = "<tr>" + localized(b.tbl.head).map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    var rows = localized(b.tbl.rows).map(function (r) {
      return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
    }).join("");
    return '<div class="blk tblwrap"><table class="data"><thead>' + head + "</thead><tbody>" + rows + "</tbody></table></div>";
  }
  return "";
}

function viewChapter(lvl, chId) {
  var c = chapterById(chId);
  if (!c) return viewLevel(lvl);
  var chs = chaptersFor(lvl);
  var idx = chs.map(function (x) { return x.id; }).indexOf(chId);
  var qs = questionsFor(lvl, chId);
  var done = chapterDone(lvl, chId);

  var vids = (c.videos || []).map(function (v) {
    return '<div class="vid"><div class="fr"><iframe src="https://www.youtube-nocookie.com/embed/' +
      esc(v.yt) + '" title="' + esc(localized(v.t)) +
      '" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>' +
      '<div class="cap">' + esc(localized(v.t)) + "</div></div>";
  }).join("");
  var slots = (c.slots || []).map(function (s) {
    return '<div class="slot"><b>' + esc(t("videoSlotTitle")) + "</b>" + esc(localized(s)) +
      '<br><code>' + esc(t("videoSlotHint")) + "</code></div>";
  }).join("");

  var quizBtn;
  if (!qs.length) {
    quizBtn = '<div class="hint">' + esc(t("noQuizForChapter")) + "</div>" +
      '<div class="btnrow"><button class="btn' + (done ? " sec" : "") + '" data-read="' + lvl + ":" + chId + '">' +
      (done ? "✓ " : "") + esc(t("markRead")) + "</button></div>";
  } else {
    quizBtn = '<div class="btnrow"><button class="btn" data-go="quiz:' + lvl + ":" + chId + '">' +
      esc(t("toQuiz")) + " (" + qs.length + ") →</button>" +
      (done ? '<span class="badge ok">' + esc(t("quizDone")) + "</span>" : "") + "</div>";
  }

  var nav = '<div class="btnrow" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:18px;margin-top:28px">' +
    (idx > 0 ? '<button class="btn gho sm" data-go="chapter:' + lvl + ":" + chs[idx - 1].id + '">← ' +
      esc(t("prevChapter")) + "</button>" : "<span></span>") +
    (idx < chs.length - 1 ? '<button class="btn sec sm" data-go="chapter:' + lvl + ":" + chs[idx + 1].id + '">' +
      esc(t("nextChapter")) + " →</button>" : "<span></span>") + "</div>";

  /* Abschnitte ohne offizielle englische Entsprechung – entweder unübersetzt
     oder als Arbeitsübersetzung gekennzeichnet (tr) */
  var untranslated = c.blocks.filter(function (b) {
    return b.origin !== "ppt" && (isFallback(b.x) || b.tr);
  }).length;
  var pptBlocks = (state.lang === "de") ? 0
    : c.blocks.filter(function (b) { return b.origin === "ppt"; }).length;
  var transWarn =
    (untranslated ? '<div class="hint">' + esc(t("transPartial", { n: untranslated })) + "</div>" : "") +
    (pptBlocks ? '<div class="hint">' + esc(t("transPptChapter", { n: pptBlocks })) + "</div>" : "");

  return "" +
    '<div class="crumb"><a href="#" data-go="home">' + esc(t("appTitle")) + '</a> › <a href="#" data-go="level:' +
      lvl + '">' + esc(lvlName(lvl)) + "</a> › " +
      esc(t("chapter")) + " " + esc(chId) + "</div>" +
    "<h1>" + esc(localized(c.title)) + "</h1>" +
    transWarn +
    (vids || slots ? "<h2>" + esc(t("videos")) + '</h2><div class="vids">' + vids + slots + "</div>" : "") +
    "<h2>" + esc(t("ruleText")) + " &amp; " + esc(t("interpretation")) + "</h2>" +
    c.blocks.map(blockHtml).join("") +
    quizBtn + nav;
}

/* ---------- Quiz-Engine -------------------------------------------------- */
function buildQuiz(lvl, chId, isExam) {
  var items = isExam ? examQuestions(lvl) : shuffle(questionsFor(lvl, chId));
  items = items.map(function (q) {
    /* Antwortreihenfolge mischen, korrekten Index mitführen */
    var order = shuffle(answers(q).map(function (_, i) { return i; }));
    return {
      q: q,
      order: order,
      correctPos: order.indexOf(q.c),
      picked: null
    };
  });
  return { lvl: lvl, ch: chId, exam: !!isExam, i: 0, items: items, checked: false, finished: false };
}

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

/* Videofrage: eingebetteter YouTube-Ausschnitt.
   clip = { yt: "VideoID", start: 128, end: 137 }  – Sekunden.
   Der Ausschnitt startet bei start und stoppt bei end; über die
   Bedienelemente lässt er sich beliebig oft wiederholen. */
function clipHtml(clip) {
  if (!clip || !clip.yt) return "";
  var src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(clip.yt) +
    "?start=" + (clip.start || 0) +
    (clip.end ? "&end=" + clip.end : "") +
    "&rel=0&modestbranding=1";
  return '<div class="qclip"><div class="fr"><iframe src="' + esc(src) +
    '" title="' + esc(t("clipTitle")) +
    '" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>' +
    '<div class="cap">' + esc(t("clipHint")) + "</div></div>";
}

/* Bildfrage: Foto zur Spielsituation vor den Antwortmöglichkeiten.
   shot = "ppt/ball-01" – Pfad unterhalb assets/img/ ohne Endung. */
function shotHtml(shot) {
  if (!shot) return "";
  return '<figure class="qshot"><img src="assets/img/' + esc(shot) + '.jpg" alt="' +
    esc(t("shotTitle")) + '" loading="lazy"><figcaption>' + esc(t("shotHint")) +
    "</figcaption></figure>";
}

function viewQuiz() {
  var z = state.quiz;
  if (!z) return viewHome();
  if (z.finished) return viewResult();

  var it = z.items[z.i];
  var q = it.q;
  var letters = ["A", "B", "C", "D", "E", "F"];

  var opts = it.order.map(function (origIdx, pos) {
    var cls = "opt";
    if (z.checked) {
      if (pos === it.correctPos) cls += " right";
      else if (pos === it.picked) cls += " wrong";
    } else if (pos === it.picked) cls += " sel";
    return '<button class="' + cls + '" data-opt="' + pos + '"' + (z.checked ? " disabled" : "") + ">" +
      '<span class="k">' + letters[pos] + "</span><span>" + esc(answers(q)[origIdx]) + "</span></button>";
  }).join("");

  var fb = "";
  if (z.checked && !z.exam) {
    var ok = it.picked === it.correctPos;
    fb = '<div class="fb ' + (ok ? "ok" : "no") + '"><b>' + esc(ok ? t("correct") : t("wrong")) + "</b>" +
      (ok ? "" : esc(t("correctAnswerIs")) + " " + esc(answers(q)[q.c])) +
      (q.ref ? '<div class="ref">' + esc(t("source")) + " " + esc(localized(q.ref)) + "</div>" : "") + "</div>";
  }

  var last = z.i === z.items.length - 1;
  var actions;
  if (z.exam) {
    actions = '<button class="btn" data-act="' + (last ? "finish" : "next") + '"' +
      (it.picked === null ? " disabled" : "") + ">" + esc(last ? t("finish") : t("nextQuestion")) + "</button>";
  } else if (!z.checked) {
    actions = '<button class="btn" data-act="check"' + (it.picked === null ? " disabled" : "") + ">" +
      esc(t("checkAnswer")) + "</button>";
  } else {
    actions = '<button class="btn" data-act="' + (last ? "finish" : "next") + '">' +
      esc(last ? t("finish") : t("nextQuestion")) + "</button>";
  }

  var answered = z.items.filter(function (x) { return x.picked !== null; }).length;

  var qWarn = (state.lang !== "de" && z.i === 0)
    ? '<div class="hint">' + esc(t("questionsTranslated")) + "</div>" : "";

  return "" +
    qWarn +
    '<div class="crumb">' + esc(z.exam ? t("examTitle") : t("quizTitle")) + " · " +
      esc(z.lvl) + (z.exam ? "" : " · " + esc(localized(chapterById(z.ch).title))) + "</div>" +
    '<div class="bar"><i style="width:' + ((z.i / z.items.length) * 100) + '%"></i></div>' +
    '<div class="card qbox" style="margin-top:16px">' +
      '<div class="qmeta"><span>' + esc(t("questionOf", { i: z.i + 1, n: z.items.length })) + "</span>" +
        "<span>" + (q.origin === "draft" ? '<span class="badge draft">' + esc(t("draftBadge")) + "</span> " : "") +
        (q.scope === "fed" ? '<span class="badge nat">' + esc(t("natBadge")) + "</span> " : "") +
        esc(t("chapter")) + " " + q.ch + "</span></div>" +
      '<div class="qtxt">' + esc(localized(q.q)) + "</div>" + clipHtml(q.clip) + shotHtml(q.shot) +
      '<div class="opts">' + opts + "</div>" + fb +
      '<div class="btnrow">' + actions +
        '<button class="btn gho sm" data-act="abort">' + esc(t("abort")) + "</button>" +
        '<span style="margin-left:auto;font-size:13px;color:var(--muted)">' + answered + " / " + z.items.length + "</span>" +
      "</div>" +
    "</div>";
}

function viewResult() {
  var z = state.quiz, cfg = LEVELS[z.lvl];
  var correct = z.items.filter(function (x) { return x.picked === x.correctPos; }).length;
  var n = z.items.length;
  var p = pct(correct, n);
  var passMark = z.exam ? cfg.pass : cfg.quizPass;
  var status, cls, text;

  if (p >= passMark) {
    status = t("passed"); cls = "pass";
    text = z.exam ? t("passedText", { lvl: lvlName(z.lvl) }) : t("quizPassedText");
  } else if (z.exam && p >= cfg.retake) {
    status = t("retake"); cls = "retry";
    text = t("retakeText", { pass: cfg.pass, retake: cfg.retake });
  } else {
    status = t("failed"); cls = "fail";
    text = z.exam ? t("failedText", { retake: cfg.retake }) : t("quizFailedText", { pass: passMark });
  }

  var review = z.items.map(function (x) {
    var ok = x.picked === x.correctPos;
    var aa = answers(x.q);
    var picked = x.picked === null ? "–" : aa[x.order[x.picked]];
    return '<div class="rq ' + (ok ? "yes" : "no") + '">' +
      '<div class="qq">' + (ok ? "✓ " : "✗ ") + esc(localized(x.q.q)) + "</div>" +
      '<div class="aa">' + esc(t("yourAnswer")) + " " + esc(picked) +
      (ok ? "" : "<br>" + esc(t("correctAnswerIs")) + " <b>" + esc(aa[x.q.c]) + "</b>") +
      (x.q.ref ? "<br>" + esc(t("source")) + " " + esc(localized(x.q.ref)) : "") +
      "</div></div>";
  }).join("");

  var actions = '<div class="btnrow" style="justify-content:center">' +
    '<button class="btn sec" data-act="again">' + esc(t("again")) + "</button>" +
    '<button class="btn" data-go="level:' + z.lvl + '">' + esc(t("backToPath")) + "</button>" +
    (z.exam && p >= cfg.pass ? '<button class="btn sec" data-go="cert:' + z.lvl + '">' +
      esc(t("getCertificate")) + "</button>" : "") + "</div>";

  return '<div class="card res ' + cls + '">' +
      '<div class="ring"><b>' + Math.round(p) + '%</b><span>' + esc(t("resultTitle")) + "</span></div>" +
      "<h2>" + esc(status) + "</h2>" +
      "<p><b>" + esc(t("scoreLine", { c: correct, n: n })) + "</b></p>" +
      "<p>" + esc(text) + "</p>" + actions +
    "</div>" +
    "<h2>" + esc(t("reviewAnswers")) + '</h2><div class="rlist">' + review + "</div>";
}

function finishQuiz() {
  var z = state.quiz;
  var correct = z.items.filter(function (x) { return x.picked === x.correctPos; }).length;
  var p = pct(correct, z.items.length);
  var pr = prog(z.lvl);
  if (z.exam) {
    var best = pr.exam && pr.exam.best > p ? pr.exam.best : p;
    pr.exam = { best: best, pct: p, c: correct, n: z.items.length, date: today() };
  } else {
    if (pr.quiz[z.ch] == null || p > pr.quiz[z.ch]) pr.quiz[z.ch] = p;
  }
  save();
  z.finished = true;
  window.scrollTo(0, 0);
  render();
}

/* ---------- View: Zertifikat --------------------------------------------- */
function viewCert(lvl) {
  var p = prog(lvl), ex = p.exam;
  if (!ex) return viewLevel(lvl);
  var name = (p.name || "");
  return "" +
    '<div class="crumb no-print"><a href="#" data-go="level:' + lvl + '">← ' + esc(t("backToPath")) + "</a></div>" +
    '<div class="cert">' +
      '<img src="assets/img/ifa-logo.png" alt="IFA">' +
      '<div class="kicker">' + esc(t("certKicker")) + "</div>" +
      "<h1>" + esc(t("certTitle")) + "</h1>" +
      '<div class="name" id="certName">' + (name ? esc(name) : '<span style="color:#aab">' + esc(t("certName")) + "</span>") + "</div>" +
      '<div class="body">' + esc(t("certBody", {
        lvl: lvlName(lvl), pct: Math.round(ex.best), c: ex.c, n: ex.n
      })) + "</div>" +
      '<div class="foot"><span>' + esc(t("certLevel")) + ": <b>" + esc(lvlName(lvl)) + "</b></span>" +
        "<span>" + esc(t("certDate")) + ": <b>" + esc(ex.date) + "</b></span></div>" +
      '<p style="font-size:12px;color:var(--muted);margin:18px 0 0">' + esc(t("certNote")) + "</p>" +
    "</div>" +
    '<div class="btnrow no-print" style="justify-content:center">' +
      '<input class="inp" id="nameInput" placeholder="' + esc(t("certName")) + '" value="' + esc(name) + '">' +
      '<button class="btn sec" data-act="savename">OK</button>' +
      '<button class="btn" data-act="print">' + esc(t("print")) + "</button>" +
    "</div>";
}

/* Der Schalter erscheint nur, solange es überhaupt Entwurfsfragen gibt.
   Nach der Freigabe verschwindet er von selbst; kommen später neue Entwürfe
   dazu, ist er wieder da. */
function draftSwitch() {
  var n = QUESTIONS.filter(function (q) { return q.origin === "draft"; }).length;
  if (!n) return "";
  return '<label class="sw"><input type="checkbox" id="swDraft"' + (state.draft ? " checked" : "") + ">" +
    "<span><b>" + esc(t("setDraft")) + ' <span class="badge draft">' + esc(t("draftBadge")) + "</span></b>" +
    '<div class="d">' + esc(t("setDraftDesc", { n: n })) + "</div></span></label>";
}

/* ---------- View: Einstellungen ------------------------------------------ */
function viewSettings() {
  return "" +
    '<div class="crumb"><a href="#" data-go="home">← ' + esc(t("appTitle")) + "</a></div>" +
    "<h1>" + esc(t("settings")) + "</h1>" +
    '<div class="card" style="padding:8px 20px;max-width:720px">' +
      '<label class="sw"><input type="checkbox" id="swNat"' + (state.nat ? " checked" : "") + ">" +
        "<span><b>" + esc(t("setNat")) + '</b><div class="d">' + esc(t("setNatDesc")) + "</div></span></label>" +
      draftSwitch() +
      '<div class="sw"><span><b>' + esc(t("setReset")) + '</b><div class="d">' + esc(t("setResetDesc")) + "</div>" +
        '<div class="btnrow"><button class="btn gho sm" data-act="resetall">' + esc(t("setResetBtn")) + "</button></div>" +
      "</span></div>" +
    "</div>" +
    '<div class="hint" style="max-width:720px"><b>' + esc(t("sources")) + ":</b> " + esc(t("sourcesText")) + "</div>";
}

/* ---------- Render ------------------------------------------------------- */
function render() {
  renderHeader();
  var v = state.view || { name: "home" };
  var html;
  switch (v.name) {
    case "level":    html = viewLevel(v.lvl); break;
    case "chapter":  html = viewChapter(v.lvl, v.ch); break;
    case "quiz":     html = viewQuiz(); break;
    case "cert":     html = viewCert(v.lvl); break;
    case "settings": html = viewSettings(); break;
    default:         html = viewHome();
  }
  el("app").innerHTML = html;
  document.documentElement.lang = state.lang;
}

/* ---------- Events ------------------------------------------------------- */
document.addEventListener("click", function (e) {
  var n;

  n = e.target.closest("[data-lang]");
  if (n) { state.lang = n.getAttribute("data-lang"); save(); render(); return; }

  n = e.target.closest("[data-go]");
  if (n) {
    e.preventDefault();
    var parts = n.getAttribute("data-go").split(":");
    if (parts[0] === "home") return go({ name: "home" });
    if (parts[0] === "settings") return go({ name: "settings" });
    if (parts[0] === "level") return go({ name: "level", lvl: parts[1] });
    if (parts[0] === "chapter") return go({ name: "chapter", lvl: parts[1], ch: parseInt(parts[2], 10) });
    if (parts[0] === "cert") return go({ name: "cert", lvl: parts[1] });
    if (parts[0] === "quiz") {
      state.quiz = buildQuiz(parts[1], parseInt(parts[2], 10), false);
      return go({ name: "quiz" });
    }
    if (parts[0] === "exam") {
      var ni = el("examName");
      return startExam(parts[1], ni ? ni.value : prog(parts[1]).name);
    }
    return;
  }

  n = e.target.closest("[data-read]");
  if (n) {
    var pr = n.getAttribute("data-read").split(":");
    var p = prog(pr[0]);
    var cid = parseInt(pr[1], 10);
    p.read[cid] = !p.read[cid];
    save(); render(); return;
  }

  n = e.target.closest("[data-reset]");
  if (n) {
    if (confirm(t("resetConfirm"))) {
      delete state.progress[n.getAttribute("data-reset")];
      save(); render();
    }
    return;
  }

  n = e.target.closest("[data-opt]");
  if (n && state.quiz && !state.quiz.finished) {
    var z = state.quiz;
    if (z.checked) return;
    z.items[z.i].picked = parseInt(n.getAttribute("data-opt"), 10);
    render(); return;
  }

  n = e.target.closest("[data-act]");
  if (n) {
    var act = n.getAttribute("data-act");
    var q = state.quiz;
    /* Schutz: ohne Antwortauswahl darf nicht weitergeschaltet werden */
    if (q && !q.finished && (act === "check" || act === "next" || act === "finish")) {
      if (q.items[q.i].picked === null) return;
      if (act === "next" && !q.exam && !q.checked) return;
      if (act === "finish" && !q.exam && !q.checked) return;
    }
    if (act === "check" && q) { q.checked = true; return render(); }
    if (act === "next" && q) { q.i++; q.checked = false; window.scrollTo(0, 0); return render(); }
    if (act === "finish" && q) return finishQuiz();
    if (act === "abort" && q) {
      if (confirm(t("abortConfirm"))) { var l = q.lvl; state.quiz = null; go({ name: "level", lvl: l }); }
      return;
    }
    if (act === "again" && q) {
      if (q.exam) return startExam(q.lvl, prog(q.lvl).name);
      state.quiz = buildQuiz(q.lvl, q.ch, q.exam);
      window.scrollTo(0, 0); return render();
    }
    if (act === "savename") {
      var inp = el("nameInput");
      if (inp) { prog(state.view.lvl).name = inp.value.trim(); save(); render(); }
      return;
    }
    if (act === "print") { window.print(); return; }
    if (act === "resetall") {
      if (confirm(t("setResetConfirm"))) { state.progress = {}; save(); render(); }
      return;
    }
  }
});

document.addEventListener("change", function (e) {
  if (e.target && e.target.id === "swNat") {
    state.nat = e.target.checked; save(); render();
  }
  if (e.target && e.target.id === "swDraft") {
    state.draft = e.target.checked; save(); render();
  }
});

/* ---------- Start -------------------------------------------------------- */
load();
go({ name: "home" });

})();
