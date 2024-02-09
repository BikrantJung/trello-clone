import Link from "next/link"
import { getBoards } from "@/actions/get-board"

import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

import { BoardSettingsMenu } from "./board-setting-menu"
import { NewBoardCard } from "./forms/new-board"

export const BoardList = async () => {
  const { data: boards } = await getBoards()
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-muted-foreground">
        <Icons.user className="icon-sm mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards
          ? boards.map((board) => (
              <Link
                href={`/board/${board.id}`}
                key={board.id}
                className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-accent bg-cover bg-center bg-no-repeat p-2"
                style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              >
                {/* {board.title} */}
                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                <p className="relative font-semibold text-white">
                  {board.title}
                </p>
              </Link>
            ))
          : "No boards"}
        <NewBoardCard />
      </div>
      {/* <Board /> */}
    </div>
  )
}
BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  )
}
