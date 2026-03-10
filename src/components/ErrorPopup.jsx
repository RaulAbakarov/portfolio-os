import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ErrorPopup({ onClose }) {
  const { t } = useLanguage()
  const ep = t.errorPopup
  const [error] = useState(() => ep.messages[Math.floor(Math.random() * ep.messages.length)])
  const [position] = useState(() => ({
    top: 100 + Math.random() * 200,
    left: 100 + Math.random() * (window.innerWidth - 500),
  }))

  return (
    <div className="error-popup" style={{ top: position.top, left: position.left }}>
      <div className="error-popup-inner">
        <div className="error-popup-titlebar">
          <span className="error-popup-title">{error.title}</span>
          <button className="error-popup-close" onClick={onClose}>✕</button>
        </div>
        <div className="error-popup-body">
          <span className="error-popup-icon">⚠️</span>
          <div className="error-popup-message">
            <strong>{error.heading}</strong>
            {error.body}
          </div>
        </div>
        <div className="error-popup-actions">
          <button className="error-popup-btn" onClick={onClose}>{ep.ignore}</button>
          <button className="error-popup-btn primary" onClick={onClose}>{ep.okCool}</button>
        </div>
      </div>
    </div>
  )
}
