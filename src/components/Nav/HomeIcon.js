import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import vlnIcon from "../../utils/icons/homeIcons/header_vln_700.png"

import Box from "@mui/material/Box"

const HomeIcon = () => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	return (
		// <img
		// 	src={vlnIcon}
		// 	sx={{ ml: 2, color: "white", width: 10, flex: 1, cursor: "pointer" }}
		// 	onClick={() => navigate(`/vilniausdnrtest/${i18n.language}`)}
		// />
		<Box
			sx={{ my: 2, ml: 1, height: "85%", resizeMode: "contain", cursor: "pointer" }}
			component="img"
			src={vlnIcon}
			onClick={() => navigate(`/vilniausdnrtest/${i18n.language}`)}
		/>
	)
}

export default HomeIcon
