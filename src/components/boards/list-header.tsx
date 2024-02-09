import { useRef, useState } from "react"
import { updateList } from "@/actions/update-list"
import { ListWithCards } from "@/prisma/types"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"

import { FormInput } from "../forms/form-input"
import { ListOptions } from "./list-options"

interface ListHeaderProps {
  list: ListWithCards
  onAddCard: () => void
}
export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formTitle, setFormTitle] = useState(list.title)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { execute, isLoading } = useAction(updateList, {
    onSuccess: () => {
      toast.success("List updated")
      disableEditing()
    },
    onError: (error) => {
      // Reset form title to original title
      setFormTitle(list.title)
      toast.error(error)
      disableEditing()
      // setFormTitle(list.title)
    },
  })
  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }
  function disableEditing() {
    setIsEditing(false)
  }
  function onBlur() {
    handleSubmit()
    // Update the title of board
  }
  function handleSubmit() {
    disableEditing()
    if (list.title !== formTitle)
      // Only update DB is formTitle is edited
      execute({ listId: list.id, title: formTitle || list.title })
  }
  if (isEditing) {
    return (
      <form
        action={handleSubmit}
        className="flex items-center justify-between gap-x-2 px-2 pt-2 text-sm font-semibold"
      >
        <FormInput
          disabled={isLoading}
          ref={inputRef}
          onBlur={onBlur}
          type="text"
          value={formTitle}
          onChange={(text) => setFormTitle(text)}
          id="title"
          className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
        />
      </form>
    )
  }
  return (
    <div className="flex items-center justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      <button
        onClick={enableEditing}
        className="block h-7 w-fit rounded-md border-transparent px-2.5 py-1 text-start text-sm font-medium hover:bg-secondary"
      >
        {formTitle || list.title}
      </button>
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
