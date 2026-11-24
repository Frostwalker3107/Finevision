
import {
  Dashboard,
  People,
  Settings,
} from "@mui/icons-material";

import { ROUTE_CONFIG } from "./routeConfig";

const NAVIGATION_ICONS = {
  dashboard: Dashboard,
  clients: People,
  settings: Settings,
};

export const NAVIGATION_CONFIG = Object.entries(ROUTE_CONFIG)
  .filter(([, route]) => route.showInNavigation)
  .map(([routeId, route]) => ({
    id: routeId,
    label: route.title,
    path: route.path,
    icon: NAVIGATION_ICONS[routeId],
  }));
