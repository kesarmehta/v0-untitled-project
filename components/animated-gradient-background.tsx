"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isActive, setIsActive] = useState(false)
  const meshPointsRef = useRef<
    Array<{
      x: number
      y: number
      baseX: number
      baseY: number
      connections: number[]
      highlighted: boolean
      highlightIntensity: number
    }>
  >([])
  const meshLinesRef = useRef<Array<{ from: number; to: number; opacity: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Initialize mesh grid
    const initMesh = () => {
      const points = []
      const lines = []
      const gridSize = Math.min(canvas.width, canvas.height) > 1000 ? 30 : 20 // Adjust grid density based on screen size
      const cellWidth = canvas.width / gridSize
      const cellHeight = canvas.height / gridSize

      // Create slightly randomized grid points
      for (let y = 0; y <= gridSize; y++) {
        for (let x = 0; x <= gridSize; x++) {
          const randomOffsetX = (Math.random() - 0.5) * (cellWidth * 0.5)
          const randomOffsetY = (Math.random() - 0.5) * (cellHeight * 0.5)

          const baseX = x * cellWidth
          const baseY = y * cellHeight

          points.push({
            x: baseX + randomOffsetX,
            y: baseY + randomOffsetY,
            baseX: baseX,
            baseY: baseY,
            connections: [],
            highlighted: false,
            highlightIntensity: 0,
          })
        }
      }

      // Create connections between points
      const pointCount = points.length
      const maxDistance = Math.sqrt(cellWidth * cellWidth + cellHeight * cellHeight) * 1.5

      for (let i = 0; i < pointCount; i++) {
        for (let j = i + 1; j < pointCount; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            points[i].connections.push(j)
            points[j].connections.push(i)

            lines.push({
              from: i,
              to: j,
              opacity: 1 - distance / maxDistance,
            })
          }
        }
      }

      meshPointsRef.current = points
      meshLinesRef.current = lines
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initMesh()
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
      setIsActive(true)

      // Reset active state after 2 seconds of no movement
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => setIsActive(false), 2000)
    }

    let mouseTimeout: NodeJS.Timeout

    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw base gradient
      const baseGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8,
      )

      baseGradient.addColorStop(0, "rgba(0, 20, 25, 1)")
      baseGradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouseX = mousePosition.x * canvas.width
      const mouseY = mousePosition.y * canvas.height

      // Update mesh points - subtle attraction to mouse
      meshPointsRef.current.forEach((point, index) => {
        const dx = mouseX - point.x
        const dy = mouseY - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 300

        // Reset highlight intensity
        point.highlighted = false
        point.highlightIntensity = Math.max(0, point.highlightIntensity - 0.05)

        if (isActive && distance < maxDistance) {
          // Highlight points near mouse
          point.highlighted = true
          point.highlightIntensity = Math.min(1, point.highlightIntensity + 0.1)

          // Very subtle attraction
          const force = 0.01 * (1 - distance / maxDistance)
          point.x += dx * force
          point.y += dy * force
        } else if (!isActive) {
          // Very slowly return to original position when mouse is inactive
          const returnSpeed = 0.002
          point.x += (point.baseX - point.x) * returnSpeed
          point.y += (point.baseY - point.y) * returnSpeed
        }
      })

      // Draw mesh lines
      meshLinesRef.current.forEach((line) => {
        const fromPoint = meshPointsRef.current[line.from]
        const toPoint = meshPointsRef.current[line.to]

        // Calculate line opacity based on points' highlight state
        let lineOpacity = line.opacity * 0.15 // Base opacity for all lines

        if (fromPoint.highlighted || toPoint.highlighted) {
          // Increase opacity for highlighted lines
          const highlightFactor = Math.max(fromPoint.highlightIntensity, toPoint.highlightIntensity)
          lineOpacity = Math.min(1, lineOpacity + highlightFactor * 0.7)
        }

        // Draw line with gradient
        const gradient = ctx.createLinearGradient(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y)

        if (fromPoint.highlighted && toPoint.highlighted) {
          // Both points highlighted - use luxury gradient
          gradient.addColorStop(0, `rgba(20, 184, 166, ${lineOpacity})`) // teal
          gradient.addColorStop(1, `rgba(5, 150, 105, ${lineOpacity})`) // emerald
        } else if (fromPoint.highlighted) {
          // Only from point highlighted
          gradient.addColorStop(0, `rgba(20, 184, 166, ${lineOpacity})`) // teal
          gradient.addColorStop(1, `rgba(255, 255, 255, ${lineOpacity * 0.3})`) // fade to white
        } else if (toPoint.highlighted) {
          // Only to point highlighted
          gradient.addColorStop(0, `rgba(255, 255, 255, ${lineOpacity * 0.3})`) // fade from white
          gradient.addColorStop(1, `rgba(20, 184, 166, ${lineOpacity})`) // teal
        } else {
          // No points highlighted - subtle white/gray
          gradient.addColorStop(0, `rgba(255, 255, 255, ${lineOpacity * 0.5})`)
          gradient.addColorStop(1, `rgba(200, 200, 200, ${lineOpacity * 0.5})`)
        }

        ctx.beginPath()
        ctx.moveTo(fromPoint.x, fromPoint.y)
        ctx.lineTo(toPoint.x, toPoint.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = fromPoint.highlighted || toPoint.highlighted ? 0.8 : 0.5
        ctx.stroke()
      })

      // Draw mesh points
      meshPointsRef.current.forEach((point) => {
        let pointSize = 1.5
        let pointOpacity = 0.3

        if (point.highlighted) {
          // Highlighted points are larger and brighter
          pointSize = 2.5 + point.highlightIntensity * 1.5
          pointOpacity = 0.3 + point.highlightIntensity * 0.7
        }

        // Draw point glow
        const glowSize = pointSize * 3
        const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, glowSize)

        if (point.highlighted) {
          glowGradient.addColorStop(0, `rgba(20, 184, 166, ${pointOpacity})`)
          glowGradient.addColorStop(1, "rgba(20, 184, 166, 0)")
        } else {
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${pointOpacity * 0.5})`)
          glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        }

        ctx.beginPath()
        ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2)
        ctx.fillStyle = point.highlighted
          ? `rgba(20, 184, 166, ${pointOpacity})`
          : `rgba(255, 255, 255, ${pointOpacity})`
        ctx.fill()
      })

      // Draw mouse interaction
      if (isActive) {
        const rippleSize = 50 + Math.sin(time * 5) * 10
        const rippleGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, rippleSize)

        rippleGradient.addColorStop(0, "rgba(20, 184, 166, 0.2)")
        rippleGradient.addColorStop(0.5, "rgba(20, 184, 166, 0.1)")
        rippleGradient.addColorStop(1, "rgba(20, 184, 166, 0)")

        ctx.beginPath()
        ctx.arc(mouseX, mouseY, rippleSize, 0, Math.PI * 2)
        ctx.fillStyle = rippleGradient
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(mouseTimeout)
    }
  }, [mousePosition, isActive])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
