"use client"

import { AuditLog } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem } from "@/components/activity-item"
import { Icons } from "@/components/icons"

interface ActivityProps {
  auditLogsData: AuditLog[]
}
export const Activity = ({ auditLogsData }: ActivityProps) => {
  return (
    <div className="flex w-full items-start gap-x-3 ">
      <Icons.activity className="icon-sm mt-0.5" />
      <div className="w-full">
        <p className="mb-2 font-semibold">Activity</p>
        <ol className="mt-2 space-y-4">
          {auditLogsData.map((data) => {
            return <ActivityItem key={data.id} log={data} />
          })}
        </ol>
      </div>
    </div>
  )
}
Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-muted" />
      <div className="w-full ">
        <Skeleton className="mb-2 h-6 w-24 bg-muted" />
        <Skeleton className="h-10 w-full bg-muted" />
      </div>
    </div>
  )
}
