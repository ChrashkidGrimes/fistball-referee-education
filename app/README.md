# IFA Referee Education — Web App

*[Deutsche Fassung: `README.de.md`](README.de.md)*

Training programme for fistball referees at **regional and national level**.
A static web app with no server, no build step; the only third-party code is a small QR-code
library kept in the repository. Runs by double-clicking
`index.html`, on GitHub Pages, SharePoint or any web space.

**Sources:** IFA Rules of the Game 2025 / IFA-Spielregeln 2025 (valid from 1 April 2025),
IFA Training Manual for Referees 2025 / IFA-Schulungsmappe für Schiedsrichter 2025,
Moodle question banks of Faustball Deutschland.
**Design:** per `ifa_logo_datasheet.pdf` — primary colour C100 M95 Y15 K20 = `#25276A`, black, white.

---

## Getting started

```
open index.html in a browser
```

Progress, language and settings are stored in the browser's `localStorage` — per device, without an
account and without a server.

---

## Contents

| | |
|---|---|
| Chapters | 16 (rules 1–10, hand signals, conduct, linesmen, age groups, federation regulations, duties around the match) |
| Rule-text blocks | 90 numbered rules, verbatim from the official editions |
| Interpretations | 51 explanatory notes from the Training Manual |
| Hand signals | 18 signals with 21 photos (16 from the Training Manual, 2 from the slide decks), 13 of them used as image questions |
| Languages | German and English, complete — 226 content blocks and 234 questions in both languages |
| Exam questions | 234 bilingual: 121 from the Faustball Deutschland catalogue, 104 derived from the rules and Training Manual, 9 from the slide decks |

### Licence levels

| Level | Questions | Pass | Retake from | Chapter quiz |
|-------|-----------|------|-------------|--------------|
| Regional (`R`) | 40 | 70 % | 65 % | 70 % |
| National (`N`) | 60 | 85 % | 75 % | 85 % |

The **learning path is identical for both levels**: all 16 chapters, the same chapter quizzes. The
levels differ only in the size and pass mark of the final exam, and in the mark at which a chapter
quiz counts as completed.

### Topic pools

A pool is a **subject area, not a difficulty tier**. Both exams draw from all pools; the pool only
ensures that every exam covers the rule book evenly. Which pool carries a question follows from its
chapter — new questions therefore sort themselves in automatically.

| Pool | Chapters | available | Regional | National |
|------|----------|-----------|----------|----------|
| `feld` — court and equipment | 1 | 45 | 7 | 10 |
| `rahmen` — team, time, age groups | 2, 3, 14 | 40 | 7 | 10 |
| `spiel` — rally, hit, service | 4, 5, 6 | 32 | 8 | 12 |
| `ballfuehrung` — return, pass, scoring | 7, 8 | 27 | 7 | 10 |
| `leitung` — match control | 9–13, 16 | 63 | 7 | 12 |
| `verband` — federation regulations (can be switched off) | 15 | 27 | 4 | 6 |
| | | **234** | **40** | **60** |

The quotas deliberately do **not** follow the pool sizes. Chapter 1 makes up 19 % of the catalogue but
only 17 % of the exam — it consists largely of measurements and figures. The `leitung` pool conversely
carries 20 % of the national exam; that is where the judgement lies which justifies the higher licence.

Questions are drawn afresh for every attempt, and **order and answer options are shuffled**. There is
no feedback during the exam; the result screen with references comes at the end. Chapter quizzes, by
contrast, give immediate feedback including the rule reference.

If a federation switches the federation regulations off, 204 questions remain. The other pools then
fill up so that the question count stays the same; the level page says so, because the emphasis shifts.

---

## Customising

### Exam size and pass marks

`assets/js/app.js`, at the very top:

