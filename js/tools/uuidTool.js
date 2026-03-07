import { registerTool } from "../engine/toolRegistry.js";

registerTool({
    id: 'uuid-gen',
    name: 'UUID Generator',
    category: 'generator',
    icon: 'fa-hashtag',
    desc: 'Generate V4 UUIDs instantly.',
    ui: () => ({
        html: `
            <div class="result-box" style="font-size: 18px; text-align:center;" id="uuidRes">Click Generate</div>
        `,
        footer: `<button class="btn btn-primary" id="uuidBtn">Generate UUID</button>`,
        init: () => {
            const btn = document.getElementById('uuidBtn');
            const res = document.getElementById('uuidRes');

            if (btn) btn.onclick = () => {
                const u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                res.textContent = u;
            };
        }
    })
});
