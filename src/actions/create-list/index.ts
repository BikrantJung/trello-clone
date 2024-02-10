"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE, List } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CreateListSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { title, boardId } = data
  let list: List
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })
    if (!board) return { error: "Board not found" }

    const lastPosition = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { position: "desc" },
      select: { position: true },
    })
    const newPosition = lastPosition ? lastPosition.position + 1 : 1
    list = await db.list.create({
      data: {
        title,
        boardId,
        position: newPosition,
      },
    })
    await createAuditLog({
      action: "CREATE",
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    })
  } catch (error) {
    return {
      error: "Error creating list! See console for error",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: list,
    statusCode: 201,
  }
}

export const createList = createSafeAction(CreateListSchema, handler)
