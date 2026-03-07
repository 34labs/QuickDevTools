import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-entropy',
    name: 'Text Entropy Analyzer',
    icon: 'fa-chart-area',
    category: 'text',
    desc: 'Calculate the Shannon entropy of your text.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="entIn" placeholder="Enter text to analyze entropy..." style="height: 150px;"></textarea>
            </div>
            <div class="result-box" id="entResult">Entropy: 0 bits</div>
            <div id="entExplanation" style="font-size: 11px; color: var(--text-muted); margin-top: 10px; line-height: 1.4;">
                Shannon entropy measures the "randomness" or information density of text. 
                Higher values indicate more diversity in characters.
            </div>
        `,
        init: () => {
            const input = document.getElementById('entIn');
            const result = document.getElementById('entResult');

            input.oninput = () => {
                const text = input.value;
                if (!text) {
                    result.textContent = 'Entropy: 0 bits';
                    return;
                }

                const freq = {};
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    freq[char] = (freq[char] || 0) + 1;
                }

                let entropy = 0;
                const len = text.length;
                for (const char in freq) {
                    const p = freq[char] / len;
                    entropy -= p * Math.log2(p);
                }

                result.textContent = `Entropy: ${entropy.toFixed(4)} bits per character`;
            };
        }
    })
});
