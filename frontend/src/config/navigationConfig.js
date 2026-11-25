
import { ROUTE_CONFIG } from "./routeConfig";

export const NAVIGATION_CONFIG = Object.entries(ROUTE_CONFIG)
  .filter(([, route]) => route.showInNavigation)
  .map(([routeId, route]) => ({
    id: routeId,
    label: route.title,
    path: route.path,
    icon: route.icon,
  }));
