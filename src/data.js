export const EVIDENCE_CODES = [
  { value: "S", short: "S", label: "selbstständig und sicher", appRating: "+" },
  { value: "H", short: "H", label: "nach kurzem Hinweis", appRating: "o" },
  { value: "V", short: "V", label: "nach Vormachen oder visuellem Modell", appRating: "o" },
  { value: "G", short: "G", label: "gemeinsam oder deutlich geführt", appRating: "-" },
  { value: "N", short: "N", label: "noch nicht gezeigt", appRating: "-" },
  { value: "?", short: "?", label: "nicht beurteilbar", appRating: "nb" }
];

export const APP_RATINGS = [
  { value: "+", label: "+", description: "gelingt sicher / kein aktueller Förderbedarf" },
  { value: "o", label: "o", description: "gelingt teilweise / geringer oder situationsabhängiger Förderbedarf" },
  { value: "-", label: "-", description: "gelingt noch unsicher / deutlicher Förderbedarf" },
  { value: "nb", label: "n. b.", description: "nicht ausreichend beobachtet" }
];

const sheet = (page, code, title, kind, moduleIds, recommended = true) => ({
  id: `pdf-${String(page).padStart(3, "0")}`,
  page,
  code,
  title,
  kind,
  moduleIds,
  recommended,
  image: `./assets/sheets/page-${String(page).padStart(3, "0")}.png`
});

export const PRINT_SHEETS = [
  sheet(16, "B3", "Beobachtung im Schulvormittag", "Aufgaben- und Beobachtungsbogen", ["B3"]),
  sheet(17, "B4", "Kommunikation und soziale Orientierung", "Aufgaben- und Beobachtungsbogen", ["B4"]),
  sheet(21, "W1", "Visuelle Wahrnehmung im Schulalltag", "Aufgaben- und Beobachtungsbogen", ["W1"]),
  sheet(22, "W2", "Visuelle Verarbeitung - kurze Aufgaben", "Aufgaben- und Beobachtungsbogen", ["W2"]),
  sheet(23, "W3", "Auditive Verarbeitung", "Aufgaben- und Beobachtungsbogen", ["W3"]),
  sheet(24, "W4", "Bewegung, Koordination und Körpermittellinie", "Aufgaben- und Beobachtungsbogen", ["W4"]),
  sheet(25, "W5", "Fein- und Visuomotorik", "Aufgaben- und Beobachtungsbogen", ["W5"]),
  sheet(26, "L1", "Denken und Lernen", "Aufgaben- und Beobachtungsbogen", ["L1"]),
  sheet(27, "L2", "Kurz üben und erneut ausprobieren", "Aufgaben- und Beobachtungsbogen", ["L2"]),
  sheet(28, "D1", "Laute, Silben und Buchstaben", "Aufgaben- und Beobachtungsbogen", ["D1"]),
  sheet(29, "D2", "Lesen - Grundlagen", "Aufgaben- und Beobachtungsbogen", ["D2"]),
  sheet(30, "D3", "Schreiben und Verschriften", "Aufgaben- und Beobachtungsbogen", ["D3"]),
  sheet(31, "D4", "Sprachverstehen und Erzählen", "Aufgaben- und Beobachtungsbogen", ["D4"]),
  sheet(32, "D5", "Deutsch: Lesen erweitert", "Aufgaben- und Beobachtungsbogen", ["D5"]),
  sheet(33, "D6", "Lesematerial: Wörter und Pseudowörter", "Lesematerial", ["D2", "D5"]),
  sheet(34, "D7", "Lesetext A: Der Schlüssel im Garten", "Lesematerial", ["D5"]),
  sheet(35, "D8", "Lesetext B: Ein Plan für den Schulgarten", "Lesematerial", ["D5"]),
  sheet(36, "D9", "Schreiben und Rechtschreibung erweitert", "Aufgaben- und Beobachtungsbogen", ["D9"]),
  sheet(37, "D10", "Schreibprobe: eigener Text", "Arbeitsmaterial", ["D9"]),
  sheet(38, "M1", "Mengen und Zählen", "Aufgaben- und Beobachtungsbogen", ["M1"]),
  sheet(39, "M2", "Ziffern, Zahlenraum und Stellenwert", "Aufgaben- und Beobachtungsbogen", ["M2"]),
  sheet(40, "M3", "Zerlegen und Rechnen", "Aufgaben- und Beobachtungsbogen", ["M3"]),
  sheet(41, "M4", "Sachrechnen, Muster und Größen", "Aufgaben- und Beobachtungsbogen", ["M4"]),
  sheet(42, "M5", "Mathematik: Zahlraum bis 100", "Aufgaben- und Beobachtungsbogen", ["M5"]),
  sheet(43, "M6", "Mathematik: Rechnen bis 100", "Aufgaben- und Beobachtungsbogen", ["M5"]),
  sheet(44, "M7", "Mathematik: weiterführende Anwendung", "Aufgaben- und Beobachtungsbogen", ["M5"]),
  sheet(45, "V1", "Ausgangsbeobachtung über fünf Tage", "Aufgaben- und Beobachtungsbogen", ["V1"]),
  sheet(46, "V2", "Lern- und Arbeitsverhalten", "Aufgaben- und Beobachtungsbogen", ["V2"]),
  sheet(47, "V3", "Hilfe annehmen und Neues lernen", "Aufgaben- und Beobachtungsbogen", ["V3"]),
  sheet(48, "V4", "Sozial-emotionale Beobachtung", "Aufgaben- und Beobachtungsbogen", ["V4"]),
  sheet(49, "V5", "Ereignisbogen bei Blockieren oder Aggression", "Zusatzbogen", ["V4"]),
  sheet(50, "V6", "Regulation in verschiedenen Situationen", "Aufgaben- und Beobachtungsbogen", ["V6"]),
  sheet(75, "S1", "Aussprache, Stimme und Redefluss", "Aufgaben- und Beobachtungsbogen", ["S1"]),
  sheet(76, "W6", "Taktil-kinästhetische Wahrnehmung", "Aufgaben- und Beobachtungsbogen", ["W6"]),
  sheet(63, "Z1", "Auswertungshilfe Deutsch", "Lösung und Auswertung", ["D1", "D2", "D3", "D4", "D5", "D9"], false),
  sheet(64, "Z2", "Auswertungshilfe Mathematik", "Lösung und Auswertung", ["M1", "M2", "M3", "M4", "M5"], false),
  sheet(66, "Material A", "Formkarten", "Ausschneidematerial", ["W2", "L1", "L2"]),
  sheet(67, "Material B", "Mengenkarten", "Ausschneidematerial", ["M1", "M3"]),
  sheet(68, "Material C", "Zahlenkarten", "Ausschneidematerial", ["M1", "M2", "M3"]),
  sheet(69, "Material D", "Musterfolgen", "Ausschneidematerial", ["W2", "L1", "L2", "M4"]),
  sheet(70, "Material E", "Buchstabenkarten", "Ausschneidematerial", ["D1"]),
  sheet(71, "Material F", "Schreibprobe Grundlagen", "Arbeitsmaterial", ["W5", "D3"]),
  sheet(72, "Material G", "Lesekarten Grundlagen", "Lesematerial", ["D1", "D2"]),
  sheet(73, "Material H", "Lesesätze Grundlagen", "Lesematerial", ["D2"]),
  sheet(74, "Material I", "Visuelles Suchblatt", "Arbeitsmaterial", ["W2"])
];

