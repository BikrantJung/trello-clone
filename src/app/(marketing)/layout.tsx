import React from "react"

import { MarketingFooter } from "./_components/footer"
import { MarketingNavbar } from "./_components/navbar"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <MarketingNavbar />
      <main className="">{children}</main>
      <MarketingFooter />
    </div>
  )
}

export default MarketingLayout
