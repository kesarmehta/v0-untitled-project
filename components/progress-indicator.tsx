"use client"

import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  progress: number
}

export default function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
