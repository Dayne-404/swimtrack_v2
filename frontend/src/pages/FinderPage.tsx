import { Stack } from '@mui/material';
import ContentHeader from '../components/common/ContentHeader';
import WorksheetList from '../components/worksheets/WorksheetList';


const FinderPage = () => {
	return (
		<Stack spacing={1} width="100%">
			<ContentHeader title="Finder" />
			<WorksheetList showUsers />
		</Stack>
	);
};

export default FinderPage;
