import { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { RotateCcwIcon } from "lucide-react"

import { windowLabels } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { TrafficLights } from "./TrafficLights"

const ease = [0.22, 1, 0.36, 1]

function TitleBar({ title, children, className, titleAs: TitleTag = "p" }) {
  return (
    <div className={cn("relative flex h-10 shrink-0 items-center border-b bg-titlebar px-3.5", className)}>
      {children}
      <TitleTag className="pointer-events-none absolute inset-x-24 truncate text-center text-[0.8rem] font-medium text-muted-foreground">
        {title}
      </TitleTag>
    </div>
  )
}

/**
 * Janela estilo macOS com semáforos funcionais:
 * vermelho fecha (com botão para reabrir), amarelo minimiza para a barra de título,
 * verde abre em tela cheia (Dialog acessível, sai com Esc, verde ou "Sair da tela cheia").
 */
export function MacWindow({ title, children, fullscreenContent, className, bodyClassName, dark = false }) {
  const reduceMotion = useReducedMotion()
  const [closed, setClosed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const windowRef = useRef(null)
  const pendingFocus = useRef(null)

  // Leva o foco ao controle equivalente quando ele de fato monta
  // (depois da animação de saída do AnimatePresence).
  const reopenRef = useCallback((el) => {
    if (el && pendingFocus.current === "reopen-button") {
      el.focus()
      pendingFocus.current = null
    }
  }, [])
  const setWindowRef = useCallback((el) => {
    windowRef.current = el
    if (el && pendingFocus.current === "window") {
      el.querySelector("button")?.focus()
      pendingFocus.current = null
    }
  }, [])

  const duration = (enter) => (reduceMotion ? 0 : enter ? 0.28 : 0.18)

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {closed ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration(true) }}
            className={cn("flex", className)}
          >
            <Button
              ref={reopenRef}
              variant="outline"
              size="lg"
              className="w-full border-dashed"
              onClick={() => {
                pendingFocus.current = "window"
                setClosed(false)
                setMinimized(false)
              }}
            >
              <RotateCcwIcon data-icon="inline-start" />
              {windowLabels.reopen} “{title}”
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="window"
            ref={setWindowRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: duration(true), ease }}
            className={cn(
              "overflow-hidden rounded-xl border bg-window shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(0_0_0/0.18)] dark:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)]",
              className
            )}
          >
            <TitleBar title={title} className={cn(minimized && "border-b-0")}>
              <TrafficLights
                labels={{
                  close: windowLabels.close,
                  minimize: minimized ? windowLabels.restore : windowLabels.minimize,
                  maximize: windowLabels.maximize,
                }}
                onClose={() => {
                  pendingFocus.current = "reopen-button"
                  setClosed(true)
                }}
                onMinimize={() => setMinimized((m) => !m)}
                onMaximize={() => setFullscreen(true)}
              />
            </TitleBar>
            <motion.div
              initial={false}
              animate={{ height: minimized ? 0 : "auto", opacity: minimized ? 0 : 1 }}
              transition={{ duration: minimized ? duration(false) : duration(true), ease }}
              inert={minimized}
              aria-hidden={minimized || undefined}
              className={cn("overflow-hidden", dark && "bg-terminal")}
            >
              <div className={bodyClassName}>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent
          showCloseButton={false}
          onCloseAutoFocus={(e) => {
            // Sem DialogTrigger: devolve o foco ao botão verde da janela.
            e.preventDefault()
            windowRef.current?.querySelector(`[aria-label="${windowLabels.maximize}"]`)?.focus()
          }}
          className="top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none bg-window p-0 ring-0 sm:max-w-none"
        >
          <TitleBar title={title} titleAs={DialogTitle}>
            <TrafficLights
              labels={{
                close: windowLabels.exitFullscreen,
                minimize: windowLabels.minimize,
                maximize: windowLabels.exitFullscreen,
              }}
              onClose={() => setFullscreen(false)}
              onMaximize={() => setFullscreen(false)}
              minimizeDisabled
            />
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setFullscreen(false)}>
              {windowLabels.exitFullscreen}
            </Button>
          </TitleBar>
          <DialogDescription className="sr-only">{title}</DialogDescription>
          <div className={cn("min-h-0 flex-1 overflow-auto", dark && "bg-terminal")}>
            {fullscreenContent ?? children}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
