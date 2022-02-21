import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

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

const Nav = () => {
	const location = useLocation()

	const [menuOpen, setMenuOpen] = useState(false)
	const [languageOpen, setLanguageOpen] = useState(false)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ backgroundColor: "black", height: "10vh" }}>
					<Toolbar className="homeNav">
						<HomeIcon />

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
				<Collapse in={menuOpen}>
					<Home setMenuOpen={setMenuOpen} />
				</Collapse>
			)}

			<Outlet />
		</>
	)
}

export default Nav
