import {
  defineComponent,
  type PropType,
  ref,
  computed,
  onMounted,
  shallowRef,
  watch,
} from 'vue-demi';

import { type SectorName, gpdSectors, sectorNames } from '@/data';
import useChartJs from '@/composables/use-chart-js';

export default defineComponent({
  name: 'SectorChart',

  props: {
    activeSectorId: {
      type: String as PropType<SectorName>,
      default: null,
    },
  },

  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);

    const sectorTimeSerie = computed(() => {
      // preparing chart data
      const sectorTimeSerie = gpdSectors[props.activeSectorId].slice(4);

      const labels = sectorTimeSerie.map(({ date }) => {
        return `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
      });

      const realValues = sectorTimeSerie.map(({ realValue }) => realValue);

      const predictedValues = sectorTimeSerie.map(
        ({ predictedValue }) => predictedValue
      );

      return {
        labels,
        realValues,
        predictedValues,
      };
    });

    const { yieldChartPackage } = useChartJs();

    const chart = shallowRef<typeof import('chart.js').Chart | null>(null);

    onMounted(async () => {
      if (!canvasRef.value) return;

      const { Chart } = await yieldChartPackage();

      const { labels, predictedValues, realValues } = sectorTimeSerie.value;

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Реальный валовый продукт',
            data: realValues,
            borderColor: '#fd4747',
            backgroundColor: '#ff9a9a',
          },
          {
            label: 'Прогноз',
            data: predictedValues,
            borderColor: '#28A745',
            backgroundColor: '#80c590',
            fontSize: 25,
          },
        ],
      };

      const config = {
        type: 'line',
        data: chartData,
        options: {
          elements: {
            point: {
              hoverRadius: 10,
              radius: 2,
            },
            line: {
              tension: 0.15, // disables bezier curves
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          font: {
            family: 'Open Sans',
            size: 25,
          },
          scales: {
            x: {
              ticks: {
                callback(val, index) {
                  return index % 2 === 0 ? this.getLabelForValue(val) : '';
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Млрд.рублей',
                font: {
                  family: 'Open Sans',
                  size: 25,
                },
              },
            },
          },
        },
      };

      chart.value = new Chart(canvasRef.value!, config);
    });

    watch(
      () => sectorTimeSerie.value,
      ({ labels, predictedValues, realValues }) => {
        if (!chart.value) return;

        chart.value.data.datasets[0].data = realValues;
        chart.value.data.datasets[1].data = predictedValues;
        chart.value.update();
      }
    );

    return {
      canvasRef,
    };
  },
});
