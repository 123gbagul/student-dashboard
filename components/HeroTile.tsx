'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

export default function HeroTile() {
  const streak = 12

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-full lg:col-span-2 row-span-1 rounded-xl overflow-hidden border border-white/[0.06] bg-[#0d0d0f] min-h-[180px] flex flex-col justify-between p-6 group cursor-default"
    >
      {/* Animated gradient blobs */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/[0.025] blur-3xl group-hover:bg-white/[0.035] transition-all duration-700" />
        <div className="absolute -bottom-20 right-10 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl group-hover:bg-white/[0.03] transition-all duration-700" />
      </div>

      {/* Noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-2 font-mono">
          Welcome back
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-white/90 tracking-tight">
          Student
        </h1>
      </div>

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.07]">
          <Flame size={13} className="text-orange-400/80" />
          <span className="text-[13px] text-white/70 font-medium">{streak} day streak</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-3 rounded-full ${
                i < (streak % 7 || 7) ? 'bg-orange-400/60' : 'bg-white/[0.08]'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.article>
  )
}
