<template>
  <SectorSection />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

import SectorSection from '@/components/panel-sections/sector/index.vue';

definePageMeta({
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  }
})
</script>
