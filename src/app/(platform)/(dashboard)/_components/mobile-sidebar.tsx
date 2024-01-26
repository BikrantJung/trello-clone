"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

import { DashboardSidebar } from "./sidebar"

const MobileSidebar = () => {
  const pathname = usePathname()

  const [isMounted, setIsMounted] = useState(false)
  const { isOpen, onClose, onOpen } = useMobileSidebar((state) => state)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) return null

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Icons.menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <DashboardSidebar key="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar
