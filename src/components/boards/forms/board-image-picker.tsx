"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { defaultImages, UnsplashImageType } from "@/constants/images"
import { useFormStatus } from "react-dom"
import { useLocalStorage } from "usehooks-ts"

import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { ImageType } from "@/hooks/use-board-form"
import { Button } from "@/components/ui/button"
import { FormErrors } from "@/components/forms/form-errors"
import { Icons } from "@/components/icons"

interface BoardImagePickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
  onImageSelection: (image: ImageType) => void
  resetImageSelection: () => void
  stateImage: Partial<ImageType>
}
export const BoardImagePicker = ({
  id,
  errors,
  onImageSelection,
  resetImageSelection,
  stateImage,
}: BoardImagePickerProps) => {
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
        <BoardImagePicker.Refetch
          pending={pending}
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
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75 ",
              pending &&
                "pointer-events-none cursor-not-allowed opacity-50 hover:opacity-50",
              image.id === stateImage?.id &&
                "rounded-sm outline outline-offset-1 outline-accent"
            )}
            onClick={() => {
              if (pending) return
              if (image.id === stateImage?.id) {
                // Unselect image
                resetImageSelection()
              } else {
                onImageSelection({
                  id: image.id,
                  fullUrl: image.urls.full,
                  htmlLink: image.links.html,
                  thumbUrl: image.urls.thumb,
                  userName: image.user.name,
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
              className="invisible absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white hover:underline group-hover:visible"
            >
              <code>{image.user.name}</code>
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} className="mb-1" />
      <BoardImagePicker.Refetch
        pending={pending}
        isLoading={isLoading}
        onClick={() => fetchImages()}
      />
    </div>
  )
}
interface BoardImagePickerRefetchProps {
  isLoading: boolean
  pending: boolean
  onClick: () => void
}
BoardImagePicker.Refetch = function BoardImagePickerRefetch({
  isLoading,
  pending,
  onClick,
}: BoardImagePickerRefetchProps) {
  return (
    <Button
      type="button"
      disabled={isLoading || pending}
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
