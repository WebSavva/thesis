<template>
  <main class="index-page">
    <!-- BACKGROUND -->
    <div class="index-page__overlay"></div>

    <video class="index-page__bg-video" autoplay loop muted>
      <source
        class="index-page__bg-video__content"
        src="/t3.mp4"
      />
    </video>

    <!-- HERO SECTION -->
    <section class="index-page__hero">
      <h1 class="index-page__hero__header">
        {{ $int.dict.index.heading }}
      </h1>

      <div class="index-page__hero__btn-group">
        <NuxtLink
          :href="$int.hrefWithLang('/panel', false)"
          class="index-page__hero__btn"
        >
          {{ $int.dict.index.panel }}
        </NuxtLink>

        <a
          :href="$int.hrefWithLang('/presentation.html')"
          class="index-page__hero__btn index-page__hero__btn_alt"
        >
          {{ $int.dict.index.presentation }}
        </a>

        <LanguageSwitcher />
      </div>
    </section>

  </main>
</template>

<script setup>
import { usePageType, useHead, useBaseUrl } from '#imports';

import LanguageSwitcher from '@/components/lang-switcher/index.vue';

const $baseUrl = useBaseUrl();

usePageType('index');

useHead({
  link: [
    {
      rel: 'preload',
      href: $baseUrl.append('/t3.mp4'),
      as: 'video',
    }
  ]
});
</script>

<style lang="stylus" scoped>
.index-page
  width 100%
  height 100vh
  position relative

  @media $max-sm
    display flex
    justify-content center
    align-items center

  &__bg-video
  &__overlay
    height 100%
    width 100%
    position absolute
    top 0
    left 0

  &__bg-video
    height 100%
    width 100%
    object-fit cover

  &__overlay
    background rgba(0, 0, 0, 0.3)

  &__hero
    position absolute
    bottom 10%
    left 50%
    transform translateX(-50%)
    width 70%
    display flex
    flex-direction column
    align-items center

    @media $max-sm
      position static
      transform none

    &__header
      color #ffff
      text-transform uppercase
      font-size 4rem
      font-weight 700
      letter-spacing 0.5rem
      text-align center
      line-height 1.5
      z-index 1

      @media $max-xs
        font-size 3.75rem
        letter-spacing .25rem

    &__btn-group
      margin-top 2.5rem
      display flex
      flex-direction column

      & > * + *
        margin-top 1.5rem

    &__btn
      padding 1rem 2rem
      background #28a745
      color #fff
      cursor pointer
      font-size 2rem
      width 20rem
      text-align center
      border none
      outline none
      border-radius 1rem
      font-weight 500
      box-shadow 0.1rem 0.1rem 0.2rem rgba(212, 210, 210, 0.2)
      text-decoration none
      transition opacity 0.2s linear
      opacity 80%
      font-family var(--secondary-font)

      &:active
        border none
        outline none

      &:hover
        opacity 100%

      &_alt
        background #607d8b
</style>
