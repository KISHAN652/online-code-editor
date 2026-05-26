/**
 * ============================================
 * CODEPLAYGROUND - ULTIMATE ONLINE IDE
 * ============================================
 * A state-of-the-art offline-first developer playground.
 */

// ============================================
// SYSTEM STATE & CONFIGURATION
// ============================================

const state = {
    theme: 'dark',
    fontSize: 14,
    isAutoUpdate: true,
    debounceDelay: 500,
    linterEnabled: true,
    debounceTimer: null,
    historyTimer: null,
    activeLayout: 'vertical',
    activeEditor: 'html',
    consoleCount: 0,
    libraries: [], // URLs of active external libraries
    customLibraries: [] // Custom URLs loaded by user
};

// Ready-made UI Components Data Block
const uiComponents = {
    'glass-btn': {
        html: `<button class="glass-button">Hover Me ✨</button>`,
        css: `.glass-button {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  color: white;\n  padding: 14px 28px;\n  border-radius: 12px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n}\n\n.glass-button:hover {\n  background: rgba(255, 255, 255, 0.15);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);\n}`
    },
    'glow-input': {
        html: `<div class="input-wrapper">\n  <input type="text" class="glow-input" placeholder="Type something..." />\n</div>`,
        css: `.input-wrapper {\n  position: relative;\n  max-width: 300px;\n}\n\n.glow-input {\n  width: 100%;\n  padding: 12px 16px;\n  background: #0f172a;\n  border: 1px solid #1e293b;\n  border-radius: 8px;\n  color: white;\n  outline: none;\n  transition: all 0.3s;\n}\n\n.glow-input:focus {\n  border-color: #6366f1;\n  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);\n}`
    },
    'neon-card': {
        html: `<div class="neon-card">\n  <h3>Glow Card</h3>\n  <p>Move mouse over this card to witness deep colorful interactive shadows.</p>\n</div>`,
        css: `.neon-card {\n  background: #1e293b;\n  border-radius: 16px;\n  padding: 24px;\n  max-width: 320px;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  transition: all 0.3s;\n  cursor: pointer;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n\n.neon-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3), 0 0 15px rgba(139, 92, 246, 0.2);\n  border-color: rgba(99, 102, 241, 0.2);\n}\n\n.neon-card h3 {\n  color: #6366f1;\n  margin-bottom: 8px;\n}`
    },
    'smooth-toggle': {
        html: `<label class="switch">\n  <input type="checkbox">\n  <span class="toggle-slider"></span>\n</label>`,
        css: `.switch {\n  position: relative;\n  display: inline-block;\n  width: 50px;\n  height: 26px;\n}\n\n.switch input { \n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.toggle-slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background-color: #334155;\n  transition: .4s;\n  border-radius: 34px;\n}\n\n.toggle-slider:before {\n  position: absolute;\n  content: "";\n  height: 18px; width: 18px;\n  left: 4px; bottom: 4px;\n  background-color: white;\n  transition: .4s;\n  border-radius: 50%;\n}\n\ninput:checked + .toggle-slider {\n  background-color: #6366f1;\n}\n\ninput:checked + .toggle-slider:before {\n  transform: translateX(24px);\n}`
    },
    'skeleton-loader': {
        html: `<div class="skeleton-loader">\n  <div class="skeleton-avatar"></div>\n  <div class="skeleton-content">\n    <div class="skeleton-line title"></div>\n    <div class="skeleton-line subtitle"></div>\n  </div>\n</div>`,
        css: `.skeleton-loader {\n  display: flex;\n  gap: 12px;\n  padding: 16px;\n  background: #1e293b;\n  border-radius: 12px;\n  max-width: 300px;\n}\n\n.skeleton-avatar {\n  width: 48px; height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n.skeleton-line {\n  height: 12px;\n  background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: 4px;\n}\n\n.skeleton-line.title {\n  width: 140px; margin-bottom: 8px;\n}\n\n.skeleton-line.subtitle {\n  width: 90px;\n}\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}`
    }
};

// ============================================
// DOM ELEMENTS SELECTORS
// ============================================

