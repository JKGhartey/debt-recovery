import { PageHeader } from "@/components/page-header"
import { Filters } from "@/components/filters"
import { KpiStrip } from "@/components/kpi-strip"
import { CollectionsPanel } from "@/components/collections-panel"
import { TopDefaulters } from "@/components/top-defaulters"
import { PortfolioBreakdown } from "@/components/portfolio-breakdown"
import { OfficerLeaderboard } from "@/components/officer-leaderboard"
import { AdaInsights } from "@/components/ada-insights"

export default function Page() {
  return (
    <div className="px-8 pt-8 pb-12">
      <PageHeader tenantCount={150} userName="Ama" />
      <Filters />
      <KpiStrip />
      <CollectionsPanel />
      <div className="mt-6 grid grid-cols-[3fr_2fr] gap-4">
        <TopDefaulters />
        <PortfolioBreakdown />
      </div>
      <OfficerLeaderboard />
      <AdaInsights />
    </div>
  )
}
