import { domElements } from "../base";
import RussianMap from "../customPackages/RussianMap";

// helper function to transform data
const getRegionsArray = (rawRegions) => {
  const regionsArray = [];
  for (let regionId in rawRegions) {
    if (regionId !== "overallInfo") {
      regionsArray.push(rawRegions[regionId]);
    }
  }

  return regionsArray;
};

//helper functions that do some subtle changes in the DOM
const getRegionRowMarkup = ({
  ident,
  name,
  salary,
  employed,
  lockdownCost,
}) => `<div class="tr" id="${ident}">
    <div class="td">${name}</div>
    <div class="td">${salary}</div>
    <div class="td">${employed}</div>
    <div class="td">${lockdownCost}</div>
    </div>`;

export const getSizeMap = () => {
  let mapWidth, mapHeight;
  if (domElements.mapPage.map) {
    if (window.innerWidth <= 800) {
      mapWidth = domElements.mainContent.offsetWidth * 0.9;
      mapHeight = mapWidth / 1.77;
    } else {
      mapWidth = domElements.mainContent.offsetWidth * 0.6;
      mapHeight = domElements.mainContent.offsetHeight * 0.7;
      let ratio = +(mapWidth / mapHeight).toFixed(2);

      //adjusting to the appropriate ratio
      if (ratio > 1.8) {
        mapHeight = mapWidth / 1.8;
      }
    }
  } else {
    mapWidth = domElements.mainContent.offsetWidth * 0.6;
    mapHeight = mapWidth / 1.77;
  }
  return {
    mapWidth,
    mapHeight,
  };
};

const updateRegionShare = (shareValue = 0) =>
  (domElements.mapPage.regionCard.shareDisplay.textContent = (
    shareValue * 100
  ).toFixed(2));

const changeTooltipContent = ({
  name,
  imageURL,
  salary,
  employed,
  lockdownCost,
}) => {
  domElements.mapPage.tooltip.name.textContent = name;
  domElements.mapPage.tooltip.image.src = imageURL;
  domElements.mapPage.tooltip.salaryHolder.textContent = salary;
  domElements.mapPage.tooltip.employedHolder.textContent = employed;
  domElements.mapPage.tooltip.lossesHolder.textContent = lockdownCost;
};

const fillRegionWithColor = (
  { paths, polygons },
  color,
  strokeSize = 1,
  strokeColor = "#fff"
) => {
  Array.prototype.forEach.call(
    paths,
    (path) =>
      path.node.setAttribute("fill", color) ||
      (path.node.style.strokeWidth = `${strokeSize}px`) ||
      path.node.setAttribute("stroke", strokeColor)
  );
  Array.prototype.forEach.call(
    polygons,
    (path) =>
      path.node.setAttribute("fill", color) ||
      (path.node.style.strokeWidth = `${strokeSize}px`) ||
      path.node.setAttribute("stroke", strokeColor)
  );
};

