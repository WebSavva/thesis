<template>
  <div class="region-card">
    <div class="region-card__header">
      <div class="region-card__header__icon-holder">
        <ChartBarIcon class="region-card__header__icon-holder__icon" />
      </div>

      <div class="region-card__header__share">
        <span class="region-card__header__share__title">
          {{ $int.dict.panel.card.heading }}
        </span>

        <span class="region-card__header__share__details">
          <Transition
            name="roll"
            mode="out-in"
          >
            <span
              :key="shareValue"
              class="region-card__header__share__details__value"
            >
              {{ shareValue }}
            </span>
          </Transition>

          <span class="region-card__header__share__details__percent">
            &percnt;
          </span>
        </span>
      </div>
    </div>

    <div class="region-card__footer">
        <ExclamationIcon class="region-card__footer__icon" />

        {{ $int.dict.panel.card.hint }}
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
