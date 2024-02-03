import { auth } from "@clerk/nextjs"
import { startCase } from "lodash"

import { OrgControl } from "../_components/org-control"
import { DashboardSidebar } from "../_components/sidebar"

export async function generateMetadata() {
  const { orgSlug } = auth()
  return {
    title: startCase(orgSlug || "organization"),
  }
}

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto w-full p-4 md:max-w-screen-2xl">
      <OrgControl />
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:block">
          {/* Sidebar */}
          <DashboardSidebar />
        </div>

        {children}
      </div>
    </main>
  )
}
export default OrganizationLayout
