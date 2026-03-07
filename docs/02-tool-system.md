# Tool System

Tools are the primary building blocks of DevTools Hub.

Each tool is implemented as a **self-contained module**.

## Tool Structure

Every tool must follow a standard format.

Example:

```

registerTool({

id: "slug-generator",

name: "Slug Generator",

category: "text",

icon: "fa-link",

description: "Convert text into URL slug",

run(input) {

return input
.toLowerCase()
.replace(/\s+/g,'-')
.replace(/[^\w-]+/g,'')

}

})

```

## Tool Categories

Tools are grouped by category:

- formatters
- converters
- generators
- web tools
- developer tools
- security tools

## Tool Packs

Tools may also be organized in packs.

Examples:

- Git tools
- Text tools
- Web tools
- Security tools

This makes large collections easier to manage.

Continue reading:

➡ **Next:** [Command System](./03-command-system.md)
