import { defineComponent, type PropType } from '#imports';

import { type RegionObservation, regionCostsSum } from '@/data';
import { round } from '@/utils/round';

export default defineComponent({
  name: 'RegionCard',

  props: {
    activeRegion: {
      type: Object as PropType<RegionObservation | null>,
      default: null,
    },
  },

  computed: {
    shareValue() {
      const rawShare = this.activeRegion
      ? round(this.activeRegion.costs / regionCostsSum * 100)
      : 0;

      return rawShare.toFixed(2);
    },
  },
});
