<template>
  <form
    class="sector-list"
    @submit.prevent="onSubmit"
  >
    <div class="sector-list__head">
        Отрасль экономики
    </div>

    <div class="sector-list__body">
        <ul class="sector-list__body__items">
          <li
            v-for="sectorName in sectorNames"
            :key="sectorName"
            class="sector-list__body__items__item"
            :class="{
              'sector-list__body__items__item_selected': selectedSectorId === sectorName,
            }"
            @click="onSelect(sectorName)"
          >
            {{ sectorName }}
          </li>
        </ul>
    </div>

    <div class="sector-list__footer">
      <button
        type="submit"
        class="sector-list__footer__btn"
      >
        Применить
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
