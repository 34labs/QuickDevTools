import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'md-to-html',
    name: 'Markdown to HTML',
    icon: 'fa-file-export',
    category: 'text',
    desc: 'Convert Markdown to raw HTML code.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="m2hIn" placeholder="Enter markdown..." style="height: 150px; font-family: monospace;"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">HTML Code</label>
                <textarea class="form-control" id="m2hOut" readonly style="height: 150px; font-family: monospace; font-size: 12px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('m2hIn');
            const output = document.getElementById('m2hOut');

            const parseMd = (md) => {
                // Reuse the logic from markdownPreview but returning string
                let h = md
                    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
                    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                    .replace(/\*(.*)\*/gim, '<em>$1</em>')
                    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
                    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
                    .replace(/\n$/gim, '<br />');

                h = h.replace(/^\- (.*$)/gim, '<li>$1</li>');
                return h.trim();
            };

            input.oninput = () => {
                output.value = parseMd(input.value);
            };
        }
    })
});
