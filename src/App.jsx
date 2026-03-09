import { useState, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import BSOD from './components/BSOD'

export default function App() {
  const [phase, setPhase] = useState('boot') // boot | desktop | bsod
  const [bsodMessage, setBsodMessage] = useState('')

  const handleBootComplete = useCallback(() => {
    setPhase('desktop')
  }, [])

  const triggerBSOD = useCallback((msg) => {
    setBsodMessage(msg || 'CRITICAL_PORTFOLIO_OVERLOAD')
    setPhase('bsod')
  }, [])

  const dismissBSOD = useCallback(() => {
    setPhase('desktop')
  }, [])

  if (phase === 'boot') {
    return <BootScreen onComplete={handleBootComplete} />
  }

  if (phase === 'bsod') {
    return <BSOD message={bsodMessage} onDismiss={dismissBSOD} />
  }

  return <Desktop triggerBSOD={triggerBSOD} />
}
