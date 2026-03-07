import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'slug-gen',
    name: 'Slug Generator',
    icon: 'fa-link',
    category: 'text',
    desc: 'Convert text into a URL-friendly slug.',
    ui: () => ({
        html: `
            <div class="form-group">
                <label class="form-label">Input Text</label>
                <input type="text" class="form-control" id="slugIn" placeholder="Enter title or text...">
            </div>
            <div class="form-group">
                <label class="form-label">Slug Output</label>
                <div class="result-box" id="slugOut" style="cursor: pointer;" title="Click to copy"></div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('slugIn');
            const output = document.getElementById('slugOut');

            const generateSlug = (text) => {
                return text
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            };

            input.oninput = () => {
                const slug = generateSlug(input.value);
                output.textContent = slug || 'waiting for input...';
            };

            output.onclick = () => {
                if (output.textContent && output.textContent !== 'waiting for input...') {
                    navigator.clipboard.writeText(output.textContent);
                    const toast = document.getElementById('toast');
                    if (toast) {
                        toast.textContent = 'Slug copied!';
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                }
            };
        }
    })
});
