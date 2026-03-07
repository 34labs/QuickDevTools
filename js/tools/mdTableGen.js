import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'md-table-gen',
    name: 'Markdown Table Generator',
    icon: 'fa-table',
    category: 'text',
    desc: 'Generate markdown table syntax visually.',
    ui: () => ({
        html: `
            <div style="display: flex; gap: 15px; margin-bottom: 16px;">
                <div class="form-group">
                    <label class="form-label">Rows</label>
                    <input type="number" class="form-control" id="tblRows" value="3" min="1" max="20" style="width: 80px;">
                </div>
                <div class="form-group">
                    <label class="form-label">Cols</label>
                    <input type="number" class="form-control" id="tblCols" value="3" min="1" max="10" style="width: 80px;">
                </div>
            </div>
            <div id="tblGrid" style="display: grid; gap: 5px; margin-bottom: 16px; overflow-x: auto; padding: 10px; background: var(--bg-body); border-radius: 8px;"></div>
            <div class="form-group">
                <label class="form-label">Markdown Output</label>
                <textarea class="form-control" id="tblOut" readonly style="height: 120px; font-family: monospace; font-size: 12px;"></textarea>
            </div>
        `,
        init: () => {
            const rowsIn = document.getElementById('tblRows');
            const colsIn = document.getElementById('tblCols');
            const grid = document.getElementById('tblGrid');
            const output = document.getElementById('tblOut');

            const renderGrid = () => {
                const rows = parseInt(rowsIn.value) || 1;
                const cols = parseInt(colsIn.value) || 1;
                grid.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
                grid.innerHTML = '';

                for (let r = 0; r <= rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.className = 'form-control';
                        input.style.fontSize = '11px';
                        input.style.padding = '4px 8px';
                        input.placeholder = r === 0 ? `Col ${c + 1}` : `Row ${r} Col ${c + 1}`;
                        input.dataset.row = r;
                        input.dataset.col = c;
                        input.oninput = updateOutput;
                        grid.appendChild(input);
                    }
                }
                updateOutput();
            };

            const updateOutput = () => {
                const rows = parseInt(rowsIn.value) || 1;
                const cols = parseInt(colsIn.value) || 1;
                const inputs = Array.from(grid.querySelectorAll('input'));

                let md = '|';
                // Header
                for (let c = 0; c < cols; c++) {
                    md += ` ${inputs.find(i => i.dataset.row == 0 && i.dataset.col == c).value || 'Header'} |`;
                }
                md += '\n|';
                // Separator
                for (let c = 0; c < cols; c++) md += ' --- |';
                md += '\n';
                // Body
                for (let r = 1; r <= rows; r++) {
                    md += '|';
                    for (let c = 0; c < cols; c++) {
                        md += ` ${inputs.find(i => i.dataset.row == r && i.dataset.col == c).value || ''} |`;
                    }
                    md += '\n';
                }
                output.value = md.trim();
            };

            rowsIn.oninput = renderGrid;
            colsIn.oninput = renderGrid;
            renderGrid();
        }
    })
});
