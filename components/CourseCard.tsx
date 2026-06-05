'use client'

import { motion } from 'framer-motion'
import {
  Layers, Code2, Blocks, Database, Globe, Cpu, Palette, Terminal, LucideIcon,
} from 'lucide-react'
import type { Course } from '@/types/course'

const iconMap: Record<string, LucideIcon> = {
  Layers, Code2, Blocks, Database, Globe, Cpu, Palette, Terminal,
}

const cardAccents = [
  { glow: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.15)', dot: 'bg-blue-400' },
  { glow: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.15)', dot: 'bg-violet-400' },
  { glow: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.15)', dot: 'bg-teal-400' },
  { glow: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.15)', dot: 'bg-orange-400' },
]

interface CourseCardProps {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? Layers
  const accent = cardAccents[index % cardAccents.length]

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl border p-5 flex flex-col gap-4 overflow-hidden group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #0d0d12 0%, #0a0a10 100%)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 40px ${accent.glow}` }}
      />

      {/* Top border glow on hover */}
      <div
        aria-hidden
        className="absolute top-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
          style={{ background: accent.glow, borderColor: accent.border }}
        >
          <Icon size={15} className="text-white/60" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} opacity-70`} />
          <span className="font-jetbrains text-[11px] text-white/30">{course.progress}%</span>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-syne text-[13px] font-semibold text-white/80 leading-snug">{course.title}</h3>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-[2px] w-full rounded-full bg-white/[0.05] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent.border}, ${accent.glow.replace('0.12', '0.6')})` }}
            initial={{ width: '0%' }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.article>
  )
}
