'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

function generateMockActivity() {
  const weeks = 18
  const days = 7
  let seed = 42
  const next = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return Math.abs(seed) % 5
  }
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => next())
  )
}

const grid = generateMockActivity()

const intensityStyle = (v: number): string => {
  if (v === 0) return 'rgba(255,255,255,0.03)'
  if (v === 1) return 'rgba(59,130,246,0.15)'
  if (v === 2) return 'rgba(59,130,246,0.3)'
  if (v === 3) return 'rgba(59,130,246,0.5)'
  return 'rgba(59,130,246,0.75)'
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function ActivityTile() {
  const totalSessions = grid.flat().reduce((a, b) => a + b, 0)

  return (
    <motion.section
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-full lg:col-span-2 rounded-2xl border border-white/[0.07] p-6 overflow-hidden group cursor-default"
      style={{ background: 'linear-gradient(135deg, #0d0d12 0%, #0a0a10 100%)' }}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
      />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-blue-400/60" />
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-white/30">
            Activity
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/5 border border-blue-500/10">
          <span className="font-syne text-[12px] font-semibold text-blue-400/80">{totalSessions}</span>
          <span className="font-jetbrains text-[9px] text-white/25">sessions</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mb-1 pl-0">
        {months.map((m) => (
          <div key={m} className="font-jetbrains text-[9px] text-white/15 w-[52px]">{m}</div>
        ))}
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((val, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.002, type: 'spring', stiffness: 200, damping: 20 }}
                title={`${val} sessions`}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ background: intensityStyle(val) }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className="font-jetbrains text-[9px] text-white/15">less</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div
            key={v}
            className="w-[10px] h-[10px] rounded-[2px]"
            style={{ background: intensityStyle(v) }}
          />
        ))}
        <span className="font-jetbrains text-[9px] text-white/15">more</span>
      </div>
    </motion.section>
  )
}
