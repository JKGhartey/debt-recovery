"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ACTION_OPTIONS,
  DEFAULT_FILTERS,
  OCCUPANCY_OPTIONS,
  OFFICERS,
  OWING_OPTIONS,
  PAYMENT_STATUS,
  RENT_OPTIONS,
  VACATED_CARDS,
  type FiltersState,
} from "@/lib/constants/filters"

interface FiltersProps {
  readonly onFilterChange?: (filters: FiltersState) => void
}

function SectionLabel({ children }: { readonly children: React.ReactNode }) {
  return (
    <Label className="block text-[10px] font-semibold tracking-[0.13em] uppercase text-[#9a9080] mb-2.5 select-none">
      {children}
    </Label>
  )
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)

  const update = (patch: Partial<FiltersState>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    onFilterChange?.(next)
  }

  const togglePayment = (key: string) => {
    const next = filters.paymentStatus.includes(key)
      ? filters.paymentStatus.filter((k) => k !== key)
      : [...filters.paymentStatus, key]
    update({ paymentStatus: next })
  }

  const toggleOfficer = (name: string) => {
    const next = filters.officers.includes(name)
      ? filters.officers.filter((o) => o !== name)
      : [...filters.officers, name]
    update({ officers: next })
  }

  return (
    <div className="mt-6 rounded-xl border border-[#e0dbd1] bg-white p-[18px_20px] grid gap-3.5">

      {/* ── Row 1: Payment status + Occupancy ──────────────────────────────── */}
      <div className="flex items-start gap-6 flex-wrap">

        {/* Payment status */}
        <div className="flex-1 min-w-0">
          <SectionLabel>Payment status</SectionLabel>
          <div className="flex items-center gap-2 flex-wrap">
            {PAYMENT_STATUS.map((s) => {
              const active = filters.paymentStatus.includes(s.key)
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => togglePayment(s.key)}
                  className="flex items-center gap-2 h-8 pl-2.5 pr-2 rounded-lg border text-[12px] font-medium transition-all"
                  style={
                    active
                      ? { background: s.bg, borderColor: s.color + "70", color: s.color }
                      : { background: "#faf8f4", borderColor: "#e8e3d8", color: "#4d5461" }
                  }
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 transition-all"
                    style={{ backgroundColor: active ? s.color : s.color + "55" }}
                  />
                  {s.label}
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                    style={
                      active
                        ? { background: s.color + "22", color: s.color }
                        : { background: "#ede8df", color: "#9a9080" }
                    }
                  >
                    {s.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Occupancy */}
        <div className="shrink-0">
          <SectionLabel>Occupancy</SectionLabel>
          <div className="flex flex-col gap-3">
            <fieldset
              aria-label="Filter by occupancy"
              className="flex items-center rounded-lg border border-[#ddd8ce] bg-transparent p-0.5 gap-0.5 self-start"
            >
              {OCCUPANCY_OPTIONS.map((opt) => {
                const active = filters.occupancy === opt.key
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => update({ occupancy: opt.key, vacatedSub: "any" })}
                    className={`flex items-center gap-1.5 h-7 px-3 rounded-md text-[12px] font-medium transition-all ${
                      active
                        ? "bg-[#1a1a14] text-white"
                        : "text-[#6b6455] hover:text-[#1a1a14]"
                    }`}
                  >
                    {opt.label}
                    <span className={`text-[11px] font-semibold ${active ? "text-white/60" : "text-[#b3a898]"}`}>
                      {opt.count}
                    </span>
                  </button>
                )
              })}
            </fieldset>

            {/* Vacated sub-panel */}
            {filters.occupancy === "vacated" && (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-[#9a9080]">Of those who moved out…</span>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => update({ vacatedSub: "any" })}
                    className={`h-5 px-2 rounded-md text-[10px] font-semibold tracking-wide ${
                      filters.vacatedSub === "any"
                        ? "bg-[#1a1a14] text-white hover:bg-[#1a1a14]"
                        : "bg-transparent border border-[#ddd8ce] text-[#9a9080] hover:bg-transparent hover:text-[#1a1a14]"
                    }`}
                  >
                    ALL
                  </Button>
                </div>

                <div className="flex gap-2.5">
                  {VACATED_CARDS.map((card) => {
                    const active = filters.vacatedSub === card.key
                    return (
                      <button
                        key={card.key}
                        type="button"
                        onClick={() => update({ vacatedSub: card.key })}
                        className="flex flex-col gap-2 p-3.5 rounded-xl border text-left w-[200px] transition-all"
                        style={
                          active
                            ? { borderColor: card.activeColor.border, background: card.activeColor.bg }
                            : { borderColor: "#ddd8ce", background: "white" }
                        }
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base leading-none">{card.icon}</span>
                          <span className="text-[12px] font-semibold text-[#1a1a14]">{card.label}</span>
                        </div>
                        <p className="text-[11px] text-[#9a9080] leading-snug">{card.desc}</p>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-[15px] font-semibold text-[#1a1a14]">{card.count}</span>
                          <span className="text-[11px] font-medium" style={{ color: card.activeColor.text }}>
                            {card.owed}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Row 2: Officer assigned ─────────────────────────────────────────── */}
      <div>
        <SectionLabel>Officer assigned</SectionLabel>
        <div className="flex items-center gap-2 flex-wrap">
          {OFFICERS.map((name) => {
            const active = filters.officers.includes(name)
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleOfficer(name)}
                className={`h-8 px-3 rounded-lg border text-[12px] font-medium transition-all ${
                  active
                    ? "border-[#508d4e70] bg-[#eef4ee] text-[#3d5a3a]"
                    : "border-[#e8e3d8] bg-[#faf8f4] text-[#4d5461] hover:border-[#c9c3b8]"
                }`}
              >
                {name}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Row 3: Selects ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">

        <div>
          <SectionLabel>Monthly rent</SectionLabel>
          <Select value={filters.rent} onValueChange={(v) => update({ rent: v })}>
            <SelectTrigger className="h-8 w-full text-[12px] font-medium bg-white border-[#ddd8ce] text-[#1a1a14] focus:ring-0 focus:ring-offset-0 focus:border-[#508d4e] hover:border-[#c9c3b8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RENT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-[12px]">{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <SectionLabel>Outstanding balance</SectionLabel>
          <Select value={filters.owing} onValueChange={(v) => update({ owing: v })}>
            <SelectTrigger className="h-8 w-full text-[12px] font-medium bg-white border-[#ddd8ce] text-[#1a1a14] focus:ring-0 focus:ring-offset-0 focus:border-[#508d4e] hover:border-[#c9c3b8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OWING_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-[12px]">{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <SectionLabel>Action taken by officers</SectionLabel>
          <Select value={filters.action} onValueChange={(v) => update({ action: v })}>
            <SelectTrigger className="h-8 w-full text-[12px] font-medium bg-white border-[#ddd8ce] text-[#1a1a14] focus:ring-0 focus:ring-offset-0 focus:border-[#508d4e] hover:border-[#c9c3b8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACTION_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-[12px]">{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  )
}
