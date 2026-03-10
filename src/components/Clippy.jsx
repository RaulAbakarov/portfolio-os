import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Clippy({ onDismiss }) {
  const { t } = useLanguage()
  const msgs = t.clippy.messages
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setMessage(msgs[Math.floor(Math.random() * msgs.length)])
  }, [])

  if (!visible) return null

  return (
    <div className="clippy">
      <div className="clippy-bubble">
        <button className="clippy-close" onClick={() => { setVisible(false); onDismiss?.() }}>✕</button>
        {message}
      </div>
      <div
        className="clippy-body"
        onClick={() => setMessage(msgs[Math.floor(Math.random() * msgs.length)])}
        title={t.clippy.clickForWisdom}
      >
        📎
      </div>
    </div>
  )
}
