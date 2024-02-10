import { useRef, useState } from "react"
import { ListWithCards } from "@/prisma/types"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"

import { CardItem } from "./card-item"
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
    <Draggable draggableId={list.id} key={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div className="w-full rounded-md bg-muted pb-2 shadow-md dark:bg-background">
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} key={list.id} type="card">
              {(_provided) => (
                <ol
                  ref={_provided.innerRef}
                  {...provided.draggableProps}
                  className={cn(
                    "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                    list.cards.length ? "mt-2" : "mt-0"
                  )}
                >
                  {list.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} card={card} />
                  ))}
                  {_provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              listId={list.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
