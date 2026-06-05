import { Suspense } from 'react'
import { getCourses } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import BentoGrid from '@/components/BentoGrid'
import Loading from './loading'
import { LayoutDashboard, BookOpen, BarChart2, Settings } from 'lucide-react'

async function DashboardContent() {
  const courses = await getCourses()
  return <BentoGrid courses={courses} />
}

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#060608' }}>
      <Sidebar />

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-6 z-20 border-t"
        style={{ background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        {[
          { icon: LayoutDashboard, label: 'Home' },
          { icon: BookOpen, label: 'Courses' },
          { icon: BarChart2, label: 'Stats' },
          { icon: Settings, label: 'Settings' },
        ].map(({ icon: Icon, label }, i) => (
          <button key={label} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-blue-400' : 'text-white/20'}`}>
            <Icon size={18} />
            <span className="font-jetbrains text-[9px] uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto">
        {/* Subtle top gradient */}
        <div
          aria-hidden
          className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(180deg, rgba(6,6,8,0.8) 0%, transparent 100%)' }}
        />

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(59,130,246,0.8)', boxShadow: '0 0 6px rgba(59,130,246,0.8)' }}
              />
              <span className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-white/20">
                Dashboard
              </span>
            </div>
            <div
              className="w-8 h-8 rounded-full border flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.15)' }}
            >
              <span className="font-syne text-[12px] font-bold text-blue-400/70">S</span>
            </div>
          </header>

          <Suspense fallback={<Loading />}>
            <DashboardContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
