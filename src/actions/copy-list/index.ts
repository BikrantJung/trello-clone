"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CopyListSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { id, boardId } = data
  let newList
  try {
    const originalList = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    })
    if (!originalList) {
      return {
        error: "Error duplicating list!",
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { position: "desc" },
      select: { position: true },
    })
    const newPosition = lastList ? lastList.position + 1 : 1
    newList = await db.list.create({
      data: {
        title: originalList.title + " - copy",
        boardId: originalList.boardId,
        position: newPosition,
        cards: {
          createMany: {
            data: originalList.cards.map((card) => ({
              title: card.title,
              description: card.description,
              position: card.position,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    })
  } catch (error) {
    return {
      error: "Error duplicating list!",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: newList }
}

export const copyList = createSafeAction(CopyListSchema, handler)
