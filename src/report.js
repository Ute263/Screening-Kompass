import { APP_RATINGS, AREAS, EVIDENCE_CODES, MODULES, REPORT_TEMPLATES, profileKey, responseKey } from "./data.js";
import { COMPETENCIES, COMPETENCY_BY_ID } from "./competencies.js";
import { competencyIdsForObservation } from "./competency-links.js";

const codeMap = new Map(EVIDENCE_CODES.map((code) => [code.value, code]));

function suggestedRating(codes) {
  const observed = codes.filter(Boolean);
  if (!observed.length) return "nb";
  const known = observed.filter((code) => code !== "?");
  if (!known.length) return "nb";
  if (known.some((code) => code === "-")) return "-";
  if (known.every((code) => code === "++")) return "+";
  return "o";
}

function unique(items) {
  return [...new Set(items.map((value) => value?.trim()).filter(Boolean))];
}

export function buildProfile(state) {
  const groups = new Map();
  for (const module of MODULES) {
    if (!state.selectedModules.includes(module.id)) continue;
    for (const observation of module.items) {
      const response = state.responses[responseKey(module.id, observation.id)];
      if (!response?.code) continue;
      for (const competencyId of competencyIdsForObservation(module.id, observation.id)) {
        const competency = COMPETENCY_BY_ID.get(competencyId);
        if (!competency) continue;
        const existing = groups.get(competencyId) || {
          key: competencyId,
          competencyId,
          competencyLabel: competency.label,
          areaId: competency.areaId,
          areaLabel: competency.areaLabel,
          subareaId: competency.subareaId,
          subareaLabel: competency.subareaLabel,
          codes: [],
          evidence: [],
          supports: [],
          contexts: [],
          sources: []
        };
        existing.codes.push(response.code);
        if (response.evidence) existing.evidence.push(response.evidence);
        if (response.support) existing.supports.push(response.support);
        if (response.context) existing.contexts.push(response.context);
        existing.sources.push(`${module.id} · ${observation.text}`);
        groups.set(competencyId, existing);
      }
    }
  }

  for (const competency of COMPETENCIES) {
    const manualRating = state.manualCompetencyRatings?.[competency.id];
    const manualEvidence = state.competencyEvidence?.[competency.id];
    if ((!manualRating || manualRating === "nb") && !manualEvidence) continue;
    const existing = groups.get(competency.id) || {
      key: competency.id,
      competencyId: competency.id,
      competencyLabel: competency.label,
      areaId: competency.areaId,
      areaLabel: competency.areaLabel,
      subareaId: competency.subareaId,
      subareaLabel: competency.subareaLabel,
      codes: [], evidence: [], supports: [], contexts: [], sources: []
    };
    if (manualEvidence) existing.evidence.push(manualEvidence);
    if (manualRating && manualRating !== "nb") existing.sources.push("gezielte Kompetenzprüfung / fachliche Einordnung");
    groups.set(competency.id, existing);
  }

  return [...groups.values()]
    .map((entry) => {
      const suggestion = suggestedRating(entry.codes);
      const rating = state.manualCompetencyRatings?.[entry.key] || suggestion;
      return {
        ...entry,
        suggestion,
        rating,
        evidence: unique(entry.evidence),
        supports: unique(entry.supports),
        contexts: unique(entry.contexts),
        sources: unique(entry.sources),
        isPriority: state.priorities.includes(entry.key),
        fromScreening: entry.codes.length > 0
      };
    })
    .sort((a, b) => {
      const areaOrder = AREAS.findIndex((area) => area.id === a.areaId) - AREAS.findIndex((area) => area.id === b.areaId);
      return areaOrder || a.subareaLabel.localeCompare(b.subareaLabel, "de") || a.competencyLabel.localeCompare(b.competencyLabel, "de");
    });
}

