import { cn } from "@/lib/utils"

import { Icons } from "../icons"

interface FormErrorsProps {
  id: string
  errors?: Record<string, string[] | undefined>
  className?: string
}
export const FormErrors = ({ errors, id, className }: FormErrorsProps) => {
  if (!errors) return
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className={cn("text-xs text-destructive", className)}
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center rounded-sm border border-destructive bg-destructive/10 p-2 font-medium"
        >
          <Icons.xCircle className="icon-sm mr-2" />
          {error}
        </div>
      ))}
    </div>
  )
}
