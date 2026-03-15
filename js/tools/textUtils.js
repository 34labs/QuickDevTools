import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-utils',
    name: 'Text Utilities',
    icon: 'fa-align-left',
    category: 'text',
    desc: 'Line sorter, duplicate remover, and text analyzer.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="txtUtlIn" placeholder="Enter text here..." style="height: 150px; white-space: pre;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-secondary" id="txtSortAsc" style="flex: 1; padding: 6px; font-size: 12px;">Sort A-Z</button>
                <button class="btn btn-secondary" id="txtSortDesc" style="flex: 1; padding: 6px; font-size: 12px;">Sort Z-A</button>
                <button class="btn btn-secondary" id="txtRemDup" style="flex: 1; padding: 6px; font-size: 12px;">Rem Duplicates</button>
                <button class="btn btn-secondary" id="txtRemEmpty" style="flex: 1; padding: 6px; font-size: 12px;">Clean Empty Lines</button>
            </div>
            <div style="display: flex; gap: 16px; margin-top: 16px; font-size: 12px; color: var(--text-secondary);">
                <div>Words: <strong id="txtWCount" style="color: var(--text-primary);">0</strong></div>
                <div>Chars: <strong id="txtCCount" style="color: var(--text-primary);">0</strong></div>
                <div>Lines: <strong id="txtLCount" style="color: var(--text-primary);">0</strong></div>
            </div>
        `,
        init: () => {
            const t = document.getElementById('txtUtlIn');
            const [wc, cc, lc] = [document.getElementById('txtWCount'), document.getElementById('txtCCount'), document.getElementById('txtLCount')];
            
            const stats = () => {
                const val = t.value;
                cc.textContent = val.length;
                wc.textContent = val.trim() ? val.trim().split(/\s+/).length : 0;
                lc.textContent = val ? val.split('\n').length : 0;
            };

            t.oninput = stats;

            document.getElementById('txtSortAsc').onclick = () => {
                t.value = t.value.split('\n').sort().join('\n');
                stats();
            };
            
            document.getElementById('txtSortDesc').onclick = () => {
                t.value = t.value.split('\n').sort().reverse().join('\n');
                stats();
            };
            
            document.getElementById('txtRemDup').onclick = () => {
                t.value = [...new Set(t.value.split('\n'))].join('\n');
                stats();
            };
            
            document.getElementById('txtRemEmpty').onclick = () => {
                t.value = t.value.split('\n').filter(l => l.trim().length > 0).join('\n');
                stats();
            };
        }
    })
});
