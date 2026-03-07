import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-reverse',
    name: 'Text Reverse',
    icon: 'fa-undo',
    category: 'text',
    desc: 'Reverse text or lines.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="revIn" placeholder="Enter text to reverse..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="revAll">Reverse All</button>
                <button class="btn btn-secondary" id="revLines">Reverse Lines</button>
                <button class="btn btn-secondary" id="revChars">Reverse Each Line</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="revOut" readonly style="height: 150px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('revIn');
            const output = document.getElementById('revOut');

            document.getElementById('revAll').onclick = () => {
                output.value = input.value.split('').reverse().join('');
            };

            document.getElementById('revLines').onclick = () => {
                output.value = input.value.split('\n').reverse().join('\n');
            };

            document.getElementById('revChars').onclick = () => {
                output.value = input.value.split('\n').map(l => l.split('').reverse().join('')).join('\n');
            };
        }
    })
});
