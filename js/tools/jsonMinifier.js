import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'json-minifier',
    name: 'JSON Minifier',
    icon: 'fa-compress',
    category: 'format',
    desc: 'Compress JSON by removing whitespace and comments.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="jsonMinIn" placeholder="Paste unformatted JSON here..." style="height: 120px; font-family: monospace; font-size: 12px;"></textarea>
            </div>
            <div class="result-box" id="jsonMinOut" style="height: 120px; overflow-y: auto; font-family: monospace; font-size: 12px; word-break: break-all;">Result will appear here...</div>
        `,
        footer: `
            <button class="btn btn-secondary" id="jsonMinClear">Clear</button>
            <button class="btn btn-primary" id="jsonMinBtn">Minify</button>
        `,
        init: () => {
            const input = document.getElementById('jsonMinIn');
            const output = document.getElementById('jsonMinOut');
            const btn = document.getElementById('jsonMinBtn');
            const clear = document.getElementById('jsonMinClear');

            btn.onclick = () => {
                const val = input.value.trim();
                if (!val) return;
                
                try {
                    // Try to parse to validate JSON, then stringify without spacing
                    const obj = JSON.parse(val);
                    const minified = JSON.stringify(obj);
                    output.textContent = minified;
                    output.style.color = 'var(--text-primary)';
                } catch (e) {
                    output.textContent = "Invalid JSON: " + e.message;
                    output.style.color = 'var(--danger)';
                }
            };

            clear.onclick = () => {
                input.value = '';
                output.textContent = 'Result will appear here...';
                output.style.color = 'var(--text-muted)';
            };
        }
    })
});
