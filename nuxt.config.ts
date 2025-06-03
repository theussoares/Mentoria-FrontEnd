// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  imports: {
    dirs: [
      'stores/**',
      'utils/**'
    ]
  }
})
