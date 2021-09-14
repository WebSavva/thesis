export const createSectorList = () => {
  const listCard = document.createElement("section");
  listCard.classList.add("sector-list");
  listCard.insertAdjacentHTML(
    "afterbegin",
    `<div class="card-header">
            Отрасль экономики
        </div>
        <div class="card-body">
            <ol class="sector-items"> 
            </ol>
        <div class="card-footer">
            <button class="sector-btn">Применить</button>
        </div>
    </div>`
  );

  return {
    rootElement: listCard,
    itemsHolder: listCard.querySelector(".sector-items"),
    sectorBtn: listCard.querySelector(".sector-btn"),
  };
};

export const createChartWrapper = () => {
  const wrapper = document.createElement("section");
  wrapper.classList.add("sector-chart-wrapper");

  const chartCanvas = document.createElement("canvas");
  chartCanvas.id = "sector-chart";
  wrapper.append(chartCanvas);

  return {
    rootElement: wrapper,
    chartCanvas: chartCanvas,
  };
};

export const createSectorTable = () => {
  const sectorTable = document.createElement("section");
  sectorTable.classList.add("sector-table");
  sectorTable.insertAdjacentHTML(
    "afterbegin",
    `<div class="sector-table-tr sector-table-thead">
        <div class="sector-table-th">Квартал</div>
        <div class="sector-table-th">Реальные значения,<br>млрд.&#8381</div>
        <div class="sector-table-th">Прогноз,<br>млрд.&#8381</div>
        <div class="sector-table-th">Совокупное превышение,<br>млрд.&#8381</div>
        <div class="sector-table-th">Средние значения до 2019 года,<br>млрд.&#8381</div>
        <div class="sector-table-th">Доля в среднем значении,%</div>
    </div>`
  );
  ["Q2", "Q3", "Q4", "Итого"].forEach((rowName) =>
    sectorTable.insertAdjacentHTML(
      "beforeend",
      `<div class="sector-table-tr">
        <div class="sector-table-td sector-row-name">${rowName}</div>
        ${'<div class="sector-table-td"></div>'.repeat(5)}
    </div>`
    )
  );

  return {
    rootElement: sectorTable,
    tableRows: sectorTable.querySelectorAll(
      ".sector-table-tr:not(.sector-table-thead)"
    ),
  };
};

export const createSectorReportCard = () => {
  const reportCard = document.createElement("section");
  reportCard.classList.add("sector-card-report");

  reportCard.insertAdjacentHTML(
    "afterbegin",
    ` <div class="sector-report-head">
        <h1 class="sector-report-header">Величина <span class="report-type-losses"></span></h1>
        <h3 class="sector-report-period">Период: II-IV кварталы 2020 года</h3>
    </div>
    <div class="sector-report-details">
        <div class="sector-report-detail">
            <div class="sector-report-figure">
                <i class="fas fa-coins"></i>
            </div>

            <div class="sector-report-detail-text">
                <h4 class="sector-report-detail-name">Абсолютное значение</h4>
                <span class="sector-report-detail-value"><span class="report-total-losses"></span> млрд.<i class="fas fa-ruble-sign"></i></span>
            </div>
        </div>
        <div class="sector-report-detail">
            <div class="sector-report-figure">
                <i class="fas fa-chart-pie"></i>
            </div>
            <div class="sector-report-detail-text">
                <h4 class="sector-report-detail-name">Доля от ВВП 2019 года</h4>
                <span class="sector-report-detail-value"><span class="report-gdp-share"></span><i class="fas fa-percent"></i></span>
            </div>
        </div>
    </div>`
  );
  return {
    rootElement: reportCard,
    typeLossesDisplay: reportCard.querySelector(".report-type-losses"),
    absLossesDisplay: reportCard.querySelector(".report-total-losses"),
    shareLossesDisplay: reportCard.querySelector(".report-gdp-share"),
  };
};
