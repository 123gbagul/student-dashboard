'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

function generateMockActivity() {
  const weeks = 16
  const days = 7
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  )
}

const grid = generateMockActivity()

const intensityClass = (v: number) => {
  if (v === 0) return 'bg-white/[0.04]'
  if (v === 1) return 'bg-white/[0.12]'
  if (v === 2) return 'bg-white/[0.22]'
  if (v === 3) return 'bg-white/[0.35]'
  return 'bg-white/[0.55]'
}

export default function ActivityTile() {
  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-full lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-5 overflow-hidden group cursor-default"
    >
      <div className="flex items-center gap-2 mb-5">
        <Activity size={13} className="text-white/30" />
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-mono">
          Activity
        </span>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((val, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.003 }}
                title={`${val} sessions`}
                className={`w-[10px] h-[10px] rounded-[2px] ${intensityClass(val)}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[10px] text-white/20 font-mono">less</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div key={v} className={`w-[10px] h-[10px] rounded-[2px] ${intensityClass(v)}`} />
        ))}
        <span className="text-[10px] text-white/20 font-mono">more</span>
      </div>
    </motion.section>
  )
}
