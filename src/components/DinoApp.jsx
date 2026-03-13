import { useEffect, useRef, useState, useCallback } from 'react'

const GRAVITY = 1800
const JUMP_FORCE = -620
const GROUND_HEIGHT = 40
const DINO_WIDTH = 40
const DINO_HEIGHT = 44
const OBSTACLE_WIDTH = 20
const OBSTACLE_MIN_H = 30
const OBSTACLE_MAX_H = 50
const BASE_SPEED = 260
const SPAWN_BASE = 1.5
const SPAWN_MIN = 0.55

// Pre-render a sprite onto an offscreen canvas, returns the canvas
function createSprite(w, h, drawFn) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  drawFn(c.getContext('2d'))
  return c
}

// Dino running frames and jump frame, drawn once
function buildDinoSprites() {
  const W = 44, H = 48
  const draw = (ctx, legFrame) => {
    ctx.fillStyle = '#00ff88'
    // Head
    ctx.fillRect(22, 0, 22, 18)
    // Jaw
    ctx.fillRect(28, 14, 16, 6)
    // Eye
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(36, 4, 4, 4)
    ctx.fillStyle = '#00ff88'
    // Neck + body
    ctx.fillRect(14, 14, 20, 8)
    ctx.fillRect(8, 18, 28, 20)
    // Arm
    ctx.fillRect(30, 24, 4, 10)
    ctx.fillRect(30, 32, 6, 4)
    // Tail
    ctx.fillRect(2, 18, 8, 6)
    ctx.fillRect(0, 16, 4, 6)
    // Legs
    if (legFrame === 0) {
      // Both down (jump pose)
      ctx.fillRect(14, 38, 6, 10)
      ctx.fillRect(26, 38, 6, 10)
    } else if (legFrame === 1) {
      ctx.fillRect(14, 38, 6, 10)
      ctx.fillRect(26, 38, 6, 6)
    } else {
      ctx.fillRect(14, 38, 6, 6)
      ctx.fillRect(26, 38, 6, 10)
    }
  }
  return {
    run1: createSprite(W, H, ctx => draw(ctx, 1)),
    run2: createSprite(W, H, ctx => draw(ctx, 2)),
    jump: createSprite(W, H, ctx => draw(ctx, 0)),
    w: W,
    h: H,
  }
}

function buildCactusSprite(h) {
  const W = OBSTACLE_WIDTH
  return createSprite(W, h, ctx => {
    ctx.fillStyle = '#00ff88'
    // Main trunk
    ctx.fillRect(6, 0, 8, h)
    // Left arm
    if (h > 35) {
      ctx.fillRect(0, Math.floor(h * 0.3), 6, 6)
      ctx.fillRect(0, Math.floor(h * 0.3), 4, 12)
    }
    // Right arm
    if (h > 30) {
      ctx.fillRect(14, Math.floor(h * 0.45), 6, 6)
      ctx.fillRect(16, Math.floor(h * 0.45) - 6, 4, 12)
    }
  })
}

