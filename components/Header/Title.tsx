import NextLink from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Icon from "@/components/Header/Icon";

const Title = ({ title }: { title: string }) => (
	<Box
		component={NextLink}
		href="/"
		aria-label={`${title} home`}
		sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: { lg: 3, xs: 1 }, py: 1, textDecoration: 'none' }}
	>
		<Icon />
		<Typography variant="h4" sx={{ color: 'primary.contrastText' }}>
			{title}
		</Typography>
	</Box>
)

export default Title;
