# Fistball Referee Education

*[Deutsche Fassung: `README.de.md`](README.de.md)*

Training programme for fistball referees at **regional and national level**, bilingual in German and
English. Intended for member federations of the International Fistball Association that train their
own referees.

**→ [`app/`](app/) holds the application, [`app/README.md`](app/README.md) the technical documentation.**

**▶ Live version: <https://chrashkidgrimes.github.io/fistball-referee-education/>** — updated automatically on every push to `main`.

---

## What this is

A static web app with no server and no build step; the only third-party code is a small QR-code
library kept in the repository. Opening `app/index.html` in a
browser is enough — locally by double-click, on GitHub Pages or on any web space. Learning progress
lives in the browser's `localStorage`; there are no accounts and no data leaves the device.

**Certificate.** Passing the final exam produces a certificate with a verification code as a QR
code. Scanning it opens the app's *Verify certificate* page, which shows name, level, date, attempt
and every answer, and recalculates the score. The exam is unsupervised and the checksum is not a
secret: the code proves that the certificate has not been altered, not who answered the questions.

| | |
|---|---|
| Chapters | 16 — rules 1 to 10, hand signals, conduct of the referee, linesmen, age groups, federation regulations, duties around the match |
| Exam questions | 234, all bilingual, each with a reference into the rule book |
| Images | 21 hand-signal photos, court and run-off diagrams, six ball-in-or-out decisions; 19 of them used as image questions |
| Final exams | Regional 40 questions from 70 %, National 60 from 85 %, each with a retake threshold |
| Tests | 319 automated checks |

## Sources

- IFA Rules of the Game 2025 / IFA-Spielregeln 2025, valid from 1 April 2025
- IFA Training Manual for Referees 2025 / IFA-Schulungsmappe für Schiedsrichter 2025
- Training slide decks by Faustball Deutschland, cleared for use in an IFA context
- Moodle question banks of Faustball Deutschland

The source documents themselves are **not** in this repository. The Rules of the Game require IFA
approval for copies — including extracts — and the slide decks and question banks belong to Faustball
Deutschland. To regenerate the data files, place the documents in this folder; which files are expected
is described in [`app/tools/generate/README.md`](app/tools/generate/README.md).

The app itself contains rule texts, photos and diagrams from those documents. Distributing it beyond
internal use requires IFA approval — see the open points.

## What is still open

[`OFFENE-PUNKTE.md`](OFFENE-PUNKTE.md) tracks the current state (in German). The three biggest items:

1. **Should the exam count?** The pass marks come from a supervised individual examination. In a
   self-service app the result screen reveals every answer, and the score sits in the browser where it
   can be edited. This decides whether the app trains or examines.
2. **Sign off the English version.** Rule texts and most interpretations are taken verbatim from the
   official English editions. The exam questions and the content from the slide decks are working
   translations, marked as such in the data and flagged in the app.
3. **Ownership and approvals.** Logo, rule texts and question bank belong to the IFA and to Faustball
   Deutschland. Whether this becomes an IFA product or an export from Faustball Deutschland also
   determines who maintains it after the next rule change.

## Provenance records

- [`Fragen-Nachweis.md`](Fragen-Nachweis.md) — for each of the first 75 added questions the source
  passage the answer rests on, in German and English.
- [`Fragen-Nachweis-Spielleitung.md`](Fragen-Nachweis-Spielleitung.md) — the same for the 39 questions
  on hand signals, conduct, linesmen and the duties around the match.
- [`app/assets/img/signals/manifest.json`](app/assets/img/signals/manifest.json) — the origin of every
  hand-signal photo by page and position in the source document.

## Legal

Logo and image material © International Fistball Association. Use of the logo only in agreement with
the IFA (marketing@fistball.sport). Rule texts © IFA; copies — including extracts — require IFA
approval. The app's certificate attests an exam taken unsupervised and does not replace the licence award by
a member federation.
