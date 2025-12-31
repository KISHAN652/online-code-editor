# CodePlayground - Online Code Editor

A modern, lightweight, and fully responsive online code editor for HTML, CSS, and JavaScript with live preview capabilities.

![CodePlayground](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📖 About The Project

CodePlayground is a production-ready web-based code editor that allows you to write HTML, CSS, and JavaScript and see the results in real-time. Built with vanilla JavaScript and no external dependencies, it provides a clean, modern interface for quick prototyping, learning, and experimentation.

The application features a premium dark/light theme system, automatic code saving, and a fully responsive design that works seamlessly across all devices - from mobile phones to ultra-wide monitors.

## ✨ Features

### Core Functionality
- **Three Editor Panels** - Separate editors for HTML, CSS, and JavaScript
- **Live Preview** - Real-time rendering in a sandboxed iframe
- **Auto-Update** - Debounced live updates (500ms) as you type
- **Line Numbers** - Custom lightweight line number implementation with scroll sync
- **Code Persistence** - Automatic saving to localStorage
- **Auto-Restore** - Restores your code on page reload

### User Experience
- **Dark/Light Theme** - Smooth animated theme toggle with persistence
- **Collapsible Panels** - Expand/collapse editor panels for better focus
- **Keyboard Shortcuts**:
  - `Ctrl+Enter` / `Cmd+Enter` - Run code
  - `Ctrl+S` / `Cmd+S` - Save code
  - `Tab` - Insert 2 spaces
- **Toast Notifications** - Non-intrusive feedback messages
- **Error Handling** - JavaScript errors displayed in preview

### Design
- **Modern UI** - Glassmorphism effects with soft shadows
- **Premium Typography** - Inter for UI, JetBrains Mono for code
- **Smooth Animations** - CSS-based transitions and micro-interactions
- **Responsive Layout** - Optimized for mobile, tablet, and desktop

### Responsive Breakpoints
- **Mobile (<768px)** - Vertical stack layout with collapsible panels
- **Tablet (768-1024px)** - Grid layout with 3 columns for editors
- **Desktop (>1024px)** - Full 3-column editor + preview layout
- **Ultra-wide (>1440px)** - Centered max-width container

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Grid, Flexbox, CSS Variables for theming
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **Google Fonts** - Inter & JetBrains Mono

**No build tools required. No dependencies. Just pure code.**

## 🚀 Setup

### Installation

No installation needed! Simply open the `index.html` file in any modern web browser.

```bash
# Clone or download the repository
cd online-code-editor

# Open in browser
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### File Structure

```
/online-code-editor
 ├── index.html          # Main HTML structure
 ├── style.css           # Complete styling with themes
 ├── script.js           # All JavaScript functionality
 ├── DEPLOYMENT.md       # Deployment guide
 └── README.md           # This file
```

### Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📝 Usage

1. **Write Code** - Type HTML, CSS, and JavaScript in respective editors
2. **See Results** - Preview updates automatically after 500ms
3. **Manual Run** - Click "Run" button or press `Ctrl+Enter`
4. **Save Work** - Click "Save" or press `Ctrl+S`
5. **Toggle Theme** - Click theme toggle button
6. **Reset** - Click "Reset" to clear all editors

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Run code |
| `Ctrl+S` / `Cmd+S` | Save code |
| `Tab` | Insert 2 spaces |

## 🌐 Deployment

The application can be deployed to any static hosting platform:

- **GitHub Pages** - Free hosting with custom domain support
- **Netlify** - Drag & drop deployment
- **Vercel** - Fast CDN with preview deployments
- **Traditional Hosting** - Upload via FTP/SFTP

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🎨 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --accent-primary: #6366f1;    /* Primary color */
    --accent-secondary: #8b5cf6;  /* Secondary color */
}
```

### Adjusting Debounce Delay

In `script.js`, modify the timeout:

```javascript
state.debounceTimer = setTimeout(() => {
    updatePreview();
}, 500); // Change to your preferred delay (ms)
```

## 📄 License

MIT License - Free to use for personal or commercial purposes.

## 👨‍💻 Created By

**Kishan**

Built with ❤️ using modern web standards.

---

**Enjoy coding with CodePlayground! 🚀**
