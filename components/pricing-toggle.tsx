"use client"
import { motion } from "framer-motion"

interface PricingToggleProps {
  onToggle: (isAnnual: boolean) => void
  isAnnual: boolean
}

export default function PricingToggle({ onToggle, isAnnual }: PricingToggleProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
      <span
        className={`text-xl font-medium transition-colors duration-200 ${isAnnual ? "text-gray-400" : "text-white"}`}
      >
        Monthly
      </span>

      <div
        className="relative w-24 h-12 bg-gray-800 rounded-full p-1 cursor-pointer"
        onClick={() => onToggle(!isAnnual)}
      >
        <motion.div
          className="absolute top-1 left-1 w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center"
          animate={{
            x: isAnnual ? 48 : 0,
            background: isAnnual
              ? "linear-gradient(to right, #f97316, #ef4444)"
              : "linear-gradient(to right, #14b8a6, #10b981)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-white/10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1], ease: "easeInOut" }}
            key={isAnnual ? "annual" : "monthly"}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isAnnual ? "0 0 15px 2px rgba(239, 68, 68, 0.3)" : "0 0 15px 2px rgba(20, 184, 166, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <span
        className={`text-xl font-medium transition-colors duration-200 text-gradient-orange`}
        style={{
          background: "linear-gradient(to right, #f97316, #ef4444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Annually
      </span>

      <span className="text-lg font-bold ml-4 text-white">Toggle for a 50% off annually</span>

      {isAnnual && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          SAVE 50%
        </motion.div>
      )}
    </div>
  )
}
