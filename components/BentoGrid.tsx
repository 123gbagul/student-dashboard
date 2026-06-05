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
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
}

export default function BentoGrid({ courses }: BentoGridProps) {
  const avgProgress = courses.length
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0

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

      {/* Avg progress stat */}
      <motion.div variants={item}>
        <motion.article
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative rounded-2xl border border-white/[0.07] p-6 h-full min-h-[220px] flex flex-col justify-between overflow-hidden group cursor-default"
          style={{ background: 'linear-gradient(135deg, #0d0d12 0%, #0a0a10 100%)' }}
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden
            className="absolute top-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
          />

          <p className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-white/20">
            Avg Progress
          </p>

          <div>
            <div className="flex items-end gap-1 mb-3">
              <motion.p
                className="font-syne text-5xl font-bold text-white/80 leading-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {avgProgress}
              </motion.p>
              <span className="font-syne text-2xl text-white/20 mb-1">%</span>
            </div>

            {/* Mini progress */}
            <div className="h-[2px] w-full rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.6), rgba(139,92,246,0.6))' }}
                initial={{ width: '0%' }}
                animate={{ width: `${avgProgress}%` }}
                transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.6 }}
              />
            </div>
            <p className="font-jetbrains text-[10px] text-white/20 mt-2">
              across {courses.length} courses
            </p>
          </div>
        </motion.article>
      </motion.div>

      {/* Course cards */}
      {courses.map((course, i) => (
        <motion.div key={course.id} variants={item}>
          <CourseCard course={course} index={i} />
        </motion.div>
      ))}

      {/* Activity */}
      <motion.div variants={item} className="col-span-full lg:col-span-2">
        <ActivityTile />
      </motion.div>
    </motion.div>
  )
}
