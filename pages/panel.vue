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
          {{  $int.dict.sidebar.mainMenuTitle  }}
        </div>

        <div
          class="panel__sidebar__head__toggler"
          @click="toggleSidebar"
        >
          <BarsIcon class="panel__sidebar__head__toggler__icon" />
        </div>
      </div>

      <nav class="panel__sidebar__nav">
        <ul class="panel__sidebar__nav__menu">
          <li
            v-for="{ icon, label, path, external } in MENU_ITEMS"
            :key="path"
          >
            <NuxtLink
              v-if="!external"
              :href="path"
              class="panel__sidebar__nav__menu__item"
              exact-active-class="panel__sidebar__nav__menu__item_selected"
            >
              <Component
                :is="icon"
                class="panel__sidebar__nav__menu__item__icon"
              />

              <span class="panel__sidebar__nav__menu__item__text">
                {{ label }}
              </span>
            </NuxtLink>

            <a
              v-else
              :href="path"
              class="panel__sidebar__nav__menu__item"
            >
              <Component
                :is="icon"
                class="panel__sidebar__nav__menu__item__icon"
              />

              <span class="panel__sidebar__nav__menu__item__text">
                {{ label }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <Transition name="fade">
      <div
        v-show="isSidebarOpened"
        class="panel__blur"
        @click="closeSidebar"
      />
    </Transition>

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

        <VirusIcon class="panel__main__head__icon" />
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
import { ref, useRoute, computed, watch, usePageType } from '#imports';
import { NuxtLink } from '#components';

import BarsIcon from '~icons/fa-solid/bars';
import VirusIcon from '~icons/fa-solid/virus';
import ShieldVirusIcon from '~icons/fa-solid/shield-virus';
import ChartLineIcon from '~icons/fa-solid/chart-line';
import BookOpenIcon from '~icons/fa-solid/book-open';
import CharlkboardIcon from '~icons/fa-solid/chalkboard';

import { useInternalization } from '@/composables';

import RegionSection from '@/components/panel-sections/region/index.vue';
import SectorSection from '@/components/panel-sections/sector/index.vue';

const $route = useRoute();
const $int = useInternalization();

usePageType('panel');

const MENU_ITEMS = [
  {
    icon: ShieldVirusIcon,
    label: $int.dict.sidebar.mapLinkName,
    id: 'region',
    path: $int.hrefWithLang('/panel', false),
    heading: $int.dict.heading.map,
  },
  {
    icon: ChartLineIcon,
    label: $int.dict.sidebar.sectorLinkName,
    id: 'sector',
    path: $int.hrefWithLang('/panel/sector', false),
    heading: $int.dict.heading.sector,
  },
  {
    icon: BookOpenIcon,
    label: $int.dict.sidebar.thesisLinkName,
    id: 'thesis',
    path: $int.hrefWithLang('/panel/thesis', false),
    heading: $int.dict.heading.thesis,
  },
  {
    icon: CharlkboardIcon,
    label: $int.dict.sidebar.presentationLinkName,
    path: $int.hrefWithLang('/presentation.html'),
    external: true,
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
