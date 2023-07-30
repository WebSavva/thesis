import { defineComponent, ref } from '#imports';

import { sectorNames } from '@/data';
import SectorList from './components/list/index.vue';
import SectorChart from './components/chart/index.vue';
import SectorTable from './components/table/index.vue';
import SectorCard from './components/card/index.vue';

export default defineComponent({
  name: 'SectorSection',

  components: {
    SectorList,
    SectorChart,
    SectorTable,
    SectorCard,
  },

  setup() {
    const activeSectorId = ref(sectorNames[0]);

    return {
      activeSectorId,
    };
  },
});
