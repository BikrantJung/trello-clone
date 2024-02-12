import React from "react"
import Link from "next/link"

import { Card, CardHeader } from "@/components/ui/card"

export const TechnologyCard = ({
  component,
  packageHref,
}: {
  component: React.ReactNode
  packageHref: string
}) => {
  return (
    <Link href={packageHref} target="_blank">
      <Card className="cursor-pointer shadow-none hover:bg-secondary/30">
        <CardHeader>{component}</CardHeader>
      </Card>
    </Link>
  )
}