```js
var POOLS = {
  feld:         [1],
  rahmen:       [2, 3, 14],
  spiel:        [4, 5, 6],
  ballfuehrung: [7, 8],
  leitung:      [9, 10, 11, 12, 13, 16],
  verband:      [15]
};

var LEVELS = {
  R: { pass: 70, retake: 65, quizPass: 70,
       exam: { size: 40, quota: { feld: 7, rahmen: 7, spiel: 8,
                                  ballfuehrung: 7, leitung: 7, verband: 4 } } },

  N: { pass: 85, retake: 75, quizPass: 85,
       exam: { size: 60, quota: { feld: 10, rahmen: 10, spiel: 12,
                                  ballfuehrung: 10, leitung: 12, verband: 6 } } }
};
```

- `POOLS` — which chapters form which topic pool. A chapter belongs to exactly one pool; chapters
  without a pool never appear in an exam.
- `exam.size` — number of questions in the exam
- `exam.quota` — distribution across the pools; the sum must equal `size`
- `quizPass` — mark at which a chapter quiz counts as completed

If a pool falls short — for instance because the federation regulations are switched off — the
remaining pools fill up in the order noted above, and the app says so on the level page. Were the exam
still too short, it would simply be shorter. With the current split that does not happen: even without
the federation regulations both levels reach their full question count.

Adding a new level means: an entry in `LEVELS`, its key in `LEVEL_ORDER`, plus the keys `lvl<X>Name`
and `lvl<X>desc` in `assets/js/i18n.js`.

### Verification code

`assets/js/cert-code.js` encodes the best passed attempt as
`1|level|date|attempt|name|score|ID:answer,…`, UTF-8, base64url, plus a CRC32 checksum. The
certificate shows it as a QR code pointing to `#verify=<code>`; under `file://` it points to the
published address (`PUBLIC_URL` in `app.js`). For a 60-question exam the link is about 1,200
characters; the QR code is printed about 5 cm wide. The verify page decodes it, checks the checksum
and recalculates the score against the current catalogue. `decode` also rejects codes whose fields
do not match the expected format (level R/N, ISO date, numeric attempt, score of at most 100,
`ID:index` entries), even with a matching checksum. A code with a valid checksum that cannot
come from a real exam (score below the pass mark, wrong number of questions, duplicate questions)
is shown with a warning. After a failed attempt the exam is locked for
24 hours (`EXAM_LOCK_MS`). Resetting progress, per level or "all data", deletes the learning
progress but keeps the attempt counter and the lock; otherwise the app's own button would bypass the
wait. QR codes come from `assets/js/vendor/qrcode.js` (qrcode-generator 1.4.4, MIT, Kazuhiko Arase).

### Progress from the three-level version

Until August 2026 the levels were C, B and A. `LEVEL_MIGRATION` in `app.js` converts stored progress on
first start: C becomes Regional, B and A are merged into National — per chapter and for the exam the
better result wins. The converted state is written back immediately; a second start leaves it alone.

### Adding videos

`assets/js/data-content.js`, per chapter:

```json
"videos": [ { "yt": "q342pxvhdTU", "t": { "de": "Titel", "en": "Title" } } ],
"slots":  [ "Blocksituation aus Schiedsrichterperspektive" ]
```

`yt` is the YouTube video ID (the part after `watch?v=`). Entries in `slots` appear in the app as a
dashed placeholder with a topic description — those are the clips still to be produced.

Currently embedded:

| Chapter | Video |
|---------|-------|
| 1 Court and equipment | This is Fistball – Rules (IFA Fistball Channel) |
| 4 Rally | Offizielle Spielregeln – Faustball / Official Rules – Fistball |
| 6 Service | Die Angabe (Heiner Josuttis) |

Open video slots: chapters 2, 3, 5, 7 (3 clips), 9, 10, 11, 13.

### Languages

**Interface:** `assets/js/i18n.js` holds all interface texts. For a new language: copy the `de` block,
change the key, translate the values — the language switch in the header appears automatically.
Missing keys fall back to German.

**Teaching content:** in `data-content.js` every text field is a language object:

```json
{ "t": "rule", "n": "1.1", "x": { "de": "Das Spielfeld ist …", "en": "The court is …" } }
```

For a further language an additional key in the same object is enough.

**Exam questions** use the same structure, including the answer lists:

```json
{ "q": { "de": "…", "en": "…" },
  "a": { "de": ["…","…","…","…"], "en": ["…","…","…","…"] },
  "c": 0, "ref": { "de": "…", "en": "…" }, "tr": true }
```

