// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/sanity', '@pinia/nuxt'],

    css: ['~/assets/css/main.css'],

    future: {
        compatibilityVersion: 4
    },

    compatibilityDate: '2024-11-27',

    sanity: {
        projectId: "9o433zav",
        dataset: "production",
    },
})
