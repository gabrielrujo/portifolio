import { cn } from "@/lib/utils"

// Os três botões do macOS. Os símbolos (×, −, +) aparecem ao passar o mouse
// ou ao focar pelo teclado. A área de toque é ampliada por um pseudo-elemento.
const glyphs = {
  close: <path d="M3.5 3.5l5 5m0-5l-5 5" />,
  minimize: <path d="M3 6h6" />,
  maximize: <path d="M6 3v6M3 6h6" />,
}

const colors = {
  close: "bg-light-red",
  minimize: "bg-light-yellow",
  maximize: "bg-light-green",
}

function Light({ kind, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex size-3 items-center justify-center rounded-full ring-1 ring-black/10 ring-inset before:absolute before:-inset-1.5 before:content-[''] disabled:cursor-default disabled:opacity-40",
        colors[kind]
      )}
    >
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="size-2.5 fill-none stroke-black/60 opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100 group-focus-within/lights:opacity-100"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {glyphs[kind]}
      </svg>
    </button>
  )
}

export function TrafficLights({ labels, onClose, onMinimize, onMaximize, minimizeDisabled }) {
  return (
    <div className="group/lights flex items-center gap-3">
      <Light kind="close" label={labels.close} onClick={onClose} />
      <Light kind="minimize" label={labels.minimize} onClick={onMinimize} disabled={minimizeDisabled} />
      <Light kind="maximize" label={labels.maximize} onClick={onMaximize} />
    </div>
  )
}
