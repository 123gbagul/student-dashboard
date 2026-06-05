export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Hero skeleton */}
      <div className="col-span-full lg:col-span-2 rounded-xl bg-white/[0.03] min-h-[180px] animate-pulse" />

      {/* Stat skeleton */}
      <div className="rounded-xl bg-white/[0.03] min-h-[180px] animate-pulse" />

      {/* Course skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-white/[0.03] h-[140px] animate-pulse" />
      ))}

      {/* Activity skeleton */}
      <div className="col-span-full lg:col-span-2 rounded-xl bg-white/[0.03] h-[160px] animate-pulse" />
    </div>
  )
}
