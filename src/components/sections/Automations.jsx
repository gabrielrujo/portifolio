import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { BoxIcon, ChartColumnIcon, CheckIcon, FileTextIcon, RotateCcwIcon, XIcon } from "lucide-react"

import { automations, whatsappUrl } from "@/config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { MacWindow } from "@/components/site/MacWindow"
import { PythonCode } from "@/components/site/PythonCode"
import { Reveal } from "@/components/site/Reveal"
import { SectionHeading } from "@/components/site/SectionHeading"

const icons = { chart: ChartColumnIcon, file: FileTextIcon, box: BoxIcon }
const ease = [0.22, 1, 0.36, 1]

// Ritmo da "execução": digita o comando letra a letra e depois mostra o log linha a linha.
function delayFor(step, commandLength) {
  if (step < commandLength) return 38
  if (step === commandLength) return 450
  return 600
}

function useRun(item, started, reduceMotion) {
  const total = item.command.length + item.log.length
  const [step, setStep] = useState(reduceMotion ? total : 0)
  useEffect(() => {
    if (!started || step >= total) return
    const id = setTimeout(() => setStep((s) => s + 1), delayFor(step, item.command.length))
    return () => clearTimeout(id)
  }, [started, step, total, item.command.length])
  return {
    typed: item.command.slice(0, Math.min(step, item.command.length)),
    lines: item.log.slice(0, Math.max(0, step - item.command.length)),
    done: step >= total,
  }
}

function LogLine({ text, last }) {
  const ok = text.endsWith("✓")
  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("pl-4 -indent-4", last && ok ? "text-terminal-foreground" : "text-terminal-muted")}
    >
      <span className="text-terminal-muted" aria-hidden="true">
        ›{" "}
      </span>
      {ok ? text.slice(0, -1) : text}
      {ok && <span className="text-light-green">✓</span>}
    </motion.p>
  )
}

function Terminal({ item, run }) {
  return (
    <div className="min-h-52 p-4 font-mono text-[13px] leading-relaxed break-words text-terminal-foreground [font-variant-ligatures:none] sm:min-h-64 sm:p-5 sm:text-sm">
      <p>
        <span className="text-primary">$ </span>
        {run.typed}
        {!run.typed.length || run.typed.length < item.command.length ? (
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-terminal-foreground" />
        ) : null}
      </p>
      {run.lines.map((line, i) => (
        <LogLine key={line} text={line} last={i === item.log.length - 1} />
      ))}
      {run.done && (
        <p className="mt-1">
          <span className="text-primary">$ </span>
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-terminal-foreground motion-safe:animate-pulse" />
        </p>
      )}
    </div>
  )
}

/* ---------- Prévias do resultado ---------- */

