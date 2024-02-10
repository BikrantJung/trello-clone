"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CopyCardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { id, boardId, listId } = data
  let newCard
  try {
    const originalCard = await db.card.findUnique({
      where: {
        id,
        listId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: true,
      },
    })
    if (!originalCard) {
      return {
        error: "Error duplicating list!",
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { position: "desc" },
      select: { position: true },
    })
    const newPosition = lastCard ? lastCard.position + 1 : 1
    newCard = await db.card.create({
      data: {
        title: originalCard.title + " - copy",
        listId: originalCard.listId,
        position: newPosition,
      },
      include: {
        list: true,
      },
    })
    await createAuditLog({
      action: "CREATE",
      entityId: newCard.id,
      entityTitle: newCard.title,
      entityType: ENTITY_TYPE.CARD,
    })
  } catch (error) {
    return {
      error: "Error duplicating card!",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: newCard }
}

export const copyCard = createSafeAction(CopyCardSchema, handler)
