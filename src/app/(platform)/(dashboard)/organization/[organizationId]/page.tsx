import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import { BoardList } from "@/components/boards/board-list"

import { OrgInfo } from "./_components/org-info"

const OrganizationIdPage = async () => {
  return (
    <div className="mb-20 w-full">
      <OrgInfo />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationIdPage
