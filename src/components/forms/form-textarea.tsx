"use client"

import React, { KeyboardEventHandler } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { FormErrors } from "./form-errors"

interface FormTextareaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  value?: string
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
  onChange?: (text: string) => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  defaultValue?: string
}
export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(
  (
    {
      className,
      id,
      defaultValue,
      value,
      disabled,
      errors,
      label,
      placeholder,
      required,
      onClick,
      onBlur,
      onKeyDown,
      onChange,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            disabled={pending || disabled}
            id={id}
            className={cn(
              "resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            {...props}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    )
  }
)
FormTextarea.displayName = "FormTextarea"
