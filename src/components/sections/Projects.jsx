import { useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { projects } from "@/config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Container } from "@/components/site/Container"
import { MacWindow } from "@/components/site/MacWindow"
import { Reveal } from "@/components/site/Reveal"

const items = projects.items
const ease = [0.22, 1, 0.36, 1]
// Largura do card ativo e distância entre os cards (em % da largura do card).
const CARD_W = "w-[80%] sm:w-[70%] lg:w-[64%]"
const SPREAD = 80

const mod = (i, n) => ((i % n) + n) % n
// Posição relativa ao card ativo, pelo caminho mais curto (o carrossel é circular).
function offsetOf(i, active, n) {
  let o = mod(i - active, n)
  if (o > n / 2) o -= n
  return o
}

function KindBadge({ kind }) {
  const real = kind === "real"
  return (
    <Badge variant={real ? "default" : "outline"} className={cn("h-6 px-2.5", !real && "bg-background")}>
      {real ? projects.labels.real : projects.labels.demo}
    </Badge>
  )
}

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
      {tags.map((t) => (
        <li key={t} className="rounded-md border bg-background px-2 py-0.5 font-medium text-xs text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  )
}

function SiteButton({ project, size = "default", variant = "default", className }) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {projects.linkLabel}
        <span className="sr-only">: {project.title} (abre em nova aba)</span>
        <ArrowUpRightIcon data-icon="inline-end" />
      </a>
    </Button>
  )
}

function Screenshot({ project, className, ...props }) {
  return (
    <img
      src={project.images.desktop}
      alt={`Captura de tela do site ${project.title}`}
      width="1440"
      height="900"
      draggable={false}
      decoding="async"
      className={cn("aspect-[16/10] w-full object-cover object-top", className)}
      {...props}
    />
  )
}

// Informações do projeto ativo: sobreposta ao card a partir do md, abaixo dele no celular.
function ProjectInfo({ project, className }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <KindBadge kind={project.kind} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
        <p className="text-muted-foreground">{project.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tags tags={project.tags} />
        <SiteButton project={project} />
      </div>
    </div>
  )
}

function FullscreenProject({ project }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 p-4 sm:p-8 lg:grid-cols-[1fr_auto]">
      <Screenshot project={project} className="rounded-lg border" />
      <img
        src={project.images.mobile}
        alt={`Captura de tela do site ${project.title} no celular`}
        width="390"
        height="844"
        loading="lazy"
        className="mx-auto w-48 rounded-2xl border lg:w-56"
      />
      <div className="flex flex-col gap-5 lg:col-span-2 lg:max-w-3xl">
        <ProjectInfo project={project} />
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold">{projects.problemLabel}</dt>
            <dd className="text-muted-foreground">{project.problem}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold">{projects.solutionLabel}</dt>
            <dd className="text-muted-foreground">{project.solution}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

// Card lateral: mesma aparência da janela, sem controles (só decorativo e clicável).
function StaticWindow({ project }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-window shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)]">
      <div className="relative flex h-10 items-center gap-3 border-b bg-titlebar px-3.5">
        <span className="size-3 rounded-full bg-light-red" />
        <span className="size-3 rounded-full bg-light-yellow" />
        <span className="size-3 rounded-full bg-light-green" />
        <span className="absolute inset-x-24 truncate text-center text-[0.8rem] font-medium text-muted-foreground">
          {project.window}
        </span>
      </div>
      <Screenshot project={project} loading="lazy" />
    </div>
  )
}

