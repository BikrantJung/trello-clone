"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { decreaseAvailableCount } from "@/lib/org-limit"

import { DeleteBoardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { id } = data
  try {
    const board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
    await decreaseAvailableCount()
    await createAuditLog({
      action: "DELETE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    })
  } catch (error) {
    return {
      error: "Error updaing board! See console for error",
    }
  }
  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler)
