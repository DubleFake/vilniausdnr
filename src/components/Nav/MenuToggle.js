import React from "react"

import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

const MenuToggle = (props) => {
	return (
		<IconButton
			onClick={() => props.setMenuOpen(!props.menuOpen)}
			size="small"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{
        mr: 1,
				"&:hover": {
					transition: "0.3s",
					backgroundColor: "#1f1f1f",
				},
			}}
		>
			{props.menuOpen ? (
				<CloseIcon style={{ color: "white", fontSize: 34 }} />
			) : (
				<MenuIcon style={{ color: "white", fontSize: 34 }} />
			)}
		</IconButton>
	)
}

export default MenuToggle
