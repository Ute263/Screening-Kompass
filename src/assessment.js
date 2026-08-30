export const HELP_LEVELS = [
  { value: "none", label: "ohne Hilfe" },
  { value: "hint", label: "nach kurzem Hinweis" },
  { value: "model", label: "nach Vormachen / visueller Unterstützung" },
  { value: "support", label: "mit deutlicher Unterstützung" }
];

export const OUTCOME_LEVELS = [
  { value: "secure", label: "gelungen" },
  { value: "partial", label: "teilweise gelungen" },
  { value: "not", label: "noch nicht gelungen" },
  { value: "nb", label: "nicht beurteilbar" }
];

const count = (total, task, page, options = {}) => ({ type: "count", total, task, page, ...options });
const outcome = (task, page, options = {}) => ({
  type: "count",
  total: options.total ?? 3,
  editableTotal: true,
  unit: options.unit || "Beobachtungen",
  task,
  page,
  ...options
});

// Die Spezifikationen orientieren sich an den konkreten Aufgaben des Screening-Baukastens.
// Wo ein App-Beobachtungspunkt mehrere Originalaufgaben bündelt, wird bewusst qualitativ
// dokumentiert statt eine künstliche Gesamtpunktzahl zu bilden.
export const ASSESSMENT_SPECS = {
  "B3:1": outcome("B3 – bekannte Abläufe im Schulvormittag: Ankommen, Orientieren und einem bekannten Ablauf folgen.", 16),
  "B3:2": outcome("B3 – Material holen, ordnen und wichtige Dinge im Schulalltag selbstständig finden.", 16),
  "B3:3": outcome("B3 – nach einem Signal eine bekannte Aufgabe beginnen.", 16),
  "B3:4": outcome("B3 – 5 / 10 / 20 Minuten bei einer überschaubaren Aufgabe bleiben.", 16),
  "B3:5": outcome("B3 – zwischen Tätigkeiten bzw. Unterrichtssituationen wechseln.", 16),

  "B4:1": outcome("B4 – auf Ansprache reagieren und einfache soziale bzw. kommunikative Signale verstehen.", 17),
  "B4:2": outcome("B4 – Unsicherheit oder fehlendes Verstehen verbal, gestisch oder mit Hilfsmittel anzeigen.", 17),
  "B4:3": outcome("B4 – Bedürfnisse, Wünsche oder Ablehnung verständlich mitteilen.", 17),
  "B4:4": outcome("B4 – Kontakt verbal, gestisch oder mit Hilfsmittel initiieren.", 17),
  "B4:5": outcome("B4 – sich abwechseln, warten und einfache soziale Signale beachten.", 17),

  "S1:1": outcome("S1 · Aufgabe 1 – 3–5 ausgewählte Einzellaute in bekannten Wörtern nachsprechen.", 18),
  "S1:2": outcome("S1 · Aufgabe 2 – mehrsilbige Wörter nachsprechen, z. B. Banane, Schokolade, Schmetterling.", 18),
  "S1:3": outcome("S1 · Aufgabe 3 – eine vertraute Alltagsszene verständlich beschreiben.", 18),
  "S1:4": outcome("S1 · Aufgabe 4 – Lautstärke in Gespräch und Unterrichtssituation passend anpassen.", 18),
  "S1:5": outcome("S1 · Aufgabe 4 – Sprechtempo so anpassen, dass die Äußerung verständlich bleibt.", 18),
  "S1:6": outcome("S1 · Aufgabe 5 – einen bekannten Satz oder eine Bildfolge mit passender Betonung erzählen.", 18),
  "S1:7": outcome("S1 · Aufgabe 6 – Gegenstände und Handlungen ohne lange Suchpausen benennen.", 18),
  "S1:8": outcome("S1 · Aufgabe 7 – einen Gedanken zu einem vertrauten Erlebnis ohne häufige Satzabbrüche aussprechen.", 18),
  "S1:9": outcome("S1 · Aufgabe 8 – eine Bildfolge nachvollziehbar mit zuerst – dann – am Ende ordnen und versprachlichen.", 18),

  "W1:1": outcome("W1 – auf Arbeitsblatt / Buch die richtige Stelle finden und eine Zeile geordnet durchsuchen.", 41),
  "W1:2": outcome("W1 – einen Zielreiz bzw. eine Figur vor unruhigem Hintergrund erkennen.", 41),
  "W1:3": outcome("W1 – ähnliche Formen, Buchstaben oder Ziffern unterscheiden.", 41),
  "W1:4": outcome("W1 – Muster und räumliche Anordnungen passend kopieren.", 41),
  "W1:5": outcome("W1 – kurze visuelle Arbeit ohne deutliche Ermüdung bewältigen.", 41),

  "W2:1": count(8, "W2 – Identisches finden: Zielkarte zeigen und aus 4, später 8 Formen die genau gleiche auswählen.", 42),
  "W2:2": count(6, "W2 – Ähnliches unterscheiden: Kreis/Oval, Quadrat/Rechteck, offene/geschlossene Form paaren.", 42),
  "W2:3": count(12, "W2 – Figur-Grund: auf Material I alle Dreiecke markieren; Suchweg beobachten.", 42),
  "W2:4": count(6, "W2 – Raumlage: Formen nach Vorlage oben, unten, links, rechts und zwischen legen.", 42),
  "W2:5": outcome("W2 – visuelle Folge: 3 Formen 5 Sekunden zeigen, verdecken und in gleicher Reihenfolge legen; bis 5 steigern.", 42),
  "W2:6": count(3, "W2 – Muster ergänzen: AB, AAB und ABC fortsetzen und die Regel mit neuen Formen übertragen.", 42),

  "W3:1": outcome("W3 – bekannte Umweltgeräusche unterscheiden.", 43),
  "W3:2": outcome("W3 – ähnlich klingende Silben unterscheiden: ma–na, pa–ba, ta–ka.", 43),
  "W3:3": outcome("W3 – gleiche Lautanfänge bzw. lautliche Übereinstimmungen erkennen.", 43),
  "W3:4": outcome("W3 – kurze Wörter / Silben auditiv gliedern bzw. Silbenfolgen nachsprechen.", 43),
  "W3:5": outcome("W3 – Laut-, Wort-, Zahl- oder Rhythmusfolgen mit 2, 3 und 4 Elementen wiederholen.", 43),
  "W3:6": outcome("W3 – bekannten mündlichen Auftrag mit 1, 2 und 3 Schritten ausführen.", 43),

  "W4:1": outcome("W4 – gehen und laufen, auf Signal stoppen und die Richtung wechseln.", 44),
  "W4:2": outcome("W4 – 5–10 Sekunden auf jedem Bein stehen.", 44),
  "W4:3": outcome("W4 – großen Ball aus kurzer Entfernung werfen/fangen bzw. gezielt rollen/kicken.", 44),
  "W4:4": outcome("W4 – beide Hände bzw. Körperseiten gleichzeitig und gegengleich einsetzen.", 44),
  "W4:5": outcome("W4 – rechte Hand/linkes Knie und umgekehrt bzw. Kreuzgang nach Vormachen ausführen.", 44),
  "W4:6": outcome("W4 – eine Folge aus 3 Bewegungen planen und in Reihenfolge ausführen.", 44),

  "W5:1": outcome("W5 – kleine Gegenstände gezielt greifen und sortieren.", 45),
  "W5:2": outcome("W5 – Turm oder Modell aus 4–8 Bausteinen nachbauen.", 45),
  "W5:3": outcome("W5 – waagerechte, senkrechte und gekreuzte Linie bzw. Spur kontrolliert nachfahren.", 45),
  "W5:4": outcome("W5 – Kreis, Kreuz, Quadrat, Dreieck und eine einfache Figur kopieren.", 45),
  "W5:5": outcome("W5 – an einer geraden und gebogenen Linie schneiden.", 45),
  "W5:6": outcome("W5 – Blatt stabilisieren und Stift mit angemessenem Druck führen; Abstand und Größe ausreichend einhalten.", 45),

  "W6:1": outcome("W6 · Aufgabe 1 – angekündigte leichte Berührung an Handrücken, Unterarm oder Schulter wahrnehmen und Körperstelle zeigen.", 46),
  "W6:2": outcome("W6 · Aufgabe 2 – Berührung mit weichem Tuch oder Schwamm als angenehm, unangenehm oder neutral bezeichnen.", 46),
  "W6:3": outcome("W6 · Aufgabe 3 – vertrauten Gegenstand im Fühlbeutel ohne Sicht erkennen.", 46),
  "W6:4": outcome("W6 · Aufgabe 4 – deutlich verschiedene Materialien unterscheiden, z. B. glatt/rau oder weich/hart.", 46),
  "W6:5": outcome("W6 · Aufgabe 5 – Tastreiz mit passenden Begriffen beschreiben; Auswahlwörter/Bildkarten möglich.", 46),
  "W6:6": outcome("W6 · Aufgabe 6 – Materialien oder Berührungen benennen, bei denen Unterstützung oder Abstand nötig ist.", 46),

  "L1:1": outcome("L1 – Formkarten paaren und Material nach einer sichtbaren Eigenschaft sortieren.", 22),
  "L1:2": outcome("L1 – einfache Folge ABAB fortsetzen.", 22),
  "L1:3": outcome("L1 – Anordnung kurz ansehen, verdecken und nachbauen.", 22),
  "L1:4": outcome("L1 – nach einem Fehler selbst korrigieren bzw. einen anderen Lösungsweg probieren.", 22),
  "L1:5": outcome("L1 – bekannte Regel mit neuen Farben / neuem Material übertragen.", 22),

  "L2:1": outcome("L2 – Sortieren, Muster oder Nachbauen zunächst ohne Hilfe versuchen.", 23),
  "L2:2": outcome("L2 – gleiche Aufgabenart nach Vormachen oder gemeinsamem Beginn erneut versuchen.", 23),
  "L2:3": outcome("L2 – geübte Strategie nach kurzer Zeit mit vergleichbarer Aufgabe erneut abrufen.", 23),
  "L2:4": outcome("L2 – am nächsten Tag mit neuen Karten / Mustern / Steinen erneut versuchen.", 23),
  "L2:5": outcome("L2 – gelernte Strategie auf ähnliches neues Material übertragen.", 23),

  "D1:1": count(3, "D1 · Aufgabe 7 – Reime erkennen: Haus–Maus, Hand–Wand, Rose–Hose; jeweils einen Nichtreim unterscheiden.", 24),
  "D1:2": count(4, "D1 · Aufgabe 6 – Silben gliedern: Mama, Banane, Tomate, Elefant klatschen oder mit Steinen legen.", 24),
  "D1:3": count(3, "D1 · Aufgabe 8 – Anlaut vergleichen: Maus–Mond, Sonne–Suppe, Lampe–Löwe.", 24),
  "D1:4": count(4, "D1 · Aufgabe 9 – Laute verbinden: /m/-/a/, /s/-/o/, /r/-/o/-/t/, /m/-/u/-/t/ zusammenziehen.", 24),
  "D1:5": count(10, "D1 · Aufgabe 5 – Buchstaben zu Lauten: M, A, S, L, O, I, N, R, T, E zufällig zeigen; Laut nennen.", 24),
  "D1:6": count(10, "D1 · Aufgabe 4 – Laut zu Buchstabe: zu /m/, /a/, /s/, /l/, /o/, /i/, /n/, /r/, /t/, /e/ aus vier Karten wählen.", 24),

  "D2:1": count(8, "D2 · Stufe 2 – Silben ma, mi, so, la, ne, tu, ra, fe einzeln lesen.", 25),
  "D2:2": count(6, "D2 · Stufe 3 – Pseudowörter Mela, Sanu, Rifo, Lome, Tami, Nefa lautierend erlesen.", 25),
  "D2:3": count(8, "D2 · Stufe 4 – Wörter Mama, Oma, Lama, Nase, Sofa, Dose, Bus, rot lesen und Bedeutung zeigen/erklären.", 25),
  "D2:4": outcome("D2 · Stufe 4 – bekannte Wörter zunehmend sicher und nicht nur ratend lesen; Lesestrategie beobachten.", 25),
  "D2:5": count(2, "D2 · Stufe 5 – Sätze ‚Oma malt.‘ und ‚Der Bus ist leer.‘ genau lesen.", 25),
  "D2:6": count(6, "D2 · Stufen 6–7 – kurze Sätze lesen und je drei Verständnisinformationen zeigen/antworten.", 25),

  "D3:1": count(12, "D3 · Aufgabe 2 – Buchstaben m, a, s, l, o, i, n, r, t, e, f, u nach Diktat formklar schreiben.", 26),
  "D3:2": count(3, "D3 · Aufgabe 4 – Pseudowörter Mela, Sanu, Rifo verschriften; phonologisch passende Schreibungen markieren.", 26),
  "D3:3": count(5, "D3 · Aufgabe 5 – Wörter Mama, Nase, Sofa, rot, Bus diktieren.", 26),
  "D3:4": count(5, "D3 · Aufgabe 7 – ‚Ein Kind sitzt am Tisch.‘ von gut lesbarer Vorlage vollständig abschreiben.", 26),
  "D3:5": count(2, "D3 · Aufgabe 6 – Satz ‚Mama malt.‘ diktieren und Wortgrenze zwischen zwei Wörtern beachten.", 26),
  "D3:6": outcome("D3 · Aufgabe 9 – mit Vorlesehilfe oder Modell prüfen, ob das Kind Geschriebenes entdeckt und verbessert.", 26),

  "D4:1": count(3, "D4 · Stufe 1 – ‚Zeig den Ball.‘ aus drei Gegenständen.", 27),
  "D4:2": count(3, "D4 · Stufe 5 – ‚Lege zuerst Rot in die Dose und danach Blau daneben.‘ Zwei-Schritt-Auftrag.", 27),
  "D4:3": outcome("D4 · Stufen 1–8 – passende Wörter zu vertrauten Gegenständen, Bildern und Handlungen finden.", 27),
  "D4:4": outcome("D4 · Erlebnis / Bild beschreiben: Wer? Was passiert? Warum? Wie geht es weiter? Verständliche einfache Sätze bilden.", 27),
  "D4:5": count(3, "D4 · Stufe 7 – kurze Bildfolge ordnen; Anfang, Handlung und Ende zeigen oder erzählen.", 27),

  "D5:1": count(12, "D5 – lautgetreue Wörter lesen; Genauigkeit getrennt vom Lesefluss erfassen.", 28),
  "D5:2": count(6, "D5 – sechs Sätze wortgenau lesen.", 28),
  "D5:3": outcome("D5 – beim Lesen Satzgrenzen / Satzzeichen beachten und Wortgruppen bilden.", 28),
  "D5:4": outcome("D5 – Informationen in Text A / B wiederfinden und Fragen zum Inhalt beantworten.", 28),
  "D5:5": outcome("D5 – zentrale Aussage eines kurzen Textes mündlich wiedergeben.", 28),

  "D9:1": outcome("D10 – Schreibanlass ‚verschlossene Kiste‘: vier bis acht Sätze; verständlichen eigenen Satz bzw. Handlungsfaden schreiben.", 33),
  "D9:2": outcome("D9/D10 – Satzanfang und Satzschluss in eigener Satz- bzw. Textschreibung beachten.", 32),
  "D9:3": outcome("D9 – Satzschreibung und Kinderschreibungen auf Großschreibung bekannter Nomen prüfen.", 32),
  "D9:4": outcome("D9 – 12 Wörter normal gesprochen schreiben; alphabetische Strategie / Mitsprechen beobachten.", 32),
  "D9:5": outcome("D9/D10 – Selbstkorrektur bzw. Überarbeiten nach Hinweis beobachten.", 32),

  "M1:1": count(10, "M1 · Aufgabe 7 – Mengenkarten: Mengen 1–5 spontan, strukturierte Mengen 6–10 erfassen.", 34),
  "M1:2": count(10, "M1 · Aufgabe 7 – strukturierte Mengen im Würfel-/Mengenbild erkennen.", 34),
  "M1:3": count(3, "M1 · Aufgabe 6 – genau 4, 7 und 12 Plättchen geben; Zahl-Menge-Zuordnung beobachten.", 34),
  "M1:4": count(2, "M1 · Aufgabe 4 – 7 bzw. 13 Plättchen mit Eins-zu-eins-Zuordnung zählen.", 34),
  "M1:5": count(3, "M1 · Aufgabe 8 – 5/8, 7/7, 9/6 vergleichen: mehr, weniger oder gleich.", 34),
  "M1:6": count(3, "M1 · Aufgabe 2 – bei 4, 8 und 13 beginnen und jeweils fünf Zahlen weiterzählen.", 34),

  "M2:1": outcome("M2 · Aufgaben 1–3 – Ziffern 0–20 erkennen und ausgewählte Zahlen formklar schreiben.", 35),
  "M2:2": count(8, "M2 · Aufgabe 6 – Vorgänger und Nachfolger zu 6, 10, 14 und 19 legen oder nennen.", 35),
  "M2:3": count(2, "M2 · Aufgabe 5 – 3,7,5,9 sowie 12,18,14,11 der Größe nach ordnen.", 35),
  "M2:4": count(4, "M2 · Aufgabe 7 – 5, 9, 13 und 18 am Zahlenstrahl 0–20 eintragen.", 35),
  "M2:5": count(2, "M2 · Aufgabe 8 – 14 und 17 Plättchen in einen Zehner und Einer bündeln.", 35),
  "M2:6": count(7, "M2 · Aufgabe 10 – optional bis 100: 24, 42, 50, 69, 70, 99 lesen und 34 mit Zehnern/Einern darstellen.", 35),

  "M3:1": outcome("M3 · Aufgaben 1–2 – 5 bzw. 10 Plättchen auf zwei Teller zerlegen und mehrere Möglichkeiten finden.", 36),
  "M3:2": count(5, "M3 · Aufgabe 3 – zu 1, 4, 6, 8 und 9 bis 10 ergänzen.", 36),
  "M3:3": count(3, "M3 · Aufgabe 4 – 3+2, 5+4, 7+3 mit Material lösen und Aufgabe zuordnen.", 36),
  "M3:4": count(3, "M3 · Aufgabe 5 – von 6 drei, von 9 zwei und von 10 sechs wegnehmen.", 36),
  "M3:5": count(8, "M3 · Aufgaben 6–7 – vier Aufgaben bis 10 und vier Aufgaben bis 20 lösen; Material bleibt ggf. erreichbar.", 36),
  "M3:6": count(2, "M3 · Aufgabe 9 – nach 3+4 auch 4+3 und 7−3 anbieten; Aufgabenbeziehung nutzen.", 36),
  "M3:7": outcome("M3 – bevorzugte Strategie bzw. Rechenweg handelnd, bildlich oder sprachlich erklären.", 36),

  "M4:1": count(3, "M4 · Aufgabe 8 – Muster ABAB, AAB und ABC mit neuem Material fortsetzen und übertragen.", 37),
  "M4:2": outcome("M4 · Aufgaben 1–5 – Sachsituationen Dazukommen, Wegnehmen, Teil-Ganzes, fehlender Teil und Operationswahl handelnd erfassen.", 37),
  "M4:3": outcome("M4 · Aufgaben 1–6 – passende Rechnung bzw. Rechenfrage zu einer Sachsituation zuordnen.", 37),
  "M4:4": outcome("M4 · Aufgabe 6 – zu 6+2 oder 9−3 selbst eine Handlung legen/erzählen und passende Antwort formulieren.", 37),
  "M4:5": count(2, "M4 · Aufgabe 9 – drei Gegenstände vergleichen und einen Gegenstand mit Würfeln messen.", 37),

  "M5:1": outcome("M5 – Zahlraum bis 100: Zahlen schreiben, vergleichen, Vorgänger/Nachfolger bestimmen und aufsteigend ordnen.", 38),
  "M5:2": outcome("M5 – Stellenwert: Zehner und Einer darstellen, zerlegen und Stellenwerttausch verstehen.", 38),
  "M5:3": outcome("M6 – Plusaufgaben bis 100 (z. B. 24+13, 38+7, 47+26) lösen und Rechenweg dokumentieren.", 39),
  "M5:4": outcome("M6 – Minusaufgaben bis 100 (z. B. 58−24, 52−8, 81−36) lösen und Rechenweg dokumentieren.", 39),
  "M5:5": outcome("M6/M7 – Aufgabenbeziehungen, Nachbaraufgaben, Fehlerprüfung und passende Strategien nutzen.", 39),

  "V1:1": outcome("V1 – bekannte leichte Aufgabe / Aufgabe auf sicherem Lernniveau: Aufgabenbeginn beobachten.", 7),
  "V1:2": outcome("V1 – neue fachliche Aufgabe: Aufgabenbeginn und Zugang beobachten.", 7),
  "V1:3": outcome("V1 – Korrektur durch Erwachsene bzw. Fehler: Ansprechbarkeit und Fehlerreaktion beobachten.", 7),
  "V1:4": outcome("V1 – nach Pause / Unterbrechung zur Aufgabe zurückkehren.", 7),
  "V1:5": outcome("V1 – Hilfeannahme und passende Hilfe in typischen Situationen beobachten.", 7),

  "V2:1": outcome("V2 – Arbeitsauftrag in leichter, passender und neuer Aufgabe erfassen.", 8),
  "V2:2": outcome("V2 – mit der Aufgabe beginnen.", 8),
  "V2:3": outcome("V2 – mindestens 5 Minuten bei einer Aufgabe bleiben.", 8),
  "V2:4": outcome("V2 – nach Fehler / Rückmeldung weiterarbeiten und Korrektur versuchen.", 8),
  "V2:5": outcome("V2 – begonnene Aufgabe beenden bzw. nach Pause zurückkehren.", 8),
  "V2:6": outcome("V2 – eigenen Fehler erkennen und mit Hilfe korrigieren.", 8),

  "V3:1": outcome("V3 – Unterstützung in der Hilfeleiter annehmen: Wahlmöglichkeit, visueller/verbaler Hinweis, Vormachen, gemeinsamer Anfang.", 9),
  "V3:2": outcome("V3 – bei unklarer Aufgabe Wahl/Hilfe anfordern bzw. Rückfrage stellen.", 9),
  "V3:3": outcome("V3 – nach Vormachen eine neue Strategie an einer ähnlichen Aufgabe ausprobieren.", 9),
  "V3:4": outcome("V3 – Gezeigtes auf eine zweite ähnliche Aufgabe übertragen.", 9),
  "V3:5": outcome("V3 – bei einer Aufgabe knapp oberhalb des sicheren Niveaus trotz Unsicherheit dabeibleiben.", 9),

  "V4:1": outcome("V4 – bei Anspannung in Unterricht, neuer Aufgabe, Pause/Gruppe und Übergang ansprechbar bleiben.", 10),
  "V4:2": outcome("V4 – eigenen Impuls stoppen bzw. angemessenen Abstand/Pause nutzen.", 10),
  "V4:3": outcome("V4 – ein Nein oder eine Grenze akzeptieren.", 10),
  "V4:4": outcome("V4 – bei Konflikt angemessen Hilfe oder Abstand suchen.", 10),
  "V4:5": outcome("V4 – Kontakt aufnehmen, kooperieren und nach Konflikten reparieren.", 10),
  "V4:6": outcome("V4 – nach Konflikt Verantwortung übernehmen und Situation nach Beruhigung reflektieren.", 10),

  "V6:1": outcome("V6 – Kompetenz in bekannter Routine / vertrauter Situation beobachten.", 12),
  "V6:2": outcome("V6 – Kompetenz bei neuer Lernaufgabe bzw. veränderter Anforderung beobachten.", 12),
  "V6:3": outcome("V6 – Kompetenz in ruhiger, entlasteter Situation beobachten.", 12),
  "V6:4": outcome("V6 – Kompetenz in Partner-/Gruppenarbeit bzw. Klasse beobachten.", 12),
  "V6:5": outcome("V6 – Wirkung passender Gelingensbedingungen prüfen: vorhersehbarer Ablauf, Wahl, private Rückmeldung, Pause, vertraute Person, gemeinsamer Anfang.", 12)
};

