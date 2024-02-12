import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { AppLogo } from "@/components/ui/logo"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export const MarketingNavbar = () => {
  return (
    <div className="fixed top-0 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <AppLogo />
        <div className="flex w-full items-center justify-center space-x-4 md:w-auto">
          <ModeToggle />
          <Button asChild size="sm" variant="outline">
            <Link href={siteConfig.links.github} target="_blank">
              <Icons.github className="h-4 w-4 stroke-[1.8px]" />
            </Link>
          </Button>

          <Button variant={"outline"} asChild size="sm">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
