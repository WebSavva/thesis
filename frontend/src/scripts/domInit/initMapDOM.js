export const createMapWrapper = () => {
  const mapWrapper = document.createElement("div");
  mapWrapper.id = "regions-map";
  return mapWrapper;
};

export const createRegionTable = () => {
  const regionTable = document.createElement("section");
  regionTable.classList.add("regions-table");
  regionTable.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="tr thead">
      <div class="td">Субъект РФ<i class="fas fa-sort regions-map-filter" data-column="name" data-sort-state="disabled" data-type-sort="alpha" title="Сортировать"></i></div>
      <div class="td">Средняя зарплата, тыс.руб<i class="fas fa-sort regions-map-filter" data-column="salary" data-sort-state="disabled" data-type-sort="numeric" title="Сортировать"></i></div>
      <div class="td">Численность занятых, тыс.<i class="fas fa-sort regions-map-filter" data-column="employed" data-sort-state="disabled" data-type-sort="numeric" title="Сортировать"></i></div>
      <div class="td">Суммарные потери, млрд.руб<i class="fas fa-sort regions-map-filter" data-column="lockdownCost" data-sort-state="disabled" data-type-sort="numeric" title="Сортировать"></i></div>
    </div>
    <div class="tbody"></div>`
  );
  return {
    rootElement: regionTable,
    thead: regionTable.querySelector(".thead"),
    tbody: regionTable.querySelector(".tbody"),
  };
};

export const createRegionShareCard = () => {
  const shareCard = document.createElement("section");
  shareCard.classList.add("regions-card");
  shareCard.insertAdjacentHTML(
    "afterbegin",
    `<div class="regions-card-header">
    <div class="regions-card-icon-holder">
      <i class="fas fa-chart-bar regions-card-icon"></i>
    </div>
    <div class="card-share-regional">
      <span class="card-share-title">Доля региона в общих затратах</span>
      <span class="card-share-wrapper"><span class="card-share-value">0</span><span class="regions-card-percent">&percnt;</span></span>
    </div>
  </div>
  <div class="regions-card-footer">
      <i class="fas fa-exclamation regions-card-note"></i>
      Суммарные потери составили 2% от ВВП 2019 года
  </div>`
  );
  return {
    rootElement: shareCard,
    shareDisplay: shareCard.querySelector(".card-share-value"),
  };
};

export const createTooltip = () => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.insertAdjacentHTML(
    "afterbegin",
    `<div class="tooltip">
        <div class="tooltip-row-name">
          <img src="" class="tooltip-flag">
      <span class="tooltip-name"></span>
        </div> 
        <div class="tooltip-row-indicator">
          Средняя зарплата : <span> <span class="tooltip-salary"></span> тыс. &#8381</span>
        </div>
        <div class="tooltip-row-indicator">
          Количество занятых: <span>
          <span class="tooltip-employed"></span> тыс. человек</span>
        </div>
      <div class="tooltip-row-indicator">
          Суммарные потери: <span>
        <span class="tooltip-losses"></span>
         млрд. &#8381</span>
        </div>
      </div>`
  );

  return {
    rootElement: tooltip,
    image: tooltip.querySelector(".tooltip-flag"),
    name: tooltip.querySelector(".tooltip-name"),
    salaryHolder: tooltip.querySelector(".tooltip-salary"),
    employedHolder: tooltip.querySelector(".tooltip-employed"),
    lossesHolder: tooltip.querySelector(".tooltip-losses"),
  };
};
