export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/simpledatalander/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'prelaunch-lander',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: "https://unpkg.com/@deckdeckgo/highlight-code@latest/dist/deckdeckgo-highlight-code/deckdeckgo-highlight-code.esm.js",},
    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-stencil',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  stencil: {
    /**
     * Required options
     */

    // Your library name, or the path to its root folder.
    lib: 'stencils/deckdeckgo/highlight-code',

    // The prefix to whitelist
    prefix: 'deckgo-',

    /**
     * Options below are optional
     */

    // Stencil rendering options
    renderOptions: {

    },

    // By default, it takes the lib name. e.g: bulmil/dist/hydrate
    hydratePath: __dirname + '/stencils/deckdeckgo/highlight-code/hydrate',

    // By default, it takes the lib name. e.g: bulmil/dist/loader
    loaderPath: __dirname + '/stencils/deckdeckgo/highlight-code/dist/loader',

    // By default, it takes the prefix. e.g: [/bm-\w*/]
    ignoredElements: null,
  },
}
