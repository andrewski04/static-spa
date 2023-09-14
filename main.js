import { routes, components } from "./routes.js";

function getActivePage() {
  const query = window.location.search.substring(1);
  return query.split("&")[0];
}

function fetchAndDisplay(routeOrComponent, container) {
  const url = routeOrComponent.path;
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      container.innerHTML = html;

      const embeddedComponents = container.querySelectorAll("[data-component]");
      embeddedComponents.forEach((element) => {
        const componentName = element.getAttribute("data-component");
        const component = components[componentName];
        if (component) {
          fetchAndDisplay(component, element);
        }
      });
    });
}

function route(targetPage) {
  const container = document.getElementById("app");
  if (targetPage && routes[targetPage]) {
    fetchAndDisplay(routes[targetPage], container);
  }
}

// Initial load
route(getActivePage());

// Listen for changes in URL
window.addEventListener(
  "popstate",
  function () {
    route(getActivePage());
  },
  false
);

// Handle internal SPA navigation
document.body.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-route")) {
    e.preventDefault();
    const pageName = e.target.getAttribute("data-route");
    // Update the URL using the History API
    history.pushState(null, null, `?${pageName}`);
    route(pageName);
  }
});
