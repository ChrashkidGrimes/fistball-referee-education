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
