import React from "react"
import { useNavigate } from "react-router-dom"

import { ReactComponent as vlnIcon } from "../../homeIcons/header_vln_700.svg"

import SvgIcon from "@mui/material/SvgIcon"
const HomeIcon = () => {
	const navigate = useNavigate()

	return (
		<SvgIcon
			component={vlnIcon}
			inheritViewBox
			sx={{ mt: "0.5vh", color: "#D42323", fontSize: "9vh", cursor: "pointer" }}
			onClick={() => navigate("/")}
		/>
	)
}

export default HomeIcon
