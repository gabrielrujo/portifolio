import { ArrowUpIcon, CheckIcon, SquareTerminalIcon, WalletIcon, WrenchIcon } from "lucide-react"

import { plans, whatsappUrl } from "@/config"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"
import { SectionHeading } from "@/components/site/SectionHeading"

const extraIcons = { terminal: SquareTerminalIcon, wrench: WrenchIcon }

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

        <ul className="grid gap-6 lg:grid-cols-2">
          {plans.extras.map((extra, i) => {
            const Icon = extraIcons[extra.icon]
            return (
              <Reveal
                as="li"
                key={extra.id}
                delay={i * 0.06}
                className="flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-7"
              >
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted text-link">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold">
                      {extra.title} <span className="text-link">{extra.price}</span>
                    </h3>
                    <p className="text-muted-foreground">{extra.text}</p>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:justify-end">
                  {extra.link && (
                    <Button asChild size="lg" variant="ghost">
                      <a href={extra.link.href}>
                        {extra.link.label}
                        <ArrowUpIcon data-icon="inline-end" />
                      </a>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline">
                    <a href={whatsappUrl(extra.message)} target="_blank" rel="noopener noreferrer">
                      <WhatsappIcon className="size-4" data-icon="inline-start" />
                      {extra.cta}
                      <span className="sr-only"> ({extra.title}) pelo WhatsApp (abre em nova aba)</span>
                    </a>
                  </Button>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
