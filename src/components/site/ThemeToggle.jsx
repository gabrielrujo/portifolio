import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { nav } from "@/config"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const options = [
  { value: "light", label: nav.theme.light, Icon: SunIcon },
  { value: "dark", label: nav.theme.dark, Icon: MoonIcon },
  { value: "system", label: nav.theme.system, Icon: MonitorIcon },
]

export function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme()
  const current = options.find((o) => o.value === theme)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-lg" aria-label={`${nav.theme.label} (atual: ${current.label})`}>
          {resolved === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {options.map(({ value, label, Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon />
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
