import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'md-formatter',
    name: 'Markdown Formatter',
    icon: 'fa-align-left',
    category: 'text',
    desc: 'Basic formatting for Markdown documents.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="fmtIn" placeholder="Paste messy markdown here..." style="height: 150px; font-family: monospace;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="fmtBoldHd">Bold Headers</button>
                <button class="btn btn-secondary" id="fmtTrim">Trim Lines</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="fmtOut" readonly style="height: 150px; font-family: monospace;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('fmtIn');
            const output = document.getElementById('fmtOut');

            document.getElementById('fmtBoldHd').onclick = () => {
                output.value = input.value.replace(/^(#+)(.*)$/gm, (m, g1, g2) => `${g1} **${g2.trim()}**`);
            };

            document.getElementById('fmtTrim').onclick = () => {
                output.value = input.value.split('\n').map(l => l.trimEnd()).join('\n');
            };
        }
    })
});
