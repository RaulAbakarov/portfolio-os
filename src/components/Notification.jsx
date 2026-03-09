import { useState, useEffect } from 'react'

export default function Notification({ icon, title, body, duration = 5000, onDismiss }) {
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
      <div className="notification-time">Just now</div>
    </div>
  )
}
