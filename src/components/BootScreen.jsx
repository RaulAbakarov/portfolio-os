import { useState, useEffect, useCallback } from 'react'

const BIOS_LINES = [
  { text: 'RAUL BIOS v3.14.159 — Personality Module Loaded', cls: 'accent' },
  { text: 'Copyright (c) 2024-2026 Raul Systems Inc.', cls: '' },
  { text: '─────────────────────────────────────────────', cls: '' },
  { text: '', cls: '' },
  { text: 'CPU: Brain™ Core i∞ @ 3.2GHz (Overcaffeinated Mode)', cls: '' },
  { text: 'RAM: 128GB DDR5 (64GB reserved for Stack Overflow tabs)', cls: '' },
  { text: 'GPU: Imagination RTX 9090 Ti', cls: '' },
  { text: 'DISK: ∞ TB of ambition (67% fragmented)', cls: '' },
  { text: '', cls: '' },
  { text: 'Detecting peripherals...', cls: '' },
  { text: '  ✓ Keyboard: Mechanical (annoyingly loud)', cls: 'accent' },
  { text: '  ✓ Monitor: Ultrawide (for extra procrastination)', cls: 'accent' },
  { text: '  ✓ Coffee Machine: Connected (IV drip mode)', cls: 'accent' },
  { text: '  ✗ Social Life: NOT FOUND', cls: 'danger' },
  { text: '', cls: '' },
  { text: 'Loading personality modules...', cls: '' },
  { text: '  ✓ humor.dll loaded (version: dad-jokes-2.0)', cls: 'accent' },
  { text: '  ✓ caffeine_dependency.sys mounted', cls: 'accent' },
  { text: '  ✓ imposter_syndrome.exe running in background', cls: 'warning' },
  { text: '  ✓ neovim_config.lua — 847th revision loaded', cls: 'accent' },
  { text: '', cls: '' },
  { text: 'Running diagnostics...', cls: '' },
  { text: '  WARNING: Developer found editing code at 3 AM', cls: 'warning' },
  { text: '  WARNING: Excessive git commit history detected', cls: 'warning' },
  { text: '  CRITICAL: Coffee levels dangerously low', cls: 'danger' },
  { text: '', cls: '' },
  { text: 'All systems operational. Booting RAUL OS...', cls: 'accent' },
]

const LOADING_MESSAGES = [
  'Initializing creative engine...',
  'Compiling portfolio assets...',
  'Loading 847 npm packages you\'ll never use...',
  'Downloading more RAM...',
  'Asking ChatGPT for life advice...',
  'Rebasing on main (fingers crossed)...',
  'Fetching projects from the void...',
  'Calibrating pixel-perfect alignment...',
  'Warming up the code generators...',
  'Almost there (famous last words)...',
  'Deploying to production on a Friday...',
  'System ready.',
]

export default function BootScreen({ onComplete }) {
  const [stage, setStage] = useState('bios') // bios | loading
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])

  const skipBoot = useCallback(() => {
    onComplete()
  }, [onComplete])

  // BIOS text animation
  useEffect(() => {
    if (stage !== 'bios') return
    if (visibleLines < BIOS_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
      }, 60 + Math.random() * 40)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setStage('loading'), 600)
      return () => clearTimeout(timer)
    }
  }, [stage, visibleLines])

  // Loading bar animation
  useEffect(() => {
    if (stage !== 'loading') return
    if (progress < 100) {
      const increment = Math.random() * 8 + 2
      const delay = Math.random() * 200 + 50
      const timer = setTimeout(() => {
        const newProgress = Math.min(progress + increment, 100)
        setProgress(newProgress)
        const msgIndex = Math.floor((newProgress / 100) * LOADING_MESSAGES.length)
        setLoadingMsg(LOADING_MESSAGES[Math.min(msgIndex, LOADING_MESSAGES.length - 1)])
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [stage, progress, onComplete])

  return (
    <div className="boot-screen" onClick={skipBoot}>
      {stage === 'bios' && (
        <div className="boot-bios fade-in">
          {BIOS_LINES.slice(0, visibleLines).map((line, i) => (
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
          <div className="boot-logo">RAUL OS</div>
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
        Click anywhere to skip ›
      </div>
    </div>
  )
}
