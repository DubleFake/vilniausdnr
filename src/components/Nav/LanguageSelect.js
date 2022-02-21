import React from "react"
import { useTranslation } from "react-i18next"

import ClickAwayListener from "@mui/material/ClickAwayListener"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

const LanguageSelect = (props) => {
	const { t, i18n } = useTranslation()

	const handleLanguageClick = (event) => {
		console.log(event)
		props.setLanguageOpen(!props.languageOpen)

    // select hover? del click away gal nera hover effect?
		// if (event.type === "click") {
		// 	props.setLanguageOpen(!props.languageOpen)
		// } else if (event.type === "mousedown") {
		// 	props.setLanguageOpen(false)
		// }
	}

	const handleClickAway = (event) => {
		console.log(event)

		props.setLanguageOpen(false)
	}

	return (
		<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
			<IconButton size="large" sx={{ mr: 1, color: "#D42323", minWidth: 68 }} onClick={handleLanguageClick}>
				<Typography variant="h4" sx={{ ml: 0.3, mt: 0.3 }}>
					{i18n.language.toUpperCase()}
				</Typography>
			</IconButton>
		</ClickAwayListener>
	)
}

export default LanguageSelect
