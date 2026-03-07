import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'case-conv',
    name: 'Case Converter',
    icon: 'fa-font',
    category: 'convert',
    desc: 'Change text casing between camel, snake, kebab, etc.',
    ui: () => ({
        html: `
            <div class="form-group">
                <input type="text" class="form-control" id="caseIn" placeholder="Enter text (e.g. My Variable Name)">
            </div>
            <div id="caseOuts" style="display: flex; flex-direction: column; gap: 8px;"></div>
        `,
        init: () => {
            const input = document.getElementById('caseIn');
            const outs = document.getElementById('caseOuts');

            const convs = {
                'lower case': s => s.toLowerCase(),
                'UPPER CASE': s => s.toUpperCase(),
                'snake_case': s => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_'),
                'camelCase': s => {
                    const w = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
                    return w[0].toLowerCase() + w.slice(1).map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join('');
                },
                'kebab-case': s => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('-')
            };

            input.oninput = () => {
                const val = input.value.trim();
                outs.innerHTML = '';
                if (!val) return;
                try {
                    Object.entries(convs).forEach(([label, fn]) => {
                        const res = fn(val);
                        const row = document.createElement('div');
                        row.style = "display: flex; justify-content: space-between; align-items: center; background: var(--bg-input); padding: 8px 12px; border-radius: 6px; font-size: 12px;";
                        row.innerHTML = `
                            <span style="opacity: 0.6; font-size: 10px;">${label}</span>
                            <span style="font-family: monospace;">${res}</span>
                        `;
                        row.onclick = () => {
                            navigator.clipboard.writeText(res);
                            const old = row.style.background;
                            row.style.background = 'var(--success)';
                            setTimeout(() => row.style.background = old, 500);
                        };
                        outs.appendChild(row);
                    });
                } catch (e) { }
            };
        }
    })
});
