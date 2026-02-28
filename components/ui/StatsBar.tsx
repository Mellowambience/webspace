interface Stat {
  label: string
  value: string
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ws-border rounded-2xl overflow-hidden">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-ws-mist px-6 py-5">
          <div className="font-display text-2xl font-bold text-ws-ink">{stat.value}</div>
          <div className="text-xs text-ws-ink/40 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
