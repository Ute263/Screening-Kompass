import { APP_RATINGS, AREAS, EVIDENCE_CODES, MODULE_GROUPS, MODULES, PRINT_SHEETS, areaById, moduleById, printSheetsForModules, profileKey, responseKey, subareaLabel } from "./data.js";
import { COMPETENCIES, COMPETENCY_AREAS, COMPETENCY_BY_ID } from "./competencies.js";
import { competencyIdsForObservation } from "./competency-links.js";
import { buildCompetencyCoverage, buildProfile, buildTransferText, progressForArea, progressForModule, reportForRow } from "./report.js";
import { createEmptyState, exportBackup, importBackup, loadState, resetState, saveState } from "./storage.js";

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const navItems = [
  ["fall", "Fall"],
  ["modules", "Module"],
  ["material", "Aufgaben"],
  ["observe", "Beobachten"],
  ["competencies", "Kompetenzen"],
  ["evaluate", "Auswerten"],
  ["plan", "Förderplan"]
];

let state = loadState();
let currentView = state.caseData.label ? "observe" : "fall";
let areaFilter = "all";
let competencyAreaFilter = "all";
let competencyScope = "all";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name, size = 20) {
  const paths = {
    folder: '<path d="M3 7h6l2 2h10v10H3z"/><path d="M3 7V5h7l2 2"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    bars: '<path d="M5 20V11M12 20V4M19 20V8"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    arrowLeft: '<path d="m15 18-6-6 6-6"/><path d="M9 12h11"/>',
    arrowRight: '<path d="m9 18 6-6-6-6"/><path d="M4 12h11"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
    save: '<path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 21h16"/>',
    print: '<path d="M7 9V3h10v6M7 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/><path d="M17 12h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'
  };
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
}

function persist({ rerender = false } = {}) {
  state = saveState(state);
  updateSaveStatus();
  if (rerender) render();
}

function updateSaveStatus() {
  const element = document.querySelector("[data-save-status]");
  if (element) element.innerHTML = `${icon("check", 16)} Lokal gespeichert`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("Kopieren nicht verfügbar");
  }
}

async function waitForPrintImages() {
  const images = [...document.querySelectorAll(".print-sheet-page img")];
  const results = await Promise.all(images.map((image) => {
    if (image.complete) return Promise.resolve(image.naturalWidth > 0);
    return new Promise((resolve) => {
      image.addEventListener("load", () => resolve(true), { once: true });
      image.addEventListener("error", () => resolve(false), { once: true });
    });
  }));
  return results.every(Boolean);
}

