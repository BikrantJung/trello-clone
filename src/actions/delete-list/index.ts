"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
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
    await createAuditLog({
      action: "DELETE",
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
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
