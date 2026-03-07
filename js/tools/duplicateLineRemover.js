import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'dup-remover',
    name: 'Duplicate Line Remover',
    icon: 'fa-clone',
    category: 'text',
    desc: 'Remove duplicate lines from your text.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="dupIn" placeholder="Enter text with duplicate lines..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" id="dupBtn">Remove Duplicates</button>
            </div>
            <div class="form-group">
                <label class="form-label">Result</label>
                <textarea class="form-control" id="dupOut" readonly style="height: 150px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('dupIn');
            const button = document.getElementById('dupBtn');
            const output = document.getElementById('dupOut');

            button.onclick = () => {
                const lines = input.value.split(/\n/);
                const unique = [...new Set(lines)];
                output.value = unique.join('\n');
            };
        }
    })
});
