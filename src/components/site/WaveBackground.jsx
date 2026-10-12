import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

// Ondas azuis em um único fragment shader (WebGL 1, sem three.js): três faixas
// de fios finos, como seda ou ondas sonoras, que se curvam de leve perto do cursor.
const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_force;
uniform float u_dark;

float wave(float x, float t, float s) {
  return 0.10 * sin(x * 1.5 + t * 0.32 + s)
       + 0.05 * sin(x * 2.9 - t * 0.26 + s * 1.7)
       + 0.025 * sin(x * 5.1 + t * 0.45 + s * 2.3);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float x = uv.x * aspect;
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  float px = 1.0 / u_res.y;

  vec3 acc = vec3(0.0);
  float amount = 0.0;

  for (int r = 0; r < 3; r++) {
    float fr = float(r);
    float center = 0.15 + fr * 0.11;
    vec3 darkCol = r == 0 ? vec3(0.10, 0.32, 1.0) : r == 1 ? vec3(0.30, 0.64, 1.0) : vec3(0.18, 0.86, 0.96);
    vec3 lightCol = r == 0 ? vec3(0.42, 0.62, 1.0) : r == 1 ? vec3(0.45, 0.74, 1.0) : vec3(0.40, 0.85, 0.95);
    vec3 col = mix(lightCol, darkCol, u_dark);

    for (int j = 0; j < 7; j++) {
      float fj = float(j);
      // Os fios se abrem e se fecham ao longo do eixo x (efeito de fita torcida).
      float spread = 0.010 + 0.012 * sin(x * 1.2 + u_time * 0.18 + fr * 2.0);
      float y = center + wave(x, u_time, fr * 2.1 + fj * 0.09) + (fj - 3.0) * spread;

      // Curva suave para longe do cursor.
      float dy = y - m.y;
      float dx = (x - m.x) * 2.6;
      float near = exp(-dx * dx) * exp(-dy * dy * 14.0);
      y += sign(dy) * near * 0.06 * u_force;

      float d = abs(uv.y - y);
      float line = (1.6 * px) / (d + 1.6 * px);
      float intensity = pow(line, 2.6) * (0.55 + 0.45 * sin(fj * 0.9 + fr));
      // Brilho largo e fraco em volta de cada fio: dá o aspecto de seda.
      intensity += exp(-d * d * 900.0) * 0.035;
      acc += col * intensity;
      amount += intensity;
    }
  }

  vec3 bgDark = vec3(0.0196, 0.0235, 0.0314);
  vec3 dark = bgDark + acc * 0.9;
  vec3 hue = acc / max(amount, 0.0001);
  vec3 light = mix(vec3(1.0), hue, clamp(amount, 0.0, 1.0) * 0.85);
  gl_FragColor = vec4(mix(light, dark, u_dark), 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
  return shader
}

export function WaveBackground({ className }) {
  const canvasRef = useRef(null)
  const apiRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { resolved } = useTheme()
  const dark = resolved === "dark"
  const darkRef = useRef(dark)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
    // Sem WebGL: fica só o fundo da página com o granulado.
    if (!gl) return

    let program
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    } catch {
      return
    }
    gl.useProgram(program)

    // Um triângulo que cobre a tela inteira.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = Object.fromEntries(
      ["u_res", "u_time", "u_mouse", "u_force", "u_dark"].map((n) => [n, gl.getUniformLocation(program, n)])
    )

    // Resolução reduzida: as ondas são suaves, então não precisam de pixel cheio.
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const scale = mobile ? 0.5 : Math.min(window.devicePixelRatio || 1, 2) * 0.75

    const mouse = { x: 0.5, y: 0.5, force: 0, tx: 0.5, ty: 0.5, tforce: 0 }
    let raf = 0
    let visible = true
    let last = performance.now()
    let time = 12 // ponto de partida com as ondas já bem distribuídas

    const draw = () => {
      gl.uniform2f(u.u_res, canvas.width, canvas.height)
      gl.uniform1f(u.u_time, time)
      gl.uniform2f(u.u_mouse, mouse.x, mouse.y)
      gl.uniform1f(u.u_force, mouse.force)
      gl.uniform1f(u.u_dark, darkRef.current ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(width * scale))
      canvas.height = Math.max(1, Math.round(height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw()
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      time += dt
      const k = 1 - Math.exp(-dt * 4)
      mouse.x += (mouse.tx - mouse.x) * k
      mouse.y += (mouse.ty - mouse.y) * k
      mouse.force += (mouse.tforce - mouse.force) * k
      draw()
      raf = requestAnimationFrame(frame)
    }

    const shouldRun = () => !reduceMotion && visible && !document.hidden
    const update = () => {
      if (shouldRun() && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      } else if (!shouldRun() && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
      mouse.tforce = inside && e.pointerType === "mouse" ? 1 : 0
    }
    const onLeave = () => (mouse.tforce = 0)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    io.observe(canvas)
    document.addEventListener("visibilitychange", update)
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
    }

    resize()
    update()
    apiRef.current = { draw }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", update)
      window.removeEventListener("pointermove", onPointer)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      apiRef.current = null
    }
  }, [reduceMotion])

  // Troca de tema: atualiza as cores e redesenha (importante quando a animação está parada).
  useEffect(() => {
    darkRef.current = dark
    apiRef.current?.draw()
  }, [dark])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("block size-full", className)} />
}