`c` is the index of the correct answer and applies to both languages — the answer order is identical
in both lists.

**Origin of the English version.** All numbered rules and 56 of 59 interpretations are taken verbatim
from the official English IFA editions. Everything else is a working translation and is marked as such:

| What | Extent | Marking |
|------|--------|---------|
| Interpretations without an English counterpart | 2 | `tr: true`, note in the chapter |
| Content from the training slide decks | 47 | `origin: "ppt"`, separate note in the chapter |
| Exam questions | all 234 | `tr: true`, note in the quiz |

For the questions the German wording prevails; the app says so in English mode.

### Origin of the questions

| `origin` | Count | Where from |
|----------|-------|------------|
| `fbd` | 121 | Moodle question banks of Faustball Deutschland, adopted with language corrections (25 October 2026) |
| `ifa` | 104 | derived from rule text, the interpretations in the Training Manual and the referee regulations, approved |
| `ppt` | 9 | from the Faustball Deutschland slide decks: six image questions on ball-in-or-out decisions (“01 Spielfeld und Geräte”), signal 18, replacing line judges, scoring entries; approved |

Of the 114 added questions, 19 are answered from a photo and the rest from text. `Fragen-Nachweis.md`
and `Fragen-Nachweis-Spielleitung.md` in the parent folder record which source passage each one rests
on — the evidence for why an answer is correct.

**Putting new questions up for review.** Anyone adding questions that have not been signed off sets
`"origin": "draft"`. Such questions carry a marker in the quiz, and a toggle to switch them off appears
automatically under **Settings**. If the catalogue contains no drafts, the toggle is hidden. After
sign-off, set `origin` to `ifa`.

### Video questions

`assets/js/data-clips.js` holds questions preceded by a video excerpt:

```js
clip: { yt: "VideoID", start: 128, end: 137 }
```

As long as `yt` is empty the question stays out of the question pool — unfinished templates therefore
do no harm. Eight templates on blocking, jump service, ball under the tape, obstruction and hitting
technique are prepared and await a video ID and seconds. In the video, right-click → “Copy video URL
at current time” gives the start second directly.

### Content from the training slide decks

47 blocks were adopted from the eleven slide decks of Faustball Deutschland (cleared for use in an IFA
context). They carry `"origin": "ppt"`. There is no official English edition for them, so the English
version is a working translation — the chapter says so in English mode.

What was adopted:

| Where | What |
|-------|------|
| Chapter 1 | Six “in or out” photos with the decision, indoor photos on wall and ceiling, court and run-off diagrams, post and cord |
| Chapter 5 | Table of hitting variants, eight cases permitted / not permitted |
| Chapter 6 | Method for watching the service, position per service type, step-change service |
| Chapter 7 | Position for the return, sequence of gaze at the block, “click and clack” |
| Chapter 8 | Supervision of the scorer |
| Chapter 9 | Two-referee system indoors |
| Chapter 11 | Signal 17 crossing into the opponent's half, signal 18 tie, warning note on the block signal |
| Chapter 13 | Clothing of the linesmen, briefing before the match, aerial view of the positions |
| Chapter 16 | Duties before, during and after the match from the referee regulations |

The image files are in `assets/img/ppt/`; the Faustball Deutschland branding of the slides sat only in
the slide frame and was not carried over.

### Image questions

Questions with a photo of a match situation carry the `shot` field:

```js
{ id: "IFA-BILD-001", shot: "ppt/ball-01", q: "…", a: [ … ], c: 0 }
```

`shot` is a path below `assets/img/` without an extension. The six ball-in-or-out decisions use the
same photos as the image series in chapter 1 — there with the decision, in the quiz without.

### Federation regulations

30 questions come from the German playing regulations (SpOF), referee regulations (SRO) and the
Faustball Deutschland competition rules. They are marked `"scope": "fed"` and can be switched off under
**Settings → Include federation regulations**. Other member federations switch them off or replace
chapter 15 with their own regulations.

---

## Tests

