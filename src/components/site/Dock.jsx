import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { MailIcon } from "lucide-react"

import { contact, profile, whatsappUrl } from "@/config"
import { GithubIcon, WhatsappIcon } from "./BrandIcons"

const BASE = 48
const MAX = 68

function DockItem({ mouseX, href, label, external, children, reduceMotion }) {
  const ref = useRef(null)
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect()
    return box ? x - box.left - box.width / 2 : Infinity
  })
  const target = useTransform(distance, [-110, 0, 110], [BASE, MAX, BASE])
  const size = useSpring(target, { mass: 0.1, stiffness: 180, damping: 14 })

  return (
    <li className="flex items-end">
      <motion.a
        ref={ref}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={external ? `${label} (abre em nova aba)` : label}
        style={reduceMotion ? { width: BASE, height: BASE } : { width: size, height: size }}
        className="group relative flex items-center justify-center rounded-[22%] border bg-card text-foreground shadow-sm hover:text-link focus-visible:text-link"
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-9 rounded-md border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      </motion.a>
    </li>
  )
}

export function Dock() {
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(Infinity)
  const items = [
    { label: "WhatsApp", href: whatsappUrl(), external: true, icon: <WhatsappIcon className="size-[46%]" /> },
    { label: "E-mail", href: `mailto:${profile.email}`, icon: <MailIcon className="size-[46%]" aria-hidden="true" /> },
    { label: "GitHub", href: profile.github, external: true, icon: <GithubIcon className="size-[46%]" /> },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      external: true,
      icon: (
        <span className="font-heading text-[1.15em] leading-none font-bold" aria-hidden="true">
          in
        </span>
      ),
    },
  ]

  return (
    <nav aria-label={contact.dockLabel}>
      <ul
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-[5.25rem] w-fit items-end gap-3 rounded-2xl border bg-muted/70 px-3 pb-3"
      >
        {items.map((item) => (
          <DockItem key={item.label} mouseX={mouseX} reduceMotion={reduceMotion} {...item}>
            {item.icon}
          </DockItem>
        ))}
      </ul>
    </nav>
  )
}