export function printSheetsForModules(moduleIds) {
  const selected = new Set(moduleIds);
  return PRINT_SHEETS.filter((entry) => entry.moduleIds.some((moduleId) => selected.has(moduleId)));
}

export const AREAS = [
  {
    id: "emotional",
    label: "Emotionalität, Sozialverhalten",
    subareas: [
      ["selbstwahrnehmung", "Selbstwahrnehmung und Selbstsicherheit"],
      ["selbstkontrolle", "Selbstkontrolle"],
      ["frustration", "Frustrationstoleranz"],
      ["kontakt", "Kontakt- und Konfliktverhalten"]
    ]
  },
  {
    id: "learning",
    label: "Lern- und Leistungsverhalten",
    subareas: [
      ["orientierung", "Orientierung und Selbstständigkeit"],
      ["aufgabenbeginn", "Aufgabenbeginn"],
      ["ausdauer", "Konzentration und Ausdauer"],
      ["organisation", "Arbeitsorganisation"],
      ["mitarbeit", "Motivation und Mitarbeit"]
    ]
  },
  {
    id: "speech",
    label: "Sprache / Kommunikation",
    subareas: [
      ["artikulation", "Aussprache / Artikulation"],
      ["phonologie", "Lautwahrnehmung / phonologische Bewusstheit"],
      ["wortschatz", "Wortschatz / Wortbedeutung"],
      ["verstehen", "Sprachverständnis / Arbeitsaufträge"],
      ["grammatik", "Grammatik / Satzbildung"],
      ["erzaehlen", "Erzählfähigkeit / Versprachlichen"],
      ["kommunikation", "Kommunikation / Gesprächsverhalten"],
      ["stimme", "Stimme / Sprechweise"],
      ["redefluss", "Redefluss / Wortfindung"]
    ]
  },
  {
    id: "motor",
    label: "Motorik",
    subareas: [
      ["grobmotorik", "Grobmotorik"],
      ["feinmotorik", "Feinmotorik"],
      ["graphomotorik", "Graphomotorik"],
      ["planung", "Bilaterale Koordination / Handlungsplanung"]
    ]
  },
  {
    id: "perception",
    label: "Wahrnehmung",
    subareas: [
      ["visuomotorik", "Visuomotorische Koordination"],
      ["figur_grund", "Figur-Grund-Wahrnehmung"],
      ["konstanz", "Wahrnehmungskonstanz"],
      ["raum_lage", "Raum-Lage-Wahrnehmung"],
      ["raeumliche_beziehungen", "Räumliche Beziehungen"],
      ["auditive_differenzierung", "Auditive Differenzierung"],
      ["auditive_gliederung", "Auditive Gliederung / phonologische Wahrnehmung"],
      ["auditive_identifikation", "Auditive Identifikation"],
      ["auditives_gedaechtnis", "Auditives Gedächtnis"],
      ["taktil_kinaesthetisch", "Taktil-kinästhetische Wahrnehmung"],
      ["vestibulaer", "Vestibuläre Wahrnehmung"]
    ]
  },
  {
    id: "cognition",
    label: "Kognition",
    subareas: [
      ["aufmerksamkeit", "Aufmerksamkeit / Konzentration"],
      ["gedaechtnis", "Kurzzeit- und Langzeitgedächtnis"],
      ["denken", "Problemlösen / Übertragung"]
    ]
  },
  {
    id: "german",
    label: "Deutsch",
    subareas: [
      ["phonologie", "Vorläuferfähigkeiten / phonologische Bewusstheit"],
      ["buchstaben", "Buchstabenkenntnis und Laut-Buchstaben-Zuordnung"],
      ["lesen", "Lesen"],
      ["schreiben", "Schreiben / Rechtschreiben"],
      ["text", "Textverständnis / Umgang mit Texten"],
      ["sprache_untersuchen", "Sprache untersuchen / erste Rechtschreibstrategien"]
    ]
  },
  {
    id: "math",
    label: "Mathematik",
    subareas: [
      ["praenumerisch", "Pränumerische Kompetenzen"],
      ["mengen", "Mengenerfassung"],
      ["zaehlen", "Zählen und Zahlwortreihe"],
      ["ziffern", "Ziffern und Zahlzuordnung"],
      ["beziehungen", "Zahlbeziehungen"],
      ["zerlegung", "Zerlegung"],
      ["addition_subtraktion", "Addition und Subtraktion"],
      ["zahlenraum", "Orientierung im Zahlenraum"],
      ["sachrechnen", "Sachrechnen / Größen optional"]
    ]
  }
];

