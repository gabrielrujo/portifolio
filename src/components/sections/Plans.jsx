import { ArrowUpIcon, CheckIcon, SquareTerminalIcon, WalletIcon } from "lucide-react"

import { plans, whatsappUrl } from "@/config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"
import { SectionHeading } from "@/components/site/SectionHeading"

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="border-t py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="planos-title" eyebrow={plans.eyebrow} title={plans.title} intro={plans.intro} />

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.items.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.06} className="flex">
              <Card className={cn("w-full gap-6 rounded-2xl py-7", plan.popular ? "ring-2 ring-primary" : "")}>
                <CardHeader className="px-6">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                    {plan.popular && <Badge className="h-6 px-2.5">{plans.popular}</Badge>}
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-6 px-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-heading text-5xl font-bold tracking-tight">{plan.price}</p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <WalletIcon className="size-4" aria-hidden="true" />
                      {plans.payment}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5 border-t pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-link" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-0 bg-transparent px-6 pt-0">
                  <Button asChild size="lg" variant={plan.popular ? "default" : "outline"} className="w-full">
                    <a
                      href={whatsappUrl(`Olá, Gabriel! Tenho interesse no plano ${plan.name} (${plan.price}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="size-4" data-icon="inline-start" />
                      {plans.cta}
                      <span className="sr-only"> do plano {plan.name} pelo WhatsApp (abre em nova aba)</span>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="grid gap-5 rounded-2xl border bg-card p-6 sm:p-7 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="flex gap-4 lg:col-span-7">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted text-link">
              <SquareTerminalIcon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-semibold">
                {plans.automation.title} <span className="text-link">{plans.automation.price}</span>
              </h3>
              <p className="text-muted-foreground">{plans.automation.text}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button asChild size="lg" variant="ghost">
              <a href="#automacoes">
                {plans.automation.link}
                <ArrowUpIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={whatsappUrl(`Olá, Gabriel! Quero um orçamento de automação em Python (${plans.automation.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="size-4" data-icon="inline-start" />
                {plans.automation.cta}
                <span className="sr-only"> de automação pelo WhatsApp (abre em nova aba)</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
