import { useState, useEffect, useCallback, useRef } from 'react'
import Window from './Window'
import TerminalApp from './TerminalApp'
import AboutApp from './AboutApp'
import ProjectsApp from './ProjectsApp'
import SkillsApp from './SkillsApp'
import ContactApp from './ContactApp'
import SecretApp from './SecretApp'
import Clippy from './Clippy'
import ErrorPopup from './ErrorPopup'
import MatrixRain from './MatrixRain'
import Notification from './Notification'

const APPS = {
  terminal: {
    id: 'terminal',
    title: 'Terminal.sh',
    icon: '🖥️',
    desktopIcon: '🖥️',
    label: 'Terminal.sh',
    defaultPos: { x: 180, y: 50 },
    defaultSize: { w: 680, h: 460 },
  },
  about: {
    id: 'about',
    title: 'About.exe',
    icon: '👤',
    desktopIcon: '👤',
    label: 'About.exe',
    defaultPos: { x: 220, y: 70 },
    defaultSize: { w: 550, h: 520 },
  },
  projects: {
    id: 'projects',
    title: 'Projects.dll — File Explorer',
    icon: '📂',
    desktopIcon: '📂',
    label: 'Projects.dll',
    defaultPos: { x: 260, y: 40 },
    defaultSize: { w: 750, h: 530 },
  },
  skills: {
    id: 'skills',
    title: 'Skills.sys — Task Manager',
    icon: '⚡',
    desktopIcon: '⚡',
    label: 'Skills.sys',
    defaultPos: { x: 200, y: 80 },
    defaultSize: { w: 700, h: 480 },
  },
  contact: {
    id: 'contact',
    title: 'Contact.bat — Mail Client',
    icon: '✉️',
    desktopIcon: '✉️',
    label: 'Contact.bat',
    defaultPos: { x: 300, y: 60 },
    defaultSize: { w: 520, h: 480 },
  },
  secret: {
    id: 'secret',
    title: 'secret.txt — [CLASSIFIED]',
    icon: '🔒',
    desktopIcon: '🔒',
    label: 'secret.txt',
    defaultPos: { x: 340, y: 90 },
    defaultSize: { w: 500, h: 450 },
  },
}

const DESKTOP_ICONS = ['about', 'terminal', 'projects', 'skills', 'contact', 'secret']

