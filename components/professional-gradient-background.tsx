"use client"

import { useEffect, useRef } from "react"

export default function ProfessionalGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw()
    }

    const draw = () => {
      // Create a gradient from top to bottom
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8,
      )

      // Professional dark gradient with subtle teal accent
      gradient.addColorStop(0, "rgba(10, 25, 30, 1)")
      gradient.addColorStop(0.4, "rgba(5, 15, 20, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      // Fill the background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.5,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 1.1,
      )
      vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      vignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")

      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle accent lines
      ctx.strokeStyle = "rgba(20, 184, 166, 0.05)"
      ctx.lineWidth = 1

      // Horizontal accent lines
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 6) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical accent lines
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
}
