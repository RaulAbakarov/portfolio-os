import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Window from './Window'
import TerminalApp from './TerminalApp'
import AboutApp from './AboutApp'
import ProjectsApp from './ProjectsApp'
import SkillsApp from './SkillsApp'
import ContactApp from './ContactApp'
import SecretApp from './SecretApp'
import DinoApp from './DinoApp'
import Clippy from './Clippy'
import MatrixRain from './MatrixRain'
import Notification from './Notification'

const APP_DEFAULTS = {
  terminal: {
    id: 'terminal',
    icon: '🖥️',
    desktopIcon: '🖥️',
    defaultPos: { x: 180, y: 50 },
    defaultSize: { w: 680, h: 460 },
  },
  about: {
    id: 'about',
    icon: '👤',
    desktopIcon: '👤',
    defaultPos: { x: 220, y: 70 },
    defaultSize: { w: 550, h: 520 },
  },
  projects: {
    id: 'projects',
    icon: '📂',
    desktopIcon: '📂',
    defaultPos: { x: 260, y: 40 },
    defaultSize: { w: 750, h: 530 },
  },
  skills: {
    id: 'skills',
    icon: '⚡',
    desktopIcon: '⚡',
    defaultPos: { x: 200, y: 80 },
    defaultSize: { w: 700, h: 480 },
  },
  contact: {
    id: 'contact',
    icon: '✉️',
    desktopIcon: '✉️',
    defaultPos: { x: 300, y: 60 },
    defaultSize: { w: 520, h: 480 },
  },
  secret: {
    id: 'secret',
    icon: '🔒',
    desktopIcon: '🔒',
    defaultPos: { x: 340, y: 90 },
    defaultSize: { w: 500, h: 450 },
  },
  dino: {
    id: 'dino',
    icon: '🦕',
    desktopIcon: '🦕',
    defaultPos: { x: 240, y: 60 },
    defaultSize: { w: 700, h: 400 },
  },
}

const DESKTOP_ICONS = ['about', 'terminal', 'projects', 'skills', 'contact', 'secret', 'dino']

export default function Desktop({ triggerBSOD }) {
  const { lang, changeLang, t } = useLanguage()
  const [openWindows, setOpenWindows] = useState(['about'])
  const [minimizedWindows, setMinimizedWindows] = useState([])
  const [focusedWindow, setFocusedWindow] = useState('about')
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showClippy, setShowClippy] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [notification, setNotification] = useState(null)
  const [clock, setClock] = useState('')
  const [clockDate, setClockDate] = useState('')
  const [brokenIcons, setBrokenIcons] = useState({})

  const getApps = useCallback(() => {
    const appTrans = t.apps
    const apps = {}
    for (const key of Object.keys(APP_DEFAULTS)) {
      apps[key] = {
        ...APP_DEFAULTS[key],
        title: appTrans[key].title,
        label: appTrans[key].label,
      }
    }
    return apps
  }, [t])

  const APPS = getApps()

  const handleIconError = useCallback((appId) => {
    setBrokenIcons(prev => ({ ...prev, [appId]: true }))
  }, [])

  const IconRenderer = ({ app, className }) => {
    const imageBroken = brokenIcons[app.id]
    const hasImageIcon = typeof app.desktopIcon === 'string' && app.desktopIcon.startsWith('/')

    if (hasImageIcon && !imageBroken) {
      return (
        <img
          src={app.desktopIcon}
          alt={app.label}
          className={className}
          onError={() => handleIconError(app.id)}
        />
      )
    }

    return <>{app.iconFallback || app.desktopIcon}</>
  }

  // Clock
  useEffect(() => {
    const localeMap = { en: 'en-US', az: 'az-AZ', ru: 'ru-RU' }
    const locale = localeMap[lang] || 'en-US'
    const update = () => {
      const now = new Date()
      setClock(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }))
      setClockDate(now.toLocaleDateString(locale, { month: 'short', day: 'numeric' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [lang])

  // Welcome notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        icon: '👋',
        title: t.desktop.welcomeTitle,
        body: t.desktop.welcomeBody,
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

  const openApp = useCallback((appId) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows(prev => [...prev, appId])
    }
    setMinimizedWindows(prev => prev.filter(id => id !== appId))
    setFocusedWindow(appId)
    setStartMenuOpen(false)
  }, [openWindows])

  const launchApp = useCallback((appId) => {
    const app = APPS[appId]
    if (!app) return

    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer')
      setStartMenuOpen(false)
      return
    }

    openApp(appId)
  }, [APPS, openApp])

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
      case 'dino':
        return <DinoApp />
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
              onDoubleClick={() => launchApp(appId)}
              onClick={() => launchApp(appId)}
            >
              <div className="desktop-icon-img">
                <IconRenderer app={app} className="desktop-icon-logo" />
              </div>
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
              title: t.desktop.recycleBin,
              body: t.desktop.recycleBinBody,
            })
          }}
        >
          <div className="desktop-icon-img">🗑️</div>
          <div className="desktop-icon-label">{t.desktop.recycleBin}</div>
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
              <p>{t.desktop.fullStackDeveloper}</p>
            </div>
          </div>
          <div className="start-menu-items">
            {Object.values(APPS).map(app => (
              <div
                key={app.id}
                className="start-menu-item"
                onClick={() => launchApp(app.id)}
              >
                <span className="start-menu-item-icon">
                  {typeof app.icon === 'string' && app.icon.startsWith('/') && !brokenIcons[app.id]
                    ? <img src={app.icon} alt={app.label} className="start-menu-item-logo" onError={() => handleIconError(app.id)} />
                    : (app.iconFallback || app.icon)}
                </span>
                <span>{app.title}</span>
              </div>
            ))}
            <div
              className="start-menu-item"
              onClick={() => { setShowMatrix(prev => !prev); setStartMenuOpen(false) }}
            >
              <span className="start-menu-item-icon">🟢</span>
              <span>{showMatrix ? t.desktop.disableMatrix : t.desktop.enableMatrix}</span>
            </div>
            <div
              className="start-menu-item"
              onClick={() => { setShowClippy(true); setStartMenuOpen(false) }}
            >
              <span className="start-menu-item-icon">📎</span>
              <span>{t.desktop.summonClippy}</span>
            </div>
          </div>
          <div className="start-menu-footer">
            <span>{t.desktop.portfolioVersion}</span>
            <span
              className="start-menu-power"
              onClick={() => triggerBSOD('VOLUNTARY_SHUTDOWN')}
              title={t.desktop.shutDown}
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
          <span className="taskbar-start-text">{t.desktop.start}</span>
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
          {/* Language Selector */}
          <div className="lang-selector">
            {['en', 'az', 'ru'].map(code => (
              <button
                key={code}
                className={`lang-btn ${lang === code ? 'active' : ''}`}
                onClick={() => changeLang(code)}
              >
                {t.langSelector[code]}
              </button>
            ))}
          </div>
          <span
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => setShowClippy(prev => !prev)}
            title={t.desktop.toggleClippy}
          >
            📎
          </span>
          <span
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() => setShowMatrix(prev => !prev)}
            title={t.desktop.toggleMatrix}
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
