'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-5">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
        <AlertTriangle size={16} className="text-white/30" />
      </div>
      <div className="text-center">
        <p className="text-[13px] text-white/50">Could not load dashboard data</p>
        <p className="text-[11px] text-white/20 mt-1 font-mono">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.05] border border-white/[0.07] text-[12px] text-white/50 hover:text-white/70 hover:bg-white/[0.07] transition-all"
      >
        <RotateCcw size={12} />
        Try again
      </button>
    </div>
  )
}
