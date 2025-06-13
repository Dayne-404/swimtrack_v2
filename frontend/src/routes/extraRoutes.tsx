import { Dashboard } from "@mui/icons-material";
import WorksheetDetails from "../components/worksheets/details/WorksheetDetails";

export const EXTRA_ROUTES = {
	GroupInspect: { to: '/groups/:groupId', element: <Dashboard /> },
	// InstructorInspect: {
	// 	to: '/library/:worksheetId',
	// 	element: <Dashboard backText="Library" to="/library" />,
	// },
	LibraryInspect: {
		to: '/library/:paramWorksheetId',
		element: <WorksheetDetails />
	},
	FinderInspect: {
		to: '/finder/:paramWorksheetId',
		element: <WorksheetDetails />
	},
};