<template>
  <div class="panel">
    <aside
      class="panel__sidebar"
      :class="{
        'panel__sidebar_expanded': isSidebarOpened,
      }"
    >
      <div class="panel__sidebar__head">
        <div class="panel__sidebar__head__text">
          Главное меню
        </div>

        <div
          class="panel__sidebar__head__toggler"
          @click="toggleSidebar"
        >
          <i class="fas fa-bars panel__sidebar__head__toggler__icon" />
        </div>
      </div>

      <nav class="panel__sidebar__nav">
        <ul class="panel__sidebar__nav__menu">
          <li
            v-for="{ icon, label, path } in MENU_ITEMS"
            :key="path"
          >
            <NuxtLink
              :to="path"
              class="panel__sidebar__nav__menu__item"
              exact-active-class="panel__sidebar__nav__menu__item_selected"
            >
              <i
                class="fas panel__sidebar__nav__menu__item__icon"
                :class="`fa-${icon}`"
              />

              <span class="panel__sidebar__nav__menu__item__text">
                {{ label }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="panel__blur"/>

    <main class="panel__main">
      <header class="panel__main__head">
        <Transition
          name="roll"
          mode="out-in"
        >
          <h1
            :key="activeSectionItem.heading"
            class="panel__main__head__text"
          >
            {{ activeSectionItem.heading }}
          </h1>
        </Transition>

        <i class="fas fa-virus panel__main__head__icon"></i>
      </header>

      <div
        id="main-content"
        class="panel__main__content"
      >
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, useRoute, computed, watch } from '#imports';

import '~/assets/styles/panel.css';
import RegionSection from '@/components/panel-sections/region/index.vue';
import SectorSection from '@/components/panel-sections/sector/index.vue';

const $route = useRoute();

const MENU_ITEMS = [
  {
    icon: 'shield-virus',
    label: 'Стоимость локдауна',
    id: 'region',
    path: '/panel',
    heading: 'Стоимость локдауна в РФ в 2020 году',
  },
  {
    icon: 'chart-line',
    label: 'Отраслевой анализ',
    id: 'sector',
    path: '/panel/sector',
    heading: 'Отраслевой анализ потерь экономики РФ',
  },
  {
    icon: 'book-open',
    label: 'Текст ВКР',
    id: 'thesis',
    path: '/panel/thesis',
    heading: 'Материалы ВКР',
  },
  {
    icon: 'chalkboard',
    label: 'Презентация',
    path: '/presentation',
  },
];


const activeSectionItem = computed(() => {
  return MENU_ITEMS.find(({ path }) => $route.path === path)!;
});

const isSidebarOpened = ref(false);

function toggleSidebar() {
  isSidebarOpened.value = !isSidebarOpened.value;
}

function closeSidebar() {
  isSidebarOpened.value = false;
}

watch(() => $route.path, () => closeSidebar());

</script>

<style
  src="./panel/index.styl"
  lang="stylus"
  scoped
></style>
