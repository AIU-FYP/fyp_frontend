// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxt/ui',],
    colorMode: {
        preference: 'light'
    },
    plugins: [
        './plugins/axios.ts',
    ],
    runtimeConfig: {
        public: {
            isDev: process.env.NODE_ENV === 'development',
        },
    },

})