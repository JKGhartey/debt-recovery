"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Range = "yesterday" | "today" | "tomorrow" | "custom"

interface CollectionData {
  defaulted: string
  defaultedSub: string
  collected: string
  collectedSub: string
  collectionRate: number
  rateSub: string
  expected: string
  expectedSub: string
  compareYesterdayDefaulted: string
  compareYesterdayCollected: string
  compareTomorrowDefaulted: string
  compareTomorrowCollected: string
}

const RANGE_DATA: Record<Exclude<Range, "custom">, CollectionData> = {
  yesterday: {
    defaulted: "₵3.4k", defaultedSub: "Yesterday · due and unpaid",
    collected: "₵4.6k", collectedSub: "Yesterday · cleared",
    collectionRate: 33, rateSub: "Of expected rent",
    expected: "₵13.2k", expectedSub: "Yesterday · total due",
    compareYesterdayDefaulted: "—", compareYesterdayCollected: "—",
    compareTomorrowDefaulted: "+₵624", compareTomorrowCollected: "₵777",
  },
  today: {
    defaulted: "₵4.3k", defaultedSub: "Today · due and unpaid",
    collected: "₵5.4k", collectedSub: "Today · cleared",
    collectionRate: 39, rateSub: "Of expected rent",
    expected: "₵13.8k", expectedSub: "Today · total due",
    compareYesterdayDefaulted: "₵937", compareYesterdayCollected: "+₵822",
    compareTomorrowDefaulted: "+₵624", compareTomorrowCollected: "₵777",
  },
  tomorrow: {
    defaulted: "₵5.0k", defaultedSub: "Tomorrow · projected unpaid",
    collected: "₵4.6k", collectedSub: "Tomorrow · projected",
    collectionRate: 33, rateSub: "Of expected rent",
    expected: "₵14.1k", expectedSub: "Tomorrow · total due",
    compareYesterdayDefaulted: "₵937", compareYesterdayCollected: "+₵822",
    compareTomorrowDefaulted: "—", compareTomorrowCollected: "—",
  },
}

const RANGE_LABELS: Record<Range, string> = {
  yesterday: "Yesterday",
  today: "Today",
  tomorrow: "Tomorrow",
  custom: "Date range",
}

export function CollectionsPanel() {
  const [range, setRange] = useState<Range>("today")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const data = range !== "custom" ? RANGE_DATA[range] : RANGE_DATA.today

  const rateColor =
    data.collectionRate >= 70
      ? "text-[#508d4e]"
      : data.collectionRate >= 45
      ? "text-[#dba32a]"
      : "text-[#db2719]"

  const barColor =
    data.collectionRate >= 70
      ? "bg-[#508d4e]"
      : data.collectionRate >= 45
      ? "bg-[#dba32a]"
      : "bg-[#db2719]"

  return (
    <div className="mt-6 bg-white border border-[#e8e2d9] rounded-lg overflow-hidden">
      {/* Head */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-[#e8e2d9]">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-semibold text-[#1a1a14]">Defaulted vs collected</p>
          <p className="text-[11px] text-[#9a9080]">
            Track daily collection performance · compare across days
          </p>
        </div>

        {/* Range toggle */}
        <div className="flex items-center gap-1">
          {(["yesterday", "today", "tomorrow", "custom"] as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "h-7 px-3 rounded text-[11px] font-medium transition-colors",
                range === r
                  ? "bg-[#1a1a14] text-white"
                  : "text-[#6b6455] hover:bg-[#ede8df]"
              )}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Custom date picker */}
      {range === "custom" && (
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[#e8e2d9] bg-[#faf8f5]">
          <label className="flex items-center gap-2 text-[11px] text-[#6b6455]">
            From
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-7 px-2 rounded border border-[#ddd8ce] text-[11px] text-[#1a1a14] bg-white"
            />
          </label>
          <label className="flex items-center gap-2 text-[11px] text-[#6b6455]">
            To
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-7 px-2 rounded border border-[#ddd8ce] text-[11px] text-[#1a1a14] bg-white"
            />
          </label>
          <button
            type="button"
            className="h-7 px-3 rounded bg-[#1a1a14] text-white text-[11px] font-medium"
          >
            Apply
          </button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-4 divide-x divide-[#e8e2d9]">
        <StatCell label="Total defaulted" value={data.defaulted} sub={data.defaultedSub} valueClass="text-[#1a1a14]" />

        <div className="flex flex-col gap-1 px-6 py-5">
          <p className="text-[11px] font-medium tracking-[0.1em] text-[#9a9080] uppercase">Collected</p>
          <p className="font-serif text-[28px] leading-tight text-[#508d4e]">{data.collected}</p>
          <p className="text-[11px] text-[#b0a898]">{data.collectedSub}</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-[#ede8df] overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", barColor)}
              style={{ width: `${data.collectionRate}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 px-6 py-5">
          <p className="text-[11px] font-medium tracking-[0.1em] text-[#9a9080] uppercase">Collection rate</p>
          <p className={cn("font-serif text-[28px] leading-tight", rateColor)}>{data.collectionRate}%</p>
          <p className="text-[11px] text-[#b0a898]">{data.rateSub}</p>
        </div>

        <StatCell label="Expected" value={data.expected} sub={data.expectedSub} valueClass="text-[#1a1a14]" />
      </div>

      {/* Compare bar */}
      {range !== "custom" && (
        <div className="flex items-center gap-3 px-6 py-3 border-t border-[#e8e2d9] bg-[#faf8f5]">
          <span className="text-[10.5px] font-mono tracking-[0.1em] text-[#9a9080] uppercase">Compare</span>
          <span className="text-[#ddd8ce]">·</span>
          {range !== "yesterday" && (
            <span className="text-[11px] text-[#6b6455]">
              <strong className="font-semibold text-[#1a1a14]">vs Yesterday:</strong>{" "}
              defaulted <Delta value={data.compareYesterdayDefaulted} /> · collected{" "}
              <Delta value={data.compareYesterdayCollected} />
            </span>
          )}
          {range !== "yesterday" && range !== "tomorrow" && (
            <span className="text-[#ddd8ce]">·</span>
          )}
          {range !== "tomorrow" && (
            <span className="text-[11px] text-[#6b6455]">
              <strong className="font-semibold text-[#1a1a14]">vs Tomorrow:</strong>{" "}
              defaulted <Delta value={data.compareTomorrowDefaulted} /> · collected{" "}
              <Delta value={data.compareTomorrowCollected} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function StatCell({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string
  value: string
  sub: string
  valueClass?: string
}) {
  return (
    <div className="flex flex-col gap-1 px-6 py-5">
      <p className="text-[11px] font-medium tracking-[0.1em] text-[#9a9080] uppercase">{label}</p>
      <p className={cn("font-serif text-[28px] leading-tight", valueClass)}>{value}</p>
      <p className="text-[11px] text-[#b0a898]">{sub}</p>
    </div>
  )
}

function Delta({ value }: { value: string }) {
  if (value === "—") return <span className="text-[#b0a898]">—</span>
  const isUp = value.startsWith("+")
  return (
    <span className={isUp ? "text-[#508d4e] font-semibold" : "text-[#db2719] font-semibold"}>
      {value}
    </span>
  )
}
