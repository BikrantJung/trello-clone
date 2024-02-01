import Link from "next/link"

import { Hint } from "@/components/boards/hint"
import { Icons } from "@/components/icons"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-muted-foreground">
        <Icons.user className="icon-sm mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div
          role="button"
          className="relative flex aspect-video h-full w-full flex-col items-center gap-y-1 rounded-sm bg-muted bg-red-300 transition hover:opacity-75"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
          <div className="absolute bottom-2 right-2">
            <Hint
              content={
                <code className="">
                  Free workspaces can have up to 5 open boards.{" "}
                  {/* // TODO: Update href  */}
                  <Link href="/" className="text-accent underline">
                    Updrage
                  </Link>{" "}
                  for unlimited boards.
                </code>
              }
              sideOffset={20}
            >
              <Icons.helpCircle className="h-[14px] w-[14px]" />
            </Hint>
          </div>
        </div>
      </div>
      {/* <Board /> */}
    </div>
  )
}
