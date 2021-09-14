export const createSidebar = () => {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  sidebar.innerHTML = `<div class="sidebar-head">
    <div class="menu-header-text">
        Главное меню
    </div>
    <div class="sidebar-toggler">
        <i class="fas fa-bars sidebar-toggler-icon"></i>
    </div>
    </div>
    <nav class="main-menu">
        <ol class="main-menu-content">
        </ol>
    </nav>`;

  const mainMenu = sidebar.querySelector(".main-menu-content");

  [
    ["shield-virus", "Стоимость локдауна", "map"],
    ["chart-line", "Отраслевой анализ", "sector"],
    ["book-open", "Текст ВКР", "thesis"],
  ].forEach((navData, i) =>
    mainMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="menu-item ${
        i === 0 ? "selected-menu-item" : ""
      }" data-to-page="${navData[2]}">
        <i class="fas fa-${navData[0]} menu-icon"></i>
        <span class="menu-item-text">${navData[1]}</span>
    </li>`
    )
  );
  mainMenu.insertAdjacentHTML(
    "beforeend",
    `<li>
        <a class="menu-item" href="presentation.html">
        <i class="fas fa-chalkboard menu-icon"></i>
        <span class="menu-item-text">Презентация</span>
        </a>
    </li>`
  );
  return {
    rootElement: sidebar,
    toggler: sidebar.querySelector(".sidebar-toggler"),
    navigation: mainMenu,
  };
};

export const createHeader = () => {
  const header = document.createElement("header");
  header.classList.add("main-header");

  header.innerHTML = `
        <h1 class="main-header-text"></h1>
        <i class="fas fa-virus spinning-virus"></i>`;
  return {
    rootElement: header,
    headerText: header.querySelector(".main-header-text"),
  };
};

export const createMain = () => {
  const main = document.createElement("main");
  main.classList.add("main-content");

  return main;
};
export const createBackgroundBlurer = () => {
  const blurer = document.createElement("div");
  blurer.classList.add("sidebar-blur");

  return blurer;
};

export const createMainLoader = () => {
  const mainLoader = document.createElement("div");
  mainLoader.className = "main-loader";
  const mainLoaderSpinner = document.createElement("i");
  mainLoaderSpinner.className = "fas fa-sync fa-spin main-spinner";

  const mainLoaderBox = document.createElement("div");
  mainLoaderBox.className = "main-loader-box";

  mainLoaderBox.innerHTML = `<h1 class="main-retry-message">Извините, что-то пошло не так</h1>
                                <button class="main-retry-btn">Попробовать еще раз</button>`;

  return {
    rootElement: mainLoader,
    spinner: mainLoaderSpinner,
    retryBox: mainLoaderBox,
    retryBtn: mainLoaderBox.querySelector(".main-retry-btn"),
  };
};
