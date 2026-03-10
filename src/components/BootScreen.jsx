import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function BootScreen({ onComplete }) {
  const { t } = useLanguage()
  const b = t.boot
  const [stage, setStage] = useState('bios') // bios | loading
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadingMsg, setLoadingMsg] = useState(b.loadingMessages[0])

  const skipBoot = useCallback(() => {
    onComplete()
  }, [onComplete])

  // BIOS text animation
  useEffect(() => {
    if (stage !== 'bios') return
    if (visibleLines < b.biosLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
      }, 60 + Math.random() * 40)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setStage('loading'), 600)
      return () => clearTimeout(timer)
    }
  }, [stage, visibleLines, b.biosLines.length])

  // Loading bar animation
  useEffect(() => {
    if (stage !== 'loading') return
    if (progress < 100) {
      const increment = Math.random() * 8 + 2
      const delay = Math.random() * 200 + 50
      const timer = setTimeout(() => {
        const newProgress = Math.min(progress + increment, 100)
        setProgress(newProgress)
        const msgIndex = Math.floor((newProgress / 100) * b.loadingMessages.length)
        setLoadingMsg(b.loadingMessages[Math.min(msgIndex, b.loadingMessages.length - 1)])
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [stage, progress, onComplete, b.loadingMessages])

  return (
    <div className="boot-screen" onClick={skipBoot}>
      {stage === 'bios' && (
        <div className="boot-bios fade-in">
          {b.biosLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`bios-line ${line.cls}`}
              style={{ animationDelay: `${i * 0.02}s` }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
        </div>
      )}

      {stage === 'loading' && (
        <div className="boot-loader fade-in">
          <div className="boot-logo">{b.portfolioOS}</div>
          <div className="boot-progress-container">
            <div
              className="boot-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="boot-status">{loadingMsg}</div>
        </div>
      )}

      <div className="boot-skip">
        {b.clickToSkip}
      </div>
    </div>
  )
}
