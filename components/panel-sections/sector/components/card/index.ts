import { defineComponent, type PropType } from '#imports';

import { type SectorName, sectorSummaries } from '@/data';

import { CARD_LABELS } from './config';

export default defineComponent({
  name: 'SectorCard',

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
