import {
  Activity,
  Command,
  CreditCard,
  Layout,
  Menu,
  Moon,
  Plus,
  Settings,
  SunMedium,
} from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  plus: Plus,
  activity: Activity,
  creditCard: CreditCard,
  settings: Settings,
  layout: Layout,
  menu: Menu,
}

export const Icons: IconsType = icons
