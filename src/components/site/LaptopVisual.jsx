import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

import { hero, projects } from "@/config"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

const Laptop3D = lazy(() => import("./Laptop3D"))

// Imagens estáticas do notebook (uma por tema): aparecem enquanto o 3D carrega
// e ficam no lugar dele quando não há WebGL ou o usuário economiza dados.
const STATIC_IMAGE = { light: "/laptop-static-light.png", dark: "/laptop-static-dark.png" }

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")))
  } catch {
    return false
  }
}

// Se o 3D falhar (contexto perdido, erro de textura), fica a imagem estática.
class ThreeBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// Notebook 3D menor, fora do hero: só baixa o 3D quando a seção chega perto da tela.
export function LaptopVisual({ className }) {
  const reduceMotion = useReducedMotion()
  const { resolved } = useTheme()
  const [load3D, setLoad3D] = useState(false)
  const [ready, setReady] = useState(false)
  const [mobile] = useState(() => window.matchMedia("(max-width: 767px)").matches)
  const onReady = useCallback(() => setReady(true), [])
  const ref = useRef(null)

  // Carrega o 3D só quando a área estiver a ~400px de entrar na tela.
  useEffect(() => {
    const saveData = navigator.connection?.saveData
    if (!hasWebGL() || saveData || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad3D(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} role="img" aria-label={hero.laptopLabel} className={cn("relative aspect-[5/4] w-full", className)}>
      <img
        src={STATIC_IMAGE[resolved]}
        alt=""
        width="1000"
        height="800"
        loading="lazy"
        className={cn(
          "absolute inset-0 size-full object-contain transition-opacity duration-500",
          ready ? "opacity-0" : "opacity-100"
        )}
      />
      {load3D && (
        <ThreeBoundary>
          <Suspense fallback={null}>
            <Laptop3D
              images={projects.items.map((p) => p.images.desktop)}
              reduceMotion={reduceMotion}
              dark={resolved === "dark"}
              mobile={mobile}
              onReady={onReady}
            />
          </Suspense>
        </ThreeBoundary>
      )}
    </div>
  )
}
