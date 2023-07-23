<template>
  <main id="container">
    <!-- BACKGROUND -->
    <div class="overlay-main"></div>

    <video class="bg-video" autoplay loop muted>
      <source class="video-content" src="t3.mp4" />
    </video>

    <!-- HERO SECTION -->
    <section class="hero-section">
      <h1 class="hero-header">
        Методы оценки экономических последствий COVID-19
      </h1>

      <a href="/panel" class="btn-action">Итоги</a>

      <a href="presentation" class="btn-action link-presentation"
        >Презентация</a
      >
    </section>
  </main>
</template>

<script setup>
import '~/assets/styles/index.css'
import { useHead } from '#imports';

useHead({
  title: 'Главная страница',
});
</script>
