import React from "react"
import { redirect } from "next/navigation"
import { auth, OrganizationSwitcher } from "@clerk/nextjs"

const OrganizationIdPage = ({
  params,
}: {
  params: { organizationId: string }
}) => {
  const { orgId } = auth()
  if (orgId != params.organizationId) redirect("/")
  return (
    <div>
      <div>
        <OrganizationSwitcher hidePersonal />
      </div>

      {params.organizationId}
    </div>
  )
}

export default OrganizationIdPage
