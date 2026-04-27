"use client"

import { useState } from "react"

// ── Types ────────────────────────────────────────────────────────────────────

type OccupancyView = "all" | "occupied" | "vacated"
type VacatedSub = "any" | "early" | "late"

interface FiltersState {
  paymentStatus: string[]
  occupancy: OccupancyView
  vacatedSub: VacatedSub
  officers: string[]
  rent: string
  owing: string
  action: string
}

interface FiltersProps {
  readonly onFilterChange?: (filters: FiltersState) => void
}

// ── Static data ──────────────────────────────────────────────────────────────

const PAYMENT_STATUS = [
  { key: "current", label: "Current", color: "#3d5a3a", count: 92 },
  { key: "1-30",    label: "1–30",    color: "#0f5e5a", count: 32 },
  { key: "31-60",   label: "31–60",   color: "#b3610a", count: 8  },
  { key: "61-90",   label: "61–90",   color: "#c57a3f", count: 9  },
  { key: "90+",     label: "90+",     color: "#8a2a2a", count: 9  },
]

const OFFICERS = ["Kojo", "Esi", "Kofi", "Abena", "Yaw", "Ama"]

const RENT_OPTIONS = [
  { value: "all",         label: "All rent levels"    },
  { value: "0-1000",      label: "Under ₵1,000"       },
  { value: "1000-2500",   label: "₵1,000 – ₵2,500"   },
  { value: "2500-4000",   label: "₵2,500 – ₵4,000"   },
  { value: "4000-10000",  label: "Over ₵4,000"        },
]

const OWING_OPTIONS = [
  { value: "all",         label: "All balances"           },
  { value: "none",        label: "Paid up (nothing owed)" },
  { value: "0-5000",      label: "Under ₵5,000"           },
  { value: "5000-15000",  label: "₵5,000 – ₵15,000"      },
  { value: "15000-99999", label: "Over ₵15,000"           },
]

const ACTION_OPTIONS = [
  { value: "all",                   label: "Any action (or none)"           },
  { value: "none",                  label: "No action taken yet"            },
  { value: "landlord",              label: "Landlord contacted"             },
  { value: "employer",              label: "Employer contacted"             },
  { value: "visited",               label: "Visited"                        },
  { value: "locked",                label: "Locked house"                   },
  { value: "evicted",               label: "Evicted"                        },
  { value: "eviction_notice",       label: "Eviction notice served"         },
  { value: "undertaking_signed",    label: "Undertaking letter signed"      },
  { value: "undertaking_delivered", label: "Undertaking letter delivered"   },
  { value: "seized_item",           label: "Seized an item"                 },
]

