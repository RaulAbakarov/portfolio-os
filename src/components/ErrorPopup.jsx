import { useState, useEffect } from 'react'

const ERROR_MESSAGES = [
  {
    title: '⚠️ Warning',
    heading: 'Too Much Talent Detected',
    body: 'The system has detected an unusually high concentration of developer talent in this portfolio. This may cause feelings of admiration or an overwhelming urge to reach out.',
  },
  {
    title: '🛡️ Security Alert',
    heading: 'Visitor Identity Verified',
    body: 'Welcome, fellow human! Our advanced AI has determined you are NOT a robot. Probably. We\'re 73% sure. Okay, 42%.',
  },
  {
    title: '⚙️ System Notice',
    heading: 'Coffee Levels Critical',
    body: 'The developer\'s caffeine reserves are running dangerously low. Portfolio performance may degrade. Please send espresso to Baku, Azerbaijan.',
  },
  {
    title: '🔔 Notification',
    heading: 'New Achievement Unlocked!',
    body: 'Achievement: "Curiosity Killed the Cat" — You\'ve been exploring this portfolio for a while. We see you. We appreciate you.',
  },
  {
    title: '🐛 Bug Report',
    heading: 'Feature, Not a Bug',
    body: 'The absurdity you\'re experiencing is intentional. This is a feature-rich portfolio with premium-grade chaos included at no extra cost.',
  },
]

export default function ErrorPopup({ onClose }) {
  const [error] = useState(() => ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)])
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
          <button className="error-popup-btn" onClick={onClose}>Ignore</button>
          <button className="error-popup-btn primary" onClick={onClose}>OK, Cool</button>
        </div>
      </div>
    </div>
  )
}
