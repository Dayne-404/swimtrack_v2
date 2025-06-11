import { Stack } from '@mui/material';
import ContentHeader from '../components/common/ContentHeader';
import WorksheetList from '../components/worksheets/WorksheetList';


const LibraryPage = () => {
	return (
		<Stack spacing={1} width="100%">
			<ContentHeader title="Library" />
			<WorksheetList specific />
		</Stack>
	);
};

export default LibraryPage;
