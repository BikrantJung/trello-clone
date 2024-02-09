"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { Board, List } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { UpdateListSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { title, boardId, position, listId } = data
  let list: List
  try {
    list = await db.list.update({
      where: {
        id: listId,
        board: {
          id: boardId,
        },
      },
      data: {
        title,
        boardId,
        position,
      },
    })
  } catch (error) {
    return {
      error: "Error updating list! See console for error",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: list,
    statusCode: 201,
  }
}

export const updateList = createSafeAction(UpdateListSchema, handler)
