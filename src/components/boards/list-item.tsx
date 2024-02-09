import { useRef, useState } from "react"
import { ListWithCards } from "@/prisma/types"
import { useOnClickOutside } from "usehooks-ts"

import { CardForm } from "./forms/card-form"
import { ListHeader } from "./list-header"

interface ListItemProps {
  index: number
  list: ListWithCards
}
export const ListItem = ({ index, list }: ListItemProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  function disableEditing() {
    setIsEditing(false)
  }
  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    })
  }
  return (
    <div className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-background pb-2 shadow-md">
        <ListHeader list={list} onAddCard={enableEditing} />
        {list.cards.map((card) => (
          <div key={card.id}>{card.title}</div>
        ))}
        <CardForm
          ref={textAreaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={list.id}
        />
      </div>
    </div>
  )
}
