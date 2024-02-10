import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { OrgInfo } from "../_components/org-info"
import { ActivityList } from "./_components/activity-list"

const ActivityPage = () => {
  return (
    <div className="w-full">
      <OrgInfo />
      <Separator className="my-2" />
      <ScrollArea className="h-[36rem]">
        <ActivityList />
      </ScrollArea>
    </div>
  )
}

export default ActivityPage
