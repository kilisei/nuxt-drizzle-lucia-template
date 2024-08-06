import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: '2024-07-02',

  future: {
    compatibilityVersion: 4,
  },

  alias: {
    '@db': fileURLToPath(new URL('./server/database/schema', import.meta.url)),
  },

  imports: {
    dirs: ['server/database/schema'],
  },

  modules: [
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],

  build: {
    transpile: ['trpc-nuxt'],
  },
})
