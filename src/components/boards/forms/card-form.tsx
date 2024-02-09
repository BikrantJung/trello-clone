"use client"

import React from "react"
import { useOnClickOutside } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { FormSubmit } from "@/components/forms/form-submit"
import { FormTextarea } from "@/components/forms/form-textarea"
import { Icons } from "@/components/icons"

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}
export const CardForm = React.forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 space-y-4 px-1 py-0.5">
          <FormTextarea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title..."
          />
          <div className="ga-x-1 flex items-center">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <Icons.x className="icon-sm" />
            </Button>
          </div>
        </form>
      )
    }
    return (
      <div className="px-2 pt-2 ">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm hover:bg-secondary hover:text-secondary-foreground"
          size="sm"
          variant="ghost"
        >
          <Icons.plus className="icon-sm mr-2" />
          Add a card
        </Button>
      </div>
    )
  }
)
CardForm.displayName = "CardForm"
