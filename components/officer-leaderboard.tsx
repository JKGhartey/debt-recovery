import { cn } from "@/lib/utils"

interface Officer {
  rank: number
  initials: string
  name: string
  zone: string
  tenants: number
  rate: number
  outstanding: string
}

const OFFICERS: Officer[] = [
  { rank: 1, initials: "KA", name: "Kojo Asante",   zone: "Tema",     tenants: 27, rate: 48, outstanding: "₵84.2k" },
  { rank: 2, initials: "AD", name: "Ama Darko",     zone: "Madina",   tenants: 28, rate: 64, outstanding: "₵72.1k" },
  { rank: 3, initials: "YM", name: "Yaw Mensah",    zone: "Spintex",  tenants: 23, rate: 48, outstanding: "₵64.4k" },
  { rank: 4, initials: "ED", name: "Esi Duah",      zone: "Dansoman", tenants: 26, rate: 73, outstanding: "₵58.1k" },
  { rank: 5, initials: "AO", name: "Abena Owusu",   zone: "Kasoa",    tenants: 26, rate: 62, outstanding: "₵49.6k" },
  { rank: 6, initials: "KA", name: "Kofi Agyekum",  zone: "Adenta",   tenants: 20, rate: 75, outstanding: "₵13.9k" },
]

function rateColor(rate: number) {
  if (rate >= 70) return "#3d5a3a"
  if (rate >= 45) return "#b3610a"
  return "#8a2a2a"
}

export function OfficerLeaderboard() {
  return (
    <div className="mt-6 bg-white border border-[#e8e2d9] rounded-lg overflow-hidden">
      <div className="flex items-start justify-between px-6 py-5 border-b border-[#e8e2d9]">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-semibold text-[#1a1a14]">Officer leaderboard</p>
          <p className="text-[11px] text-[#9a9080]">
            Performance against the filtered book · ranked by outstanding exposure
          </p>
        </div>
      </div>

      <div className="divide-y divide-[#e8e2d9]">
        {OFFICERS.map((o) => {
          const color = rateColor(o.rate)
          const isTop = o.rank <= 3
          return (
            <div key={o.rank} className="flex items-center gap-4 px-6 py-4">
              <span
                className={cn(
                  "w-6 text-center text-[11px] font-mono font-semibold shrink-0",
                  isTop ? "text-[#1a1a14]" : "text-[#b0a898]"
                )}
              >
                {String(o.rank).padStart(2, "0")}
              </span>

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ede8df] text-[11px] font-semibold text-[#6b6455] shrink-0">
                {o.initials}
              </div>

              <div className="min-w-[130px] shrink-0">
                <p className="text-[13px] font-medium text-[#1a1a14] leading-tight">{o.name}</p>
                <p className="text-[11px] text-[#9a9080]">{o.zone} · {o.tenants} tenants in view</p>
              </div>

              <div className="flex-1" />

              <span
                className="w-10 text-right text-[13px] font-semibold shrink-0"
                style={{ color }}
              >
                {o.rate}%
              </span>

              <div className="w-24 h-1.5 rounded-full bg-[#ede8df] overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full opacity-85 transition-all duration-500"
                  style={{ width: `${o.rate}%`, backgroundColor: color }}
                />
              </div>

              <span className="w-14 text-right text-[13px] font-semibold text-[#1a1a14] shrink-0 font-serif">
                {o.outstanding}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
