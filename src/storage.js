const STORAGE_KEY = "screeningKompass:case:v1";
let memoryState = null;

export function createEmptyState() {
  return {
    schemaVersion: 1,
    caseData: {
      label: "",
      className: "",
      schoolYear: "",
      languages: "",
      period: "",
      question: "",
      strengths: ""
    },
    selectedModules: ["V2", "V3", "D2", "M2"],
    responses: {},
    manualRatings: {},
    manualCompetencyRatings: {},
    competencyEvidence: {},
    priorities: [],
    reportEdits: {},
    selectedPrintSheets: [],
    printSelectionInitialized: false,
    activeProfileKey: "",
    currentModuleId: "V3",
    currentItemIndex: 0,
    savedAt: ""
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryState || createEmptyState();
    const parsed = JSON.parse(raw);
    return {
      ...createEmptyState(),
      ...parsed,
      caseData: { ...createEmptyState().caseData, ...(parsed.caseData || {}) },
      priorities: (parsed.priorities || []).filter((key) => !String(key).includes("|"))
    };
  } catch {
    return memoryState || createEmptyState();
  }
}

export function saveState(state) {
  const next = { ...state, savedAt: new Date().toISOString() };
  memoryState = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Manche Browser sperren lokale Speicherung bei direkt geöffneten HTML-Dateien.
    // In diesem Fall bleibt der Fall für die aktuelle Sitzung im Arbeitsspeicher.
  }
  return next;
}

export function resetState() {
  memoryState = null;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* Sitzungsspeicher ist bereits geleert. */ }
  return createEmptyState();
}

export function exportBackup(state) {
  const safeLabel = (state.caseData.label || "fall").replace(/[^a-z0-9äöüß_-]+/gi, "-").replace(/^-|-$/g, "") || "fall";
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), app: "Screening-Kompass", data: state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `screening-kompass-${safeLabel}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const data = parsed.data || parsed;
  if (!data || data.schemaVersion !== 1 || typeof data.responses !== "object") {
    throw new Error("Die Sicherungsdatei gehört nicht zu dieser App-Version.");
  }
  const next = {
    ...createEmptyState(),
    ...data,
    caseData: { ...createEmptyState().caseData, ...(data.caseData || {}) },
    priorities: (data.priorities || []).filter((key) => !String(key).includes("|"))
  };
  return saveState(next);
}
