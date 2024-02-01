"use client"

import { createBoard } from "@/actions/create-board/index"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"

import { FormErrors } from "./form-errors"
import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

interface FormPopoverProps {
  children: React.ReactNode
  side?: "left" | "right" | "bottom" | "top"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors, setFieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log({ data })
    },
    onError(error) {
      console.log({ error })
    },
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({ title })
  }
  return (
    <Popover onOpenChange={() => setFieldErrors(undefined)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-center text-sm font-medium text-muted-foreground/90">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
            variant="ghost"
          >
            <Icons.x className="icon-sm" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
