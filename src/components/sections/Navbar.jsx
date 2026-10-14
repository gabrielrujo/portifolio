import { useEffect, useState } from "react"
import { MenuIcon } from "lucide-react"

import { nav, profile, whatsappUrl } from "@/config"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/site/ThemeToggle"

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

// No topo, a barra é transparente sobre o hero. Ao rolar, vira uma barra flutuante
// arredondada, com borda sutil e fundo translúcido desfocado.
export function Navbar({ menuOpen, onMenuOpenChange }) {
  const scrolled = useScrolled()
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 sm:px-4">
      <div
        className={cn(
          "mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 border border-transparent px-1 transition-[margin,max-width,background-color,border-color,box-shadow,padding] duration-300 ease-out motion-reduce:transition-none sm:px-3 xl:grid-cols-[1fr_auto_1fr] lg:px-4",
          scrolled &&
            "mt-3 max-w-6xl rounded-2xl border-border/80 bg-background/75 px-3 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl backdrop-saturate-150 sm:px-4 dark:bg-background/65 dark:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.7)]"
        )}
      >
        <a href="#inicio" className="flex w-fit items-center gap-2.5 rounded-md font-heading text-base font-semibold whitespace-nowrap">
          {/* Decorativa: o nome ao lado já identifica o link. */}
          <img
            src={profile.photo}
            alt=""
            width="32"
            height="32"
            className="size-8 rounded-lg border object-cover"
          />
          {profile.name}
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Button asChild variant="ghost" className="px-3 text-muted-foreground hover:text-foreground">
                  <a href={link.href}>{link.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-1.5">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" data-icon="inline-start" />
              {nav.cta}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={onMenuOpenChange}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="xl:hidden" aria-label={nav.menuLabel}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%]">
              <SheetHeader>
                <SheetTitle className="font-heading text-lg">{nav.menuTitle}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Menu móvel" className="flex flex-col px-4">
                {nav.links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a href={link.href} className="border-b py-4 font-heading text-xl font-semibold hover:text-link">
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="px-4">
                <Button asChild size="lg" className="w-full">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="size-4" data-icon="inline-start" />
                    {nav.cta}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