const DEFAULT_FILTERS: FiltersState = {
  paymentStatus: [],
  occupancy: "all",
  vacatedSub: "any",
  officers: [],
  rent: "all",
  owing: "all",
  action: "all",
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9a9080] mb-2 block">
      {children}
    </span>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  readonly active: boolean
  readonly onClick: () => void
  readonly children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 h-7 px-3 rounded-full border text-[12px] font-medium transition-colors ${
        active
          ? "border-[#6b6455] bg-[#ede8df] text-[#1a1a14]"
          : "border-[#ddd8ce] bg-transparent text-[#6b6455] hover:bg-[#ede8df]"
      }`}
    >
      {children}
    </button>
  )
}

function StyledSelect({
  value,
  onChange,
  options,
}: {
  readonly value: string
  readonly onChange: (v: string) => void
  readonly options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 px-3 pr-8 rounded-lg border border-[#ddd8ce] bg-[#ede8df] text-[12px] font-medium text-[#1a1a14] appearance-none cursor-pointer hover:border-[#6b6455] focus:outline-none focus:border-[#508d4e] transition-colors w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9080' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

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

  const showVacatedPanel = filters.occupancy === "vacated"

  return (
    <div className="flex flex-col gap-5 pt-6">

      {/* Row 1: Payment status + Occupancy */}
      <div className="flex gap-10 flex-wrap">

        {/* Payment status */}
        <div>
          <Label>Payment status</Label>
          <div className="flex items-center gap-2 flex-wrap">
            {PAYMENT_STATUS.map((s) => (
              <Chip
                key={s.key}
                active={filters.paymentStatus.includes(s.key)}
                onClick={() => togglePayment(s.key)}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                {s.label}
                <span className="text-[11px] text-[#9a9080] font-normal">{s.count}</span>
              </Chip>
            ))}
          </div>
        </div>

        {/* Occupancy */}
        <div className="flex flex-col">
          <Label>Occupancy</Label>
          <div className="flex flex-col gap-3">
            {/* Toggle */}
            <div
              role="group"
              aria-label="Filter by occupancy"
              className="flex items-center rounded-lg border border-[#ddd8ce] bg-[#ede8df] p-0.5 gap-0.5 self-start"
            >
              {(
                [
                  { key: "all",      label: "All",          count: 150 },
                  { key: "occupied", label: "Still living in", count: 144 },
                  { key: "vacated",  label: "Moved out",    count: 6   },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => update({ occupancy: opt.key, vacatedSub: "any" })}
                  className={`flex items-center gap-1.5 h-7 px-3 rounded-md text-[12px] font-medium transition-colors ${
                    filters.occupancy === opt.key
                      ? "bg-white text-[#1a1a14] shadow-sm"
                      : "text-[#6b6455] hover:text-[#1a1a14]"
                  }`}
                >
                  {opt.label}
                  <span className={`text-[11px] ${filters.occupancy === opt.key ? "text-[#9a9080]" : "text-[#b3a898]"}`}>
                    {opt.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Vacated sub-panel */}
            {showVacatedPanel && (
              <div className="flex flex-col gap-2 pl-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#9a9080] font-medium">Of those who moved out…</span>
                  <button
                    type="button"
                    onClick={() => update({ vacatedSub: "any" })}
                    className={`h-6 px-2.5 rounded-md text-[11px] font-medium border transition-colors ${
                      filters.vacatedSub === "any"
                        ? "border-[#6b6455] bg-[#ede8df] text-[#1a1a14]"
                        : "border-[#ddd8ce] text-[#9a9080] hover:bg-[#ede8df]"
                    }`}
                  >
                    All
                  </button>
                </div>
                <div className="flex gap-2">
                  {/* Before lease expired */}
                  <button
                    type="button"
                    onClick={() => update({ vacatedSub: "early" })}
                    className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left w-52 transition-colors ${
                      filters.vacatedSub === "early"
                        ? "border-[#c57a3f] bg-[#fdf3e8]"
                        : "border-[#ddd8ce] bg-[#ede8df] hover:border-[#c57a3f]/60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px]">⚠</span>
                      <span className="text-[12px] font-semibold text-[#1a1a14]">Before lease expired</span>
                    </div>
                    <p className="text-[11px] text-[#9a9080] leading-snug">
                      Left while still contractually obligated · typically skips or evictions
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[13px] font-semibold text-[#1a1a14]">6</span>
                      <span className="text-[11px] text-[#c57a3f] font-medium">₵70k owed</span>
                    </div>
                  </button>

                  {/* After lease expired */}
                  <button
                    type="button"
                    onClick={() => update({ vacatedSub: "late" })}
                    className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left w-52 transition-colors ${
                      filters.vacatedSub === "late"
                        ? "border-[#3d5a3a] bg-[#eef5ee]"
                        : "border-[#ddd8ce] bg-[#ede8df] hover:border-[#3d5a3a]/60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px]">✓</span>
                      <span className="text-[12px] font-semibold text-[#1a1a14]">After lease expired</span>
                    </div>
                    <p className="text-[11px] text-[#9a9080] leading-snug">
                      Lease ran its course · normal end-of-term exits
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[13px] font-semibold text-[#1a1a14]">0</span>
                      <span className="text-[11px] text-[#3d5a3a] font-medium">nothing owed</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Officer chips */}
      <div>
        <Label>Officer assigned</Label>
        <div className="flex items-center gap-2 flex-wrap">
          {OFFICERS.map((name) => (
            <Chip
              key={name}
              active={filters.officers.includes(name)}
              onClick={() => toggleOfficer(name)}
            >
              {name}
            </Chip>
          ))}
        </div>
      </div>

      {/* Row 3: Selects */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col min-w-[180px]">
          <Label>Monthly rent</Label>
          <StyledSelect
            value={filters.rent}
            onChange={(v) => update({ rent: v })}
            options={RENT_OPTIONS}
          />
        </div>
        <div className="flex flex-col min-w-[200px]">
          <Label>Outstanding balance</Label>
          <StyledSelect
            value={filters.owing}
            onChange={(v) => update({ owing: v })}
            options={OWING_OPTIONS}
          />
        </div>
        <div className="flex flex-col min-w-[240px]">
          <Label>Action taken by officers</Label>
          <StyledSelect
            value={filters.action}
            onChange={(v) => update({ action: v })}
            options={ACTION_OPTIONS}
          />
        </div>
      </div>

    </div>
  )
}
