const INSIGHTS = [
  {
    icon: "↑",
    text: (
      <>
        <strong>Adenta</strong> has the highest delinquent exposure — ₵48k across 4 tenants. Consider a cluster field visit.
      </>
    ),
  },
  {
    icon: "◆",
    text: (
      <>
        Highest single-tenant exposure: <strong>Comfort Osei</strong> owes ₵21.4k (106 days late). Represents 6% of visible outstanding.
      </>
    ),
  },
  {
    icon: "●",
    text: (
      <>
        <strong>Kojo</strong> holds 14 delinquent tenants in this view, worth ₵84.2k. Review workload distribution.
      </>
    ),
  },
]

export function AdaInsights() {
  return (
    <div className="mt-6 bg-white border border-[#e8e2d9] rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e8e2d9]">
        <p className="text-[13px] font-semibold text-[#1a1a14]">Ada — AI insights</p>
        <p className="text-[11px] text-[#9a9080] mt-0.5">
          Dynamic analysis of your current view · click any insight to dig deeper
        </p>
      </div>

      <div className="divide-y divide-[#e8e2d9]">
        {INSIGHTS.map((insight, i) => (
          <button
            key={i}
            type="button"
            className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-[#faf8f5] transition-colors group"
          >
            <span className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-[#ede8df] text-[11px] text-[#6b6455] shrink-0">
              {insight.icon}
            </span>
            <div className="flex-1">
              <p className="text-[13px] text-[#1a1a14] leading-snug [&_strong]:font-semibold">
                {insight.text}
              </p>
              <p className="mt-1 text-[11px] text-[#9a9080] group-hover:text-[#1a1a14] transition-colors">
                Click to explore ↗
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