const reorderRegionsInTable = (type, order, columnName, regions) => {
  //helper functions
  const compare = (a, b) => {
    if (order === "down") {
      [b, a] = [a, b];
    }

    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  //sorting the regions in the table based on the given column value and order
  const regionRows = Array.from(document.querySelectorAll(".tr[id]"));
  regionRows.sort((leftRegion, rightRegion) =>
    compare(
      regions[leftRegion.id][columnName],
      regions[rightRegion.id][columnName]
    )
  );
  domElements.mapPage.regionTable.tbody.innerHTML = "";
  domElements.mapPage.regionTable.tbody.append(...regionRows);
};

// exported functions to render the main elements of page with map
export const buildRegionTable = (rawRegions) => {
  //filling table with data if empty
  if (!domElements.mapPage.regionTable.tbody.innerHTML) {
    //converting into array
    const regions = getRegionsArray(rawRegions);
    domElements.mapPage.regionTable.tbody.innerHTML = "";
    regions.forEach((region) =>
      domElements.mapPage.regionTable.tbody.insertAdjacentHTML(
        "afterbegin",
        getRegionRowMarkup(region)
      )
    );
  }
};

export const buildMap = ({
  rawRegions,
  viewport,
  mapWidth,
  mapHeight,
  mapWrapperId,
}) => {
  //initializing map if not existed
  domElements.mapPage.mapWrapper.style.display = "none";
  //making the wrapper visible so that the library Raphael would be able to find that and insert map
  domElements.mainContent.append(domElements.mapPage.mapWrapper);
  let map;
  const regionsArray = getRegionsArray(rawRegions);
  map = new RussianMap(
    {
      viewPort: viewport,
      mapId: mapWrapperId,
      width: mapWidth,
      height: mapHeight,
    },
    regionsArray
  );
  //extracting the map itself
  domElements.mapPage.map = domElements.mapPage.mapWrapper.querySelector("svg");
  //removing aspect ratio property
  domElements.mapPage.map.setAttribute("preserveAspectRatio", "none");

  //removing mapWrapper from page
  domElements.mapPage.mapWrapper.remove();

  // domElements.mapPage.mapWrapper.style.display = '';
};

export const renderShareCard = () => {
  domElements.mainContent.append(domElements.mapPage.regionCard.rootElement);
};

export const moveTooltip = function ({ clientX: x, clientY: y }) {
  domElements.mapPage.tooltip.rootElement.style.left = `${x + 20}px`;
  if (
    y + domElements.mapPage.tooltip.rootElement.offsetHeight >=
    domElements.mainContent.offsetHeight
  ) {
    domElements.mapPage.tooltip.rootElement.style.top = `${
      y - domElements.mapPage.tooltip.rootElement.offsetHeight
    }px`;
  } else {
    domElements.mapPage.tooltip.rootElement.style.top = `${y}px`;
  }
};

export const handleMapHover = function (event, regionsObject) {
  const target = event.target;
  const targetedRegionId = target.matches("[data-region-id]")
    ? target.dataset.regionId
    : "";

  if (targetedRegionId) {
    const currentRegion = regionsObject[targetedRegionId];
    const currentTableRow = document.getElementById(targetedRegionId);
    if (event.type == "mouseout") {
      domElements.mapPage.tooltip.rootElement.remove();
      currentTableRow.classList.remove("trow-selected");
      updateRegionShare();
    } else {
      document.body.insertAdjacentElement(
        "afterbegin",
        domElements.mapPage.tooltip.rootElement
      );
      currentTableRow.scrollIntoView({ block: "center" });
      currentTableRow.classList.add("trow-selected");
      updateRegionShare(
        currentRegion.lockdownCost / regionsObject.overallInfo.sumLosses
      );
    }
    changeTooltipContent(currentRegion);
    moveTooltip(event);

    fillRegionWithColor(
      currentRegion,
      event.type == "mouseout" ? currentRegion.colorMap : "rgb(133, 9, 9)"
    );
  }
};

export const handleRegionTableHover = ({ target, type }, regionsObject) => {
  target = target.closest(".tr[id]");
  if (target) {
    const currentRegion = regionsObject[target.id];
    if (type == "mouseover") {
      fillRegionWithColor(currentRegion, "#6f7070", 4, "black");
      target.classList.add("trow-selected");
      updateRegionShare(
        currentRegion.lockdownCost / regionsObject.overallInfo.sumLosses
      );
    } else {
      updateRegionShare();
      fillRegionWithColor(currentRegion, currentRegion.colorMap);
      target.classList.remove("trow-selected");
    }
  }
};

export const handleTapRegionTable = ({ target }, regionsObject) => {
  target = target.closest(".tr[id]");
  if (target) {
    if (!target.classList.contains("trow-selected")) {
      const currentRegion = regionsObject[target.id];
      const previousRegionElement =
        domElements.mapPage.regionTable.tbody.querySelector(".trow-selected");

      if (previousRegionElement) {
        fillRegionWithColor(
          regionsObject[previousRegionElement.id],
          currentRegion.colorMap
        );
        previousRegionElement.classList.remove("trow-selected");
      }

      fillRegionWithColor(currentRegion, "#6f7070", 4, "black");
      target.classList.add("trow-selected");
      updateRegionShare(
        currentRegion.lockdownCost / regionsObject.overallInfo.sumLosses
      );
    }
  }
};

export const filterRegionTable = ({ target }, regionsObject) => {
  const getSortObject = (sortElement) => {
    return {
      element: sortElement,
      type: sortElement.dataset.typeSort,
      order: sortElement.dataset.sortOrder,
      colName: sortElement.dataset.column,
    };
  };

  if (target.matches(".regions-map-filter")) {
    let newSortObject = getSortObject(target);
    let activeSortObject;
    let activeSortElement =
      domElements.mapPage.regionTable.rootElement.querySelector(
        '[data-sort-state="active"]'
      );
    if (activeSortElement) {
      activeSortObject = getSortObject(activeSortElement);
    }

    //when active sort filet has been pressed
    if (JSON.stringify(activeSortObject) === JSON.stringify(newSortObject)) {
      //changing the order of the current filter

      activeSortObject.element.classList.remove(
        `fa-sort-${activeSortObject.type}-${activeSortObject.order}`
      );
      activeSortObject.order = activeSortObject.order === "up" ? "down" : "up";
      activeSortObject.element.setAttribute(
        "data-sort-order",
        activeSortObject.order
      );
      activeSortObject.element.classList.add(
        `fa-sort-${activeSortObject.type}-${activeSortObject.order}`
      );
      // reorderRegionsInTable(activeSortObject.type, activeSortObject.order);
      reorderRegionsInTable(
        activeSortObject.type,
        activeSortObject.order,
        activeSortObject.colName,
        regionsObject
      );
    } else {
      //disabling the previous sort
      if (activeSortObject) {
        activeSortObject.element.classList.remove(
          `fa-sort-${activeSortObject.type}-${activeSortObject.order}`
        );
        activeSortObject.element.classList.add(`fa-sort`);
        activeSortObject.element.dataset.sortState = "disabled";
      }

      //activating new sort element
      newSortObject.element.classList.remove("fa-sort");
      newSortObject.order = "down";
      newSortObject.element.setAttribute("data-sort-order", "down");
      newSortObject.element.setAttribute("data-sort-state", "active");
      newSortObject.element.classList.add(
        `fa-sort-${newSortObject.type}-${newSortObject.order}`
      );
      reorderRegionsInTable(
        newSortObject.type,
        newSortObject.order,
        newSortObject.colName,
        regionsObject
      );
    }
    domElements.mapPage.regionTable.tbody.scrollTop = 0;
  }
};

export const renderMapPage = () => {
  domElements.mainContent.dataset.currentPage = "map";
  domElements.header.headerText.textContent =
    "Стоимость локдауна в РФ в 2020 году";
  domElements.mapPage.mapWrapper.style.display = "";
  domElements.mainContent.append(
    domElements.mapPage.mapWrapper,
    domElements.mapPage.regionTable.rootElement,
    domElements.mapPage.regionCard.rootElement
  );
};
