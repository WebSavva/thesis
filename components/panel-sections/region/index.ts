import { defineComponent, ref } from '#imports';

import type { RegionObservation } from '@/data';

import RussianMap from './components/map/index.vue';
import RegionsTable from './components/table/index.vue';
import RegionCard from './components/card/index.vue'

export default defineComponent({
  name: 'RegionSection',

  components: {
    RussianMap,
    RegionsTable,
    RegionCard,
  },

  setup() {
    const activeRegion = ref<RegionObservation | null>(null);

    return {
      activeRegion,
    };
  },
});
