import { create } from "zustand"

type BoardTitleStore = {
  title: string
  setTitle: (title: string) => void
}
export const useBoardTitle = create<BoardTitleStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}))
