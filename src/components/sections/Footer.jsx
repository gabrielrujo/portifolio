import { ArrowUpIcon } from "lucide-react"

import { footer, nav, profile } from "@/config"
import { Container } from "@/components/site/Container"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t pt-10 pb-28 md:pb-10">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="font-heading font-semibold">{profile.name}</p>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-block py-1 text-muted-foreground hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. {footer.note}
          </p>
          <a href="#inicio" className="inline-flex items-center gap-1.5 py-1 hover:text-foreground">
            <ArrowUpIcon className="size-4" aria-hidden="true" />
            {footer.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  )
}
