"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    </AccordionItem>
  )
}
