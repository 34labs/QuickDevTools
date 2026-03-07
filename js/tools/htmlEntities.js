import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'html-ent',
    name: 'HTML Entities',
    icon: 'fa-code',
    category: 'convert',
    desc: 'Encode or decode HTML special characters.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="entIn" placeholder="Enter text..." style="height: 120px;"></textarea>
            </div>
            <div class="result-box" id="entOut">Result will appear here...</div>
        `,
        footer: `
            <button class="btn btn-secondary" id="entClear">Clear</button>
            <button class="btn btn-primary" id="entEnc">Encode</button>
            <button class="btn btn-primary" id="entDec">Decode</button>
        `,
        init: () => {
            const input = document.getElementById('entIn');
            const output = document.getElementById('entOut');
            const enc = document.getElementById('entEnc');
            const dec = document.getElementById('entDec');
            const clear = document.getElementById('entClear');

            enc.onclick = () => {
                const div = document.createElement('div');
                div.textContent = input.value;
                output.textContent = div.innerHTML;
            };

            dec.onclick = () => {
                const div = document.createElement('div');
                div.innerHTML = input.value;
                output.textContent = div.textContent;
            };

            clear.onclick = () => { input.value = ''; output.textContent = 'Result will appear here...'; };
        }
    })
});
