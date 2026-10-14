import { useState } from "react"
import { MotionConfig } from "motion/react"

import { ctaBands } from "@/config"
import { Contact } from "@/components/sections/Contact"
import { Automations } from "@/components/sections/Automations"
import { CtaBand } from "@/components/sections/CtaBand"
import { FloatingWhatsapp } from "@/components/sections/FloatingWhatsapp"
import { Footer } from "@/components/sections/Footer"
import { Hero } from "@/components/sections/Hero"
import { LaptopVisual } from "@/components/site/LaptopVisual"
import { Navbar } from "@/components/sections/Navbar"
import { Plans } from "@/components/sections/Plans"
import { Process } from "@/components/sections/Process"
import { Projects } from "@/components/sections/Projects"
import { Services } from "@/components/sections/Services"
import { Testimonial } from "@/components/sections/Testimonial"

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Pular para o conteúdo
      </a>
      <Navbar menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
      <main id="conteudo">
        <Hero />
        <Projects />
        <div className="pb-20 sm:pb-28">
          <CtaBand {...ctaBands.afterProjects} visual={<LaptopVisual />} />
        </div>
        <Services />
        <Automations />
        <Plans />
        <div className="pb-20 sm:pb-28">
          <CtaBand {...ctaBands.afterPlans} />
        </div>
        <Process />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp hidden={menuOpen} />
    </MotionConfig>
  )
}
