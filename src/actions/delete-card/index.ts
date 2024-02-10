"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { DeleteCardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { id, boardId } = data
  let card
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })
    await createAuditLog({
      action: "DELETE",
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    })
  } catch (error) {
    return {
      error: "Error deleting card!",
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const deleteCard = createSafeAction(DeleteCardSchema, handler)
