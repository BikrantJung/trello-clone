"use client"

import { forwardRef, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { useBoardTitle } from "@/hooks/use-board-title"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FormErrors } from "./form-errors"

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
  errors?: Record<string, string[] | undefined>
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
      errors,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    const { setTitle, title } = useBoardTitle((state) => state)
    useEffect(() => {
      setTitle(title ? title : defaultValue)
    }, [defaultValue, setTitle, title])
    return (
      <div className="space-y-2">
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
            autoCapitalize="off"
            autoComplete="off"
            aria-autocomplete="none"
            autoCorrect="off"
            spellCheck="false"
            aria-labelledby={label}
            id={id}
            onBlur={onBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            {...props}
          />
        </div>
        {errors ? <FormErrors id={id} errors={errors} /> : null}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
