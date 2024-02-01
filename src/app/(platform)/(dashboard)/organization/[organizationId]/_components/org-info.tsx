"use client"

import Image from "next/image"
import { useOrganization } from "@clerk/nextjs"

import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

interface OrgInfoProps {}

export const OrgInfo = () => {
  const { organization, isLoaded } = useOrganization()
  if (!isLoaded) {
    return <OrgInfo.Skeleton />
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px] overflow-hidden rounded-lg">
        <Image fill src={organization?.imageUrl || ""} alt="Organization" />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Icons.creditCard className="icon-sm mr-1" />
          Free
        </div>
      </div>
    </div>
  )
}
OrgInfo.Skeleton = function OrgInfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="h-[60px] w-[60px] rounded-lg" />
      <div className="space-y-1">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}
