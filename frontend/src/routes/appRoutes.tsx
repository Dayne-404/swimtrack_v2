import { SIDE_NAV_ROUTES, SIDE_NAV_BOTTOM_ROUTES } from "./sideNavRoutes";
import { EXTRA_ROUTES } from "./extraRoutes";

export const ALL_ROUTES = {
	...SIDE_NAV_ROUTES,
	...SIDE_NAV_BOTTOM_ROUTES,
	...EXTRA_ROUTES,
};