import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'word-counter',
    name: 'Smart Word Counter',
    icon: 'fa-calculator',
    category: 'text',
    desc: 'Count words, characters, sentences, and paragraphs.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="wordIn" placeholder="Paste your text here..." style="height: 150px;"></textarea>
            </div>
            <div class="dashboard-grid" id="wordStats" style="grid-template-columns: repeat(2, 1fr); gap: 10px;">
                <div class="result-box">Words: <span id="cntWords">0</span></div>
                <div class="result-box">Chars: <span id="cntChars">0</span></div>
                <div class="result-box">Sentences: <span id="cntSents">0</span></div>
                <div class="result-box">Paragraphs: <span id="cntPara">0</span></div>
                <div class="result-box" style="grid-column: span 2;">Reading Time: <span id="readTime">0 min</span></div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('wordIn');
            const cntWords = document.getElementById('cntWords');
            const cntChars = document.getElementById('cntChars');
            const cntSents = document.getElementById('cntSents');
            const cntPara = document.getElementById('cntPara');
            const readTime = document.getElementById('readTime');

            input.oninput = () => {
                const val = input.value;
                const words = val.trim() ? val.trim().split(/\s+/).length : 0;
                const chars = val.length;
                const sents = val.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                const paras = val.split(/\n+/).filter(p => p.trim().length > 0).length;
                const time = Math.ceil(words / 200);

                cntWords.textContent = words;
                cntChars.textContent = chars;
                cntSents.textContent = sents;
                cntPara.textContent = paras;
                readTime.textContent = `${time} min`;
            };
        }
    })
});
