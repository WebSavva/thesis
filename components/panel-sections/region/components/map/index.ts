import { defineComponent, type PropType } from '#imports';

import { regions, type RegionObservation } from '@/data';
import { round } from '@/utils/round';
import { isDefined } from '@/utils/is-defined';

const MAIN_CONTENT_ID = 'main-content';

export default defineComponent({
  name: 'RussiaMap',

  props: {
    activeRegion: {
      type: Object as PropType<RegionObservation | null>,
      default: null,
    },
  },

  emits: ['update:activeRegion'],

  data() {
    return {
      width: null as number | null,
      height: null as number | null,
      tooltipX: null as number | null,
      tooltipY: null as number | null,
      hoveredRegion: null as RegionObservation | null,
    };
  },

  computed: {
    regions: () => regions,

    sizeProvider() {
      const { tooltipX, tooltipY, height, width } = this;
      return {
        // '--width': this.toPixels(width),
        // '--height': this.toPixels(height),
        '--tooltip-x': this.toPixels(tooltipX! + 20),
        '--tooltip-y': this.toPixels(tooltipY),
      };
    },

    isTooltipShown() {
      const { hoveredRegion, tooltipX, tooltipY } = this;

      return [hoveredRegion, tooltipX, tooltipY].every((val) => isDefined(val));
    },
  },

  methods: {
    getMainContent() {
      return document.getElementById(MAIN_CONTENT_ID);
    },

    toPixels(value: number | null) {
      return value ? `${round(value)}px` : null;
    },

    calculateMapSize() {
      const mapWrapper = this.$el as HTMLDivElement | null;

      if (!mapWrapper) return;

      const mainContent = this.getMainContent();

      if (!mainContent) return;

      if (window.innerWidth <= 800) {
        this.width = mainContent.offsetWidth * 0.9;
        this.height = this.width / 1.77;
      } else {
        this.width = mainContent.offsetWidth * 0.6;
        this.height = mainContent.offsetHeight * 0.7;
        let ratio = +(this.width / this.height).toFixed(2);

        //adjusting to the appropriate ratio
        if (ratio > 1.8) {
          this.height = this.width / 1.8;
        }
      }
    },

    resetTooltipPosition() {
      this.tooltipX = null;
      this.tooltipY = null;
    },

    onRegionEnter(region: RegionObservation) {
      this.hoveredRegion = region;

      this.$emit('update:activeRegion', region);
    },

    onRegionLeave({ relatedTarget }: MouseEvent) {
      if (
        relatedTarget instanceof Element &&
        relatedTarget.hasAttribute('data-region-id')
      )
        return;

      this.hoveredRegion = null;

      this.$emit('update:activeRegion', null);
    },

    onMouseMove({ clientX: x, clientY: y, target }: MouseEvent) {
      const mainContent = this.getMainContent();

      const tooltip = this.$refs.tooltip as HTMLDivElement | null;

      if (!mainContent || !tooltip) return;

      this.tooltipX = x;
      if (y + tooltip.offsetHeight >= mainContent.offsetHeight) {
        this.tooltipY = y - tooltip.offsetHeight;
      } else {
        this.tooltipY = y;
      }
    },
  },

  async mounted() {
    this.calculateMapSize();

    window.addEventListener('resize', this.calculateMapSize);
  },

  unmounted() {
    window.removeEventListener('resize', this.calculateMapSize);
  },

  watch: {
    activeRegion(newActiveRegion) {
      if (!newActiveRegion) this.resetTooltipPosition();
    },
  },
});
