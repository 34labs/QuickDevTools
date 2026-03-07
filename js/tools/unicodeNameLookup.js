import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'uni-lookup',
    name: 'Unicode Name Lookup',
    icon: 'fa-search',
    category: 'text',
    desc: 'Find common symbols and Unicode chars by name.',
    ui: () => ({
        html: `
            <div class="form-group">
                <input type="text" class="form-control" id="lookIn" placeholder="Search (e.g. arrow, star, check)...">
            </div>
            <div id="lookOut" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px;"></div>
        `,
        init: () => {
            const input = document.getElementById('lookIn');
            const output = document.getElementById('lookOut');

            // Small local dataset for offline lookup
            const data = [
                { name: 'arrow right', char: '→' }, { name: 'arrow left', char: '←' },
                { name: 'check mark', char: '✓' }, { name: 'heavy check', char: '✔' },
                { name: 'star', char: '★' }, { name: 'outline star', char: '☆' },
                { name: 'bullet', char: '•' }, { name: 'copyright', char: '©' },
                { name: 'trademark', char: '™' }, { name: 'registered', char: '®' },
                { name: 'degree', char: '°' }, { name: 'plus minus', char: '±' },
                { name: 'not equal', char: '≠' }, { name: 'infinity', char: '∞' },
                { name: 'cross', char: '×' }, { name: 'divide', char: '÷' }
            ];

            input.oninput = () => {
                const term = input.value.toLowerCase();
                output.innerHTML = '';
                if (!term) return;

                data.filter(i => i.name.includes(term)).forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'result-box';
                    el.style = 'height: 60px; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer;';
                    el.textContent = item.char;
                    el.onclick = () => {
                        navigator.clipboard.writeText(item.char);
                        const toast = document.getElementById('toast');
                        if (toast) {
                            toast.textContent = `Copied ${item.char}`;
                            toast.classList.add('show');
                            setTimeout(() => toast.classList.remove('show'), 1500);
                        }
                    };
                    output.appendChild(el);
                });
            };
        }
    })
});
