"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { Board, Card, List } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { UpdateCardPositionSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { items, boardId } = data
  let updatedCards: Card[]
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          position: card.position,
          listId: card.listId,
        },
      })
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: "Failed to reorder",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: updatedCards,
    statusCode: 201,
  }
}

export const updateCardPosition = createSafeAction(
  UpdateCardPositionSchema,
  handler
)
