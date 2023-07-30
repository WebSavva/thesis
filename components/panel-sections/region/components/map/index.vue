<template>
  <div
    ref="mapWrapper"
    class="map-wrapper"
    :style="sizeProvider"
  >
    <svg
      viewBox="-65 0 1134 620"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      class="map"
      preserveAspectRatio="none"
      @mousemove="onMouseMove"
    >
      <template
        v-for="region in regions"
        :key="region.id"
      >
        <path
          v-for="(d, index) in region.paths"
          :key="index"
          :data-region-id="region.id"
          :fill="region.color"
          :d="d"
          class="map__path"
          :class="{
            'map__path_active': activeRegion && activeRegion.id === region.id,
          }"
          @mouseenter="onRegionEnter(region)"
          @mouseleave="onRegionLeave"
        />
      </template>
    </svg>

    <div
      v-show="isTooltipShown"
      ref="tooltip"
      class="map__tooltip"
    >
      <template v-if="hoveredRegion">
        <div class="map__tooltip__content">
          <div class="map__tooltip__row-name">
            <img
              :src="`/regions/${hoveredRegion.img}`"
              class="map__tooltip__flag"
            >

            <span class="map__tooltip__name">
              {{ hoveredRegion.name }}
            </span>
          </div>

          <div class="map__tooltip__row-indicator">
            {{ $int.dict.panel.map.salary }}:

            <span>
              <span class="map__tooltip__salary">
                {{ hoveredRegion.salary }}
              </span> {{ $int.dict.measurement.thousand }} &#8381;
            </span>
          </div>

          <div class="map__tooltip__row-indicator">
            {{ $int.dict.panel.map.employed }}:

            <span>
              <span class="map__tooltip__employed">
                {{ hoveredRegion.employed }}
              </span> {{ $int.dict.measurement.thousand }}
            </span>
          </div>

          <div class="map__tooltip__row-indicator">
            {{ $int.dict.panel.map.costs }}:

            <span>
              <span class="map__tooltip__losses">
                {{ hoveredRegion.costs }}
              </span>
              {{ $int.dict.measurement.billion }} &#8381;
            </span>
          </div>
        </div>
      </template>
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