const m = (areaId, subareaId) => ({ areaId, subareaId });
const item = (id, text, mappings) => ({ id, text, mappings });

export const MODULE_GROUPS = [
  "Basis & Kommunikation",
  "Wahrnehmung & Bewegung",
  "Denken & Lernen",
  "Deutsch",
  "Mathematik",
  "Lernen & Verhalten"
];

export const MODULES = [
  {
    id: "B3", group: "Basis & Kommunikation", title: "Schulvormittag", description: "Teilhabe, Routinen und Selbstständigkeit im Alltag",
    items: [
      item("1", "kennt wiederkehrende Abläufe des Schultages", [m("learning", "orientierung")]),
      item("2", "findet benötigte Arbeitsmittel", [m("learning", "orientierung"), m("learning", "organisation")]),
      item("3", "beginnt eine bekannte Aufgabe nach Aufforderung", [m("learning", "aufgabenbeginn")]),
      item("4", "bleibt für eine überschaubare Zeit bei der Aufgabe", [m("learning", "ausdauer"), m("cognition", "aufmerksamkeit")]),
      item("5", "wechselt mit Unterstützung zwischen Unterrichtssituationen", [m("learning", "orientierung"), m("emotional", "selbstkontrolle")])
    ]
  },
  {
    id: "B4", group: "Basis & Kommunikation", title: "Kommunikation und soziale Orientierung", description: "Verstehen, Bedürfnisse und Kontakt",
    items: [
      item("1", "versteht kurze vertraute Arbeitsaufträge", [m("speech", "verstehen")]),
      item("2", "zeigt oder sagt, wenn etwas unklar ist", [m("speech", "kommunikation"), m("emotional", "selbstwahrnehmung")]),
      item("3", "äußert grundlegende Bedürfnisse verständlich", [m("speech", "kommunikation"), m("emotional", "selbstwahrnehmung")]),
      item("4", "nimmt angemessen Kontakt zu Erwachsenen oder Kindern auf", [m("emotional", "kontakt"), m("speech", "kommunikation")]),
      item("5", "beachtet einfache Gesprächs- und Gruppenregeln", [m("speech", "kommunikation"), m("emotional", "selbstkontrolle")])
    ]
  },
  {
    id: "S1", group: "Basis & Kommunikation", title: "Aussprache, Stimme und Redefluss", description: "Verständlichkeit, Sprechweise und Wortfindung in kurzen Sprechanlässen",
    items: [
      item("1", "bildet ausgewählte Einzellaute nach einem klaren Sprachvorbild", [m("speech", "artikulation")]),
      item("2", "spricht mehrsilbige Wörter ohne auffällige Laut- oder Silbenauslassungen nach", [m("speech", "artikulation")]),
      item("3", "äußert sich in einer kurzen Bildbeschreibung verständlich", [m("speech", "artikulation")]),
      item("4", "passt die Lautstärke an Gespräch und Raum an", [m("speech", "stimme")]),
      item("5", "spricht in einem Tempo, bei dem die Äußerung verständlich bleibt", [m("speech", "stimme")]),
      item("6", "nutzt beim Vorlesen oder Erzählen eine passende Betonung", [m("speech", "stimme")]),
      item("7", "findet in vertrauten Sprechanlässen passende Wörter ohne lange Suchpausen", [m("speech", "redefluss")]),
      item("8", "spricht einen kurzen Gedanken ohne häufige Pausen oder Satzabbrüche aus", [m("speech", "redefluss")]),
      item("9", "ordnet Gedanken beim Sprechen für andere nachvollziehbar", [m("speech", "redefluss")])
    ]
  },
  {
    id: "W1", group: "Wahrnehmung & Bewegung", title: "Visuelle Beobachtung im Schulalltag", description: "Orientierung, Suchen und visuelle Ermüdung",
    items: [
      item("1", "findet die richtige Stelle auf einer übersichtlichen Arbeitsseite", [m("perception", "raeumliche_beziehungen")]),
      item("2", "erkennt wichtige Informationen vor einem unruhigen Hintergrund", [m("perception", "figur_grund")]),
      item("3", "unterscheidet ähnlich aussehende Zeichen", [m("perception", "konstanz"), m("perception", "raum_lage")]),
      item("4", "überträgt eine einfache Anordnung passend", [m("perception", "raeumliche_beziehungen"), m("perception", "visuomotorik")]),
      item("5", "bleibt bei kurzer visueller Arbeit ohne deutliche Ermüdung", [m("cognition", "aufmerksamkeit")])
    ]
  },
  {
    id: "W2", group: "Wahrnehmung & Bewegung", title: "Visuelle Verarbeitung", description: "Unterscheidung, Raumlage, Figur-Grund und Gedächtnis",
    items: [
      item("1", "findet identische Formen sicher", [m("perception", "konstanz")]),
      item("2", "unterscheidet ähnliche Formen und Zeichen", [m("perception", "konstanz"), m("perception", "raum_lage")]),
      item("3", "findet Zielformen in unruhigem Material", [m("perception", "figur_grund")]),
      item("4", "ordnet oben, unten, links, rechts und zwischen passend zu", [m("perception", "raum_lage"), m("perception", "raeumliche_beziehungen")]),
      item("5", "merkt sich eine kurze visuelle Folge", [m("cognition", "gedaechtnis")]),
      item("6", "setzt einfache Muster fort und überträgt die Regel", [m("cognition", "denken"), m("math", "praenumerisch")])
    ]
  },
  {
    id: "W3", group: "Wahrnehmung & Bewegung", title: "Auditive Verarbeitung", description: "Differenzierung, Lautfolgen, Aufträge und Behalten",
    items: [
      item("1", "unterscheidet bekannte Umweltgeräusche", [m("perception", "auditive_differenzierung")]),
      item("2", "unterscheidet ähnlich klingende Laute oder Silben", [m("perception", "auditive_differenzierung"), m("speech", "phonologie")]),
      item("3", "erkennt Reime oder gleiche Lautanfänge", [m("perception", "auditive_identifikation"), m("german", "phonologie")]),
      item("4", "gliedert kurze Wörter in Silben oder Laute", [m("perception", "auditive_gliederung"), m("german", "phonologie")]),
      item("5", "wiederholt kurze Laut-, Wort- oder Rhythmusfolgen", [m("perception", "auditives_gedaechtnis"), m("cognition", "gedaechtnis")]),
      item("6", "behält einen mehrteiligen mündlichen Auftrag", [m("perception", "auditives_gedaechtnis"), m("speech", "verstehen")])
    ]
  },
  {
    id: "W4", group: "Wahrnehmung & Bewegung", title: "Bewegung und Koordination", description: "Gleichgewicht, beidseitige Koordination und Körpermittellinie",
    items: [
      item("1", "geht, läuft, stoppt und wechselt die Richtung sicher", [m("motor", "grobmotorik")]),
      item("2", "hält kurz auf beiden Seiten das Gleichgewicht", [m("motor", "grobmotorik"), m("perception", "vestibulaer")]),
      item("3", "wirft, fängt oder rollt einen großen Ball gezielt", [m("motor", "grobmotorik"), m("motor", "planung")]),
      item("4", "setzt beide Hände oder Körperseiten abgestimmt ein", [m("motor", "planung")]),
      item("5", "führt eine einfache Überkreuzbewegung nach Vormachen aus", [m("motor", "planung")]),
      item("6", "plant eine Folge aus drei Bewegungen", [m("motor", "planung"), m("cognition", "gedaechtnis")])
    ]
  },
  {
    id: "W5", group: "Wahrnehmung & Bewegung", title: "Fein- und Visuomotorik", description: "Handgebrauch, Auge-Hand-Koordination und Graphomotorik",
    items: [
      item("1", "greift und sortiert kleine Gegenstände gezielt", [m("motor", "feinmotorik")]),
      item("2", "baut ein einfaches Modell nach", [m("perception", "visuomotorik"), m("motor", "feinmotorik")]),
      item("3", "fährt Linien oder eine einfache Spur kontrolliert nach", [m("perception", "visuomotorik"), m("motor", "graphomotorik")]),
      item("4", "kopiert einfache Formen", [m("perception", "visuomotorik"), m("motor", "graphomotorik")]),
      item("5", "schneidet an einer geraden oder gebogenen Linie", [m("motor", "feinmotorik"), m("perception", "visuomotorik")]),
      item("6", "stabilisiert das Blatt und führt den Stift mit angemessenem Druck", [m("motor", "graphomotorik"), m("motor", "feinmotorik")])
    ]
  },
  {
    id: "W6", group: "Wahrnehmung & Bewegung", title: "Taktil-kinästhetische Wahrnehmung", description: "Berührung, Tasten und Materialerfahrung – nur angekündigt und mit Zustimmung",
    items: [
      item("1", "nimmt eine angekündigte leichte Berührung wahr und lokalisiert sie am eigenen Körper", [m("perception", "taktil_kinaesthetisch")]),
      item("2", "benennt eine Berührung als angenehm, unangenehm oder neutral", [m("perception", "taktil_kinaesthetisch")]),
      item("3", "erkennt einen vertrauten Gegenstand ohne Sicht durch Tasten", [m("perception", "taktil_kinaesthetisch")]),
      item("4", "unterscheidet zwei deutlich verschiedene Materialien durch Tasten", [m("perception", "taktil_kinaesthetisch")]),
      item("5", "beschreibt einen Tastreiz mit passenden Begriffen", [m("perception", "taktil_kinaesthetisch")]),
      item("6", "zeigt und benennt, welche Materialien oder Berührungen Unterstützung oder Abstand erfordern", [m("perception", "taktil_kinaesthetisch")])
    ]
  },
  {
    id: "L1", group: "Denken & Lernen", title: "Denken und Lernen", description: "Sprachreduziertes Problemlösen und Strategiewechsel",
    items: [
      item("1", "sortiert Material nach einem erkennbaren Merkmal", [m("cognition", "denken"), m("math", "praenumerisch")]),
      item("2", "erkennt und ergänzt einfache Reihen", [m("cognition", "denken"), m("math", "praenumerisch")]),
      item("3", "merkt sich eine kurze Handlungsfolge", [m("cognition", "gedaechtnis")]),
      item("4", "probiert nach einem erfolglosen Versuch einen anderen Weg", [m("cognition", "denken"), m("emotional", "frustration")]),
      item("5", "überträgt eine bekannte Regel auf neues Material", [m("cognition", "denken")])
    ]
  },
  {
    id: "L2", group: "Denken & Lernen", title: "Kurz lernen und erneut prüfen", description: "Lernbarkeit, Behalten und Übertragen",
    items: [
      item("1", "zeigt beim ersten Versuch eine eigene Strategie", [m("cognition", "denken")]),
      item("2", "nutzt die Strategie nach kurzem Vormachen", [m("cognition", "denken"), m("learning", "mitarbeit")]),
      item("3", "ruft die Strategie zehn Minuten später ab", [m("cognition", "gedaechtnis")]),
      item("4", "ruft die Strategie am Folgetag ab", [m("cognition", "gedaechtnis")]),
      item("5", "überträgt die Strategie auf ähnliches Material", [m("cognition", "denken")])
    ]
  },
  {
    id: "D1", group: "Deutsch", title: "Laute, Silben und Buchstaben", description: "Vorläuferfähigkeiten und Laut-Buchstaben-Zuordnung",
    items: [
      item("1", "erkennt Reime", [m("german", "phonologie"), m("speech", "phonologie")]),
      item("2", "gliedert Wörter in Silben", [m("german", "phonologie")]),
      item("3", "hört Anlaute in einfachen Wörtern", [m("german", "phonologie"), m("perception", "auditive_gliederung")]),
      item("4", "verbindet Laute zu Silben", [m("german", "phonologie")]),
      item("5", "erkennt und benennt bekannte Buchstaben", [m("german", "buchstaben")]),
      item("6", "ordnet bekannten Buchstaben passende Laute zu", [m("german", "buchstaben")])
    ]
  },
  {
    id: "D2", group: "Deutsch", title: "Lesen Grundlagen", description: "Silben, Pseudowörter, Wörter und kurze Sätze",
    items: [
      item("1", "liest einfache Silben", [m("german", "lesen")]),
      item("2", "liest lautgetreue Pseudowörter ohne bloßes Raten", [m("german", "lesen")]),
      item("3", "liest kurze lautgetreue Wörter", [m("german", "lesen")]),
      item("4", "liest bekannte Wörter zunehmend sicher", [m("german", "lesen")]),
      item("5", "liest einen kurzen Satz genau", [m("german", "lesen")]),
      item("6", "beantwortet eine einfache Frage zum Satz", [m("german", "text")])
    ]
  },
  {
    id: "D3", group: "Deutsch", title: "Schreiben Grundlagen", description: "Verschriften, Abschreiben und freies Schreiben",
    items: [
      item("1", "schreibt bekannte Buchstaben formklar", [m("german", "buchstaben"), m("motor", "graphomotorik")]),
      item("2", "verschriftet hörbare Laute in einfachen Wörtern", [m("german", "schreiben")]),
      item("3", "schreibt ein lautgetreues Wort möglichst vollständig", [m("german", "schreiben")]),
      item("4", "kopiert ein Wort oder einen kurzen Satz vollständig", [m("german", "schreiben")]),
      item("5", "setzt in einem einfachen Satz Wortgrenzen", [m("german", "schreiben")]),
      item("6", "kontrolliert Geschriebenes mit einer Vorlage", [m("german", "schreiben"), m("learning", "organisation")])
    ]
  },
  {
    id: "D4", group: "Deutsch", title: "Sprachverstehen und Erzählen", description: "Aufträge verstehen und Inhalte geordnet wiedergeben",
    items: [
      item("1", "versteht einen kurzen vertrauten Auftrag", [m("speech", "verstehen")]),
      item("2", "versteht einen mehrteiligen Auftrag mit Visualisierung", [m("speech", "verstehen")]),
      item("3", "findet passende Wörter zu Bildern oder Handlungen", [m("speech", "wortschatz")]),
      item("4", "bildet verständliche einfache Sätze", [m("speech", "grammatik")]),
      item("5", "erzählt eine kurze Bildfolge geordnet", [m("speech", "erzaehlen"), m("german", "text")])
    ]
  },
  {
    id: "D5", group: "Deutsch", title: "Lesen erweitert", description: "Kompetenzen Ende Klasse 1 bis Klasse 2",
    items: [
      item("1", "liest neue Wörter genau", [m("german", "lesen")]),
      item("2", "liest mehrere Sätze zusammenhängend", [m("german", "lesen")]),
      item("3", "beachtet Satzgrenzen und Satzzeichen", [m("german", "lesen")]),
      item("4", "entnimmt einem kurzen Text Informationen", [m("german", "text")]),
      item("5", "gibt die zentrale Aussage eines kurzen Textes wieder", [m("german", "text")])
    ]
  },
  {
    id: "D9", group: "Deutsch", title: "Schreiben und Rechtschreibung erweitert", description: "Eigene Sätze und erste Strategien",
    items: [
      item("1", "schreibt einen verständlichen eigenen Satz", [m("german", "schreiben")]),
      item("2", "nutzt Satzanfang und Satzschluss", [m("german", "schreiben")]),
      item("3", "schreibt bekannte Nomen groß", [m("german", "sprache_untersuchen")]),
      item("4", "spricht Wörter beim Schreiben deutlich mit", [m("german", "sprache_untersuchen")]),
      item("5", "nutzt eine bekannte Abschreib- oder Kontrollstrategie", [m("german", "schreiben"), m("german", "sprache_untersuchen")])
    ]
  },
  {
    id: "M1", group: "Mathematik", title: "Mengen und Zählen", description: "Zahlbegriff und Kardinalverständnis",
    items: [
      item("1", "erfasst kleine Mengen ohne Abzählen", [m("math", "mengen")]),
      item("2", "erkennt strukturierte Mengen im Würfel- oder Zehnerbild", [m("math", "mengen")]),
      item("3", "ordnet Mengen passenden Zahlen zu", [m("math", "mengen"), m("math", "ziffern")]),
      item("4", "zählt eine Menge mit Eins-zu-eins-Zuordnung", [m("math", "zaehlen")]),
      item("5", "sagt, wo mehr, weniger oder gleich viele sind", [m("math", "mengen"), m("math", "beziehungen")]),
      item("6", "zählt von einer gegebenen Zahl weiter", [m("math", "zaehlen")])
    ]
  },
  {
    id: "M2", group: "Mathematik", title: "Ziffern, Zahlraum und Stellenwert", description: "Zahlen bis 20 und Anschluss bis 100",
    items: [
      item("1", "erkennt und schreibt Ziffern formklar", [m("math", "ziffern")]),
      item("2", "bestimmt Vorgänger und Nachfolger", [m("math", "ziffern"), m("math", "beziehungen")]),
      item("3", "ordnet Zahlen der Größe nach", [m("math", "beziehungen")]),
      item("4", "orientiert sich im Zahlenraum bis 20", [m("math", "zahlenraum")]),
      item("5", "nutzt Zehner und Einer bei zweistelligen Zahlen", [m("math", "zahlenraum"), m("math", "beziehungen")]),
      item("6", "orientiert sich mit Hilfe im Zahlenraum bis 100", [m("math", "zahlenraum")])
    ]
  },
  {
    id: "M3", group: "Mathematik", title: "Zerlegen und Rechnen", description: "Grundoperationen bis 20 und Strategien",
    items: [
      item("1", "zerlegt Zahlen handelnd oder bildlich", [m("math", "zerlegung")]),
      item("2", "ergänzt sicher bis 10", [m("math", "zerlegung")]),
      item("3", "versteht Plus als Dazukommen", [m("math", "addition_subtraktion")]),
      item("4", "versteht Minus als Wegnehmen oder Unterschied", [m("math", "addition_subtraktion")]),
      item("5", "löst einfache Aufgaben zunehmend ohne Material", [m("math", "addition_subtraktion")]),
      item("6", "nutzt Zahlzerlegungen beim Rechnen", [m("math", "zerlegung"), m("math", "addition_subtraktion")]),
      item("7", "erklärt einen Rechenweg mit Unterstützung", [m("math", "addition_subtraktion"), m("speech", "erzaehlen")])
    ]
  },
  {
    id: "M4", group: "Mathematik", title: "Sachrechnen, Muster und Größen", description: "Operationsverständnis und Anwendung",
    items: [
      item("1", "setzt einfache Muster fort", [m("math", "praenumerisch")]),
      item("2", "erfasst eine einfache Sachsituation", [m("math", "sachrechnen")]),
      item("3", "ordnet eine passende Rechenfrage oder Rechnung zu", [m("math", "sachrechnen")]),
      item("4", "formuliert eine passende Antwort", [m("math", "sachrechnen"), m("speech", "grammatik")]),
      item("5", "vergleicht Längen oder Mengen handelnd", [m("math", "sachrechnen")])
    ]
  },
  {
    id: "M5", group: "Mathematik", title: "Mathematik erweitert", description: "Zahlraum und Rechnen bis 100",
    items: [
      item("1", "liest, schreibt und ordnet Zahlen bis 100", [m("math", "zahlenraum")]),
      item("2", "zerlegt zweistellige Zahlen in Zehner und Einer", [m("math", "beziehungen"), m("math", "zahlenraum")]),
      item("3", "rechnet einfache Plusaufgaben im Zahlenraum bis 100", [m("math", "addition_subtraktion")]),
      item("4", "rechnet einfache Minusaufgaben im Zahlenraum bis 100", [m("math", "addition_subtraktion")]),
      item("5", "nutzt Aufgabenbeziehungen oder bekannte Strategien", [m("math", "addition_subtraktion"), m("cognition", "denken")])
    ]
  },
  {
    id: "V1", group: "Lernen & Verhalten", title: "Ausgangsbeobachtung", description: "Anforderungen, Blockieren und Rückkehr",
    items: [
      item("1", "beginnt eine bekannte leichte Aufgabe", [m("learning", "aufgabenbeginn")]),
      item("2", "beginnt eine neue oder ungewohnte Aufgabe", [m("learning", "aufgabenbeginn"), m("emotional", "frustration")]),
      item("3", "bleibt nach einem Fehler ansprechbar", [m("emotional", "frustration"), m("emotional", "selbstkontrolle")]),
      item("4", "kehrt nach einer kurzen Pause zur Aufgabe zurück", [m("learning", "ausdauer"), m("emotional", "frustration")]),
      item("5", "benennt oder zeigt eine passende Hilfe", [m("emotional", "selbstwahrnehmung"), m("learning", "mitarbeit")])
    ]
  },
  {
    id: "V2", group: "Lernen & Verhalten", title: "Lern- und Arbeitsverhalten", description: "Beginn, Ausdauer, Fehlerreaktion und Rückkehr",
    items: [
      item("1", "erfasst den Arbeitsauftrag", [m("learning", "aufgabenbeginn"), m("speech", "verstehen")]),
      item("2", "beginnt nach kurzer Orientierung", [m("learning", "aufgabenbeginn")]),
      item("3", "bleibt bei einer überschaubaren Aufgabe", [m("learning", "ausdauer"), m("cognition", "aufmerksamkeit")]),
      item("4", "arbeitet nach einer Rückmeldung weiter", [m("learning", "organisation"), m("emotional", "frustration")]),
      item("5", "beendet eine begonnene Aufgabe", [m("learning", "ausdauer")]),
      item("6", "kontrolliert ein Ergebnis mit Hilfe", [m("learning", "organisation"), m("cognition", "denken")])
    ]
  },
  {
    id: "V3", group: "Lernen & Verhalten", title: "Hilfe annehmen und Neues lernen", description: "Unterstützung, Strategien und Transfer",
    items: [
      item("1", "nimmt Unterstützung nach kurzer Erklärung an", [m("learning", "mitarbeit"), m("emotional", "frustration")]),
      item("2", "stellt Rückfragen, wenn etwas unklar ist", [m("learning", "aufgabenbeginn"), m("speech", "kommunikation")]),
      item("3", "probiert nach Vormachen eine neue Strategie aus", [m("cognition", "denken"), m("learning", "mitarbeit")]),
      item("4", "überträgt Gezeigtes auf eine ähnliche Aufgabe", [m("cognition", "denken")]),
      item("5", "bleibt bei neuen Aufgaben trotz Unsicherheit dran", [m("emotional", "frustration"), m("learning", "ausdauer")])
    ]
  },
  {
    id: "V4", group: "Lernen & Verhalten", title: "Sozial-emotionale Beobachtung", description: "Regulation, Konflikte, Rückzug und Aggression",
    items: [
      item("1", "bleibt bei Anspannung ansprechbar", [m("emotional", "frustration"), m("emotional", "selbstkontrolle")]),
      item("2", "nutzt ein vereinbartes Stopp- oder Pausensignal", [m("emotional", "selbstkontrolle")]),
      item("3", "akzeptiert Grenzen anderer", [m("emotional", "kontakt"), m("emotional", "selbstkontrolle")]),
      item("4", "holt sich bei einem Konflikt Hilfe", [m("emotional", "kontakt")]),
      item("5", "arbeitet in einer überschaubaren Gruppe mit", [m("emotional", "kontakt"), m("learning", "mitarbeit")]),
      item("6", "reflektiert eine Situation nach der Beruhigung", [m("emotional", "selbstwahrnehmung"), m("emotional", "selbstkontrolle")])
    ]
  },
  {
    id: "V6", group: "Lernen & Verhalten", title: "Situationsvergleich", description: "Auslöser und Gelingensbedingungen vergleichen",
    items: [
      item("1", "zeigt die Kompetenz in einer vertrauten Situation", [m("learning", "mitarbeit")]),
      item("2", "zeigt die Kompetenz bei einer neuen Anforderung", [m("learning", "mitarbeit"), m("emotional", "frustration")]),
      item("3", "zeigt die Kompetenz im ruhigen Einzelsetting", [m("cognition", "aufmerksamkeit")]),
      item("4", "zeigt die Kompetenz in der Klasse oder Gruppe", [m("cognition", "aufmerksamkeit"), m("emotional", "kontakt")]),
      item("5", "profitiert erkennbar von einer passenden Anpassung", [m("learning", "orientierung")])
    ]
  }
];

