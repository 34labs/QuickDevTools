import { registerTool } from "../engine/toolRegistry.js";

registerTool({
    id: 'url-enc',
    name: 'URL Encoder',
    category: 'convert',
    icon: 'fa-link',
    desc: 'Encode/Decode URLs safely.',
    ui: () => ({
        html: `
            <div class="form-group"><textarea class="form-control" id="urlIn" placeholder="URL..."></textarea></div>
            <div class="result-box" id="urlOut"></div>
        `,
        footer: `
            <button class="btn btn-primary" id="urlEnc">Encode</button>
            <button class="btn btn-primary" id="urlDec">Decode</button>
        `,
        init: () => {
            const input = document.getElementById('urlIn');
            const output = document.getElementById('urlOut');
            const enc = document.getElementById('urlEnc');
            const dec = document.getElementById('urlDec');

            if (enc) enc.onclick = () => output.textContent = encodeURIComponent(input.value);
            if (dec) dec.onclick = () => output.textContent = decodeURIComponent(input.value);
        }
    })
});
