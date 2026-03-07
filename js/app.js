import { state, setState } from "./state.js";
import { loadPlugins } from "./engine/pluginLoader.js";
import { initDashboard } from "./ui/dashboard.js";
import { initModal } from "./core/modal.js";
import { showToast } from "./core/toast.js";

/**
 * Main Application Entry Point
 */
async function initApp() {
    console.log("Initializing QuickDevTools v2...");

    // 1. Initialize Core UI
    initModal();

    // 2. Load Plugins
    await loadPlugins();

    // 3. Initialize Dashboard
    initDashboard();

    // 4. Global Event Handlers
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (window.openCmdPalette) window.openCmdPalette();
        }
        if (e.key === 'Escape') {
            if (window.closeCmdPalette) window.closeCmdPalette();
            // Modal close handled in modal.js
        }
    });

    console.log("Application ready.");
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
