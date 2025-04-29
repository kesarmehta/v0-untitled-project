"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  type: "circle" | "square" | "triangle"
  delay: number
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 100 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert to normalized values between -1 and 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const colors = [
      "rgba(20, 184, 166, 0.2)", // teal-500
      "rgba(5, 150, 105, 0.2)", // emerald-600
      "rgba(8, 145, 178, 0.2)", // cyan-600
    ]

    const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    const newShapes: Shape[] = []

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 80,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
      })
    }

    setShapes(newShapes)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            className="rounded-full absolute"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
            }}
          />
        )
      case "square":
        return (
          <div
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              borderRadius: "10%",
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        )
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          initial={{
            x: `${shape.x}vw`,
            y: `${shape.y}vh`,
            rotate: shape.rotation,
            opacity: 0,
          }}
          animate={{
            x: [`${shape.x}vw`, `${shape.x + (Math.random() * 10 - 5)}vw`],
            y: [`${shape.y}vh`, `${shape.y + (Math.random() * 10 - 5)}vh`],
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
          style={{
            x: `calc(${shape.x}vw + ${springX.get() * 20}px)`,
            y: `calc(${shape.y}vh + ${springY.get() * 20}px)`,
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  )
}
