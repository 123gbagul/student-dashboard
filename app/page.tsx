import { Suspense } from 'react'
import { getCourses } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import BentoGrid from '@/components/BentoGrid'
import Loading from './loading'

async function DashboardContent() {
  const courses = await getCourses()
  return <BentoGrid courses={courses} />
}

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080809]">
      <Sidebar />

      {/* Mobile bottom nav placeholder */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0a0a0b] border-t border-white/[0.06] flex items-center justify-around px-4 z-20">
        {['Dashboard', 'Courses', 'Stats', 'Settings'].map((label) => (
          <button key={label} className="text-[10px] text-white/30 flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            {label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 pb-20 md:pb-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.12em] text-white/25 font-mono">
                Dashboard
              </h2>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/[0.07] border border-white/[0.07] flex items-center justify-center">
              <span className="text-[11px] text-white/50 font-medium">S</span>
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
