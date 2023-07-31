import { defineComponent, type PropType } from '#imports';

import CoinsIcon from '~icons/fa-solid/coins';
import RubleSignIcon from '~icons/fa-solid/ruble-sign';
import PercentIcon from '~icons/fa-solid/percent';
import ChartPieIcon from '~icons/fa-solid/chart-pie';

import { type SectorName, sectorSummaries } from '@/data';

import { CARD_LABELS } from './config';

export default defineComponent({
  name: 'SectorCard',

  components: {
    CoinsIcon,
    ChartPieIcon,
    RubleSignIcon,
    PercentIcon,
  },

  props: {
    activeSectorId: {
      type: String as PropType<SectorName>,
      default: null,
    },
  },

  computed: {
    labels() {
      return CARD_LABELS[this.$int.lang];
    },

    summary() {
      const {
        totalSummaryByQuarter: { loss: losses },
        prevYearShare,
      } = sectorSummaries[this.activeSectorId];

      return {
        prevYearShare,
        losses,
      };
    },

    areLossesPositive() {
      return this.summary.losses > 0;
    },
  },
});
