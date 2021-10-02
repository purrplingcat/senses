import icons from './icons.config.js'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Senses - Roztoky 51',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/slider.css',
    '@/assets/css/svg-image.scss',
    '@/assets/css/utilities.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/components',
    '@/plugins/colormode',
    '@/plugins/svg-icons'
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.APOLLO_HTTP || 'http://localhost:8080/graphql',
        wsEndpoint: process.env.APOLLO_WS || 'ws://localhost:8080/graphql'
      }
    },
    watchLoading: '@/plugins/watch-loading.js'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Public runtime config
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL || 'http://localhost:8080'
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Senses',
      lang: 'cs'
    }
  },

  // Google fonts util configuration: https://google-fonts.nuxtjs.org/options
  googleFonts: {
    download: true,
    families: {
      Inter: true
    }
  },

  // https://github.com/nuxt-community/svg-sprite-module
  svgSprite: {
    input: '~/assets/sprites',
    output: '~/assets/_gen/svg'
  },

  fontawesome: {
    component: 'fa',
    icons
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
