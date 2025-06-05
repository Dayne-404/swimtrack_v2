import { Dashboard } from "@mui/icons-material";

//TODO figure out what the heck this file was here for

export const EXTRA_ROUTES = {
	GroupInspect: { to: '/groups/:groupId', element: <Dashboard /> },
	// InstructorInspect: {
	// 	to: '/library/:worksheetId',
	// 	element: <Dashboard backText="Library" to="/library" />,
	// },
	// FinderInspect: {
	// 	to: '/finder/:worksheetId',
	// 	element: <Dashboard backText="Finder" to="/finder" />,
	// },
};