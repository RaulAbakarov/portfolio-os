import { useState, useEffect } from 'react'

export default function BSOD({ message, onDismiss }) {
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
      <h2>Your portfolio ran into a problem.</h2>
      <p>
        We're just collecting some error info, and then we'll restart for you.
        <br /><br />
        {percent}% complete
      </p>
      <p className="bsod-small">
        Stop code: {message}
        <br />
        If you'd like to know more, search online for: "why did I click that"
      </p>
      <div className="bsod-qr">
        {qrPattern.flat().map((cell, i) => (
          <div key={i} className={`bsod-qr-cell ${cell ? '' : 'empty'}`} />
        ))}
      </div>
      <p className="bsod-small" style={{ marginTop: 20 }}>
        Click anywhere to reboot...
      </p>
    </div>
  )
}
