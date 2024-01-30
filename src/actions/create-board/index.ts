"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { CreateBoardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()
  if (!userId) {
    return {
      error: "Unauthorized",
      statusCode: 401,
    }
  }

  //   'data' is already validated here, because we will wrap this handler inside createSafeAction
  let board
  try {
    board = await db.board.create({ data })
  } catch (error) {
    return {
      error: "Failed to create.",
      statusCode: 500,
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}
export const createBoard = createSafeAction(CreateBoardSchema, handler)
