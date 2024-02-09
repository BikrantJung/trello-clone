"use client"

import { redirect } from "next/navigation"
import { deleteBoard } from "@/actions/delete-board"
import { Board } from "@prisma/client"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/use-action"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Icons } from "../icons"

interface BoardSettingsMenuProps {
  board: Board
  className?: string
}

export const BoardSettingsMenu = ({
  board,
  className,
}: BoardSettingsMenuProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success("Board Deleted!")
    },
  })
  return (
    <Menubar
      className={cn(
        "h-auto space-x-0 border-none bg-muted-foreground/40 p-0 text-white",
        className
      )}
    >
      <MenubarMenu>
        <MenubarTrigger asChild className="cursor-pointer p-0">
          <button className="flex items-center gap-2 px-2 py-1.5">
            <Icons.moreHorizontal className="h-4 w-4 stroke-[2px]" />
          </button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            disabled={isLoading}
            className="flex cursor-pointer items-center justify-between focus:bg-muted focus:text-black"
            onClick={() => execute({ id: board.id })}
          >
            <span>Delete this board</span>
            {isLoading ? (
              <Icons.loader className="icon-sm animate-spin" />
            ) : (
              <Icons.trash className="icon-sm" />
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
