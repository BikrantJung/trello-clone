"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"

import { useCardModal } from "@/hooks/use-card-modal"

interface CardItemProps {
  index: number
  card: Card
}
export const CardItem = ({ index, card }: CardItemProps) => {
  const { onOpen } = useCardModal((state) => state)
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          onClick={() => onOpen(card.id)}
          className="truncate rounded-md border-2 border-transparent bg-background px-3 py-2 text-sm shadow-sm hover:border-foreground dark:bg-muted"
        >
          <p>{card.title}</p>
          <span className="truncate text-xs text-muted-foreground">
            {card.description}
          </span>
        </div>
      )}
    </Draggable>
  )
}
