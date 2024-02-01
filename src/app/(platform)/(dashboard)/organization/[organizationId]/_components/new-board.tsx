"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CreateBoardForm } from "@/components/boards/create-board.form"
import { Hint } from "@/components/boards/hint"
import { FormPopover } from "@/components/forms/form-popover"
import { Icons } from "@/components/icons"

export const NewBoardPopover = () => {
  return (
    <FormPopover
      sideOffset={10}
      side={"right"}
      formComponent={<CreateBoardForm />}
    >
      <div
        role="button"
        className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm border border-accent  bg-accent/10 transition "
      >
        <Button size="sm">Create new board</Button>
        <span className="text-xs">5 remaining</span>
        <div className="absolute bottom-2 right-2">
          <Hint
            content={
              <code className="">
                Free workspaces can have up to 5 open boards.{" "}
                {/* // TODO: Update href  */}
                <Link href="/" className="text-accent underline">
                  Updrage
                </Link>{" "}
                for unlimited boards.
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
