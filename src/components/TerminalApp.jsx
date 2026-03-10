import { useState, useRef, useEffect, useCallback } from 'react'

const COMMANDS = {
  help: () => [
    { text: 'Available commands:', cls: 'accent' },
    { text: '' },
    { text: '  help          — show this help menu', cls: '' },
    { text: '  about         — who am I?', cls: '' },
    { text: '  skills        — list technical skills', cls: '' },
    { text: '  projects      — show featured projects', cls: '' },
    { text: '  contact       — get in touch', cls: '' },
    { text: '  socials       — social media links', cls: '' },
    { text: '  neofetch      — system info (flex)', cls: '' },
    { text: '  whoami        — identity crisis check', cls: '' },
    { text: '  cowsay [msg]  — let the cow speak', cls: '' },
    { text: '  matrix        — enter the matrix', cls: '' },
    { text: '  sudo rm -rf / — absolutely do not', cls: 'error' },
    { text: '  clear         — clear terminal', cls: '' },
    { text: '  exit          — close terminal', cls: '' },
    { text: '' },
    { text: '  Type any command and press Enter.', cls: 'gold' },
  ],

  about: () => {
    const isMobile = window.innerWidth <= 768
    const border = isMobile
      ? '══════════════════════════════'
      : '══════════════════════════════════════════'
    const title = isMobile
      ? '    RAUL ABAKAROV :: ABOUT    '
      : '         RAUL ABAKAROV :: ABOUT           '
    return [
      { text: `╔${border}╗`, cls: 'accent' },
      { text: `║${title}║`, cls: 'accent' },
      { text: `╚${border}╝`, cls: 'accent' },
      { text: '' },
      { text: '  Name:     Raul Abakarov', cls: '' },
      { text: '  Role:     Full Stack Developer', cls: '' },
      { text: '  Location: Baku, Azerbaijan 🇦🇿', cls: '' },
      { text: '  Focus:    Building scalable web apps', cls: '' },
      { text: '' },
      { text: '  I turn complex ideas into elegant,', cls: 'blue' },
      { text: '  user-friendly software. From interactive', cls: 'blue' },
      { text: '  web apps to game dev — I love exploring', cls: 'blue' },
      { text: '  the full spectrum of what code can create.', cls: 'blue' },
      { text: '' },
      { text: '  Fun fact: I customize my Neovim config', cls: 'gold' },
      { text: '  for fun. Yes, it\'s the 847th revision. 🐧', cls: 'gold' },
    ]
  },

  skills: () => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      return [
        { text: '── Languages ──', cls: 'accent' },
        { text: '  JavaScript  ██████████░ 95%', cls: '' },
        { text: '  TypeScript  █████████░░ 90%', cls: '' },
        { text: '  Python      ████████░░░ 85%', cls: '' },
        { text: '  HTML/CSS    ██████████░ 95%', cls: '' },
        { text: '  SQL         ███████░░░░ 75%', cls: '' },
        { text: '' },
        { text: '── Frameworks ──', cls: 'accent' },
        { text: '  React       ██████████░ 95%', cls: '' },
        { text: '  Node.js     █████████░░ 90%', cls: '' },
        { text: '  Express     ████████░░░ 80%', cls: '' },
        { text: '  Flask       ███████░░░░ 75%', cls: '' },
        { text: '  Vite        ████████░░░ 85%', cls: '' },
        { text: '' },
        { text: '── Tools ──', cls: 'accent' },
        { text: '  Git         ██████████░ 95%', cls: '' },
        { text: '  MongoDB     ████████░░░ 85%', cls: '' },
        { text: '  MySQL       ███████░░░░ 75%', cls: '' },
        { text: '  Docker      ███████░░░░ 70%', cls: '' },
        { text: '  Neovim      ██████████░ ∞%', cls: 'gold' },
      ]
    }
    return [
      { text: '──── Languages ────', cls: 'accent' },
      { text: '  JavaScript   ████████████████████░  95%', cls: '' },
      { text: '  TypeScript   ███████████████████░░  90%', cls: '' },
      { text: '  Python       ██████████████████░░░  85%', cls: '' },
      { text: '  HTML/CSS     ████████████████████░  95%', cls: '' },
      { text: '  SQL          ███████████████░░░░░░  75%', cls: '' },
      { text: '' },
      { text: '──── Frameworks ────', cls: 'accent' },
      { text: '  React        ████████████████████░  95%', cls: '' },
      { text: '  Node.js      ███████████████████░░  90%', cls: '' },
      { text: '  Express      █████████████████░░░░  80%', cls: '' },
      { text: '  Flask        ███████████████░░░░░░  75%', cls: '' },
      { text: '  Vite         ██████████████████░░░  85%', cls: '' },
      { text: '' },
      { text: '──── Tools ────', cls: 'accent' },
      { text: '  Git          ████████████████████░  95%', cls: '' },
      { text: '  MongoDB      ██████████████████░░░  85%', cls: '' },
      { text: '  MySQL        ███████████████░░░░░░  75%', cls: '' },
      { text: '  Docker       ██████████████░░░░░░░  70%', cls: '' },
      { text: '  Neovim       ████████████████████░  ∞%', cls: 'gold' },
    ]
  },

  projects: () => {
    const isMobile = window.innerWidth <= 768
    const border = isMobile
      ? '══════════════════════════════'
      : '══════════════════════════════════════════'
    const title = isMobile
      ? '     FEATURED PROJECTS       '
      : '          FEATURED PROJECTS               '
    return [
      { text: `╔${border}╗`, cls: 'accent' },
      { text: `║${title}║`, cls: 'accent' },
      { text: `╚${border}╝`, cls: 'accent' },
      { text: '' },
      { text: '  📝 Affiliate Blog', cls: 'pink' },
      { text: '     SEO-optimized blog platform', cls: '' },
      { text: '     Stack: TypeScript, Vite, CSS', cls: '' },
      { text: '' },
      { text: '  📖 Dictionary Web App', cls: 'pink' },
      { text: '     Interactive dictionary w/ API', cls: '' },
      { text: '     Stack: JavaScript, REST API', cls: '' },
      { text: '' },
      { text: '  💹 Crypto Dashboard', cls: 'pink' },
      { text: '     Cryptocurrency tracking dashboard', cls: '' },
      { text: '     Stack: HTML, CSS, JavaScript', cls: '' },
      { text: '' },
      { text: '  🐦 FlappyBird', cls: 'pink' },
      { text: '     Classic clone with modular architecture', cls: '' },
      { text: '     Stack: Python, Pygame', cls: '' },
      { text: '' },
      { text: '  🚢 Battleship Game', cls: 'pink' },
      { text: '     Interactive browser-based Battleship', cls: '' },
      { text: '     Stack: JavaScript, HTML, CSS', cls: '' },
      { text: '' },
      { text: '  Type "open github" to visit repos ›', cls: 'gold' },
    ]
  },

  contact: () => [
    { text: '──── Get In Touch ────', cls: 'accent' },
    { text: '' },
    { text: '  📧 raulabakarov@outlook.com', cls: '' },
    { text: '  🔗 linkedin.com/in/raulabakarov', cls: '' },
    { text: '  🐙 github.com/RaulAbakarov', cls: '' },
    { text: '  📊 leetcode.com/lionnn', cls: '' },
    { text: '' },
    { text: '  I\'m always open to interesting', cls: 'blue' },
    { text: '  conversations, collaborations,', cls: 'blue' },
    { text: '  and new opportunities.', cls: 'blue' },
  ],

  socials: () => [
    { text: '  GitHub   → github.com/RaulAbakarov', cls: '' },
    { text: '  LinkedIn → linkedin.com/in/raulabakarov', cls: '' },
    { text: '  LeetCode → leetcode.com/lionnn', cls: '' },
    { text: '' },
    { text: '  Type "open [platform]" to visit.', cls: 'gold' },
  ],

  neofetch: () => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      return [
        { text: '      /\\@) (@/\\', cls: 'accent' },
        { text: '  nn       Y       nn', cls: 'accent' },
        { text: "  'Y   ___H___   Y'", cls: 'accent' },
        { text: '   \\  |~[o_o]~|  /', cls: 'accent' },
        { text: '    \\ |T\'T\'T\'T| /', cls: '' },
        { text: '     \\|_|_|_|_|/', cls: '' },
        { text: '    / A \\  / A \\', cls: '' },
        { text: '   |___|  |___|', cls: '' },
        { text: '' },
        { text: '  raul@portfolio', cls: 'accent' },
        { text: '  ──────────────────', cls: 'accent' },
        { text: '  OS:       Portfolio OS v3.14', cls: '' },
        { text: '  Host:     The Internet', cls: '' },
        { text: '  Kernel:   React 18', cls: '' },
        { text: '  Uptime:   ∞ hours', cls: '' },
        { text: '  Packages: 847 (npm)', cls: '' },
        { text: '  Shell:    zsh + oh-my-zsh', cls: '' },
        { text: '  Editor:   Neovim', cls: 'gold' },
        { text: '  Theme:    Tokyo Night', cls: '' },
        { text: '  Terminal: Alacritty', cls: '' },
        { text: '  CPU:      Caffeine-Powered', cls: '' },
        { text: '  GPU:      Pure Imagination', cls: '' },
        { text: '  Memory:   Full of bugs', cls: '' },
      ]
    }
    return [
      { text: '      /\\@) (@/\\          raul@portfolio', cls: 'accent' },
      { text: "  nn       Y       nn    ──────────────────", cls: 'accent' },
      { text: "  'Y   ___H___   Y'     OS: Portfolio OS v3.14", cls: 'accent' },
      { text: '   \\  |~[o_o]~|  /      Host: The Internet', cls: '' },
      { text: "    \\ |T'T'T'T| /       Kernel: React 18", cls: '' },
      { text: '     \\|_|_|_|_|/        Uptime: ∞ hours', cls: '' },
      { text: '    / A \\  / A \\        Packages: 847 (npm)', cls: '' },
      { text: '   |___|  |___|         Shell: zsh + oh-my-zsh', cls: '' },
      { text: '                        Editor: Neovim', cls: 'gold' },
      { text: '                        Theme: Tokyo Night', cls: '' },
      { text: '                        Terminal: Alacritty', cls: '' },
      { text: '                        CPU: Caffeine-Powered', cls: '' },
      { text: '                        GPU: Pure Imagination', cls: '' },
      { text: '                        Memory: Full of bugs', cls: '' },
    ]
  },

  whoami: () => [
    { text: 'root@raul-portfolio:~#', cls: 'accent' },
    { text: '' },
    { text: '  You are a visitor on Raul\'s portfolio.', cls: '' },
    { text: '  You have READ-ONLY access.', cls: '' },
    { text: '  But you have INFINITE access to being', cls: 'blue' },
    { text: '  impressed by what you see here. 😎', cls: 'blue' },
  ],
}

