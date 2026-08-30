import { APP_RATINGS, AREAS, EVIDENCE_CODES, MODULES, REPORT_TEMPLATES, areaById, profileKey, responseKey, subareaLabel } from "./data.js";

const codeMap = new Map(EVIDENCE_CODES.map((code) => [code.value, code]));

function suggestedRating(codes) {
  const observed = codes.filter(Boolean);
  if (!observed.length) return "nb";
  const known = observed.filter((code) => code !== "?");
  if (!known.length) return "nb";
  if (known.some((code) => code === "G" || code === "N")) return "-";
  if (known.every((code) => code === "S")) return "+";
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
      for (const mapping of observation.mappings) {
        const key = profileKey(mapping.areaId, mapping.subareaId);
        const existing = groups.get(key) || {
          key,
          areaId: mapping.areaId,
          subareaId: mapping.subareaId,
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
        groups.set(key, existing);
      }
    }
  }

  return [...groups.values()]
    .map((entry) => {
      const suggestion = suggestedRating(entry.codes);
      const rating = state.manualRatings[entry.key] || suggestion;
      return {
        ...entry,
        areaLabel: areaById(entry.areaId)?.label || entry.areaId,
        subareaLabel: subareaLabel(entry.areaId, entry.subareaId),
        suggestion,
        rating,
        evidence: unique(entry.evidence),
        supports: unique(entry.supports),
        contexts: unique(entry.contexts),
        sources: unique(entry.sources),
        isPriority: state.priorities.includes(entry.key)
      };
    })
    .sort((a, b) => {
      const areaOrder = AREAS.findIndex((area) => area.id === a.areaId) - AREAS.findIndex((area) => area.id === b.areaId);
      return areaOrder || a.subareaLabel.localeCompare(b.subareaLabel, "de");
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
  const template = REPORT_TEMPLATES[row.key] || {
    goal: `Das Kind zeigt die nächste Kompetenz im Bereich „${row.subareaLabel}“ in vergleichbaren Situationen zunehmend selbstständig.`,
    measures: "Die wirksame Hilfe aus dem Screening wird gezielt eingesetzt, dokumentiert und schrittweise reduziert.",
    evaluation: "Die Entwicklung wird nach sechs bis acht Wochen mit einer vergleichbaren Aufgabe unter dokumentierten Bedingungen überprüft."
  };
  const evidenceText = row.evidence.length
    ? row.evidence.slice(0, 3).join(" ")
    : `Im Screening zeigte sich im Bereich „${row.subareaLabel}“ ein ${ratingDescription(row.rating)} Ergebnis.`;
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
