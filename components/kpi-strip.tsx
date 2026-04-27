interface Kpi {
  label: string
  value: string
  sub: string
}

interface KpiStripProps {
  outstanding?: string
  monthlyBook?: string
  onTimeRate?: string
  avgDaysLate?: string
}

const DEFAULT_KPIS: Kpi[] = [
  { label: "Outstanding", value: "₵342.3k", sub: "Across visible tenants" },
  { label: "Monthly book", value: "₵415.4k", sub: "Gross monthly rent" },
  { label: "On-time rate", value: "61%", sub: "Paying without delay" },
  { label: "Avg days late", value: "40 days", sub: "Delinquent tenants only" },
]

function KpiCard({ label, value, sub }: Kpi) {
  return (
    <div className="flex flex-col gap-1 flex-1 px-6 py-5 bg-white border border-[#e8e2d9] rounded-lg">
      <p className="text-[11px] font-medium tracking-[0.12em] text-[#9a9080] uppercase">{label}</p>
      <p className="font-serif text-[28px] leading-tight font-normal text-[#1a1a14]">{value}</p>
      <p className="text-[11px] text-[#b0a898]">{sub}</p>
    </div>
  )
}

export function KpiStrip({ outstanding, monthlyBook, onTimeRate, avgDaysLate }: KpiStripProps) {
  const kpis: Kpi[] = [
    { label: "Outstanding", value: outstanding ?? DEFAULT_KPIS[0].value, sub: DEFAULT_KPIS[0].sub },
    { label: "Monthly book", value: monthlyBook ?? DEFAULT_KPIS[1].value, sub: DEFAULT_KPIS[1].sub },
    { label: "On-time rate", value: onTimeRate ?? DEFAULT_KPIS[2].value, sub: DEFAULT_KPIS[2].sub },
    { label: "Avg days late", value: avgDaysLate ?? DEFAULT_KPIS[3].value, sub: DEFAULT_KPIS[3].sub },
  ]

  return (
    <div className="flex gap-3 mt-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}
