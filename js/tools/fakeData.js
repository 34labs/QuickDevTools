import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'fake-data',
    name: 'Fake Data Generator',
    icon: 'fa-database',
    category: 'generator',
    desc: 'Generate mock JSON data (names, emails, addresses).',
    ui: () => ({
        html: `
            <div class="form-group" style="display: flex; gap: 12px; flex-wrap: wrap;">
                <label style="font-size: 13px; cursor: pointer; flex: 1; min-width: 100px;">
                    <input type="checkbox" id="fdName" checked> Name
                </label>
                <label style="font-size: 13px; cursor: pointer; flex: 1; min-width: 100px;">
                    <input type="checkbox" id="fdEmail" checked> Email
                </label>
                <label style="font-size: 13px; cursor: pointer; flex: 1; min-width: 100px;">
                    <input type="checkbox" id="fdPhone" checked> Phone
                </label>
                <label style="font-size: 13px; cursor: pointer; flex: 1; min-width: 100px;">
                    <input type="checkbox" id="fdAddr" checked> Address
                </label>
                <label style="font-size: 13px; cursor: pointer; flex: 1; min-width: 100px;">
                    <input type="checkbox" id="fdUuid" checked> UUID
                </label>
            </div>
            <div class="form-group" style="display: flex; align-items: center; gap: 12px;">
                <label class="form-label" style="margin: 0;">Count:</label>
                <input type="number" id="fdCount" value="3" min="1" max="50" class="form-control" style="width: 80px; padding: 6px;">
            </div>
            <div class="result-box" id="fdOut" style="height: 200px; overflow-y: auto; font-family: monospace; font-size: 12px; white-space: pre-wrap;"></div>
        `,
        footer: `
            <button class="btn btn-secondary" id="fdCopy">Copy</button>
            <button class="btn btn-primary" id="fdGen">Generate</button>
        `,
        init: () => {
            const [n, e, p, a, u] = ['fdName', 'fdEmail', 'fdPhone', 'fdAddr', 'fdUuid'].map(id => document.getElementById(id));
            const count = document.getElementById('fdCount');
            const out = document.getElementById('fdOut');
            
            const firsts = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
            const lasts = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
            const doms = ['example.com', 'test.org', 'mock.net', 'demo.io'];
            const streets = ['Main St', 'Oak Ave', 'Pine Ln', 'Maple Dr', 'Cedar Ct'];

            const rand = arr => arr[Math.floor(Math.random() * arr.length)];
            const ud = () => {
                let d = new Date().getTime();
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    let r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            };

            const genData = () => {
                const res = [];
                const max = parseInt(count.value) || 3;
                
                for(let i=0; i<Math.min(max, 100); i++) {
                    const fn = rand(firsts);
                    const ln = rand(lasts);
                    let obj = {};
                    
                    if (u.checked) obj.id = ud();
                    if (n.checked) obj.name = `${fn} ${ln}`;
                    if (e.checked) obj.email = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random()*100)}@${rand(doms)}`;
                    if (p.checked) obj.phone = `555-${String(Math.floor(100+Math.random()*900))}-${String(Math.floor(1000+Math.random()*9000))}`;
                    if (a.checked) obj.address = `${Math.floor(1+Math.random()*9999)} ${rand(streets)}, City, ST ${Math.floor(10000+Math.random()*90000)}`;
                    
                    res.push(obj);
                }
                out.textContent = JSON.stringify(res, null, 2);
            };

            document.getElementById('fdGen').onclick = genData;
            document.getElementById('fdCopy').onclick = (ev) => {
                navigator.clipboard.writeText(out.textContent);
                const btn = ev.target;
                const old = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = old, 1500);
            };
            
            genData();
        }
    })
});