export default function DinoApp() {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const animRef = useRef(null)
  const spritesRef = useRef(null)
  const cactusCache = useRef({})
  const scoreRef = useRef(0)
  const [displayScore, setDisplayScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)

  // Build sprites once
  if (!spritesRef.current) {
    spritesRef.current = buildDinoSprites()
  }

  const getCactus = useCallback((h) => {
    const key = h | 0
    if (!cactusCache.current[key]) {
      cactusCache.current[key] = buildCactusSprite(key)
    }
    return cactusCache.current[key]
  }, [])

  const resetGame = useCallback(() => {
    gameRef.current = {
      dino: { x: 50, y: 0, vy: 0, jumping: false, runTimer: 0 },
      obstacles: [],
      score: 0,
      speed: BASE_SPEED,
      spawnTimer: 0,
      spawnInterval: SPAWN_BASE,
      groundOffset: 0,
      elapsed: 0,
    }
    scoreRef.current = 0
    setDisplayScore(0)
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

  // Keyboard + touch input
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    const onTouch = (e) => {
      e.preventDefault()
      jump()
    }

    window.addEventListener('keydown', onKey)
    canvas.addEventListener('touchstart', onTouch, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('touchstart', onTouch)
    }
  }, [jump])

  // Canvas resize with DPR
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const obs = new ResizeObserver(resize)
    obs.observe(canvas.parentElement)
    return () => obs.disconnect()
  }, [])

  // Game loop with delta time
  useEffect(() => {
    if (!started || gameOver) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!gameRef.current) resetGame()

    const sprites = spritesRef.current
    let prevTime = 0

    const loop = (timestamp) => {
      if (!prevTime) prevTime = timestamp
      const rawDt = (timestamp - prevTime) / 1000
      // Cap delta to prevent spiral-of-death on tab switch
      const dt = Math.min(rawDt, 0.05)
      prevTime = timestamp

      const g = gameRef.current
      if (!g) return

      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const groundY = h - GROUND_HEIGHT

      // Physics
      g.dino.vy += GRAVITY * dt
      g.dino.y += g.dino.vy * dt
      if (g.dino.y >= 0) {
        g.dino.y = 0
        g.dino.vy = 0
        g.dino.jumping = false
      }
      g.dino.runTimer += dt

      // Difficulty ramp
      g.elapsed += dt
      g.speed = BASE_SPEED + g.elapsed * 8
      g.spawnInterval = Math.max(SPAWN_MIN, SPAWN_BASE - g.elapsed * 0.02)

      // Spawn
      g.spawnTimer += dt
      if (g.spawnTimer >= g.spawnInterval) {
        const oh = (OBSTACLE_MIN_H + Math.random() * (OBSTACLE_MAX_H - OBSTACLE_MIN_H)) | 0
        g.obstacles.push({ x: w + 10, h: oh })
        g.spawnTimer = 0
      }

      // Move obstacles
      const moveAmt = g.speed * dt
      let i = 0
      while (i < g.obstacles.length) {
        g.obstacles[i].x -= moveAmt
        if (g.obstacles[i].x < -OBSTACLE_WIDTH) {
          g.obstacles.splice(i, 1)
        } else {
          i++
        }
      }

      // Collision (tight hitbox)
      const dx = g.dino.x
      const dy = groundY + g.dino.y - sprites.h
      const hb = { x: dx + 8, y: dy + 6, w: sprites.w - 16, h: sprites.h - 10 }
      for (const o of g.obstacles) {
        if (
          hb.x < o.x + OBSTACLE_WIDTH - 2 &&
          hb.x + hb.w > o.x + 2 &&
          hb.y + hb.h > groundY - o.h &&
          hb.y < groundY
        ) {
          setGameOver(true)
          return
        }
      }

      // Score — only update React state when integer changes
      g.score += dt * 10
      const rounded = Math.floor(g.score)
      if (rounded !== scoreRef.current) {
        scoreRef.current = rounded
        setDisplayScore(rounded)
      }

      // Ground scroll
      g.groundOffset = (g.groundOffset + moveAmt) % 20

      // === DRAW ===
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, w, h)

      // Ground line
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, groundY)
      ctx.lineTo(w, groundY)
      ctx.stroke()

      // Ground dashes
      ctx.strokeStyle = 'rgba(0,255,136,0.2)'
      ctx.beginPath()
      for (let gx = -g.groundOffset; gx < w; gx += 20) {
        ctx.moveTo(gx, groundY + 5)
        ctx.lineTo(gx + 10, groundY + 5)
      }
      ctx.stroke()

      // Dino sprite
      let sprite
      if (g.dino.jumping) {
        sprite = sprites.jump
      } else if (Math.floor(g.dino.runTimer * 8) % 2 === 0) {
        sprite = sprites.run1
      } else {
        sprite = sprites.run2
      }
      ctx.drawImage(sprite, dx, dy)

      // Obstacles (cached sprites)
      for (const o of g.obstacles) {
        const cactus = getCactus(o.h)
        ctx.drawImage(cactus, o.x, groundY - o.h)
      }

      // Score text
      ctx.fillStyle = '#00ff88'
      ctx.font = '14px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`Score: ${rounded}`, w - 10, 24)

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [started, gameOver, resetGame, getCactus])

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', background: '#1a1a2e', cursor: 'pointer', touchAction: 'none' }}
      onClick={jump}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {!started && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#00ff88', fontFamily: 'monospace',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🦖</div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>DINO GAME</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Press SPACE or tap to start</div>
        </div>
      )}
      {gameOver && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: 'rgba(26,26,46,0.85)',
          color: '#00ff88', fontFamily: 'monospace',
        }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>GAME OVER</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>Score: {displayScore}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Press SPACE or tap to restart</div>
        </div>
      )}
    </div>
  )
}
