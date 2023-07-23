let ChartPackage: typeof import('chart.js') | null = null;

const useChartJs = () => {

  async function registerChart() {
    ChartPackage = await import('chart.js');

    const {
      Chart,
      LineElement,
      LinearScale,
      Legend,
      Title,
      CategoryScale,
      LineController,
      PointElement,
      Tooltip,
    } = ChartPackage;

    Chart.register(
      LineElement,
      LinearScale,
      Legend,
      Title,
      CategoryScale,
      LineController,
      PointElement,
      Tooltip
    );

    return ChartPackage;
  }

  async function yieldChartPackage() {
    if (ChartPackage) return ChartPackage;


    return registerChart();
  }

  return {
    ChartPackage,
    yieldChartPackage,
  }
}

export default useChartJs;
