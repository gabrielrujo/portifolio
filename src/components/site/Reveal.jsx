import { motion } from "motion/react"

// Fade + leve subida ao entrar na tela. Com reduced motion, o MotionConfig
// do App remove o deslocamento e mantém só a opacidade.
export function Reveal({ children, delay = 0, className, as = "div" }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
