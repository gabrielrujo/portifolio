import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, RoundedBox, useTexture } from "@react-three/drei"
import * as THREE from "three"

// Notebook no estilo MacBook, montado com primitivas (sem modelo externo).
// Medidas em "unidades": tela 16:10 de 2,96 × 1,85.
const W = 3.2
const D = 2.2
const BASE_H = 0.1
const LID_H = 2.08
const SCREEN_W = 2.96
const SCREEN_H = 1.85

function Laptop({ images, interval, reduceMotion, dark, onReady }) {
  const group = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  // Ajuste das texturas no próprio carregamento (cores sRGB e nitidez em ângulo).
  const textures = useTexture(images, (loaded) => {
    for (const t of [loaded].flat()) {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
    }
  })
  const [index, setIndex] = useState(0)

  // Só monta depois que as texturas carregaram (Suspense): pode trocar a imagem estática.
  useEffect(() => {
    onReady?.()
  }, [onReady])

  // Troca a captura exibida na tela a cada `interval` ms.
  useEffect(() => {
    if (textures.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % textures.length), interval)
    return () => clearInterval(id)
  }, [textures.length, interval])

  // Segue o mouse na página inteira (não só sobre o canvas).
  useEffect(() => {
    if (reduceMotion) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduceMotion])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const { x, y } = pointer.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.42 + x * 0.28, 3.5, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 + y * 0.08, 3.5, delta)
    g.position.y = reduceMotion ? -0.8 : -0.8 + Math.sin(state.clock.elapsedTime * 1.1) * 0.06
  })

  const shell = dark ? "#5a5f67" : "#c8ccd2"
  const deck = dark ? "#2b2e33" : "#a9aeb5"

  return (
    <group ref={group} position={[0, -0.8, 0]} rotation={[0.12, -0.42, 0]}>
      {/* Base */}
      <RoundedBox args={[W, BASE_H, D]} radius={0.045} smoothness={3} position={[0, BASE_H / 2, 0]}>
        <meshStandardMaterial color={shell} metalness={0.35} roughness={0.4} />
      </RoundedBox>
      {/* Teclado e trackpad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE_H + 0.002, -0.32]}>
        <planeGeometry args={[2.78, 1.02]} />
        <meshStandardMaterial color={deck} roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE_H + 0.002, 0.62]}>
        <planeGeometry args={[1.15, 0.66]} />
        <meshStandardMaterial color={deck} roughness={0.55} />
      </mesh>
      {/* Tampa, articulada na borda de trás */}
      <group position={[0, BASE_H, -D / 2 + 0.03]} rotation={[-0.24, 0, 0]}>
        <RoundedBox args={[W, LID_H, 0.05]} radius={0.04} smoothness={3} position={[0, LID_H / 2, 0]}>
          <meshStandardMaterial color={shell} metalness={0.35} roughness={0.4} />
        </RoundedBox>
        {/* Moldura preta */}
        <mesh position={[0, LID_H / 2, 0.0255]}>
          <planeGeometry args={[W - 0.08, LID_H - 0.08]} />
          <meshBasicMaterial color="#050608" />
        </mesh>
        {/* Tela: sem iluminação para a captura aparecer com as cores reais */}
        <mesh position={[0, LID_H / 2 + 0.04, 0.026]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshBasicMaterial map={textures[index]} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

export default function Laptop3D({ images, interval = 3500, reduceMotion, dark, mobile, onReady }) {
  const wrapper = useRef(null)
  const [visible, setVisible] = useState(true)

  // Pausa a renderização quando o hero sai da tela.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={mobile ? [1, 1.25] : [1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 1.35, 6.9], fov: 30 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={dark ? 0.7 : 1.1} />
        <directionalLight position={[3, 5, 4]} intensity={dark ? 1.4 : 1.8} />
        <directionalLight position={[-4, 2, -2]} intensity={0.4} />
        <Laptop images={images} interval={interval} reduceMotion={reduceMotion} dark={dark} onReady={onReady} />
        {!mobile && (
          <ContactShadows position={[0, -0.87, 0]} opacity={dark ? 0.6 : 0.3} scale={9} blur={2.6} far={3} />
        )}
      </Canvas>
    </div>
  )
}
