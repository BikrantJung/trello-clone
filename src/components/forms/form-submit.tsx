"use client"

import { VariantProps } from "class-variance-authority"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "accent",
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
