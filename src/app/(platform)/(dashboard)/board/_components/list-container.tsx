"use client"

import { useEffect, useState } from "react"
import { ListWithCards } from "@/prisma/types"
import { List } from "@prisma/client"

import { ListForm } from "@/components/boards/forms/list-form"
import { ListItem } from "@/components/boards/list-item"

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}
export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists)

  useEffect(() => {
    console.log("Reference to lists changed.")
    setOrderedLists(lists)
  }, [lists])

  return (
    <ol className="h-p flex gap-x-3">
      {orderedLists.map((list, i) => (
        <ListItem key={list.id} index={i} list={list} />
      ))}
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  )
}
