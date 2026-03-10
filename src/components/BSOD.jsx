import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function BSOD({ message, onDismiss }) {
  const { t } = useLanguage()
  const b = t.bsod
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (percent < 100) {
      const timer = setTimeout(() => {
        setPercent(p => Math.min(p + Math.floor(Math.random() * 15) + 1, 100))
      }, 200 + Math.random() * 400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onDismiss, 1500)
      return () => clearTimeout(timer)
    }
  }, [percent, onDismiss])

  const qrPattern = [
    [1,1,1,0,1,0,1,1],
    [1,0,1,1,0,1,0,1],
    [1,1,1,0,0,1,1,1],
    [0,0,0,1,1,0,0,0],
    [1,0,1,1,0,1,0,1],
    [0,1,0,0,1,0,1,0],
    [1,1,1,0,1,1,1,1],
    [1,0,1,1,0,1,0,1],
  ]

  return (
    <div className="bsod" onClick={onDismiss}>
      <div className="bsod-emoticon">:(</div>
      <h2>{b.title}</h2>
      <p>
        {b.collecting}
        <br /><br />
        {percent}% {b.complete}
      </p>
      <p className="bsod-small">
        {b.stopCode} {message}
        <br />
        {b.searchOnline}
      </p>
      <div className="bsod-qr">
        {qrPattern.flat().map((cell, i) => (
          <div key={i} className={`bsod-qr-cell ${cell ? '' : 'empty'}`} />
        ))}
      </div>
      <p className="bsod-small" style={{ marginTop: 20 }}>
        {b.clickToReboot}
      </p>
    </div>
  )
}
