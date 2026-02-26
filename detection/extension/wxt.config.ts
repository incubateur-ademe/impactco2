import { defineConfig } from 'wxt'
import preact from '@preact/preset-vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Impact CO₂ - Détecteur',
    short_name: 'Impact CO₂',
    description: 'Comprendre les équivalents carbone sur chaque page web',
    version: '0.1.0',
  },

  vite: () => ({
    plugins: [preact()],
    resolve: {
      alias: [
        // Fallback on silent catcher for matomo tracking
        { find: 'utils/matomo', replacement: resolve(__dirname, 'src/matomo.ts') },
        // Fallback on external resources
        { find: 'components', replacement: resolve(__dirname, '../../src/components/') },
        { find: 'utils', replacement: resolve(__dirname, '../../src/utils/') },
        { find: 'types', replacement: resolve(__dirname, '../../types/') },
        { find: 'hooks', replacement: resolve(__dirname, '../../src/hooks/') },
      ],
    },
  }),
})
