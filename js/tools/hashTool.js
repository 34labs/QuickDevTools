import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'hash-fmt',
    name: 'Hash Tool',
    icon: 'fa-fingerprint',
    category: 'generator',
    desc: 'SHA-1, SHA-256, and SHA-512 generator.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="hashIn" placeholder="String to hash..." style="height: 60px;"></textarea>
            </div>
            <div class="form-group">
                <select class="form-control" id="hashA">
                    <option>SHA-256</option><option>SHA-512</option><option>SHA-1</option>
                </select>
            </div>
            <div class="result-box" id="hashOut" style="word-break: break-all; font-family: monospace; min-height: 50px;"></div>
        `,
        footer: `
            <button class="btn btn-primary" id="hashBtn" style="width:100%;">Hash It</button>
        `,
        init: () => {
            const i = document.getElementById('hashIn');
            const a = document.getElementById('hashA');
            const o = document.getElementById('hashOut');
            const btn = document.getElementById('hashBtn');

            btn.onclick = async () => {
                if (!i.value) return;
                try {
                    const buf = new TextEncoder().encode(i.value);
                    const hash = await crypto.subtle.digest(a.value, buf);
                    o.textContent = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
                } catch (e) { o.textContent = "Error: " + e.message; }
            };
        }
    })
});
