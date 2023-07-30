<template>
  <div class="thesis-page">
    <iframe
      :src="activeDocument.src"
      type="application/pdf"
      frameborder="0"
      class="thesis-page__viewer"
    />

    <ul class="thesis-page__list">
      <li
        v-for="documentItem in THESIS_DOCUMENTS"
        :key="documentItem.id"
        class="thesis-page__list__item"
        :class="{
          'thesis-page__list__item_selected': documentItem.id === activeDocument.id,
        }"
        @click="activeDocument = documentItem"
      >
        {{ documentItem.name }}
      </li>
    </ul>
  </div>
</template>

<script
  lang="ts"
  setup
>
import { ref, definePageMeta } from '#imports';

import { useInternalization, useBaseUrl } from '@/composables';

const {
  lang,
} = useInternalization();

const $baseUrl = useBaseUrl();

definePageMeta({
  pageTransition: {
    name: 'fade-slide',
    mode: 'out-in',
  }
});

const THESIS_DOCUMENTS = ([
  {
    id: 'thesis',
    src: $baseUrl.append('/thesis.pdf'),
    name: {
      ru: 'Текст ВКР',
      en: 'Thesis',
    },
  },
  {
    id: 'mentor',
    src: $baseUrl.append('/mentorReview.pdf'),
    name: {
      ru: 'Отзыв научного руководителя А.В.Юркова',
      en: 'Review of the academic advisor Aleksandr Yurkov',
    },
  },
  {
    id: 'employer',
    src: $baseUrl.append('/employerReview.pdf'),
    name: {
      ru: 'Отзыв научного руководителя А.В.Юркова',
      en: 'Review of the reviewer Mikhail Meleshkin',
    },
  },
]).map(item => ({
  ...item,
  name: item.name[lang],
}));

const activeDocument = ref<typeof THESIS_DOCUMENTS[number]>(THESIS_DOCUMENTS[0]);


</script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
