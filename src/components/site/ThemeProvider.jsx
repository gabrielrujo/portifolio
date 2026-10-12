import { useEffect, useMemo, useState } from "react"

import { ThemeContext } from "@/hooks/use-theme"

const STORAGE_KEY = "theme"
const query = "(prefers-color-scheme: dark)"

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === "light" || v === "dark" ? v : "system"
  } catch {
    return "system"
  }
}

// Tema: "light" | "dark" | "system" (padrão, segue o sistema operacional).
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStored)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setSystemDark(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark")
  }, [resolved])

  const value = useMemo(
    () => ({
      theme,
      resolved,
      setTheme: (next) => {
        setThemeState(next)
        try {
          if (next === "system") localStorage.removeItem(STORAGE_KEY)
          else localStorage.setItem(STORAGE_KEY, next)
        } catch {
          // Sem armazenamento: o tema vale só para esta visita.
        }
      },
    }),
    [theme, resolved]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
