import { cn } from "@/lib/utils"
import { Reveal } from "./Reveal"

// Cabeçalho alinhado à esquerda; a introdução, quando existe, fica deslocada à direita.
export function SectionHeading({ eyebrow, title, intro, id, className }) {
  return (
    <Reveal className={cn("grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8", className)}>
      <div className="flex flex-col gap-3 lg:col-span-7">
        <p className="font-medium text-sm text-link">{eyebrow}</p>
        <h2 id={id} className="text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-md text-base leading-[1.6] text-muted-foreground sm:text-lg lg:col-span-4 lg:col-start-9">{intro}</p>}
    </Reveal>
  )
}
