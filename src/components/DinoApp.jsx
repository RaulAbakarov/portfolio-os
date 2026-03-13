import { useEffect, useRef, useState, useCallback } from 'react'

const GRAVITY = 0.6
const JUMP_FORCE = -10
const GROUND_HEIGHT = 40
const DINO_WIDTH = 40
const DINO_HEIGHT = 44
const OBSTACLE_WIDTH = 20
const OBSTACLE_MIN_HEIGHT = 30
const OBSTACLE_MAX_HEIGHT = 50
const OBSTACLE_SPEED_INITIAL = 4
const SPAWN_INTERVAL_INITIAL = 1500

export default function DinoApp() {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const animRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)

  const resetGame = useCallback(() => {
    gameRef.current = {
      dino: { x: 50, y: 0, vy: 0, jumping: false, frame: 0 },
      obstacles: [],
      score: 0,
      speed: OBSTACLE_SPEED_INITIAL,
      lastSpawn: 0,
      spawnInterval: SPAWN_INTERVAL_INITIAL,
      groundOffset: 0,
      time: 0,
    }
    setScore(0)
    setGameOver(false)
  }, [])

  const jump = useCallback(() => {
    if (!started) {
      setStarted(true)
      resetGame()
      return
    }
    if (gameOver) {
      resetGame()
      setStarted(true)
      return
    }
    const g = gameRef.current
    if (g && !g.dino.jumping) {
      g.dino.vy = JUMP_FORCE
      g.dino.jumping = true
    }
  }, [started, gameOver, resetGame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [jump])

  useEffect(() => {
    if (!started || gameOver) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (!gameRef.current) resetGame()

    const loop = (timestamp) => {
      const g = gameRef.current
      if (!g) return
      const w = canvas.width
      const h = canvas.height
      const groundY = h - GROUND_HEIGHT

      // Update dino
      g.dino.vy += GRAVITY
      g.dino.y += g.dino.vy
      if (g.dino.y >= 0) {
        g.dino.y = 0
        g.dino.vy = 0
        g.dino.jumping = false
      }
      g.dino.frame++

      // Speed ramp
      g.time++
      g.speed = OBSTACLE_SPEED_INITIAL + g.time * 0.002
      g.spawnInterval = Math.max(600, SPAWN_INTERVAL_INITIAL - g.time * 0.5)

      // Spawn obstacles
      if (!g.lastSpawn || timestamp - g.lastSpawn > g.spawnInterval) {
        const oh = OBSTACLE_MIN_HEIGHT + Math.random() * (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT)
        g.obstacles.push({ x: w, h: oh })
        g.lastSpawn = timestamp
      }

      // Move obstacles
      g.obstacles = g.obstacles.filter(o => {
        o.x -= g.speed
        return o.x > -OBSTACLE_WIDTH
      })

      // Collision
      const dinoBox = {
        x: g.dino.x + 4,
        y: groundY + g.dino.y - DINO_HEIGHT + 4,
        w: DINO_WIDTH - 8,
        h: DINO_HEIGHT - 4,
      }
      for (const o of g.obstacles) {
        const oBox = { x: o.x, y: groundY - o.h, w: OBSTACLE_WIDTH, h: o.h }
        if (
          dinoBox.x < oBox.x + oBox.w &&
          dinoBox.x + dinoBox.w > oBox.x &&
          dinoBox.y + dinoBox.h > oBox.y &&
          dinoBox.y < oBox.y + oBox.h
        ) {
          setGameOver(true)
          return
        }
      }

      // Score
      g.score += 0.1
      setScore(Math.floor(g.score))

      // Ground scroll
      g.groundOffset = (g.groundOffset + g.speed) % 20

      // Draw
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, w, h)

      // Ground
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, groundY)
      ctx.lineTo(w, groundY)
      ctx.stroke()

      // Ground texture
      ctx.strokeStyle = 'rgba(0,255,136,0.2)'
      for (let i = -g.groundOffset; i < w; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, groundY + 5)
        ctx.lineTo(i + 10, groundY + 5)
        ctx.stroke()
      }

      // Dino
      const dx = g.dino.x
      const dy = groundY + g.dino.y - DINO_HEIGHT
      ctx.fillStyle = '#00ff88'

      // Body
      ctx.fillRect(dx + 8, dy + 4, 24, 28)
      // Head
      ctx.fillRect(dx + 20, dy, 20, 16)
      // Eye
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(dx + 32, dy + 4, 4, 4)
      ctx.fillStyle = '#00ff88'
      // Tail
      ctx.fillRect(dx, dy + 12, 10, 6)
      // Legs (animated)
      if (g.dino.jumping) {
        ctx.fillRect(dx + 12, dy + 32, 6, 12)
        ctx.fillRect(dx + 24, dy + 32, 6, 12)
      } else if (Math.floor(g.dino.frame / 8) % 2 === 0) {
        ctx.fillRect(dx + 12, dy + 32, 6, 12)
        ctx.fillRect(dx + 24, dy + 36, 6, 8)
      } else {
        ctx.fillRect(dx + 12, dy + 36, 6, 8)
        ctx.fillRect(dx + 24, dy + 32, 6, 12)
      }

      // Obstacles (cacti)
      ctx.fillStyle = '#00ff88'
      for (const o of g.obstacles) {
        const ox = o.x
        const oy = groundY - o.h
        ctx.fillRect(ox + 4, oy, 12, o.h)
        ctx.fillRect(ox, oy + 8, OBSTACLE_WIDTH, 6)
      }

      // Score
      ctx.fillStyle = '#00ff88'
      ctx.font = '14px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`Score: ${Math.floor(g.score)}`, w - 10, 24)

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [started, gameOver, resetGame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }
    resize()
    const obs = new ResizeObserver(resize)
    obs.observe(canvas.parentElement)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', background: '#1a1a2e', cursor: 'pointer' }}
      onClick={jump}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {!started && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#00ff88', fontFamily: 'monospace',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🦕</div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>DINO GAME</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Press SPACE or click to start</div>
        </div>
      )}
      {gameOver && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: 'rgba(26,26,46,0.85)',
          color: '#00ff88', fontFamily: 'monospace',
        }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>GAME OVER</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>Score: {score}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Press SPACE or click to restart</div>
        </div>
      )}
    </div>
  )
}
