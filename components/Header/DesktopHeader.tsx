'use client'

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Title from "@/components/Header/Title";
import { HeaderProps, NavigationItem } from "@/components/Header";

// Render dropdowns above the sticky AppBar (zIndex.appBar === 1100).
const MENU_ZINDEX = 1300;

type MenuLevelState = {
	/** Key of the open menu at this level, if any. */
	active: string | null;
	/** Open this menu, or with `null` close whichever is open, immediately. */
	enter: (key: string | null) => void;
	/** Close whichever menu is open, after a short delay. */
	leave: () => void;
};

const MenuLevelContext = createContext<MenuLevelState | null>(null);

/**
 * The menus at one level — the bar, or the items of one dropdown — share
 * which of them is open, so pointing at one closes its siblings at once.
 * Leaving only closes after a delay, so the pointer can cross the sub-pixel
 * gap between a trigger and its menu without flicker; entering anything at
 * the same level cancels that delay.
 */
const MenuLevel = ({ children }: { children: React.ReactNode }) => {
	const [active, setActive] = useState<string | null>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => () => {
		if (timer.current) clearTimeout(timer.current);
	}, []);

	const value = useMemo<MenuLevelState>(() => ({
		active,
		enter: (key) => {
			if (timer.current) clearTimeout(timer.current);
			setActive(key);
		},
		leave: () => {
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => setActive(null), 120);
		},
	}), [active]);

	return <MenuLevelContext.Provider value={value}>{children}</MenuLevelContext.Provider>;
};

/** Identifies a navigation node among its siblings. */
const navKey = (item: NavigationItem) => item.label + (item.path ?? '');

/**
 * A navigation node that may contain children. At the top level it renders as a
 * bar button with a downward caret; nested inside a dropdown it renders as a
 * menu item with a rightward caret that opens a flyout submenu. Leaf nodes are
 * plain anchor links. Recurses to arbitrary depth.
 */
const NavNode = ({ item, top = false }: { item: NavigationItem; top?: boolean }) => {
	const hasChildren = !!item.children?.length;
	const anchorRef = useRef<HTMLElement | null>(null);
	const level = useContext(MenuLevelContext)!;
	const key = navKey(item);
	const open = level.active === key;

	if (!hasChildren) {
		// A plain link has no menu of its own, but pointing at it should still
		// close a sibling's.
		return top ? (
			<Button
				component={NextLink}
				href={item.path ?? '#'}
				onMouseEnter={() => level.enter(null)}
				sx={{ my: 2, color: 'common.white' }}
			>
				{item.label}
			</Button>
		) : (
			<MenuItem component={NextLink} href={item.path ?? '#'} onMouseEnter={() => level.enter(null)}>
				<ListItemText>{item.label}</ListItemText>
			</MenuItem>
		);
	}

	const trigger = top ? (
		<Button
			ref={anchorRef as React.RefObject<HTMLButtonElement>}
			endIcon={<KeyboardArrowDownIcon />}
			sx={{ my: 2, color: 'common.white' }}
		>
			{item.label}
		</Button>
	) : (
		<MenuItem ref={anchorRef as React.RefObject<HTMLLIElement>} sx={{ pr: 1 }}>
			<ListItemText>{item.label}</ListItemText>
			<KeyboardArrowRightIcon fontSize="small" sx={{ ml: 2 }} />
		</MenuItem>
	);

	return (
		<Box onMouseEnter={() => level.enter(key)} onMouseLeave={level.leave} sx={{ display: top ? 'inline-flex' : 'block' }}>
			{trigger}
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				placement={top ? 'bottom-start' : 'right-start'}
				disablePortal
				sx={{ zIndex: MENU_ZINDEX }}
			>
				<Paper elevation={3} sx={{ minWidth: 220 }}>
					<MenuLevel>
						<MenuList dense>
							{item.children!.map((child) => (
								<NavNode key={navKey(child)} item={child} />
							))}
						</MenuList>
					</MenuLevel>
				</Paper>
			</Popper>
		</Box>
	);
};

const DesktopHeader = ({ title, pages }: HeaderProps) => {
	return (
		<Toolbar disableGutters>
			<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
				<Box sx={{ flex: '0 0 auto' }}>
					<Title title={title} />
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', ml: 'auto' }}>
					<MenuLevel>
						{pages.map((page) => (
							<NavNode key={navKey(page)} item={page} top />
						))}
					</MenuLevel>
				</Box>
			</Box>
		</Toolbar>
	);
};

export default DesktopHeader;
