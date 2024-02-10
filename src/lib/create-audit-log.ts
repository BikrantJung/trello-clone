import { auth, currentUser } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

import { db } from "@/lib/db"

interface AuditLogCreateProps {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}
export const auditLog = async (props: AuditLogCreateProps) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()
    if (!user || !orgId) {
      throw new Error("Unauthenticated!")
    }
    await db.auditLogs.create({
      data: {
        orgId,
        userId: user.id,
        userImage: user.imageUrl,
        username: user.firstName + " " + user.lastName,
        ...props,
      },
    })
  } catch (error) {
    console.log(`🔥 create-audit-log.ts:16 ~ Error: ~`, error)
  }
}
