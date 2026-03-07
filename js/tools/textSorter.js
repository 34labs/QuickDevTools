import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-sorter',
    name: 'Text Sorter',
    icon: 'fa-sort-alpha-down',
    category: 'text',
    desc: 'Sort lines alphabetically or by length.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="sortIn" placeholder="Enter lines to sort..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="sortAZ">A-Z</button>
                <button class="btn btn-secondary" id="sortZA">Z-A</button>
                <button class="btn btn-secondary" id="sortLen">By Length</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="sortOut" readonly style="height: 150px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('sortIn');
            const output = document.getElementById('sortOut');

            document.getElementById('sortAZ').onclick = () => {
                const lines = input.value.split(/\n/).filter(l => l.length > 0);
                output.value = lines.sort((a, b) => a.localeCompare(b)).join('\n');
            };

            document.getElementById('sortZA').onclick = () => {
                const lines = input.value.split(/\n/).filter(l => l.length > 0);
                output.value = lines.sort((a, b) => b.localeCompare(a)).join('\n');
            };

            document.getElementById('sortLen').onclick = () => {
                const lines = input.value.split(/\n/).filter(l => l.length > 0);
                output.value = lines.sort((a, b) => a.length - b.length).join('\n');
            };
        }
    })
});
