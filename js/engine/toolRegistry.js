export const toolRegistry = new Map();

/**
 * Register a tool to the registry
 * @param {Object} tool - Tool definition object
 */
export function registerTool(tool) {
    if (!tool.id) {
        console.error("Tool must have an ID", tool);
        return;
    }
    toolRegistry.set(tool.id, tool);
    console.log(`Tool registered: ${tool.name} (${tool.id})`);
}

/**
 * Get a tool by its ID
 * @param {string} id - Tool ID
 * @returns {Object|undefined}
 */
export function getTool(id) {
    return toolRegistry.get(id);
}

/**
 * Get all registered tools
 * @returns {Array}
 */
export function getAllTools() {
    return Array.from(toolRegistry.values());
}
