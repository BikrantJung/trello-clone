"use client"

import { forwardRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
  id: string
  label?: string
  type: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  hasError?: boolean
  className?: string
  defaultValue?: string
  onBlur?: () => void
}
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      type,
      className,
      defaultValue = "",
      disabled,
      hasError,
      label,
      onBlur,
      placeholder,
      required,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="space-y-1">
        {label ? (
          <Label
            htmlFor={id}
            className="text-xs font-semibold text-muted-foreground"
          >
            {label}
          </Label>
        ) : null}
        <Input
          id={id}
          onBlur={onBlur}
          defaultValue={defaultValue}
          placeholder={placeholder}
          ref={ref}
          required={required}
          name={id}
          type={type}
          disabled={pending || disabled}
          className={cn(
            "h-7 px-2 py-1 text-sm",
            hasError && "border-destructive focus-visible:ring-0",
            className
          )}
          aria-describedby={`${id}-error`}
        />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
