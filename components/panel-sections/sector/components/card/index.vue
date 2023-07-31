<template>
  <div
    class="sector-card"
    :class="{
      'sector-card_income': areLossesPositive,
    }"
  >
    <div class="sector-card__head">
      <div class="sector-card__head__details">
        {{  labels.title  }}

        {{ areLossesPositive ? labels.profitHint : labels.lossHint }}
      </div>

      <div class="sector-card__head__label">
        {{ labels.period }}
      </div>
    </div>

    <div class="sector-card__details">
      <div class="sector-card__details__item">
        <div class="sector-card__details__item__icon">
            <CoinsIcon />
        </div>

        <div class="sector-card__details__item__text">
          <div class="sector-card__details__item__text__name">
            {{ labels.absolute }}
          </div>

          <span class="sector-card__details__item__text__value">
            <span>
              {{
                summary.losses
              }}
            </span>

            <span>
              {{  $int.dict.measurement.billion }}
            </span>

            <RubleSignIcon />
          </span>
        </div>
      </div>

      <div class="sector-card__details__item">
        <div class="sector-card__details__item__icon">
            <ChartPieIcon />
        </div>

        <div class="sector-card__details__item__text">
          <div class="sector-card__details__item__text__name">
            {{  labels.share }}
          </div>

          <span class="sector-card__details__item__text__value">
            <span>
              {{ summary.prevYearShare * 1e2 }}
            </span>

            <PercentIcon />
          </span>
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
