import { registerTool } from '../engine/toolRegistry.js';

const webTools = [
    {
        id: 'github',
        name: 'GitHub',
        icon: 'fab fa-github',
        category: 'web',
        desc: 'World\'s leading software development platform.',
        url: 'https://github.com'
    },
    {
        id: 'mdn',
        name: 'MDN Docs',
        icon: 'fab fa-firefox',
        category: 'web',
        desc: 'Resources for developers, by developers.',
        url: 'https://developer.mozilla.org'
    },
    {
        id: 'stack-overflow',
        name: 'Stack Overflow',
        icon: 'fab fa-stack-overflow',
        category: 'web',
        desc: 'Knowledge sharing for programmers.',
        url: 'https://stackoverflow.com'
    },
    {
        id: 'codepen',
        name: 'CodePen',
        icon: 'fab fa-codepen',
        category: 'web',
        desc: 'Social development environment for front-end.',
        url: 'https://codepen.io'
    },
    {
        id: 'g-fonts',
        name: 'Google Fonts',
        icon: 'fas fa-font',
        category: 'web',
        desc: 'Library of open source designer web fonts.',
        url: 'https://fonts.google.com'
    },
    {
        id: 'deploy-thing',
        name: 'Deploy It',
        icon: 'fa-rocket',
        category: 'web',
        desc: 'Quick deployment tool for static projects.',
        url: 'https://flessan.pages.dev/projects/deploy'
    }
];

webTools.forEach(registerTool);
