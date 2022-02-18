import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Home from "../pages/Home"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const Nav = () => {
	const { t, i18n } = useTranslation()
	const location = useLocation()

	const [language, setLanguage] = useState(i18n.resolvedLanguage)
	const [menuOpen, setMenuOpen] = useState(false)

	const handleLanguageChange = (event) => {
		i18n.changeLanguage(event.target.value)
		setLanguage(event.target.value)
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						{location.pathname !== "/" && (
							<IconButton
								onClick={() => setMenuOpen(!menuOpen)}
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
							>
								{menuOpen ? <CloseIcon /> : <MenuIcon />}
							</IconButton>
						)}
						<FormControl>
							<InputLabel id="simple-select-label">{t("language_select")}</InputLabel>
							<Select
								variant="outlined"
								autoWidth
								labelId="simple-select-label"
								id="simple-select"
								value={language}
								label={t("language_select")}
								onChange={handleLanguageChange}
							>
								<MenuItem value={"lt"}>Lietuvių</MenuItem>
								<MenuItem value={"en"}>English</MenuItem>
							</Select>
						</FormControl>
					</Toolbar>
				</AppBar>
			</Box>
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
