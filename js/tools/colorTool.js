import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'color-fmt',
    name: 'Color Tool',
    icon: 'fa-palette',
    category: 'generator',
    desc: 'Interactive color picker and format converter.',
    ui: () => ({
        html: `
            <div class="form-group" style="display: flex; gap: 12px; align-items: center;">
                <input type="color" id="clrP" value="#3b82f6" style="width: 80px; height: 80px; border: none; cursor: pointer; background: none;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                    <div id="clrH" style="font-family: monospace; font-size: 14px; background: var(--bg-input); padding: 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>#3B82F6</span><i class="fa fa-copy" style="opacity: 0.5;"></i></div>
                    <div id="clrR" style="font-family: monospace; font-size: 12px; background: var(--bg-input); padding: 8px; border-radius: 4px; opacity: 0.8;">rgb(59, 130, 246)</div>
                </div>
            </div>
        `,
        init: () => {
            const p = document.getElementById('clrP');
            const h = document.getElementById('clrH');
            const r = document.getElementById('clrR');

            const upd = (hex) => {
                h.querySelector('span').textContent = hex.toUpperCase();
                const big = parseInt(hex.slice(1), 16);
                const rgb = { r: (big >> 16) & 255, g: (big >> 8) & 255, b: big & 255 };
                r.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            };

            p.oninput = (e) => upd(e.target.value);
            h.onclick = () => {
                navigator.clipboard.writeText(h.querySelector('span').textContent);
                h.style.background = 'var(--success)';
                setTimeout(() => h.style.background = 'var(--bg-input)', 500);
            };
        }
    })
});
