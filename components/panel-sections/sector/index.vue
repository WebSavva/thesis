<template>
  <div class="sector-section">
    <div class="sector-section__chart">
      <SectorChart
        :activeSectorId="activeSectorId"
      />
    </div>

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
