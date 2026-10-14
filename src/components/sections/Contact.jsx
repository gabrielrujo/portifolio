import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { contact, profile, whatsappUrl } from "@/config"
import { Button } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/site/BrandIcons"
import { Container } from "@/components/site/Container"
import { Dock } from "@/components/site/Dock"
import { Reveal } from "@/components/site/Reveal"

function CopyEmail() {
  const [status, setStatus] = useState("idle")
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setStatus("copied")
    } catch {
      setStatus("error")
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus("idle"), 2500)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-sm text-muted-foreground">{contact.emailLabel}</p>
      <div className="flex flex-col items-start gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="font-heading text-xl font-semibold [overflow-wrap:anywhere] underline-offset-4 select-all hover:underline sm:text-2xl"
        >
          {profile.email}
        </a>
        <Button variant="outline" onClick={copy}>
          {status === "copied" ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          {status === "copied" ? contact.copied : contact.copy}
        </Button>
      </div>
      <p role="status" className="min-h-5 text-sm text-muted-foreground">
        {status === "copied" && <span className="sr-only">{contact.copied}</span>}
        {status === "error" && contact.copyError}
      </p>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-12 rounded-3xl border bg-muted/50 p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <p className="font-medium text-sm text-link">{contact.eyebrow}</p>
            <h2 id="contato-title" className="text-4xl leading-[1.05] font-bold sm:text-5xl">
              {contact.title}
            </h2>
            <p className="max-w-lg text-lg text-muted-foreground">{contact.text}</p>
            <div className="flex items-center gap-3">
              <img
                src={profile.photo}
                alt={profile.photoAlt}
                width="64"
                height="64"
                loading="lazy"
                className="size-16 rounded-2xl border object-cover"
              />
              <p className="leading-tight">
                <span className="block font-semibold">{profile.name}</span>
                <span className="text-sm text-muted-foreground">{profile.role}</span>
              </p>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" data-icon="inline-start" />
                {contact.whatsappCta}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-5 lg:justify-end">
            <CopyEmail />
            <Dock />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
