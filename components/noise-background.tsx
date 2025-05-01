"use client"

import { useEffect, useRef } from "react"

export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Only draw if dimensions are valid
      if (canvas.width > 0 && canvas.height > 0) {
        draw()
      }
    }

    const draw = () => {
      // Safety check to ensure dimensions are valid
      if (!canvas.width || !canvas.height) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      try {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value
          data[i + 1] = value
          data[i + 2] = value
          data[i + 3] = 5 // Very low alpha for subtle noise
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (error) {
        console.error("Error rendering noise background:", error)
      }
    }

    // Ensure the canvas is properly sized before initial draw
    const initialSetup = () => {
      if (document.readyState === "complete") {
        resize()
      } else {
        window.addEventListener("load", resize, { once: true })
      }
    }

    initialSetup()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("load", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-overlay z-0"
    />
  )
}
