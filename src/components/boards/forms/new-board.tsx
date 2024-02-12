"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CreateBoardForm } from "@/components/boards/forms/create-board.form"
import { Hint } from "@/components/boards/hint"
import { FormPopover } from "@/components/forms/form-popover"
import { Icons } from "@/components/icons"

export const NewBoardCard = ({
  remainingBoards,
}: {
  remainingBoards: number
}) => {
  return (
    <FormPopover
      formPopoverTitle="Create Board"
      sideOffset={10}
      side={"right"}
      formComponent={<CreateBoardForm />}
    >
      <div
        role="button"
        className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm border border-border bg-accent/10 hover:border-accent "
      >
        <Button size="sm">Create new board</Button>
        <span className="text-xs">{2 - remainingBoards} remaining</span>
        <div className="absolute bottom-2 right-2">
          <Hint
            content={
              <code className="">
                You can only create 2 boards in this demo app.
              </code>
            }
            sideOffset={20}
          >
            <Icons.helpCircle className="h-[14px] w-[14px]" />
          </Hint>
        </div>
      </div>
    </FormPopover>
  )
}
