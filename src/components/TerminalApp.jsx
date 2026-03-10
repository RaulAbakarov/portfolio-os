import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function getCommands(t) {
  const tr = t.terminal
  return {
    help: () => [
      { text: tr.helpTitle, cls: 'accent' },
      { text: '' },
      { text: tr.helpHelp, cls: '' },
      { text: tr.helpAbout, cls: '' },
      { text: tr.helpSkills, cls: '' },
      { text: tr.helpProjects, cls: '' },
      { text: tr.helpContact, cls: '' },
      { text: tr.helpSocials, cls: '' },
      { text: tr.helpNeofetch, cls: '' },
      { text: tr.helpWhoami, cls: '' },
      { text: tr.helpCowsay, cls: '' },
      { text: tr.helpMatrix, cls: '' },
      { text: tr.helpSudo, cls: 'error' },
      { text: tr.helpClear, cls: '' },
      { text: tr.helpExit, cls: '' },
      { text: '' },
      { text: tr.helpHint, cls: 'gold' },
    ],

    about: () => {
      const isMobile = window.innerWidth <= 768
      const border = isMobile
        ? '══════════════════════════════'
        : '══════════════════════════════════════════'
      const title = isMobile ? tr.aboutTitle : tr.aboutTitleDesktop
      return [
        { text: `╔${border}╗`, cls: 'accent' },
        { text: `║${title}║`, cls: 'accent' },
        { text: `╚${border}╝`, cls: 'accent' },
        { text: '' },
        { text: tr.aboutName, cls: '' },
        { text: tr.aboutRole, cls: '' },
        { text: tr.aboutLocation, cls: '' },
        { text: tr.aboutFocus, cls: '' },
        { text: '' },
        { text: tr.aboutBio1, cls: 'blue' },
        { text: tr.aboutBio2, cls: 'blue' },
        { text: tr.aboutBio3, cls: 'blue' },
        { text: tr.aboutBio4, cls: 'blue' },
        { text: '' },
        { text: tr.aboutFunFact1, cls: 'gold' },
        { text: tr.aboutFunFact2, cls: 'gold' },
      ]
    },

    skills: () => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        return [
          { text: `── ${tr.skillsLanguages} ──`, cls: 'accent' },
          { text: '  JavaScript  ██████████░ 95%', cls: '' },
          { text: '  TypeScript  █████████░░ 90%', cls: '' },
          { text: '  Python      ████████░░░ 85%', cls: '' },
          { text: '  HTML/CSS    ██████████░ 95%', cls: '' },
          { text: '  SQL         ███████░░░░ 75%', cls: '' },
          { text: '' },
          { text: `── ${tr.skillsFrameworks} ──`, cls: 'accent' },
          { text: '  React       ██████████░ 95%', cls: '' },
          { text: '  Node.js     █████████░░ 90%', cls: '' },
          { text: '  Express     ████████░░░ 80%', cls: '' },
          { text: '  Flask       ███████░░░░ 75%', cls: '' },
          { text: '  Vite        ████████░░░ 85%', cls: '' },
          { text: '' },
          { text: `── ${tr.skillsTools} ──`, cls: 'accent' },
          { text: '  Git         ██████████░ 95%', cls: '' },
          { text: '  MongoDB     ████████░░░ 85%', cls: '' },
          { text: '  MySQL       ███████░░░░ 75%', cls: '' },
          { text: '  Docker      ███████░░░░ 70%', cls: '' },
          { text: '  Neovim      ██████████░ ∞%', cls: 'gold' },
        ]
      }
      return [
        { text: `──── ${tr.skillsLanguages} ────`, cls: 'accent' },
        { text: '  JavaScript   ████████████████████░  95%', cls: '' },
        { text: '  TypeScript   ███████████████████░░  90%', cls: '' },
        { text: '  Python       ██████████████████░░░  85%', cls: '' },
        { text: '  HTML/CSS     ████████████████████░  95%', cls: '' },
        { text: '  SQL          ███████████████░░░░░░  75%', cls: '' },
        { text: '' },
        { text: `──── ${tr.skillsFrameworks} ────`, cls: 'accent' },
        { text: '  React        ████████████████████░  95%', cls: '' },
        { text: '  Node.js      ███████████████████░░  90%', cls: '' },
        { text: '  Express      █████████████████░░░░  80%', cls: '' },
        { text: '  Flask        ███████████████░░░░░░  75%', cls: '' },
        { text: '  Vite         ██████████████████░░░  85%', cls: '' },
        { text: '' },
        { text: `──── ${tr.skillsTools} ────`, cls: 'accent' },
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
      const title = isMobile ? tr.projectsTitle : tr.projectsTitleDesktop
      return [
        { text: `╔${border}╗`, cls: 'accent' },
        { text: `║${title}║`, cls: 'accent' },
        { text: `╚${border}╝`, cls: 'accent' },
        { text: '' },
        { text: tr.projectAffiliate, cls: 'pink' },
        { text: tr.projectAffiliateDesc, cls: '' },
        { text: tr.projectAffiliateStack, cls: '' },
        { text: '' },
        { text: tr.projectDictionary, cls: 'pink' },
        { text: tr.projectDictionaryDesc, cls: '' },
        { text: tr.projectDictionaryStack, cls: '' },
        { text: '' },
        { text: tr.projectCrypto, cls: 'pink' },
        { text: tr.projectCryptoDesc, cls: '' },
        { text: tr.projectCryptoStack, cls: '' },
        { text: '' },
        { text: tr.projectFlappy, cls: 'pink' },
        { text: tr.projectFlappyDesc, cls: '' },
        { text: tr.projectFlappyStack, cls: '' },
        { text: '' },
        { text: tr.projectBattleship, cls: 'pink' },
        { text: tr.projectBattleshipDesc, cls: '' },
        { text: tr.projectBattleshipStack, cls: '' },
        { text: '' },
        { text: tr.projectHint, cls: 'gold' },
      ]
    },

    contact: () => [
      { text: tr.contactTitle, cls: 'accent' },
      { text: '' },
      { text: '  📧 raulabakarov@outlook.com', cls: '' },
      { text: '  🔗 linkedin.com/in/raulabakarov', cls: '' },
      { text: '  🐙 github.com/RaulAbakarov', cls: '' },
      { text: '  📊 leetcode.com/lionnn', cls: '' },
      { text: '' },
      { text: tr.contactBio1, cls: 'blue' },
      { text: tr.contactBio2, cls: 'blue' },
      { text: tr.contactBio3, cls: 'blue' },
    ],

    socials: () => [
      { text: '  GitHub   → github.com/RaulAbakarov', cls: '' },
      { text: '  LinkedIn → linkedin.com/in/raulabakarov', cls: '' },
      { text: '  LeetCode → leetcode.com/lionnn', cls: '' },
      { text: '' },
      { text: tr.socialsHint, cls: 'gold' },
    ],

    neofetch: () => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        return [
          { text: '    \\_______________/', cls: 'accent' },
          { text: '   __/__|______|__\\__', cls: 'accent' },
          { text: '  /⭕⭕_________⭕⭕\\', cls: 'accent' },
          { text: '  |__/__GTR-R34__\\__|', cls: 'accent' },
          { text: '  \\©©__|_|_|_|_|__©©/', cls: 'accent' },
          { text: '' },
          { text: '  raul@portfolio', cls: 'accent' },
          { text: '  ──────────────────', cls: 'accent' },
          { text: `  ${tr.neofetchOS}`, cls: '' },
          { text: `  ${tr.neofetchHost}`, cls: '' },
          { text: `  ${tr.neofetchKernel}`, cls: '' },
          { text: `  ${tr.neofetchUptime}`, cls: '' },
          { text: `  ${tr.neofetchPackages}`, cls: '' },
          { text: `  ${tr.neofetchShell}`, cls: '' },
          { text: `  ${tr.neofetchEditor}`, cls: 'gold' },
          { text: `  ${tr.neofetchTheme}`, cls: '' },
          { text: `  ${tr.neofetchTerminal}`, cls: '' },
          { text: `  ${tr.neofetchCPU}`, cls: '' },
          { text: `  ${tr.neofetchGPU}`, cls: '' },
          { text: `  ${tr.neofetchMemory}`, cls: '' },
        ]
      }
      return [
        { text: `    \\_______________/      raul@portfolio`, cls: 'accent' },
        { text: `   __/__|______|__\\__      ──────────────────`, cls: 'accent' },
        { text: `  /⭕⭕__________⭕⭕\\        ${tr.neofetchOS}`, cls: 'accent' },
        { text: `  |__/__GTR-R34__\\__|      ${tr.neofetchHost}`, cls: '' },
        { text: `  \\©©__|_|_|_|_|__©©/      ${tr.neofetchKernel}`, cls: '' },
        { text: `                           ${tr.neofetchUptime}`, cls: '' },
        { text: `                           ${tr.neofetchPackages}`, cls: '' },
        { text: `                           ${tr.neofetchShell}`, cls: '' },
        { text: `                           ${tr.neofetchEditor}`, cls: 'gold' },
        { text: `                           ${tr.neofetchTheme}`, cls: '' },
        { text: `                           ${tr.neofetchTerminal}`, cls: '' },
        { text: `                           ${tr.neofetchCPU}`, cls: '' },
        { text: `                           ${tr.neofetchGPU}`, cls: '' },
        { text: `                           ${tr.neofetchMemory}`, cls: '' },
      ]
    },

    whoami: () => [
      { text: 'root@raul-portfolio:~#', cls: 'accent' },
      { text: '' },
      { text: tr.whoamiLine1, cls: '' },
      { text: tr.whoamiLine2, cls: '' },
      { text: tr.whoamiLine3, cls: 'blue' },
      { text: tr.whoamiLine4, cls: 'blue' },
    ],
  }
}

