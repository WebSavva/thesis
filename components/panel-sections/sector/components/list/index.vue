<template>
  <form
    class="sector-list"
    @submit.prevent="onSubmit"
  >
    <div class="sector-list__head">
        {{  interfaceLabels.heading  }}
    </div>

    <div class="sector-list__body">
        <ul class="sector-list__body__items">
          <li
            v-for="{ id, name } in sectorItems"
            :key="id"
            class="sector-list__body__items__item"
            :class="{
              'sector-list__body__items__item_selected': selectedSectorId === id,
            }"
            @click="onSelect(id)"
          >
            {{ name }}
          </li>
        </ul>
    </div>

    <div class="sector-list__footer">
      <button
        type="submit"
        class="sector-list__footer__btn"
      >
        {{  interfaceLabels.apply  }}
      </button>
    </div>
  </form>
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
