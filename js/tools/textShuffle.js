import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'text-shuffle',
    name: 'Text Shuffle',
    icon: 'fa-random',
    category: 'text',
    desc: 'Randomize character or line order.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="shufIn" placeholder="Enter text to shuffle..." style="height: 150px;"></textarea>
            </div>
            <div class="form-group" style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" id="shufChars">Shuffle Chars</button>
                <button class="btn btn-secondary" id="shufWords">Shuffle Words</button>
                <button class="btn btn-secondary" id="shufLines">Shuffle Lines</button>
            </div>
            <div class="form-group">
                <textarea class="form-control" id="shufOut" readonly style="height: 150px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('shufIn');
            const output = document.getElementById('shufOut');

            const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

            document.getElementById('shufChars').onclick = () => {
                output.value = shuffle(input.value.split('')).join('');
            };

            document.getElementById('shufWords').onclick = () => {
                output.value = shuffle(input.value.split(/\s+/)).join(' ');
            };

            document.getElementById('shufLines').onclick = () => {
                output.value = shuffle(input.value.split('\n')).join('\n');
            };
        }
    })
});
