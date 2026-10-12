import {
  siFigma,
  siGithub,
  siInstagram,
  siPython,
  siReact,
  siTailwindcss,
  siThreedotjs,
  siVercel,
  siVite,
  siWhatsapp,
} from "simple-icons"
import { OrbitIcon } from "lucide-react"

// Ícones de marca via simple-icons (CC0). O LinkedIn foi removido do pacote
// a pedido da marca, então ele usa um monograma de texto (LinkedinMark).
function SimpleIcon({ icon, ...props }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d={icon.path} />
    </svg>
  )
}

export function WhatsappIcon(props) {
  return <SimpleIcon icon={siWhatsapp} {...props} />
}

export function GithubIcon(props) {
  return <SimpleIcon icon={siGithub} {...props} />
}

export function InstagramIcon(props) {
  return <SimpleIcon icon={siInstagram} {...props} />
}

export function LinkedinMark({ className }) {
  return (
    <span className={className} aria-hidden="true">
      <span className="font-heading leading-none font-bold">in</span>
    </span>
  )
}

// Ícones da faixa de tecnologias do hero. O Motion não tem logo no simple-icons,
// então usa um ícone genérico do lucide.
const TECH = {
  React: siReact,
  Vite: siVite,
  "Tailwind CSS": siTailwindcss,
  "Three.js": siThreedotjs,
  Python: siPython,
  Vercel: siVercel,
  Figma: siFigma,
}

export function TechIcon({ name, ...props }) {
  const icon = TECH[name]
  return icon ? <SimpleIcon icon={icon} {...props} /> : <OrbitIcon aria-hidden="true" {...props} />
}
