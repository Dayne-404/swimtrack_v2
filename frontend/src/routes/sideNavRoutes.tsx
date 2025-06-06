import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { DashboardPage } from '../pages/DashboardPage.tsx.tsx';
import FinderPage from '../pages/FinderPage.tsx';

export const SIDE_NAV_ROUTES = {
	Dashboard: { icon: <SpeedIcon />, to: '/', element: <DashboardPage /> },
	Library: { icon: <FolderIcon />, to: '/library', element: <DashboardPage /> },
	Groups: {
		icon: <FolderSpecialIcon />,
		to: '/groups',
		element: <DashboardPage />,
	},
	Create: { icon: <EditIcon />, to: '/create', element: <DashboardPage /> },
	Finder: { icon: <SearchIcon />, to: '/finder', element: <FinderPage /> },
	Programs: {
		icon: <ScubaDivingIcon />,
		to: '/programs',
		element: <DashboardPage />,
	},
};

export const SIDE_NAV_BOTTOM_ROUTES = {
	Settings: {
		icon: <SettingsIcon />,
		to: '/settings',
		element: <DashboardPage />,
	},
	Profile: { to: '/profile', element: <DashboardPage /> },
};

