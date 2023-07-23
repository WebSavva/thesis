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

definePageMeta({
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  }
});

const THESIS_DOCUMENTS = [
  {
    id: 'thesis',
    src: '/thesis.pdf',
    name: 'Текст ВКР',
  },
  {
    id: 'mentor',
    src: '/mentorReview.pdf',
    name: 'Отзыв научного руководителя А.В.Юркова',
  },
  {
    id: 'employer',
    src: '/employerReview.pdf',
    name: 'Отзыв рецензента М.И.Мелешкина',
  },
];

const activeDocument = ref<typeof THESIS_DOCUMENTS[number]>(THESIS_DOCUMENTS[0]);


</script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
