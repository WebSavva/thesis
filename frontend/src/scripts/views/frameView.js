import { domElements } from "../base";

export const clearUpPage = () => {
  document.body.innerHTML = ``;
};

export const toggleSidebar = () =>
  domElements.sidebar.rootElement.classList.toggle("sidebar-expanded");

export const selectNavItem = (prev, picked) => {
  domElements.sidebar.navigation
    .querySelector(`.menu-item[data-to-page="${prev}"`)
    .classList.remove("selected-menu-item");
  domElements.sidebar.navigation
    .querySelector(`.menu-item[data-to-page="${picked}"`)
    .classList.add("selected-menu-item");
};

export const insertMainLoader = () => {
  domElements.mainLoader.rootElement.append(domElements.mainLoader.spinner);
  document.body.append(domElements.mainLoader.rootElement);
};

export const renderRetryBoxOnLoader = () => {
  domElements.mainLoader.spinner.remove();
  domElements.mainLoader.rootElement.append(domElements.mainLoader.retryBox);
};

export const removeMainLoader = () => {
  if (
    domElements.mainLoader.rootElement.contains(domElements.mainLoader.retryBox)
  )
    domElements.mainLoader.retryBox.remove();
  domElements.mainLoader.rootElement.remove();
};
