import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as vlnIcon } from "../homeIcons/header_vln_700.svg"
import Home from "../pages/Home"

import ClickAwayListener from "@mui/material/ClickAwayListener"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import SvgIcon from "@mui/material/SvgIcon"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"

const Nav = () => {
	const { t, i18n } = useTranslation()
	const location = useLocation()

	const [menuOpen, setMenuOpen] = useState(false)
	const [languageOpen, setLanguageOpen] = useState(false)

	const handleLanguageChange = (lan) => {
		i18n.changeLanguage(lan)
		setLanguageOpen(false)
	}

	const handleClickAway = () => {
		setLanguageOpen(false)
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ backgroundColor: "black", height: "10vh" }}>
					<Toolbar className="homeNav">
						<SvgIcon
							component={vlnIcon}
							inheritViewBox
							sx={{ mt: "0.5vh", color: "#D42323", fontSize: "9vh" }}
						/>
						{location.pathname !== "/" && (
							<Divider
								sx={{ mr: 2, backgroundColor: "#D42323" }}
								orientation="vertical"
								variant="middle"
								flexItem
							/>
						)}

						<Grid container direction="row" justifyContent="space-between" alignItems="center">
							{location.pathname !== "/" ? (
								<IconButton
									onClick={() => setMenuOpen(!menuOpen)}
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
								>
									{menuOpen ? (
										<CloseIcon style={{ color: "#D42323", fontSize: 50 }} />
									) : (
										<MenuIcon style={{ color: "#D42323", fontSize: 50 }} />
									)}
								</IconButton>
							) : (
								<Box></Box>
							)}
							<IconButton
								size="large"
								sx={{ mr: 1, color: "#D42323", minWidth: 68 }}
								onClick={() => setLanguageOpen(!languageOpen)}
							>
								<Typography variant="h4" sx={{ ml: 0.3, mt: 0.3 }}>
									{i18n.language.toUpperCase()}
								</Typography>
							</IconButton>
						</Grid>
					</Toolbar>
				</AppBar>
			</Box>
			<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
				<Collapse sx={{ position: "absolute", zIndex: 50, right: 0 }} in={languageOpen}>
					<Paper square>
						<List sx={{ p: 0 }}>
							<ListItem
								disablePadding
								selected={i18n.language === "lt"}
								onClick={() => handleLanguageChange("lt")}
							>
								<ListItemButton>
									<Typography variant="h5">Lietuvių</Typography>
								</ListItemButton>
							</ListItem>
							<ListItem
								disablePadding
								selected={i18n.language === "en"}
								onClick={() => handleLanguageChange("en")}
							>
								<ListItemButton>
									<Typography variant="h5">English</Typography>
								</ListItemButton>
							</ListItem>
						</List>
					</Paper>
				</Collapse>
			</ClickAwayListener>
			{location.pathname !== "/" && (
				<Collapse in={menuOpen}>
					<Home setMenuOpen={setMenuOpen} />
				</Collapse>
			)}
			<Outlet />
		</>
	)
}

export default Nav
