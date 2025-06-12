import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
    state: () => ({
        selectedLang: 'en' as 'en' | 'fr' | 'de',
    }),
    actions: {
        setLang(lang: 'en' | 'fr' | 'de') {
            this.selectedLang = lang
        },
    },
})