function Coverflow({ active, previous, onChange, stageRef }) {
  const n = items.length
  const dragged = useRef(false)
  const project = items[active]

  const go = (delta) => onChange(mod(active + delta, n))

  const onKeyDown = (e) => {
    // Eventos do Dialog de tela cheia também sobem pela árvore do React: ignora.
    if (!e.currentTarget.contains(e.target)) return
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    go(e.key === "ArrowLeft" ? -1 : 1)
    // O card ativo vira lateral: leva o foco ao palco para ele não se perder.
    if (e.target !== stageRef.current && stageRef.current?.contains(e.target)) stageRef.current.focus()
  }

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={projects.carousel.label}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-8"
    >
      <motion.div
        ref={stageRef}
        role="group"
        tabIndex={0}
        aria-label={projects.carousel.position(active + 1, n, project.title)}
        onPanStart={() => (dragged.current = true)}
        onPanEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -400) go(1)
          else if (info.offset.x > 50 || info.velocity.x > 400) go(-1)
          setTimeout(() => (dragged.current = false), 0)
        }}
        style={{ touchAction: "pan-y" }}
        className="relative -mx-4 overflow-x-clip rounded-xl px-4 py-2 select-none sm:mx-0 sm:px-0"
      >
        {/* Reserva a altura do card ativo (barra de título + imagem 16:10). */}
        <div aria-hidden="true" className={cn("invisible mx-auto", CARD_W)}>
          <div className="h-10" />
          <div className="aspect-[16/10]" />
        </div>

        {items.map((p, i) => {
          const o = offsetOf(i, active, n)
          const prevO = offsetOf(i, previous, n)
          const isActive = o === 0
          const hidden = Math.abs(o) > 1
          // Card que dá a volta (de um lado para o outro): troca de lado invisível.
          const wrapped = !hidden && Math.abs(o - prevO) > 1
          return (
            <motion.div
              key={p.id}
              role="group"
              aria-roledescription="slide"
              aria-label={projects.carousel.position(i + 1, n, p.title)}
              aria-hidden={!isActive || undefined}
              initial={false}
              animate={{
                x: `${o * SPREAD}%`,
                scale: isActive ? 1 : 0.8,
                rotateY: isActive ? 0 : -o * 38,
                opacity: hidden ? 0 : wrapped ? [0, 0, 1] : 1,
              }}
              transition={
                wrapped
                  ? { x: { duration: 0 }, scale: { duration: 0 }, rotateY: { duration: 0 }, opacity: { duration: 0.5, times: [0, 0.35, 1] } }
                  : { duration: 0.55, ease }
              }
              style={{ zIndex: 10 - Math.abs(o), transformPerspective: 1400 }}
              onClick={isActive ? undefined : () => !dragged.current && onChange(i)}
              className={cn(
                "absolute inset-x-0 top-2 mx-auto",
                CARD_W,
                !isActive && "cursor-pointer",
                hidden && "pointer-events-none"
              )}
            >
              {isActive ? (
                <MacWindow
                  title={p.window}
                  bodyClassName="relative"
                  fullscreenContent={<FullscreenProject project={p} />}
                >
                  <Screenshot project={p} />
                  <ProjectInfo
                    project={p}
                    className="absolute inset-x-3 bottom-3 hidden rounded-xl border bg-background/90 p-4 shadow-lg backdrop-blur-md md:flex lg:inset-x-4 lg:bottom-4 lg:p-5"
                  />
                </MacWindow>
              ) : (
                <StaticWindow project={p} />
              )}
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 rounded-xl bg-black/25 dark:bg-black/55"
              />
            </motion.div>
          )
        })}
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {projects.carousel.position(active + 1, n, project.title)}
      </p>

      {/* No celular, as informações ficam abaixo do card. */}
      <div className="md:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ProjectInfo project={project} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => go(-1)} aria-label={projects.carousel.previous}>
          <ArrowLeftIcon />
        </Button>
        <ul className="flex items-center">
          {items.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onChange(i)}
                aria-label={`${projects.carousel.goTo}: ${p.title}`}
                aria-current={i === active || undefined}
                className="group flex size-11 items-center justify-center rounded-full"
              >
                <span
                  className={cn(
                    "h-2 rounded-full bg-muted-foreground/40 transition-all duration-300 group-hover:bg-muted-foreground motion-reduce:transition-none",
                    i === active ? "w-6 bg-link group-hover:bg-link" : "w-2"
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => go(1)} aria-label={projects.carousel.next}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

function ProjectGrid({ onShow }) {
  const [filter, setFilter] = useState("all")
  const visible = items.filter((p) => filter === "all" || p.kind === filter)
  const { filter: f } = projects

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 id="projetos-grade" className="text-xl font-semibold">
          {f.gridTitle}
        </h3>
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={filter}
          onValueChange={(v) => v && setFilter(v)}
          aria-label={f.label}
        >
          {["all", "real", "demo"].map((key) => (
            <ToggleGroupItem key={key} value={key} className="h-10 px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              {f[key]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <motion.ul layout aria-labelledby="projetos-grade" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3 rounded-xl border bg-card p-3"
            >
              <button
                type="button"
                onClick={() => onShow(items.indexOf(p))}
                className="overflow-hidden rounded-lg border"
                aria-label={`${projects.carousel.goTo}: ${p.title}`}
              >
                <Screenshot project={p} alt="" loading="lazy" className="transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none" />
              </button>
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-heading font-semibold">{p.title}</h4>
                  <KindBadge kind={p.kind} />
                </div>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-1 px-1 py-1 text-sm font-medium text-link underline-offset-4 hover:underline"
              >
                {projects.linkLabel}
                <span className="sr-only">: {p.title} (abre em nova aba)</span>
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && <p className="text-muted-foreground">{f.empty}</p>}
    </div>
  )
}

export function Projects() {
  const [{ active, previous }, setState] = useState({ active: 0, previous: 0 })
  const stageRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const onChange = (i) => setState((s) => (i === s.active ? s : { active: i, previous: s.active }))

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="rounded-full border bg-muted px-3 py-1 font-medium text-sm text-link">{projects.eyebrow}</p>
          <h2 id="projetos-title" className="text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            {projects.title}
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">{projects.intro}</p>
        </Reveal>

        <Reveal>
          <Coverflow active={active} previous={previous} onChange={onChange} stageRef={stageRef} />
        </Reveal>

        <ProjectGrid
          onShow={(i) => {
            onChange(i)
            stageRef.current?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" })
            stageRef.current?.focus({ preventScroll: true })
          }}
        />
      </Container>
    </section>
  )
}
