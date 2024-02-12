import * as React from "react"
import { SVGProps } from "react"

export const ShadcnLogo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center gap-2 text-foreground/70">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="m208 128-80 80M192 40 40 192"
      />
    </svg>
    <span>shadcn/ui</span>
  </div>
)
