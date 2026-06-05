'use client'

import { motion } from 'framer-motion'
import type { Course } from '@/types/course'
import HeroTile from './HeroTile'
import CourseCard from './CourseCard'
import ActivityTile from './ActivityTile'

interface BentoGridProps {
  courses: Course[]
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto"
    >
      {/* Hero */}
      <motion.div variants={item} className="col-span-full lg:col-span-2">
        <HeroTile />
      </motion.div>

      {/* Stats stub tile */}
      <motion.div variants={item}>
        <article className="rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-5 h-full min-h-[180px] flex flex-col justify-between">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/25 font-mono">
            Completion
          </p>
          <div>
            <p className="text-3xl font-semibold text-white/80 tracking-tight">
              {courses.length > 0
                ? Math.round(
                    courses.reduce((acc, c) => acc + c.progress, 0) / courses.length
                  )
                : 0}
              <span className="text-lg text-white/30">%</span>
            </p>
            <p className="text-[12px] text-white/30 mt-1">avg across {courses.length} courses</p>
          </div>
        </article>
      </motion.div>

      {/* Course cards */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={item}>
          <CourseCard course={course} />
        </motion.div>
      ))}

      {/* Activity */}
      <motion.div variants={item} className="col-span-full lg:col-span-2">
        <ActivityTile />
      </motion.div>
    </motion.div>
  )
}
