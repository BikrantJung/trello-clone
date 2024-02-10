"use server"

import { revalidatePath } from "next/cache"
import { CardWithList } from "@/prisma/types"
import { auth } from "@clerk/nextjs"
import { Board, Card } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { UpdateCardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { title, id, boardId, description } = data
  let card: Card
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            id: boardId,
          },
        },
      },
      data: {
        title,
        description,
      },
    })
  } catch (error) {
    return {
      error: "Error updaing card!",
    }
  }
  revalidatePath(`/board/${id}`)
  return {
    data: card,
    statusCode: 201,
  }
}

export const updateCard = createSafeAction(UpdateCardSchema, handler)
