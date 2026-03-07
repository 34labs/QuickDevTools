import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'jwt-dec',
    name: 'JWT Decoder',
    icon: 'fa-shield-halved',
    category: 'web',
    desc: 'Inspect JWT tokens (Header, Payload).',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="jwtIn" placeholder="Paste JWT here..." style="height: 70px; font-size: 12px;"></textarea>
            </div>
            <div id="jwtRes" style="display: none;">
                <div class="form-group">
                    <label class="form-label" style="color: #fb7299; font-size: 11px;">HEADER</label>
                    <div class="result-box" id="jwtH" style="font-size: 11px; padding: 10px; font-family: monospace; background: rgba(251, 114, 153, 0.05);"></div>
                </div>
                <div class="form-group">
                    <label class="form-label" style="color: #d1b3ff; font-size: 11px;">PAYLOAD</label>
                    <div class="result-box" id="jwtP" style="font-size: 11px; padding: 10px; font-family: monospace; background: rgba(209, 179, 255, 0.05);"></div>
                </div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('jwtIn');
            const res = document.getElementById('jwtRes');
            const hDiv = document.getElementById('jwtH');
            const pDiv = document.getElementById('jwtP');

            const decode = (s) => {
                try {
                    const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
                    return JSON.parse(decodeURIComponent(atob(b64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
                } catch { return null; }
            };

            input.oninput = () => {
                const parts = input.value.split('.');
                if (parts.length >= 2) {
                    const head = decode(parts[0]);
                    const pay = decode(parts[1]);
                    if (head && pay) {
                        hDiv.textContent = JSON.stringify(head, null, 2);
                        pDiv.textContent = JSON.stringify(pay, null, 2);
                        res.style.display = 'block';
                        return;
                    }
                }
                res.style.display = 'none';
            };
        }
    })
});
