import * as mapDOM from "./domInit/initMapDOM";
import * as sectorDOM from "./domInit/initEconSectorDOM";
import * as thesisDOM from "./domInit/initThesisDOM";
import * as frameDOM from "./domInit/initFrameDOM";

export const domElements = {
  sidebar: frameDOM.createSidebar(),
  header: frameDOM.createHeader(),
  mainContent: frameDOM.createMain(),
  backgroundBlurer: frameDOM.createBackgroundBlurer(),
  mainLoader: frameDOM.createMainLoader(),
  mapPage: {
    mapWrapper: mapDOM.createMapWrapper(),
    regionTable: mapDOM.createRegionTable(),
    regionCard: mapDOM.createRegionShareCard(),
    tooltip: mapDOM.createTooltip(),
  },
  sectorPage: {
    chartWrapper: sectorDOM.createChartWrapper(),
    sectorList: sectorDOM.createSectorList(),
    sectorTable: sectorDOM.createSectorTable(),
    reportCard: sectorDOM.createSectorReportCard(),
  },
  thesisPage: {
    pdfReader: thesisDOM.createPdfReader(),
    docSwitcher: thesisDOM.createDocumentSwitcher(),
  },
};
