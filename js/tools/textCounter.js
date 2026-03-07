import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-counter',
    name: 'Text Counter',
    icon: 'fa-character', // Icon placeholder, app.css uses FA
    category: 'text',
    desc: 'Detailed character count.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="cntIn" placeholder="Type or paste text..." style="height: 150px;"></textarea>
            </div>
            <div id="cntResults" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div class="result-box">Total Chars: <span id="cntAll">0</span></div>
                <div class="result-box">No Spaces: <span id="cntNoSpace">0</span></div>
                <div class="result-box">Lines: <span id="cntLines">0</span></div>
                <div class="result-box">Words: <span id="cntWords">0</span></div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('cntIn');
            const resAll = document.getElementById('cntAll');
            const resNoS = document.getElementById('cntNoSpace');
            const resLines = document.getElementById('cntLines');
            const resWords = document.getElementById('cntWords');

            input.oninput = () => {
                const val = input.value;
                resAll.textContent = val.length;
                resNoS.textContent = val.replace(/\s/g, '').length;
                resLines.textContent = val ? val.split('\n').length : 0;
                resWords.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
            };
        }
    })
});
