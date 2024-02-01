import { create } from "zustand"

type FormPopoverStore = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}
export const useFormPopover = create<FormPopoverStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
