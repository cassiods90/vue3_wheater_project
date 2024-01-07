// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Global page headers: https://go.nuxtjs.dev/config-head
    app: {
        head: {
            title: 'Wheater App',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/scss/style.scss'],

    devtools: { enabled: false },

    modules: ['@pinia/nuxt'],

    imports: {
        dirs: ['./stores'],
    },

    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
})
