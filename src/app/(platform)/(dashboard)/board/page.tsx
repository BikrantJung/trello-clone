import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

function BoardPage() {
  const { orgId } = auth()
  if (!orgId) redirect(`/select-org`)
  redirect(`/organization/${orgId}`)
}
export default BoardPage
