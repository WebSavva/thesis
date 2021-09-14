import "regenerator-runtime/runtime.js";
import "./../styles/panel.css";
import { domElements } from "./base";
import {
  forwardFunction,
  detectMobileDevice,
} from "./customPackages/helperFunctions";
import Map from "./models/Map";
import Thesis from "./models/Thesis";
import Sector from "./models/Sector";
import * as frameView from "./views/frameView";
import * as sectorView from "./views/sectorView";
import * as mapView from "./views/mapView";
import * as thesisView from "./views/thesisView";

const state = {};

const buildMapPage = async () => {
  try {
    //loading data from server
    state.mapData = new Map();
    await state.mapData.getRegions();

    //building table
    mapView.buildRegionTable(state.mapData.regionsObject);

    //building map
    const { mapWidth, mapHeight } = mapView.getSizeMap();
    mapView.buildMap({
      viewport: state.mapData.regionsObject.overallInfo.viewport,
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      mapWrapperId: domElements.mapPage.mapWrapper.id,
      rawRegions: state.mapData.regionsObject,
    });

    //setting up event listeners for map hover
    if (detectMobileDevice()) {
      domElements.mapPage.regionTable.tbody.addEventListener(
        "pointerdown",
        forwardFunction(
          mapView.handleTapRegionTable,
          domElements.mapPage.regionTable.rootElement,
          state.mapData.regionsObject
        )
      );
    } else {
      domElements.mapPage.mapWrapper.addEventListener(
        "mouseover",
        forwardFunction(
          mapView.handleMapHover,
          domElements.mapPage.mapWrapper,
          state.mapData.regionsObject
        )
      );
      domElements.mapPage.mapWrapper.addEventListener(
        "mouseout",
        forwardFunction(
          mapView.handleMapHover,
          domElements.mapPage.mapWrapper,
          state.mapData.regionsObject
        )
      );
      domElements.mapPage.mapWrapper.addEventListener(
        "mousemove",
        mapView.moveTooltip
      );

      //setting up event listeners for regions table hover and click
      domElements.mapPage.regionTable.rootElement.addEventListener(
        "mouseover",
        forwardFunction(
          mapView.handleRegionTableHover,
          domElements.mapPage.regionTable.rootElement,
          state.mapData.regionsObject
        )
      );
      domElements.mapPage.regionTable.rootElement.addEventListener(
        "mouseout",
        forwardFunction(
          mapView.handleRegionTableHover,
          domElements.mapPage.regionTable.rootElement,
          state.mapData.regionsObject
        )
      );
    }

    domElements.mapPage.regionTable.rootElement.addEventListener(
      "click",
      forwardFunction(
        mapView.filterRegionTable,
        domElements.mapPage.regionTable.rootElement,
        state.mapData.regionsObject
      )
    );
  } catch (error) {
    state.mapData = null;
    throw error;
  }
};
//new sector renderer
const renderChosenSector = async (regionsObject) => {
  console.log({ fromRende: regionsObject });
  const nameSector =
    domElements.sectorPage.sectorList.itemsHolder.querySelector(
      ".selected-item"
    ).textContent;
  try {
    let sectorData;
    if (!regionsObject.sectors[nameSector]) {
      frameView.insertMainLoader();
      sectorData = await regionsObject.getSectorData(nameSector);
    } else {
      sectorData = regionsObject.sectors[nameSector];
    }

    //inserting loader
    //updating dom elements at sector page
    setTimeout(frameView.removeMainLoader, 200);
    sectorView.updateSectorChart(sectorData);
    sectorView.updateSectorTable(sectorData.summaryData.tbody);
    sectorView.updateSectorReportCard(sectorData.summaryData);
  } catch (error) {
    frameView.renderRetryBoxOnLoader();
    throw error;
  }
};

const buildSectorPage = async () => {
  try {
    frameView.insertMainLoader();

    state.sectorsObject = new Sector();
    const firstSectorName = await state.sectorsObject.getSectorsObject();
    const currentSector = await state.sectorsObject.getSectorData(
      firstSectorName
    );
    sectorView.initializeSectorList(Object.keys(state.sectorsObject.sectors));
    sectorView.generateSectorChart(currentSector);

    sectorView.updateSectorTable(currentSector.summaryData.tbody);
    sectorView.updateSectorReportCard(currentSector.summaryData);

    //settinng up event listeners
    //select sector on click
    domElements.sectorPage.sectorList.itemsHolder.addEventListener(
      "click",
      ({ target }) => {
        if (target.classList.contains("sector-item"))
          sectorView.selectSectorItem(target);
      }
    );

    //render new sector on click
    domElements.sectorPage.sectorList.sectorBtn.addEventListener(
      "click",
      async () => {
        await renderChosenSector(state.sectorsObject);
      }
    );

    frameView.removeMainLoader();
  } catch (error) {
    state.sectorsObject = null;
    frameView.renderRetryBoxOnLoader();
    throw error;
  }
};

