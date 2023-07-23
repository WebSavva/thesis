<template>
  <div class="region-section">
    <RussianMap
      v-model:activeRegion="activeRegion"
      class="region-section__map"
    />

    <RegionsTable
      v-model:activeRegion="activeRegion"
      class="region-section__table"
    />

    <RegionCard
      :activeRegion="activeRegion"
      class="region-section__card"
    />
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
