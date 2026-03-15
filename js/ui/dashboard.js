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
    renderToolsByCategory(tools, els.grid);
    renderQuickAccess();
}

/**
 * Render tools grouped by category
 * @param {Array} list - List of tools
 * @param {HTMLElement} container - Target container
 * @param {boolean} forceExpand - Whether to force all groups open (e.g. during search)
 */
export function renderToolsByCategory(list, container, forceExpand = false) {
    if (!container) return;
    container.innerHTML = '';

    const categories = {
        'format': 'Formatters',
        'convert': 'Converters',
        'generator': 'Generators',
        'web': 'Web Tools',
        'api': 'API Tools',
        'security': 'Security',
        'text': 'Text Tools',
        'dev': 'Developer Tools',
        'network': 'Network',
        'utility': 'Utilities'
    };

    const grouped = {};
    list.forEach(tool => {
        const cat = tool.category || 'other';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(tool);
    });

    // Helper to create category section
    const createSection = (key, title, tools) => {
        const collapsed = !forceExpand && state.collapsedCategories?.includes(key);
        const section = document.createElement('div');
        section.className = `category-section ${collapsed ? 'collapsed' : ''}`;
        section.dataset.category = key;
        section.innerHTML = `
            <div class="category-header">
                <div class="category-title-group">
                    <i class="fas fa-chevron-down chevron"></i>
                    <h2 class="category-title">${title}</h2>
                </div>
                <span class="category-count">${tools.length} tools</span>
            </div>
            <div class="grid-container category-grid"></div>
        `;
        
        // Toggle Listener
        section.querySelector('.category-header').onclick = () => {
            const isNowCollapsed = section.classList.toggle('collapsed');
            updateCollapseState(key, isNowCollapsed);
        };

        container.appendChild(section);
        const grid = section.querySelector('.category-grid');
        renderTools(tools, grid);
    };

    // Render defined groups
    Object.keys(categories).forEach(key => {
        if (grouped[key] && grouped[key].length > 0) {
            createSection(key, categories[key], grouped[key]);
        }
    });

    // Render others
    const handledCats = Object.keys(categories);
    const otherCats = Object.keys(grouped).filter(cat => !handledCats.includes(cat));
    otherCats.forEach(cat => {
        const title = cat.charAt(0).toUpperCase() + cat.slice(1);
        createSection(cat, title, grouped[cat]);
    });
}

/**
 * Render quick access section
 */
export function renderQuickAccess() {
    if (!els.quickGrid) return;

    const tools = getAllTools();
    let displayList = [];

    // 1. Add custom shortcuts
    const customList = (state.customShortcuts || []).map(s => ({
        id: `custom-${Math.random()}`, // Virtual ID for rendering
        name: s.title,
        desc: s.desc,
        icon: s.icon,
        url: s.url,
        isCustom: true
    }));
    displayList = [...customList];

    // 2. Add recent tools (up to 5 total items)
    state.recent.forEach(id => {
        if (displayList.length >= 8) return;
        const t = tools.find(x => x.id === id);
        if (t && !displayList.find(item => item.id === t.id)) displayList.push(t);
    });

    // 3. Fill rest with popular if needed
    const popularIds = ['github', 'md-preview', 'diff-checker', 'color-picker', 'json-fmt'];
    popularIds.forEach(id => {
        if (displayList.length >= 8) return;
        const t = tools.find(x => x.id === id);
        if (t && !displayList.find(item => item.id === t.id)) displayList.push(t);
    });

    renderTools(displayList, els.quickGrid);
}

/**
 * Handle shortcut management
 */