export function buildCompetencyCoverage(state) {
  const profile = new Map(buildProfile(state).map((row) => [row.competencyId, row]));
  return COMPETENCIES.map((competency) => profile.get(competency.id) || {
    ...competency,
    key: competency.id,
    competencyId: competency.id,
    competencyLabel: competency.label,
    rating: "nb",
    suggestion: "nb",
    codes: [], evidence: [], supports: [], contexts: [], sources: [],
    fromScreening: false,
    isPriority: state.priorities.includes(competency.id)
  });
}

export function progressForModule(state, module) {
  const answered = module.items.filter((observation) => state.responses[responseKey(module.id, observation.id)]?.code).length;
  return { answered, total: module.items.length, complete: answered === module.items.length };
}

export function progressForArea(profile, areaId) {
  const rows = profile.filter((row) => row.areaId === areaId);
  return { observed: rows.length, needs: rows.filter((row) => row.rating === "-").length };
}

export function defaultReportFor(row) {
  const template = REPORT_TEMPLATES[profileKey(row.areaId, row.subareaId)] || {
    goal: `Das Kind zeigt die Kompetenz „${row.competencyLabel}“ in vergleichbaren Situationen zunehmend selbstständig.`,
    measures: "Die wirksame Hilfe aus dem Screening wird gezielt eingesetzt, dokumentiert und schrittweise reduziert.",
    evaluation: "Die Entwicklung wird nach sechs bis acht Wochen mit einer vergleichbaren Aufgabe unter dokumentierten Bedingungen überprüft."
  };
  const evidenceText = row.evidence.length
    ? row.evidence.slice(0, 3).join(" ")
    : `Zur Kompetenz „${row.competencyLabel}“ zeigte sich ein ${ratingDescription(row.rating)} Ergebnis.`;
  const supportText = row.supports.length ? ` Hilfreich war: ${row.supports.slice(0, 2).join("; ")}.` : "";
  const contextText = row.contexts.length ? ` Beobachtet wurde dies: ${row.contexts.slice(0, 2).join("; ")}.` : "";
  return {
    stand: `${evidenceText}${supportText}${contextText}`.trim(),
    goal: template.goal,
    measures: `${template.measures} ${template.evaluation}`.trim()
  };
}

export function reportForRow(state, row) {
  return { ...defaultReportFor(row), ...(state.reportEdits[row.key] || {}) };
}

export function ratingDescription(rating) {
  return APP_RATINGS.find((entry) => entry.value === rating)?.description || "noch nicht eingeordnetes";
}

export function buildTransferText(state, profile) {
  const priorities = state.priorities
    .map((key) => profile.find((row) => row.key === key))
    .filter(Boolean)
    .slice(0, 3);
  const caseData = state.caseData;
  const head = [
    "SCREENING-KOMPASS · ÜBERTRAGUNG ZUM FÖRDERKOMPASS",
    `Kind / Kürzel: ${caseData.label || "—"}`,
    `Klasse / Schuljahr: ${[caseData.className, caseData.schoolYear].filter(Boolean).join(" · ") || "—"}`,
    `Zeitraum: ${caseData.period || "—"}`,
    `Fragestellung: ${caseData.question || "—"}`,
    `Stärken und Gelingensbedingungen: ${caseData.strengths || "—"}`,
    ""
  ];
  if (!priorities.length) {
    return [...head, "Noch keine Förderpriorität ausgewählt."].join("\n");
  }
  const blocks = priorities.flatMap((row, index) => {
    const report = reportForRow(state, row);
    return [
      `${index + 1}. ${row.areaLabel} · ${row.subareaLabel}`,
      `Kompetenz: ${row.competencyLabel}`,
      `App-Einordnung: ${row.rating === "nb" ? "n. b." : row.rating}`,
      `Ist-Stand: ${report.stand}`,
      `Nächstes Ziel: ${report.goal}`,
      `Maßnahmen und Evaluation: ${report.measures}`,
      `Belege aus: ${row.sources.slice(0, 4).join("; ")}`,
      ""
    ];
  });
  return [...head, ...blocks, "Hinweis: Pädagogische Arbeitsgrundlage, keine Diagnose und keine standardisierte Testauswertung."].join("\n");
}

export function mapCodeToRating(code) {
  return codeMap.get(code)?.appRating || "nb";
}