const elements = {
    // Top-bar Controls
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarDrawer: document.getElementById('sidebarDrawer'),
    layoutVerticalBtn: document.getElementById('layoutVerticalBtn'),
    layoutHorizontalBtn: document.getElementById('layoutHorizontalBtn'),
    templatesBtn: document.getElementById('templatesBtn'),
    templatesDropdown: document.getElementById('templatesDropdown'),
    formatBtn: document.getElementById('formatBtn'),
    librariesBtn: document.getElementById('librariesBtn'),
    historyBtn: document.getElementById('historyBtn'),
    shareBtn: document.getElementById('shareBtn'),
    runBtn: document.getElementById('runBtn'),
    exportBtn: document.getElementById('exportBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    themeToggle: document.getElementById('themeToggle'),
    mainContent: document.getElementById('mainContent'),
    
    // Editors
    htmlEditor: document.getElementById('htmlEditor'),
    cssEditor: document.getElementById('cssEditor'),
    jsEditor: document.getElementById('jsEditor'),
    mdEditor: document.getElementById('mdEditor'),
    
    // Line numbers
    htmlLineNumbers: document.getElementById('htmlLineNumbers'),
    cssLineNumbers: document.getElementById('cssLineNumbers'),
    jsLineNumbers: document.getElementById('jsLineNumbers'),
    mdLineNumbers: document.getElementById('mdLineNumbers'),
    
    // Preview & Logs Drawer
    preview: document.getElementById('preview'),
    previewStatus: document.getElementById('previewStatus'),
    toggleConsoleDrawerBtn: document.getElementById('toggleConsoleDrawerBtn'),
    fullscreenPreviewBtn: document.getElementById('fullscreenPreviewBtn'),
    consoleDrawer: document.getElementById('consoleDrawer'),
    clearConsoleBtn: document.getElementById('clearConsoleBtn'),
    closeConsoleBtn: document.getElementById('closeConsoleBtn'),
    consoleLogs: document.getElementById('consoleLogs'),
    replInput: document.getElementById('replInput'),
    consoleCount: document.getElementById('consoleCount'),
    
    // Linter indicators
    htmlLintBadge: document.getElementById('htmlLintBadge'),
    cssLintBadge: document.getElementById('cssLintBadge'),

    // Modals
    settingsModal: document.getElementById('settingsModal'),
    librariesModal: document.getElementById('librariesModal'),
    historyModal: document.getElementById('historyModal'),
    
    // Modals internal items
    fontSizeSlider: document.getElementById('settingsFontSize'),
    fontSizeVal: document.getElementById('fontSizeVal'),
    autoUpdateCheckbox: document.getElementById('settingsAutoUpdate'),
    debounceSlider: document.getElementById('settingsDebounce'),
    debounceVal: document.getElementById('debounceVal'),
    linterCheckbox: document.getElementById('settingsLinter'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    
    applyLibrariesBtn: document.getElementById('applyLibrariesBtn'),
    customLibUrl: document.getElementById('lib-custom-url'),
    addCustomLibBtn: document.getElementById('addCustomLibBtn'),
    customLibsList: document.getElementById('customLibsList'),
    historyList: document.getElementById('historyList'),
    
    // CSS Sliders
    shadowX: document.getElementById('shadowX'),
    shadowY: document.getElementById('shadowY'),
    shadowBlur: document.getElementById('shadowBlur'),
    shadowSpread: document.getElementById('shadowSpread'),
    shadowColor: document.getElementById('shadowColor'),
    insertShadowBtn: document.getElementById('insertShadowBtn'),
    shadowBoxPreview: document.getElementById('shadowBoxPreview'),
    shadowXVal: document.getElementById('shadowXVal'),
    shadowYVal: document.getElementById('shadowYVal'),
    shadowBlurVal: document.getElementById('shadowBlurVal'),
    shadowSpreadVal: document.getElementById('shadowSpreadVal'),
    
    radiusAll: document.getElementById('radiusAll'),
    radiusVal: document.getElementById('radiusVal'),
    radiusBoxPreview: document.getElementById('radiusBoxPreview'),
    insertRadiusBtn: document.getElementById('insertRadiusBtn'),
    
    gradAngle: document.getElementById('gradAngle'),
    gradAngleVal: document.getElementById('gradAngleVal'),
    gradStartColor: document.getElementById('gradStartColor'),
    gradEndColor: document.getElementById('gradEndColor'),
    gradientPreview: document.getElementById('gradientPreview'),
    insertGradientBtn: document.getElementById('insertGradientBtn'),

    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.querySelector('.toast-message')
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize Playground IDE
 */
function init() {
    registerServiceWorker();
    loadSystemSettings();
    loadTheme();
    loadWorkspaceLayout();
    loadSavedCode();
    setupEventListeners();
    updateAllLineNumbers();
    updatePreview();
    
    // Initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Listen to iframe console captures
    window.addEventListener('message', handleIframeMessages);
    
    // Trigger automated backups every 5 minutes
    state.historyTimer = setInterval(createLocalBackup, 5 * 60 * 1000);
    
    console.log('%c🚀 CodePlayground Ultra-Premium IDE Initialized!', 'font-size: 16px; font-weight: bold; color: #6366f1;');
}

/**
 * Register Service Worker for offline PWA
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((reg) => console.log('[PWA] Service Worker registered successfully', reg.scope))
                .catch((err) => console.warn('[PWA] Service Worker registration failed', err));
        });
    }
}

// ============================================
// SYSTEM SETTINGS & THEMES
// ============================================

function loadSystemSettings() {
    const savedFontSize = localStorage.getItem('cp-settings-fontsize') || 14;
    const savedAutoRun = localStorage.getItem('cp-settings-autorun') !== 'false';
    const savedDebounce = localStorage.getItem('cp-settings-debounce') || 500;
    const savedLinter = localStorage.getItem('cp-settings-linter') !== 'false';
    const savedCustomLibs = localStorage.getItem('cp-custom-libs');

    state.fontSize = parseInt(savedFontSize);
    state.isAutoUpdate = savedAutoRun;
    state.debounceDelay = parseInt(savedDebounce);
    state.linterEnabled = savedLinter;
    
    if (savedCustomLibs) {
        state.customLibraries = JSON.parse(savedCustomLibs);
    }

    // Reflect variables onto UI inputs
    elements.fontSizeSlider.value = state.fontSize;
    elements.fontSizeVal.textContent = `${state.fontSize}px`;
    elements.autoUpdateCheckbox.checked = state.isAutoUpdate;
    elements.debounceSlider.value = state.debounceDelay;
    elements.debounceVal.textContent = `${state.debounceDelay}ms`;
    elements.linterCheckbox.checked = state.linterEnabled;

    applyEditorFontSize();
    renderCustomLibrariesList();
}

function saveSystemSettings() {
    state.fontSize = parseInt(elements.fontSizeSlider.value);
    state.isAutoUpdate = elements.autoUpdateCheckbox.checked;
    state.debounceDelay = parseInt(elements.debounceSlider.value);
    state.linterEnabled = elements.linterCheckbox.checked;

    localStorage.setItem('cp-settings-fontsize', state.fontSize);
    localStorage.setItem('cp-settings-autorun', state.isAutoUpdate);
    localStorage.setItem('cp-settings-debounce', state.debounceDelay);
    localStorage.setItem('cp-settings-linter', state.linterEnabled);

    applyEditorFontSize();
    hideModal('settings');
    showToast('IDE Settings updated successfully!');
    
    if (state.isAutoUpdate) {
        updatePreview();
    }
}

function applyEditorFontSize() {
    const editors = [elements.htmlEditor, elements.cssEditor, elements.jsEditor, elements.mdEditor];
    editors.forEach(editor => {
        editor.style.fontSize = `${state.fontSize}px`;
    });
    // Adjust line number font sizes as well
    const lineNumContainers = [elements.htmlLineNumbers, elements.cssLineNumbers, elements.jsLineNumbers, elements.mdLineNumbers];
    lineNumContainers.forEach(container => {
        container.style.fontSize = `${state.fontSize}px`;
    });
}

function loadTheme() {
    const savedTheme = localStorage.getItem('cp-theme') || 'dark';
    state.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('cp-theme', state.theme);
    showToast(`Switched to ${state.theme} theme`);
}

function loadWorkspaceLayout() {
    const savedLayout = localStorage.getItem('cp-layout') || 'vertical';
    state.activeLayout = savedLayout;
    elements.mainContent.className = `main-content layout-${savedLayout}`;
    
    if (savedLayout === 'vertical') {
        elements.layoutVerticalBtn.classList.add('active');
        elements.layoutHorizontalBtn.classList.remove('active');
    } else {
        elements.layoutHorizontalBtn.classList.add('active');
        elements.layoutVerticalBtn.classList.remove('active');
    }
}

function setWorkspaceLayout(layout) {
    state.activeLayout = layout;
    elements.mainContent.className = `main-content layout-${layout}`;
    localStorage.setItem('cp-layout', layout);
    
    if (layout === 'vertical') {
        elements.layoutVerticalBtn.classList.add('active');
        elements.layoutHorizontalBtn.classList.remove('active');
    } else {
        elements.layoutHorizontalBtn.classList.add('active');
        elements.layoutVerticalBtn.classList.remove('active');
    }
    showToast(`Workspace split set to ${layout}`);
}

// ============================================
// CODE SAVING & SHARING & ZIP
// ============================================

function loadSavedCode() {
    // Check if loading share link
    const urlParams = new URLSearchParams(window.location.search);
    const shareHash = urlParams.get('share');
    
    if (shareHash) {
        try {
            const decodedJSON = decodeURIComponent(escape(atob(shareHash)));
            const data = JSON.parse(decodedJSON);
            
            if (data.h !== undefined) elements.htmlEditor.value = data.h;
            if (data.c !== undefined) elements.cssEditor.value = data.c;
            if (data.j !== undefined) elements.jsEditor.value = data.j;
            if (data.m !== undefined) elements.mdEditor.value = data.m || '';
            
            // Clear URL param without reloading to keep address bar clean
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast('Shared workspace loaded successfully! ✨');
            return;
        } catch (e) {
            console.error('Failed to parse share code', e);
            showToast('Error loading shared workspace link.');
        }
    }
    
    // Otherwise load normal localStorage
    const savedHTML = localStorage.getItem('cp-html');
    const savedCSS = localStorage.getItem('cp-css');
    const savedJS = localStorage.getItem('cp-js');
    const savedMD = localStorage.getItem('cp-md');
    
    if (savedHTML !== null) elements.htmlEditor.value = savedHTML;
    if (savedCSS !== null) elements.cssEditor.value = savedCSS;
    if (savedJS !== null) elements.jsEditor.value = savedJS;
    if (savedMD !== null) elements.mdEditor.value = savedMD;
    
    if (savedHTML === null && savedCSS === null && savedJS === null) {
        loadTemplate('welcome');
    }
}

function saveCode(silent = false) {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    const md = elements.mdEditor.value;
    
    localStorage.setItem('cp-html', html);
    localStorage.setItem('cp-css', css);
    localStorage.setItem('cp-js', js);
    localStorage.setItem('cp-md', md);
    
    if (!silent) {
        showToast('Workspace saved successfully!');
    }
}

function createLocalBackup() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    const md = elements.mdEditor.value;
    
    if (!html && !css && !js && !md) return; // Do not backup completely empty workspaces
    
    let backups = [];
    const savedBackups = localStorage.getItem('cp-backups');
    if (savedBackups) {
        backups = JSON.parse(savedBackups);
    }
    
    // Check if code has changed since last backup to avoid duplicates
    if (backups.length > 0) {
        const last = backups[0];
        if (last.html === html && last.css === css && last.js === js && last.md === md) {
            return; // No changes, skip
        }
    }
    
    const newBackup = {
        timestamp: Date.now(),
        html,
        css,
        js,
        md
    };
    
    backups.unshift(newBackup);
    if (backups.length > 10) {
        backups.pop(); // Cap history to 10 snapshots
    }
    
    localStorage.setItem('cp-backups', JSON.stringify(backups));
    console.log('[System] Automatic local checkpoint created.');
}

function generateShareLink() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    const md = elements.mdEditor.value;
    
    const payload = {
        h: html,
        c: css,
        j: js,
        m: md
    };
    
    try {
        const jsonStr = JSON.stringify(payload);
        const encodedHash = btoa(unescape(encodeURIComponent(jsonStr)));
        const shareURL = `${window.location.origin}${window.location.pathname}?share=${encodedHash}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareURL).then(() => {
            showToast('Share link created & copied to clipboard! 🔗');
        }).catch(err => {
            console.error('Clipboard error', err);
            // Display URL directly in a prompt for fallback
            prompt('Copy this shareable URL:', shareURL);
        });
    } catch (e) {
        console.error('Failed to generate sharing URL', e);
        showToast('Failed to generate sharing link.');
    }
}

/**
 * Advanced Zip project compilation and download
 */
function exportZIP() {
    if (typeof JSZip === 'undefined') {
        showToast('Export library is currently loading. Please try again.');
        return;
    }
    
    const zip = new JSZip();
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    const md = elements.mdEditor.value;
    
    // Inject active libraries inside HTML output so it matches the playground preview completely
    let injectedLibs = '';
    
    // Tailwind checkbox or active dynamic injects
    const isTailwind = document.getElementById('lib-tailwind').checked;
    if (isTailwind) injectedLibs += `    <script src="https://cdn.tailwindcss.com"></script>\n`;
    
    state.libraries.forEach(url => {
        if (url.endsWith('.css')) {
            injectedLibs += `    <link rel="stylesheet" href="${url}">\n`;
        } else {
            injectedLibs += `    <script src="${url}"></script>\n`;
        }
    });

    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePlayground App Export</title>
${injectedLibs}    <link rel="stylesheet" href="style.css">
</head>
<body>
${html}
    <script src="script.js"></script>
</body>
</html>`;

    zip.file('index.html', indexHTML);
    zip.file('style.css', css);
    zip.file('script.js', js);
    if (md) {
        zip.file('README.md', md);
    }
    
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'codeplayground-project.zip');
        showToast('Project ZIP exported successfully! 📦');
    }).catch(err => {
        console.error('Zip generation failed', err);
        showToast('Failed to export project ZIP.');
    });
}

// ============================================
// TEMPLATES SELECTIONS
// ============================================

function loadTemplate(name) {
    // Templates Database
    const templates = {
        welcome: {
            html: `<div class="container">\n  <h1>Welcome to CodePlayground! 🚀</h1>\n  <p>Start coding and see live results instantly!</p>\n  <button id="demoBtn">Interact With Me</button>\n</div>`,
            css: `body {\n  margin: 0;\n  padding: 20px;\n  font-family: 'Inter', sans-serif;\n  background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.container {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px);\n  padding: 3rem;\n  border-radius: 24px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);\n  text-align: center;\n  max-width: 500px;\n  color: white;\n}\n\nh1 {\n  background: linear-gradient(135deg, #818cf8, #c084fc);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  margin-bottom: 1.5rem;\n  font-size: 2.2rem;\n}\n\np {\n  color: #cbd5e1;\n  margin-bottom: 2.5rem;\n  font-size: 1.1rem;\n}\n\nbutton {\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n  color: white;\n  border: none;\n  padding: 14px 36px;\n  border-radius: 30px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);\n}\n\nbutton:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);\n}`,
            js: `// Interactive Welcome Logic\nconst btn = document.getElementById('demoBtn');\n\nbtn.addEventListener('click', () => {\n  console.log('Button clicked! Triggering effects...');\n  btn.textContent = 'Awesome! ✨';\n  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';\n  showFloatingConfetti();\n});\n\nfunction showFloatingConfetti() {\n  console.log('🎉 Confetti dispatched!');\n  alert('Playground active! Enjoy offline IDE features.');\n}`,
            md: `# CodePlayground Project\n\nWelcome to your new playground workspace! This initial template contains structural layouts, visual sliders, and a sample button interactivity script.\n\n### Hotkeys Cheat Sheet\n- **Ctrl+Enter**: Compile & refresh preview\n- **Ctrl+S**: Lock changes inside localStorage\n- **Ctrl+\`**: Toggle Console logs list drawer`
        },
        'glass-card': {
            html: `<div class="card-box">\n  <div class="user-avatar">👤</div>\n  <h2>Alice Jenkins</h2>\n  <p class="role">Creative UX Designer</p>\n  <p class="bio">Building clean, premium, glassmorphic interfaces that wow users globally.</p>\n  <div class="stats-row">\n    <div class="stat"><span class="num">48</span><span>Designs</span></div>\n    <div class="stat"><span class="num">12k</span><span>Fans</span></div>\n  </div>\n</div>`,
            css: `body {\n  margin: 0;\n  background: radial-gradient(circle at center, #1e293b, #0f172a);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: 'Inter', sans-serif;\n}\n\n.card-box {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border-radius: 24px;\n  padding: 36px;\n  width: 320px;\n  text-align: center;\n  color: white;\n  box-shadow: 0 20px 50px rgba(0,0,0,0.3);\n  transition: 0.4s;\n}\n\n.card-box:hover {\n  transform: translateY(-8px);\n  border-color: rgba(99, 102, 241, 0.3);\n  box-shadow: 0 30px 60px rgba(99, 102, 241, 0.15);\n}\n\n.user-avatar {\n  font-size: 3rem;\n  background: rgba(255, 255, 255, 0.05);\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  line-height: 80px;\n  margin: 0 auto 16px;\n}\n\nh2 {\n  margin: 0 0 6px;\n  font-size: 1.4rem;\n}\n\n.role {\n  color: #818cf8;\n  font-size: 0.85rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 16px;\n}\n\n.bio {\n  color: #94a3b8;\n  font-size: 0.88rem;\n  line-height: 1.4;\n  margin-bottom: 24px;\n}\n\n.stats-row {\n  display: flex;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n  padding-top: 20px;\n}\n\n.stat {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.72rem;\n  color: #64748b;\n}\n\n.num {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: white;\n}`,
            js: `// Glass Card Events\nconsole.log('Glass Profile Card loaded! Hover the card to trigger ambient lighting blurs.');`,
            md: `# Glassmorphic Profile Card\n\nShowcasing deep CSS blurs, translucent background layers, neon borders, and dynamic scaling transitions. Workstation optimized.`
        },
        'neumorphic-calc': {
            html: `<div class="calc-shell">\n  <div class="screen" id="screen">0</div>\n  <div class="keys-grid">\n    <button class="key op" onclick="clearCalc()">C</button>\n    <button class="key op" onclick="press('/')">/</button>\n    <button class="key op" onclick="press('*')">*</button>\n    <button class="key op" onclick="press('-')">-</button>\n    \n    <button class="key" onclick="press('7')">7</button>\n    <button class="key" onclick="press('8')">8</button>\n    <button class="key" onclick="press('9')">9</button>\n    <button class="key op" onclick="press('+')">+</button>\n    \n    <button class="key" onclick="press('4')">4</button>\n    <button class="key" onclick="press('5')">5</button>\n    <button class="key" onclick="press('6')">6</button>\n    <button class="key double equals" onclick="evaluateCalc()">=</button>\n    \n    <button class="key" onclick="press('1')">1</button>\n    <button class="key" onclick="press('2')">2</button>\n    <button class="key" onclick="press('3')">3</button>\n    <button class="key" onclick="press('0')">0</button>\n  </div>\n</div>`,
            css: `body {\n  margin: 0;\n  background: #0f172a;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: 'Inter', sans-serif;\n}\n\n.calc-shell {\n  background: #0f172a;\n  border: 1px solid #1e293b;\n  border-radius: 28px;\n  padding: 24px;\n  box-shadow: 8px 8px 16px #05070d, -8px -8px 16px #192747;\n  width: 280px;\n}\n\n.screen {\n  height: 60px;\n  background: #090d16;\n  border-radius: 16px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 16px;\n  color: #10b981;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 1.6rem;\n  font-weight: 600;\n  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.8);\n  overflow: hidden;\n}\n\n.keys-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n\n.key {\n  height: 48px;\n  background: #0f172a;\n  border: 1px solid #1e293b;\n  border-radius: 12px;\n  color: #cbd5e1;\n  font-size: 1.1rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 3px 3px 6px #05070d, -3px -3px 6px #192747;\n  transition: all 0.15s;\n}\n\n.key:active {\n  box-shadow: inset 2px 2px 5px #05070d, inset -2px -2px 5px #192747;\n  transform: scale(0.98);\n}\n\n.key.op {\n  color: #8b5cf6;\n}\n\n.key.equals {\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n  color: white;\n  border: none;\n  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);\n}\n\n.double {\n  grid-row: span 2;\n  height: 108px;\n}`,
            js: `// Calculator Logical Controls\nconst screen = document.getElementById('screen');\nlet expression = '';\n\nwindow.press = function(val) {\n  console.log('Button pressed:', val);\n  if (expression === '0') expression = '';\n  expression += val;\n  screen.textContent = expression;\n};\n\nwindow.clearCalc = function() {\n  console.log('Screen reset');\n  expression = '0';\n  screen.textContent = expression;\n};\n\nwindow.evaluateCalc = function() {\n  try {\n    console.log('Evaluating expression:', expression);\n    const result = eval(expression);\n    expression = String(result);\n    screen.textContent = expression;\n    console.log('Result successfully computed:', result);\n  } catch(err) {\n    console.error('Invalid calculations structure:', err.message);\n    screen.textContent = 'ERR';\n    expression = '';\n  }\n};`,
            md: `# Neumorphic Calculator Playground\n\nImplementing high fidelity Neumorphism UI shadows on calculators panel buttons.`
        },
        'particle-canvas': {
            html: `<canvas id="canvas"></canvas>\n<div class="hud">\n  <h3>HTML5 Particle Accelerator</h3>\n  <p>Move your cursor inside the preview viewport window</p>\n</div>`,
            css: `body {\n  margin: 0;\n  background: #050508;\n  overflow: hidden;\n  font-family: 'Inter', sans-serif;\n}\n\n#canvas {\n  position: absolute;\n  top: 0; left: 0;\n  width: 100vw; height: 100vh;\n}\n\n.hud {\n  position: absolute;\n  bottom: 24px;\n  left: 24px;\n  color: white;\n  pointer-events: none;\n  background: rgba(0,0,0,0.6);\n  backdrop-filter: blur(8px);\n  padding: 16px 20px;\n  border-radius: 12px;\n  border: 1px solid rgba(255,255,255,0.05);\n}\n\n.hud h3 {\n  margin: 0 0 4px;\n  color: #6366f1;\n  font-size: 1rem;\n}\n\n.hud p {\n  margin: 0;\n  color: #94a3b8;\n  font-size: 0.78rem;\n}`,
            js: `// Interactive canvas setup\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\nlet width = canvas.width = window.innerWidth;\nlet height = canvas.height = window.innerHeight;\n\nconst particles = [];\nconst maxParticles = 60;\nconst mouse = { x: null, y: null };\n\nwindow.addEventListener('mousemove', (e) => {\n  mouse.x = e.clientX;\n  mouse.y = e.clientY;\n});\n\nclass Particle {\n  constructor() {\n    this.x = Math.random() * width;\n    this.y = Math.random() * height;\n    this.vx = (Math.random() - 0.5) * 1.5;\n    this.vy = (Math.random() - 0.5) * 1.5;\n    this.radius = Math.random() * 3 + 1;\n    this.color = 'hsla(' + (Math.random() * 60 + 240) + ', 70%, 60%, 0.8)';\n  }\n  \n  update() {\n    this.x += this.vx;\n    this.y += this.vy;\n    if (this.x < 0 || this.x > width) this.vx *= -1;\n    if (this.y < 0 || this.y > height) this.vy *= -1;\n    \n    // Mouse attraction\n    if (mouse.x && mouse.y) {\n      const dx = mouse.x - this.x;\n      const dy = mouse.y - this.y;\n      const dist = Math.sqrt(dx*dx + dy*dy);\n      if (dist < 100) {\n        this.x += dx * 0.02;\n        this.y += dy * 0.02;\n      }\n    }\n  }\n  \n  draw() {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n  }\n}\n\nfor (let i = 0; i < maxParticles; i++) {\n  particles.push(new Particle());\n}\n\nfunction animate() {\n  ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';\n  ctx.fillRect(0, 0, width, height);\n  \n  particles.forEach(p => {\n    p.update();\n    p.draw();\n  });\n  \n  requestAnimationFrame(animate);\n}\n\nanimate();\nconsole.log('⚡ Particle Engine animation loop started successfully.');`,
            md: `# HTML5 Canvas Particle Engine\n\nVisual particle engine supporting cursor attraction vectors.`
        },
        'gsap-hero': {
            html: `<div class="hero-page">\n  <nav>\n    <div class="logo-item">Nexus</div>\n  </nav>\n  \n  <div class="hero-content">\n    <h1 class="title">Next-Gen Interface</h1>\n    <p class="subtitle">Witness modern visual storytelling animated using GSAP timelines directly inside CodePlayground IDE.</p>\n    <button class="cta-btn">Unlock Now</button>\n  </div>\n</div>`,
            css: `body {\n  margin: 0;\n  padding: 0;\n  background: #03001e;\n  font-family: 'Inter', sans-serif;\n  color: white;\n  overflow-x: hidden;\n}\n\n.hero-page {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n}\n\nnav {\n  position: absolute;\n  top: 0; left: 0; width: 100%;\n  padding: 24px 48px;\n  box-sizing: border-box;\n}\n\n.logo-item {\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  color: #00f0ff;\n}\n\n.hero-content {\n  max-width: 600px;\n  margin-left: 10%;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.title {\n  font-size: 3.5rem;\n  line-height: 1.1;\n  font-weight: 800;\n  background: linear-gradient(135deg, #00f0ff, #7a00ff);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  margin: 0;\n}\n\n.subtitle {\n  color: #cbd5e1;\n  font-size: 1.1rem;\n  line-height: 1.5;\n  margin: 0 0 20px;\n}\n\n.cta-btn {\n  align-self: flex-start;\n  background: linear-gradient(135deg, #00f0ff, #7a00ff);\n  border: none;\n  color: white;\n  padding: 16px 40px;\n  border-radius: 30px;\n  font-weight: 600;\n  font-size: 1rem;\n  cursor: pointer;\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);\n  transition: transform 0.2s;\n}\n\n.cta-btn:hover {\n  transform: scale(1.05);\n}`,
            js: `// Ensure GSAP library checkbox is activated under Libraries\n// Code will automatically play on load\n\nif (typeof gsap !== 'undefined') {\n  console.log('🚀 GSAP loaded successfully! Building timeline.');\n  \n  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });\n  \n  tl.from('.logo-item', { y: -50, opacity: 0, delay: 0.2 })\n    .from('.title', { x: -100, opacity: 0 }, '-=0.5')\n    .from('.subtitle', { y: 30, opacity: 0 }, '-=0.6')\n    .from('.cta-btn', { scale: 0.5, opacity: 0 }, '-=0.6');\n    \n  document.querySelector('.cta-btn').addEventListener('click', () => {\n    gsap.to('.hero-content', { rotateY: 360, duration: 1.2 });\n  });\n} else {\n  console.warn('⚠️ GSAP is not loaded. Open LIBRARIES panel and enable GSAP dynamic injection to trigger animations!');\n}`,
            md: `# GSAP Hero Landing Page\n\nDynamic hero section animations utilizing high performance GreenSock timelines.`
        }
    };
    
    const selected = templates[name];
    if (selected) {
        elements.htmlEditor.value = selected.html;
        elements.cssEditor.value = selected.css;
        elements.jsEditor.value = selected.js;
        elements.mdEditor.value = selected.md;
        
        // Auto-enable GSAP library checkbox if loading GSAP template
        if (name === 'gsap-hero') {
            document.getElementById('lib-gsap').checked = true;
            applyDynamicLibraries();
        } else {
            // Uncheck standard libraries for others
            document.getElementById('lib-gsap').checked = false;
            applyDynamicLibraries();
        }

        updateAllLineNumbers();
        updatePreview();
        saveCode(true);
        showToast(`Loaded ${name} template! 🎨`);
    }
}

// ============================================
// LINTER UTILS
// ============================================

/**
 * Lightweight real-time HTML/CSS linter warnings
 */
function runCodeLinter() {
    if (!state.linterEnabled) {
        elements.htmlLintBadge.classList.remove('show');
        elements.cssLintBadge.classList.remove('show');
        return;
    }
    
    // HTML Lint Warnings check
    const htmlCode = elements.htmlEditor.value;
    let htmlWarnings = [];
    
    // Check unclosed divs/span tags simple count
    const openDivs = (htmlCode.match(/<div/gi) || []).length;
    const closeDivs = (htmlCode.match(/<\/div>/gi) || []).length;
    if (openDivs !== closeDivs) {
        htmlWarnings.push(`Unmatched <div> count: opened ${openDivs}, closed ${closeDivs}`);
    }
    
    // Check <img> tags missing alt text
    if (/<img(?![^>]*\balt=)[^>]*>/i.test(htmlCode)) {
        htmlWarnings.push('Warning: <img> tag found missing an "alt" attribute');
    }
    
    if (htmlWarnings.length > 0) {
        elements.htmlLintBadge.classList.add('show');
        elements.htmlLintBadge.title = htmlWarnings.join('\n');
    } else {
        elements.htmlLintBadge.classList.remove('show');
    }

    // CSS Lint Warnings check
    const cssCode = elements.cssEditor.value;
    let cssWarnings = [];
    
    // Simple bracket count matching
    const openCurly = (cssCode.match(/{/g) || []).length;
    const closeCurly = (cssCode.match(/}/g) || []).length;
    if (openCurly !== closeCurly) {
        cssWarnings.push(`Curly Brackets mismatch: { has ${openCurly}, } has ${closeCurly}`);
    }

    // Checking missing semicolons inside blocks (very simple heuristic)
    // Find declarations that end with text/letters but have no semicolon inside a rule block
    const rules = cssCode.split('}');
    rules.forEach((rule) => {
        if (!rule.includes('{')) return;
        const body = rule.split('{')[1];
        if (!body) return;
        const declarations = body.split('\n');
        declarations.forEach(decl => {
            const trimmed = decl.trim();
            if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('}') && trimmed.includes(':')) {
                cssWarnings.push(`Warning: declaration "${trimmed}" might be missing a semicolon`);
            }
        });
    });

    if (cssWarnings.length > 0) {
        elements.cssLintBadge.classList.add('show');
        elements.cssLintBadge.title = cssWarnings.join('\n');
    } else {
        elements.cssLintBadge.classList.remove('show');
    }
}

// ============================================
// CONSOLE LOGS & JS REPL INJECTORS
// ============================================

/**
 * Capture logs from iframe console dynamically
 */
function handleIframeMessages(event) {
    if (event.data && event.data.type === 'console') {
        const { method, args } = event.data;
        appendConsoleLog(method, args);
    }
}

function appendConsoleLog(method, args) {
    state.consoleCount++;
    elements.consoleCount.textContent = state.consoleCount;
    
    const logRow = document.createElement('div');
    logRow.className = `log-item log-${method}`;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    const now = new Date();
    timeSpan.textContent = now.toTimeString().split(' ')[0];
    logRow.appendChild(timeSpan);
    
    const contentSpan = document.createElement('span');
    contentSpan.className = 'log-content';
    
    // Object parsing formatting
    const formattedArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
            try {
                return JSON.stringify(arg, null, 2);
            } catch (e) {
                return '[Complex Object]';
            }
        }
        return String(arg);
    });
    
    contentSpan.textContent = formattedArgs.join(' ');
    logRow.appendChild(contentSpan);
    
    elements.consoleLogs.appendChild(logRow);
    elements.consoleLogs.scrollTop = elements.consoleLogs.scrollHeight;
}

