import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'sentence-extractor',
    name: 'Sentence Extractor',
    icon: 'fa-align-justify',
    category: 'text',
    desc: 'Extract individual sentences from a text block.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="sentIn" placeholder="Paste your paragraph here..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Extracted Sentences</label>
                <div id="sentOut" style="display: flex; flex-direction: column; gap: 8px;"></div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('sentIn');
            const output = document.getElementById('sentOut');

            input.oninput = () => {
                const text = input.value;
                output.innerHTML = '';
                if (!text) return;

                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

                sentences.forEach(s => {
                    const row = document.createElement('div');
                    row.className = 'result-box';
                    row.style = 'cursor: pointer; padding: 10px; font-size: 13px;';
                    row.textContent = s.trim();
                    row.onclick = () => {
                        navigator.clipboard.writeText(s.trim());
                        const toast = document.getElementById('toast');
                        if (toast) {
                            toast.textContent = 'Sentence copied!';
                            toast.classList.add('show');
                            setTimeout(() => toast.classList.remove('show'), 1500);
                        }
                    };
                    output.appendChild(row);
                });
            };
        }
    })
});
