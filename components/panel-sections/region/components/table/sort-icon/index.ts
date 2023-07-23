import { defineComponent, type PropType } from 'vue-demi';

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
      if (this.activeSort !== this.sort) return 'fa-sort';

      return `fa-sort-amount-${this.isAscDir ? 'down' : 'up'}`;
    },
  },

  methods: {
    onClick() {
      const newSortDir = this.isAscDir ? 'desc' : 'asc';

      this.$emit('change', this.sort, newSortDir);
    },
  },
});
