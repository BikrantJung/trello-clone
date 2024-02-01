"use client"

import { createBoard } from "@/actions/create-board/index"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"

interface FormPopoverProps {
  children: React.ReactNode
  side?: "left" | "right" | "bottom" | "top"
  align?: "start" | "center" | "end"
  sideOffset?: number
  formComponent: React.ReactNode
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
  formComponent,
}: FormPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-center text-sm font-medium text-muted-foreground/90">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
            variant="ghost"
          >
            <Icons.x className="icon-sm" />
          </Button>
        </PopoverClose>
        {formComponent}
      </PopoverContent>
    </Popover>
  )
}
