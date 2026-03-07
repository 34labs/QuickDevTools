import { getAllTools } from "../engine/toolRegistry.js";
import { openToolModal } from "../ui/cards.js";

/**
 * Command Palette System for QuickDevTools
 * Handles global search, the command palette overlay, and result selection
 */

const elements = {
    overlay: document.getElementById('cmdOverlay'),
    input: document.getElementById('cmdInput'),
    results: document.getElementById('cmdResults'),
    globalSearch: document.getElementById('globalSearch'),
    cmdBtn: document.getElementById('btn-cmd-palette')
};

/**
 * Open the command palette
 */
export function openCmdPalette() {
    if (!elements.overlay) return;
    elements.overlay.classList.add('open');
    if (elements.input) {
        elements.input.value = '';
        elements.input.focus();
        renderResults('');
    }
}

/**
 * Close the command palette
 */
export function closeCmdPalette() {
    if (!elements.overlay) return;
    elements.overlay.classList.remove('open');
}

/**
 * Render search results in the command palette
 * @param {string} query - Search term
 */
function renderResults(query) {
    if (!elements.results) return;

    const term = query.toLowerCase();
    const tools = getAllTools();
    const filtered = tools.filter(t =>
        t.name.toLowerCase().includes(term) ||
        (t.desc && t.desc.toLowerCase().includes(term)) ||
        (t.category && t.category.toLowerCase().includes(term))
    );

    if (filtered.length === 0) {
        elements.results.innerHTML = `<div class="empty-state">No matching tools found.</div>`;
        return;
    }

    elements.results.innerHTML = filtered.map((tool, index) => `
        <div class="cmd-item" data-id="${tool.id}" tab-index="0">
            <div class="cmd-item-info">
                <i class="${tool.icon || 'fas fa-cog'}"></i>
                <div>
                    <div class="cmd-item-name">${tool.name}</div>
                    <div class="cmd-item-category">${tool.category || 'Tool'}</div>
                </div>
            </div>
            <span class="cmd-item-key">Enter</span>
        </div>
    `).join('');

    // Add click events to results
    const items = elements.results.querySelectorAll('.cmd-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const toolId = item.dataset.id;
            const tool = tools.find(t => t.id === toolId);
            if (tool) {
                closeCmdPalette();
                openToolModal(tool);
            }
        });
    });
}

/**
 * Initialize Command Palette Event Listeners
 */
export function initCommandPalette() {
    // Expose close to window for app.js (ESC key)
    window.openCmdPalette = openCmdPalette;
    window.closeCmdPalette = closeCmdPalette;

    if (elements.cmdBtn) {
        elements.cmdBtn.addEventListener('click', openCmdPalette);
    }

    if (elements.overlay) {
        elements.overlay.addEventListener('click', (e) => {
            if (e.target === elements.overlay) closeCmdPalette();
        });
    }

    if (elements.input) {
        elements.input.addEventListener('input', (e) => {
            renderResults(e.target.value);
        });

        elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstResult = elements.results.querySelector('.cmd-item');
                if (firstResult) firstResult.click();
            }
        });
    }

    // Global Search Input (Header)
    if (elements.globalSearch) {
        elements.globalSearch.addEventListener('focus', () => {
            openCmdPalette();
            // Optional: copy header text to palette
            if (elements.globalSearch.value) {
                elements.input.value = elements.globalSearch.value;
                renderResults(elements.input.value);
            }
        });
    }
}
