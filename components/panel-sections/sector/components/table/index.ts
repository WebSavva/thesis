import { defineComponent, type PropType } from '#imports';

import { type SectorName, sectorSummaries } from '@/data';

import { COLUMN_NAMES } from './config';

export default defineComponent({
  name: 'SectorList',

  props: {
    activeSectorId: {
      type: String as PropType<SectorName>,
      default: null,
    },
  },

  computed: {
    columnNames: () => COLUMN_NAMES,

    rows() {
      const { summaryByQuarters, totalSummaryByQuarter } =
        sectorSummaries[this.activeSectorId];

      return [...summaryByQuarters, totalSummaryByQuarter];
    },
  },
});
