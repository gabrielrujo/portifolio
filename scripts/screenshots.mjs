// Tira capturas de tela de cada projeto listado em src/config.js e salva em public/projects/:
//   <id>-desktop.jpg (1440×900) e <id>-mobile.jpg (390×844, tela 2x).
// Se um site não abrir, gera no lugar uma imagem provisória com o nome do projeto,
// para o portfólio continuar funcionando. Uso: npm run screenshots
import { mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { chromium } from "playwright"

import { projects } from "../src/config.js"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, "public", "projects")

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
}

// WebGL ligado no modo headless (o Ciclo tem uma lata em 3D).
const args = ["--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
if (process.platform === "darwin") args.push("--use-angle=metal", "--enable-gpu")

async function launch() {
  // Usa o Chrome instalado no computador; se não houver, o Chromium do Playwright
  // (instale com `npx playwright install chromium`).
  try {
    return await chromium.launch({ channel: "chrome", args })
  } catch {
    return chromium.launch({ args })
  }
}

function placeholderHtml(project, kind, error) {
  const { width, height } = VIEWPORTS[kind].viewport
  return `<!doctype html><html><body style="margin:0;width:${width}px;height:${height}px;display:grid;place-items:center;
    background:#f4f5f7;color:#0b0d10;font:500 ${kind === "mobile" ? 18 : 28}px system-ui,sans-serif;text-align:center">
    <div><div style="font-weight:700;font-size:1.6em">${project.title}</div>
    <div style="margin-top:.6em;color:#575d66">Captura indisponível · imagem provisória</div>
    <div style="margin-top:.4em;color:#575d66;font-size:.6em">${project.url}</div>
    <!-- ${String(error).replace(/--/g, "")} --></div></body></html>`
}

async function capture(browser, project, kind) {
  const file = path.join(outDir, `${project.id}-${kind}.jpg`)
  const context = await browser.newContext({ ...VIEWPORTS[kind], locale: "pt-BR", reducedMotion: "no-preference" })
  const page = await context.newPage()
  try {
    await page.goto(project.url, { waitUntil: "load", timeout: 45_000 })
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {})
    await page.evaluate(() => document.fonts?.ready)
    // Tempo para animações de entrada e cenas 3D assentarem.
    await page.waitForTimeout(3500)
    await page.screenshot({ path: file, type: "jpeg", quality: 82 })
    console.log(`ok    ${path.relative(root, file)}`)
    return true
  } catch (error) {
    await page.setContent(placeholderHtml(project, kind, error.message))
    await page.screenshot({ path: file, type: "jpeg", quality: 82 })
    console.warn(`falhou ${project.url} (${kind}): ${error.message.split("\n")[0]} → imagem provisória salva`)
    return false
  } finally {
    await context.close()
  }
}

await mkdir(outDir, { recursive: true })
const browser = await launch()
let failures = 0
for (const project of projects.items) {
  for (const kind of Object.keys(VIEWPORTS)) {
    if (!(await capture(browser, project, kind))) failures++
  }
}
await browser.close()
if (failures) console.warn(`${failures} captura(s) ficaram como imagem provisória.`)
