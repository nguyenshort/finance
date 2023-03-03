// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Nuxt 3 + NestJS + Vite + TailwindCSS + Pinia + Vant',
            meta: [
              // disable zooming on mobile
              { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
            ]
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        '@vueuse/nuxt',
        // '@nuxt/devtools',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
    ],
    imports: {
        autoImport: true,
        dirs: [
            // automatically imports apollo folder
           './apollo/*',
        ],
        imports: [
            // van import { closeToast, showLoadingToast } from 'vant';
            { name: 'closeToast', from: 'vant' },
            { name: 'showNotify', from: 'vant' },
            { name: 'showLoadingToast', from: 'vant' }
        ]
    },
    apollo: {
        clients: {
            default: './apollo/index.ts'
        }
    },
    runtimeConfig: {
        // Private config that is only available on the server
        apiSecret: process.env.NUXT_API_SECRET,
        // Config within public will be also exposed to the client
        public: {
            apiBase: '/api',
            apiGraphQL: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT,
            apiBackend: process.env.NUXT_PUBLIC_BACKEND_ENDPOIT,
            cdnEndpoint: process.env.NUXT_PUBLIC_CDN_ENDPOIT,
        }
    },
    experimental: {
        externalVue: true,
    },
    sourcemap: false
})
