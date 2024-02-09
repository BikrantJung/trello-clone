"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { Board } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

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
    await db.board.delete({
      where: {
        id,
        orgId,
      },
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