export const REPORT_TEMPLATES = {
  "learning|aufgabenbeginn": {
    goal: "Das Kind beginnt eine überschaubare Aufgabe nach kurzer Orientierung zunehmend selbstständig.",
    measures: "Arbeitsaufträge werden kurz gegliedert und der erste Schritt sichtbar gemacht. Eine Startkarte oder kurze Modellaufgabe wird eingesetzt.",
    evaluation: "In zwei vergleichbaren Arbeitsphasen pro Woche wird dokumentiert, mit welcher Hilfe der Aufgabenbeginn gelingt."
  },
  "learning|ausdauer": {
    goal: "Das Kind arbeitet für eine vereinbarte kurze Zeit weiter und beendet eine begonnene Aufgabe zunehmend häufiger.",
    measures: "Aufgaben werden in sichtbare Teilschritte gegliedert. Arbeitszeit und kurze Pause werden verlässlich vereinbart.",
    evaluation: "Bearbeitungsdauer, benötigte Impulse und Abschluss der Aufgabe werden über sechs Wochen verglichen."
  },
  "learning|mitarbeit": {
    goal: "Das Kind nimmt passende Unterstützung zunehmend an und nutzt vereinbarte Hilfen bei neuen Aufgaben.",
    measures: "Hilfen werden als Wahl angeboten, kurz vorgemacht und nach einem erfolgreichen Teilschritt wieder reduziert.",
    evaluation: "In neuen Aufgaben wird notiert, welche Hilfe angenommen wird und ob anschließend selbstständig weitergearbeitet wird."
  },
  "emotional|frustration": {
    goal: "Das Kind bleibt bei Fehlern und schwierigen Aufgaben zunehmend ansprechbar und nutzt eine vereinbarte Regulationsstrategie.",
    measures: "Schwierige Aufgaben werden angekündigt und kleinschrittig angeboten. Pausenkarte, Wahlmöglichkeit und ruhige Rückkehr zur Aufgabe werden verbindlich genutzt.",
    evaluation: "Auslöser, Intensität, Rückkehrzeit und wirksame Hilfe werden in vergleichbaren Situationen dokumentiert."
  },
  "emotional|selbstkontrolle": {
    goal: "Das Kind nutzt in angespannten Situationen ein vereinbartes Stopp- oder Pausensignal und bleibt zunehmend handlungsfähig.",
    measures: "Ein einheitliches Stoppsignal und ein kurzer Beruhigungsweg werden vorab geübt und vom Team gleich eingesetzt.",
    evaluation: "Es wird beobachtet, ob das Signal vor einer Eskalation angenommen und die Rückkehr ermöglicht wird."
  },
  "speech|verstehen": {
    goal: "Das Kind versteht kurze, klar formulierte Arbeitsaufträge zunehmend sicher und setzt sie mit weniger Unterstützung um.",
    measures: "Aufträge werden kurz gesprochen, visualisiert und vom Kind durch Zeigen oder Wiederholen gesichert.",
    evaluation: "Die Anzahl selbstständig umgesetzter Handlungsschritte wird in ruhiger und alltäglicher Situation verglichen."
  },
  "cognition|gedaechtnis": {
    goal: "Das Kind behält kurze Aufträge oder Strategien und ruft sie nach einer Pause zunehmend sicher ab.",
    measures: "Inhalte werden mit Bild, Handlung und kurzer Wiederholung gesichert. Die Hilfe wird schrittweise reduziert.",
    evaluation: "Abruf nach zehn Minuten und am Folgetag wird mit einer ähnlichen Aufgabe dokumentiert."
  },
  "cognition|denken": {
    goal: "Das Kind nutzt eine bekannte Strategie zunehmend selbstständig bei einer ähnlichen neuen Aufgabe.",
    measures: "Eine Strategie wird modelliert, gemeinsam benannt und anschließend mit verändertem Material erprobt.",
    evaluation: "Es wird festgehalten, ob die Strategie erkannt, behalten und ohne erneutes Vormachen übertragen wird."
  },
  "german|lesen": {
    goal: "Das Kind liest kurze lautgetreue Wörter und einfache Sätze zunehmend genau und sinnbezogen.",
    measures: "Kurze Leseeinheiten mit Silbenmarkierung, wiederholtem Lesen und Pseudowörtern werden regelmäßig durchgeführt.",
    evaluation: "Lesegenauigkeit, Rateverhalten und Verständnis werden mit vergleichbaren Wort- und Satzlisten überprüft."
  },
  "german|schreiben": {
    goal: "Das Kind verschriftet Laute in einfachen Wörtern zunehmend vollständig und kontrolliert Geschriebenes mit einer festen Strategie.",
    measures: "Lautgetreue Wörter, deutliches Mitsprechen, Silbenhilfe und eine kurze Abschreib- oder Kontrollroutine werden eingesetzt.",
    evaluation: "Zwei kurze Schreibproben werden nach Lautvollständigkeit, Wortgrenzen und genutzter Hilfe verglichen."
  },
  "math|mengen": {
    goal: "Das Kind erfasst strukturierte Mengen und ordnet ihnen zunehmend sicher passende Zahlen zu.",
    measures: "Würfelbilder, Zehnerfeld und handelndes Material werden miteinander verknüpft; reines Abzählen wird schrittweise reduziert.",
    evaluation: "Mengen bis zehn werden in wechselnder Darstellung erneut angeboten und Strategie sowie Treffer werden dokumentiert."
  },
  "math|zahlenraum": {
    goal: "Das Kind orientiert sich im vereinbarten Zahlenraum zunehmend sicher und nutzt Zehner und Einer zur Einordnung.",
    measures: "Zahlenstrahl, Stellenwertmaterial und Zahlendarstellungen werden handelnd, bildlich und symbolisch verbunden.",
    evaluation: "Lesen, Ordnen, Nachbarzahlen und Stellenwert werden mit vergleichbaren Aufgaben erneut geprüft."
  },
  "math|addition_subtraktion": {
    goal: "Das Kind löst Plus- und Minusaufgaben im vereinbarten Zahlenraum zunehmend mit einer passenden Strategie.",
    measures: "Rechenwege werden mit Material aufgebaut, versprachlicht und anschließend in kurzen Aufgabenserien gefestigt.",
    evaluation: "Ergebnis, Strategie und benötigtes Material werden bei bekannten und ähnlichen neuen Aufgaben verglichen."
  },
  "perception|auditive_differenzierung": {
    goal: "Das Kind unterscheidet ausgewählte Geräusche, Laute oder ähnlich klingende Wörter in ruhiger Situation zunehmend sicher.",
    measures: "Kurze Hörvergleiche werden mit deutlicher Aussprache, wenig Störschall und visueller Sicherung durchgeführt.",
    evaluation: "Die gleiche Unterscheidungsaufgabe wird in ruhiger und alltäglicher Situation erneut beobachtet."
  },
  "perception|raum_lage": {
    goal: "Das Kind unterscheidet Lage, Richtung und ausgewählte gedrehte Zeichen zunehmend sicher.",
    measures: "Raumlage wird handelnd, mit Lagekarten und klarer Seitenstruktur aufgebaut; Markierungen werden schrittweise reduziert.",
    evaluation: "Vergleichbare Lage- und Zeichenaufgaben werden mit und ohne Markierung erneut angeboten."
  },
  "motor|graphomotorik": {
    goal: "Das Kind führt Linien, Formen, Buchstaben und Zahlen zunehmend kontrolliert und formklar aus.",
    measures: "Kurze graphomotorische Aufgaben, passende Lineatur, geeigneter Stift und reduzierte Schreibmenge werden erprobt.",
    evaluation: "Schreibproben und Beobachtungen zu Haltung, Druck, Form und Ermüdung werden verglichen."
  },
  "motor|planung": {
    goal: "Das Kind setzt beide Körperseiten bei einer einfachen Bewegungs- oder Arbeitsfolge zunehmend abgestimmt ein.",
    measures: "Kurze beidseitige Bewegungsfolgen werden vorgemacht, rhythmisch begleitet und ohne Zeitdruck wiederholt.",
    evaluation: "Planung, Reihenfolge, Rhythmus und benötigtes Vormachen werden in gleichen Aufgaben dokumentiert."
  }
};

export function areaById(id) {
  return AREAS.find((area) => area.id === id);
}

export function subareaLabel(areaId, subareaId) {
  return areaById(areaId)?.subareas.find(([id]) => id === subareaId)?.[1] || subareaId;
}

export function moduleById(id) {
  return MODULES.find((module) => module.id === id);
}

export function responseKey(moduleId, itemId) {
  return `${moduleId}:${itemId}`;
}

export function profileKey(areaId, subareaId) {
  return `${areaId}|${subareaId}`;
}
