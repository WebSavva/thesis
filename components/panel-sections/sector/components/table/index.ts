import { defineComponent, type PropType } from '#imports';

import { type SectorName, sectorSummaries } from '@/data';

export const COLUMN_NAMES = {
  quarter: 'Квартал',
  total: 'Итого',
  realValue: 'Реальные значения,млрд',
  predictedValue: 'Прогноз,млрд',
  loss: 'Совокупное превышение,млрд',
  quarterlyMeanValue: 'Средние значения до 2019 года,млрд',
  meanShare: 'Доля в среднем значении,%',
};

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
