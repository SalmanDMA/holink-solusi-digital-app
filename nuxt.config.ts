import tools from './app/data/tools.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://holink-solusi-digital.vercel.app',
  },

  sitemap: {
    urls: tools.map((tool) => `/tools/${tool.slug}`),
  },

  app: {
    head: {
      title: 'Holink Solusi Digital',
      meta: [
        {
          name: 'description',
          content:
            'Discover software tools for marketing, analytics, automation, productivity, and growth.',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        ...tools.map(tool => `/tools/${tool.slug}`)
      ]
    }
  }
})