import { defineComponent, type PropType } from 'vue-demi';

import SortIcon from '~icons/fa-solid/sort';
import SortUpIcon from '~icons/fa-solid/sort-amount-up';
import SortDownIcon from '~icons/fa-solid/sort-amount-down';

export type SortDir = 'desc' | 'asc';

export default defineComponent({
  name: 'RegionsTableSort',

  props: {
    activeDir: {
      type: String as PropType<SortDir>,
      default: null,
    },

    activeSort: {
      type: String,
      default: null,
    },

    sort: {
      type: String,
      required: true,
    },
  },

  emits: ['change'],

  computed: {
    isAscDir() {
      return this.activeDir === 'asc';
    },

    icon() {
      if (this.activeSort !== this.sort) return SortIcon;

      return this.isAscDir ? SortDownIcon : SortUpIcon;
    },
  },

  methods: {
    onClick() {
      const newSortDir = this.isAscDir ? 'desc' : 'asc';

      this.$emit('change', this.sort, newSortDir);
    },
  },
});
