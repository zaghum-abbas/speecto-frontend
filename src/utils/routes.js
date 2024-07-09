import { lazy } from "react";

const routes = [
  {
    name: "Dashboard",
    route: "/",
    component: lazy(() => import("../components/dashboard")),
    sidebar: true,
  },
  {
    name: "Sign up",
    route: "/signup",
    component: lazy(() => import("../pages/signup")),
  },
];
export { routes };
