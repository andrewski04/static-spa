// page to load if no route is defined
const indexPage = "page1";

// list of routes to different pages
const routes = {
  page1: { path: "/static-spa/html/pages/page1.html" },
  page2: { path: "/static-spa/html/pages/page2.html" },
};

// list of routes to components
const components = {
  header: { path: "/static-spa/html/components/header.html" },
};

export { routes, components, indexPage };
