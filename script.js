/**
 * ============================================
 * CODEPLAYGROUND - ONLINE CODE EDITOR
 * ============================================
 * A modern, lightweight code playground for HTML, CSS, and JavaScript
 * with live preview, syntax highlighting, and localStorage persistence.
 * 
 * Features:
 * - Live preview with debounced updates
 * - Dark/Light theme with smooth transitions
 * - localStorage for code and theme persistence
 * - Collapsible editor panels
 * - Line numbers
 * - Keyboard shortcuts (Ctrl+Enter to run)
 * - Toast notifications
 * - Fully responsive design
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    theme: 'dark',
    lastSavedTime: null,
    debounceTimer: null,
    isAutoUpdate: true
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    // Editors
    htmlEditor: document.getElementById('htmlEditor'),
    cssEditor: document.getElementById('cssEditor'),
    jsEditor: document.getElementById('jsEditor'),
    
    // Line numbers
    htmlLineNumbers: document.getElementById('htmlLineNumbers'),
    cssLineNumbers: document.getElementById('cssLineNumbers'),
    jsLineNumbers: document.getElementById('jsLineNumbers'),
    
    // Preview
    preview: document.getElementById('preview'),
    previewContent: document.querySelector('.preview-content'),
    previewStatus: document.getElementById('previewStatus'),
    
    // Buttons
    runBtn: document.getElementById('runBtn'),
    saveBtn: document.getElementById('saveBtn'),
    resetBtn: document.getElementById('resetBtn'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.querySelector('.toast-message'),
    
    // Panels
    editorPanels: document.querySelectorAll('.editor-panel')
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function init() {
    loadTheme();
    loadSavedCode();
    setupEventListeners();
    updateAllLineNumbers();
    updatePreview();
    
    console.log('🚀 CodePlayground initialized successfully!');
}

// ============================================
// THEME MANAGEMENT
// ============================================

/**
 * Load theme from localStorage or use default
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('codeplayground-theme') || 'dark';
    state.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('codeplayground-theme', state.theme);
    
    showToast(`Switched to ${state.theme} theme`);
}

// ============================================
// CODE PERSISTENCE
// ============================================

/**
 * Load saved code from localStorage
 */
function loadSavedCode() {
    const savedHTML = localStorage.getItem('codeplayground-html');
    const savedCSS = localStorage.getItem('codeplayground-css');
    const savedJS = localStorage.getItem('codeplayground-js');
    
    if (savedHTML) elements.htmlEditor.value = savedHTML;
    if (savedCSS) elements.cssEditor.value = savedCSS;
    if (savedJS) elements.jsEditor.value = savedJS;
    
    // Load default template if nothing is saved
    if (!savedHTML && !savedCSS && !savedJS) {
        loadDefaultTemplate();
    }
}

/**
 * Save current code to localStorage
 */
function saveCode() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    
    localStorage.setItem('codeplayground-html', html);
    localStorage.setItem('codeplayground-css', css);
    localStorage.setItem('codeplayground-js', js);
    
    state.lastSavedTime = new Date();
    showToast('Code saved successfully!');
    
    console.log('💾 Code saved to localStorage');
}

/**
 * Reset all editors to empty state
 */
function resetCode() {
    if (confirm('Are you sure you want to reset all code? This cannot be undone.')) {
        elements.htmlEditor.value = '';
        elements.cssEditor.value = '';
        elements.jsEditor.value = '';
        
        localStorage.removeItem('codeplayground-html');
        localStorage.removeItem('codeplayground-css');
        localStorage.removeItem('codeplayground-js');
        
        updateAllLineNumbers();
        updatePreview();
        
        showToast('All code has been reset');
        console.log('🔄 Code reset');
    }
}

/**
 * Load default template for new users
 */
function loadDefaultTemplate() {
    elements.htmlEditor.value = `<div class="container">
  <h1>Welcome to CodePlayground! 🚀</h1>
  <p>Start coding and see live results!</p>
  <button id="demoBtn">Click Me</button>
</div>`;

    elements.cssEditor.value = `body {
  margin: 0;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  color: #555;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}`;

    elements.jsEditor.value = `// Add interactivity to your page
const btn = document.getElementById('demoBtn');

btn.addEventListener('click', () => {
  alert('Hello from CodePlayground! 👋');
  btn.textContent = 'Clicked!';
  btn.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
});

console.log('JavaScript is running! ✨');`;

    updateAllLineNumbers();
}

// ============================================
// LINE NUMBERS
// ============================================

/**
 * Update line numbers for a specific editor
 * @param {HTMLTextAreaElement} editor - The editor textarea
 * @param {HTMLElement} lineNumbersEl - The line numbers container
 */
function updateLineNumbers(editor, lineNumbersEl) {
    const lines = editor.value.split('\n').length;
    const lineNumbersHTML = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    lineNumbersEl.textContent = lineNumbersHTML;
}

/**
 * Update line numbers for all editors
 */
function updateAllLineNumbers() {
    updateLineNumbers(elements.htmlEditor, elements.htmlLineNumbers);
    updateLineNumbers(elements.cssEditor, elements.cssLineNumbers);
    updateLineNumbers(elements.jsEditor, elements.jsLineNumbers);
}

/**
 * Sync scroll position between editor and line numbers
 * @param {HTMLTextAreaElement} editor - The editor textarea
 * @param {HTMLElement} lineNumbersEl - The line numbers container
 */
function syncScroll(editor, lineNumbersEl) {
    lineNumbersEl.scrollTop = editor.scrollTop;
}

// ============================================
// PREVIEW MANAGEMENT
// ============================================

/**
 * Update the preview iframe with current code
 */
