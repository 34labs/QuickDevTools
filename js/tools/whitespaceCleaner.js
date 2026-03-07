import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'ws-cleaner',
    name: 'Whitespace Cleaner',
    icon: 'fa-broom',
    category: 'text',
    desc: 'Remove unnecessary whitespace.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="wsIn" placeholder="Paste text with messy whitespace..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="trimLines">Trim Lines</button>
                <button class="btn btn-secondary" id="collapseSpace">Collapse Spaces</button>
                <button class="btn btn-secondary" id="removeAllWS">Remove All</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="wsOut" readonly style="height: 150px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('wsIn');
            const output = document.getElementById('wsOut');

            document.getElementById('trimLines').onclick = () => {
                output.value = input.value.split('\n').map(l => l.trim()).join('\n');
            };

            document.getElementById('collapseSpace').onclick = () => {
                output.value = input.value.replace(/[ \t]+/g, ' ').trim();
            };

            document.getElementById('removeAllWS').onclick = () => {
                output.value = input.value.replace(/\s+/g, '');
            };
        }
    })
});
