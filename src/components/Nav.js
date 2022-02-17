import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Home from "../pages/Home"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

const Nav = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
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
					</Toolbar>
				</AppBar>
			</Box>
			<Collapse in={menuOpen}>
				<Home setMenuOpen={setMenuOpen} />
			</Collapse>
			<Outlet />
		</>
	)
}

export default Nav
