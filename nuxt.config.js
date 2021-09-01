const pkg = require('./package')
require('dotenv').config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Demo',
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
    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vue-json-pretty/lib/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/set-session-id', ssr: false },
    { src: '~/plugins/vue-multianalytics', ssr: false },
    { src: '~/plugins/vue-chart-kick.js', ssr: false },
    '@/plugins/vue-json-pretty',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-intercom',
    'nuxt-stripe-module',
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
        }
      }
    ]
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          // propertyName: 'access',
          maxAge: 60 * 60,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 2
        },
        endpoints: {
          login: {
            url: '/api/v1/token/',
            method: 'post',
            propertyName: 'access',
            altProperty: 'refresh'
          },
          refresh: {url: '/api/v1/refresh_token/', method: 'post'},
          user: {url: '/api/v1/users/self/', method: 'get'},
          logout: {},
        },
        user: {
          property: false
        }
      }
    },
    redirect: false,
  },

  generate: {
    routes: ['/demo/intercom', '/demo/user', '/demo/stripe', '/demo/code',  '/demo/events']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      config.devtool = isClient ? 'eval-source-map' : 'inline-source-map'
    }
  },

  intercom: {
    appId: process.env.INTERCOM_APP_ID,
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    eventTrackerUrl: process.env.EVENT_TRACKER_URL,
    intercomAppId: process.env.INTERCOM_APP_ID,
    ipApiKey: process.env.IP_API_KEY,
    stripe: {
      publishableKey: process.env.STRIPE_PUBLIC_KEY,
    },
    codeSandboxApiUrl: process.env.CODE_SANDBOX_API_URL,
    cubeJsApiUrl: process.env.CUBEJS_API_URL,
    cubeJsToken: process.env.CUBEJS_TOKEN
  }
}
