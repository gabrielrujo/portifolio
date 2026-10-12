import { floatingWhatsapp, whatsappUrl } from "@/config"
import { WhatsappIcon } from "@/components/site/BrandIcons"

// Sempre visível no celular; no desktop o botão da navbar cumpre esse papel.
export function FloatingWhatsapp() {
  return (
    <aside aria-label={floatingWhatsapp.label} className="md:hidden">
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${floatingWhatsapp.label} (abre em nova aba)`}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/10 transition-transform active:scale-95 md:hidden"
    >
      <WhatsappIcon className="size-7" />
    </a>
    </aside>
  )
}
