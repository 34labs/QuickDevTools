# Command Palette System

The command palette acts as the **primary interaction interface**.

Shortcut:

Ctrl + K

## Command Types

Commands are categorized into several types:

- tool commands
- action commands
- navigation commands
- system commands

Example command:

```

registerCommand({

id: "copy-uuid",

title: "Generate UUID",

run() {

navigator.clipboard.writeText(crypto.randomUUID())

}

})

```

## Benefits

The command system allows users to:

- launch tools quickly
- run actions instantly
- navigate the interface

This keyboard-first approach significantly improves developer productivity.

Continue reading:

➡ **Next:** [Plugin System](./04-plugin-system.md)
