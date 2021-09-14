export const createPdfReader = () => {
  const pdfWrapper = document.createElement("div");
  pdfWrapper.classList.add("pdf-wrapper");

  const pdfIframe = document.createElement("iframe");
  pdfIframe.id = "pdf-reader";
  pdfIframe.setAttribute("type", "application/pdf");
  pdfIframe.setAttribute("frameborder", 0);

  const loadBackground = document.createElement("div");
  loadBackground.classList.add("text-load-background");
  loadBackground.innerHTML = `<i class="fas fa-sync fa-spin spinner"></i>`;

  pdfWrapper.append(pdfIframe);
  return {
    pdfWrapper,
    pdfIframe,
    loadBackground,
  };
};

export const createDocumentSwitcher = () => {
  const wrapperSwitcher = document.createElement("div");
  wrapperSwitcher.classList = "switcher-wrapper";

  const switcher = document.createElement("ul");
  switcher.classList.add("document-switcher");

  const iframeBtn = document.createElement("button");
  iframeBtn.classList = "iframe-btn";
  iframeBtn.textContent = "Просмотреть";

  wrapperSwitcher.append(switcher, iframeBtn);

  return {
    relativePath: "media/",
    switcher,
    wrapperSwitcher,
    iframeBtn,
  };
};
