"use client"

import { useEffect, useState } from "react"
import { updateCardPosition } from "@/actions/update-card-position"
import { updateListPosition } from "@/actions/update-list-position"
import { ListWithCards } from "@/prisma/types"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { ListForm } from "@/components/boards/forms/list-form"
import { ListItem } from "@/components/boards/list-item"

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists)
  const { execute: executeUpdateListPosition } = useAction(updateListPosition, {
    onSuccess: () => {
      toast.success("List reordered!")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const { execute: executeUpdateCardPosition } = useAction(updateCardPosition, {
    onSuccess: () => {
      toast.success("Card reordered!")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return

    // If dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    )
      return

    // If user is moving a list..
    // This type is coming from <Droppable type="" />

    if (type === "list") {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (item, index) => ({ ...item, position: index })
      )
      setOrderedLists(items)
      executeUpdateListPosition({ items, boardId })
    }

    // If user moves a card
    if (type === "card") {
      const newOrderedLists = [...orderedLists]

      // Get source and destination list
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId
      )
      const destinationList = newOrderedLists.find(
        (list) => list.id === destination.droppableId
      )
      if (!sourceList || !destinationList) return

      // Check if cards exists on source list or destination list
      if (!sourceList.cards) {
        sourceList.cards = []
      }
      if (!destinationList.cards) {
        destinationList.cards = []
      }

      // Check if a card is moved within the same list or through different list

      // Moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderedCards.forEach((card, idx) => {
          card.position = idx
        })

        sourceList.cards = reorderedCards

        setOrderedLists(newOrderedLists)
        executeUpdateCardPosition({ boardId, items: reorderedCards })
      } else {
        // Moving the card to another list
        // Remove card from source list and add to destination list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        movedCard.listId = destination.droppableId

        // Add card to destination liset
        destinationList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, idx) => {
          card.position = idx
        })

        // Update position for each cards in destination list
        destinationList.cards.forEach((card, idx) => {
          card.position = idx
        })
        setOrderedLists(newOrderedLists)

        executeUpdateCardPosition({ boardId, items: destinationList.cards })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="lists"
        key="lists"
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-p flex gap-x-3"
          >
            {orderedLists.map((list, i) => (
              <ListItem key={list.id} index={i} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
