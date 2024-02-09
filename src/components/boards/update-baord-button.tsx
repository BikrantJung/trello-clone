import { Board } from "@prisma/client"

import { FormPopover } from "../forms/form-popover"
import { Icons } from "../icons"
import { UpdateBoardForm } from "./update-board.form"

export const UpdateBoardButton = async ({ board }: { board: Board }) => {
  return (
    <FormPopover
      sideOffset={20}
      side={"bottom"}
      formComponent={<UpdateBoardForm board={board} />}
      formPopoverTitle="Update Board"
    >
      <button className="flex items-center gap-2 rounded-md bg-muted-foreground/30 px-2 py-1.5 ">
        <p className="text-sm">{board.title}</p>
        <Icons.settings className="icon-sm" />
      </button>
    </FormPopover>
  )
}
