import { ctaBands, whatsappUrl } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"

// `visual` (opcional) aparece à direita a partir do md, como o notebook 3D depois dos projetos.
export function CtaBand({ title, text, visual }) {
  return (
    <Container>
      <Reveal
        className={cn(
          "flex flex-col gap-6 rounded-2xl border bg-muted px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between",
          visual && "md:py-4 md:pr-4"
        )}
      >
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="font-heading text-xl font-semibold sm:text-2xl">{title}</p>
            <p className="text-muted-foreground">{text}</p>
          </div>
          {visual && <CtaButton />}
        </div>
        {visual ? <div className="hidden w-full max-w-sm shrink-0 md:block lg:max-w-md">{visual}</div> : <CtaButton />}
      </Reveal>
    </Container>
  )
}

function CtaButton() {
  return (
    <Button asChild size="lg" className="shrink-0">
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
        <WhatsappIcon className="size-4" data-icon="inline-start" />
        {ctaBands.button}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </Button>
  )
}
