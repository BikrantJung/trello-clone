"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CreateBoardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
      statusCode: 401,
    }
  }

  //   'data' is already validated here, because we will wrap this handler inside createSafeAction
  let board
  try {
    board = await db.board.create({
      data: {
        title: data.title,
        orgId,
        ...data.image,
      },
    })
  } catch (error) {
    console.log(error)
    console.log("CREATE BOARD ERROR==>", error)
    return {
      error: "Failed to create.",
      statusCode: 500,
    }
  }
  await createAuditLog({
    action: "CREATE",
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
  })
  revalidatePath(`/board/${board.id}`)
  return { data: board }
}
export const createBoard = createSafeAction(CreateBoardSchema, handler)
