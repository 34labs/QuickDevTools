# DevTools Hub v2 — Refactor Starter Architecture

File ini bisa kamu simpan sebagai:

```text
docs/blueprint/09-refactor-starter-architecture.md
```

---

# 1. Refactor Philosophy

Prototype kamu sekarang:

```
single HTML
inline CSS
inline JS
tools hardcoded
```

Masalah jika dibiarkan:

```
file akan >10000 lines
sulit maintain
community tidak bisa kontribusi
```

Refactor v2 bertujuan:

```
modular system
plugin-ready
community-ready
```

---

# 2. Target Project Structure

Struktur yang direkomendasikan:

```
devtools-hub/

├ index.html
│
├ css/
│   app.css
│
├ js/
│
│   app.js
│   router.js
│   state.js
│
│   core/
│       modal.js
│       toast.js
│       storage.js
│
│   engine/
│       toolRegistry.js
│       commandRegistry.js
│       pluginLoader.js
│
│   ui/
│       cards.js
│       dashboard.js
│       widgets.js
│
│   tools/
│       jsonFormatter.js
│       base64Tool.js
│       uuidGenerator.js
│
│   community-tools/
│
├ plugins/
│   tools.json
│
├ docs/
│
├ .github/
│
├ README.md
├ LICENSE
```

---

# 3. New index.html

index.html hanya menjadi **entry point**.

```html
<script type="module" src="/js/app.js"></script>
```

Artinya semua logic pindah ke:

```
app.js
```

---

# 4. app.js (Application Entry)

```javascript
import { initState } from "./state.js"
import { loadPlugins } from "./engine/pluginLoader.js"
import { renderDashboard } from "./ui/dashboard.js"

async function initApp(){

 await initState()

 await loadPlugins()

 renderDashboard()

}

initApp()
```

Ini menjadi **bootstrap aplikasi**.

---

# 5. Tool Registry Engine

File:

```
js/engine/toolRegistry.js
```

```javascript
export const toolRegistry = new Map()

export function registerTool(tool){

 toolRegistry.set(tool.id, tool)

}

export function getTool(id){

 return toolRegistry.get(id)

}

export function getAllTools(){

 return Array.from(toolRegistry.values())

}
```

---

# 6. Plugin Loader

File:

```
js/engine/pluginLoader.js
```

```javascript
export async function loadPlugins(){

 const plugins = await fetch("/plugins/tools.json")
 .then(r => r.json())

 for(const path of plugins){

  await import(`/js/${path}`)

 }

}
```

---

# 7. Plugin Config

File:

```
plugins/tools.json
```

Example:

```
[
 "tools/jsonFormatter.js",
 "tools/base64Tool.js",
 "tools/uuidGenerator.js",
 "community-tools/slugGenerator.js"
]
```

Artinya:

```
tool baru = tambah file + tambah path
```

---

# 8. Example Tool (UUID)

File:

```
js/tools/uuidGenerator.js
```

```javascript
import { registerTool } from "../engine/toolRegistry.js"

registerTool({

 id:"uuid-generator",

 name:"UUID Generator",

 category:"generator",

 icon:"fa-hashtag",

 run(){

  return crypto.randomUUID()

 }

})
```

Tool langsung otomatis masuk registry.

---

# 9. Tool Rendering

File:

```
js/ui/cards.js
```

```javascript
import { getAllTools } from "../engine/toolRegistry.js"

export function renderTools(){

 const tools = getAllTools()

 const grid = document.getElementById("tools-grid")

 grid.innerHTML = tools.map(tool => `
  
  <div class="card" data-id="${tool.id}">
  
   <div class="card-icon">
   <i class="fas ${tool.icon}"></i>
   </div>

   <h3>${tool.name}</h3>

  </div>

 `).join("")

}
```

---

# 10. State System

File:

```
js/state.js
```

```javascript
export const state = {

 favorites: [],
 recent: [],
 notes: ""

}

export function initState(){

 state.favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

 state.recent = JSON.parse(localStorage.getItem("recent") || "[]")

 state.notes = localStorage.getItem("notes") || ""

}
```

---

# 11. Modal System

File:

```
js/core/modal.js
```

```javascript
export function openModal(title, html){

 const modal = document.getElementById("modalOverlay")

 document.getElementById("modalTitle").textContent = title

 document.getElementById("modalBody").innerHTML = html

 modal.classList.add("open")

}
```

---

# 12. Command System

File:

```
js/engine/commandRegistry.js
```

```javascript
export const commands = []

export function registerCommand(cmd){

 commands.push(cmd)

}
```

Example command:

```javascript
registerCommand({

 id:"generate-uuid",

 title:"Generate UUID",

 run(){

  navigator.clipboard.writeText(crypto.randomUUID())

 }

})
```

---

# 13. Community Tool Folder

```
js/community-tools/
```

Contributor hanya perlu:

```
buat file tool
registerTool()
```

---

# 14. Tool Template

File:

```
templates/tool-template.js
```

```javascript
import { registerTool } from "../engine/toolRegistry.js"

registerTool({

 id:"my-tool",

 name:"My Tool",

 category:"generator",

 icon:"fa-wrench",

 run(input){

  return input

 }

})
```

---

# 15. Dev Mode

Shortcut:

```
Ctrl + Shift + D
```

Panel menampilkan:

```
tool registry
command registry
state viewer
```

---

# 16. Lazy Tool Loading (Future)

Tool bisa di-load hanya saat dibuka.

```
import()
```

Example:

```
open tool → import module
```

---

# 17. CI/CD Deployment

Recommended hosting:

```
Cloudflare Pages
Netlify
Vercel
GitHub Pages
```

---

# 18. Production Build (Future)

Jika project makin besar:

```
Vite
```

atau

```
esbuild
```

untuk bundling.

---

# 19. Result

Dengan arsitektur ini DevTools Hub menjadi:

```
plugin-based
community-driven
scalable
maintainable
```

---

# 20. Realistic Outcome

Jika roadmap ini dijalankan:

DevTools Hub bisa menjadi:

```
Raycast-like developer launcher
```

tetapi:

```
browser based
open source
community driven
```

---

## Saran Jujur

Prototype kamu sebenarnya **sudah sangat bagus untuk foundation**.
Refactor ini bukan untuk memperbaiki UI — tapi untuk **menyiapkan masa depan project**.

Kalau kamu mau, aku bisa bantu lagi satu hal yang akan **sangat mempercepat perkembangan project kamu**:

Aku bisa buatkan **Starter Pack 30 Developer Tools pertama** yang langsung cocok dengan arsitektur baru ini.
Itu biasanya membuat proyek open-source terlihat **langsung “hidup” saat dirilis.**