export default function Desktop({ triggerBSOD }) {
  const [openWindows, setOpenWindows] = useState(['about'])
  const [minimizedWindows, setMinimizedWindows] = useState([])
  const [focusedWindow, setFocusedWindow] = useState('about')
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showClippy, setShowClippy] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [notification, setNotification] = useState(null)
  const [clock, setClock] = useState('')
  const [clockDate, setClockDate] = useState('')
  const errorCountRef = useRef(0)

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
      setClockDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  // Welcome notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        icon: '👋',
        title: 'Welcome to Portfolio OS',
        body: 'Double-click desktop icons to explore. Try the Terminal for a retro experience!',
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Clippy timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClippy(true)
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  // Random error popup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorCountRef.current < 2) {
        setShowError(true)
        errorCountRef.current++
      }
    }, 25000 + Math.random() * 20000)
    return () => clearTimeout(timer)
  }, [showError])

  const openApp = useCallback((appId) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows(prev => [...prev, appId])
    }
    setMinimizedWindows(prev => prev.filter(id => id !== appId))
    setFocusedWindow(appId)
    setStartMenuOpen(false)
  }, [openWindows])

  const closeApp = useCallback((appId) => {
    setOpenWindows(prev => prev.filter(id => id !== appId))
    setMinimizedWindows(prev => prev.filter(id => id !== appId))
    if (focusedWindow === appId) {
      const remaining = openWindows.filter(id => id !== appId)
      setFocusedWindow(remaining[remaining.length - 1] || null)
    }
  }, [openWindows, focusedWindow])

  const minimizeApp = useCallback((appId) => {
    setMinimizedWindows(prev => [...prev, appId])
    if (focusedWindow === appId) {
      const visible = openWindows.filter(id => id !== appId && !minimizedWindows.includes(id))
      setFocusedWindow(visible[visible.length - 1] || null)
    }
  }, [openWindows, minimizedWindows, focusedWindow])

  const focusApp = useCallback((appId) => {
    setFocusedWindow(appId)
  }, [])

  const handleTaskbarAppClick = useCallback((appId) => {
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== appId))
      setFocusedWindow(appId)
    } else if (focusedWindow === appId) {
      minimizeApp(appId)
    } else {
      setFocusedWindow(appId)
    }
  }, [minimizedWindows, focusedWindow, minimizeApp])

  const handleTerminalCommand = useCallback((cmd, arg) => {
    if (cmd === 'close') closeApp('terminal')
    if (cmd === 'bsod') triggerBSOD(arg)
    if (cmd === 'matrix') setShowMatrix(prev => !prev)
  }, [closeApp, triggerBSOD])

  const renderAppContent = (appId) => {
    switch (appId) {
      case 'terminal':
        return <TerminalApp onCommand={handleTerminalCommand} />
      case 'about':
        return <AboutApp />
      case 'projects':
        return <ProjectsApp />
      case 'skills':
        return <SkillsApp />
      case 'contact':
        return <ContactApp />
      case 'secret':
        return <SecretApp />
      default:
        return null
    }
  }

  return (
    <div className="desktop">
      {/* Background */}
      <div className="desktop-wallpaper" />
      <div className="desktop-grid" />
      {showMatrix && <MatrixRain />}
      <div className="desktop-scanlines" />

      {/* Desktop Icons */}
      <div className="desktop-icons">
        {DESKTOP_ICONS.map(appId => {
          const app = APPS[appId]
          return (
            <div
              key={appId}
              className="desktop-icon"
              onDoubleClick={() => openApp(appId)}
              onClick={() => openApp(appId)}
            >
              <div className="desktop-icon-img">{app.desktopIcon}</div>
              <div className="desktop-icon-label">{app.label}</div>
            </div>
          )
        })}
        {/* Recycle Bin - easter egg */}
        <div
          className="desktop-icon"
          onDoubleClick={() => triggerBSOD('RECYCLED_TOO_HARD')}
          onClick={() => {
            setNotification({
              icon: '🗑️',
              title: 'Recycle Bin',
              body: 'Contains: 847 deleted TODO comments, 3 abandoned side projects, and your free time.',
            })
          }}
        >
          <div className="desktop-icon-img">🗑️</div>
          <div className="desktop-icon-label">Recycle Bin</div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map(appId => {
        const app = APPS[appId]
        if (!app) return null
        const isMinimized = minimizedWindows.includes(appId)
        return (
          <div key={appId} style={{ display: isMinimized ? 'none' : 'block' }}>
            <Window
              id={appId}
              title={app.title}
              icon={app.icon}
              defaultPos={app.defaultPos}
              defaultSize={app.defaultSize}
              focused={focusedWindow === appId}
              onFocus={focusApp}
              onClose={closeApp}
              onMinimize={minimizeApp}
            >
              {renderAppContent(appId)}
            </Window>
          </div>
        )
      })}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <div className="start-menu-avatar">R</div>
            <div className="start-menu-user">
              <h3>Raul Abakarov</h3>
              <p>Full Stack Developer</p>
            </div>
          </div>
          <div className="start-menu-items">
            {Object.values(APPS).map(app => (
              <div
                key={app.id}
                className="start-menu-item"
                onClick={() => openApp(app.id)}
              >
                <span className="start-menu-item-icon">{app.icon}</span>
                <span>{app.title}</span>
              </div>
            ))}
            <div
              className="start-menu-item"
              onClick={() => { setShowMatrix(prev => !prev); setStartMenuOpen(false) }}
            >
              <span className="start-menu-item-icon">🟢</span>
              <span>{showMatrix ? 'Disable Matrix Mode' : 'Enable Matrix Mode'}</span>
            </div>
            <div
              className="start-menu-item"
              onClick={() => { setShowClippy(true); setStartMenuOpen(false) }}
            >
              <span className="start-menu-item-icon">📎</span>
              <span>Summon Clippy</span>
            </div>
          </div>
          <div className="start-menu-footer">
            <span>Portfolio OS v3.14</span>
            <span
              className="start-menu-power"
              onClick={() => triggerBSOD('VOLUNTARY_SHUTDOWN')}
              title="Shut Down"
            >
              ⏻
            </span>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div
          className="taskbar-start"
          onClick={() => setStartMenuOpen(prev => !prev)}
        >
          <span className="taskbar-start-icon">⬡</span>
          <span className="taskbar-start-text">START</span>
        </div>

        <div className="taskbar-divider" />

        <div className="taskbar-apps">
          {openWindows.map(appId => {
            const app = APPS[appId]
            if (!app) return null
            return (
              <div
                key={appId}
                className={`taskbar-app ${focusedWindow === appId && !minimizedWindows.includes(appId) ? 'active' : ''}`}
                onClick={() => handleTaskbarAppClick(appId)}
              >
                <span className="taskbar-app-icon">{app.icon}</span>
                <span>{app.title.split(' — ')[0]}</span>
              </div>
            )
          })}
        </div>

        <div className="taskbar-tray">
          <span
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => setShowClippy(prev => !prev)}
            title="Toggle Clippy"
          >
            📎
          </span>
          <span
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => setShowMatrix(prev => !prev)}
            title="Toggle Matrix"
          >
            {showMatrix ? '🔴' : '🟢'}
          </span>
          <div className="taskbar-clock">
            <div className="taskbar-clock-time">{clock}</div>
            <div>{clockDate}</div>
          </div>
        </div>
      </div>

      {/* Clippy */}
      {showClippy && <Clippy onDismiss={() => setShowClippy(false)} />}

      {/* Error Popup */}
      {showError && <ErrorPopup onClose={() => setShowError(false)} />}

      {/* Notification */}
      {notification && (
        <Notification
          {...notification}
          onDismiss={() => setNotification(null)}
        />
      )}
    </div>
  )
}
