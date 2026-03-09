import { useState, useRef, useCallback, useEffect } from 'react'

export default function Window({
  id,
  title,
  icon,
  children,
  defaultPos,
  defaultSize,
  focused,
  onFocus,
  onClose,
  onMinimize,
}) {
  const [pos, setPos] = useState(defaultPos || { x: 100, y: 60 })
  const [size, setSize] = useState(defaultSize || { w: 600, h: 450 })
  const [maximized, setMaximized] = useState(false)
  const [prevState, setPrevState] = useState(null)
  const dragRef = useRef(null)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.window-controls')) return
    isDragging.current = true
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragOffset.current = {
      x: clientX - pos.x,
      y: clientY - pos.y,
    }
    onFocus?.(id)
    e.preventDefault()
  }, [pos, id, onFocus])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      setPos({
        x: clientX - dragOffset.current.x,
        y: Math.max(0, clientY - dragOffset.current.y),
      })
    }
    const handleMouseUp = () => {
      isDragging.current = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove, { passive: false })
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [])

  const handleMaximize = useCallback(() => {
    if (maximized) {
      if (prevState) {
        setPos(prevState.pos)
        setSize(prevState.size)
      }
      setMaximized(false)
    } else {
      setPrevState({ pos, size })
      setPos({ x: 0, y: 0 })
      setSize({ w: window.innerWidth, h: window.innerHeight - 48 })
      setMaximized(true)
    }
  }, [maximized, pos, size, prevState])

  const style = maximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100vh - 48px)', borderRadius: 0 }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h }

  return (
    <div
      ref={dragRef}
      className={`window ${focused ? 'focused' : ''}`}
      style={{ ...style, zIndex: focused ? 100 : 50 }}
      onMouseDown={() => onFocus?.(id)}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
        <div className="window-title">
          <span className="window-title-icon">{icon}</span>
          <span className="window-title-text">{title}</span>
        </div>
        <div className="window-controls">
          <button
            className="window-btn window-btn-minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize?.(id) }}
            title="Minimize"
          />
          <button
            className="window-btn window-btn-maximize"
            onClick={(e) => { e.stopPropagation(); handleMaximize() }}
            title={maximized ? 'Restore' : 'Maximize'}
          />
          <button
            className="window-btn window-btn-close"
            onClick={(e) => { e.stopPropagation(); onClose?.(id) }}
            title="Close"
          />
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}
