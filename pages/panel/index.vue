<template>
  <RegionSection />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import RegionSection from '@/components/panel-sections/region/index.vue';

definePageMeta({
  pageTransition: {
    name: 'fade-slide',
    mode: 'out-in',
  }
})
</script>
