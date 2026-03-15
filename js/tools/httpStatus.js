import { registerTool } from '../engine/toolRegistry.js';

registerTool({
    id: 'http-status',
    name: 'HTTP Status',
    icon: 'fa-server',
    category: 'web',
    desc: 'Explorer for HTTP status codes.',
    ui: () => ({
        html: `
            <div class="form-group">
                <input type="text" class="form-control" id="hsSearch" placeholder="Search code (e.g. 404 or Not Found)...">
            </div>
            <div id="hsResults" style="display: flex; flex-direction: column; gap: 8px; max-height: 250px; overflow-y: auto; padding-right: 4px;"></div>
        `,
        init: () => {
            const s = document.getElementById('hsSearch');
            const res = document.getElementById('hsResults');
            
            const codes = [
                {c: 200, n: 'OK', d: 'Standard response for successful HTTP requests.'},
                {c: 201, n: 'Created', d: 'The request has been fulfilled, resulting in the creation of a new resource.'},
                {c: 204, n: 'No Content', d: 'The server successfully processed the request and is not returning any content.'},
                {c: 301, n: 'Moved Permanently', d: 'This and all future requests should be directed to the given URI.'},
                {c: 302, n: 'Found', d: 'Temporary redirect.'},
                {c: 304, n: 'Not Modified', d: 'Indicates that the resource has not been modified since the version specified by the request headers.'},
                {c: 400, n: 'Bad Request', d: 'The server cannot or will not process the request due to an apparent client error.'},
                {c: 401, n: 'Unauthorized', d: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.'},
                {c: 403, n: 'Forbidden', d: 'The request was valid, but the server is refusing action.'},
                {c: 404, n: 'Not Found', d: 'The requested resource could not be found but may be available in the future.'},
                {c: 405, n: 'Method Not Allowed', d: 'A request method is not supported for the requested resource.'},
                {c: 409, n: 'Conflict', d: 'Indicates that the request could not be processed because of conflict in the current state of the resource.'},
                {c: 422, n: 'Unprocessable Entity', d: 'The request was well-formed but was unable to be followed due to semantic errors.'},
                {c: 429, n: 'Too Many Requests', d: 'The user has sent too many requests in a given amount of time.'},
                {c: 500, n: 'Internal Server Error', d: 'A generic error message, given when an unexpected condition was encountered.'},
                {c: 502, n: 'Bad Gateway', d: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.'},
                {c: 503, n: 'Service Unavailable', d: 'The server is currently unavailable (because it is overloaded or down for maintenance).'},
                {c: 504, n: 'Gateway Timeout', d: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.'}
            ];

            const render = (term = '') => {
                res.innerHTML = '';
                const t = term.toLowerCase();
                const filtered = codes.filter(x => x.c.toString().includes(t) || x.n.toLowerCase().includes(t));
                
                filtered.forEach(x => {
                    const cColor = x.c >= 500 ? 'var(--danger)' : 
                                   x.c >= 400 ? 'var(--warning)' : 
                                   x.c >= 300 ? '#3b82f6' : 'var(--success)';
                                   
                    const d = document.createElement('div');
                    d.style = "background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 4px;";
                    d.innerHTML = `
                        <div style="display: flex; align-items: baseline; gap: 8px;">
                            <span style="color: ${cColor}; font-weight: 700; font-size: 16px;">${x.c}</span>
                            <span style="font-weight: 600; font-size: 14px;">${x.n}</span>
                        </div>
                        <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${x.d}</div>
                    `;
                    res.appendChild(d);
                });
                
                if (filtered.length === 0) {
                    res.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px;">No results found.</div>';
                }
            };

            s.oninput = () => render(s.value);
            render();
        }
    })
});
