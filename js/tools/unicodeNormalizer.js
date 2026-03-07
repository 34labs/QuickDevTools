import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'uni-norm',
    name: 'Unicode Normalizer',
    icon: 'fa-magic',
    category: 'text',
    desc: 'Normalize Unicode text (NFC, NFD, NFKC, NFKD).',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="normIn" placeholder="Paste Unicode text..." style="height: 100px;"></textarea>
            </div>
            <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button class="btn btn-secondary" id="btnNFC">NFC</button>
                <button class="btn btn-secondary" id="btnNFD">NFD</button>
                <button class="btn btn-secondary" id="btnNFKC">NFKC</button>
                <button class="btn btn-secondary" id="btnNFKD">NFKD</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="normOut" readonly style="height: 100px;"></textarea>
                <div id="normStat" style="font-size: 10px; color: var(--text-muted); margin-top: 4px;"></div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('normIn');
            const output = document.getElementById('normOut');
            const stat = document.getElementById('normStat');

            const norm = (mode) => {
                const val = input.value;
                if (!val) return;
                const normalized = val.normalize(mode);
                output.value = normalized;
                stat.textContent = `Mode: ${mode} | Length: ${normalized.length} (Original: ${val.length})`;
            };

            document.getElementById('btnNFC').onclick = () => norm('NFC');
            document.getElementById('btnNFD').onclick = () => norm('NFD');
            document.getElementById('btnNFKC').onclick = () => norm('NFKC');
            document.getElementById('btnNFKD').onclick = () => norm('NFKD');
        }
    })
});
