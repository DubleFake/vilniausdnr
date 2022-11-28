import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as vlnIcon } from "../../utils/icons/homeIcons/header_vln_700.svg"

import SvgIcon from "@mui/material/SvgIcon"

const HomeIcon = () => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	return (
		<SvgIcon
			component={vlnIcon}
			inheritViewBox
			sx={{ mt: 0.75, ml: 2, color: "white", fontSize: 78, cursor: "pointer" }}
			onClick={() => navigate(`/vilniausdnr/${i18n.language}`)}
		/>
	)
}

export default HomeIcon
