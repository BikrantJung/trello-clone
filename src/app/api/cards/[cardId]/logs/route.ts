import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"

import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const auditLogs = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        orgId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    })
    console.log({ auditLogs })
    return NextResponse.json(auditLogs)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
