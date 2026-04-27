export const PAYMENT_STATUS = [
  { key: "current", label: "Current", color: "#3d5a3a", bg: "#eef4ee", count: 92 },
  { key: "1-30",    label: "1–30",    color: "#0f5e5a", bg: "#e8f4f3", count: 32 },
  { key: "31-60",   label: "31–60",   color: "#b3610a", bg: "#fdf0e5", count: 8  },
  { key: "61-90",   label: "61–90",   color: "#c57a3f", bg: "#fdf4ec", count: 9  },
  { key: "90+",     label: "90+",     color: "#8a2a2a", bg: "#fdeaea", count: 9  },
] as const

export const OFFICERS = ["Kojo", "Esi", "Kofi", "Abena", "Yaw", "Ama"] as const

export const OCCUPANCY_OPTIONS = [
  { key: "all",      label: "All",             count: 150 },
  { key: "occupied", label: "Still living in", count: 144 },
  { key: "vacated",  label: "Moved out",       count: 6   },
] as const

export const VACATED_CARDS = [
  {
    key:   "early",
    icon:  "⚠️",
    label: "Before lease expired",
    desc:  "Left while still obligated · typically skips or evictions",
    count: 6,
    owed:  "₵70k owed",
    activeColor:  { border: "#c57a3f", bg: "#fdf3e8", text: "#c57a3f" },
    hoverBorder:  "rgba(197,122,63,0.4)",
  },
  {
    key:   "late",
    icon:  "✅",
    label: "After lease expired",
    desc:  "Lease ran its course · normal end-of-term exits",
    count: 0,
    owed:  "nothing owed",
    activeColor:  { border: "#3d5a3a", bg: "#eef4ee", text: "#3d5a3a" },
    hoverBorder:  "rgba(61,90,58,0.4)",
  },
] as const

export const RENT_OPTIONS = [
  { value: "all",        label: "All rent levels"  },
  { value: "0-1000",     label: "Under ₵1,000"     },
  { value: "1000-2500",  label: "₵1,000 – ₵2,500" },
  { value: "2500-4000",  label: "₵2,500 – ₵4,000" },
  { value: "4000-10000", label: "Over ₵4,000"      },
] as const

export const OWING_OPTIONS = [
  { value: "all",         label: "All balances"           },
  { value: "none",        label: "Paid up (nothing owed)" },
  { value: "0-5000",      label: "Under ₵5,000"           },
  { value: "5000-15000",  label: "₵5,000 – ₵15,000"      },
  { value: "15000-99999", label: "Over ₵15,000"           },
] as const

export const ACTION_OPTIONS = [
  { value: "all",                   label: "Any action (or none)"         },
  { value: "none",                  label: "No action taken yet"          },
  { value: "landlord",              label: "Landlord contacted"           },
  { value: "employer",              label: "Employer contacted"           },
  { value: "visited",               label: "Visited"                      },
  { value: "locked",                label: "Locked house"                 },
  { value: "evicted",               label: "Evicted"                      },
  { value: "eviction_notice",       label: "Eviction notice served"       },
  { value: "undertaking_signed",    label: "Undertaking letter signed"    },
  { value: "undertaking_delivered", label: "Undertaking letter delivered" },
  { value: "seized_item",           label: "Seized an item"               },
] as const

export type OccupancyView = "all" | "occupied" | "vacated"
export type VacatedSub    = "any" | "early" | "late"

export interface FiltersState {
  paymentStatus: string[]
  occupancy:     OccupancyView
  vacatedSub:    VacatedSub
  officers:      string[]
  rent:          string
  owing:         string
  action:        string
}

export const DEFAULT_FILTERS: FiltersState = {
  paymentStatus: [],
  occupancy:     "all",
  vacatedSub:    "any",
  officers:      [],
  rent:          "all",
  owing:         "all",
  action:        "all",
}
