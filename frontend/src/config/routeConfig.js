
import { lazy } from "react";

export const ROUTE_CONFIG = {
  dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    component: lazy(
      () => import("../pages/Sample/SamplePage")
    ),
    showInNavigation: true,
    showInHeader: true,
  }
};
