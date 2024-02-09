"use client"

import { useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createList } from "@/actions/create-list"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/forms/form-input"
import { FormSubmit } from "@/components/forms/form-submit"
import { Icons } from "@/components/icons"

import { ListWrapper } from "../list-wrapper"

export const ListForm = () => {
  const params = useParams()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [title, setTitle] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const { fieldErrors, execute, isLoading } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`${data.title} created!`)
      inputRef.current?.focus()
      router.refresh()
    },
    onError: () => {
      toast.error("Error creating list")
    },
  })

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }
  function disableEditing() {
    setIsEditing(false)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      disableEditing()
    }
  }

  useEventListener("keydown", (e) => onKeyDown(e))
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({
      title,
      boardId: params.boardId as string,
    })
  }
  console.log(`🔥 list-form.tsx:62 ~ IsLoading ~`, isLoading)
  if (isEditing)
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-background p-3 shadow-md"
        >
          <FormInput
            disabled={isLoading}
            type="text"
            errors={fieldErrors}
            ref={inputRef}
            placeholder="List title..."
            id="title"
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
          />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button
              type="button"
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <Icons.x className="icon-sm" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md bg-background/80 p-3 text-sm font-medium transition hover:bg-background/50"
      >
        <Icons.plus className="icon-sm mr-2" />
        Add a list
      </button>
    </ListWrapper>
  )
}
