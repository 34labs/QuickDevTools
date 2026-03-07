# Plugin System

The plugin system enables DevTools Hub to become an extensible platform.

Plugins can add new tools without modifying the core code.

## Plugin Loader

Plugins are listed in a configuration file.

Example:

```

plugins/tools.json

```

Example content:

```

[
"tools/jsonFormatter.js",
"tools/base64.js",
"community-tools/slug-generator.js"
]

```

The loader dynamically imports each plugin.

## Benefits

The plugin system allows:

- easy tool contributions
- modular architecture
- ecosystem growth

Continue reading:

➡ **Next:** [Community Contribution](./05-community-contribution.md)
