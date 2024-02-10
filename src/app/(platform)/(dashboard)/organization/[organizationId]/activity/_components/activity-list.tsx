import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { ActivityItem } from "@/components/activity-item"

export const ActivityList = async () => {
  const { orgId } = auth()
  if (!orgId) redirect("/select-org")
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs last:block">No activity yet.</p>
      {auditLogs.map((data) => (
        <ActivityItem key={data.id} log={data} />
      ))}
    </ol>
  )
}
