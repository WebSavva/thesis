<template>
  <div
    class="sector-card"
    :class="{
      'sector-card_income': areLossesPositive,
    }"
  >
    <div class="sector-card__head">
      <div class="sector-card__head__details">
        Величина

        {{ areLossesPositive ? 'доходов' : 'потерь' }}
      </div>

      <div class="sector-card__head__label">
        Период: I-IV кварталы 2020 года
      </div>
    </div>

    <div class="sector-card__details">
      <div class="sector-card__details__item">
        <div class="sector-card__details__item__icon">
            <i class="fas fa-coins" />
        </div>

        <div class="sector-card__details__item__text">
          <div class="sector-card__details__item__text__name">
            Абсолютное значение
          </div>

          <span class="sector-card__details__item__text__value">
            <span>
              {{
                summary.losses
              }}
            </span> млрд.

            <i class="fas fa-ruble-sign" />
          </span>
        </div>
      </div>

      <div class="sector-card__details__item">
        <div class="sector-card__details__item__icon">
            <i class="fas fa-chart-pie" />
        </div>

        <div class="sector-card__details__item__text">
          <div class="sector-card__details__item__text__name">
            Доля от ВВП 2019 года
          </div>

          <span class="sector-card__details__item__text__value">
            <span>
              {{ summary.prevYearShare * 1e2 }}
            </span>

            <i class="fas fa-percent" />
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
