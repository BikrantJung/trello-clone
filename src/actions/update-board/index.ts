"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { Board, ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { UpdateBoardSchem } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }
  const { title, id, image, orgId: boardOrgId } = data
  let board: Board
  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
        orgId: boardOrgId || orgId,
        ...image,
      },
    })
    await createAuditLog({
      action: "UPDATE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    })
  } catch (error) {
    return {
      error: "Error updaing board! See console for error",
    }
  }
  revalidatePath(`/board/${id}`)
  return {
    data: board,
    statusCode: 201,
  }
}

export const updateBoard = createSafeAction(UpdateBoardSchem, handler)