```
cd tests
npm install
npm test
```

| File | Scope |
|------|-------|
| `app.test.js` | Navigation, chapter content, quiz and exam flow, certificate, switching off the federation regulations, image mapping of the hand signals, migration of progress from the three-level version (49 checks) |
| `cert.test.js` | Verification code (encoding, checksum, validation of the code fields, recalculation), name before the exam, attempt counter and 24-hour wait, retake band counts as fail, reset keeps attempt counter and lock, certificate with QR code, verify page (96 checks) |
| `exam-thresholds.test.js` | Exams per licence level at defined hit rates; verifies pass / retake / fail, including the cases exactly on the threshold (16 checks) |
| `exam-composition.test.js` | Size and pool distribution of the exams, weighting, variation between attempts, behaviour with the federation regulations switched off (25 checks) |
| `i18n.test.js` | Display of the German and English content, marking of the slide-deck content, language-dependent diagrams (37 checks) |
| `bilingual.test.js` | Completeness of both languages in content, questions and interface; hunts for German remnants in the English DOM of chapters, quiz and result screen (25 checks) |
| `questions.test.js` | Origin and references of all questions, coverage of all 16 chapters, draft mechanism, image and video questions (73 checks) |
| `docs.test.js` | Keeps the figures in all four READMEs in step with the data: question count, pool sizes, origin table, level thresholds, list of test files (81 checks) |
| `manual-abgleich.test.js` | Checks every English interpretation against the official editions, and that no rule text has swallowed an interpretation — by content and by the length ratio between German and English. Skips the full-text part when the PDFs are absent (16 checks) |

### Regenerating the images

```
python3 tools/map_signals.py ../33d_IFA-Schulungsmappe-fur-Schiedsrichter-2025.pdf \
                             ../33_IFA-Training-Manual-for-Referees-2025.pdf
```

The order of image objects in the PDF does **not** match reading order — on page 27 the image for
signal 14 comes first. The script therefore maps by vertical position: every image belongs to the
signal heading nearest to it. It writes `assets/img/signals/manifest.json` with the origin of each
image (page and index), and `app.test.js` checks `data-content.js` against it.

Only signal 1 (two phases) and signal 16 (three flag positions) have multiple parts; all others have
exactly one image. Requires `pdfplumber`, `Pillow` and `pdfimages`.

### Labelled diagrams

Four images carry text inside the image and therefore exist in both languages — the court plan and the
three linesman positions. When the language is switched, the app swaps them. In `data-content.js` the
`src` field is a language object for these:

```json
{ "t": "img", "src": { "de": "court", "en": "court-en" } }
```

The hand signals are pure photographs without text and are not kept in duplicate.

> **Note on the source:** in the German Training Manual, diagrams 2 and 3 already carry an English
> legend (Player, Ball, 1st Referee …); only diagram 1 is labelled in German. The app reproduces this
> unchanged. A clean German version would have to be requested from the IFA.

---

## Files

```
index.html                     Skeleton
assets/css/app.css             Design per IFA specification
assets/js/i18n.js              Interface texts (DE, EN)
assets/js/data-content.js      Chapters, rule texts, interpretations, videos — bilingual (generated)
assets/js/data-questions.js    234 exam questions with answers                          (generated)
assets/js/data-clips.js        Video questions — template for video ID and time marks
assets/js/app.js               Application logic
assets/img/                    IFA logo, diagrams, hand signals, photos from the slide decks
tests/                         Automated tests
```

The two generated files are derived from the PDFs and the Moodle XML exports in the parent folder.

---

## Legal

Logo and image material: © International Fistball Association. Use of the logo only in agreement with
the IFA (marketing@fistball.sport). Rule texts © IFA; copies — including extracts — require IFA
approval. The app's certificate attests an exam taken unsupervised and does not replace the licence award by
a member federation.

### Generators

`assets/js/data-content.js` and `assets/js/data-questions.js` are generated files. The scripts in
`tools/generate/` record how they came about — see `tools/generate/README.md`. That matters above all
for the next edition of the rules: without the generators the data files would be an artefact nobody
could trace or reproduce.
