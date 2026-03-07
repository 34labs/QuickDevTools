import { getAllTools } from "../engine/toolRegistry.js";
import { state } from "../state.js";
import { showModal } from "../core/modal.js";

/**
 * Render tool cards to a grid
 * @param {Array} list - List of tool objects
 * @param {HTMLElement} container - Target container
 */
export function renderTools(list, container) {
    if (!container) return;

    container.innerHTML = list.map(tool => createCardHTML(tool)).join('');
}

/**
 * Generate HTML for a single tool card
 * @param {Object} tool - Tool definition
 * @returns {string}
 */
export function createCardHTML(tool) {
    const isFav = state.favorites.includes(tool.id);
    return `
        <div class="card" data-id="${tool.id}">
            <button class="card-fav-btn ${isFav ? 'active' : ''}" data-action="toggle-fav" data-id="${tool.id}">
                <i class="fas fa-star"></i>
            </button>
            <div class="card-icon">
                <i class="${tool.icon.startsWith('fa') ? 'fas ' : ''}${tool.icon}"></i>
            </div>
            <h3 class="card-title">${tool.name}</h3>
            <p class="card-desc">${tool.desc || ''}</p>
        </div>
    `;
}

/**
 * Open a tool's interface in a modal
 * @param {Object} tool - Tool definition
 */
export function openToolModal(tool) {
    if (tool.url) {
        window.open(tool.url, '_blank');
        return;
    }

    if (tool.ui) {
        const ui = tool.ui();
        showModal(tool.name, ui.html, ui.footer || '');
        if (ui.init) {
            setTimeout(ui.init, 50);
        }
    }
}
