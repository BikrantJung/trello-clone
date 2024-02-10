"use client"

import { KeyboardEventHandler, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { updateCard } from "@/actions/update-card"
import { CardWithList } from "@/prisma/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSubmit } from "@/components/forms/form-submit"
import { FormTextarea } from "@/components/forms/form-textarea"
import { Icons } from "@/components/icons"

interface CardDescriptionProps {
  cardData: CardWithList
}
export const CardDescription = ({ cardData }: CardDescriptionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [description, setDescription] = useState<string | null>(
    cardData.description
  )
  const queryClient = useQueryClient()
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      toast.success("Card updated!")
      queryClient.invalidateQueries({
        queryKey: ["card", cardData.id],
      })
      setDescription(data.description)
    },
    onError(error) {
      toast.error(error)
    },
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const params = useParams()

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
    setDescription(cardData.description)
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing()
  }
  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, disableEditing)
  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }
  function onSubmit() {
    disableEditing()
    const boardId = params.boardId as string
    if (description !== cardData.description) {
      execute({ description, boardId, id: cardData.id, title: cardData.title })
    }
  }
  return (
    <div className="flex w-full items-start gap-x-3 ">
      <Icons.alignLeft className="mt-0.5 h-5 w-5 " />
      <div className="w-full">
        <p className="mb-2 font-semibold">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              onKeyDown={onTextareaKeyDown}
              errors={fieldErrors}
              value={description || ""}
              defaultValue={cardData.description || ""}
              onChange={(text) => setDescription(text)}
              id="description"
              className="mt-2 w-full"
              placeholder={description || "Add card description..."}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                onClick={disableEditing}
                variant="secondary"
                type="button"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] rounded-md bg-muted px-3.5 py-3 text-sm font-medium"
          >
            {cardData.description || "Add card description...."}
          </div>
        )}
      </div>
    </div>
  )
}
CardDescription.Skeleton = function CardDescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-muted" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-muted" />
        <Skeleton className="h-[78px] w-full bg-muted" />
      </div>
    </div>
  )
}
