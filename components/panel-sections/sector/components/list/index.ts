import { defineComponent, type PropType } from '#imports';

import { sectorNames, type SectorName } from '@/data';

export default defineComponent({
  name: 'SectorList',

  props: {
    activeSectorId: {
      type: String as PropType<SectorName>,
      default: null,
    },
  },

  emits: ['update:activeSectorId'],

  data() {
    return {
      selectedSectorId: this.activeSectorId,
    };
  },

  computed: {
    sectorNames: () => sectorNames,
  },

  methods: {
    onSelect(sectorName: SectorName) {
      this.selectedSectorId = sectorName;
    },

    onSubmit() {
      this.$emit('update:activeSectorId', this.selectedSectorId);
    },
  },
});
