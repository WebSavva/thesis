import { defineComponent, type PropType } from '#imports';

import { regions, type RegionObservation } from '@/data';
import type { SortDir } from './sort-icon/index';
import SortIcon from './sort-icon/index.vue';

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
          label: 'Субъект РФ',
          sortType: 'character',
        },
        {
          id: 'salary',
          label: 'Средняя зарплата, тыс.руб',
          sortType: 'numeric',
        },
        {
          id: 'employed',
          label: 'Численность занятых, тыс.',
          sortType: 'numeric',
        },
        {
          id: 'costs',
          label: 'Суммарные потери, млрд.руб',
          sortType: 'numeric',
        },
      ] as const;
    },

    rows() {
      const { sortType } = this.columns.find(({ id }) => this.sortId === id)!;

      const { sortId, sortDir } = this;

      return [...regions].sort(({ [sortId]: aValue }, { [sortId]: bValue }) => {
        const isAsc = this.sortDir === 'asc';

        if (sortType === 'character') {
          return 1;

          return isAsc
            ? aValue.localeCompare('en-GB', bValue)
            : aValue.localeCompare('en-GB', bValue);
        } else {
          return isAsc ? aValue - bValue : bValue - aValue;
        }
      });
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

      if (!selectedRow) return;

      selectedRow.scrollIntoView({
        block: 'center',
      });
    },
  },
});
