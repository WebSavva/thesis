import { defineComponent, type PropType } from '#imports';

import type { RegionObservation } from '@/data';
import { xlg } from '@/assets/styles/breakpoints.json';
import { useRegions } from '@/composables/use-regions';

import type { SortDir } from './sort-icon/index';
import SortIcon from './sort-icon/index.vue';

const LOCALE_COMPARE_MAP = {
  ru: 'ru-RU',
  en: 'en-GB',
};

export default defineComponent({
  name: 'RegionsTable',

  components: {
    SortIcon,
  },

  props: {
    activeRegion: {
      type: Object as PropType<RegionObservation | null>,
      default: null,
    },
  },

  emits: ['update:activeRegion'],

  setup() {
    return {
      regions: useRegions(),
    };
  },

  data() {
    return {
      sortDir: 'asc' as SortDir,
      sortId: 'name' as string | null,
    };
  },

  computed: {
    columns() {
      return [
        {
          id: 'name',
          label: {
            en: 'Region',
            ru: 'Субъект РФ',
          },
          sortType: 'character',
        },
        {
          id: 'salary',
          label: {
            en: 'Average salary, th. ₽',
            ru: 'Средняя зарплата, тыс. ₽',
          },
          sortType: 'numeric',
        },
        {
          id: 'employed',
          label: {
            en: 'Number of employed, th.',
            ru: 'Численность занятых, тыс.',
          },
          sortType: 'numeric',
        },
        {
          id: 'costs',
          label: {
            en: 'Total costs, bn. ₽',
            ru: 'Суммарные потери, млрд. ₽',
          },
          sortType: 'numeric',
        },
      ].map((item) => {
        return {
          ...item,
          label: item.label[this.$int.lang],
        };
      });
    },

    localeCompareParam() {
      return LOCALE_COMPARE_MAP[this.$int.lang];
    },

    rows() {
      const { sortType } = this.columns.find(({ id }) => this.sortId === id)!;

      const { sortDir } = this;

      const sortedRegions = [...this.regions].sort((prevRegion, nextRegion) => {
        const isAsc = sortDir === 'asc';

        if (sortType === 'character') {
          const sortName = this.sortId as 'name';

          const aValue = prevRegion[sortName];
          const bValue = nextRegion[sortName];

          return isAsc
            ? aValue.localeCompare(bValue, this.localeCompareParam)
            : bValue.localeCompare(aValue, this.localeCompareParam);
        } else {
          const sortName = this.sortId as keyof RegionObservation;

          const aValue = prevRegion[sortName] as number;
          const bValue = nextRegion[sortName] as number;

          return isAsc ? aValue - bValue : bValue - aValue;
        }
      });

      return sortedRegions;
    },
  },

  methods: {
    onSelect(region: RegionObservation) {
      this.$emit(
        'update:activeRegion',
        region.id === this.activeRegion?.id ? null : region
      );
    },

    onSort(id: string, dir: SortDir) {
      this.sortId = id;
      this.sortDir = dir;
    },
  },

  watch: {
    activeRegion(newActiveRegion) {
      const tableBody = this.$refs.tableBody as HTMLElement | null;

      if (!tableBody || !newActiveRegion) return;

      const { id } = newActiveRegion;

      const selectedRow = tableBody.querySelector(`[data-region-id="${id}"]`);

      if (!selectedRow || window.innerWidth <= xlg) return;

      selectedRow.scrollIntoView({
        block: 'center',
      });
    },
  },
});
