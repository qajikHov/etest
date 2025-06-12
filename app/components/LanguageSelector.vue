<!-- components/LanguageSelector.vue -->
<template>
    <div class="language-selector">
        <label for="lang">Language:</label>
        <select id="lang" v-model="langStore.selectedLang">
            <option v-for="(label, code) in languages" :key="code" :value="code">
                {{ label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

const languages: Record<string, string> = {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
}
</script>

<style scoped>
.language-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
