import { state } from "../state.js";
import { getAllTools } from "../engine/toolRegistry.js";
import { renderTools, openToolModal } from "./cards.js";
import { showModal } from "../core/modal.js";

const els = {
    grid: document.getElementById('tools-grid'),
    quickGrid: document.getElementById('quick-access-grid'),
    favGrid: document.getElementById('favorites-grid'),
    search: document.getElementById('globalSearch'),
    categories: document.querySelectorAll('.cat-chip')
};

/**
 * Initialize the dashboard
 */
export function initDashboard() {
    renderDashboard();
    setupEventListeners();
}

/**
 * Render the main dashboard content
 */
export function renderDashboard() {
    const tools = getAllTools();

    if (els.grid) {
        renderTools(tools, els.grid);
    }

    renderQuickAccess();
}

/**
 * Render quick access section
 */
export function renderQuickAccess() {
    if (!els.quickGrid) return;

    const tools = getAllTools();
    let quickList = [];

    // Add recent
    state.recent.forEach(id => {
        const t = tools.find(x => x.id === id);
        if (t && !quickList.includes(t)) quickList.push(t);
    });

    // Fill rest with popular if needed
    const popularIds = ['github', 'md-preview', 'diff-checker', 'color-picker', 'json-fmt'];
    popularIds.forEach(id => {
        const t = tools.find(x => x.id === id);
        if (t && !quickList.includes(t)) quickList.push(t);
    });

    quickList = quickList.slice(0, 5);
    renderTools(quickList, els.quickGrid);
}

/**
 * Setup event listeners for the dashboard
 */
function setupEventListeners() {
    // Search
    if (els.search) {
        els.search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const tools = getAllTools();
            const filtered = tools.filter(t =>
                t.name.toLowerCase().includes(term) ||
                (t.desc && t.desc.toLowerCase().includes(term))
            );
            renderTools(filtered, els.grid);
        });
    }

    // Categories
    els.categories.forEach(chip => {
        chip.addEventListener('click', () => {
            els.categories.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.filter;
            const tools = getAllTools();
            if (cat === 'all') renderTools(tools, els.grid);
            else renderTools(tools.filter(t => t.category === cat), els.grid);
        });
    });

    // Tool Card Clicks (using event delegation)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;

        const toolId = card.dataset.id;
        const tool = getAllTools().find(t => t.id === toolId);

        if (tool) {
            // Check if fav toggle button was clicked
            if (e.target.closest('[data-action="toggle-fav"]')) {
                // Logic handled in state/main
                return;
            }
            openToolModal(tool);
        }
    });
}
