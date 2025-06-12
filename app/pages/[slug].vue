<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useLangStore } from "~/stores/lang";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const langStore = useLangStore()
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

if (post.value) {
    const lang = langStore.selectedLang
    const title = post.value.title?.[lang] || 'Blog Post'
    const description = post.value.excerpt?.[lang] || title
    const image = post.value.image ? urlFor(post.value.image).width(800).height(420).url() : ''

    useHead({
        title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
        ]
    })
}
</script>

<template>
    <main
        v-if="post"
    >
        <nuxt-link to="/" class="hover:underline">&larr; Back to posts</nuxt-link>
        <img
            v-if="post.image"
            :src="urlFor(post.image).width(550).height(310).url()"
            :alt="post?.title"
            class="aspect-video rounded-xl"
            width="550"
            height="310"
        />
        <h1 v-if="post.title" class="text-4xl font-bold mb-8">{{ post.title[langStore.selectedLang] }}</h1>
        <div class="prose">
            <SanityContent v-if="post.body[langStore.selectedLang]" :blocks="post.body[langStore.selectedLang]" />
        </div>
    </main>
</template>
