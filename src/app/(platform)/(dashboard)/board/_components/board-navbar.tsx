import { auth } from "@clerk/nextjs"
import { Board } from "@prisma/client"

import { db } from "@/lib/db"
import { UpdateBoardButton } from "@/components/boards/update-baord-button"
import { Icons } from "@/components/icons"

interface BoardNavbarProps {
  board: Board
}
export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <UpdateBoardButton board={board} />
    </div>
  )
}
