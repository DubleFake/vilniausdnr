import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as vlnIcon } from "../homeIcons/header_vln_700.svg"
import Home from "../pages/Home"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SvgIcon from "@mui/material/SvgIcon"
import Divider from "@mui/material/Divider"

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
							<FormControl variant="filled" sx={{ mr: 3, backgroundColor: "white", minWidth: 120 }}>
								<InputLabel id="demo-simple-select-filled-label">{t("language_select")}</InputLabel>
								<Select
									sx={{ fontSize: 20 }}
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									value={language}
									onChange={handleLanguageChange}
								>
									<MenuItem sx={{ fontSize: 15 }} value={"lt"}>
										Lietuvių
									</MenuItem>
									<MenuItem sx={{ fontSize: 15 }} value={"en"}>
										English
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
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
