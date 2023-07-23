<template>
  <div class="sector-section">
    <SectorChart
      :activeSectorId="activeSectorId"
      class="sector-section__chart"
    />

    <SectorList
      v-model:activeSectorId="activeSectorId"
      class="sector-section__list"
    />

    <SectorTable
      :activeSectorId="activeSectorId"
      class="sector-section__table"
    />

    <SectorCard
      :activeSectorId="activeSectorId"
      class="sector-section__card"
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
