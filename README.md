# 🖥️ Portfolio OS

A fully interactive **Windows-inspired operating system** portfolio — complete with boot sequence, draggable windows, a working terminal, Clippy, BSOD, and more. Not your average portfolio site.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎬 The Experience

When you visit, you don't just see a portfolio — you **boot into one**.

1. **BIOS POST screen** — Fake hardware detection, personality module loading, coffee level warnings
2. **Loading bar** — With messages like *"Loading 847 npm packages you'll never use..."*
3. **Desktop** — Full OS environment with taskbar, start menu, clock, and desktop icons
4. **Clippy** — Yes, he's back. And he has opinions about your hiring decisions.

## ✨ Features

- 🖥️ **Boot Sequence** — Animated BIOS POST + loading screen with witty system messages
- 🪟 **Draggable Windows** — Fully functional window management (open, close, minimize, focus, resize)
- 💻 **Working Terminal** — Type real commands: `help`, `neofetch`, `cowsay`, `skills`, `matrix`, and more
- 📂 **Projects Explorer** — File explorer-style project showcase with live demo & repo links
- ⚡ **Skills Task Manager** — Skills displayed as running processes with live CPU/memory stats
- 👤 **About.exe** — Profile card with avatar, bio, stats, and fun facts
- ✉️ **Contact Mail Client** — Retro mail client UI with contact form
- 🔒 **Secret.txt** — Classified document with redacted intel (try to find it)
- 📎 **Clippy Assistant** — Random sarcastic tips that pop up while you browse
- 🟦 **BSOD** — Trigger a fake Blue Screen of Death from the terminal
- 🟩 **Matrix Rain** — Toggle the Matrix falling code effect
- ⚠️ **Error Popups** — Random "Windows-style" error dialogs for immersion
- 🔔 **Notifications** — Toast notifications on the desktop
- 🕐 **Live Clock** — Real-time clock in the taskbar
- 📱 **Start Menu** — Fully functional start menu with app launcher

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/RaulAbakarov/portfolio-os.git
cd portfolio-os

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
portfolio-os/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── vite.svg
└── src/
    ├── App.jsx               # Boot → Desktop → BSOD state machine
    ├── main.jsx              # Entry point
    ├── styles/
    │   └── global.css        # Full OS theme & component styles
    └── components/
        ├── BootScreen.jsx    # BIOS POST + loading bar animation
        ├── Desktop.jsx       # Window manager, taskbar, start menu
        ├── Window.jsx        # Draggable, resizable window component
        ├── TerminalApp.jsx   # Interactive terminal with 15+ commands
        ├── AboutApp.jsx      # Profile card with avatar & stats
        ├── ProjectsApp.jsx   # File explorer project showcase
        ├── SkillsApp.jsx     # Task manager-style skill display
        ├── ContactApp.jsx    # Retro mail client contact form
        ├── SecretApp.jsx     # Classified document easter egg
        ├── Clippy.jsx        # The legendary assistant returns
        ├── BSOD.jsx          # Blue Screen of Death with fake QR
        ├── MatrixRain.jsx    # Matrix falling code effect
        ├── ErrorPopup.jsx    # Random Windows-style error dialogs
        └── Notification.jsx  # Toast notification system
```

## 💻 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Who is Raul? |
| `skills` | Technical skills with progress bars |
| `projects` | Featured project showcase |
| `contact` | Contact information |
| `socials` | Social media links |
| `neofetch` | System info flex |
| `whoami` | Identity crisis check |
| `cowsay [msg]` | Let the cow speak |
| `matrix` | Toggle Matrix rain effect |
| `sudo rm -rf /` | Absolutely do not |
| `clear` | Clear terminal |
| `exit` | Close terminal |

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI components & state management |
| **Vite 7** | Build tool & dev server |
| **Framer Motion** | Window animations & transitions |
| **Vanilla CSS** | Full custom OS theme (no frameworks) |

## 🎨 Design Philosophy

This isn't a template. Every pixel is intentional:

- **Windows XP/98 nostalgia** meets modern web
- **Dark theme** with neon accents and CRT vibes
- **Monospace typography** throughout for that terminal aesthetic
- **Micro-interactions** — hover effects, glitch text, animated progress bars
- **Easter eggs everywhere** — keep exploring

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Raul Abakarov** — [GitHub](https://github.com/RaulAbakarov) | [LinkedIn](https://linkedin.com/in/raulabakarov)
