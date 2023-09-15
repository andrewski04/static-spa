import { routes, components, indexPage } from "./routes.js";

// pull currently active page based on query in url
function getActivePage() {
  const query = window.location.search.substring(1);
  return query.split("&")[0];
}

//fetchs and displays active routes/components for the page
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

// sets current route to display the corrent page
function route(targetPage) {
  const container = document.getElementById("app");
  if (targetPage && routes[targetPage]) {
    fetchAndDisplay(routes[targetPage], container);
  }
}

// Initial load
route(getActivePage());

// route to indexPage if no query is set
if (getActivePage() == "") {
  route(indexPage);
}

// listen for changes in url
window.addEventListener(
  "popstate",
  function () {
    route(getActivePage());
  },
  false
);

// listener for navigation button
document.body.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-route")) {
    e.preventDefault();
    const pageName = e.target.getAttribute("data-route");
    // Update the url with history api
    history.pushState(null, null, `?${pageName}`);
    route(pageName);
  }
});
