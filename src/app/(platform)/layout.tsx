import React from "react"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/sonner"

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      {children} <Toaster richColors />
    </ClerkProvider>
  )
}

export default PlatformLayout
