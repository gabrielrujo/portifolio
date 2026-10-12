import { ArrowRightIcon, BriefcaseIcon, LayoutTemplateIcon, SquareTerminalIcon, StoreIcon } from "lucide-react"

import { services } from "@/config"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"
import { SectionHeading } from "@/components/site/SectionHeading"

const icons = {
  briefcase: BriefcaseIcon,
  store: StoreIcon,
  layout: LayoutTemplateIcon,
  terminal: SquareTerminalIcon,
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="border-t py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="servicos-title" eyebrow={services.eyebrow} title={services.title} />

        <ul className="grid gap-x-12 sm:grid-cols-2">
          {services.items.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 0.05}
                className="grid grid-cols-[2.75rem_1fr] content-start gap-x-4 gap-y-1.5 border-b py-6 first:border-t sm:nth-2:border-t"
              >
                <span className="row-span-3 flex size-11 items-center justify-center rounded-xl border bg-muted text-link">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="self-center text-xl font-semibold">{s.title}</h3>
                <p className="text-muted-foreground">{s.text}</p>
                {s.id === "python" && (
                  <a
                    href="#automacoes"
                    className="inline-flex w-fit items-center gap-1 py-1 text-sm font-medium text-link underline-offset-4 hover:underline"
                  >
                    {services.more}
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                  </a>
                )}
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
