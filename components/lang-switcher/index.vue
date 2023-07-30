<template>
  <div class="lang-switcher">
    <a
      v-for="{ id, href } in langs"
      :key="id"
      :href="href"
      class="lang-switcher__item"
      :class="{
        'lang-switcher__item_active': id === $int.lang,
      }"
    >
      <img
        :src="`/langs/${id}.svg`"
        lazy="loading"
        role="presentation"
        class="lang-switcher__item__icon"
      >
    </a>
  </div>
</template>

<script
  src="./index.ts"
  lang="ts"
></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
