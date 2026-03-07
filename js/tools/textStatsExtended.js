import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-stats-extended',
    name: 'Text Statistics (Extended)',
    icon: 'fa-chart-bar',
    category: 'text',
    desc: 'Analyze character frequency and top keywords.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="statsIn" placeholder="Enter text to analyze..." style="height: 120px;"></textarea>
            </div>
            <div id="statsPanels" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="widget" style="padding: 10px;">
                    <div class="widget-title" style="font-size: 13px;">Top Keywords</div>
                    <div id="topWords" style="font-size: 12px; margin-top: 8px;"></div>
                </div>
                <div class="widget" style="padding: 10px;">
                    <div class="widget-title" style="font-size: 13px;">Char Frequency</div>
                    <div id="charFreq" style="font-size: 12px; margin-top: 8px;"></div>
                </div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('statsIn');
            const wordsEl = document.getElementById('topWords');
            const charsEl = document.getElementById('charFreq');

            input.oninput = () => {
                const text = input.value;
                if (!text) {
                    wordsEl.innerHTML = charsEl.innerHTML = '';
                    return;
                }

                // Word Frequency
                const words = text.toLowerCase().match(/\b\w{3,}\b/g) || [];
                const wordMap = {};
                words.forEach(w => wordMap[w] = (wordMap[w] || 0) + 1);
                const sortedWords = Object.entries(wordMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

                wordsEl.innerHTML = sortedWords.map(([w, c]) =>
                    `<div style="display:flex; justify-content:space-between;"><span>${w}</span><span>${c}</span></div>`
                ).join('') || 'None';

                // Char Frequency
                const charMap = {};
                const cleanText = text.replace(/\s/g, '');
                for (let char of cleanText) charMap[char] = (charMap[char] || 0) + 1;
                const sortedChars = Object.entries(charMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

                charsEl.innerHTML = sortedChars.map(([ch, c]) =>
                    `<div style="display:flex; justify-content:space-between;"><span>${ch}</span><span>${c}</span></div>`
                ).join('') || 'None';
            };
        }
    })
});
