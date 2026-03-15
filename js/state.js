/**
 * Central state management for QuickDevTools
 */
export const state = {
    favorites: JSON.parse(localStorage.getItem('devtools_favorites')) || [],
    notes: localStorage.getItem('devtools_notes') || '',
    recent: JSON.parse(localStorage.getItem('devtools_recent')) || [],
    collapsedCategories: JSON.parse(localStorage.getItem('qdt_collapsed')) || [],
    customShortcuts: JSON.parse(localStorage.getItem('devtools_shortcuts')) || [],
    activeTab: 'tab-home'
};

/**
 * Persist part of the state to localStorage
 * @param {string} key - LocalStorage key
 * @param {any} value - Value to store
 */
export function persistState(key, value) {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}

/**
 * Update a state property and persist it if necessary
 * @param {string} property - State property name
 * @param {any} value - New value
 * @param {string} storageKey - Optional localStorage key to persist to
 */
export function setState(property, value, storageKey = null) {
    state[property] = value;
    if (storageKey) {
        persistState(storageKey, value);
    }
}
