import { useState, useCallback, lazy, Suspense } from 'react'
import BootScreen from './components/BootScreen'

const Desktop = lazy(() => import('./components/Desktop'))
const BSOD = lazy(() => import('./components/BSOD'))

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
    return (
      <Suspense fallback={null}>
        <BSOD message={bsodMessage} onDismiss={dismissBSOD} />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={null}>
      <Desktop triggerBSOD={triggerBSOD} />
    </Suspense>
  )
}
