import React from "react"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <>
          {children}
          <Toaster />
          <ModalProvider />
        </>
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlatformLayout
