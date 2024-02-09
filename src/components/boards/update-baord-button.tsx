import { Board } from "@prisma/client"

import { FormPopover } from "../forms/form-popover"
import { Icons } from "../icons"
import { UpdateBoardForm } from "./forms/update-board.form"

interface UpdateBoardButtonProps {
  board: Board
}
export const UpdateBoardButton = async ({ board }: UpdateBoardButtonProps) => {
  return (
    <FormPopover
      sideOffset={20}
      side={"bottom"}
      formComponent={<UpdateBoardForm board={board} />}
      formPopoverTitle="Update Board"
    >
      <button className="flex items-center gap-2 rounded-md bg-muted-foreground/40 px-2 py-1.5 font-semibold text-white">
        <p className="text-sm">{board.title}</p>
        <Icons.pencil className="h-[14px] w-[14px]" />
      </button>
    </FormPopover>
  )
}
