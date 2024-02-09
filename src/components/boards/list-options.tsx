"use client"

import { deleteList } from "@/actions/delete-list"
import { List } from "@prisma/client"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Icons } from "@/components/icons"

/** List Options Component
 * Includes options like: Add new card, delete this list
 *
 */
interface ListOptionsProps {
  list: List
  onAddCard: () => void
}
const menubarItemClassnames =
  "flex cursor-pointer items-center justify-between py-2"
export const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess() {
      toast.success("List Deleted!")
    },
  })
  return (
    <Menubar className="h-auto space-x-0 p-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer p-1">
          <Icons.moreHorizontal className="h-4 w-4  stroke-[2px]" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className={menubarItemClassnames}>
            Add new card
            <Icons.plus className="icon-sm" />
          </MenubarItem>
          <MenubarItem className={menubarItemClassnames}>
            Duplicate list
            <Icons.copy className="icon-sm" />
          </MenubarItem>
          <MenubarItem
            className={menubarItemClassnames}
            onClick={() =>
              executeDelete({ boardId: list.boardId, id: list.id })
            }
          >
            Delete list
            <Icons.trash className="icon-sm" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
