import { AuditLog } from "@prisma/client"
import { format } from "date-fns"

import { generateLogMessage } from "@/lib/generate-log-message"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityItemProps {
  log: AuditLog
}
export const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={log.userImage} />
        <AvatarFallback>{log.username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm">
          <span className="font-semibold lowercase ">{log.username}</span>
          <span>{generateLogMessage(log)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}
