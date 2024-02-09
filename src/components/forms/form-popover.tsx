"use client"

import { ElementRef, useEffect, useRef, useState } from "react"

import { useFieldErrors } from "@/hooks/use-field-errors"
import { useFormPopover } from "@/hooks/use-form-popover"
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
  formPopoverTitle: string
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
  formComponent,
  formPopoverTitle,
}: FormPopoverProps) => {
  const { setResetFieldErrors } = useFieldErrors((state) => state)
  const { isOpen, setIsOpen } = useFormPopover()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const popoverCloseRef = useRef<ElementRef<"button">>(null)

  useEffect(() => {
    if (!isOpen && isPopoverOpen) {
      popoverCloseRef.current?.click()
      // console.log(popoverCloseRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, setIsOpen])
  return (
    <Popover
      modal
      onOpenChange={(state) => {
        setIsOpen(state)
        setResetFieldErrors(state)
        setIsPopoverOpen(state)
        if (!isOpen && state) {
          popoverCloseRef.current?.click()
        }
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-center text-sm font-medium text-muted-foreground/90">
          {formPopoverTitle}
        </div>

        <PopoverClose ref={popoverCloseRef} asChild>
          <Button
            onClick={() => {
              console.log("BUTTON IS CLICKED")
            }}
            ref={popoverCloseRef}
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
