import { registerTool } from "../engine/toolRegistry.js";

registerTool({
    id: 'json-fmt',
    name: 'JSON Formatter',
    category: 'format',
    icon: 'fa-code',
    desc: 'Beautify and validate JSON data.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="jsonInput" placeholder='Paste JSON here...'></textarea>
            </div>
            <div class="result-box" id="jsonOutput">Result will appear here...</div>
        `,
        footer: `
            <button class="btn btn-secondary" id="jsonClear">Clear</button>
            <button class="btn btn-primary" id="jsonBtn">Format</button>
        `,
        init: () => {
            const input = document.getElementById('jsonInput');
            const output = document.getElementById('jsonOutput');
            const btn = document.getElementById('jsonBtn');
            const clear = document.getElementById('jsonClear');

            if (clear) clear.onclick = () => { input.value = ''; output.textContent = 'Result will appear here...'; };

            if (btn) btn.onclick = () => {
                try {
                    const val = JSON.parse(input.value);
                    output.textContent = JSON.stringify(val, null, 4);
                    output.style.color = 'var(--text-primary)';
                } catch (e) {
                    output.textContent = "Invalid JSON: " + e.message;
                    output.style.color = 'var(--danger)';
                }
            };
        }
    })
});
