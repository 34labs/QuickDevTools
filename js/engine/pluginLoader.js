/**
 * Dynamic plugin loader for DevTools Hub v2
 */
export async function loadPlugins() {
    try {
        const response = await fetch('./plugins/tools.json');
        if (!response.ok) {
            throw new Error(`Failed to load plugins config: ${response.statusText}`);
        }

        const plugins = await response.json();

        const loadPromises = plugins.map(async (path) => {
            try {
                // Use relative path from js directory or absolute from root
                await import(`../${path}`);
            } catch (err) {
                console.error(`Failed to load tool at ${path}:`, err);
            }
        });

        await Promise.all(loadPromises);
        console.log(`${plugins.length} plugins processed.`);
    } catch (err) {
        console.error("Plugin loader error:", err);
    }
}
