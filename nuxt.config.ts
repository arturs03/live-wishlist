// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'nuxt-security',
    '@nuxtjs/supabase',
    'radix-vue/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  compatibilityDate: '2024-10-13',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    redirect: false,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
})
