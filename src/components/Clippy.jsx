import { useState, useEffect } from 'react'

const MESSAGES = [
  "It looks like you're building a portfolio! Would you like help with that?",
  "Did you know? Raul can exit Vim. In under 2 seconds. That's power.",
  "Pro tip: Try typing 'sudo rm -rf /' in the terminal. Trust me. 😏",
  "I notice you haven't hired Raul yet. That seems like a bug.",
  "Fun fact: This portfolio was built at 3 AM fueled entirely by coffee.",
  "Have you tried turning it off and on again? Just kidding. Don't close this.",
  "📎 I see you're reading the portfolio. Based on my analysis: Raul is cool.",
  "Warning: Prolonged exposure to this portfolio may cause an irresistible urge to collaborate.",
  "I'm not just a paperclip anymore. I've been upgraded to a full AI assistant. Still annoying though.",
]

export default function Clippy({ onDismiss }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
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
        onClick={() => setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])}
        title="Click for more wisdom"
      >
        📎
      </div>
    </div>
  )
}
