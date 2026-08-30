// Vorbereitete, noch nicht im UI aktivierte Schnittstelle zum FörderKompass.
// Das Format ist bewusst unabhängig von der Darstellung beider Apps und nutzt
// ausschließlich die stabilen Kompetenz-IDs aus dem FörderKompass-Katalog.

export const FOERDERKOMPASS_TRANSFER = Object.freeze({
  format: "de.foerderkompass.screening-transfer",
  schemaVersion: 1,
  sourceApp: "screening-kompass",
  targetApp: "foerderkompass",
  mergePolicy: "review-and-append",
  capabilities: [
    "case-context-v1",
    "competency-ratings-v1",
    "screening-evidence-v1",
    "priority-drafts-v1"
  ]
});

const cleanText = (value) => String(value || "").trim();
const uniqueTransferStrings = (values) => [...new Set((values || []).map(cleanText).filter(Boolean))];

export function buildFoerderkompassTransfer(state, profile, generatedAt = new Date().toISOString()) {
  const assessed = profile.filter((row) => ["+", "o", "-"].includes(row.rating));
  const priorities = new Set((state.priorities || []).slice(0, 3));
  return {
    transfer: { ...FOERDERKOMPASS_TRANSFER, generatedAt },
    caseContext: {
      label: cleanText(state.caseData?.label),
      className: cleanText(state.caseData?.className),
      schoolYear: cleanText(state.caseData?.schoolYear),
      languages: cleanText(state.caseData?.languages),
      period: cleanText(state.caseData?.period),
      question: cleanText(state.caseData?.question),
      strengths: cleanText(state.caseData?.strengths)
    },
    competencies: assessed.map((row) => ({
      competencyId: row.competencyId,
      areaId: row.areaId,
      subareaId: row.subareaId,
      rating: row.rating,
      priority: priorities.has(row.competencyId),
      evidence: uniqueTransferStrings(row.evidence),
      supports: uniqueTransferStrings(row.supports),
      contexts: uniqueTransferStrings(row.contexts),
      sources: uniqueTransferStrings(row.sources)
    })),
    priorityDrafts: assessed
      .filter((row) => priorities.has(row.competencyId))
      .map((row) => ({
        competencyId: row.competencyId,
        stand: cleanText(state.reportEdits?.[row.competencyId]?.stand),
        goal: cleanText(state.reportEdits?.[row.competencyId]?.goal),
        measures: cleanText(state.reportEdits?.[row.competencyId]?.measures)
      })),
    importRules: {
      requiresUserReview: true,
      overwriteExistingRatings: false,
      overwriteExistingText: false,
      importUnassessedCompetencies: false,
      maximumPriorities: 3
    }
  };
}

export function validateFoerderkompassTransfer(payload, competencyById) {
  const errors = [];
  if (payload?.transfer?.format !== FOERDERKOMPASS_TRANSFER.format) errors.push("Unbekanntes Übergabeformat.");
  if (payload?.transfer?.schemaVersion !== FOERDERKOMPASS_TRANSFER.schemaVersion) errors.push("Nicht unterstützte Formatversion.");
  if (!Array.isArray(payload?.competencies)) errors.push("Kompetenzliste fehlt.");
  const seen = new Set();
  for (const entry of payload?.competencies || []) {
    if (!competencyById.has(entry.competencyId)) errors.push(`Unbekannte Kompetenz-ID: ${entry.competencyId}`);
    if (seen.has(entry.competencyId)) errors.push(`Doppelte Kompetenz-ID: ${entry.competencyId}`);
    seen.add(entry.competencyId);
    if (!["+", "o", "-"].includes(entry.rating)) errors.push(`Ungültige Einordnung für ${entry.competencyId}.`);
  }
  if ((payload?.competencies || []).filter((entry) => entry.priority).length > 3) errors.push("Mehr als drei Förderprioritäten.");
  return { valid: errors.length === 0, errors };
}
