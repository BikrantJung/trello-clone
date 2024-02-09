"use client"

import { copyList } from "@/actions/copy-list"
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
  const { execute: executeDeleteList } = useAction(deleteList, {
    onSuccess() {
      toast.success("List Deleted!")
    },
  })
  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess() {
      toast.success("List Duplicated!")
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
          <MenubarItem
            className={menubarItemClassnames}
            onClick={() =>
              executeCopyList({ boardId: list.boardId, id: list.id })
            }
          >
            Duplicate list
            <Icons.copy className="icon-sm" />
          </MenubarItem>
          <MenubarItem
            className={menubarItemClassnames}
            onClick={() =>
              executeDeleteList({ boardId: list.boardId, id: list.id })
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
