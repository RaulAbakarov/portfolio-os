import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Notification({ icon, title, body, duration = 5000, onDismiss }) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!visible) return null

  return (
    <div className="notification" onClick={() => { setVisible(false); onDismiss?.() }}>
      <div className="notification-header">
        <span className="notification-icon">{icon || '🔔'}</span>
        <span className="notification-title">{title}</span>
      </div>
      <div className="notification-body">{body}</div>
      <div className="notification-time">{t.notification.justNow}</div>
    </div>
  )
}
