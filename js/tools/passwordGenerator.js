import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'pass-gen',
    name: 'Password Generator',
    icon: 'fa-key',
    category: 'generator',
    desc: 'Strong password creator with customization.',
    ui: () => ({
        html: `
            <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" id="pgU" checked> Uppercase
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" id="pgL" checked> Lowercase
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" id="pgN" checked> Numbers
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" id="pgS" checked> Symbols
                </label>
            </div>
            <div class="form-group">
                <label class="form-label">Length: <span id="pgLenVal">16</span></label>
                <input type="range" class="form-control" id="pgLen" min="4" max="64" value="16" style="padding:0; height:auto;">
            </div>
            <div class="result-box" id="pgOut" style="font-family: monospace; letter-spacing: 1px; font-size: 16px; min-height: 50px; display: flex; align-items: center; justify-content: center;"></div>
        `,
        footer: `
            <button class="btn btn-primary" id="pgBtn" style="width: 100%;">Generate</button>
        `,
        init: () => {
            const out = document.getElementById('pgOut');
            const btn = document.getElementById('pgBtn');
            const len = document.getElementById('pgLen');
            const lenV = document.getElementById('pgLenVal');

            len.oninput = (e) => lenV.textContent = e.target.value;

            const gen = () => {
                const u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const l = 'abcdefghijklmnopqrstuvwxyz';
                const n = '0123456789';
                const s = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                let c = '';
                if (document.getElementById('pgU').checked) c += u;
                if (document.getElementById('pgL').checked) c += l;
                if (document.getElementById('pgN').checked) c += n;
                if (document.getElementById('pgS').checked) c += s;

                if (!c) { out.textContent = 'Select options'; return; }

                let p = '';
                const arr = new Uint32Array(parseInt(len.value));
                crypto.getRandomValues(arr);
                for (let i = 0; i < arr.length; i++) p += c.charAt(arr[i] % c.length);
                out.textContent = p;
            };

            btn.onclick = gen;
            gen();
        }
    })
});
