// import Appconfig from './app.config'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'pgap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/notifications', ssr: false },
    // { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-slider-component', ssr: false },
    { src: '~/plugins/services', ssr: false },
    // { src: '~/plugins/i18n', ssr: false },
    { src: '~/plugins/debug', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // [
    //   'nuxt-i18n',
    //   {
    //     locales: Appconfig.locales.available,
    //     lazy: true,
    //     langDir: 'locales/',
    //     defaultLocale: Appconfig.locales.default.code,
    //     detectBrowserLanguage: false,
    //     vueI18n: {
    //       fallbackLocale: 'en',
    //       messages: () => {
    //         return Appconfig.locales.available.reduce((obj, locale) => {
    //           obj[locale] = require('./locales/' + locale.file)
    //           return obj
    //         }, {})
    //       },
    //     },
    //     parsePages: false,
    //   },
    // ],
    '@nuxtjs/svg',
  ],

  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: '~/tailwind.config.js',
  },
}
