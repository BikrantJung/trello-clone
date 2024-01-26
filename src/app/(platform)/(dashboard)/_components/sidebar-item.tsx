"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

interface SidebarItemProps {
  isActive: boolean
  isExpanded: boolean
  organization: Organization
  onExpand: (id: string) => void
}
export const SidebarItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: SidebarItemProps) => {
  const routes = [
    {
      label: "Boards",
      icon: <Icons.layout className="icon-sm mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Icons.activity className="icon-sm mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Icons.settings className="icon-sm mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <Icons.creditCard className="icon-sm mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  const router = useRouter()
  const pathname = usePathname()

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-muted-foreground no-underline transition hover:bg-muted-foreground/10 hover:no-underline",
          isActive && !isExpanded && "bg-accent/10 text-accent"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image
              fill
              alt="Organization Image"
              src={organization.imageUrl}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-muted-foreground">
        {routes.map((route) => {
          return (
            <Button
              key={route.href}
              onClick={() => onClick(route.href)}
              className={cn(
                "mb-1 w-full justify-start pl-10 font-normal ",
                pathname === route.href && "bg-accent/10 text-accent"
              )}
              variant={"ghost"}
            >
              {route.icon}
              {route.label}
            </Button>
          )
        })}
      </AccordionContent>
    </AccordionItem>
  )
}
SidebarItem.Skeleton = function SidebarItemSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
