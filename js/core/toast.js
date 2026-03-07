/**
 * Core Toast Notification System
 */

const toastEl = document.getElementById('toast');

/**
 * Show a toast message
 * @param {string} msg - Message to display
 * @param {number} duration - Duration in ms
 */
export function showToast(msg, duration = 3000) {
    if (!toastEl) return;

    toastEl.textContent = msg;
    toastEl.classList.add('show');

    setTimeout(() => {
        toastEl.classList.remove('show');
    }, duration);
}
