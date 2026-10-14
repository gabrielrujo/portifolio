import { motion } from "motion/react"
import { ArrowDownIcon } from "lucide-react"

import { hero, profile, whatsappUrl } from "@/config"
import { Button } from "@/components/ui/button"
import { GithubIcon, InstagramIcon, LinkedinMark, TechIcon, WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { WaveBackground } from "@/components/site/WaveBackground"

const ease = [0.22, 1, 0.36, 1]
const enter = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 * i, ease },
})

// Ondas animadas (WebGL) + granulado + vinheta. A vinheta e o véu no centro
// garantem a leitura do texto; o degradê embaixo funde o hero com a próxima seção.
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      <WaveBackground className="absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,color-mix(in_oklab,var(--background)_70%,transparent),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-background" />
    </div>
  )
}

const socials = [
  { label: "GitHub", href: profile.github, icon: <GithubIcon className="size-5" /> },
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinMark className="text-lg" /> },
  { label: "Instagram", href: profile.instagram, icon: <InstagramIcon className="size-5" /> },
  { label: "WhatsApp", href: whatsappUrl(), icon: <WhatsappIcon className="size-5" /> },
]

function StackMarquee() {
  const items = hero.stack.map((name) => (
    <li key={name} className="flex shrink-0 items-center gap-2.5 font-medium text-sm text-muted-foreground">
      <TechIcon name={name} className="size-5 shrink-0" />
      {name}
    </li>
  ))
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">{hero.stackLabel}</p>
      <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]">
        {/* Duas cópias da lista lado a lado: a animação anda 50% e recomeça sem emenda. */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
          <ul className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-4 motion-reduce:pr-0">
            {items}
          </ul>
          <ul aria-hidden="true" className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:hidden">
            {items}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const [first, ...rest] = hero.headline
  const last = rest.pop()
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Backdrop />
      <Container className="flex flex-col items-center gap-10 pt-28 pb-12 text-center sm:pt-36 lg:pt-32 lg:pb-14">
        <div className="flex flex-col items-center gap-7">
          <motion.p
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border bg-background/70 py-1 pr-3.5 pl-3 text-sm font-medium shadow-xs"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-light-green opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-light-green" />
            </span>
            {hero.badge}
          </motion.p>

          <motion.h1
            {...enter(1)}
            id="hero-title"
            className="text-[clamp(1.5rem,7.6vw,3.25rem)] leading-[1.08] font-extrabold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            <span className="block">{first}</span>
            {rest.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-link">{last}</span>
          </motion.h1>

          <motion.p {...enter(2)} className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {hero.subheadline}
          </motion.p>

          <motion.div {...enter(3)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg">
              <a href="#projetos">
                {hero.primaryCta}
                <ArrowDownIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/70">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" data-icon="inline-start" />
                {hero.secondaryCta}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </motion.div>

          <motion.ul {...enter(4)} className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm sm:gap-x-2 text-muted-foreground">
            {hero.microcopy.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="hidden sm:inline">·</span>}
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.nav {...enter(5)} aria-label={hero.socialLabel}>
            <ul className="flex gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <Button asChild variant="outline" size="icon-lg" className="rounded-xl bg-background/70">
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (abre em nova aba)`}>
                      {s.icon}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <motion.div {...enter(6)} className="w-full">
          <StackMarquee />
        </motion.div>
      </Container>
    </section>
  )
}
