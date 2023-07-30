import { defineComponent, type PropType } from '#imports';

import { sectorNames, type SectorName } from '@/data';

import { SECTOR_LABELS, INTERFACE_LABELS } from './config';

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
    sectorItems() {
      return sectorNames.map((sectorName) => ({
        id: sectorName,
        name: SECTOR_LABELS[sectorName][this.$int.lang],
      }));
    },

    interfaceLabels() {
      return INTERFACE_LABELS[this.$int.lang];
    },
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
