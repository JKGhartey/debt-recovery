interface Bucket {
  label: string
  color: string
  count: number
  amount: string
}

const BUCKETS: Bucket[] = [
  { label: "Current", color: "#3d5a3a", count: 92, amount: "₵249.2k" },
  { label: "1–30",    color: "#0f5e5a", count: 32, amount: "₵94k"    },
  { label: "31–60",   color: "#b3610a", count: 8,  amount: "₵60k"    },
  { label: "61–90",   color: "#c57a3f", count: 9,  amount: "₵89.9k"  },
  { label: "90+",     color: "#8a2a2a", count: 9,  amount: "₵98.5k"  },
]

const MAX_COUNT = Math.max(...BUCKETS.map((b) => b.count))

export function PortfolioBreakdown() {
  return (
    <div className="bg-white border border-[#e8e2d9] rounded-lg overflow-hidden flex flex-col">
      {/* Head */}
      <div className="px-5 py-4 border-b border-[#e8e2d9]">
        <p className="text-[13px] font-semibold text-[#1a1a14]">Portfolio breakdown</p>
        <p className="text-[11px] text-[#9a9080]">By days past due</p>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-0 px-5 py-4 flex-1 justify-center">
        {BUCKETS.map((b) => (
          <div key={b.label} className="flex items-center gap-3 py-2.5">
            {/* Label + dot */}
            <div className="flex items-center gap-1.5 w-16 shrink-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: b.color }}
              />
              <span className="text-[11px] text-[#6b6455]">{b.label}</span>
            </div>

            {/* Count */}
            <span className="text-[11px] font-mono text-[#9a9080] w-5 text-right shrink-0">
              {b.count}
            </span>

            {/* Bar */}
            <div className="flex-1 h-2 bg-[#f0ece6] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(b.count / MAX_COUNT) * 100}%`,
                  backgroundColor: b.color,
                  opacity: 0.85,
                }}
              />
            </div>

            {/* Amount */}
            <span className="text-[12px] font-semibold text-[#1a1a14] w-16 text-right shrink-0">
              {b.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Total footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0ece6] bg-[#faf8f5]">
        <span className="text-[11px] text-[#9a9080]">
          {BUCKETS.reduce((s, b) => s + b.count, 0)} tenants total
        </span>
        <span className="text-[11px] font-semibold text-[#1a1a14]">₵591.6k</span>
      </div>
    </div>
  )
}
