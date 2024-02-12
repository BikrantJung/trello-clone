import Link from "next/link"

import { Icons } from "../icons"

export const AppLogo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-1 transition hover:opacity-75">
        <Icons.logo />
        <p className="text-sm font-semibold">Taskify</p>
      </div>
    </Link>
  )
}
