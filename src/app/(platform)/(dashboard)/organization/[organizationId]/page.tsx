import { OrganizationSwitcher } from "@clerk/nextjs"

const OrganizationIdPage = ({
  params,
}: {
  params: { organizationId: string }
}) => {
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