function cowsay(message) {
  const msg = message || 'Moo! Hire Raul!'
  const border = '─'.repeat(msg.length + 2)
  return [
    { text: ` ┌${border}┐`, cls: '' },
    { text: ` │ ${msg} │`, cls: '' },
    { text: ` └${border}┘`, cls: '' },
    { text: '        \\   ^__^', cls: 'accent' },
    { text: '         \\  (oo)\\_______', cls: 'accent' },
    { text: '            (__)\\       )\\/\\', cls: 'accent' },
    { text: '                ||----w |', cls: 'accent' },
    { text: '                ||     ||', cls: 'accent' },
  ]
}

export default function TerminalApp({ onCommand }) {
  const [lines, setLines] = useState([
    { text: 'Portfolio OS Terminal v3.14 — Type "help" for commands', cls: 'accent' },
    { text: '─────────────────────────────────────────────────', cls: 'accent' },
    { text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [lines])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const parts = trimmed.split(' ')
    const command = parts[0]
    const args = parts.slice(1).join(' ')

    let output = []

    if (command === 'clear') {
      setLines([])
      return
    }

    if (command === 'exit') {
      onCommand?.('close')
      return
    }

    if (command === 'sudo' && trimmed.includes('rm -rf')) {
      onCommand?.('bsod', 'UNAUTHORIZED_DESTRUCTION_ATTEMPT')
      return
    }

    if (command === 'matrix') {
      onCommand?.('matrix')
      output = [{ text: 'Entering the Matrix... 🐇', cls: 'accent' }]
    } else if (command === 'open') {
      const links = {
        github: 'https://github.com/RaulAbakarov',
        linkedin: 'https://www.linkedin.com/in/raulabakarov',
        leetcode: 'https://leetcode.com/lionnn',
      }
      if (links[args]) {
        window.open(links[args], '_blank')
        output = [{ text: `Opening ${args}...`, cls: 'accent' }]
      } else {
        output = [{ text: `Unknown link: "${args}". Try: github, linkedin, leetcode`, cls: 'error' }]
      }
    } else if (command === 'cowsay') {
      output = cowsay(args)
    } else if (command === 'date') {
      output = [{ text: `  ${new Date().toString()}`, cls: '' }]
    } else if (command === 'echo') {
      output = [{ text: `  ${args}`, cls: '' }]
    } else if (command === 'ls') {
      output = [
        { text: '  about.exe     projects.dll   skills.sys', cls: 'accent' },
        { text: '  contact.bat   terminal.sh    secret.txt', cls: 'accent' },
        { text: '  recycle_bin/  .neovim_config (hidden)', cls: '' },
      ]
    } else if (command === 'cat' && args === 'secret.txt') {
      output = [
        { text: '  [CLASSIFIED] This file contains:', cls: 'error' },
        { text: '  - The meaning of life (it\'s 42)', cls: '' },
        { text: '  - Why vim users can\'t exit (it\'s a feature)', cls: '' },
        { text: '  - Raul\'s WiFi password (nice try)', cls: '' },
      ]
    } else if (command === 'pwd') {
      output = [{ text: '  /home/raul/portfolio', cls: '' }]
    } else if (command === 'ping') {
      output = [
        { text: '  PING success @ 127.0.0.1: time=0.001ms', cls: 'accent' },
        { text: '  (are you pinging localhost? classic dev move)', cls: 'gold' },
      ]
    } else if (COMMANDS[command]) {
      output = COMMANDS[command]()
    } else if (command === '') {
      output = []
    } else {
      output = [
        { text: `  bash: ${command}: command not found`, cls: 'error' },
        { text: '  Try "help" for available commands.', cls: '' },
      ]
    }

    setLines(prev => [
      ...prev,
      { text: `raul@portfolio:~$ ${cmd}`, cls: '', isCommand: true },
      ...output,
      { text: '' },
    ])
  }, [onCommand])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setHistory(prev => [input, ...prev])
      setHistoryIndex(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmds = [...Object.keys(COMMANDS), 'clear', 'exit', 'cowsay', 'matrix', 'open', 'sudo', 'ls', 'cat', 'pwd', 'ping', 'echo', 'date']
      const match = cmds.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }, [input, history, historyIndex, processCommand])

  return (
    <div className="terminal" ref={scrollRef} onClick={focusInput}>
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line.isCommand ? (
            <>
              <span className="terminal-prompt">raul@portfolio:~$ </span>
              <span className="terminal-command">{line.text.replace('raul@portfolio:~$ ', '')}</span>
            </>
          ) : (
            <span className={`terminal-output ${line.cls || ''}`}>{line.text}</span>
          )}
        </div>
      ))}
      <div className="terminal-input-line">
        <span className="terminal-prompt">raul@portfolio:~$ </span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  )
}