function header() {
  const primary = currentView === "observe"
    ? ["competencies", "Kompetenzen prüfen"]
    : currentView === "competencies"
      ? ["evaluate", "Auswertung öffnen"]
    : currentView === "evaluate"
      ? ["plan", "Förderplan vorbereiten"]
      : currentView === "plan"
        ? ["print", "Bericht drucken / PDF"]
        : currentView === "material"
          ? ["observe", "Beobachtung starten"]
          : [currentView === "fall" ? "modules" : "material", currentView === "fall" ? "Module auswählen" : "Aufgaben auswählen"];
  const navIcons = { fall: "folder", modules: "grid", material: "print", observe: "eye", competencies: "check", evaluate: "bars", plan: "doc" };
  return `
    <header class="app-header no-print">
      <button class="brand" data-action="nav" data-view="fall" aria-label="Zur Fallübersicht">
        <span class="brand-mark"><span></span><span></span><span></span></span>
        <span>Screening-Kompass</span>
      </button>
      <nav class="workflow-nav" aria-label="Arbeitsschritte">
        ${navItems.map(([id, label]) => `
          <button class="workflow-link ${currentView === id ? "is-active" : ""}" data-action="nav" data-view="${id}">
            ${icon(navIcons[id], 19)}<span>${label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="header-actions">
        <span class="save-status" data-save-status>${icon("check", 16)} Lokal gespeichert</span>
        <button class="button button-primary" data-action="${primary[0] === "print" ? "print" : "nav"}" ${primary[0] === "print" ? "" : `data-view="${primary[0]}"`}>
          ${primary[1]} ${primary[0] === "print" ? icon("doc", 17) : icon("arrowRight", 17)}
        </button>
      </div>
    </header>
  `;
}

function field(label, name, value, options = {}) {
  const multiline = options.multiline;
  return `
    <label class="field ${options.wide ? "field-wide" : ""}">
      <span>${label}</span>
      ${multiline
        ? `<textarea data-case-field="${name}" rows="${options.rows || 3}" placeholder="${escapeHtml(options.placeholder || "")}">${escapeHtml(value)}</textarea>`
        : `<input data-case-field="${name}" value="${escapeHtml(value)}" placeholder="${escapeHtml(options.placeholder || "")}" autocomplete="off" />`}
    </label>
  `;
}

function fallView() {
  const data = state.caseData;
  return `
    <main class="simple-page">
      <section class="page-heading">
        <div>
          <h1>Fall anlegen</h1>
          <p>Nur die Angaben erfassen, die für Durchführung und Förderung notwendig sind.</p>
        </div>
        <button class="button button-secondary" data-action="new-case">${icon("plus", 17)} Neuer Fall</button>
      </section>
      <div class="case-layout">
        <section class="form-surface" aria-labelledby="case-title">
          <h2 id="case-title">Angaben zum Screening</h2>
          <div class="form-grid">
            ${field("Kind / Kürzel", "label", data.label, { placeholder: "z. B. Kind A oder Kürzel" })}
            ${field("Klasse", "className", data.className, { placeholder: "z. B. Klasse 2" })}
            ${field("Schulbesuchsjahr", "schoolYear", data.schoolYear, { placeholder: "z. B. 2. Schulbesuchsjahr" })}
            ${field("Zeitraum", "period", data.period, { placeholder: "z. B. 02.–13.09.2026" })}
            ${field("Familiensprache(n) / Beschulung", "languages", data.languages, { wide: true, placeholder: "nur wenn für die Einordnung relevant" })}
            ${field("Anlass und aktuelle Fragestellung", "question", data.question, { wide: true, multiline: true, rows: 3, placeholder: "Was soll durch das Screening genauer geklärt werden?" })}
            ${field("Stärken, Interessen und Gelingensbedingungen", "strengths", data.strengths, { wide: true, multiline: true, rows: 3, placeholder: "Was gelingt bereits? Wodurch wird Mitarbeit wahrscheinlicher?" })}
          </div>
          <div class="form-actions">
            <button class="button button-primary" data-action="nav" data-view="modules">Module auswählen ${icon("arrowRight", 17)}</button>
          </div>
        </section>
        <aside class="guidance-panel">
          <h2>Arbeitsweise</h2>
          <ol class="plain-steps">
            <li><span>1</span><p>Fragestellung festlegen und nur passende Module auswählen.</p></li>
            <li><span>2</span><p>Leistung, Hilfe, Lernreaktion und Situation getrennt dokumentieren.</p></li>
            <li><span>3</span><p>Höchstens drei belegte Förderprioritäten übernehmen.</p></li>
          </ol>
          <div class="notice notice-yellow">
            ${icon("info", 19)}
            <p><strong>Keine Diagnose.</strong> Das Tool ordnet Beobachtungen, ersetzt aber weder standardisierte Tests noch medizinische oder sonderpädagogische Diagnostik.</p>
          </div>
          <div class="data-actions">
            <button class="button button-quiet" data-action="export">${icon("download", 17)} Sicherung exportieren</button>
            <button class="button button-quiet" data-action="open-import">${icon("upload", 17)} Sicherung importieren</button>
            <input class="visually-hidden" id="backup-import" type="file" accept="application/json,.json" />
          </div>
        </aside>
      </div>
    </main>
  `;
}

function modulesView() {
  const selected = new Set(state.selectedModules);
  const totalItems = MODULES.filter((module) => selected.has(module.id)).reduce((sum, module) => sum + module.items.length, 0);
  return `
    <main class="simple-page module-page">
      <section class="page-heading">
        <div>
          <h1>Module auswählen</h1>
          <p>Wähle nur die Bereiche aus, die zur aktuellen Fragestellung beitragen.</p>
        </div>
        <button class="button button-primary" data-action="nav" data-view="material">Aufgaben auswählen ${icon("arrowRight", 17)}</button>
      </section>
      <div class="module-selection-layout">
        <div class="module-groups">
          ${MODULE_GROUPS.map((group) => {
            const modules = MODULES.filter((module) => module.group === group);
            return `
              <section class="module-group">
                <div class="section-title-line"><h2>${group}</h2><span>${modules.filter((module) => selected.has(module.id)).length} ausgewählt</span></div>
                <div class="module-list">
                  ${modules.map((module) => `
                    <label class="module-choice ${selected.has(module.id) ? "is-selected" : ""}">
                      <input type="checkbox" data-module-toggle="${module.id}" ${selected.has(module.id) ? "checked" : ""} />
                      <span class="choice-check">${selected.has(module.id) ? icon("check", 15) : ""}</span>
                      <span class="module-code">${module.id}</span>
                      <span class="module-copy"><strong>${module.title}</strong><small>${module.description}</small></span>
                      <span class="module-count">${module.items.length} Beobachtungen</span>
                    </label>
                  `).join("")}
                </div>
              </section>
            `;
          }).join("")}
        </div>
        <aside class="selection-summary">
          <h2>Deine Auswahl</h2>
          <div class="summary-number"><strong>${selected.size}</strong><span>Module</span></div>
          <div class="summary-number"><strong>${totalItems}</strong><span>Beobachtungen</span></div>
          <p>Du kannst die Auswahl jederzeit ergänzen. Bereits eingetragene Ergebnisse bleiben erhalten.</p>
          <button class="button button-primary button-block" data-action="nav" data-view="material">Aufgaben auswählen</button>
        </aside>
      </div>
    </main>
  `;
}

const PRINT_KIND_ORDER = [
  "Aufgaben- und Beobachtungsbogen",
  "Lesematerial",
  "Arbeitsmaterial",
  "Ausschneidematerial",
  "Zusatzbogen",
  "Lösung und Auswertung"
];

function ensurePrintSelection() {
  const relevant = printSheetsForModules(state.selectedModules);
  const relevantIds = new Set(relevant.map((entry) => entry.id));
  let changed = false;
  if (!state.printSelectionInitialized) {
    state.selectedPrintSheets = relevant.filter((entry) => entry.recommended).map((entry) => entry.id);
    state.printSelectionInitialized = true;
    changed = true;
  } else {
    const cleaned = (state.selectedPrintSheets || []).filter((id) => relevantIds.has(id));
    if (cleaned.length !== (state.selectedPrintSheets || []).length) {
      state.selectedPrintSheets = cleaned;
      changed = true;
    }
  }
  if (changed) state = saveState(state);
  return relevant;
}

function sheetModuleLabels(entry) {
  return entry.moduleIds
    .filter((id) => state.selectedModules.includes(id))
    .map((id) => `${id} · ${moduleById(id)?.title || id}`)
    .join(" · ");
}

function materialView() {
  if (!state.selectedModules.length) {
    return `<main class="empty-state"><h1>Noch keine Module ausgewählt</h1><p>Wähle zuerst die passenden Screeningmodule aus.</p><button class="button button-primary" data-action="nav" data-view="modules">Module auswählen</button></main>`;
  }
  const relevant = ensurePrintSelection();
  const selected = new Set(state.selectedPrintSheets || []);
  const selectedCount = relevant.filter((entry) => selected.has(entry.id)).length;
  return `
    <main class="simple-page materials-page">
      <section class="page-heading">
        <div>
          <h1>Aufgaben und Material auswählen</h1>
          <p>Passend zu den gewählten Modulen werden die Originalseiten aus dem Screening-Baukasten angeboten.</p>
        </div>
        <button class="button button-primary" data-action="print-materials" ${selectedCount ? "" : "disabled"}>${icon("print", 17)} ${selectedCount} Seiten drucken</button>
      </section>
      <section class="material-summary">
        <div><strong>${state.selectedModules.length}</strong><span>ausgewählte Module</span></div>
        <div><strong>${relevant.length}</strong><span>passende PDF-Seiten</span></div>
        <div><strong>${selectedCount}</strong><span>für den Druck ausgewählt</span></div>
        <div class="material-summary-actions">
          <button class="button button-secondary" data-action="select-recommended-sheets">Empfohlene Seiten auswählen</button>
          <button class="button button-quiet" data-action="clear-print-sheets">Auswahl leeren</button>
        </div>
      </section>
      <div class="material-groups">
        ${PRINT_KIND_ORDER.map((kind) => {
          const sheets = relevant.filter((entry) => entry.kind === kind);
          if (!sheets.length) return "";
          return `<section class="material-group">
            <div class="section-title-line"><h2>${kind}</h2><span>${sheets.filter((entry) => selected.has(entry.id)).length} von ${sheets.length} ausgewählt</span></div>
            <div class="print-sheet-grid">
              ${sheets.map((entry) => `<label class="print-sheet-choice ${selected.has(entry.id) ? "is-selected" : ""}">
                <input type="checkbox" data-print-sheet="${entry.id}" ${selected.has(entry.id) ? "checked" : ""} />
                <span class="sheet-preview"><img src="${entry.image}" alt="Vorschau: ${escapeHtml(entry.title)}" loading="lazy" /></span>
                <span class="sheet-copy">
                  <span class="sheet-meta"><strong>${entry.code}</strong><small>PDF-Seite ${entry.page}</small></span>
                  <strong>${entry.title}</strong>
                  <small>${escapeHtml(sheetModuleLabels(entry))}</small>
                </span>
                <span class="choice-check">${selected.has(entry.id) ? icon("check", 15) : ""}</span>
              </label>`).join("")}
            </div>
          </section>`;
        }).join("")}
      </div>
      <section class="material-bottom-actions">
        <button class="button button-secondary" data-action="nav" data-view="modules">${icon("arrowLeft", 17)} Module ändern</button>
        <button class="button button-primary" data-action="print-materials" ${selectedCount ? "" : "disabled"}>${icon("print", 17)} Ausgewählte Seiten drucken</button>
        <button class="button button-secondary" data-action="nav" data-view="observe">Beobachtung starten ${icon("arrowRight", 17)}</button>
      </section>
    </main>
  `;
}

function printMaterialsView() {
  const selected = new Set(state.selectedPrintSheets || []);
  const sheets = printSheetsForModules(state.selectedModules).filter((entry) => selected.has(entry.id));
  return `
    <main class="material-print-page">
      <section class="print-material-toolbar no-print">
        <div><h1>Druckvorschau</h1><p>${sheets.length} ausgewählte Seiten aus dem Screening-Baukasten</p></div>
        <div>
          <button class="button button-secondary" data-action="close-material-print">${icon("arrowLeft", 17)} Auswahl ändern</button>
          <button class="button button-primary" data-action="print-materials-again">${icon("print", 17)} Drucken</button>
        </div>
      </section>
      <section class="print-sheet-stack">
        ${sheets.map((entry) => `<article class="print-sheet-page"><img src="${entry.image}" alt="${escapeHtml(entry.code)}: ${escapeHtml(entry.title)}" /></article>`).join("")}
      </section>
    </main>
  `;
}

function moduleRail(currentModule) {
  return `
    <aside class="module-rail no-print">
      <div class="rail-heading"><strong>Ausgewählte Module</strong><button class="icon-button" data-action="nav" data-view="modules" aria-label="Modulauswahl ändern">${icon("grid", 18)}</button></div>
      ${MODULE_GROUPS.map((group) => {
        const modules = MODULES.filter((module) => module.group === group && state.selectedModules.includes(module.id));
        if (!modules.length) return "";
        return `
          <section class="rail-group">
            <h3>${group}</h3>
            ${modules.map((module) => {
              const progress = progressForModule(state, module);
              return `<button class="rail-module ${module.id === currentModule.id ? "is-active" : ""}" data-action="select-module" data-module="${module.id}">
                <span>${module.id}</span><span class="rail-module-title">${module.title}</span><span class="rail-status ${progress.complete ? "is-complete" : ""}">${progress.complete ? icon("check", 13) : `${progress.answered}/${progress.total}`}</span>
              </button>`;
            }).join("")}
          </section>
        `;
      }).join("")}
    </aside>
  `;
}

function evidenceButtons(moduleId, observation, currentCode) {
  return `<div class="evidence-control" role="group" aria-label="Beobachtungscode für ${escapeHtml(observation.text)}">
    ${EVIDENCE_CODES.map((code) => `<button class="evidence-button ${currentCode === code.value ? "is-selected" : ""}" title="${escapeHtml(code.label)}" data-action="set-code" data-module="${moduleId}" data-item="${observation.id}" data-code="${code.value}">${code.short}</button>`).join("")}
  </div>`;
}

function observeView() {
  const selected = MODULES.filter((module) => state.selectedModules.includes(module.id));
  if (!selected.length) {
    return `<main class="empty-state"><h1>Noch keine Module ausgewählt</h1><p>Wähle zunächst die passenden Screeningmodule aus.</p><button class="button button-primary" data-action="nav" data-view="modules">Module auswählen</button></main>`;
  }
  let currentModule = moduleById(state.currentModuleId);
  if (!currentModule || !state.selectedModules.includes(currentModule.id)) {
    currentModule = selected[0];
    state.currentModuleId = currentModule.id;
  }
  const index = Math.min(Math.max(state.currentItemIndex || 0, 0), currentModule.items.length - 1);
  const activeItem = currentModule.items[index];
  const activeKey = responseKey(currentModule.id, activeItem.id);
  const activeResponse = state.responses[activeKey] || {};
  const profile = buildProfile(state);
  const activeCompetencies = competencyIdsForObservation(currentModule.id, activeItem.id)
    .map((competencyId) => {
      const competency = COMPETENCY_BY_ID.get(competencyId);
      if (!competency) return null;
      return { ...competency, row: profile.find((entry) => entry.key === competencyId) };
    })
    .filter(Boolean);
  const moduleProgress = progressForModule(state, currentModule);
  return `
    <main class="workspace observe-workspace">
      ${moduleRail(currentModule)}
      <section class="workspace-main">
        <div class="workspace-title">
          <div><h1>${currentModule.id} · ${currentModule.title}</h1><p>${currentModule.description}</p></div>
          <span>${moduleProgress.answered} von ${moduleProgress.total} dokumentiert</span>
        </div>
        <div class="observation-table" role="table" aria-label="Beobachtungsaspekte">
          <div class="observation-head" role="row"><span>Nr.</span><span>Beobachtungsaspekt</span><span>Evidenz</span></div>
          ${currentModule.items.map((observation, itemIndex) => {
            const key = responseKey(currentModule.id, observation.id);
            const response = state.responses[key] || {};
            const active = itemIndex === index;
            return `
              <div class="observation-row ${active ? "is-active" : ""}" role="row" data-action="select-item" data-index="${itemIndex}">
                <span class="observation-number">${itemIndex + 1}</span>
                <strong>${observation.text}</strong>
                ${evidenceButtons(currentModule.id, observation, response.code)}
              </div>
              ${active ? `
                <div class="observation-detail">
                  <label class="field field-wide"><span>Konkreter Beleg</span><textarea rows="4" data-response-field="evidence" data-response-key="${activeKey}" placeholder="Was war konkret zu sehen oder zu hören?">${escapeHtml(activeResponse.evidence || "")}</textarea></label>
                  <div class="detail-grid">
                    <label class="field"><span>Hilfreiche Unterstützung</span><input data-response-field="support" data-response-key="${activeKey}" value="${escapeHtml(activeResponse.support || "")}" placeholder="z. B. visuelles Beispiel, Wahlmöglichkeit" /></label>
                    <label class="field"><span>Situation / Tagesform</span><input data-response-field="context" data-response-key="${activeKey}" value="${escapeHtml(activeResponse.context || "")}" placeholder="z. B. Einzelarbeit, ausgeruht" /></label>
                  </div>
                </div>
              ` : ""}
            `;
          }).join("")}
        </div>
      </section>
      <aside class="inspector no-print">
        <div class="inspector-heading"><h2>Zuordnung zum FörderKompass</h2>${icon("info", 18)}</div>
        <div class="notice notice-yellow compact">${icon("info", 17)}<p>Vorschlag – bitte fachlich prüfen</p></div>
        ${activeCompetencies.length ? activeCompetencies.map((competency) => `
          <section class="mapping-block">
            <h3>${competency.areaLabel}</h3>
            <p><small>${competency.subareaLabel}</small><br /><strong>${competency.label}</strong></p>
            <span class="mapping-result">${activeResponse.code ? `Beobachtungscode ${activeResponse.code} → ${competency.row?.rating === "nb" ? "n. b." : competency.row?.rating || "offen"}` : "Noch kein Beobachtungscode"}</span>
          </section>
        `).join("") : `<div class="notice compact"><p>Diese Beobachtung liefert Kontext, bewertet aber bewusst keine einzelne FörderKompass-Kompetenz automatisch.</p></div>`}
        <button class="button button-secondary button-block" data-action="toggle-priority" data-profile="${activeCompetencies[0]?.id || ""}" ${!activeResponse.code || !activeCompetencies.length ? "disabled" : ""}>
          ${icon("star", 17)} ${activeCompetencies[0]?.row?.isPriority ? "Priorität entfernen" : "Als Priorität vormerken"}
        </button>
        <div class="code-legend">
          <h3>Beobachtungscode</h3>
          ${EVIDENCE_CODES.map((code) => `<p><strong>${code.short}</strong><span>${code.label}</span></p>`).join("")}
        </div>
      </aside>
      <footer class="workspace-footer no-print">
        <button class="button button-secondary" data-action="previous-item" ${index === 0 ? "disabled" : ""}>${icon("arrowLeft", 17)} Vorherige Aufgabe</button>
        <div class="progress-track" aria-label="Fortschritt"><span>${index + 1} von ${currentModule.items.length}</span><div><i style="width:${((index + 1) / currentModule.items.length) * 100}%"></i></div></div>
        <button class="button button-primary" data-action="next-item">${index === currentModule.items.length - 1 ? "Nächstes Modul" : "Nächste Aufgabe"} ${icon("arrowRight", 17)}</button>
      </footer>
    </main>
  `;
}

function profileRatingSelect(row) {
  return `<select class="rating-select rating-${row.rating.replace("+", "plus")}" data-profile-rating="${row.key}" aria-label="App-Einordnung für ${escapeHtml(row.subareaLabel)}">
    ${APP_RATINGS.map((rating) => `<option value="${rating.value}" ${row.rating === rating.value ? "selected" : ""}>${rating.value === "nb" ? "n. b." : rating.value}</option>`).join("")}
  </select>`;
}

function selectedCompetencyIds() {
  const ids = new Set();
  for (const module of MODULES) {
    if (!state.selectedModules.includes(module.id)) continue;
    for (const observation of module.items) {
      for (const competencyId of competencyIdsForObservation(module.id, observation.id)) ids.add(competencyId);
    }
  }
  for (const [competencyId, rating] of Object.entries(state.manualCompetencyRatings || {})) {
    if (rating && rating !== "nb") ids.add(competencyId);
  }
  for (const [competencyId, evidence] of Object.entries(state.competencyEvidence || {})) {
    if (evidence?.trim()) ids.add(competencyId);
  }
  return ids;
}

function coverageStatus(checked, total) {
  if (!checked) return { label: "nicht überprüft", className: "coverage-none" };
  if (checked >= total) return { label: "überprüft", className: "coverage-complete" };
  return { label: "teilweise überprüft", className: "coverage-partial" };
}

function competencyRatingSelect(row) {
  return `<select class="rating-select rating-${row.rating.replace("+", "plus")}" data-competency-rating="${row.competencyId}" aria-label="Einordnung für ${escapeHtml(row.competencyLabel)}">
    ${APP_RATINGS.map((rating) => `<option value="${rating.value}" ${row.rating === rating.value ? "selected" : ""}>${rating.value === "nb" ? "n. b." : rating.value}</option>`).join("")}
  </select>`;
}

function competenciesView() {
  const coverage = buildCompetencyCoverage(state);
  const byId = new Map(coverage.map((row) => [row.competencyId, row]));
  const relevantIds = selectedCompetencyIds();
  const checked = coverage.filter((row) => row.rating !== "nb").length;
  const fromScreening = coverage.filter((row) => row.fromScreening).length;
  const visibleAreas = competencyAreaFilter === "all"
    ? COMPETENCY_AREAS
    : COMPETENCY_AREAS.filter((area) => area.id === competencyAreaFilter);

  return `
    <main class="simple-page competency-page">
      <section class="page-heading">
        <div><h1>Kompetenzabdeckung</h1><p>Alle 290 Einzelkompetenzen des FörderKompass bleiben sichtbar. Nur belegte Kompetenzen erhalten eine Einordnung.</p></div>
        <button class="button button-primary" data-action="nav" data-view="evaluate">Auswertung öffnen ${icon("arrowRight", 17)}</button>
      </section>
      <section class="competency-summary">
        <div><strong>${COMPETENCIES.length}</strong><span>Kompetenzen insgesamt</span></div>
        <div><strong>${checked}</strong><span>überprüft</span></div>
        <div><strong>${fromScreening}</strong><span>mit Screeningbeleg</span></div>
        <div><strong>${COMPETENCIES.length - checked}</strong><span>nicht beurteilt</span></div>
      </section>
      <section class="competency-controls no-print">
        <div class="scope-switch" role="group" aria-label="Umfang der Kompetenzliste">
          <button class="${competencyScope === "selected" ? "is-active" : ""}" data-action="competency-scope" data-scope="selected">Passend zu gewählten Modulen</button>
          <button class="${competencyScope === "all" ? "is-active" : ""}" data-action="competency-scope" data-scope="all">Alle 290 anzeigen</button>
        </div>
        <div class="area-chip-row">
          <button class="area-chip ${competencyAreaFilter === "all" ? "is-active" : ""}" data-action="competency-area" data-area="all">Alle Bereiche</button>
          ${COMPETENCY_AREAS.map((area) => `<button class="area-chip ${competencyAreaFilter === area.id ? "is-active" : ""}" data-action="competency-area" data-area="${area.id}">${area.label}</button>`).join("")}
        </div>
      </section>
      <div class="notice notice-yellow competency-note">${icon("info", 18)}<p><strong>Wichtig:</strong> „n. b.“ bedeutet nicht, dass die Kompetenz fehlt, sondern nur, dass sie mit den bisherigen Aufgaben noch nicht ausreichend überprüft wurde. Eine gezielte Prüfung kann rechts in der Zeile mit Beleg dokumentiert werden.</p></div>
      <div class="competency-area-list">
        ${visibleAreas.map((area) => {
          const areaRows = coverage.filter((row) => row.areaId === area.id);
          const areaChecked = areaRows.filter((row) => row.rating !== "nb").length;
          const status = coverageStatus(areaChecked, areaRows.length);
          const visibleSubareas = area.subareas.filter((subarea) => competencyScope === "all" || subarea.competencies.some((competency) => relevantIds.has(competency.id)));
          if (!visibleSubareas.length) return "";
          return `<section class="competency-area-card">
            <header><div><h2>${area.label}</h2><p>${areaChecked} von ${areaRows.length} Kompetenzen überprüft</p></div><span class="coverage-chip ${status.className}">${status.label}</span></header>
            <div class="competency-subareas">
              ${visibleSubareas.map((subarea) => {
                const rows = subarea.competencies.map((competency) => byId.get(competency.id));
                const subChecked = rows.filter((row) => row.rating !== "nb").length;
                const subStatus = coverageStatus(subChecked, rows.length);
                const visibleRows = competencyScope === "all" ? rows : rows.filter((row) => relevantIds.has(row.competencyId));
                return `<details class="competency-subarea" ${subChecked ? "open" : ""}>
                  <summary><span><strong>${subarea.label}</strong><small>${subChecked} von ${rows.length}</small></span><span class="coverage-chip ${subStatus.className}">${subStatus.label}</span></summary>
                  <div class="competency-table">
                    <div class="competency-table-head"><span>Einzelkompetenz</span><span>Quelle</span><span>Einordnung</span><span>Beleg / gezielte Prüfung</span><span>Priorität</span></div>
                    ${visibleRows.map((row) => `<div class="competency-row">
                      <strong>${escapeHtml(row.competencyLabel)}</strong>
                      <span>${row.fromScreening ? `<span class="source-chip">Screening</span>` : `<span class="source-chip is-open">offen</span>`}</span>
                      <span>${competencyRatingSelect(row)}</span>
                      <input data-competency-evidence="${row.competencyId}" value="${escapeHtml(state.competencyEvidence?.[row.competencyId] || "")}" placeholder="konkreter Beleg oder Aufgabe" />
                      <button class="priority-button ${row.isPriority ? "is-active" : ""}" data-action="toggle-priority" data-profile="${row.competencyId}" ${row.rating === "nb" ? "disabled" : ""} aria-label="Förderpriorität umschalten">${icon("star", 17)}</button>
                    </div>`).join("")}
                  </div>
                </details>`;
              }).join("")}
            </div>
          </section>`;
        }).join("")}
      </div>
      <section class="material-bottom-actions no-print">
        <button class="button button-secondary" data-action="nav" data-view="observe">${icon("arrowLeft", 17)} Zur Beobachtung</button>
        <button class="button button-primary" data-action="nav" data-view="evaluate">Auswertung öffnen ${icon("arrowRight", 17)}</button>
      </section>
    </main>
  `;
}

function evaluateView() {
  const profile = buildProfile(state);
  const filtered = areaFilter === "all" ? profile : profile.filter((row) => row.areaId === areaFilter);
  let active = profile.find((row) => row.key === state.activeProfileKey) || profile.find((row) => row.rating === "-") || profile[0];
  if (active && state.activeProfileKey !== active.key) state.activeProfileKey = active.key;
  const report = active ? reportForRow(state, active) : null;
  return `
    <main class="workspace evaluate-workspace">
      <aside class="area-rail no-print">
        <div class="rail-heading"><strong>Förderbereiche</strong></div>
        <button class="area-filter ${areaFilter === "all" ? "is-active" : ""}" data-action="filter-area" data-area="all"><span>Alle Kompetenzen</span><strong>${profile.length}</strong></button>
        ${AREAS.map((area) => {
          const counts = progressForArea(profile, area.id);
          return `<button class="area-filter ${areaFilter === area.id ? "is-active" : ""}" data-action="filter-area" data-area="${area.id}"><span>${area.label}</span><strong>${counts.observed}</strong>${icon("chevron", 14)}</button>`;
        }).join("")}
      </aside>
      <section class="workspace-main">
        <div class="workspace-title"><div><h1>Auswertung</h1><p>Belege auf Ebene einzelner FörderKompass-Kompetenzen prüfen und höchstens drei Prioritäten wählen.</p></div><span>${state.priorities.length} von 3 Prioritäten</span></div>
        <div class="profile-heading"><h2>Kompetenzprofil</h2><p>Die Einordnung gilt nur für die benannte Einzelkompetenz und kann fachlich geändert werden.</p></div>
        ${filtered.length ? `
          <div class="profile-table">
            <div class="profile-head"><span>Förderbereich</span><span>Unterbereich / Kompetenz</span><span>Ergebnis</span><span>Konkreter Beleg</span><span>Priorität</span></div>
            ${filtered.map((row) => `
              <div class="profile-row ${active?.key === row.key ? "is-active" : ""}" data-action="select-profile" data-profile="${row.key}">
                <span>${row.areaLabel}</span>
                <strong><small>${row.subareaLabel}</small>${row.competencyLabel}</strong>
                <span>${profileRatingSelect(row)}</span>
                <span class="evidence-summary">${escapeHtml(row.evidence[0] || row.sources[0] || "Noch kein konkreter Beleg notiert.")}</span>
                <button class="priority-button ${row.isPriority ? "is-active" : ""}" data-action="toggle-priority" data-profile="${row.key}" aria-label="Priorität umschalten">${icon("star", 17)}</button>
              </div>
            `).join("")}
          </div>
        ` : `<div class="empty-inline"><h2>Noch keine Auswertung möglich</h2><p>Trage zunächst mindestens einen Beobachtungscode ein.</p><button class="button button-primary" data-action="nav" data-view="observe">Zur Beobachtung</button></div>`}
      </section>
      <aside class="inspector report-inspector no-print">
        <div class="inspector-heading"><h2>Förderplan-Vorschlag</h2>${icon("info", 18)}</div>
        ${active && report ? `
          <p class="active-profile-label">${active.areaLabel}<br /><small>${active.subareaLabel}</small><br /><strong>${active.competencyLabel}</strong></p>
          <label class="field field-wide"><span>Ist-Stand</span><textarea rows="5" data-report-field="stand" data-profile="${active.key}">${escapeHtml(report.stand)}</textarea></label>
          <label class="field field-wide"><span>Nächstes Ziel</span><textarea rows="5" data-report-field="goal" data-profile="${active.key}">${escapeHtml(report.goal)}</textarea></label>
          <label class="field field-wide"><span>Maßnahmen und Evaluation</span><textarea rows="6" data-report-field="measures" data-profile="${active.key}">${escapeHtml(report.measures)}</textarea></label>
          <div class="notice notice-yellow compact">${icon("info", 17)}<p>Keine Diagnose · Vorschlag fachlich prüfen</p></div>
          <button class="button button-secondary button-block" data-action="toggle-priority" data-profile="${active.key}">${icon("star", 17)} ${active.isPriority ? "Priorität entfernen" : "Priorität übernehmen"}</button>
          <button class="button button-primary button-block" data-action="nav" data-view="plan">${icon("doc", 17)} Bericht erstellen</button>
        ` : `<p class="muted">Wähle eine ausgewertete Beobachtung aus.</p>`}
      </aside>
      <footer class="workspace-footer no-print">
        <button class="button button-secondary" data-action="nav" data-view="competencies">${icon("arrowLeft", 17)} Zur Kompetenzabdeckung</button>
        <span></span>
        <button class="button button-primary" data-action="nav" data-view="plan">Förderplan vorbereiten ${icon("arrowRight", 17)}</button>
      </footer>
    </main>
  `;
}

function planView() {
  const profile = buildProfile(state);
  const priorities = state.priorities.map((key) => profile.find((row) => row.key === key)).filter(Boolean).slice(0, 3);
  const transferText = buildTransferText(state, profile);
  return `
    <main class="report-page">
      <section class="report-toolbar no-print">
        <div><h1>Förderplan vorbereiten</h1><p>Die bestätigten Prioritäten als Arbeitsgrundlage übertragen.</p></div>
        <div class="toolbar-actions">
          <button class="button button-secondary" data-action="copy-report">Bericht kopieren</button>
          <button class="button button-primary" data-action="print">${icon("doc", 17)} Drucken / als PDF sichern</button>
        </div>
      </section>
      <article class="print-report">
        <header class="report-title">
          <div><span>SCREENING-KOMPASS</span><h1>Übertragung zum FörderKompass</h1></div>
          <p>Pädagogische Arbeitsgrundlage · keine Diagnose</p>
        </header>
        <section class="report-meta">
          <p><span>Kind / Kürzel</span><strong>${escapeHtml(state.caseData.label || "—")}</strong></p>
          <p><span>Klasse / Schuljahr</span><strong>${escapeHtml([state.caseData.className, state.caseData.schoolYear].filter(Boolean).join(" · ") || "—")}</strong></p>
          <p><span>Zeitraum</span><strong>${escapeHtml(state.caseData.period || "—")}</strong></p>
        </section>
        <section class="report-context"><h2>Fragestellung</h2><p>${escapeHtml(state.caseData.question || "Noch nicht eingetragen.")}</p><h2>Stärken und Gelingensbedingungen</h2><p>${escapeHtml(state.caseData.strengths || "Noch nicht eingetragen.")}</p></section>
        ${priorities.length ? priorities.map((row, index) => {
          const report = reportForRow(state, row);
          return `<section class="priority-report">
            <div class="priority-report-head"><span>Priorität ${index + 1}</span><h2>${row.areaLabel}</h2><p>${row.subareaLabel}<br /><strong>${row.competencyLabel}</strong> · Einordnung ${row.rating === "nb" ? "n. b." : row.rating}</p></div>
            <div class="report-section"><h3>Ist-Stand</h3><p>${escapeHtml(report.stand)}</p></div>
            <div class="report-section"><h3>Nächstes Ziel</h3><p>${escapeHtml(report.goal)}</p></div>
            <div class="report-section"><h3>Maßnahmen und Evaluation</h3><p>${escapeHtml(report.measures)}</p></div>
            <div class="report-sources"><strong>Belege:</strong> ${escapeHtml(row.sources.slice(0, 4).join("; "))}</div>
          </section>`;
        }).join("") : `<section class="empty-report"><h2>Noch keine Priorität ausgewählt</h2><p>Gehe zurück zur Auswertung und übernimm höchstens drei belegte Schwerpunkte.</p></section>`}
        <footer class="report-note">Die Zuordnung beruht auf pädagogischen Beobachtungen und dokumentierten Hilfebedingungen. Sie ersetzt keine standardisierte, medizinische oder sonderpädagogische Diagnostik.</footer>
      </article>
      <section class="transfer-copy no-print"><h2>Textübertragung</h2><textarea readonly rows="14">${escapeHtml(transferText)}</textarea><div><button class="button button-secondary" data-action="copy-report">In Zwischenablage kopieren</button><button class="button button-quiet" data-action="export">${icon("download", 17)} Sicherung exportieren</button></div></section>
    </main>
  `;
}

function render() {
  const views = { fall: fallView, modules: modulesView, material: materialView, printmaterials: printMaterialsView, observe: observeView, competencies: competenciesView, evaluate: evaluateView, plan: planView };
  const content = (views[currentView] || fallView)();
  app.innerHTML = currentView === "printmaterials" ? content : `${header()}${content}`;
  document.body.dataset.view = currentView;
}

function nextObservation(direction) {
  const selected = MODULES.filter((module) => state.selectedModules.includes(module.id));
  const current = moduleById(state.currentModuleId) || selected[0];
  if (!current) return;
  let itemIndex = state.currentItemIndex || 0;
  if (direction < 0 && itemIndex > 0) itemIndex -= 1;
  if (direction > 0 && itemIndex < current.items.length - 1) itemIndex += 1;
  else if (direction > 0 && itemIndex === current.items.length - 1) {
    const moduleIndex = selected.findIndex((module) => module.id === current.id);
    const nextModule = selected[moduleIndex + 1] || selected[0];
    state.currentModuleId = nextModule.id;
    itemIndex = 0;
  }
  state.currentItemIndex = itemIndex;
  persist({ rerender: true });
}

function togglePriority(key) {
  if (!key) return;
  if (state.priorities.includes(key)) {
    state.priorities = state.priorities.filter((entry) => entry !== key);
  } else {
    if (state.priorities.length >= 3) {
      showToast("Es können höchstens drei Förderprioritäten ausgewählt werden.");
      return;
    }
    state.priorities = [...state.priorities, key];
  }
  persist({ rerender: true });
}

app.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "nav") {
    currentView = target.dataset.view;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (action === "new-case") {
    if (!window.confirm("Aktuellen Fall wirklich leeren? Exportiere vorher bei Bedarf eine Sicherung.")) return;
    state = resetState();
    currentView = "fall";
    render();
  }
  if (action === "select-module") {
    state.currentModuleId = target.dataset.module;
    state.currentItemIndex = 0;
    persist({ rerender: true });
  }
  if (action === "select-item") {
    if (event.target.closest(".evidence-control")) return;
    state.currentItemIndex = Number(target.dataset.index);
    persist({ rerender: true });
  }
  if (action === "set-code") {
    event.stopPropagation();
    const key = responseKey(target.dataset.module, target.dataset.item);
    state.responses[key] = { ...(state.responses[key] || {}), code: target.dataset.code };
    const module = moduleById(target.dataset.module);
    state.currentItemIndex = module.items.findIndex((observation) => observation.id === target.dataset.item);
    persist({ rerender: true });
  }
  if (action === "previous-item") nextObservation(-1);
  if (action === "next-item") nextObservation(1);
  if (action === "filter-area") {
    areaFilter = target.dataset.area;
    render();
  }
  if (action === "competency-area") {
    competencyAreaFilter = target.dataset.area;
    render();
  }
  if (action === "competency-scope") {
    competencyScope = target.dataset.scope;
    render();
  }
  if (action === "select-recommended-sheets") {
    state.selectedPrintSheets = printSheetsForModules(state.selectedModules).filter((entry) => entry.recommended).map((entry) => entry.id);
    state.printSelectionInitialized = true;
    persist({ rerender: true });
  }
  if (action === "clear-print-sheets") {
    state.selectedPrintSheets = [];
    state.printSelectionInitialized = true;
    persist({ rerender: true });
  }
  if (action === "print-materials") {
    if (!(state.selectedPrintSheets || []).length) {
      showToast("Wähle zunächst mindestens eine Aufgaben- oder Materialseite aus.");
      return;
    }
    currentView = "printmaterials";
    render();
    const loaded = await waitForPrintImages();
    if (!loaded) showToast("Mindestens eine Druckseite konnte nicht geladen werden.");
    else window.print();
  }
  if (action === "print-materials-again") {
    const loaded = await waitForPrintImages();
    if (loaded) window.print();
    else showToast("Mindestens eine Druckseite konnte nicht geladen werden.");
  }
  if (action === "close-material-print") {
    currentView = "material";
    render();
  }
  if (action === "select-profile") {
    if (event.target.closest("select") || event.target.closest("button")) return;
    state.activeProfileKey = target.dataset.profile;
    persist({ rerender: true });
  }
  if (action === "toggle-priority") togglePriority(target.dataset.profile);
  if (action === "print") window.print();
  if (action === "copy-report") {
    const text = buildTransferText(state, buildProfile(state));
    try {
      await copyText(text);
      showToast("Bericht wurde in die Zwischenablage kopiert.");
    } catch {
      showToast("Kopieren ist hier nicht verfügbar. Bitte den Text im Feld markieren.");
    }
  }
  if (action === "export") {
    exportBackup(state);
    showToast("Sicherung wurde heruntergeladen.");
  }
  if (action === "open-import") document.querySelector("#backup-import")?.click();
});

app.addEventListener("input", (event) => {
  const caseField = event.target.dataset.caseField;
  if (caseField) {
    state.caseData[caseField] = event.target.value;
    persist();
  }
  const responseField = event.target.dataset.responseField;
  if (responseField) {
    const key = event.target.dataset.responseKey;
    state.responses[key] = { ...(state.responses[key] || {}), [responseField]: event.target.value };
    persist();
  }
  const reportField = event.target.dataset.reportField;
  if (reportField) {
    const key = event.target.dataset.profile;
    state.reportEdits[key] = { ...(state.reportEdits[key] || {}), [reportField]: event.target.value };
    persist();
  }
  const competencyEvidence = event.target.dataset.competencyEvidence;
  if (competencyEvidence) {
    state.competencyEvidence[competencyEvidence] = event.target.value;
    persist();
  }
});

app.addEventListener("change", async (event) => {
  const moduleId = event.target.dataset.moduleToggle;
  if (moduleId) {
    const wasSelected = state.selectedModules.includes(moduleId);
    state.selectedModules = event.target.checked
      ? [...new Set([...state.selectedModules, moduleId])]
      : state.selectedModules.filter((id) => id !== moduleId);
    if (state.printSelectionInitialized) {
      if (event.target.checked && !wasSelected) {
        const additions = PRINT_SHEETS.filter((entry) => entry.recommended && entry.moduleIds.includes(moduleId)).map((entry) => entry.id);
        state.selectedPrintSheets = [...new Set([...(state.selectedPrintSheets || []), ...additions])];
      } else if (!event.target.checked && wasSelected) {
        const stillRelevant = new Set(printSheetsForModules(state.selectedModules).map((entry) => entry.id));
        state.selectedPrintSheets = (state.selectedPrintSheets || []).filter((id) => stillRelevant.has(id));
      }
    }
    if (!state.selectedModules.includes(state.currentModuleId)) state.currentModuleId = state.selectedModules[0] || "";
    persist({ rerender: true });
  }
  const printSheetId = event.target.dataset.printSheet;
  if (printSheetId) {
    state.selectedPrintSheets = event.target.checked
      ? [...new Set([...(state.selectedPrintSheets || []), printSheetId])]
      : (state.selectedPrintSheets || []).filter((id) => id !== printSheetId);
    state.printSelectionInitialized = true;
    persist({ rerender: true });
  }
  const profileRating = event.target.dataset.profileRating;
  if (profileRating) {
    state.manualCompetencyRatings[profileRating] = event.target.value;
    state.activeProfileKey = profileRating;
    persist({ rerender: true });
  }
  const competencyRating = event.target.dataset.competencyRating;
  if (competencyRating) {
    state.manualCompetencyRatings[competencyRating] = event.target.value;
    state.activeProfileKey = competencyRating;
    if (event.target.value === "nb") state.priorities = state.priorities.filter((key) => key !== competencyRating);
    persist({ rerender: true });
  }
  if (event.target.id === "backup-import" && event.target.files?.[0]) {
    try {
      state = await importBackup(event.target.files[0]);
      currentView = "fall";
      render();
      showToast("Sicherung wurde erfolgreich geladen.");
    } catch (error) {
      showToast(error.message || "Die Sicherung konnte nicht geladen werden.");
    }
  }
});

render();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
