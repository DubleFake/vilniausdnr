import React from "react"
import { useTranslation } from "react-i18next"

import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

const LanguageSelect = (props) => {
	const { t, i18n } = useTranslation()

	const handleLanguageClick = () => {
		props.setLanguageOpen(!props.languageOpen)
	}

	return (
		<IconButton
			id="languageSelect"
			size="small"
			sx={{
				mr: 1,
				minWidth: 43.28,
				backgroundColor: "#515151",
				"&:hover": {
					transition: "0.3s",
					backgroundColor: "#1f1f1f",
				},
			}}
			onClick={handleLanguageClick}
		>
			<Typography id="languageSelect" variant="h4" sx={{ color: "white", ml: 0.3, mt: 0.3, fontSize: 25 }}>
				{i18n.language.toUpperCase()}
			</Typography>
		</IconButton>
	)
}

export default LanguageSelect
