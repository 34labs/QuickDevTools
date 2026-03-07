import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-diff',
    name: 'Text Diff',
    icon: 'fa-columns',
    category: 'text',
    desc: 'Simple side-by-side text comparison.',
    ui: () => ({
        html: `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                <div class="form-group">
                    <label class="form-label">Text A</label>
                    <textarea class="form-control" id="diffA" style="height: 150px; font-size: 11px;"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Text B</label>
                    <textarea class="form-control" id="diffB" style="height: 150px; font-size: 11px;"></textarea>
                </div>
            </div>
            <div id="diffResult" class="result-box" style="min-height: 100px; font-size: 12px; white-space: pre-wrap; font-family: monospace;"></div>
        `,
        init: () => {
            const a = document.getElementById('diffA');
            const b = document.getElementById('diffB');
            const res = document.getElementById('diffResult');

            const compare = () => {
                const linesA = a.value.split('\n');
                const linesB = b.value.split('\n');
                let out = '';
                const max = Math.max(linesA.length, linesB.length);

                for (let i = 0; i < max; i++) {
                    const lA = linesA[i] || '';
                    const lB = linesB[i] || '';
                    if (lA === lB) {
                        out += `<span style="opacity: 0.5">  ${lA}</span>\n`;
                    } else {
                        if (lA) out += `<span style="color: var(--danger)">- ${lA}</span>\n`;
                        if (lB) out += `<span style="color: var(--success)">+ ${lB}</span>\n`;
                    }
                }
                res.innerHTML = out || 'Differences will appear here...';
            };

            a.oninput = compare;
            b.oninput = compare;
        }
    })
});
