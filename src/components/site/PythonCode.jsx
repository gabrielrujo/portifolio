import { Fragment } from "react"

import { cn } from "@/lib/utils"

// Realce mínimo de Python usando só o acento e tons neutros.
const TOKEN = /(#.*$)|(f?"[^"]*"|f?'[^']*')|\b(import|from|as|def|return|for|in|if|else|print|with|True|False|None)\b/g

function highlight(line) {
  const parts = []
  let last = 0
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) parts.push(line.slice(last, m.index))
    const cls = m[1] ? "text-terminal-muted italic" : m[2] ? "text-white" : "text-primary"
    parts.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>
    )
    last = m.index + m[0].length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

// Código Python com numeração de linhas e, opcionalmente, o comando e a última saída.
export function PythonCode({ code, command, output, large, label = "Código Python de exemplo" }) {
  const lines = code.split("\n")
  return (
    <div className={cn("font-mono text-terminal-foreground [font-variant-ligatures:none]", large ? "p-6 text-base sm:p-10 sm:text-lg" : "p-4 text-[13px] sm:p-5 sm:text-sm")}>
      <pre tabIndex={0} aria-label={label} className="overflow-x-auto leading-relaxed focus-visible:outline-offset-4">
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              <span className="mr-4 inline-block w-5 text-right text-terminal-muted select-none" aria-hidden="true">
                {i + 1}
              </span>
              {highlight(line)}
              {"\n"}
            </Fragment>
          ))}
        </code>
      </pre>
      {command && (
        <div className="mt-4 border-t border-white/10 pt-3 leading-relaxed">
          <p>
            <span className="text-primary" aria-hidden="true">$ </span>
            {command}
          </p>
          {output && <p className="text-terminal-muted">{output}</p>}
        </div>
      )}
    </div>
  )
}
