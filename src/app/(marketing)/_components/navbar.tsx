import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

export const MarketingNavbar = () => {
  return (
    <div className="fixed top-0 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex w-full items-center justify-center space-x-4 md:w-auto">
          <ModeToggle />
          <Button variant={"outline"} asChild size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
