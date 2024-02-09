"use client"

import React, { KeyboardEventHandler, useRef } from "react"
import { useParams } from "next/navigation"
import { createCard } from "@/actions/create-card"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useAction } from "@/hooks/use-action"
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
    const params = useParams()
    const formRef = useRef<HTMLFormElement>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card ${data.title} created!`)
        // disableEditing()
      },
      onError(error) {
        toast.error(error)
      },
    })
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Disable editing...
        disableEditing()
      }
    }

    function handleSubmit(formData: FormData) {
      const title = formData.get("title") as string
      const boardId = params.boardId as string
      if (title) {
        execute({ boardId, title, listId })
      }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)
    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={handleSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            errors={fieldErrors}
            id="title"
            onKeyDown={onTextareaKeyDown}
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
