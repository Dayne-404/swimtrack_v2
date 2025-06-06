import { Divider, Typography } from '@mui/material';

const ContentHeader = ({ title }: { title: string }) => {
	return (
        <>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Divider />
        </>
	);
};

export default ContentHeader;
