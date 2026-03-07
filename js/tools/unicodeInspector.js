import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'uni-inspector',
    name: 'Unicode Inspector',
    icon: 'fa-microscope',
    category: 'text',
    desc: 'Brings down text into Unicode code points.',
    ui: () => ({
        html: `
            <div class="form-group">
                <input type="text" class="form-control" id="uniIn" placeholder="Type or paste character(s)...">
            </div>
            <div id="uniOut" style="display: flex; flex-direction: column; gap: 8px;"></div>
        `,
        init: () => {
            const input = document.getElementById('uniIn');
            const output = document.getElementById('uniOut');

            input.oninput = () => {
                const val = input.value;
                output.innerHTML = '';
                if (!val) return;

                [...val].forEach(char => {
                    const code = char.codePointAt(0);
                    const hex = code.toString(16).toUpperCase().padStart(4, '0');
                    const row = document.createElement('div');
                    row.className = 'result-box';
                    row.style = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 12px;';
                    row.innerHTML = `
                        <span style="font-size: 24px;">${char}</span>
                        <div>
                            <div style="font-size: 14px; font-weight: bold;">U+${hex}</div>
                            <div style="font-size: 10px; color: var(--text-muted);">Dec: ${code}</div>
                        </div>
                    `;
                    output.appendChild(row);
                });
            };
        }
    })
});
