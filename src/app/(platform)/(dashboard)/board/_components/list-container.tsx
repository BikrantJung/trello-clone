import { ListWithCards } from "@/prisma/types"
import { List } from "@prisma/client"

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}
export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  return <div></div>
}
