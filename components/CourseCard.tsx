'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Layers,
  Code2,
  Blocks,
  Database,
  Globe,
  Cpu,
  Palette,
  Terminal,
  LucideIcon,
} from 'lucide-react'
import type { Course } from '@/types/course'

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Code2,
  Blocks,
  Database,
  Globe,
  Cpu,
  Palette,
  Terminal,
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? Layers

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-5 flex flex-col gap-4 overflow-hidden group cursor-default"
    >
      {/* Subtle hover glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0">
          <Icon size={15} className="text-white/50" />
        </div>
        <span className="text-[11px] font-mono text-white/25 mt-0.5">{course.progress}%</span>
      </div>

      <div>
        <h3 className="text-[13px] font-medium text-white/80 leading-snug">{course.title}</h3>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5 mt-auto">
        <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.3 }}
          />
        </div>
      </div>
    </motion.article>
  )
}