const changeSrcPdfReader = ({ target }) => {
  if (target.matches(".document-switcher-item")) {
    //clearing up the previous option
    const selectedDoc =
      domElements.thesisPage.docSwitcher.switcher.querySelector(
        ".document-item-selected"
      );
    if (selectedDoc) selectedDoc.classList.remove("document-item-selected");

    //picking the new option
    target.classList.add("document-item-selected");
    domElements.thesisPage.pdfReader.pdfIframe.src =
      domElements.thesisPage.docSwitcher.relativePath +
      target.dataset.pdfSource;
  }
};

const buildThesisPage = () => {
  state.thesisObject = {};
  state.thesisObject.options = new Thesis().documents;

  //filling document switcher with data
  thesisView.fillDocSwitcher(state.thesisObject.options);

  //setting up event listener to catch the load state
  state.thesisObject.loadObserver = new MutationObserver(() =>
    thesisView.toggleLoaderReader("insert")
  );
  state.thesisObject.loadObserver.observe(
    domElements.thesisPage.pdfReader.pdfIframe,
    {
      attributes: true,
      attributeFilter: ["src"],
    }
  );

  domElements.thesisPage.pdfReader.pdfIframe.addEventListener("load", () =>
    setTimeout(thesisView.toggleLoaderReader, 500, "remove")
  );

  //setting up source for the pdf reader
  domElements.thesisPage.pdfReader.pdfIframe.src =
    domElements.thesisPage.docSwitcher.relativePath +
    [...state.thesisObject.options][0][0];

  //setting up event listener for switcher
  domElements.thesisPage.docSwitcher.switcher.addEventListener("click", (e) =>
    changeSrcPdfReader(e)
  );
  domElements.thesisPage.docSwitcher.iframeBtn.addEventListener(
    "click",
    thesisView.openFilePdf
  );
};

const switchPage = async ({ target }) => {
  const pickedPageElement = target.closest(".menu-item");
  if (pickedPageElement) {
    const pickedPage = pickedPageElement.dataset.toPage;
    const previousPage = domElements.mainContent.dataset.currentPage;

    if (pickedPage === previousPage) {
      domElements.sidebar.rootElement.classList.remove("sidebar-expanded");
      return;
    }

    frameView.selectNavItem(previousPage, pickedPage);
    domElements.mainContent.innerHTML = "";
    if (pickedPage === "thesis") {
      if (!state.thesisObject) {
        buildThesisPage();
      }
      //rendering thesis page content
      thesisView.renderPageContent();
    } else if (pickedPage === "map") {
      mapView.renderMapPage();
    } else if (pickedPage === "sector") {
      if (!state.sectorsObject) {
        await buildSectorPage();
      }

      sectorView.renderSectorPage();
    }

    domElements.sidebar.rootElement.classList.remove("sidebar-expanded");
  }
};
const buildFrame = ({ sidebar, header, mainContent, backgroundBlurer }) => {
  //inserting sidebar and header as well as main content
  document.body.append(
    sidebar.rootElement,
    header.rootElement,
    mainContent,
    backgroundBlurer
  );

  //setting up event listener to toggle the sidebar
  sidebar.toggler.addEventListener("click", frameView.toggleSidebar);

  //setting up evet listener to change the page
  sidebar.navigation.addEventListener("click", switchPage);
};

const startApp = async () => {
  //clearing  up the whole page
  frameView.clearUpPage();

  //displaying loading state
  frameView.insertMainLoader();

  //attaching event listener to the retry button
  domElements.mainLoader.retryBtn.addEventListener("click", rerenderPage);

  //building main frame of the app
  buildFrame(domElements);

  //loading the map page;
  try {
    await buildMapPage();

    //rendering map page
    mapView.renderMapPage();

    //removing main loader
    frameView.removeMainLoader();
  } catch (error) {
    frameView.renderRetryBoxOnLoader();
  }
};
const rerenderPage = async () => {
  //if map page has not been loaded
  frameView.removeMainLoader();
  console.log({ fromReRende: state });
  if (!state.mapData) {
    startApp();
    return;
  } else if (!state.sectorsObject) {
    buildSectorPage();
    sectorView.renderSectorPage();
    return;
  } else {
    renderChosenSector(state.sectorsObject);
    return;
  }
};
startApp();

//functions for responsive layout
window.onresize = (e) => {
  const { mapWidth, mapHeight } = mapView.getSizeMap();
  domElements.mapPage.map.setAttribute("width", `${mapWidth}`);
  domElements.mapPage.map.setAttribute("height", `${mapHeight}`);
};
