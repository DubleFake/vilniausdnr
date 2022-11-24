import React, { useState, useEffect } from "react"
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Home from "../../pages/Home"
import HomeIcon from "./HomeIcon"
import MenuToggle from "./MenuToggle"
import LanguageSelect from "./LanguageSelect"
import LanguageList from "./LanguageList"
import InfoModal from "./InfoModal"

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
	const { lng } = useParams()
	const navigate = useNavigate()

	const [menuOpen, setMenuOpen] = useState(false)
	const [languageOpen, setLanguageOpen] = useState(false)

	useEffect(() => {
		if (lng === "lt" || lng === "en") {
			i18n.changeLanguage(lng)
		} else {
			navigate(`/vilniausdnr/lt`)
		}
	}, [lng])

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="relative">
					<Toolbar className="homeNav">
						<HomeIcon />

						<Grid container direction="row" justifyContent="flex-end" alignItems="center">
							<InfoModal />

							<LanguageSelect languageOpen={languageOpen} setLanguageOpen={setLanguageOpen} />
              
							{location.pathname !== `/vilniausdnr/${i18n.language}` ? (
								<MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
							) : (
								<Box></Box>
							)}
						</Grid>
					</Toolbar>
				</AppBar>
			</Box>

			<LanguageList languageOpen={languageOpen} setLanguageOpen={setLanguageOpen} />

			{location.pathname !== `/vilniausdnr/${i18n.language}` && (
				<Collapse sx={{ width: "100%", position: "absolute", zIndex: 99 }} in={menuOpen}>
					<Home setMenuOpen={setMenuOpen} />
				</Collapse>
			)}

			<Outlet />
		</>
	)
}

export default Nav
