import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'api-test',
    name: 'API Tester',
    icon: 'fa-plug',
    category: 'api',
    desc: 'Simple HTTP client for testing API endpoints.',
    ui: () => ({
        html: `
            <div class="form-group" style="display: flex; gap: 8px;">
                <select class="form-control" id="apiM" style="flex: 0 0 90px; padding: 10px;">
                    <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
                </select>
                <input type="text" class="form-control" id="apiU" placeholder="URL (https://...)">
            </div>
            <div class="form-group">
                <textarea class="form-control" id="apiB" placeholder="Request body (JSON)..." style="height: 60px; font-family: monospace; font-size: 12px;"></textarea>
            </div>
            <div class="result-box" id="apiRes" style="height: 180px; overflow-y: auto; font-family: monospace; font-size: 11px; white-space: pre-wrap;">Response will appear here...</div>
        `,
        footer: `
            <button class="btn btn-secondary" id="apiClear">Clear</button>
            <button class="btn btn-primary" id="apiBtn">Send</button>
        `,
        init: () => {
            const m = document.getElementById('apiM');
            const u = document.getElementById('apiU');
            const b = document.getElementById('apiB');
            const res = document.getElementById('apiRes');
            const btn = document.getElementById('apiBtn');
            const clear = document.getElementById('apiClear');

            btn.onclick = async () => {
                const url = u.value.trim();
                if (!url) return;
                res.textContent = "Loading...";
                try {
                    const start = performance.now();
                    const r = await fetch(url, {
                        method: m.value,
                        body: ['GET', 'HEAD'].includes(m.value) ? null : b.value
                    });
                    const txt = await r.text();
                    const time = (performance.now() - start).toFixed(0);
                    let out = `Status: ${r.status} (${time}ms)\n\n`;
                    try { out += JSON.stringify(JSON.parse(txt), null, 2); }
                    catch { out += txt; }
                    res.textContent = out;
                } catch (e) { res.textContent = "Error: " + e.message; }
            };

            clear.onclick = () => { u.value = ''; b.value = ''; res.textContent = 'Response will appear here...'; };
        }
    })
});