function clearConsoleLogs() {
    elements.consoleLogs.innerHTML = '';
    state.consoleCount = 0;
    elements.consoleCount.textContent = 0;
    showToast('Console logs cleared!');
}

/**
 * JS REPL execution via prompt postMessage
 */
function executeREPLCommand() {
    const command = elements.replInput.value.trim();
    if (!command) return;
    
    appendConsoleLog('result', [`> ${command}`]);
    
    try {
        // Send directly to sandbox iframe window eval
        elements.preview.contentWindow.postMessage({ type: 'eval', code: command }, '*');
    } catch (e) {
        appendConsoleLog('error', [e.message]);
    }
    
    elements.replInput.value = '';
}

// ============================================
// PREVIEW SHELL COMPILATION
// ============================================

function updatePreview() {
    const html = elements.htmlEditor.value;
    const css = elements.cssEditor.value;
    const js = elements.jsEditor.value;
    const md = elements.mdEditor.value;
    
    // Show updating indicator dot
    const statusDot = elements.previewStatus.querySelector('.status-dot');
    statusDot.className = 'status-dot updating';
    
    // Gather dynamic library tags
    let libraryScriptTags = '';
    
    // Tailwind checkbox injection
    const isTailwind = document.getElementById('lib-tailwind').checked;
    if (isTailwind) {
        libraryScriptTags += `<script src="https://cdn.tailwindcss.com"></script>\n`;
    }
    
    state.libraries.forEach(url => {
        if (url.endsWith('.css')) {
            libraryScriptTags += `<link rel="stylesheet" href="${url}">\n`;
        } else {
            libraryScriptTags += `<script src="${url}"></script>\n`;
        }
    });

    // Capture logs interceptor script injected in iframe
    const consoleInterceptorScript = `
        <script>
            // Intercept console functions
            const originalConsole = {
                log: console.log,
                warn: console.warn,
                error: console.error,
                info: console.info
            };

            function sendConsoleLog(method, args) {
                // Parse arguments to be safe for postMessage serialization
                const safeArgs = Array.from(args).map(arg => {
                    if (arg instanceof Error) return arg.message;
                    return arg;
                });
                window.parent.postMessage({
                    type: 'console',
                    method: method,
                    args: safeArgs
                }, '*');
            }

            console.log = function() {
                originalConsole.log.apply(console, arguments);
                sendConsoleLog('log', arguments);
            };
            console.warn = function() {
                originalConsole.warn.apply(console, arguments);
                sendConsoleLog('warn', arguments);
            };
            console.error = function() {
                originalConsole.error.apply(console, arguments);
                sendConsoleLog('error', arguments);
            };
            console.info = function() {
                originalConsole.info.apply(console, arguments);
                sendConsoleLog('info', arguments);
            };

            // Window errors catching
            window.onerror = function(message, source, lineno, colno, error) {
                sendConsoleLog('error', [message + ' (Line ' + lineno + ')']);
                return false;
            };

            // Listen to REPL eval executions from parent
            window.addEventListener('message', (e) => {
                if (e.data && e.data.type === 'eval') {
                    try {
                        const res = window.eval(e.data.code);
                        if (res !== undefined) {
                            sendConsoleLog('result', [res]);
                        }
                    } catch(err) {
                        sendConsoleLog('error', [err.message]);
                    }
                }
            });

            // Mock Data context inside preview frame
            window.playground = {
                mockData: {
                    getUsers: function(n = 5) {
                        const names = ['Kishan', 'Bhavin', 'Amit', 'Priya', 'Neha', 'Raj', 'Komal'];
                        const roles = ['Developer', 'UX Designer', 'Product Manager', 'Data Analyst'];
                        return Array.from({ length: n }, (_, i) => ({
                            id: i + 1,
                            name: names[i % names.length],
                            role: roles[i % roles.length],
                            email: names[i % names.length].toLowerCase() + '@example.com',
                            active: i % 2 === 0
                        }));
                    },
                    getProducts: function(n = 5) {
                        const items = ['Neon Laptop Pro', 'Mechanical Glow Keyboard', 'Glass Screen Phone', 'Ergonomic Desk chair', 'Wireless Gaming Mouse'];
                        return Array.from({ length: n }, (_, i) => ({
                            id: i + 1,
                            title: items[i % items.length],
                            price: Math.floor(Math.random() * 500) + 99,
                            stock: Math.floor(Math.random() * 80) + 10
                        }));
                    },
                    getRandomImage: function(category = 'tech') {
                        const urls = [
                            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
                            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
                            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400'
                        ];
                        return urls[Math.floor(Math.random() * urls.length)];
                    }
                }
            };
        </script>
    `;

    // Package standard Markdown parsing preview logic if markdown has contents
    let markdownCompiledPreview = '';
    if (md.trim()) {
        markdownCompiledPreview = `
            <div style="background: rgba(99, 102, 241, 0.05); border-top: 2px dashed #6366f1; padding: 20px; margin-top: 40px; font-family: sans-serif; border-radius: 8px;">
                <h4 style="color: #6366f1; margin: 0 0 10px 0; font-size: 0.9rem; text-transform: uppercase;">Workspace Notes (README)</h4>
                <div style="color: #334155; line-height: 1.5; font-size: 0.9rem;">
                    ${parseMarkdownLightweight(md)}
                </div>
            </div>
        `;
    }

    const previewContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
${libraryScriptTags}${consoleInterceptorScript}        </head>
        <body>
            ${html}
            ${markdownCompiledPreview}
            <script>
                try {
                    ${js}
                } catch (error) {
                    console.error('JS Compiling Error:', error);
                }
            </script>
        </body>
        </html>
    `;

    // Dynamic write compilation onto sandbox preview frame
    const iframeDoc = elements.preview.contentDocument || elements.preview.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(previewContent);
    iframeDoc.close();

    // Trigger code linter checking
    runCodeLinter();
    
    setTimeout(() => {
        statusDot.className = 'status-dot';
        const statusText = elements.previewStatus.querySelector('.status-text');
        statusText.textContent = 'Updated';
    }, 300);
}

/**
 * Lightweight client side markdown parsing representation
 */
function parseMarkdownLightweight(mdText) {
    let html = mdText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Headings
    html = html.replace(/^# (.*$)/gim, '<h1 style="color: #0f172a; margin-top:0;">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="color: #1e293b;">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 style="color: #334155;">$1</h3>');
    
    // Bold / Italic
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Bullet lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.wrapLists = html.replace(/<\/li>\n<li>/gim, '</li><li>');
    
    // Code blocks
    html = html.replace(/\`([^`]+)\`/gim, '<code style="background:#e2e8f0; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:0.8rem;">$1</code>');
    
    // Paragraph newline linebreaks
    html = html.replace(/\n$/gim, '<br />');
    
    return html;
}

function debouncedPreviewUpdate() {
    clearTimeout(state.debounceTimer);
    
    const statusText = elements.previewStatus.querySelector('.status-text');
    statusText.textContent = 'Updating...';
    
    state.debounceTimer = setTimeout(() => {
        updatePreview();
    }, state.debounceDelay);
}

// ============================================
// LINE NUMBERS GENERATORS
// ============================================

function updateLineNumbers(editor, lineNumbersEl) {
    const lines = editor.value.split('\n').length;
    const lineNumbersHTML = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    lineNumbersEl.textContent = lineNumbersHTML;
}

function updateAllLineNumbers() {
    updateLineNumbers(elements.htmlEditor, elements.htmlLineNumbers);
    updateLineNumbers(elements.cssEditor, elements.cssLineNumbers);
    updateLineNumbers(elements.jsEditor, elements.jsLineNumbers);
    updateLineNumbers(elements.mdEditor, elements.mdLineNumbers);
}

function syncScroll(editor, lineNumbersEl) {
    lineNumbersEl.scrollTop = editor.scrollTop;
}

// ============================================
// EDITORS CODE FORMATTING (PRETTIER)
// ============================================

/**
 * Integrates prettier formatting on the active editor panel
 */
function formatCode() {
    // Determine active textarea based on focused editor state
    let targetEditor = null;
    let parser = '';
    let plugins = [];
    
    if (document.activeElement === elements.htmlEditor || state.activeEditor === 'html') {
        targetEditor = elements.htmlEditor;
        parser = 'html';
        plugins = [window.prettierPlugins.html];
    } else if (document.activeElement === elements.cssEditor || state.activeEditor === 'css') {
        targetEditor = elements.cssEditor;
        parser = 'css';
        plugins = [window.prettierPlugins.postcss];
    } else if (document.activeElement === elements.jsEditor || state.activeEditor === 'js') {
        targetEditor = elements.jsEditor;
        parser = 'babel';
        plugins = [window.prettierPlugins.babel];
    } else if (document.activeElement === elements.mdEditor || state.activeEditor === 'md') {
        targetEditor = elements.mdEditor;
        parser = 'markdown';
        plugins = [window.prettierPlugins.markdown];
    }
    
    if (!targetEditor || !targetEditor.value.trim()) {
        showToast('Write some code in the active editor first to format!');
        return;
    }
    
    try {
        const formatted = window.prettier.format(targetEditor.value, {
            parser: parser,
            plugins: plugins,
            tabWidth: 2,
            singleQuote: true
        });
        
        targetEditor.value = formatted;
        
        // Update lines and preview
        updateAllLineNumbers();
        updatePreview();
        showToast(`Code formatted successfully! ✨`);
    } catch(err) {
        console.error('Prettier parsing failed', err);
        showToast('Formatting warning: check your code syntax structure.');
    }
}

// ============================================
// SMART TEXTAREA INPUT LISTENERS
// ============================================

/**
 * Handle bracket auto-closures
 */
function handleSmartAutoclose(e, editor) {
    const bracketPairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '"': '"',
        "'": "'",
        '<': '>'
    };
    
    const key = e.key;
    if (bracketPairs[key] !== undefined) {
        e.preventDefault();
        
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;
        
        const closure = bracketPairs[key];
        
        // Split and insert
        editor.value = value.substring(0, start) + key + closure + value.substring(end);
        
        // Position caret directly in the middle
        editor.selectionStart = editor.selectionEnd = start + 1;
        
        // Trigger input update
        editor.dispatchEvent(new Event('input'));
    }
}

// ============================================
// LIBRARIES MANAGER DIALOG
// ============================================

function showLibrariesModal() {
    showModal('libraries');
}

function applyDynamicLibraries() {
    state.libraries = [];
    
    // Check checklist items
    const checkboxes = document.querySelectorAll('.library-grid input[type="checkbox"]');
    checkboxes.forEach(chk => {
        // Tailwind is compiled inside updatePreview directly using its cdnjs script, so ignore standard injection loop
        if (chk.id === 'lib-tailwind') return;
        if (chk.checked) {
            state.libraries.push(chk.getAttribute('data-url'));
        }
    });

    // Merge dynamic custom libraries
    state.customLibraries.forEach(url => {
        state.libraries.push(url);
    });

    hideModal('libraries');
    updatePreview();
    showToast('Applied external libraries! Refreshing live shell.');
}

function addCustomLibrary() {
    const url = elements.customLibUrl.value.trim();
    if (!url) return;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showToast('Error: Dynamic URL resource must start with http:// or https://');
        return;
    }

    state.customLibraries.push(url);
    localStorage.setItem('cp-custom-libs', JSON.stringify(state.customLibraries));
    
    elements.customLibUrl.value = '';
    renderCustomLibrariesList();
    showToast('Custom script URL added!');
}

function removeCustomLibrary(index) {
    state.customLibraries.splice(index, 1);
    localStorage.setItem('cp-custom-libs', JSON.stringify(state.customLibraries));
    renderCustomLibrariesList();
}

function renderCustomLibrariesList() {
    elements.customLibsList.innerHTML = '';
    state.customLibraries.forEach((url, i) => {
        const item = document.createElement('div');
        item.className = 'custom-lib-pill';
        
        const span = document.createElement('span');
        span.textContent = url.split('/').pop() || url;
        span.title = url;
        item.appendChild(span);
        
        const delBtn = document.createElement('button');
        delBtn.className = 'custom-lib-remove';
        delBtn.textContent = 'Remove';
        delBtn.onclick = () => removeCustomLibrary(i);
        
        item.appendChild(delBtn);
        elements.customLibsList.appendChild(item);
    });
}

// ============================================
// MODALS UTILITY DRAWERS
// ============================================

function showModal(id) {
    const modal = document.getElementById(`${id}Modal`);
    if (modal) {
        modal.classList.add('show');
        
        // Extra updates if history
        if (id === 'history') {
            renderVersionHistory();
        }
    }
}

function hideModal(id) {
    const modal = document.getElementById(`${id}Modal`);
    if (modal) {
        modal.classList.remove('show');
    }
}

function renderVersionHistory() {
    elements.historyList.innerHTML = '';
    const savedBackups = localStorage.getItem('cp-backups');
    
    if (!savedBackups) {
        elements.historyList.innerHTML = '<div class="history-empty">No versions cached yet. Checkpoints are autosaved every 5 minutes during edits.</div>';
        return;
    }
    
    const backups = JSON.parse(savedBackups);
    if (backups.length === 0) {
        elements.historyList.innerHTML = '<div class="history-empty">No versions cached yet. Checkpoints are autosaved every 5 minutes during edits.</div>';
        return;
    }

    backups.forEach((b, i) => {
        const row = document.createElement('div');
        row.className = 'history-item';
        
        const info = document.createElement('div');
        info.className = 'history-info';
        
        const date = new Date(b.timestamp);
        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-date';
        dateSpan.textContent = date.toLocaleString();
        info.appendChild(dateSpan);
        
        const detailSpan = document.createElement('span');
        detailSpan.className = 'history-details';
        // Compute characters size
        const charSum = (b.html || '').length + (b.css || '').length + (b.js || '').length + (b.md || '').length;
        detailSpan.textContent = `Total size: ${charSum} characters of code`;
        info.appendChild(detailSpan);
        
        row.appendChild(info);
        
        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'btn-restore-history';
        restoreBtn.textContent = 'Restore';
        restoreBtn.onclick = () => restoreHistoryCheckpoint(i);
        
        row.appendChild(restoreBtn);
        elements.historyList.appendChild(row);
    });
}

function restoreHistoryCheckpoint(index) {
    const savedBackups = localStorage.getItem('cp-backups');
    if (!savedBackups) return;
    
    const backups = JSON.parse(savedBackups);
    const target = backups[index];
    
    if (target) {
        if (confirm('Are you sure you want to restore this version? Your current code will be overwritten.')) {
            elements.htmlEditor.value = target.html || '';
            elements.cssEditor.value = target.css || '';
            elements.jsEditor.value = target.js || '';
            elements.mdEditor.value = target.md || '';
            
            updateAllLineNumbers();
            updatePreview();
            saveCode(true);
            
            hideModal('history');
            showToast('Code version restored successfully!');
        }
    }
}

// ============================================
// VISUAL SIDEBAR DRAWERS CONTROLLERS
// ============================================

function toggleVisualSidebar() {
    const isCollapsed = elements.sidebarDrawer.classList.contains('collapsed');
    if (isCollapsed) {
        elements.sidebarDrawer.classList.remove('collapsed');
        elements.sidebarToggle.classList.add('active');
    } else {
        elements.sidebarDrawer.classList.add('collapsed');
        elements.sidebarToggle.classList.remove('active');
    }
}

function setupSidebarTabTriggers() {
    const tabBtns = document.querySelectorAll('.sidebar-tab-btn');
    const panes = document.querySelectorAll('.sidebar-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active pane panels
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Setup Realtime CSS preview calculators
 */
function setupCSSCalculators() {
    // Real-time Shadow Sliders Listener
    const updateShadowPreview = () => {
        const x = elements.shadowX.value;
        const y = elements.shadowY.value;
        const blur = elements.shadowBlur.value;
        const spread = elements.shadowSpread.value;
        const color = elements.shadowColor.value;
        
        elements.shadowXVal.textContent = `${x}px`;
        elements.shadowYVal.textContent = `${y}px`;
        elements.shadowBlurVal.textContent = `${blur}px`;
        elements.shadowSpreadVal.textContent = `${spread}px`;
        
        const shadowStr = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
        elements.shadowBoxPreview.style.boxShadow = shadowStr;
    };
    
    [elements.shadowX, elements.shadowY, elements.shadowBlur, elements.shadowSpread, elements.shadowColor].forEach(slider => {
        slider.addEventListener('input', updateShadowPreview);
    });
    
    elements.insertShadowBtn.addEventListener('click', () => {
        const shadowStr = `box-shadow: ${elements.shadowX.value}px ${elements.shadowY.value}px ${elements.shadowBlur.value}px ${elements.shadowSpread.value}px ${elements.shadowColor.value};`;
        insertCodeAtActiveCursor(shadowStr, 'css');
        showToast('Box Shadow CSS inserted!');
    });

    // Real-time Border Radius Slider Listener
    elements.radiusAll.addEventListener('input', () => {
        const rad = elements.radiusAll.value;
        elements.radiusVal.textContent = `${rad}px`;
        elements.radiusBoxPreview.style.borderRadius = `${rad}px`;
    });
    
    elements.insertRadiusBtn.addEventListener('click', () => {
        const radStr = `border-radius: ${elements.radiusAll.value}px;`;
        insertCodeAtActiveCursor(radStr, 'css');
        showToast('Border Radius CSS inserted!');
    });

    // Real-time Gradient Slider Listener
    const updateGradientPreview = () => {
        const angle = elements.gradAngle.value;
        const start = elements.gradStartColor.value;
        const end = elements.gradEndColor.value;
        
        elements.gradAngleVal.textContent = `${angle}deg`;
        elements.gradientPreview.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
    };
    
    [elements.gradAngle, elements.gradStartColor, elements.gradEndColor].forEach(slider => {
        slider.addEventListener('input', updateGradientPreview);
    });
    
    elements.insertGradientBtn.addEventListener('click', () => {
        const gradStr = `background: linear-gradient(${elements.gradAngle.value}deg, ${elements.gradStartColor.value}, ${elements.gradEndColor.value});`;
        insertCodeAtActiveCursor(gradStr, 'css');
        showToast('Gradient CSS background inserted!');
    });
}

function setupComponentLibrary() {
    const compCards = document.querySelectorAll('.component-card');
    compCards.forEach(card => {
        card.addEventListener('click', () => {
            const compId = card.getAttribute('data-comp');
            const data = uiComponents[compId];
            
            if (data) {
                // Focus editors first or inject in place
                insertCodeAtActiveCursor(data.html, 'html');
                insertCodeAtActiveCursor(data.css, 'css');
                
                updatePreview();
                showToast(`Injected ${card.querySelector('.comp-title').textContent}! 🧩`);
            }
        });
    });
}

function setupColorSwatches() {
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(sw => {
        sw.addEventListener('click', () => {
            const color = sw.getAttribute('data-color');
            insertCodeAtActiveCursor(color, 'css');
            showToast(`Hex ${color} inserted inside active editor! 🎨`);
        });
    });
}

function insertCodeAtActiveCursor(codeText, fallbackLanguage) {
    let targetEditor = null;
    
    if (state.activeEditor === 'html') targetEditor = elements.htmlEditor;
    else if (state.activeEditor === 'css') targetEditor = elements.cssEditor;
    else if (state.activeEditor === 'js') targetEditor = elements.jsEditor;
    else if (state.activeEditor === 'md') targetEditor = elements.mdEditor;
    
    // Use fallback if active is not matched
    if (!targetEditor && fallbackLanguage) {
        if (fallbackLanguage === 'html') targetEditor = elements.htmlEditor;
        else if (fallbackLanguage === 'css') targetEditor = elements.cssEditor;
        else if (fallbackLanguage === 'js') targetEditor = elements.jsEditor;
        else if (fallbackLanguage === 'md') targetEditor = elements.mdEditor;
    }
    
    if (!targetEditor) targetEditor = elements.htmlEditor; // Global default fallback
    
    const start = targetEditor.selectionStart;
    const end = targetEditor.selectionEnd;
    const val = targetEditor.value;
    
    targetEditor.value = val.substring(0, start) + codeText + val.substring(end);
    
    // Position cursor at the end of inserted block
    targetEditor.selectionStart = targetEditor.selectionEnd = start + codeText.length;
    targetEditor.focus();
    
    // Trigger updates
    targetEditor.dispatchEvent(new Event('input'));
}

// ============================================
// ZEN PANEL FOCUSING LAYOUTS
// ============================================

function toggleZenMode(panel) {
    const isZen = panel.classList.contains('zen-mode');
    
    // Disable zen mode on all first
    document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('zen-mode'));
    
    if (!isZen) {
        panel.classList.add('zen-mode');
        const icon = panel.querySelector('.zen-toggle i');
        if (icon && window.lucide) {
            icon.setAttribute('data-lucide', 'minimize-2');
            window.lucide.createIcons();
        }
        showToast('Zen Mode focused active editor!');
    } else {
        const icon = panel.querySelector('.zen-toggle i');
        if (icon && window.lucide) {
            icon.setAttribute('data-lucide', 'maximize-2');
            window.lucide.createIcons();
        }
        showToast('Zen Mode disabled.');
    }
}

// ============================================
// TOAST MESSAGES
// ============================================

function showToast(message, duration = 3000) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// ============================================
// LISTENERS REGISTRATION
// ============================================

function setupEventListeners() {
    // 1. Sidebar Toggle Triggers
    elements.sidebarToggle.addEventListener('click', toggleVisualSidebar);
    setupSidebarTabTriggers();
    setupCSSCalculators();
    setupComponentLibrary();
    setupColorSwatches();
    
    // 2. Toolbar Actions Click
    elements.layoutVerticalBtn.addEventListener('click', () => setWorkspaceLayout('vertical'));
    elements.layoutHorizontalBtn.addEventListener('click', () => setWorkspaceLayout('horizontal'));
    
    elements.templatesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.templatesDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', () => {
        elements.templatesDropdown.classList.remove('show');
    });
    
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const template = item.getAttribute('data-template');
            loadTemplate(template);
        });
    });

    elements.formatBtn.addEventListener('click', formatCode);
    elements.librariesBtn.addEventListener('click', showLibrariesModal);
    elements.historyBtn.addEventListener('click', () => showModal('history'));
    elements.shareBtn.addEventListener('click', generateShareLink);
    elements.exportBtn.addEventListener('click', exportZIP);
    elements.settingsBtn.addEventListener('click', () => showModal('settings'));
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // 3. Modals cancel elements
    document.querySelectorAll('.btn-modal-close, [data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            hideModal(modalId);
        });
    });
    
    // Settings adjustments save
    elements.saveSettingsBtn.addEventListener('click', saveSystemSettings);
    elements.fontSizeSlider.addEventListener('input', () => {
        elements.fontSizeVal.textContent = `${elements.fontSizeSlider.value}px`;
    });
    elements.debounceSlider.addEventListener('input', () => {
        elements.debounceVal.textContent = `${elements.debounceSlider.value}ms`;
    });

    // Libraries Dynamic updates
    elements.applyLibrariesBtn.addEventListener('click', applyDynamicLibraries);
    elements.addCustomLibBtn.addEventListener('click', addCustomLibrary);
    elements.customLibUrl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addCustomLibrary();
    });

    // 4. Console interactions
    elements.clearConsoleBtn.addEventListener('click', clearConsoleLogs);
    elements.closeConsoleBtn.addEventListener('click', () => {
        elements.consoleDrawer.classList.add('collapsed');
    });
    
    elements.toggleConsoleDrawerBtn.addEventListener('click', () => {
        elements.consoleDrawer.classList.toggle('collapsed');
    });
    
    elements.replInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeREPLCommand();
    });
    
    elements.fullscreenPreviewBtn.addEventListener('click', () => {
        if (elements.preview.requestFullscreen) {
            elements.preview.requestFullscreen();
        } else if (elements.preview.webkitRequestFullscreen) {
            elements.preview.webkitRequestFullscreen();
        }
    });

    // 5. Smart code editors keybinds
    const activeStates = ['html', 'css', 'js', 'md'];
    activeStates.forEach(lang => {
        const editor = elements[`${lang}Editor`];
        const lineNumbers = elements[`${lang}LineNumbers`];
        const panel = document.getElementById(`panel${lang.toUpperCase()}`);
        
        editor.addEventListener('focus', () => {
            state.activeEditor = lang;
        });

        editor.addEventListener('input', () => {
            updateLineNumbers(editor, lineNumbers);
            saveCode(true); // Silent autosave in background
            
            if (state.isAutoUpdate) {
                debouncedPreviewUpdate();
            }
        });

        editor.addEventListener('scroll', () => {
            syncScroll(editor, lineNumbers);
        });

        // Smart autoclose brackets keypress
        editor.addEventListener('keydown', (e) => {
            handleSmartAutoclose(e, editor);
            
            // Tab support spaces indenting
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 2;
                editor.dispatchEvent(new Event('input'));
            }
        });

        // Zen Mode Maximize Double Click panel header
        const header = panel.querySelector('.panel-header');
        header.addEventListener('dblclick', () => toggleZenMode(panel));
        
        const zenToggle = panel.querySelector('.zen-toggle');
        zenToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleZenMode(panel);
        });

        // Panel Collapsing
        const collapseBtn = panel.querySelector('.collapse-btn');
        collapseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCollapsed = panel.getAttribute('data-collapsed') === 'true';
            panel.setAttribute('data-collapsed', !isCollapsed);
        });
    });

    // 6. Global keyboard shortcuts handler
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            updatePreview();
            showToast('Code executed manually! ⚡');
        }

        // Ctrl + S to save workspace
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveCode();
        }

        // Ctrl + ` (backtick) to toggle console logs drawer
        if ((e.ctrlKey || e.metaKey) && e.key === '`') {
            e.preventDefault();
            elements.consoleDrawer.classList.toggle('collapsed');
        }
    });

    // 7. Save code on beforeunload
    window.addEventListener('beforeunload', () => {
        saveCode(true);
        createLocalBackup(); // Ensure last state is preserved on refresh
    });
}

// ============================================
// START PLAYGROUND IDE APPLICATION
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
