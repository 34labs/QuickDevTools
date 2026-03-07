import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'html-to-md',
    name: 'HTML to Markdown',
    icon: 'fa-file-import',
    category: 'text',
    desc: 'Convert raw HTML code to Markdown.',
    ui: () => ({
        html: `
            <div class="form-group">
                <textarea class="form-control" id="h2mIn" placeholder="Enter HTML code..." style="height: 150px; font-family: monospace;"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Markdown Output</label>
                <textarea class="form-control" id="h2mOut" readonly style="height: 150px; font-family: monospace; font-size: 13px;"></textarea>
            </div>
        `,
        init: () => {
            const input = document.getElementById('h2mIn');
            const output = document.getElementById('h2mOut');

            const toMd = (html) => {
                let md = html
                    .replace(/<h1>(.*?)<\/h1>/gim, '# $1\n')
                    .replace(/<h2>(.*?)<\/h2>/gim, '## $1\n')
                    .replace(/<h3>(.*?)<\/h3>/gim, '### $1\n')
                    .replace(/<strong>(.*?)<\/strong>/gim, '**$1**')
                    .replace(/<b>(.*?)<\/b>/gim, '**$1**')
                    .replace(/<em>(.*?)<\/em>/gim, '*$1*')
                    .replace(/<i>(.*?)<\/i>/gim, '*$1*')
                    .replace(/<a href="(.*?)">(.*?)<\/a>/gim, '[$2]($1)')
                    .replace(/<img alt="(.*?)" src="(.*?)" \/>/gim, '![$1]($2)')
                    .replace(/<li>(.*?)<\/li>/gim, '- $1\n')
                    .replace(/<br \/>/gim, '\n')
                    .replace(/<p>(.*?)<\/p>/gim, '$1\n\n');

                // Clean up extra tags
                md = md.replace(/<[^>]+>/g, '');
                return md.trim();
            };

            input.oninput = () => {
                output.value = toMd(input.value);
            };
        }
    })
});