function ChartPreview({ data, done }) {
  const max = Math.max(...data.bars.map((b) => b.value))
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold">{data.title}</p>
      <div className="flex h-36 items-end gap-3 border-b pb-px" role="img" aria-label={`${data.title}: gráfico de barras ilustrativo`}>
        {data.bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              initial={false}
              animate={{ scaleY: done ? b.value / max : 0.04 }}
              transition={{ duration: 0.6, delay: done ? i * 0.08 : 0, ease }}
              style={{ originY: 1 }}
              className={cn("h-full rounded-t-md", i === data.bars.length - 1 ? "bg-primary" : "bg-primary/45")}
            />
          </div>
        ))}
      </div>
      <div className="-mt-3 flex gap-3" aria-hidden="true">
        {data.bars.map((b) => (
          <span key={b.label} className="flex-1 text-center text-xs text-muted-foreground tabular-nums">
            {b.label}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">{data.topTitle}</p>
        <ol className="flex flex-col gap-1.5 text-sm">
          {data.top.map((name, i) => (
            <li key={name} className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground tabular-nums">
                {i + 1}
              </span>
              {name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// "Folha" do PDF: sempre branca, como um documento impresso, nos dois temas.
function QuotePreview({ data }) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4 rounded-md bg-white p-5 text-[0.8rem] text-[#0b0d10] shadow-[0_1px_2px_rgb(0_0_0/0.08),0_12px_28px_-10px_rgb(0_0_0/0.3)] ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#0b0d10] text-[0.65rem] font-bold text-white">
            SE
          </span>
          <span className="font-heading text-sm font-bold">{data.company}</span>
        </div>
        <span className="rounded bg-[#c62828] px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">PDF</span>
      </div>
      <div className="h-1 rounded-full bg-primary" />
      <div className="flex justify-between gap-2">
        <div>
          <p className="font-semibold">{data.number}</p>
          <p className="text-[#575d66]">
            {data.clientLabel}: {data.client}
          </p>
        </div>
        <p className="text-[#575d66]">{data.date}</p>
      </div>
      <ul className="flex flex-col border-t border-[#e4e6ea]">
        {data.items.map((it) => (
          <li key={it.name} className="flex justify-between gap-2 border-b border-[#e4e6ea] py-1.5">
            <span>{it.name}</span>
            <span className="tabular-nums">{it.value}</span>
          </li>
        ))}
      </ul>
      <p className="flex justify-between font-semibold">
        <span>{data.totalLabel}</span>
        <span className="tabular-nums">{data.total}</span>
      </p>
    </div>
  )
}

function StockPreview({ data }) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            {data.headers.map((h, i) => (
              <th key={h} scope="col" className={cn("px-1 pb-2 font-medium", i > 0 && i < 3 && "text-right")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r) => {
            const low = r.stock < r.min
            return (
              <tr key={r.name} className="border-b last:border-0">
                <th scope="row" className="px-1 py-2.5 font-normal">
                  {r.name}
                </th>
                <td className={cn("px-1 py-2.5 text-right tabular-nums", low && "font-semibold text-destructive")}>{r.stock}</td>
                <td className="px-1 py-2.5 text-right text-muted-foreground tabular-nums">{r.min}</td>
                <td className="px-1 py-2.5">
                  {low ? (
                    <Badge variant="destructive" className="h-6 px-2">
                      {data.low}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="h-6 px-2 text-muted-foreground">
                      {data.ok}
                    </Badge>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Preview({ item, done }) {
  if (item.id === "relatorio") return <ChartPreview data={item.preview} done={done} />
  if (item.id === "orcamento") return <QuotePreview data={item.preview} />
  return <StockPreview data={item.preview} />
}

/* ---------- Vitrine de um item ---------- */

function Showcase({ item, started, reduceMotion, onReplay }) {
  const run = useRun(item, started, reduceMotion)
  const outputFile = item.log.at(-1).replace(/ ✓$/, "")

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-7">
          <MacWindow
            title={item.file}
            dark
            fullscreenContent={
              <PythonCode code={item.code} command={item.command} output={outputFile} large label={`Código de ${item.file}`} />
            }
          >
            {/* A animação é visual; leitores de tela recebem o log completo abaixo. */}
            <div aria-hidden="true">
              <Terminal item={item} run={run} />
            </div>
            <div className="sr-only">
              <p>{automations.logLabel}:</p>
              <p>$ {item.command}</p>
              <ul>
                {item.log.map((line) => (
                  <li key={line}>{line.replace(" ✓", ", concluído")}</li>
                ))}
              </ul>
            </div>
          </MacWindow>
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs text-muted-foreground">{item.file}</p>
            <Button variant="ghost" size="sm" onClick={onReplay} disabled={!run.done} className="h-10">
              <RotateCcwIcon data-icon="inline-start" />
              {automations.replay}
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-4 sm:p-5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-link">{automations.previewLabel}</p>
            {!run.done && (
              <p className="text-xs text-muted-foreground" aria-hidden="true">
                {automations.waiting}
              </p>
            )}
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: run.done ? 1 : 0.35, y: run.done ? 0 : 6 }}
            transition={{ duration: 0.45, ease }}
          >
            <Preview item={item} done={run.done} />
          </motion.div>
        </div>
      </div>

      <dl className="grid overflow-hidden rounded-2xl border sm:grid-cols-2">
        <div className="flex flex-col gap-1 bg-muted/60 p-5">
          <dt className="flex items-center gap-3 text-sm font-semibold">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">
              <XIcon className="size-4" aria-hidden="true" />
            </span>
            {automations.before}
          </dt>
          <dd className="pl-10 text-muted-foreground">{item.before}</dd>
        </div>
        <div className="flex flex-col gap-1 border-t p-5 sm:border-t-0 sm:border-l">
          <dt className="flex items-center gap-3 text-sm font-semibold">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckIcon className="size-4" aria-hidden="true" />
            </span>
            {automations.after}
          </dt>
          <dd className="pl-10">{item.after}</dd>
        </div>
      </dl>
    </div>
  )
}

export function Automations() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  // Só começa a "rodar" quando a vitrine aparece na tela.
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const [active, setActive] = useState(automations.items[0].id)
  const [run, setRun] = useState(0)

  return (
    <section id="automacoes" aria-labelledby="automacoes-title" className="border-t py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="automacoes-title"
          eyebrow={automations.eyebrow}
          title={automations.title}
          intro={automations.lead}
        />

        <Reveal>
          <Tabs value={active} onValueChange={setActive} className="gap-6">
            {/* Celular: uma linha rolável na horizontal, rótulos curtos. Desktop: rótulos completos. */}
            <TabsList
              aria-label={automations.tabsLabel}
              className="w-full max-w-full justify-start group-data-horizontal/tabs:h-11 overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden"
            >
              {automations.items.map((item) => {
                const Icon = icons[item.icon]
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="h-full flex-[1_0_auto] gap-1.5 px-2.5 sm:flex-none sm:gap-2 sm:px-4"
                  >
                    <Icon aria-hidden="true" />
                    <span className="sm:hidden">{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <div ref={ref}>
              {automations.items.map((item) => (
                // O painel tem conteúdo focável, então não precisa ser uma parada de Tab.
                <TabsContent key={item.id} value={item.id} tabIndex={-1} className="flex flex-col gap-6 text-base">
                  <p className="max-w-2xl text-base leading-[1.6] text-muted-foreground sm:text-lg">{item.summary}</p>
                  <Showcase
                    key={`${item.id}-${run}`}
                    item={item}
                    started={inView}
                    reduceMotion={reduceMotion}
                    onReplay={() => setRun((r) => r + 1)}
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Reveal>

        <Reveal className="flex flex-col gap-5 rounded-2xl border bg-muted px-6 py-7 sm:px-10 md:flex-row md:items-center md:justify-between">
          <p className="font-heading text-xl font-semibold sm:text-2xl">{automations.cta.text}</p>
          <Button asChild size="lg" className="shrink-0">
            <a href={whatsappUrl(automations.cta.message)} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" data-icon="inline-start" />
              {automations.cta.button}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
