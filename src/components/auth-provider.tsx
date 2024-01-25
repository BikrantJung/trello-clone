"use client"

import * as React from "react"
import { ClerkProvider } from "@clerk/nextjs"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
