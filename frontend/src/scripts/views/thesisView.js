import { domElements } from "../base";

export const fillDocSwitcher = (docOptions) => {
  for (let [fileName, fileDesc] of docOptions) {
    domElements.thesisPage.docSwitcher.switcher.insertAdjacentHTML(
      "beforeend",
      `<li class="document-switcher-item ${
        fileName === "thesis.pdf" ? "document-item-selected" : ""
      }" data-pdf-source="${fileName}">${fileDesc}</li>`
    );
  }
};

export const toggleLoaderReader = (actionType) => {
  if (actionType === "remove") {
    domElements.thesisPage.pdfReader.loadBackground.remove();
  } else {
    domElements.thesisPage.pdfReader.pdfWrapper.insertAdjacentElement(
      "afterbegin",
      domElements.thesisPage.pdfReader.loadBackground
    );
  }
};

export const renderPageContent = () => {
  domElements.mainContent.dataset.currentPage = "thesis";
  domElements.header.headerText.textContent = "Материалы ВКР";
  domElements.mainContent.append(
    domElements.thesisPage.pdfReader.pdfWrapper,
    domElements.thesisPage.docSwitcher.wrapperSwitcher
  );
};

export const openFilePdf = () => {
  window.open(domElements.thesisPage.pdfReader.pdfIframe.src);
};
