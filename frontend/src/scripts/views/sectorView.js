import { domElements } from "../base";
import {
  roundNumber,
  detectMobileDevice,
} from "../customPackages/helperFunctions";
import {
  Chart,
  LineElement,
  LinearScale,
  Legend,
  Title,
  CategoryScale,
  LineController,
  PointElement,
  Tooltip,
} from "chart.js";

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

//helper functions
const getFormattedDates = (dates) =>
  dates.map((date) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-Q${Math.ceil(
      (dateObj.getMonth() + 1) / 3
    )}`;
  });

export const initializeSectorList = (sectorNames) => {
  sectorNames.forEach((name, i) =>
    domElements.sectorPage.sectorList.itemsHolder.insertAdjacentHTML(
      "beforeend",
      `<div class="sector-item ${i === 0 ? "selected-item" : ""}">${name}</div>`
    )
  );
};

export const generateSectorChart = ({ dataChart: sectorData }) => {
  const formattedDates = getFormattedDates(sectorData.dates);
  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Реальный валовый продукт",
        data: sectorData.realValues,
        borderColor: "#fd4747",
        backgroundColor: "#ff9a9a",
      },
      {
        label: "Прогноз",
        data: sectorData.predictedValues,
        borderColor: "#28A745",
        backgroundColor: "#80c590",
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        point: {
          hoverRadius: 10,
          radius: detectMobileDevice() ? 0 : 2,
        },
        line: {
          tension: 0.15, // disables bezier curves
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          ticks: {
            callback: function (val, index) {
              return index % 2 === 0 ? this.getLabelForValue(val) : "";
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Млрд.рублей",
            font: {
              family: "Roboto",
              size: 15,
            },
          },
        },
      },
    },
  };
  domElements.sectorPage.chartWrapper.chart = new Chart(
    domElements.sectorPage.chartWrapper.chartCanvas,
    config
  );
};

export const renderSectorPage = () => {
  domElements.mainContent.dataset.currentPage = "sector";
  domElements.header.headerText.textContent =
    "Отраслевой анализ потерь экономики РФ";
  const sectorPageContent = [
    domElements.sectorPage.sectorList.rootElement,
    domElements.sectorPage.chartWrapper.rootElement,
    domElements.sectorPage.sectorTable.rootElement,
    domElements.sectorPage.reportCard.rootElement,
  ];
  domElements.mainContent.append(...sectorPageContent);
};

export const updateSectorTable = (tbody) => {
  const tableRows = Array.from(domElements.sectorPage.sectorTable.tableRows);
  tableRows.forEach((row, rowIndex) => {
    Array.prototype.slice
      .call(row.children, 1)
      .forEach(
        (td, cellIndex) => (td.textContent = tbody[rowIndex][cellIndex])
      );
  });
};

export const updateSectorReportCard = ({ prevYearShare, totalLosses }) => {
  if (totalLosses < 0) {
    domElements.sectorPage.reportCard.rootElement.dataset.growthType = "loss";
    domElements.sectorPage.reportCard.typeLossesDisplay.textContent = "потерь";
  } else {
    domElements.sectorPage.reportCard.rootElement.dataset.growthType = "income";
    domElements.sectorPage.reportCard.typeLossesDisplay.textContent = "доходов";
  }
  domElements.sectorPage.reportCard.absLossesDisplay.textContent = roundNumber(
    totalLosses,
    0
  );
  domElements.sectorPage.reportCard.shareLossesDisplay.textContent =
    roundNumber(prevYearShare, 2);
};

export const updateSectorChart = ({ dataChart }) => {
  console.log(dataChart);
  console.log(domElements.sectorPage.chartWrapper.chart.data.datasets[0]);
  domElements.sectorPage.chartWrapper.chart.data.datasets[0].data =
    dataChart.realValues;
  domElements.sectorPage.chartWrapper.chart.data.datasets[1].data =
    dataChart.predictedValues;
  domElements.sectorPage.chartWrapper.chart.update();
};

export const selectSectorItem = (sectorItem) => {
  domElements.sectorPage.sectorList.itemsHolder
    .querySelector(".selected-item")
    .classList.remove("selected-item");
  sectorItem.classList.add("selected-item");
};
