const STORAGE_KEY = "screeningKompass:case:v1";
let memoryState = null;

const LEGACY_CODE_MAP = Object.freeze({ S: "++", H: "+", V: "o", G: "o", N: "-", "?": "?" });

function migrateState(data) {
  const responses = Object.fromEntries(Object.entries(data?.responses || {}).map(([key, response]) => [
    key,
    { ...response, code: LEGACY_CODE_MAP[response?.code] || response?.code || "" }
  ]));
  return { ...data, schemaVersion: 2, responses };
}

export function createEmptyState() {
  return {
    schemaVersion: 2,
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
    const parsed = migrateState(JSON.parse(raw));
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
  if (!data || ![1, 2].includes(data.schemaVersion) || typeof data.responses !== "object") {
    throw new Error("Die Sicherungsdatei gehört nicht zu dieser App-Version.");
  }
  const migrated = migrateState(data);
  const next = {
    ...createEmptyState(),
    ...migrated,
    caseData: { ...createEmptyState().caseData, ...(migrated.caseData || {}) },
    priorities: (migrated.priorities || []).filter((key) => !String(key).includes("|"))
  };
  return saveState(next);
}
