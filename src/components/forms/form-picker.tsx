"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { defaultImages, UnsplashImageType } from "@/constants/images"
import { useFormStatus } from "react-dom"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { useLocalStorage } from "usehooks-ts"

import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { useBoardForm } from "@/hooks/use-board-form"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { FormErrors } from "./form-errors"

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { actions, state } = useBoardForm((state) => state)
  const { pending } = useFormStatus()
  const [isLoading, setIsLoading] = useState(false)
  const [boardImages, setBoardImages] = useLocalStorage(
    "board-images",
    defaultImages
  )

  const fetchImages = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await unsplash.photos.getRandom({
        collectionIds: ["317099"],
        count: 9,
      })
      if (result && result.response) {
        const resultImages = result.response as unknown as UnsplashImageType
        setBoardImages(resultImages)
      }
    } catch (error) {
      console.log("Unsplash image fetch failed!", error)
    } finally {
      setIsLoading(false)
    }
  }, [setBoardImages])

  if (isLoading) {
    return (
      <>
        <div className="flex h-full min-h-44 w-full items-center justify-center p-6">
          <Icons.loader className="icon-sm animate-spin text-accent" />
        </div>
        <FormPicker.Refetch
          isLoading={isLoading}
          onClick={() => fetchImages()}
        />
      </>
    )
  }
  return (
    <div className="relative">
      <div className="mb-2 mt-3 grid grid-cols-3 gap-2">
        {boardImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending &&
                "pointer-events-none cursor-not-allowed opacity-50 hover:opacity-50",
              image.id === state.image?.id &&
                "rounded-sm outline outline-offset-1 outline-accent"
            )}
            onClick={() => {
              if (pending) return
              if (image.id === state.image?.id) {
                // Unselect image
                actions.setField({ image: undefined })
              } else {
                actions.setField({
                  image: {
                    id: image.id,
                    fullUrl: image.urls.full,
                    htmlLink: image.links.html,
                    thumbUrl: image.urls.thumb,
                    userName: image.user.name,
                  },
                })
              }
            }}
          >
            <Image
              alt={image.alt_description}
              src={image.urls.thumb}
              fill
              className="rounded-sm object-cover"
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              <code>{image.user.name}</code>
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
      <FormPicker.Refetch isLoading={isLoading} onClick={() => fetchImages()} />
    </div>
  )
}
interface FormPickerRefetchProps {
  isLoading: boolean
  onClick: () => void
}
FormPicker.Refetch = function FormPickerRefetch({
  isLoading,
  onClick,
}: FormPickerRefetchProps) {
  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className="h-7 w-full py-0 text-xs"
      variant="outline"
    >
      <Icons.refreshCcw
        className={cn("icon-sm mr-2", isLoading && "animate-spin")}
      />
      Refetch
    </Button>
  )
}
