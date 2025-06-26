import { Dashboard } from "@mui/icons-material";
import WorksheetInspect from "../components/worksheets/inspect/WorksheetInspect";

export const EXTRA_ROUTES = {
	GroupInspect: { to: '/groups/:groupId', element: <Dashboard /> },
	// InstructorInspect: {
	// 	to: '/library/:worksheetId',
	// 	element: <Dashboard backText="Library" to="/library" />,
	// },
	LibraryInspect: {
		to: '/library/:paramWorksheetId',
		element: <WorksheetInspect />
	},
	FinderInspect: {
		to: '/finder/:paramWorksheetId',
		element: <WorksheetInspect />
	},
};