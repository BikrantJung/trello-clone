import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export const MarketingFooter = () => {
  return (
    <div className="fixed bottom-0 w-full border-t bg-background p-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex w-full items-center justify-center space-x-4 md:block md:w-auto">
          <Button variant={"link"} asChild size="sm">
            <Link href="/login">Privacy Policy</Link>
          </Button>
          <Button variant={"link"} asChild size="sm">
            <Link href="/login">Github</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
