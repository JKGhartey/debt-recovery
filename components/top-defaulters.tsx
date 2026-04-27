"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Defaulter {
  name: string
  area: string
  city: string
  officer: string
  dpd: number
  leaseLeft: number
  amount: string
}

const DEFAULTERS: Defaulter[] = [
  { name: "Comfort Osei",   area: "Adenta",  city: "Accra",    officer: "Ama",  dpd: 106, leaseLeft: 73,  amount: "₵21.4k" },
  { name: "Esi Ampofo",     area: "Asokwa",  city: "Kumasi",   officer: "Esi",  dpd: 90,  leaseLeft: 27,  amount: "₵18.3k" },
  { name: "Comfort Owusu",  area: "Tema",    city: "Accra",    officer: "Esi",  dpd: 54,  leaseLeft: 72,  amount: "₵16k"   },
  { name: "Kojo Ashorkor",  area: "Adenta",  city: "Accra",    officer: "Ama",  dpd: 102, leaseLeft: 105, amount: "₵14.4k" },
  { name: "Yaa Ofori",      area: "Sekondi", city: "Takoradi", officer: "Kojo", dpd: 68,  leaseLeft: 98,  amount: "₵14.2k" },
  { name: "Kwame Ofori",    area: "Asokwa",  city: "Kumasi",   officer: "Yaw",  dpd: 92,  leaseLeft: 79,  amount: "₵12.8k" },
  { name: "Abena Mensah",   area: "Osu",     city: "Accra",    officer: "Ama",  dpd: 45,  leaseLeft: 120, amount: "₵11.2k" },
  { name: "Fiifi Boateng",  area: "Suame",   city: "Kumasi",   officer: "Yaw",  dpd: 77,  leaseLeft: 60,  amount: "₵10.9k" },
  { name: "Akosua Darko",   area: "Korle-Bu",city: "Accra",    officer: "Esi",  dpd: 30,  leaseLeft: 200, amount: "₵9.7k"  },
  { name: "Nana Boateng",   area: "Bantama", city: "Kumasi",   officer: "Ama",  dpd: 88,  leaseLeft: 45,  amount: "₵8.4k"  },
]

const PREVIEW_COUNT = 6

function dpdColor(dpd: number) {
  if (dpd >= 90) return "text-[#8a2a2a]"
  if (dpd >= 30) return "text-[#b3610a]"
  return "text-[#3d5a3a]"
}

function leaseColor(days: number) {
  if (days <= 30) return "text-[#8a2a2a]"
  if (days <= 80) return "text-[#b3610a]"
  return "text-[#6b6455]"
}

export function TopDefaulters() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? DEFAULTERS : DEFAULTERS.slice(0, PREVIEW_COUNT)
  const hidden = DEFAULTERS.length - PREVIEW_COUNT

  return (
    <div className="bg-white border border-[#e8e2d9] rounded-lg overflow-hidden flex flex-col">
      {/* Head */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#e8e2d9]">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-semibold text-[#1a1a14]">Top defaulters</p>
          <p className="text-[11px] text-[#9a9080]">Ranked by outstanding · click a row for an action plan</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="text-[11px] font-medium text-[#6b6455] hover:text-[#1a1a14] transition-colors whitespace-nowrap"
        >
          {expanded ? "See less ›" : `See more (${hidden}) ›`}
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#f0ece6]">
        {visible.map((d) => (
          <button
            key={d.name}
            type="button"
            className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#faf8f5] transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium text-[#1a1a14] truncate">{d.name}</p>
              <p className="text-[11px] text-[#9a9080]">{d.area} · {d.city} · {d.officer}</p>
            </div>

            <div className={cn("text-[12px] font-mono font-semibold w-10 text-right", dpdColor(d.dpd))}>
              {d.dpd}d
            </div>

            <div className={cn("flex items-center gap-1 text-[11px] font-mono w-24 justify-end", leaseColor(d.leaseLeft))}>
              <span className="text-[9px] tracking-[0.1em] font-sans uppercase opacity-70">lease</span>
              {d.leaseLeft}d
            </div>

            <div className="text-[12.5px] font-semibold text-[#1a1a14] w-14 text-right">{d.amount}</div>

            <span className="text-[#c8c0b4] group-hover:text-[#6b6455] text-[14px] transition-colors">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
