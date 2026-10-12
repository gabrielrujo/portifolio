import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { site } from './src/config.js'

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Preenche título, descrição e Open Graph do index.html a partir de src/config.js.
function siteMeta() {
  const values = {
    __SITE_TITLE__: site.title,
    __SITE_DESCRIPTION__: site.description,
    __SITE_URL__: site.url.replace(/\/$/, ''),
    __SITE_OG_IMAGE__: site.ogImage,
    __SITE_LOCALE__: site.locale,
  }
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html.replace(/__SITE_[A-Z_]+?__/g, (key) => (key in values ? escapeHtml(values[key]) : key))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
