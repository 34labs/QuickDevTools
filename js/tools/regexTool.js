import { registerTool } from "../engine/toolRegistry.js";

registerTool({
    id: 'regex-test',
    name: 'Regex Tester',
    category: 'web',
    icon: 'fa-code-branch',
    desc: 'Test regular expressions.',
    ui: () => ({
        html: `
            <div class="form-group"><input class="form-control" id="regexPat" placeholder="Pattern (e.g. [a-z]+)"></div>
            <div class="form-group"><input class="form-control" id="regexFlags" placeholder="Flags (e.g. g, i)"></div>
            <div class="form-group"><textarea class="form-control" id="regexStr" placeholder="Test string"></textarea></div>
            <div class="result-box" id="regexOut">Matches...</div>
        `,
        footer: `<button class="btn btn-primary" id="regexBtn">Test</button>`,
        init: () => {
            const pat = document.getElementById('regexPat');
            const flags = document.getElementById('regexFlags');
            const str = document.getElementById('regexStr');
            const output = document.getElementById('regexOut');
            const btn = document.getElementById('regexBtn');

            if (btn) btn.onclick = () => {
                try {
                    const re = new RegExp(pat.value, flags.value);
                    const m = str.value.match(re);
                    output.textContent = m ? m.join('\n') : "No matches";
                } catch (e) { output.textContent = "Invalid Regex"; }
            };
        }
    })
});