function cowsay(message, defaultMsg) {
  const msg = message || defaultMsg
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
  const { t } = useLanguage()
  const tr = t.terminal
  const [lines, setLines] = useState([
    { text: tr.welcome, cls: 'accent' },
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
    const COMMANDS = getCommands(t)

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
      output = [{ text: tr.matrixEntering, cls: 'accent' }]
    } else if (command === 'open') {
      const links = {
        github: 'https://github.com/RaulAbakarov',
        linkedin: 'https://www.linkedin.com/in/raulabakarov',
        leetcode: 'https://leetcode.com/lionnn',
      }
      if (links[args]) {
        window.open(links[args], '_blank')
        output = [{ text: `${tr.openingLink} ${args}...`, cls: 'accent' }]
      } else {
        output = [{ text: `${tr.unknownLink} "${args}". ${tr.unknownLinkHint}`, cls: 'error' }]
      }
    } else if (command === 'cowsay') {
      output = cowsay(args, tr.cowsayDefault)
    } else if (command === 'date') {
      output = [{ text: `  ${new Date().toString()}`, cls: '' }]
    } else if (command === 'echo') {
      output = [{ text: `  ${args}`, cls: '' }]
    } else if (command === 'ls') {
      output = [
        { text: tr.lsLine1, cls: 'accent' },
        { text: tr.lsLine2, cls: 'accent' },
        { text: tr.lsLine3, cls: '' },
      ]
    } else if (command === 'cat' && args === 'secret.txt') {
      output = [
        { text: tr.catSecretLine1, cls: 'error' },
        { text: tr.catSecretLine2, cls: '' },
        { text: tr.catSecretLine3, cls: '' },
        { text: tr.catSecretLine4, cls: '' },
      ]
    } else if (command === 'pwd') {
      output = [{ text: tr.pwdOutput, cls: '' }]
    } else if (command === 'ping') {
      output = [
        { text: tr.pingLine1, cls: 'accent' },
        { text: tr.pingLine2, cls: 'gold' },
      ]
    } else if (COMMANDS[command]) {
      output = COMMANDS[command]()
    } else if (command === '') {
      output = []
    } else {
      output = [
        { text: `  bash: ${command}: ${tr.commandNotFound}`, cls: 'error' },
        { text: tr.commandHint, cls: '' },
      ]
    }

    setLines(prev => [
      ...prev,
      { text: `raul@portfolio:~$ ${cmd}`, cls: '', isCommand: true },
      ...output,
      { text: '' },
    ])
  }, [onCommand, t, tr])

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
      const cmds = [...Object.keys(getCommands(t)), 'clear', 'exit', 'cowsay', 'matrix', 'open', 'sudo', 'ls', 'cat', 'pwd', 'ping', 'echo', 'date']
      const match = cmds.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }, [input, history, historyIndex, processCommand, t])

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
