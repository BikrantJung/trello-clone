"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  })
  //   TODO: Make org_id dynamic
  revalidatePath("/organization/org_2bSKbVfkRzaiJVN5TO2UngRRPH0")
}
