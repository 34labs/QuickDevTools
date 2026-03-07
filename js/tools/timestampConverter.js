import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'timestamp-conv',
    name: 'Timestamp Converter',
    icon: 'fa-clock',
    category: 'convert',
    desc: 'Unix timestamp to readable date and vice versa.',
    ui: () => ({
        html: `
            <div class="form-group">
                <label class="form-label">Timestamp (seconds)</label>
                <input type="text" class="form-control" id="tsIn" placeholder="e.g. 1709778263">
            </div>
            <div class="form-group">
                <label class="form-label">Date String</label>
                <input type="text" class="form-control" id="dateIn" placeholder="YYYY-MM-DD HH:MM:SS">
            </div>
            <div class="form-group">
                <label class="form-label">Result</label>
                <div class="result-box" id="tsOut" style="min-height: 80px; font-family: monospace; white-space: pre-wrap;"></div>
            </div>
        `,
        footer: `
            <button class="btn btn-secondary" id="tsClear">Clear</button>
            <button class="btn btn-secondary" id="tsNow">Current Time</button>
            <button class="btn btn-primary" id="tsConvert">Convert</button>
        `,
        init: () => {
            const tsIn = document.getElementById('tsIn');
            const dateIn = document.getElementById('dateIn');
            const out = document.getElementById('tsOut');
            const btn = document.getElementById('tsConvert');
            const nowBtn = document.getElementById('tsNow');
            const clear = document.getElementById('tsClear');

            const setOut = (txt, err = false) => {
                out.textContent = txt;
                out.style.color = err ? 'var(--danger)' : 'var(--text-primary)';
            };

            btn.onclick = () => {
                const ts = tsIn.value.trim();
                const ds = dateIn.value.trim();
                if (ts) {
                    try {
                        const d = new Date(parseInt(ts) * 1000);
                        if (isNaN(d.getTime())) throw 1;
                        setOut(`Local: ${d.toLocaleString()}\nISO:   ${d.toISOString()}\nUTC:   ${d.toUTCString()}`);
                    } catch (e) { setOut("Invalid timestamp", true); }
                } else if (ds) {
                    try {
                        const d = new Date(ds);
                        if (isNaN(d.getTime())) throw 1;
                        setOut(`Seconds: ${Math.floor(d.getTime() / 1000)}\nMillis:  ${d.getTime()}`);
                    } catch (e) { setOut("Invalid date format", true); }
                }
            };

            nowBtn.onclick = () => {
                const d = new Date();
                tsIn.value = Math.floor(d.getTime() / 1000);
                dateIn.value = d.toISOString().replace('T', ' ').substring(0, 19);
                setOut(`Current Time set.`);
            };

            clear.onclick = () => { tsIn.value = ''; dateIn.value = ''; setOut(''); };
        }
    })
});
