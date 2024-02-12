import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Taskify",
  author: "bikrantjung",
  description:
    "Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "prisma",
    "@hello-pangea/dnd",
    "unsplash",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://github.com/BikrantJung",
  },
  links: {
    github: "https://github.com/BikrantJung/trello-clone",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
}
