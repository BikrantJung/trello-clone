import React from "react"
import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opaticy-75 flex items-center gap-x-2 transition">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className="hidden pb-1 text-lg md:block">Taskify</p>
      </div>
    </Link>
  )
}
