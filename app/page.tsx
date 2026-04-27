import { PageHeader } from "@/components/page-header"
import { Filters } from "@/components/filters"

export default function Page() {
  return (
    <div className="px-8 pt-8 pb-12">
      <PageHeader tenantCount={150} userName="Ama" />
      <Filters />
    </div>
  )
}
