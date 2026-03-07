import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'lorem-fmt',
    name: 'Lorem Ipsum',
    icon: 'fa-align-left',
    category: 'generator',
    desc: 'Generate placeholder text for UI mockups.',
    ui: () => ({
        html: `
            <div class="form-group" style="display: flex; gap: 8px;">
                <select class="form-control" id="lorT">
                    <option value="p">Paragraphs</option>
                    <option value="s">Sentences</option>
                    <option value="w">Words</option>
                </select>
                <input type="number" class="form-control" id="lorC" value="3" style="width: 70px;">
            </div>
            <div class="result-box" id="lorOut" style="height: 150px; overflow-y: auto; font-size: 13px; line-height: 1.6;"></div>
        `,
        footer: `
            <button class="btn btn-primary" id="lorBtn" style="width: 100%;">Generate</button>
        `,
        init: () => {
            const type = document.getElementById('lorT');
            const count = document.getElementById('lorC');
            const out = document.getElementById('lorOut');
            const btn = document.getElementById('lorBtn');

            const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];

            btn.onclick = () => {
                let r = '';
                const n = parseInt(count.value) || 1;
                if (type.value === 'w') {
                    for (let i = 0; i < n; i++) r += words[Math.floor(Math.random() * words.length)] + ' ';
                } else {
                    for (let i = 0; i < n; i++) {
                        let s = 'Lorem ipsum dolor sit amet. ';
                        if (type.value === 'p') r += `<p style="margin-bottom:12px;">${s.repeat(3)}</p>`;
                        else r += s;
                    }
                }
                out.innerHTML = r;
            };
            btn.onclick();
        }
    })
});
