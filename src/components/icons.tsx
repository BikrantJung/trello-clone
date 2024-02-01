import {
  Activity,
  Command,
  CreditCard,
  HelpCircle,
  Layout,
  Loader2,
  Menu,
  Moon,
  Plus,
  RefreshCcw,
  Settings,
  SunMedium,
  Trash,
  User2,
  X,
  XCircle,
} from "lucide-react"

export type IconKeys = keyof typeof icons

// This ensures auto-completion for props.
type IconProps<T extends React.ElementType> = React.ComponentProps<T>
type IconsType = {
  [key in IconKeys]: React.ComponentType<IconProps<(typeof icons)[key]>>
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
  trash: Trash,
  xCircle: XCircle,
  user: User2,
  helpCircle: HelpCircle,
  x: X,
  loader: Loader2,
  refreshCcw: RefreshCcw,
}

export const Icons: IconsType = icons
