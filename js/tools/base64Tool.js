import { registerTool } from "../engine/toolRegistry.js";

registerTool({
    id: 'base64',
    name: 'Base64 Converter',
    category: 'convert',
    icon: 'fa-exchange-alt',
    desc: 'Encode and decode Base64 strings.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="b64Input" placeholder="Enter text..."></textarea>
            </div>
            <div class="result-box" id="b64Output">Result...</div>
        `,
        footer: `
            <button class="btn btn-secondary" id="b64Clear">Clear</button>
            <button class="btn btn-primary" id="b64EncBtn">Encode</button>
            <button class="btn btn-primary" id="b64DecBtn">Decode</button>
        `,
        init: () => {
            const input = document.getElementById('b64Input');
            const output = document.getElementById('b64Output');
            const encBtn = document.getElementById('b64EncBtn');
            const decBtn = document.getElementById('b64DecBtn');
            const clear = document.getElementById('b64Clear');

            if (clear) clear.onclick = () => { input.value = ''; output.textContent = 'Result...'; };

            if (encBtn) encBtn.onclick = () => {
                try {
                    output.textContent = btoa(unescape(encodeURIComponent(input.value)));
                } catch (e) { alert('Error encoding'); }
            };

            if (decBtn) decBtn.onclick = () => {
                try {
                    output.textContent = decodeURIComponent(escape(window.atob(input.value)));
                } catch (e) { alert('Error decoding'); }
            };
        }
    })
});
