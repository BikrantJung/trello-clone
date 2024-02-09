import { ListWithCards } from "@/prisma/types"

import { ListHeader } from "./list-header"

interface ListItemProps {
  index: number
  list: ListWithCards
}
export const ListItem = ({ index, list }: ListItemProps) => {
  return (
    <div className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-background pb-2 shadow-md">
        <ListHeader list={list} />
      </div>
    </div>
  )
}
