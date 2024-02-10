"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { Board, List } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { UpdateListPositionSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { boardId, items } = data
  let lists: List[]
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          position: list.position,
        },
      })
    )

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: "Failed to reorder",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: lists,
    statusCode: 201,
  }
}

export const updateListPosition = createSafeAction(
  UpdateListPositionSchema,
  handler
)
