/**
 * Core Modal System for DevTools Hub
 */

const elements = {
    overlay: document.getElementById('modalOverlay'),
    title: document.getElementById('modalTitle'),
    body: document.getElementById('modalBody'),
    footer: document.getElementById('modalFooter'),
    closeBtn: document.getElementById('modalClose')
};

/**
 * Show a modal with content
 * @param {string} title - Modal title
 * @param {string} bodyHTML - HTML content for the body
 * @param {string} footerHTML - HTML content for the footer
 */
export function showModal(title, bodyHTML, footerHTML = '') {
    if (!elements.overlay) return;

    elements.title.textContent = title;
    elements.body.innerHTML = bodyHTML;
    elements.footer.innerHTML = footerHTML;
    elements.overlay.classList.add('open');
}

/**
 * Close the active modal
 */
export function closeModal() {
    if (!elements.overlay) return;
    elements.overlay.classList.remove('open');
}

/**
 * Initialize modal event listeners
 */
export function initModal() {
    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', closeModal);
    }

    if (elements.overlay) {
        elements.overlay.addEventListener('click', (e) => {
            if (e.target === elements.overlay) closeModal();
        });
    }
}