export function assessmentSpecFor(moduleId, itemId, fallbackText = "") {
  return ASSESSMENT_SPECS[`${moduleId}:${itemId}`] || outcome(`${moduleId} – ${fallbackText}`, null);
}

export function helpLabel(value) {
  return HELP_LEVELS.find((entry) => entry.value === value)?.label || "ohne Hilfe";
}

export function outcomeLabel(value) {
  return OUTCOME_LEVELS.find((entry) => entry.value === value)?.label || "";
}

function helpBasedCode(help) {
  if (help === "hint") return "+";
  if (help === "model" || help === "support") return "o";
  return "++";
}

export function totalForObservation(response = {}, spec = {}) {
  const fallback = Number(spec.total) || 0;
  if (!spec.editableTotal) return fallback;
  const entered = Number(response.total);
  return Number.isFinite(entered) && entered > 0 ? Math.round(entered) : fallback;
}

export function correctForObservation(response = {}, spec = {}) {
  const total = totalForObservation(response, spec);
  if (response.correct !== "" && response.correct != null && !Number.isNaN(Number(response.correct))) {
    return Math.max(0, Math.min(total, Number(response.correct)));
  }
  // Alte Auswahlwerte werden nur zur Migration vorhandener lokaler Daten verwendet.
  if (response.outcome === "secure") return total;
  if (response.outcome === "partial") return Math.max(1, Math.ceil(total * 0.6));
  if (response.outcome === "not") return 0;
  return null;
}

export function deriveObservationCode(response = {}, spec = {}) {
  return response.code || response.legacyCode || "";
}

export function documentationForObservation(moduleId, observation, response = {}) {
  const spec = assessmentSpecFor(moduleId, observation.id, observation.text);
  const parts = [spec.task];
  if (spec.page) parts.push(`Screening-Baukasten S. ${spec.page}`);
  return parts.filter(Boolean).join(" · ");
}
