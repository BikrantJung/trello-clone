"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { Board, Card, List } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CreateCardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { title, boardId, listId } = data
  let card: Card
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
      },
    })
    if (!list) return { error: "The list doesn't exists!" }

    const lastPosition = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: { position: "desc" },
      select: { position: true },
    })
    const newPosition = lastPosition ? lastPosition.position + 1 : 1
    card = await db.card.create({
      data: {
        title,
        position: newPosition,
        listId,
      },
    })
  } catch (error) {
    return {
      error: "Error creating card!",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: card,
    statusCode: 201,
  }
}

export const createCard = createSafeAction(CreateCardSchema, handler)
