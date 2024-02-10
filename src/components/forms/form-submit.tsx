"use client"

import { VariantProps } from "class-variance-authority"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"

interface FormSubmitProps extends ButtonProps {
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
  ...props
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  console.log(`🔥 form-submit.tsx:24 ~ pending ~`, pending)
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  )
}
