'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Target, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Hours this week', value: '24.5', icon: Zap },
  { label: 'Completed', value: '3', icon: Target },
  { label: 'Avg score', value: '94%', icon: TrendingUp },
]

export default function HeroTile() {
  const streak = 12
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.article
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative col-span-full lg:col-span-2 rounded-2xl overflow-hidden border border-white/[0.07] min-h-[220px] flex flex-col justify-between p-7 group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #0d0d12 0%, #0a0a10 50%, #0d0d12 100%)',
      }}
    >
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Blue glow top left */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-700"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }}
      />

      {/* Subtle right glow */}
      <div
        aria-hidden
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-700"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)' }}
      />

      {/* Top border accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-blue-400/60 mb-3">
            {greeting}
          </p>
          <h1 className="font-syne text-3xl md:text-4xl font-bold text-gradient leading-none mb-1">
            Student
          </h1>
          <p className="text-[13px] text-white/30 mt-2">Ready to continue your journey?</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-orange-500/20 bg-orange-500/5">
          <Flame size={14} className="text-orange-400" />
          <div>
            <p className="text-[11px] font-jetbrains text-orange-300 font-medium leading-none">{streak}</p>
            <p className="text-[9px] text-orange-400/50 leading-none mt-0.5">day streak</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex items-center gap-4 mt-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Icon size={12} className="text-blue-400/70" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white/80 leading-none font-syne">{stat.value}</p>
                <p className="text-[10px] text-white/25 leading-none mt-0.5 font-jetbrains">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.article>
  )
}
