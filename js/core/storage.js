import { state, persistState } from "../state.js";

/**
 * Simple storage wrapper for consistency
 */
export const storage = {
    set(key, value) {
        persistState(key, value);
    },

    get(key, defaultValue = null) {
        const val = localStorage.getItem(key);
        if (val === null) return defaultValue;
        try {
            return JSON.parse(val);
        } catch {
            return val;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};
