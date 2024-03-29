import { defineComponent, type PropType, computed } from '#imports';

import ChartBarIcon from '~icons/fa-solid/chart-bar';
import ExclamationIcon from '~icons/fa-solid/exclamation';

import type { RegionObservation } from '@/data';
import { round } from '@/utils/round';
import { useRegions } from '@/composables/use-regions';

export default defineComponent({
  name: 'RegionCard',

  components: {
    ChartBarIcon,
    ExclamationIcon,
  },

  props: {
    activeRegion: {
      type: Object as PropType<RegionObservation | null>,
      default: null,
    },
  },

  setup(props) {
    const regions = useRegions();

    const regionCostsSum = round(
      regions.reduce((ac, { costs }) => ac + costs, 0)
    );

    const shareValue = computed(() => {
      const rawShare = props.activeRegion
        ? round((props.activeRegion.costs / regionCostsSum) * 100)
        : 0;

      return rawShare.toFixed(2);
    });

    return {
      shareValue,
    };
  },
});
