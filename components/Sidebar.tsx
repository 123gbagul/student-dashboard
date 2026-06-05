'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, BarChart2, Settings, ChevronLeft, ChevronRight, GraduationCap,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState('dashboard')

  return (
    <motion.nav
      animate={{ width: collapsed ? 60 : 216 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col h-screen shrink-0 overflow-hidden z-20 border-r"
      style={{
        background: 'linear-gradient(180deg, #080810 0%, #060608 100%)',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-3.5 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
            borderColor: 'rgba(59,130,246,0.2)',
          }}
        >
          <GraduationCap size={14} className="text-blue-400/80" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="font-syne text-[13px] font-bold text-white/60 tracking-wider whitespace-nowrap"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-0.5 px-2 pt-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left w-full group"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.12)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                size={15}
                className={`shrink-0 relative z-10 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-white/25 group-hover:text-white/50'
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`font-syne text-[12px] font-medium relative z-10 whitespace-nowrap transition-colors ${
                      isActive ? 'text-white/80' : 'text-white/25 group-hover:text-white/50'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      {/* Version tag */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-6"
          >
            <p className="font-jetbrains text-[9px] text-white/10 uppercase tracking-widest">v1.0.0</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[56px] -right-3 w-6 h-6 rounded-full flex items-center justify-center z-30 border transition-colors hover:border-blue-500/30"
        style={{ background: '#0d0d12', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {collapsed
          ? <ChevronRight size={10} className="text-white/30" />
          : <ChevronLeft size={10} className="text-white/30" />
        }
      </button>
    </motion.nav>
  )
}
