import { process } from "@/config"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"
import { SectionHeading } from "@/components/site/SectionHeading"

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="border-t bg-muted/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="processo-title" eyebrow={process.eyebrow} title={process.title} />
        <ol className="grid gap-0 lg:grid-cols-4 lg:gap-8">
          {process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.07}
              className="group relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-5 lg:pb-0"
            >
              {/* Linha que conecta as etapas: vertical no celular, horizontal no desktop */}
              <span
                aria-hidden="true"
                className="absolute top-12 bottom-0 left-[1.4rem] w-px bg-border group-last:hidden lg:top-[1.4rem] lg:right-[-2rem] lg:bottom-auto lg:left-14 lg:h-px lg:w-auto"
              />
              <span
                aria-hidden="true"
                className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium text-link"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2 pt-2 lg:pt-0">
                <h3 className="text-lg font-semibold">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
