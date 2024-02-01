import { Icons } from "@/components/icons"

import { NewBoardPopover } from "./new-board"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-muted-foreground">
        <Icons.user className="icon-sm mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <NewBoardPopover />
      </div>
      {/* <Board /> */}
    </div>
  )
}
