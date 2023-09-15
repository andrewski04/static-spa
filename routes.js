// page to load if no route is defined
const indexPage = "page1";
// root page for if behind reverse proxy, github pages, etc
const siteRoot = "/static-spa";

// list of routes to different pages
const routes = {
  page1: { path: siteRoot + "/html/pages/page1.html", title: "Page 1" },
  page2: { path: siteRoot + "/html/pages/page2.html", title: "Page 2" },
};

// list of routes to components
const components = {
  header: { path: siteRoot + "/html/components/header.html" },
};

export { routes, components, indexPage };
