import { setState } from "../state.js";

/**
 * Navigation System for QuickDevTools
 * Handles tab switching and active states for Sidebar and Bottom Nav
 */

const elements = {
    tabs: document.querySelectorAll('.tab-content'),
    links: document.querySelectorAll('.side-link, .nav-item'),
    catFilters: document.querySelectorAll('.cat-filter'),
    bottomAbout: document.getElementById('btn-about'),
    sideAbout: document.getElementById('side-about'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    sidebar: document.querySelector('.sidebar')
};

/**
 * Switch to a specific tab
 * @param {string} tabId - ID of the tab to show
 */
export function switchTab(tabId) {
    if (!tabId) return;

    // Update State
    setState('activeTab', tabId);

    // Update UI Tabs
    elements.tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.classList.remove('hidden');
        } else {
            tab.classList.add('hidden');
        }
    });

    // Update Links Active State
    elements.links.forEach(link => {
        const target = link.dataset.target;
        if (target === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log(`Tab switched to: ${tabId}`);
}

/**
 * Initialize Navigation Event Listeners
 */
export function initNavigation() {
    // Tab Links (Sidebar & Bottom Nav)
    elements.links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.dataset.target;
            if (target) {
                e.preventDefault();
                switchTab(target);
            }
        });
    });

    // Category Filters (Sidebar)
    elements.catFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = filter.dataset.filter;

            // Switch to home tab first if not already there
            switchTab('tab-home');

            // Find the corresponding chip in the dashboard and click it
            const chips = document.querySelectorAll('.cat-chip');
            const targetChip = Array.from(chips).find(c => c.dataset.filter === cat);
            if (targetChip) {
                targetChip.click();
            }

            // Highlight the side link
            elements.catFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
        });
    });

    // About Buttons
    [elements.bottomAbout, elements.sideAbout].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Close sidebar if on mobile
                if (window.innerWidth < 1024) {
                    elements.sidebar.classList.remove('open');
                    elements.sidebarOverlay.classList.remove('open');
                }
                
                import("./modal.js").then(m => {
                    m.showModal(
                        "About QuickDevTools",
                        `<div style="line-height: 1.6; text-align: center;">
                            <p><strong>QuickDevTools v2</strong></p>
                            <p>A comprehensive collection of essential tools for developers, refactored for performance and modularity.</p>
                            <p style="margin-top: 10px; font-size: 13px; color: var(--text-muted);">Built with ❤️ for the Developer Community.</p>
                            <div style="margin-top: 15px;">
                                <a href='https://submito.net' target='_blank' title='Listed on Submito'>
                                    <img src='https://submito.net/badge/listed-dark.svg' alt='Listed on Submito' style="height: 32px;" />
                                </a>
                            </div>
                        </div>`,
                        `<button class="btn btn-primary" onclick="this.closest('.modal-overlay').classList.remove('open')">Close</button>`
                    );
                });
            });
        }
    });

    // Sidebar Toggle (Mobile)
    if (elements.sidebarToggle) {
        elements.sidebarToggle.addEventListener('click', () => {
            elements.sidebar.classList.toggle('open');
            elements.sidebarOverlay.classList.toggle('open');
        });
    }

    // Close Sidebar on Overlay Click
    if (elements.sidebarOverlay) {
        elements.sidebarOverlay.addEventListener('click', () => {
            elements.sidebar.classList.remove('open');
            elements.sidebarOverlay.classList.remove('open');
        });
    }

    // Close Sidebar on link click (Mobile)
    elements.links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                elements.sidebar.classList.remove('open');
                elements.sidebarOverlay.classList.remove('open');
            }
        });
    });
}
