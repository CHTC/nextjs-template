import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React from "react";

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import {HeaderProps} from "@/components/Header";

const Header = ({title, pages} : HeaderProps) => {
	return (
		<AppBar position="sticky" elevation={0}>
			<Container maxWidth="lg">
				<Box sx={{ display: { xs: 'block', md: 'none' } }}>
					<MobileHeader title={title} pages={pages} />
				</Box>
				<Box sx={{ display: { xs: 'none', md: 'block' } }}>
					<DesktopHeader title={title} pages={pages} />
				</Box>
			</Container>
		</AppBar>
	)
}

export default Header;
