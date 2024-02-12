import Link from "next/link"

import { siteConfig } from "@/config/site"
import { TechnologyCard } from "@/components/tech-card"
import { NextjsLogo } from "@/components/tech-logos/nextjs-logo"
import { PrismaLogo } from "@/components/tech-logos/prisma-logo"
import { ShadcnLogo } from "@/components/tech-logos/shadcn-logo"

const STACK_DATA = [
  {
    id: 1,
    component: <NextjsLogo />,
    link: "https://nextjs.org/",
  },
  {
    id: 2,
    component: <ShadcnLogo />,
    link: "https://ui.shadcn.com/",
  },
  {
    id: 3,
    component: <PrismaLogo />,
    link: "https://www.prisma.io/",
  },
]
const TechStackPage = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          Tech Stacks Used
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Here are the list of technologies and packages I have used in this app
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {STACK_DATA.map((stack) => (
            <TechnologyCard
              key={stack.id}
              packageHref={stack.link}
              component={stack.component}
            />
          ))}
        </div>
        <p className="max-w-[42rem] text-sm leading-normal text-muted-foreground">
          See{" "}
          <Link className="underline" href={siteConfig.links.github}>
            package.json
          </Link>{" "}
          for list of all packages.
        </p>
      </div>
    </main>
  )
}

export default TechStackPage
