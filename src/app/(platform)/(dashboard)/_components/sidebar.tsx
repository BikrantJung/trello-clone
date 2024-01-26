"use client"

import Link from "next/link"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useLocalStorage } from "usehooks-ts"

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

import { Organization, SidebarItem } from "./sidebar-item"

interface DashboardSidebarProps {
  // Key to store which sidebar items are expanded in local storage
  storageKey?: string
}

export const DashboardSidebar = ({
  storageKey = "t-dashboard-sidebar-state",
}: DashboardSidebarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )

  const { organization: activeOrg, isLoaded: isOrgLoaded } = useOrganization()
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc
    },
    []
  )
  const onExpand = (id: string) => {
    setExpanded((cur) => ({
      ...cur,
      [id]: !expanded[id],
    }))
  }

  if (!isOrgLoaded || !isOrgListLoaded || userMemberships.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size={"icon"}
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Icons.plus className="icon-sm" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrg?.id === organization.id}
            isExpanded={expanded[organization.id]}
            onExpand={() => onExpand(organization.id)}
            organization={organization as Organization}
          />
        ))}
      </Accordion>
    </>
  )
}
