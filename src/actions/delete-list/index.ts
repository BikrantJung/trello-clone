"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { DeleteListSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { id, boardId } = data
  let list
  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
      },
    })
  } catch (error) {
    return {
      error: "Error deleting list! See console for error",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const deleteList = createSafeAction(DeleteListSchema, handler)
