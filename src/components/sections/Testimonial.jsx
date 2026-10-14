import { testimonial } from "@/config"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/site/Container"
import { Reveal } from "@/components/site/Reveal"

export function Testimonial() {
  return (
    <section aria-labelledby="depoimento-title" className="border-t py-20 sm:py-28">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex flex-col items-start gap-3 lg:col-span-3">
          <h2 id="depoimento-title" className="text-sm font-medium tracking-normal text-link">
            {testimonial.eyebrow}
          </h2>
          {testimonial.placeholder && (
            <Badge variant="outline" className="border-dashed text-muted-foreground">
              {testimonial.placeholderLabel}
            </Badge>
          )}
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-9">
          <figure className="flex flex-col gap-8">
            <blockquote className="font-heading text-2xl leading-snug font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              <p>“{testimonial.quote}”</p>
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full border bg-muted text-sm font-semibold"
              >
                {testimonial.initials}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-sm text-muted-foreground">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}
