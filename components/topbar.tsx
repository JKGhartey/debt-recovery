"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"

interface SearchResult {
  id: string
  label: string
  type: "tenant" | "area" | "officer"
}

interface TopbarProps {
  readonly pageName?: string
}

export function Topbar({ pageName = "Portfolio overview" }: TopbarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === "Escape") {
        inputRef.current?.blur()
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim().length === 0) {
      setResults([])
      setOpen(false)
      return
    }
    // Placeholder search — replace with real data fetch
    const mock: SearchResult[] = [
      { id: "1", label: "North District", type: "area" },
      { id: "2", label: "John Mensah", type: "tenant" },
      { id: "3", label: "Officer Boateng", type: "officer" },
    ].filter((r) => r.label.toLowerCase().includes(value.toLowerCase()))
    setResults(mock)
    setOpen(mock.length > 0)
  }

  const typeLabel: Record<SearchResult["type"], string> = {
    tenant: "Tenant",
    area: "Area",
    officer: "Officer",
  }

  return (
    <header className="flex items-center h-16 px-8 gap-8 border-b border-[#e1e4ea] bg-[#f5f0e8] shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 min-w-0 shrink-0">
        <Image src="/assets/renmo.svg" alt="Renmo" width={28} height={32} className="select-none" />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6c727f]">
            RENMO · RECOVERY OS
          </span>
          <span className="text-[13px] font-semibold text-[#0e121b] mt-0.5">{pageName}</span>
        </div>
      </div>

      {/* Search */}
      <div ref={containerRef} className="relative flex-1 max-w-[480px] mx-auto">
        <div className="flex items-center gap-2 h-8 px-3 rounded-lg bg-[#ede8df] border border-[#ddd8ce] focus-within:border-[#508d4e] transition-colors">
          <Search className="w-3.5 h-3.5 text-[#6c727f] shrink-0" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search tenants, areas, officers…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search tenants, areas, or officers"
            className="flex-1 bg-transparent text-[13px] text-[#0e121b] placeholder:text-[#6c727f] outline-none min-w-0"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-[#6c727f] font-mono select-none">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>

        {open && results.length > 0 && (
          <ul className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-lg border border-[#ddd8ce] bg-[#f5f0e8] shadow-md overflow-hidden list-none m-0 p-0">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => {
                    setQuery(r.label)
                    setOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-[#ede8df] transition-colors"
                >
                  <span className="text-[13px] text-[#0e121b]">{r.label}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#6c727f]">
                    {typeLabel[r.type]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9cd323] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9cd323]" />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#6c727f] whitespace-nowrap">
          LIVE · ALL SYSTEMS OPERATIONAL
        </span>
      </div>
    </header>
  )
}
