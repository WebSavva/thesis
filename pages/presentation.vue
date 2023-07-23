<template>
  <ClientOnly>
    <Presentation />
  </ClientOnly>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from '#imports';

const Presentation = defineAsyncComponent({
  loader: () => import('@/components/presentation'),
});
</script>
