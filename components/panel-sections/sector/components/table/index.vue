<template>
  <div class="sector-table">
    <div class="sector-table__tr sector-table__thead">
      <div class="sector-table__th">
        {{ columnNames.quarter }}
      </div>

      <div class="sector-table__th">
        {{ columnNames.realValue }}
      </div>

      <div class="sector-table__th">
        {{ columnNames.predictedValue }}
      </div>

      <div class="sector-table__th">
        {{ columnNames.loss }}
      </div>

      <div class="sector-table__th">
        {{ columnNames.quarterlyMeanValue }}
      </div>
    </div>

    <div
      v-for="{
        quarter,
        realValue,
        predictedValue,
        loss,
        quarterlyMeanValue,
        } in rows"
      :key="quarter"
      class="sector-table__tr"
    >
      <div class="sector-table__td sector-table__td_name">
        {{ columnNames[quarter] ? columnNames[quarter] : quarter }}
      </div>

      <div class="sector-table__td">
        {{ realValue }}
      </div>

      <div class="sector-table__td">
        {{ predictedValue }}
      </div>

      <div class="sector-table__td">
        {{ loss }}
      </div>

      <div class="sector-table__td">
        {{ quarterlyMeanValue }}
      </div>
    </div>
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
