import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'css-shadow',
    name: 'Shadow Generator',
    icon: 'fa-clone',
    category: 'generator',
    desc: 'Visual CSS Box Shadow generator.',
    ui: () => ({
        html: `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: center; justify-content: center; height: 120px; background: var(--bg-body); border-radius: 8px;">
                    <div id="shadBox" style="width: 80px; height: 80px; background: var(--accent-primary); border-radius: 8px;"></div>
                </div>
                
                <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <label class="form-label" style="font-size: 11px;">H-Offset (<span id="shXV">0</span>px)</label>
                        <input type="range" id="shX" min="-50" max="50" value="0" class="form-control" style="height: auto; padding: 0;">
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 11px;">V-Offset (<span id="shYV">4</span>px)</label>
                        <input type="range" id="shY" min="-50" max="50" value="4" class="form-control" style="height: auto; padding: 0;">
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 11px;">Blur (<span id="shBV">10</span>px)</label>
                        <input type="range" id="shB" min="0" max="100" value="10" class="form-control" style="height: auto; padding: 0;">
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 11px;">Spread (<span id="shSV">0</span>px)</label>
                        <input type="range" id="shS" min="-50" max="50" value="0" class="form-control" style="height: auto; padding: 0;">
                    </div>
                </div>
                
                <div class="form-group" style="display: flex; gap: 12px; align-items: center;">
                    <div style="flex: 1;">
                        <label class="form-label" style="font-size: 11px;">Shadow Color</label>
                        <input type="color" id="shC" value="#000000" style="width: 100%; height: 30px; border: none; cursor: pointer;">
                    </div>
                    <div style="flex: 1;">
                        <label class="form-label" style="font-size: 11px;">Opacity (<span id="shOV">0.5</span>)</label>
                        <input type="range" id="shO" min="0" max="100" value="50" class="form-control" style="height: auto; padding: 0;">
                    </div>
                    <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding-top: 15px;">
                        <label style="font-size: 12px; cursor: pointer; display: flex; gap: 6px; align-items: center;">
                            <input type="checkbox" id="shI"> Inset
                        </label>
                    </div>
                </div>

                <div class="result-box" style="position: relative; padding-right: 40px; font-family: monospace; font-size: 12px;">
                    <span id="shadRes">box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5);</span>
                    <i class="fa fa-copy" id="shadCopy" style="position: absolute; right: 12px; top: 12px; cursor: pointer; opacity: 0.6;"></i>
                </div>
            </div>
        `,
        init: () => {
            const get = id => document.getElementById(id);
            const box = get('shadBox'),
                  x = get('shX'), y = get('shY'), b = get('shB'), s = get('shS'),
                  c = get('shC'), o = get('shO'), i = get('shI'),
                  res = get('shadRes'), copy = get('shadCopy');
            
            const hexToRgb = hex => {
                const bg = parseInt(hex.slice(1), 16);
                return `${(bg >> 16) & 255}, ${(bg >> 8) & 255}, ${bg & 255}`;
            };

            const upd = () => {
                get('shXV').textContent = x.value;
                get('shYV').textContent = y.value;
                get('shBV').textContent = b.value;
                get('shSV').textContent = s.value;
                get('shOV').textContent = (o.value / 100).toFixed(2);
                
                const rgba = `rgba(${hexToRgb(c.value)}, ${(o.value / 100).toFixed(2)})`;
                const shadow = `${i.checked ? 'inset ' : ''}${x.value}px ${y.value}px ${b.value}px ${s.value}px ${rgba}`;
                
                box.style.boxShadow = shadow;
                res.textContent = `box-shadow: ${shadow};`;
            };

            [x, y, b, s, c, o, i].forEach(el => el.addEventListener('input', upd));
            upd();

            copy.onclick = () => {
                navigator.clipboard.writeText(res.textContent);
                copy.style.color = 'var(--success)';
                setTimeout(() => copy.style.color = '', 500);
            };
        }
    })
});