function openManageShortcutsModal() {
    const listHtml = (state.customShortcuts || []).map((s, i) => `
        <div class="shortcut-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: var(--bg-body); border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas ${s.icon} style="color: var(--accent-primary);"></i>
                <div>
                    <div style="font-weight: 600; font-size: 13px;">${s.title}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${s.url}</div>
                </div>
            </div>
            <button class="btn btn-sm btn-danger" onclick="window.removeShortcut(${i})" style="padding: 4px 8px;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('') || '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No custom shortcuts yet.</p>';

    const html = `
        <div class="manage-shortcuts">
            <div style="margin-bottom: 20px;">
                ${listHtml}
            </div>
            <div style="padding-top: 15px; border-top: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 12px; font-size: 14px;">Add New Shortcut</h4>
                <div class="form-group">
                    <input type="text" id="sh-title" class="form-control" placeholder="Title (e.g., GitHub)">
                </div>
                <div class="form-group">
                    <input type="text" id="sh-url" class="form-control" placeholder="URL (https://...)">
                </div>
                <div class="form-group">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="text" id="sh-icon" class="form-control" placeholder="Icon (e.g., fa-globe)" style="flex: 1;">
                        <a href="https://fontawesome.com/v6/search?o=r&m=free" target="_blank" class="btn btn-secondary btn-sm" title="Browse Icons">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    <small style="font-size: 10px; color: var(--text-muted); margin-top: 4px; display: block;">
                        Need icons? <a href="https://fontawesome.com/v6/search?o=r&m=free" target="_blank" style="color: var(--accent-primary);">Browse FontAwesome 6 Free</a>
                    </small>
                </div>
                <div class="form-group">
                    <input type="text" id="sh-desc" class="form-control" placeholder="Short description (optional)">
                </div>
                <button class="btn btn-primary w-100" id="sh-add-btn">Add Shortcut</button>
            </div>
        </div>
    `;

    showModal("Manage Quick Access", html, `<button class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('open')">Close</button>`);

    // Add Global Handlers (for onclick in modal)
    window.removeShortcut = (index) => {
        const shortcuts = [...state.customShortcuts];
        shortcuts.splice(index, 1);
        state.customShortcuts = shortcuts;
        localStorage.setItem('devtools_shortcuts', JSON.stringify(shortcuts));
        renderQuickAccess();
        openManageShortcutsModal(); // Refresh modal
    };

    document.getElementById('sh-add-btn').onclick = () => {
        const title = document.getElementById('sh-title').value;
        const url = document.getElementById('sh-url').value;
        const icon = document.getElementById('sh-icon').value || 'fa-link';
        const desc = document.getElementById('sh-desc').value;

        if (!title || !url) {
            alert('Title and URL are required');
            return;
        }

        const shortcuts = state.customShortcuts || [];
        shortcuts.push({ title, url, icon, desc });
        state.customShortcuts = shortcuts;
        localStorage.setItem('devtools_shortcuts', JSON.stringify(shortcuts));
        
        renderQuickAccess();
        openManageShortcutsModal(); // Refresh modal
    };
}

/**
 * Persist collapsed state
 */
function updateCollapseState(id, isCollapsed) {
    if (!state.collapsedCategories) state.collapsedCategories = [];
    
    if (isCollapsed) {
        if (!state.collapsedCategories.includes(id)) state.collapsedCategories.push(id);
    } else {
        state.collapsedCategories = state.collapsedCategories.filter(x => x !== id);
    }
    
    // Save state (minimal dependency check)
    localStorage.setItem('qdt_collapsed', JSON.stringify(state.collapsedCategories));
}

/**
 * Setup event listeners for the dashboard
 */
function setupEventListeners() {
    // Manage Shortcuts
    const manageBtn = document.getElementById('manage-shortcuts-btn');
    if (manageBtn) {
        manageBtn.onclick = openManageShortcutsModal;
    }

    // Search
    if (els.search) {
        els.search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const tools = getAllTools();
            const filtered = tools.filter(t =>
                t.name.toLowerCase().includes(term) ||
                (t.desc && t.desc.toLowerCase().includes(term))
            );
            
            // Force expand if searching
            renderToolsByCategory(filtered, els.grid, term.length > 0);
        });
    }

    // Categories (Filter Chips)
    els.categories.forEach(chip => {
        chip.addEventListener('click', () => {
            els.categories.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.filter;
            const tools = getAllTools();
            
            if (cat === 'all') {
                renderToolsByCategory(tools, els.grid);
            } else {
                // Filtered cat view should probably be expanded
                renderToolsByCategory(tools.filter(t => t.category === cat), els.grid, true);
            }
        });
    });

    // Tool Card Clicks
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;

        const toolId = card.dataset.id;
        const tool = getAllTools().find(t => t.id === toolId);

        if (tool) {
            if (e.target.closest('[data-action="toggle-fav"]')) return;
            openToolModal(tool);
        }
    });
}
