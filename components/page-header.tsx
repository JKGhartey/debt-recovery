"use client"

import { RotateCcw } from "lucide-react"

interface PageHeaderProps {
  readonly tenantCount?: number
  readonly userName?: string
  readonly onReset?: () => void
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function formatDate() {
  const now = new Date()
  const day = now.toLocaleDateString("en-GB", { weekday: "long" }).toUpperCase()
  const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "long" }).toUpperCase()
  return `${day} · ${date}`
}

export function PageHeader({ tenantCount = 0, userName = "there", onReset }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-medium tracking-[0.14em] text-[#9a9080]">
          {formatDate()} · {tenantCount} TENANTS IN VIEW
        </p>
        <h1 className="font-serif text-[38px] leading-tight font-normal text-[#1a1a14]">
          {getGreeting()}, {userName}.{" "}
          <em className="text-[#9a9080]">Here is the book.</em>
        </h1>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-[#ddd8ce] bg-transparent text-[12px] font-medium text-[#6b6455] hover:bg-[#ede8df] transition-colors"
      >
        Reset filters
        <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
      </button>
    </div>
  )
}
