import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Home from "../../pages/Home"
import HomeIcon from "./HomeIcon"
import MenuToggle from "./MenuToggle"
import LanguageSelect from "./LanguageSelect"
import LanguageList from "./LanguageList"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Collapse from "@mui/material/Collapse"
import Divider from "@mui/material/Divider"

import "../../css/nav.css"

const Nav = () => {
	const location = useLocation()
	const { t, i18n } = useTranslation()

	const [menuOpen, setMenuOpen] = useState(false)
	const [languageOpen, setLanguageOpen] = useState(false)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ backgroundColor: "black", height: 90 }}>
					<Toolbar className="homeNav">
						<HomeIcon />

						{location.pathname !== `/${i18n.language}` && (
							<Divider
								sx={{ mr: 2, backgroundColor: "#D42323" }}
								orientation="vertical"
								variant="middle"
								flexItem
							/>
						)}

						<Grid container direction="row" justifyContent="space-between" alignItems="center">
							{location.pathname !== `/${i18n.language}` ? (
								<MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
							) : (
								<Box></Box>
							)}

							<LanguageSelect languageOpen={languageOpen} setLanguageOpen={setLanguageOpen} />
						</Grid>
					</Toolbar>
				</AppBar>
			</Box>

			<LanguageList languageOpen={languageOpen} setLanguageOpen={setLanguageOpen} />

			{location.pathname !== "/" && (
				<Collapse sx={{ width: "100%", position: "absolute", zIndex: 99 }} in={menuOpen}>
					<Home setMenuOpen={setMenuOpen} />
				</Collapse>
			)}

			<Outlet />
		</>
	)
}

export default Nav
