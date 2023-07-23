<template>
  <div class="regions-table">
    <div class="regions-table__head">
      <div
        v-for="{ id, label } in columns"
        :key="id"
        class="regions-table__row__cell"
      >
        {{ label }}

        <SortIcon
          :active-sort="sortId"
          :active-dir="sortDir"
          :sort="id"
          class="regions-table__head__sort"
          @change="onSort"
        />
      </div>
    </div>

    <div
      ref="tableBody"
      class="regions-table__body"
    >
      <div
        v-for="row in rows"
        :key="row.id"
        :data-region-id="row.id"
        class="regions-table__row"
        :class="{
          'regions-table__row_selected': activeRegion && activeRegion.id === row.id,
        }"
        @click="onSelect(row)"
      >
        <div class="regions-table__row__cell">
          {{ row.name }}
        </div>

        <div class="regions-table__row__cell">
          {{ row.salary }}
        </div>

        <div class="regions-table__row__cell">
          {{ row.employed }}
        </div>

        <div class="regions-table__row__cell">
          {{ row.costs }}
        </div>
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
