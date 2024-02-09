"use client"

import { Button } from "@/components/ui/button"
import { CreateBoardForm } from "@/components/boards/create-board.form"
import { FormPopover } from "@/components/forms/form-popover"

export const CreateBoardButton = () => {
  console.log("Clicked")
  return (
    <FormPopover
      sideOffset={10}
      side={"bottom"}
      formComponent={<CreateBoardForm />}
      formPopoverTitle="Create Board"
    >
      <Button
        size="sm"
        className="mr-8 h-auto rounded-sm px-1.5 py-1 text-xs md:px-2 md:py-1.5 md:text-sm"
      >
        Create
      </Button>
    </FormPopover>
  )
}
