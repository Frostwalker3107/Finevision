import { lazy } from "react";

import {
  People,
  Assessment,
  Settings,
} from "@mui/icons-material";
import { LuGlasses } from "react-icons/lu";

export const ROUTE_CONFIG = {
  patients: {
    id: "patients",
    path: "/patients",
    title: "Patients",
    icon: People,
    component: lazy(() => import("../pages/Sample/SamplePage")),
    showInNavigation: true,
    showInHeader: true,
  },

  reports: {
    id: "reports",
    path: "/reports",
    title: "Reports",
    icon: Assessment,
    component: lazy(() => import("../pages/Sample/SamplePage")),
    showInNavigation: true,
    showInHeader: true,
  },

  orders: {
    id: "orders",
    path: "/orders",
    title: "Orders",
    icon: LuGlasses,
    component: lazy(() => import("../pages/Sample/SamplePage")),
    showInNavigation: true,
    showInHeader: true,
  },

  settings: {
    id: "settings",
    path: "/settings",
    title: "Settings",
    icon: Settings,
    component: lazy(() => import("../pages/Settings/SettingsPage")),
    showInNavigation: true,
    showInHeader: true,
  },
};