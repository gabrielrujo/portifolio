import { floatingWhatsapp, whatsappUrl } from "@/config"
import { cn } from "@/lib/utils"
import { WhatsappIcon } from "@/components/site/BrandIcons"

// Sempre visível no celular (exceto com o menu aberto); no desktop o botão da navbar cumpre esse papel.
// O rodapé reserva espaço embaixo para o botão nunca cobrir conteúdo.
export function FloatingWhatsapp({ hidden = false }) {
  return (
    <aside aria-label={floatingWhatsapp.label} className={cn("md:hidden", hidden && "hidden")}>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${floatingWhatsapp.label} (abre em nova aba)`}
        className="fixed right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/10 transition-transform active:scale-95"
      >
        <WhatsappIcon className="size-6" />
      </a>
    </aside>
  )
}
