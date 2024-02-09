import { Board } from "@prisma/client"

import { BoardSettingsMenu } from "@/components/boards/board-setting-menu"
import { UpdateBoardButton } from "@/components/boards/update-baord-button"

interface BoardNavbarProps {
  board: Board
}
export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6">
      <UpdateBoardButton board={board} />
      <div className="ml-auto">
        <BoardSettingsMenu board={board} />
        {/* <UpdateBoardButton board={board} /> */}
      </div>
    </div>
  )
}
