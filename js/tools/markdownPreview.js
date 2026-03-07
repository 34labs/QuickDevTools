import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'md-preview',
    name: 'Markdown Preview',
    icon: 'fa-file-code',
    category: 'text',
    desc: 'Live Markdown to HTML previewer.',
    ui: () => ({
        html: `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; height: 350px;">
                <div class="form-group" style="display: flex; flex-direction: column;">
                    <label class="form-label">Markdown Input</label>
                    <textarea class="form-control" id="mdIn" placeholder="# Title\\n\\nSome **bold** text..." style="flex: 1; font-family: monospace; font-size: 13px;"></textarea>
                </div>
                <div class="form-group" style="display: flex; flex-direction: column;">
                    <label class="form-label">HTML Preview</label>
                    <div id="mdOut" class="result-box" style="flex: 1; overflow-y: auto; background: var(--bg-body); font-family: var(--font-main); color: var(--text-primary); padding: 15px;"></div>
                </div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 10px;">
                Note: This is a basic offline parser for headers, bold, italics, lists, and links.
            </div>
        `,
        init: () => {
            const input = document.getElementById('mdIn');
            const output = document.getElementById('mdOut');

            const parseMd = (md) => {
                let html = md
                    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
                    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                    .replace(/\*(.*)\*/gim, '<i>$1</i>')
                    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
                    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
                    .replace(/\n$/gim, '<br />');

                // Very basic list support
                html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
                if (html.includes('<li>')) {
                    html = html.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
                }

                return html;
            };

            input.oninput = () => {
                output.innerHTML = parseMd(input.value);
            };
        }
    })
});