function updatePreview() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    
    // Combine all code into a complete HTML document
    const previewContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
                try {
                    ${js}
                } catch (error) {
                    console.error('JavaScript Error:', error);
                    document.body.innerHTML += '<div style="background: #fee; border: 2px solid #f00; padding: 1rem; margin: 1rem; border-radius: 8px; font-family: monospace;"><strong>Error:</strong> ' + error.message + '</div>';
                }
            </script>
        </body>
        </html>
    `;
    
    // Update iframe
    const iframeDoc = elements.preview.contentDocument || elements.preview.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(previewContent);
    iframeDoc.close();
    
    // Show loading animation
    elements.previewContent.classList.add('loading');
    setTimeout(() => {
        elements.previewContent.classList.remove('loading');
    }, 300);
    
    updatePreviewStatus('Updated');
}

/**
 * Debounced preview update for auto-update on typing
 */
function debouncedPreviewUpdate() {
    clearTimeout(state.debounceTimer);
    
    updatePreviewStatus('Updating...');
    
    state.debounceTimer = setTimeout(() => {
        updatePreview();
    }, 500); // 500ms debounce delay
}

/**
 * Update preview status indicator
 * @param {string} status - Status text to display
 */
function updatePreviewStatus(status) {
    const statusText = elements.previewStatus.querySelector('.status-text');
    statusText.textContent = status;
}

// ============================================
// PANEL COLLAPSE
// ============================================

/**
 * Toggle collapse state of an editor panel
 * @param {HTMLElement} panel - The panel element
 */
function togglePanelCollapse(panel) {
    const isCollapsed = panel.getAttribute('data-collapsed') === 'true';
    panel.setAttribute('data-collapsed', !isCollapsed);
    
    const header = panel.querySelector('.panel-header');
    header.setAttribute('aria-expanded', isCollapsed);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, duration = 3000) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Editor input events
    elements.htmlEditor.addEventListener('input', () => {
        updateLineNumbers(elements.htmlEditor, elements.htmlLineNumbers);
        debouncedPreviewUpdate();
    });
    
    elements.cssEditor.addEventListener('input', () => {
        updateLineNumbers(elements.cssEditor, elements.cssLineNumbers);
        debouncedPreviewUpdate();
    });
    
    elements.jsEditor.addEventListener('input', () => {
        updateLineNumbers(elements.jsEditor, elements.jsLineNumbers);
        debouncedPreviewUpdate();
    });
    
    // Scroll sync
    elements.htmlEditor.addEventListener('scroll', () => {
        syncScroll(elements.htmlEditor, elements.htmlLineNumbers);
    });
    
    elements.cssEditor.addEventListener('scroll', () => {
        syncScroll(elements.cssEditor, elements.cssLineNumbers);
    });
    
    elements.jsEditor.addEventListener('scroll', () => {
        syncScroll(elements.jsEditor, elements.jsLineNumbers);
    });
    
    // Tab key support in editors
    [elements.htmlEditor, elements.cssEditor, elements.jsEditor].forEach(editor => {
        editor.addEventListener('keydown', handleTabKey);
    });
    
    // Button clicks
    elements.runBtn.addEventListener('click', () => {
        updatePreview();
        showToast('Code executed!');
    });
    
    elements.saveBtn.addEventListener('click', saveCode);
    elements.resetBtn.addEventListener('click', resetCode);
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Panel collapse
    elements.editorPanels.forEach(panel => {
        const header = panel.querySelector('.panel-header');
        const collapseBtn = panel.querySelector('.collapse-btn');
        
        const toggleCollapse = () => togglePanelCollapse(panel);
        
        header.addEventListener('click', toggleCollapse);
        collapseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCollapse();
        });
        
        // Keyboard accessibility
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCollapse();
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Auto-save on window unload
    window.addEventListener('beforeunload', () => {
        saveCode();
    });
}

/**
 * Handle tab key in editors for proper indentation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        
        // Insert 2 spaces
        const spaces = '  ';
        editor.value = editor.value.substring(0, start) + spaces + editor.value.substring(end);
        
        // Move cursor
        editor.selectionStart = editor.selectionEnd = start + spaces.length;
        
        // Trigger input event to update line numbers
        editor.dispatchEvent(new Event('input'));
    }
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardShortcuts(e) {
    // Ctrl+Enter or Cmd+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        updatePreview();
        showToast('Code executed! (Ctrl+Enter)');
    }
    
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCode();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Download code as HTML file
 * (Bonus feature - can be triggered via console)
 */
function downloadCode() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePlayground Export</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codeplayground-export.html';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Code downloaded as HTML file!');
}

/**
 * Copy code to clipboard
 * (Bonus feature - can be triggered via console)
 */
async function copyCode() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    
    const code = `HTML:\n${html}\n\nCSS:\n${css}\n\nJavaScript:\n${js}`;
    
    try {
        await navigator.clipboard.writeText(code);
        showToast('Code copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy code');
    }
}

// ============================================
// EXPOSE UTILITY FUNCTIONS TO CONSOLE
// ============================================

// Make utility functions available in console for power users
window.codePlayground = {
    downloadCode,
    copyCode,
    saveCode,
    resetCode,
    updatePreview,
    toggleTheme,
    version: '1.0.0'
};

// ============================================
// START APPLICATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Log welcome message
console.log('%c🚀 CodePlayground v1.0.0', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cTry these commands:', 'font-size: 14px; color: #8b5cf6;');
console.log('  codePlayground.downloadCode() - Download code as HTML');
console.log('  codePlayground.copyCode() - Copy all code to clipboard');
console.log('  codePlayground.toggleTheme() - Toggle theme');
console.log('%cKeyboard Shortcuts:', 'font-size: 14px; color: #8b5cf6;');
console.log('  Ctrl+Enter - Run code');
console.log('  Ctrl+S - Save code');
console.log('  Tab - Insert 2 spaces');
